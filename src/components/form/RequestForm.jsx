import { useMemo, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  User, Building2, Mail, Phone, Type, Paperclip, X, Loader2, Send, ShieldAlert, Check, CheckCircle2, AlertTriangle, Lock,
} from 'lucide-react';
import { services, serviceTitles } from '../../config/services.js';
import { site } from '../../config/site.js';
import {
  validateSubmission, validateAttachment, LIMITS, ATTACHMENT_ACCEPT, ORGANIZATION_TYPES,
} from '../../../shared/validation.js';
import { TextField, SelectField, TextArea, Segmented, FieldError } from './Fields.jsx';
import Button from '../ui/Button.jsx';
import { ease } from '../ui/Reveal.jsx';

const SERVICE_OPTIONS = [...serviceTitles, 'Other / Not sure'];
const newId = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

const initial = (serviceSlug) => ({
  fullName: '', company: '', email: '', phone: '', organizationType: '',
  serviceType: services.find((s) => s.slug === serviceSlug)?.title || '',
  subject: '', description: '', contactMethod: 'Email', urgency: 'Medium',
  noPhi: false, consent: false, website: '',
});

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1]);
    r.onerror = () => reject(new Error('read'));
    r.readAsDataURL(file);
  });

export default function RequestForm({ compact = false }) {
  const [params] = useSearchParams();
  const [data, setData] = useState(() => initial(params.get('service')));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');
  const [refId, setRefId] = useState('');
  const [drag, setDrag] = useState(false);
  const startedAt = useRef(Date.now());
  const submissionId = useRef(newId());
  const inFlight = useRef(false);
  const formRef = useRef(null);
  const fileInput = useRef(null);

  const liveErrors = useMemo(() => validateSubmission(data, SERVICE_OPTIONS).errors, [data]);

  const set = (name) => (e) => {
    const v = e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setData((d) => ({ ...d, [name]: v }));
    setErrors((er) => (er[name] ? { ...er, [name]: undefined } : er));
  };
  const blur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));
  // Live errors appear once a field is touched; server-side errors show until the field is edited.
  const err = (name) => (touched[name] ? liveErrors[name] : undefined) || errors[name];

  const pickFile = (f) => {
    if (!f) return;
    const e = validateAttachment(f);
    setFileError(e || '');
    setFile(e ? null : f);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (inFlight.current || status === 'submitting') return; // prevent duplicate submissions
    const { valid, errors: v } = validateSubmission(data, SERVICE_OPTIONS);
    setErrors(v);
    setTouched(Object.fromEntries(Object.keys(data).map((k) => [k, true])));
    if (!valid || fileError) {
      const first = formRef.current?.querySelector('[aria-invalid="true"], [data-invalid="true"]');
      first?.focus?.({ preventScroll: true });
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    inFlight.current = true;
    setStatus('submitting');
    setServerError('');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const payload = { ...data, startedAt: startedAt.current, submissionId: submissionId.current };
      if (file) payload.attachment = { name: file.name, type: file.type, content: await toBase64(file) };
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setRefId(json.id || '');
        setStatus('success');
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        if (json.fields) { setErrors(json.fields); if (json.fields.attachment) setFileError(json.fields.attachment); }
        setServerError(json.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setServerError(`We couldn't reach our server. Please check your connection and try again, or email ${site.email}.`);
      setStatus('error');
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
    }
  }

  const reset = () => {
    setData(initial()); setErrors({}); setTouched({}); setFile(null); setFileError('');
    setStatus('idle'); setServerError(''); setRefId('');
    startedAt.current = Date.now(); submissionId.current = newId();
  };

  const submitting = status === 'submitting';

  return (
    <div ref={formRef} className="relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-mist-200 bg-white shadow-lift">
      <div aria-hidden className="h-1.5 bg-gradient-to-r from-royal-700 via-royal-500 to-royal-300" />
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <Success key="ok" refId={refId} onReset={reset} />
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="p-6 sm:p-10" aria-busy={submitting}>
            {!compact && (
              <header className="mb-8">
                <h2 className="text-3xl font-bold sm:text-4xl">How Can We Help You?</h2>
                <p className="mt-3 max-w-2xl text-mist-500">Tell us about your billing requirements or concerns. Our team will review your submission and get back to you.</p>
              </header>
            )}

            {/* PHI warning */}
            <div className="mb-8 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5" role="note">
              <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" aria-hidden />
              <div className="text-sm leading-relaxed text-amber-900">
                <p className="font-semibold">Please do not include patient information.</p>
                <p className="mt-1">
                  This form is for business inquiries only. Do not enter or attach protected health information (PHI) such as patient names, dates of birth, medical record or member ID numbers, diagnoses, claim forms, EOBs or medical records. Once we're in touch, we'll arrange a secure way to exchange any patient data.
                </p>
              </div>
            </div>

            <fieldset disabled={submitting} className="space-y-10">
              <Section n="1" title="Your details">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField name="fullName" label="Full Name" required icon={User} autoComplete="name" placeholder="Jane Smith" value={data.fullName} onChange={set('fullName')} onBlur={blur('fullName')} error={err('fullName')} maxLength={LIMITS.fullName} />
                  <TextField name="company" label="Company / Business Name" required icon={Building2} autoComplete="organization" placeholder="Practice, clinic or hospital" value={data.company} onChange={set('company')} onBlur={blur('company')} error={err('company')} maxLength={LIMITS.company} />
                  <TextField name="email" type="email" label="Email Address" required icon={Mail} autoComplete="email" inputMode="email" placeholder="name@organization.com" value={data.email} onChange={set('email')} onBlur={blur('email')} error={err('email')} maxLength={LIMITS.email} />
                  <TextField name="phone" type="tel" label="Phone Number" required icon={Phone} autoComplete="tel" inputMode="tel" placeholder="+1 (555) 000-0000" value={data.phone} onChange={set('phone')} onBlur={blur('phone')} error={err('phone')} maxLength={LIMITS.phone} />
                  <SelectField name="organizationType" label="Organization Type" placeholder="Select your organization type" options={ORGANIZATION_TYPES} value={data.organizationType} onChange={set('organizationType')} onBlur={blur('organizationType')} error={err('organizationType')} className="sm:col-span-2" />
                </div>
              </Section>

              <Section n="2" title="Your billing request">
                <div className="grid gap-5">
                  <SelectField name="serviceType" label="Type of Billing Service" required placeholder="Select a service" options={SERVICE_OPTIONS} value={data.serviceType} onChange={set('serviceType')} onBlur={blur('serviceType')} error={err('serviceType')} />
                  <TextField name="subject" label="Subject / Issue Title" required icon={Type} placeholder="e.g. Rising claim denials from one payer" value={data.subject} onChange={set('subject')} onBlur={blur('subject')} error={err('subject')} maxLength={LIMITS.subject} />
                  <TextArea
                    name="description"
                    label="Detailed Issue Description"
                    required
                    max={LIMITS.description}
                    placeholder="Describe your billing problem, requirements or concerns in as much detail as you can: what's happening, since when, which payers or processes are involved, the systems you use, and what you'd like help with. Please do not include any patient information."
                    value={data.description}
                    onChange={set('description')}
                    onBlur={blur('description')}
                    error={err('description')}
                  />
                </div>
              </Section>

              <Section n="3" title="Preferences">
                <div className="grid gap-5 md:grid-cols-2">
                  <Segmented name="contactMethod" label="Preferred Contact Method" value={data.contactMethod} onChange={set('contactMethod')} error={err('contactMethod')} options={[{ value: 'Email', icon: Mail }, { value: 'Phone', icon: Phone }]} />
                  <Segmented name="urgency" label="Urgency" value={data.urgency} onChange={set('urgency')} error={err('urgency')} options={[{ value: 'Low' }, { value: 'Medium' }, { value: 'High' }]} tones={{ Low: 'bg-emerald-500', Medium: 'bg-amber-500', High: 'bg-red-500' }} />
                </div>

                {/* attachment */}
                <div className="mt-6">
                  <p className="mb-2 text-sm font-semibold text-navy-900">File Attachment <span className="font-normal text-mist-400">(optional)</span></p>
                  {file ? (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-2xl border border-royal-200 bg-royal-50 p-4">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-royal-700"><Paperclip className="h-5 w-5" aria-hidden /></span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-navy-900">{file.name}</p>
                        <p className="text-xs text-mist-500">{(file.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button type="button" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = ''; }} className="grid h-9 w-9 place-items-center rounded-full text-mist-500 hover:bg-white hover:text-navy-900" aria-label="Remove attachment"><X className="h-4 w-4" /></button>
                    </motion.div>
                  ) : (
                    <label
                      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                      onDragLeave={() => setDrag(false)}
                      onDrop={(e) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files?.[0]); }}
                      data-invalid={!!fileError}
                      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-royal-500/20 ${drag ? 'scale-[1.01] border-royal-500 bg-royal-50' : fileError ? 'border-red-300 bg-red-50/40' : 'border-mist-200 bg-mist-50 hover:border-royal-300 hover:bg-royal-50/50'}`}
                    >
                      <input ref={fileInput} type="file" accept={ATTACHMENT_ACCEPT} className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-royal-600 shadow-soft"><Paperclip className="h-5 w-5" aria-hidden /></span>
                      <span className="text-sm font-semibold text-navy-900">Drop a file here or <span className="text-royal-600 underline underline-offset-4">browse</span></span>
                      <span className="text-xs text-mist-500">PDF, image, spreadsheet or Word document, up to 3 MB. Business documents only, no patient data.</span>
                    </label>
                  )}
                  <FieldError id="f-attachment-err" error={fileError} />
                </div>
              </Section>

              {/* honeypot (hidden from people, visible to bots) */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="f-website">Website</label>
                <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={set('website')} />
              </div>

              <div className="space-y-3">
                <Check2 name="noPhi" checked={data.noPhi} onChange={set('noPhi')} error={err('noPhi')}>
                  I confirm this submission does <strong>not</strong> contain patient names, medical records or any other protected health information.
                </Check2>
                <Check2 name="consent" checked={data.consent} onChange={set('consent')} error={err('consent')}>
                  I agree that Billwise LLC may contact me about this request, as described in the <Link to="/privacy-policy" className="font-semibold text-royal-700 underline underline-offset-4">Privacy Policy</Link>.
                </Check2>
              </div>

              <AnimatePresence>
                {status === 'error' && serverError && (
                  <motion.div role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden /> <p>{serverError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col-reverse items-start justify-between gap-5 border-t border-mist-200 pt-8 sm:flex-row sm:items-center">
                <p className="flex items-center gap-2 text-sm text-mist-500"><Lock className="h-4 w-4 text-royal-600" aria-hidden /> Sent over an encrypted connection directly to our team.</p>
                <Button type="submit" disabled={submitting} className="w-full min-w-[200px] sm:w-auto">
                  {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Submitting…</>) : (<>Submit Request <Send className="h-4 w-4" aria-hidden /></>)}
                </Button>
              </div>
              <p className="sr-only" aria-live="polite">{submitting ? 'Submitting your request' : ''}</p>
            </fieldset>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ n, title, children }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-navy-900 text-xs font-bold text-white">{n}</span>
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="h-px flex-1 bg-mist-200" />
      </div>
      {children}
    </div>
  );
}

function Check2({ name, checked, onChange, error, children }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="group flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mist-600">
        <span className="relative mt-0.5 shrink-0">
          <input id={id} type="checkbox" checked={checked} onChange={onChange} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className="peer sr-only" />
          <span className={`grid h-5 w-5 place-items-center rounded-md border-2 transition-all peer-focus-visible:ring-4 peer-focus-visible:ring-royal-500/20 ${checked ? 'border-royal-600 bg-royal-600' : error ? 'border-red-400 bg-white' : 'border-mist-300 bg-white group-hover:border-royal-400'}`}>
            <motion.span initial={false} animate={{ scale: checked ? 1 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 25 }}><Check className="h-3 w-3 text-white" strokeWidth={3.5} aria-hidden /></motion.span>
          </span>
        </span>
        <span>{children}<span className="text-royal-600" aria-hidden> *</span></span>
      </label>
      <FieldError id={`${id}-err`} error={error} />
    </div>
  );
}

function Success({ refId, onReset }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }} className="relative overflow-hidden px-6 py-16 text-center sm:px-14 sm:py-20" role="status" aria-live="polite">
      <div aria-hidden className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-royal-400/20 blur-3xl" />
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} className="relative isolate mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-royal-500 to-royal-700 text-white shadow-glow">
        <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-royal-400/40 [animation-iteration-count:2]" />
        <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }} className="relative"><CheckCircle2 className="h-10 w-10" strokeWidth={2.25} aria-hidden /></motion.span>
      </motion.div>
      <h2 className="relative mt-8 text-3xl font-bold">Request received</h2>
      <p className="relative mx-auto mt-4 max-w-lg text-lg leading-relaxed text-mist-500">
        Thank you for contacting Billwise LLC. Your request has been successfully submitted. Our team will review your details and contact you.
      </p>
      {refId && <p className="relative mt-6 inline-flex rounded-full bg-mist-100 px-4 py-2 font-mono text-sm text-navy-900">Reference: {refId}</p>}
      <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Button to="/" variant="dark">Back to Home</Button>
        <Button type="button" variant="light" onClick={onReset}>Submit another request</Button>
      </div>
    </motion.div>
  );
}
