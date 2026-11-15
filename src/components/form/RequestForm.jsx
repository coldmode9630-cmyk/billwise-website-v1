import { useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Building2, Mail, Phone, Type, Paperclip, X, Loader2, Send, ShieldAlert, Lock, Stethoscope, MonitorSmartphone, Landmark } from 'lucide-react';
import { services, serviceTitles } from '../../config/services.js';
import {
  validateSubmission, validateAttachment, LIMITS, ATTACHMENT_ACCEPT, ORGANIZATION_TYPES, PROVIDER_COUNTS, CLAIM_VOLUMES,
} from '../../../shared/validation.js';
import { TextField, SelectField, TextArea, Segmented, FieldError, FormSection, Checkbox, Honeypot, ServerError, FormSuccess } from './Fields.jsx';
import useFormSubmit from './useFormSubmit.js';
import Button from '../ui/Button.jsx';

const SERVICE_OPTIONS = [...serviceTitles, 'Other / Not sure'];
const validate = (d) => validateSubmission(d, SERVICE_OPTIONS);

const initial = (serviceSlug) => ({
  organizationType: '', specialty: '', providerCount: '', claimVolume: '', software: '', payers: '',
  serviceType: services.find((s) => s.slug === serviceSlug)?.title || '',
  subject: '', description: '', urgency: 'Medium',
  fullName: '', company: '', email: '', phone: '', contactMethod: 'Email',
  noPhi: false, consent: false, website: '',
});

