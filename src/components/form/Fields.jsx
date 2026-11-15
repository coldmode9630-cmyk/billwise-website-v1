import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, AlertTriangle, Check, CheckCircle2, ChevronDown } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { ease } from '../ui/Reveal.jsx';

/** Numbered section header used inside the forms. */
export function FormSection({ n, title, intro, children }) {
  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-900 text-xs font-bold text-white">{n}</span>
          <h3 className="text-lg font-bold">{title}</h3>
          <span className="h-px flex-1 bg-mist-200" />
        </div>
        {intro && <p className="mt-2 pl-10 text-sm text-mist-500">{intro}</p>}
      </div>
      {children}
    </div>
  );
}

/** Required checkbox (consent / no-PHI confirmations). */
export function Checkbox({ name, checked, onChange, error, children }) {
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

/** Hidden field that only bots fill in. */
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="f-website">Website</label>
      <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
    </div>
  );
}

export function ServerError({ show, message }) {
  return (
    <AnimatePresence>
      {show && message && (
        <motion.div role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden /> <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Confirmation panel shown after a successful submission. */
export function FormSuccess({ title, text, refId, onReset, resetLabel }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }} className="relative overflow-hidden px-6 py-16 text-center sm:px-14 sm:py-20" role="status" aria-live="polite">
      <div aria-hidden className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-royal-400/20 blur-3xl" />
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} className="relative isolate mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-royal-500 to-royal-700 text-white shadow-glow">
        <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-royal-400/40 [animation-iteration-count:2]" />
        <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }} className="relative"><CheckCircle2 className="h-10 w-10" strokeWidth={2.25} aria-hidden /></motion.span>
      </motion.div>
      <h2 className="relative mt-8 text-3xl font-bold">{title}</h2>
      <p className="relative mx-auto mt-4 max-w-lg text-lg leading-relaxed text-mist-500">{text}</p>
      {refId && <p className="relative mt-6 inline-flex rounded-full bg-mist-100 px-4 py-2 font-mono text-sm text-navy-900">Reference: {refId}</p>}
      <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Button to="/" variant="dark">Back to Home</Button>
        <Button type="button" variant="light" onClick={() => onReset()}>{resetLabel}</Button>
      </div>
    </motion.div>
  );
}

const base =
  'peer w-full rounded-2xl border bg-white px-4 text-[15px] text-navy-900 placeholder:text-mist-400 transition-all duration-200 focus:outline-none focus:ring-4';
const ok = 'border-mist-200 hover:border-mist-300 focus:border-royal-500 focus:ring-royal-500/15';
const bad = 'border-red-400 focus:border-red-500 focus:ring-red-500/15';

export function FieldError({ id, error }) {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <motion.p id={id} role="alert" initial={{ opacity: 0, height: 0, y: -4 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-1.5 pt-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function Label({ htmlFor, children, required, hint }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-semibold text-navy-900">
      <span>{children}{required ? <span className="ml-0.5 text-royal-600" aria-hidden> *</span> : <span className="ml-1.5 font-normal text-mist-400">(optional)</span>}</span>
      {hint && <span className="text-xs font-normal text-mist-400">{hint}</span>}
    </label>
  );
}

export function TextField({ name, label, required, error, icon: Icon, className = '', ...rest }) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <div className="relative">
        <input id={id} name={name} required={required} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${base} h-[52px] ${Icon ? 'pl-11' : ''} ${error ? bad : ok}`} {...rest} />
        {Icon && <Icon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-mist-400 transition-colors peer-focus:text-royal-600" aria-hidden />}
      </div>
      <FieldError id={`${id}-err`} error={error} />
    </div>
  );
}

export function SelectField({ name, label, required, error, options, placeholder, className = '', ...rest }) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <div className="relative">
        <select id={id} name={name} required={required} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${base} h-[52px] cursor-pointer appearance-none pr-11 ${error ? bad : ok} ${rest.value ? '' : 'text-mist-400'}`} {...rest}>
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o} className="text-navy-900">{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-400" aria-hidden />
      </div>
      <FieldError id={`${id}-err`} error={error} />
    </div>
  );
}

export function TextArea({ name, label, required, error, max, value, short = false, className = '', ...rest }) {
  const id = `f-${name}`;
  const len = value?.length || 0;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} hint={<span className={len > max * 0.9 ? 'text-amber-600' : ''}>{len.toLocaleString()} / {max.toLocaleString()}</span>}>{label}</Label>
      <textarea id={id} name={name} required={required} value={value} maxLength={max} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${base} ${short ? 'min-h-[120px]' : 'min-h-[200px]'} resize-y py-3.5 leading-relaxed ${error ? bad : ok}`} {...rest} />
      <FieldError id={`${id}-err`} error={error} />
    </div>
  );
}

/** Pill-style radio group. `tones` optionally colors each option when selected. */
export function Segmented({ name, label, options, value, onChange, error, tones = {} }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-navy-900">{label}<span className="ml-0.5 text-royal-600" aria-hidden> *</span></legend>
      <div className="relative flex gap-1 rounded-2xl border border-mist-200 bg-mist-50 p-1" role="radiogroup">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <label key={o.value} className={`relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-royal-500 ${active ? 'text-navy-900' : 'text-mist-500 hover:text-navy-900'}`}>
              <input type="radio" name={name} value={o.value} checked={active} onChange={() => onChange(o.value)} className="sr-only" />
              {active && <motion.span layoutId={`seg-${name}`} transition={{ type: 'spring', stiffness: 420, damping: 34 }} className="absolute inset-0 rounded-xl bg-white shadow-soft ring-1 ring-mist-200" />}
              {o.icon && <o.icon className={`relative h-4 w-4 ${active ? 'text-royal-600' : ''}`} aria-hidden />}
              {tones[o.value] && <span className={`relative h-2 w-2 rounded-full ${tones[o.value]}`} aria-hidden />}
              <span className="relative">{o.value}</span>
            </label>
          );
        })}
      </div>
      <FieldError id={`f-${name}-err`} error={error} />
    </fieldset>
  );
}
