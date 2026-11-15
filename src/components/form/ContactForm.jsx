import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Building2, Mail, Phone, Loader2, Send } from 'lucide-react';
import { validateContact, LIMITS, BEST_TIMES } from '../../../shared/validation.js';
import { TextField, TextArea, Segmented, Checkbox, Honeypot, ServerError, FormSuccess } from './Fields.jsx';
import useFormSubmit from './useFormSubmit.js';
import Button from '../ui/Button.jsx';

const initial = {
  fullName: '', company: '', email: '', phone: '', contactMethod: 'Phone', bestTime: 'Anytime', message: '',
  consent: false, website: '',
};

/** Contact page: brief details so our team can get in touch. Billing details go on Submit a Request. */
export default function ContactForm() {
  const f = useFormSubmit({ formType: 'contact', initial, validate: validateContact });
  const { data, set, blur, err, submitting } = f;
  const field = (name) => ({ name, value: data[name], onChange: set(name), onBlur: blur(name), error: err(name) });

  return (
    <div ref={f.formRef} className="relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-mist-200 bg-white shadow-lift">
      <div aria-hidden className="h-1.5 bg-gradient-to-r from-royal-700 via-royal-500 to-royal-300" />
      <AnimatePresence mode="wait" initial={false}>
        {f.status === 'success' ? (
          <FormSuccess
            key="ok"
            title="Thanks, we'll be in touch"
            text={`A member of our team will reach out by ${data.contactMethod.toLowerCase()} shortly.`}
            refId={f.refId}
            onReset={() => f.reset()}
            resetLabel="Send another message"
          />
        ) : (
          <motion.form key="form" noValidate onSubmit={(e) => f.submit(e)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="p-6 sm:p-10" aria-busy={submitting}>
            <header className="mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">Request a call back</h2>
              <p className="mt-2 text-mist-500">Leave your details and we'll get in touch.</p>
            </header>

            <fieldset disabled={submitting} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField {...field('fullName')} label="Full Name" required icon={User} autoComplete="name" placeholder="Jane Smith" maxLength={LIMITS.fullName} />
                <TextField {...field('company')} label="Organization" icon={Building2} autoComplete="organization" placeholder="Practice, clinic or hospital" maxLength={LIMITS.company} />
                <TextField {...field('email')} type="email" label="Email Address" required icon={Mail} autoComplete="email" inputMode="email" placeholder="name@organization.com" maxLength={LIMITS.email} />
                <TextField {...field('phone')} type="tel" label="Phone Number" required icon={Phone} autoComplete="tel" inputMode="tel" placeholder="+1 (555) 000-0000" maxLength={LIMITS.phone} />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Segmented name="contactMethod" label="Preferred Contact Method" value={data.contactMethod} onChange={set('contactMethod')} error={err('contactMethod')} options={[{ value: 'Phone', icon: Phone }, { value: 'Email', icon: Mail }]} />
                <Segmented name="bestTime" label="Best Time to Reach You" value={data.bestTime} onChange={set('bestTime')} error={err('bestTime')} options={BEST_TIMES.map((value) => ({ value }))} />
              </div>
              <TextArea {...field('message')} short label="Message" max={LIMITS.message} placeholder="Anything you'd like us to know before we call. Please don't include patient information." />

              <Honeypot value={data.website} onChange={set('website')} />

              <Checkbox name="consent" checked={data.consent} onChange={set('consent')} error={err('consent')}>
                I agree that Billwise LLC may contact me, as described in the <Link to="/privacy-policy" className="font-semibold text-royal-700 underline underline-offset-4">Privacy Policy</Link>.
              </Checkbox>

              <ServerError show={f.status === 'error'} message={f.serverError} />

              <div className="flex flex-col items-start justify-between gap-5 border-t border-mist-200 pt-6 sm:flex-row sm:items-center">
                <p className="text-sm text-mist-500">
                  Have billing details to share? <Link to="/submit-request" className="font-semibold text-royal-700 underline underline-offset-4">Submit a request</Link>
                </p>
                <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</>) : (<>Send <Send className="h-4 w-4" aria-hidden /></>)}
                </Button>
              </div>
              <p className="sr-only" aria-live="polite">{submitting ? 'Sending your message' : ''}</p>
            </fieldset>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
