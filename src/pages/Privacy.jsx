import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';
import LegalLayout from '../components/layout/LegalLayout.jsx';
import { site } from '../config/site.js';

export default function Privacy() {
  useSEO({ title: 'Privacy Policy', path: '/privacy-policy', description: 'How Billwise LLC collects, uses and protects information submitted through billwisellc.com.' });
  return (
    <LegalLayout title="Privacy Policy" accent={['Policy']} intro="How we collect, use and protect the information you share with us through this website." updated="November 12, 2026">
      <p>This Privacy Policy explains how {site.name} (“Billwise,” “we,” “us” or “our”) handles information collected through {site.url.replace('https://', '')} (the “Website”). By using the Website, you agree to the practices described here.</p>

      <h2>1. Information we collect</h2>
      <h3>Information you provide</h3>
      <p>When you contact us or submit a request, we collect the information you choose to provide, which may include:</p>
      <ul>
        <li>Your full name, organization name, email address and phone number</li>
        <li>Your preferred contact method, the best time to reach you, and any message you include</li>
        <li>Details about your organization, such as organization type, specialty, number of providers, approximate claim volume, billing software and main payers</li>
        <li>The billing service you are interested in, a subject line, a description of your request and its urgency</li>
        <li>Any file you choose to attach</li>
      </ul>
      <h3>SMS Terms of Service</h3>
      <p>By opting into SMS from a web form or other medium, you are agreeing to receive SMS messages from Billwise LLC. This includes SMS messages for conversations (external). Message frequency varies. Message and data rates may apply.</p>
      <h3>Note</h3>
      <p>SMS consent is not shared with third parties.</p>
      <h3>Information collected automatically</h3>
      <p>Like most websites, our hosting provider may automatically record technical information such as your IP address, browser type, device information and pages visited. We use this to operate, secure and improve the Website and to prevent abuse such as spam.</p>

      <h2>2. Protected health information</h2>
      <p><strong>Please do not submit protected health information (PHI) through this Website or by ordinary email.</strong> This includes patient names, dates of birth, medical record or member ID numbers, diagnoses, treatment details, claim forms, explanations of benefits or medical records. Our Website forms are intended for business inquiries only. If our work together requires access to patient information, we will arrange an appropriate, secure method and the necessary agreements before any such information is shared.</p>
      <p>If you submit PHI through the Website despite this notice, we will take reasonable steps to delete it.</p>

      <h2>3. How we use information</h2>
      <ul>
        <li>To review and respond to your inquiries and requests</li>
        <li>To contact you using your preferred contact method</li>
        <li>To provide, evaluate and improve our services</li>
        <li>To protect the Website, prevent spam and fraud, and comply with legal obligations</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>4. How we share information</h2>
      <p>We share information only as needed to operate our business, including with service providers that host the Website and deliver form submissions by email to our team. These providers may only use the information to perform services for us. We may also disclose information if required by law, to protect our rights, or in connection with a business transfer.</p>

      <h2>5. Data security</h2>
      <p>The Website uses encrypted (HTTPS) connections, and form submissions are validated and delivered directly to our team. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, which is one reason we ask you not to include sensitive patient information.</p>

      <h2>6. Data retention</h2>
      <p>We keep inquiry information for as long as reasonably necessary to respond to you, maintain business records, and meet legal obligations, after which it is deleted or anonymized.</p>

      <h2>7. Your choices and rights</h2>
      <p>You may ask us to access, correct or delete the personal information you have provided, or to stop contacting you, by emailing <a href={`mailto:${site.email}`}>{site.email}</a>. Depending on where you live, you may have additional rights under applicable law, and we will honor requests as required.</p>

      <h2>8. Cookies</h2>
      <p>The Website does not use advertising or tracking cookies. It may use your browser’s session storage for basic functionality, such as remembering that the loading screen has already been shown.</p>

      <h2>9. Children’s privacy</h2>
      <p>The Website is intended for businesses and is not directed to children under 13. We do not knowingly collect personal information from children.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this Privacy Policy from time to time. The “Last updated” date above shows when it was last revised.</p>

      <h2>11. Contact us</h2>
      <p>Questions about this policy? Email <a href={`mailto:${site.email}`}>{site.email}</a>, call <a href={site.phoneHref}>{site.phone}</a>, or use our <Link to="/contact">contact page</Link>.</p>
    </LegalLayout>
  );
}
