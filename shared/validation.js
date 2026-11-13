/**
 * Validation rules shared by the browser form and the /api/submit function,
 * so the server enforces exactly what the user sees.
 */
export const LIMITS = {
  fullName: 100,
  company: 150,
  email: 254,
  phone: 30,
  subject: 150,
  description: 5000,
  descriptionMin: 20,
};

export const ATTACHMENT = {
  maxBytes: 3 * 1024 * 1024, // 3 MB (stays under Vercel's 4.5 MB request limit after base64)
  types: {
    'application/pdf': 'pdf',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'text/csv': 'csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/msword': 'doc',
  },
};
export const ATTACHMENT_ACCEPT = '.pdf,.png,.jpg,.jpeg,.csv,.xlsx,.xls,.docx,.doc';

export const CONTACT_METHODS = ['Email', 'Phone'];
export const URGENCY_LEVELS = ['Low', 'Medium', 'High'];
export const ORGANIZATION_TYPES = ['Doctor / physician practice', 'Hospital', 'Clinic', 'Other healthcare organization'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{7,30}$/;

export function validateSubmission(data, serviceOptions = []) {
  const errors = {};
  const s = (v) => (typeof v === 'string' ? v.trim() : '');

  const fullName = s(data.fullName);
  if (!fullName) errors.fullName = 'Please enter your full name.';
  else if (fullName.length < 2) errors.fullName = 'Name looks too short.';
  else if (fullName.length > LIMITS.fullName) errors.fullName = `Please keep this under ${LIMITS.fullName} characters.`;

  const company = s(data.company);
  if (!company) errors.company = 'Please enter your company or business name.';
  else if (company.length > LIMITS.company) errors.company = `Please keep this under ${LIMITS.company} characters.`;

  const email = s(data.email);
  if (!email) errors.email = 'Please enter your email address.';
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address (e.g. name@company.com).';

  const phone = s(data.phone);
  const digits = phone.replace(/\D/g, '');
  if (!phone) errors.phone = 'Please enter your phone number.';
  else if (!PHONE_RE.test(phone) || digits.length < 7 || digits.length > 15) errors.phone = 'Please enter a valid phone number.';

  const serviceType = s(data.serviceType);
  if (!serviceType) errors.serviceType = 'Please select the type of billing service.';
  else if (serviceOptions.length && !serviceOptions.includes(serviceType)) errors.serviceType = 'Please choose an option from the list.';

  const subject = s(data.subject);
  if (!subject) errors.subject = 'Please add a short subject or issue title.';
  else if (subject.length > LIMITS.subject) errors.subject = `Please keep this under ${LIMITS.subject} characters.`;

  const description = s(data.description);
  if (!description) errors.description = 'Please describe your billing requirements or concern.';
  else if (description.length < LIMITS.descriptionMin) errors.description = `Please add a little more detail (at least ${LIMITS.descriptionMin} characters).`;
  else if (description.length > LIMITS.description) errors.description = `Please keep this under ${LIMITS.description} characters.`;

  if (!CONTACT_METHODS.includes(data.contactMethod)) errors.contactMethod = 'Please choose a preferred contact method.';
  if (!URGENCY_LEVELS.includes(data.urgency)) errors.urgency = 'Please choose an urgency level.';

  const organizationType = s(data.organizationType);
  if (organizationType && !ORGANIZATION_TYPES.includes(organizationType)) errors.organizationType = 'Please choose an option from the list.';

  if (!data.noPhi) errors.noPhi = 'Please confirm your message contains no patient health information.';
  if (!data.consent) errors.consent = 'Please confirm you agree to be contacted about this request.';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    clean: { fullName, company, organizationType: organizationType || 'Not specified', email, phone, serviceType, subject, description, contactMethod: data.contactMethod, urgency: data.urgency },
  };
}

export function validateAttachment(file) {
  if (!file) return null;
  if (!ATTACHMENT.types[file.type]) return 'Unsupported file type. Please upload a PDF, image, spreadsheet, or Word document.';
  if (file.size > ATTACHMENT.maxBytes) return 'File is too large. Maximum size is 3 MB.';
  return null;
}
