import { useMemo, useRef, useState } from 'react';
import { site } from '../../config/site.js';

const newId = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1]);
    r.onerror = () => reject(new Error('read'));
    r.readAsDataURL(file);
  });

/**
 * State and submit logic shared by the Contact and Submit-a-Request forms.
 * `validate(data)` must return { valid, errors }; `formType` is sent to /api/submit.
 */
export default function useFormSubmit({ formType, initial, validate }) {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');
  const [refId, setRefId] = useState('');
  const startedAt = useRef(Date.now());
  const submissionId = useRef(newId());
  const inFlight = useRef(false);
  const formRef = useRef(null);

  const liveErrors = useMemo(() => validate(data).errors, [data, validate]);

  const set = (name) => (e) => {
    const v = e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setData((d) => ({ ...d, [name]: v }));
    setErrors((er) => (er[name] ? { ...er, [name]: undefined } : er));
  };
  const blur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));
  // Live errors appear once a field is touched; server-side errors show until the field is edited.
  const err = (name) => (touched[name] ? liveErrors[name] : undefined) || errors[name];

  async function submit(e, { file, blocked = false, onFieldErrors } = {}) {
    e.preventDefault();
    if (inFlight.current || status === 'submitting') return; // prevent duplicate submissions
    const { valid, errors: v } = validate(data);
    setErrors(v);
    setTouched(Object.fromEntries(Object.keys(data).map((k) => [k, true])));
    if (!valid || blocked) {
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
      const payload = { ...data, formType, startedAt: startedAt.current, submissionId: submissionId.current };
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
        if (json.fields) { setErrors(json.fields); onFieldErrors?.(json.fields); }
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

  const reset = (next) => {
    setData(next ?? (typeof initial === 'function' ? initial() : initial)); setErrors({}); setTouched({});
    setStatus('idle'); setServerError(''); setRefId('');
    startedAt.current = Date.now(); submissionId.current = newId();
  };

  return { data, set, blur, err, submit, reset, status, serverError, refId, formRef, submitting: status === 'submitting' };
}