/** Submit a Request: billing information about the practice and the issue. */
export default function RequestForm() {
  const [params] = useSearchParams();
  const f = useFormSubmit({ formType: 'request', initial: () => initial(params.get('service')), validate });
  const { data, set, blur, err, submitting } = f;
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [drag, setDrag] = useState(false);
  const fileInput = useRef(null);

  const pickFile = (picked) => {
    if (!picked) return;
    const e = validateAttachment(picked);
    setFileError(e || '');
    setFile(e ? null : picked);
  };
  const field = (name) => ({ name, value: data[name], onChange: set(name), onBlur: blur(name), error: err(name) });

  const onSubmit = (e) => f.submit(e, { file, blocked: !!fileError, onFieldErrors: (fields) => fields.attachment && setFileError(fields.attachment) });
  const reset = () => { f.reset(initial()); setFile(null); setFileError(''); };

  return (
    <div ref={f.formRef} className="relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-mist-200 bg-white shadow-lift">
      <div aria-hidden className="h-1.5 bg-gradient-to-r from-royal-700 via-royal-500 to-royal-300" />
      <AnimatePresence mode="wait" initial={false}>
        {f.status === 'success' ? (
          <FormSuccess
            key="ok"
            title="Request received"
            text="Thank you. Our billing team will review the details of your request and contact you to discuss next steps."
            refId={f.refId}
            onReset={reset}
            resetLabel="Submit another request"
          />
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="p-6 sm:p-10" aria-busy={submitting}>
            <div className="mb-8 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5" role="note">
              <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" aria-hidden />
              <p className="text-sm leading-relaxed text-amber-900">
                <span className="font-semibold">No patient information, please.</span> Describe your billing situation in general terms. Don't include patient names, dates of birth, member IDs, claim forms, EOBs or medical records. We'll set up a secure way to share those later.
              </p>
            </div>

            <fieldset disabled={submitting} className="space-y-10">
              <FormSection n="1" title="Practice profile" intro="Tell us about your organization so we can scope the work.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField {...field('organizationType')} label="Organization Type" required placeholder="Select organization type" options={ORGANIZATION_TYPES} />
                  <TextField {...field('specialty')} label="Specialty" icon={Stethoscope} placeholder="e.g. Family medicine, cardiology" maxLength={LIMITS.specialty} />
                  <SelectField {...field('providerCount')} label="Number of Providers" placeholder="Select a range" options={PROVIDER_COUNTS} />
                  <SelectField {...field('claimVolume')} label="Claims per Month" placeholder="Select a range" options={CLAIM_VOLUMES} />
                  <TextField {...field('software')} label="Billing / EHR Software" icon={MonitorSmartphone} placeholder="e.g. Athena, eClinicalWorks, Kareo" maxLength={LIMITS.software} />
                  <TextField {...field('payers')} label="Main Payers" icon={Landmark} placeholder="e.g. Medicare, Aetna, BCBS" maxLength={LIMITS.payers} />
                </div>
              </FormSection>

              <FormSection n="2" title="Billing request" intro="What you need help with.">
                <div className="grid gap-5">
                  <SelectField {...field('serviceType')} label="Service Needed" required placeholder="Select a service" options={SERVICE_OPTIONS} />
                  <TextField {...field('subject')} label="Subject / Issue Title" required icon={Type} placeholder="e.g. Rising claim denials from one payer" maxLength={LIMITS.subject} />
                  <TextArea
                    {...field('description')}
                    label="Describe the Issue"
                    required
                    max={LIMITS.description}
                    placeholder="What's happening, since when, which payers or processes are involved, and what you'd like help with."
                  />
                  <Segmented name="urgency" label="Urgency" value={data.urgency} onChange={set('urgency')} error={err('urgency')} options={[{ value: 'Low' }, { value: 'Medium' }, { value: 'High' }]} tones={{ Low: 'bg-emerald-500', Medium: 'bg-amber-500', High: 'bg-red-500' }} />

                  <div>
                    <p className="mb-2 text-sm font-semibold text-navy-900">Supporting Document <span className="font-normal text-mist-400">(optional)</span></p>
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
                        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-7 text-center transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-royal-500/20 ${drag ? 'scale-[1.01] border-royal-500 bg-royal-50' : fileError ? 'border-red-300 bg-red-50/40' : 'border-mist-200 bg-mist-50 hover:border-royal-300 hover:bg-royal-50/50'}`}
                      >
                        <input ref={fileInput} type="file" accept={ATTACHMENT_ACCEPT} className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-royal-600 shadow-soft"><Paperclip className="h-5 w-5" aria-hidden /></span>
                        <span className="text-sm font-semibold text-navy-900">Drop a file here or <span className="text-royal-600 underline underline-offset-4">browse</span></span>
                        <span className="text-xs text-mist-500">e.g. an aging or denial summary. PDF, image, spreadsheet or Word, up to 3 MB. No patient data.</span>
                      </label>
                    )}
                    <FieldError id="f-attachment-err" error={fileError} />
                  </div>
                </div>
              </FormSection>

              <FormSection n="3" title="Contact details" intro="Who we should follow up with about this request.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField {...field('fullName')} label="Full Name" required icon={User} autoComplete="name" placeholder="Jane Smith" maxLength={LIMITS.fullName} />
                  <TextField {...field('company')} label="Practice / Organization Name" required icon={Building2} autoComplete="organization" placeholder="Practice, clinic or hospital" maxLength={LIMITS.company} />
                  <TextField {...field('email')} type="email" label="Email Address" required icon={Mail} autoComplete="email" inputMode="email" placeholder="name@organization.com" maxLength={LIMITS.email} />
                  <TextField {...field('phone')} type="tel" label="Phone Number" required icon={Phone} autoComplete="tel" inputMode="tel" placeholder="+1 (555) 000-0000" maxLength={LIMITS.phone} />
                  <div className="sm:col-span-2">
                    <Segmented name="contactMethod" label="Preferred Contact Method" value={data.contactMethod} onChange={set('contactMethod')} error={err('contactMethod')} options={[{ value: 'Email', icon: Mail }, { value: 'Phone', icon: Phone }]} />
                  </div>
                </div>
              </FormSection>

              <Honeypot value={data.website} onChange={set('website')} />

              <div className="space-y-3">
                <Checkbox name="noPhi" checked={data.noPhi} onChange={set('noPhi')} error={err('noPhi')}>
                  I confirm this request does <strong>not</strong> contain patient names, medical records or any other protected health information.
                </Checkbox>
                <Checkbox name="consent" checked={data.consent} onChange={set('consent')} error={err('consent')}>
                  I agree that Billwise LLC may contact me about this request, as described in the <Link to="/privacy-policy" className="font-semibold text-royal-700 underline underline-offset-4">Privacy Policy</Link>.
                </Checkbox>
              </div>

              <ServerError show={f.status === 'error'} message={f.serverError} />

              <div className="flex flex-col-reverse items-start justify-between gap-5 border-t border-mist-200 pt-8 sm:flex-row sm:items-center">
                <p className="flex items-center gap-2 text-sm text-mist-500"><Lock className="h-4 w-4 text-royal-600" aria-hidden /> Sent over an encrypted connection.</p>
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
