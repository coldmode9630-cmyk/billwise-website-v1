import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';
import LegalLayout from '../components/layout/LegalLayout.jsx';
import { site } from '../config/site.js';

export default function Terms() {
  useSEO({ title: 'Terms and Conditions', path: '/terms-and-conditions', description: 'Terms and conditions for using the Bill Wise LLC website.' });
  return (
    <LegalLayout title="Terms and Conditions" accent={['Conditions']} intro="The terms that apply when you use the Bill Wise LLC website." updated="November 12, 2026">
      <p>These Terms and Conditions (“Terms”) govern your use of {site.url.replace('https://', '')} (the “Website”), operated by {site.name} (“Bill Wise,” “we,” “us” or “our”). By using the Website, you agree to these Terms. If you do not agree, please do not use the Website.</p>

      <h2>1. Use of the Website</h2>
      <p>You may use the Website for lawful purposes only. You agree not to misuse the Website, including by attempting to gain unauthorized access, interfering with its operation, submitting false or misleading information, or sending spam or malicious content.</p>

      <h2>2. Information only, not professional advice</h2>
      <p>Content on the Website is provided for general information about our services. It is not legal, financial, coding, compliance or medical advice, and you should not rely on it as such.</p>

      <h2>3. No client relationship</h2>
      <p>Submitting a request or contacting us through the Website does not create a client or business relationship. Any services will be provided only under a separate written agreement between you and {site.name}, which will govern those services.</p>

      <h2>4. Your submissions</h2>
      <p>You are responsible for the information you submit and confirm that it is accurate and that you are entitled to share it. <strong>You agree not to submit protected health information (PHI) or other patient-identifying information through the Website.</strong> See our <Link to="/privacy-policy">Privacy Policy</Link> for how we handle submitted information.</p>

      <h2>5. Intellectual property</h2>
      <p>The Website and its content, including text, graphics, logos and design, are owned by or licensed to {site.name} and are protected by applicable intellectual property laws. You may not copy, reproduce or distribute them without our prior written permission, except for personal, non-commercial viewing.</p>

      <h2>6. Third-party links</h2>
      <p>The Website may contain links to third-party websites. We are not responsible for their content or practices.</p>

      <h2>7. Disclaimer of warranties</h2>
      <p>The Website is provided “as is” and “as available,” without warranties of any kind, express or implied. We do not warrant that the Website will be uninterrupted, error-free or free of harmful components.</p>

      <h2>8. Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {site.name} will not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of, or inability to use, the Website.</p>

      <h2>9. Indemnification</h2>
      <p>You agree to indemnify and hold harmless {site.name} from claims arising out of your misuse of the Website or violation of these Terms.</p>

      <h2>10. Governing law</h2>
      <p>These Terms are governed by the laws of the state in which {site.name} is organized, without regard to conflict-of-law principles, and applicable United States federal law.</p>

      <h2>11. Changes</h2>
      <p>We may update these Terms at any time. Continued use of the Website after changes are posted means you accept the updated Terms.</p>

      <h2>12. Contact</h2>
      <p>Questions about these Terms? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>.</p>
    </LegalLayout>
  );
}
