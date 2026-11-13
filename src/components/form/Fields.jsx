import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ChevronDown } from 'lucide-react';

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

export function TextArea({ name, label, required, error, max, value, className = '', ...rest }) {
  const id = `f-${name}`;
  const len = value?.length || 0;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} hint={<span className={len > max * 0.9 ? 'text-amber-600' : ''}>{len.toLocaleString()} / {max.toLocaleString()}</span>}>{label}</Label>
      <textarea id={id} name={name} required={required} value={value} maxLength={max} aria-invalid={!!error} aria-describedby={`${id}-help${error ? ` ${id}-err` : ''}`} className={`${base} min-h-[220px] resize-y py-3.5 leading-relaxed ${error ? bad : ok}`} {...rest} />
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
