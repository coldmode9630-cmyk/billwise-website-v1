/**
 * POST /api/submit — Vercel serverless function.
 * Validates the inquiry, applies spam checks, and emails it to Billwise LLC via Resend.
 * Secrets come from environment variables only; nothing here reaches the browser.
 */
import { validateSubmission, validateAttachment, ATTACHMENT } from '../shared/validation.js';
import { serviceTitles } from '../src/config/services.js';

const MIN_FILL_MS = 3000; // humans take longer than 3 s to complete this form
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map(); // best-effort, per-instance rate limit
const recentIds = new Map(); // de-duplicates retries of the same submission

const esc = (v = '') =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > RATE_MAX;
}

function buildEmail(d, refId) {
  const row = (k, v) =>
    `<tr><td style="padding:10px 14px;background:#F7F9FC;color:#475370;font:600 13px Arial;width:190px;border-bottom:1px solid #E2E7F0">${k}</td><td style="padding:10px 14px;color:#0A1638;font:14px Arial;border-bottom:1px solid #E2E7F0">${esc(v)}</td></tr>`;
  const urgencyColor = { High: '#C2410C', Medium: '#B45309', Low: '#047857' }[d.urgency];
  const html = `<div style="background:#EFF2F8;padding:24px"><div style="max-width:640px;margin:auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #E2E7F0">
<div style="background:#0A1638;padding:20px 24px;color:#fff;font:700 18px Arial">New Request — Billwise LLC Website</div>
<div style="padding:20px 24px;font:14px Arial;color:#323C55">Urgency: <b style="color:${urgencyColor}">${esc(d.urgency)}</b> · Reference: <b>${esc(refId)}</b></div>
<table style="width:100%;border-collapse:collapse">${[
    row('Full name', d.fullName), row('Company / business', d.company), row('Organization type', d.organizationType), row('Email', d.email), row('Phone', d.phone),
    row('Service type', d.serviceType), row('Preferred contact', d.contactMethod), row('Urgency', d.urgency), row('Subject', d.subject),
  ].join('')}</table>
<div style="padding:20px 24px"><div style="font:600 13px Arial;color:#475370;margin-bottom:8px">Detailed description</div>
<div style="font:14px/1.6 Arial;color:#0A1638;white-space:pre-wrap;background:#F7F9FC;border:1px solid #E2E7F0;border-radius:10px;padding:14px">${esc(d.description)}</div></div>
<div style="padding:0 24px 20px;font:12px Arial;color:#94A0B8">The sender confirmed this message contains no patient health information (PHI). Reply directly to this email to respond to ${esc(d.fullName)}.</div></div></div>`;
  const text = `New request from the Billwise LLC website (ref ${refId})

Full name: ${d.fullName}
Company: ${d.company}
Organization type: ${d.organizationType}
Email: ${d.email}
Phone: ${d.phone}
Service type: ${d.serviceType}
Preferred contact: ${d.contactMethod}
Urgency: ${d.urgency}
Subject: ${d.subject}

${d.description}`;
  return { html, text };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, error: 'Invalid request.' });

  // Spam protection: honeypot + minimum fill time. Bots get a silent fake success
  // so they don't adapt; no email is sent.
  const elapsed = Number(body.startedAt) ? Date.now() - Number(body.startedAt) : 0;
  if (body.website || elapsed < MIN_FILL_MS) return res.status(200).json({ ok: true, id: 'BW-' + Date.now().toString(36).toUpperCase() });

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: 'Too many submissions. Please wait a few minutes, or email Info@billwisellc.com.' });

  const options = [...serviceTitles, 'Other / Not sure'];
  const { valid, errors, clean } = validateSubmission(body, options);
  if (!valid) return res.status(422).json({ ok: false, error: 'Please correct the highlighted fields.', fields: errors });

  // Optional attachment, re-validated server-side (type, size, real base64).
  let attachments;
  if (body.attachment) {
    const a = body.attachment;
    const buf = typeof a.content === 'string' ? Buffer.from(a.content, 'base64') : null;
    const err = !buf || !buf.length ? 'Attachment could not be read.' : validateAttachment({ type: a.type, size: buf.length });
    if (err) return res.status(422).json({ ok: false, error: err, fields: { attachment: err } });
    const ext = ATTACHMENT.types[a.type];
    const base = String(a.name || 'attachment').replace(/\.[^.]+$/, '').replace(/[^\w.-]+/g, '_').slice(0, 60) || 'attachment';
    attachments = [{ filename: `${base}.${ext}`, content: a.content }];
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL = 'Info@billwisellc.com', CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    console.error('[submit] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL environment variable.');
    return res.status(503).json({ ok: false, error: 'Our form is temporarily unavailable. Please email Info@billwisellc.com or call +1 503-360-9994.' });
  }

  // Idempotency: the same client submission id is only delivered once.
  const clientId = typeof body.submissionId === 'string' ? body.submissionId.slice(0, 64) : '';
  if (clientId && recentIds.has(clientId)) return res.status(200).json({ ok: true, id: recentIds.get(clientId) });

  const refId = 'BW-' + Date.now().toString(36).toUpperCase().slice(-6) + Math.random().toString(36).slice(2, 5).toUpperCase();
  const { html, text } = buildEmail(clean, refId);
  const subjectLine = `[${clean.urgency}] ${clean.subject} — ${clean.company}`.replace(/[\r\n]+/g, ' ').slice(0, 200);

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        ...(clientId ? { 'Idempotency-Key': clientId } : {}),
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: clean.email,
        subject: subjectLine,
        html,
        text,
        ...(attachments ? { attachments } : {}),
      }),
    });
    if (!r.ok) {
      console.error('[submit] Resend error', r.status, await r.text().catch(() => ''));
      return res.status(502).json({ ok: false, error: 'We could not send your request right now. Please try again, or email Info@billwisellc.com.' });
    }
  } catch (e) {
    console.error('[submit] Network error', e);
    return res.status(502).json({ ok: false, error: 'We could not send your request right now. Please try again, or email Info@billwisellc.com.' });
  }

  if (clientId) {
    recentIds.set(clientId, refId);
    if (recentIds.size > 500) recentIds.delete(recentIds.keys().next().value);
  }
  return res.status(200).json({ ok: true, id: refId });
}
