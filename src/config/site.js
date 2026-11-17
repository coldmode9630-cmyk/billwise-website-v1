// Company details used across the site. Edit here, it updates everywhere.
export const site = {
  name: 'Billwise LLC',
  shortName: 'Billwise',
  url: 'https://billwisellc.com',
  email: 'Info@billwisellc.com',
  phone: '+1 503-360-9994',
  phoneHref: 'tel:+15033609994',
  locations: [
    {
      label: 'Oregon Office Address',
      street: '9710 SW North Dakota St',
      city: 'Tigard',
      region: 'OR',
      postalCode: '97223',
      country: 'US',
      line: '9710 SW North Dakota St, Tigard, OR 97223',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=9710+SW+North+Dakota+St%2C+Tigard%2C+OR+97223',
    },
    {
      label: 'Colorado Office Address',
      street: '1942 Broadway Ste 314C',
      city: 'Boulder',
      region: 'CO',
      postalCode: '80302',
      country: 'US',
      line: '1942 Broadway Ste 314C, Boulder, CO 80302',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=1942+Broadway+Ste+314C%2C+Boulder%2C+CO+80302',
    },
  ],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/billwisellc/' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61596426577064' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/103257357/' },
  ],
  tagline: 'Smarter Billing. Better Business.',
  description:
    'Billwise LLC provides medical billing services for doctors, hospitals and clinics: claims, coding support, denials, A/R follow-up, payment posting, credentialing and payer enrollment.',
};

export const audiences = ['Doctors & physician practices', 'Hospitals', 'Clinics'];

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];
