# Billwise LLC: Website

Medical billing services website for **Billwise LLC** (https://billwisellc.com).
Built with **React 18, Vite 5, Tailwind CSS 3, Framer Motion and Lucide icons**. It includes a serverless backend
(`/api/submit`) that emails every form submission to **Info@billwisellc.com** through **Resend**.

---

## 1. What's included

| Page | URL |
|---|---|
| Home | `/` |
| About Us | `/about` |
| Services | `/services` |
| Contact Us (contact details + form) | `/contact` |
| Submit a Request (inquiry form) | `/submit-request` |
| Privacy Policy | `/privacy-policy` |
| Terms and Conditions | `/terms-and-conditions` |
| 404 page | any unknown URL |

Also included: favicon and app icons, Open Graph share image, `sitemap.xml`, `robots.txt`, structured data
(JSON-LD), security headers, a reduced-motion setting, and a mobile menu.

```
billwise/
├── api/submit.js              ← serverless function: validates, blocks spam, emails via Resend
├── shared/validation.js       ← validation rules shared by the form AND the server
├── public/                    ← favicon, icons, og-image.png, robots.txt, sitemap.xml
├── src/
│   ├── config/
│   │   ├── site.js            ← company name, email, phone, navigation   ✏️
│   │   ├── services.js        ← THE SERVICES LIST (edit here)            ✏️
│   │   └── faqs.js            ← FAQ questions & answers                  ✏️
│   ├── components/            ← layout, home sections, form, UI parts
│   ├── pages/                 ← one file per page
│   └── index.css              ← global styles
├── tests/submit.test.js       ← backend tests (npm run test:api)
├── vercel.json                ← routing + security headers for Vercel
└── .env.example               ← environment variables you need to set
```

## 2. Editing content

- **Services**: edit `src/config/services.js` (11 services in two groups: "Billing & Revenue Cycle" and "Credentialing & Enrollment", set by each entry's `category`). Each entry automatically appears on the Home page, the Services
  page, the footer, and the form's "Type of Billing Service" dropdown, and the server accepts it.
  Icons are Lucide names. If you use a new icon, add it to `src/lib/icons.js`.
- **Company details** (email, phone, description): `src/config/site.js`.
- **FAQs**: `src/config/faqs.js`.
- **Logo**: the logo was recreated as an SVG in `src/components/ui/LogoMark.jsx` (icon) and
  `src/components/ui/Logo.jsx` (icon + "BILLWISELLC" wordmark). To use your original artwork instead, export it as
  SVG (preferred) or PNG, put it in `public/`, and replace the contents of `Logo.jsx` with an `<img src="/your-logo.svg">`.
- **Legal pages**: `src/pages/Privacy.jsx` and `src/pages/Terms.jsx` are general-purpose templates.
  **Have them reviewed by your attorney** before launch.

## 3. Run locally

Requires **Node.js 18+**.

```bash
npm install
cp .env.example .env      # then put your real Resend key in .env
npm run dev               # http://localhost:5173 (the form works locally too)
```

Other commands:

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally (form backend not included)
npm run test:api   # run the backend tests (mocked email, no real emails sent)
```

## 4. Set up the email system (Resend)

The form posts to `/api/submit`, which runs on the server. Your API key **never** reaches the browser.

1. Create a free account at **https://resend.com**.
2. **Verify your domain**: Resend → *Domains* → *Add Domain* → `billwisellc.com`.
   Resend shows several DNS records (SPF/TXT, DKIM, MX for bounces). Add them at your domain registrar
   (GoDaddy, Namecheap, Cloudflare, etc.) and click *Verify*. This usually takes minutes, occasionally a few hours.
3. Create an API key: Resend → *API Keys* → *Create* (permission: "Sending access").
4. Add these **environment variables** in Vercel (*Project → Settings → Environment Variables*), or in `.env`
   for local use:

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | `re_...` (your key) |
   | `CONTACT_TO_EMAIL` | `Info@billwisellc.com` |
   | `CONTACT_FROM_EMAIL` | `Billwise Website <forms@billwisellc.com>` |

5. Redeploy (Vercel → *Deployments* → ⋯ → *Redeploy*) so the variables take effect.

Each submission arrives at Info@billwisellc.com as a formatted email. The subject line is like
`[High] Aging A/R over 90 days — Riverside Clinic`, and **Reply-To is set to the client's email**, so you can just
hit Reply. Optional attachments (PDF, images, Excel/CSV, Word, up to 3 MB) come through as email attachments.

**How the form protects you**

- Same validation in the browser and on the server (required fields, valid email/phone, length limits).
- Spam protection: a hidden honeypot field, a minimum fill time, and per-IP rate limiting (5 per 10 minutes).
- Duplicate protection: the button locks while sending, and each submission carries a unique ID that the
  server and Resend use to deliver it only once.
- A success message appears **only** after Resend accepts the email. If the key is missing or Resend fails, the
  visitor sees an error with your email and phone number instead.
- All user input is HTML-escaped in the email.

## 5. Deploy to Vercel (recommended, free tier works)

**Option A: GitHub (easiest updates)**
1. Create a GitHub repository and upload this folder (without `node_modules`, `dist` or `.env`).
2. Go to https://vercel.com/new → import the repository. Vercel detects Vite automatically
   (Build command `npm run build`, Output `dist`).
3. Add the three environment variables from step 4 above → **Deploy**.

**Option B: Vercel CLI**
```bash
npm i -g vercel
vercel          # first deploy (follow prompts)
vercel --prod   # production deploy
```
Then add the environment variables in the Vercel dashboard and redeploy.

## 6. Connect billwisellc.com

1. Vercel → your project → *Settings → Domains* → add `billwisellc.com` and `www.billwisellc.com`.
2. At your domain registrar, add the DNS records Vercel shows. Typically:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

   (Always use the exact values shown in your Vercel dashboard. They take precedence over this table.)
3. Choose which version is primary (e.g. redirect `www` → `billwisellc.com`). HTTPS is issued automatically.
4. Keep the Resend DNS records from step 4.2. They don't conflict with the website records.
5. After it's live, submit `https://billwisellc.com/sitemap.xml` in Google Search Console.

## 7. Go-live checklist

- [ ] Resend domain verified and the 3 environment variables set in Vercel
- [ ] Send a real test through `/submit-request` and confirm it arrives at Info@billwisellc.com
- [ ] Reply to the test email and check the reply goes to the sender's address
- [ ] Review the services list, FAQs and legal pages for accuracy
- [ ] Domain connected and HTTPS working

## 8. Important notes on patient data (HIPAA)

The form shows a prominent warning, and visitors must tick a confirmation that they're **not** submitting protected
health information (PHI). Email delivered through this form is **not** a HIPAA-compliant channel for PHI. When you
need to exchange patient data with a client, use a dedicated secure tool covered by a Business Associate Agreement
(BAA), such as a HIPAA-compliant secure file share or encrypted email service.

The website does not claim HIPAA compliance, certifications, statistics or testimonials. Add those only once they're
verified and you can substantiate them.

## 9. Testing performed

- `npm run test:api`: 11 backend tests (delivery to Info@billwisellc.com, Reply-To, HTML escaping, validation,
  honeypot/timing spam blocks, rate limiting, duplicate prevention, attachments, provider failure, missing config).
- Browser tests (Playwright) on desktop, iPhone and iPad: all 7 pages load with correct titles and a single `<h1>`;
  every internal link resolves; no empty or `#` links; mailto/tel links work; navbar, mobile menu, service
  "Learn more" panels, service preselection and FAQ work; validation errors appear; double-clicking Submit sends
  only one email; success appears only after the backend accepts; backend failure shows an error; no horizontal
  overflow on mobile; content is visible with reduced motion; no console errors.
- Delivery through the **real** Resend account can only be tested once your API key is set (go-live checklist above).
