// Run: npm run test:api — exercises api/submit.js with a mocked Resend API.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/submit.js';

let calls;
const mockFetch = (status = 200) => {
  calls = [];
  globalThis.fetch = async (url, opts) => {
    calls.push({ url, opts, body: JSON.parse(opts.body) });
    return { ok: status < 300, status, text: async () => 'mock', json: async () => ({ id: 'mock' }) };
  };
};

let ipCounter = 0;
function run(body, { method = 'POST' } = {}) {
  return new Promise((resolve) => {
    const req = { method, body, headers: { 'x-forwarded-for': `10.0.0.${++ipCounter}` }, socket: {} };
    const res = {
      code: 200, headers: {},
      setHeader(k, v) { this.headers[k] = v; },
      status(c) { this.code = c; return this; },
      json(o) { resolve({ code: this.code, body: o }); },
    };
    handler(req, res);
  });
}

const valid = (over = {}) => ({
  fullName: 'Jane Smith', company: 'Riverside Clinic', email: 'jane@riverside.example', phone: '+1 503 555 0100',
  organizationType: 'Clinic', serviceType: 'Denial Management & Appeals', subject: 'Denials from one payer',
  description: 'We have seen a rise in denials from one commercial payer over the past two months.',
  contactMethod: 'Email', urgency: 'High', noPhi: true, consent: true, website: '',
  startedAt: Date.now() - 60_000, submissionId: 'id-' + Math.random(), ...over,
});

beforeEach(() => {
  process.env.RESEND_API_KEY = 're_test';
  process.env.CONTACT_FROM_EMAIL = 'Billwise Website <forms@billwisellc.com>';
  delete process.env.CONTACT_TO_EMAIL;
  mockFetch();
});

test('valid submission is emailed to Info@billwisellc.com', async () => {
  const r = await run(valid());
  assert.equal(r.code, 200);
  assert.equal(r.body.ok, true);
  assert.match(r.body.id, /^BW-/);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  assert.equal(calls[0].opts.headers.Authorization, 'Bearer re_test');
  assert.deepEqual(calls[0].body.to, ['Info@billwisellc.com']);
  assert.equal(calls[0].body.reply_to, 'jane@riverside.example');
  assert.match(calls[0].body.subject, /\[High\] Denials from one payer — Riverside Clinic/);
  assert.match(calls[0].body.html, /Riverside Clinic/);
  assert.match(calls[0].body.text, /Organization type: Clinic/);
});

test('HTML in fields is escaped in the email', async () => {
  await run(valid({ subject: '<script>alert(1)</script> billing' }));
  assert.ok(!calls[0].body.html.includes('<script>'));
  assert.ok(calls[0].body.html.includes('&lt;script&gt;'));
});

test('missing required fields and bad email are rejected (422), nothing sent', async () => {
  const r = await run(valid({ fullName: '', email: 'not-an-email', description: 'short', noPhi: false }));
  assert.equal(r.code, 422);
  assert.equal(r.body.ok, false);
  for (const f of ['fullName', 'email', 'description', 'noPhi']) assert.ok(r.body.fields[f], f);
  assert.equal(calls.length, 0);
});

test('unknown service type is rejected', async () => {
  const r = await run(valid({ serviceType: 'Something made up' }));
  assert.equal(r.code, 422);
  assert.ok(r.body.fields.serviceType);
});

test('honeypot and too-fast submissions are silently dropped', async () => {
  const a = await run(valid({ website: 'http://spam.example' }));
  const b = await run(valid({ startedAt: Date.now() }));
  assert.equal(a.code, 200); assert.equal(b.code, 200);
  assert.equal(calls.length, 0);
});

test('provider failure returns 502 and no success', async () => {
  mockFetch(500);
  const r = await run(valid());
  assert.equal(r.code, 502);
  assert.equal(r.body.ok, false);
});

test('missing configuration returns 503', async () => {
  delete process.env.RESEND_API_KEY;
  const r = await run(valid());
  assert.equal(r.code, 503);
  assert.equal(calls.length, 0);
});

test('duplicate submission id is delivered only once', async () => {
  const body = valid({ submissionId: 'dup-1' });
  const a = await run(body);
  const b = await run(body);
  assert.equal(a.body.id, b.body.id);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].opts.headers['Idempotency-Key'], 'dup-1');
});

test('valid attachment is forwarded; disallowed type rejected', async () => {
  const ok = await run(valid({ attachment: { name: 'aging report.pdf', type: 'application/pdf', content: Buffer.from('%PDF-1.4 test').toString('base64') } }));
  assert.equal(ok.code, 200);
  assert.equal(calls[0].body.attachments[0].filename, 'aging_report.pdf');
  const bad = await run(valid({ attachment: { name: 'x.exe', type: 'application/x-msdownload', content: 'TVqQ' } }));
  assert.equal(bad.code, 422);
});

test('rate limit kicks in after 5 requests from one IP', async () => {
  const send = () => new Promise((resolve) => {
    handler({ method: 'POST', body: valid(), headers: { 'x-forwarded-for': '9.9.9.9' }, socket: {} },
      { setHeader() {}, status(c) { this.c = c; return this; }, json() { resolve(this.c); } });
  });
  const codes = [];
  for (let i = 0; i < 6; i++) codes.push(await send());
  assert.deepEqual(codes, [200, 200, 200, 200, 200, 429]);
});

test('GET is not allowed', async () => {
  const r = await run(undefined, { method: 'GET' });
  assert.equal(r.code, 405);
});

test('billing request email includes the practice profile', async () => {
  const r = await run(valid({ specialty: 'Cardiology', providerCount: '2–5', claimVolume: '250–1,000', software: 'Athena', payers: 'Medicare, Aetna' }));
  assert.equal(r.code, 200);
  assert.match(calls[0].body.text, /Specialty: Cardiology/);
  assert.match(calls[0].body.text, /Monthly claim volume: 250–1,000/);
  assert.match(calls[0].body.html, /Practice profile/);
});

test('billing request requires organization type and rejects unknown ranges', async () => {
  const r = await run(valid({ organizationType: '', claimVolume: 'a lot' }));
  assert.equal(r.code, 422);
  assert.ok(r.body.fields.organizationType);
  assert.ok(r.body.fields.claimVolume);
});

const contact = (over = {}) => ({
  formType: 'contact', fullName: 'Sam Lee', company: '', email: 'sam@clinic.example', phone: '+1 303 555 0100',
  contactMethod: 'Phone', bestTime: 'Morning', message: '', consent: true, website: '',
  startedAt: Date.now() - 60_000, submissionId: 'c-' + Math.random(), ...over,
});

test('contact form only needs brief details and is emailed as a contact', async () => {
  const r = await run(contact());
  assert.equal(r.code, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].body.subject, '[Contact] Sam Lee');
  assert.match(calls[0].body.text, /Best time to reach: Morning/);
  assert.ok(!/Service type/.test(calls[0].body.text));
});

test('contact form validates name, email, phone and consent', async () => {
  const r = await run(contact({ fullName: '', email: 'bad', phone: '12', consent: false }));
  assert.equal(r.code, 422);
  for (const f of ['fullName', 'email', 'phone', 'consent']) assert.ok(r.body.fields[f], f);
  assert.equal(calls.length, 0);
});

test('contact form ignores attachments', async () => {
  const r = await run(contact({ attachment: { name: 'x.pdf', type: 'application/pdf', content: Buffer.from('%PDF').toString('base64') } }));
  assert.equal(r.code, 200);
  assert.equal(calls[0].body.attachments, undefined);
});
