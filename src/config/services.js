/**
 * EDITABLE SERVICES LIST
 * ----------------------
 * Add, remove or reorder entries here. Each one automatically appears on the
 * Home page, the Services page, the footer, and the form's "Type of Billing
 * Service" dropdown (and the server accepts it).
 *
 *   slug     – unique id used in links, e.g. /services#claims-submission
 *   icon     – any Lucide icon name from https://lucide.dev/icons (PascalCase)
 *   title    – card title
 *   summary  – one or two sentences on the card
 *   details  – bullet points shown in "Learn more"
 *   category – which group the card appears under (see serviceCategories below)
 */
export const services = [
  {
    category: 'billing',
    slug: 'claims-submission',
    icon: 'FileCheck2',
    title: 'Medical Claims Submission',
    summary: 'Clean, accurate claims prepared and submitted promptly to payers, so reimbursements are not held up by avoidable errors.',
    details: [
      'Claim preparation and scrubbing before submission',
      'Electronic and paper claim submission',
      'Tracking of claim status through adjudication',
      'Correction and resubmission of rejected claims',
    ],
  },
  {
    category: 'billing',
    slug: 'coding-support',
    icon: 'ClipboardList',
    title: 'Medical Coding Support',
    summary: 'Careful review of codes and modifiers so claims reflect the care delivered and meet payer requirements.',
    details: [
      'Review of CPT, ICD-10 and HCPCS code selection',
      'Modifier and documentation consistency checks',
      'Flagging of coding issues before claims go out',
      'Feedback to help reduce repeat errors',
    ],
  },
  {
    category: 'billing',
    slug: 'denial-management',
    icon: 'ShieldAlert',
    title: 'Denial Management & Appeals',
    summary: 'We investigate denied claims, correct what can be corrected, and prepare appeals where they are warranted.',
    details: [
      'Root-cause review of denials',
      'Corrected claims and timely resubmission',
      'Preparation of appeal letters and supporting documents',
      'Pattern tracking to help prevent future denials',
    ],
  },
  {
    category: 'billing',
    slug: 'ar-follow-up',
    icon: 'Timer',
    title: 'Accounts Receivable Follow-Up',
    summary: 'Consistent follow-up on outstanding and aging claims so balances don’t quietly slip past filing limits.',
    details: [
      'Aging report review and prioritization',
      'Payer follow-up on unpaid and underpaid claims',
      'Documentation of every follow-up action',
      'Escalation of complex or stalled accounts',
    ],
  },
  {
    category: 'billing',
    slug: 'eligibility-verification',
    icon: 'BadgeCheck',
    title: 'Insurance Eligibility Verification',
    summary: 'Coverage and benefits checked ahead of visits, helping your front desk set clear expectations with patients.',
    details: [
      'Verification of active coverage and plan details',
      'Benefits, copay and deductible confirmation',
      'Prior authorization status checks where required',
      'Notes shared with your team before appointments',
    ],
  },
  {
    category: 'billing',
    slug: 'payment-posting',
    icon: 'Receipt',
    title: 'Payment Posting & Reconciliation',
    summary: 'Accurate posting of payer and patient payments, with ERA/EOB reconciliation that keeps your books clean.',
    details: [
      'Posting of ERAs, EOBs and patient payments',
      'Reconciliation against deposits',
      'Identification of underpayments and adjustments',
      'Clear records for audits and month-end',
    ],
  },
  {
    category: 'billing',
    slug: 'patient-billing',
    icon: 'Mail',
    title: 'Patient Billing & Statements',
    summary: 'Clear, courteous patient statements and support that help patients understand what they owe and why.',
    details: [
      'Preparation and delivery of patient statements',
      'Handling of patient billing questions',
      'Payment plan coordination per your policies',
      'Balance follow-up with a professional tone',
    ],
  },
  {
    category: 'billing',
    slug: 'reporting',
    icon: 'BarChart3',
    title: 'Revenue Cycle Reporting',
    summary: 'Straightforward reports that show where your claims, payments and receivables stand, without the noise.',
    details: [
      'Regular summaries of claims, payments and A/R',
      'Denial and rejection trend visibility',
      'Plain-language explanations of what changed',
      'Reports tailored to the questions you care about',
    ],
  },
  {
    category: 'credentialing',
    slug: 'credentialing',
    icon: 'UserCheck',
    title: 'Provider Credentialing',
    summary: 'We prepare and track credentialing applications so your providers are approved with payers and can bill without delays.',
    details: [
      'Collection and organization of provider documents',
      'CAQH profile setup, updates and attestation',
      'Preparation and submission of payer credentialing applications',
      'Follow-up with payers until a decision is reached',
      'Re-credentialing and expiration date tracking',
    ],
  },
  {
    category: 'credentialing',
    slug: 'insurance-enrollment',
    icon: 'FileSignature',
    title: 'Insurance Enrollment',
    summary: 'Enrollment with Medicare, Medicaid and commercial insurance plans, handled from application to approval.',
    details: [
      'Medicare enrollment, including PECOS',
      'Medicaid and commercial payer enrollment',
      'New provider, new location and group enrollments',
      'Updates for address, ownership and other changes',
      'Status tracking and payer follow-up',
    ],
  },
  {
    category: 'credentialing',
    slug: 'eft-era-enrollment',
    icon: 'Landmark',
    title: 'EFT & ERA Enrollment',
    summary: 'We set up electronic funds transfer (EFT) and electronic remittance advice (ERA) with your payers so payments and remittances arrive electronically.',
    details: [
      'EFT enrollment for direct deposit of payer payments',
      'ERA enrollment for electronic remittance (835) files',
      'Coordination with your clearinghouse and payers',
      'Updates when bank details or providers change',
      'Confirmation that payments and remittances are flowing',
    ],
  },
];

export const serviceCategories = [
  { id: 'billing', title: 'Billing & Revenue Cycle', intro: 'Claims, payments and follow-up across the full billing cycle.' },
  { id: 'credentialing', title: 'Credentialing & Enrollment', intro: 'Getting your providers approved and connected with payers, so billing can start smoothly.' },
];

export const serviceTitles = services.map((s) => s.title);
