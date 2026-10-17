// Sanity Studio schema — Homepage copy (singleton).
// Services and testimonials are managed in their own document lists.
export const homepageContent = {
  name: 'homepageContent',
  title: 'Homepage content',
  type: 'document',
  groups: [
  { name: 'hero', title: 'Hero', default: true },
  { name: 'about', title: 'About' },
  { name: 'sections', title: 'Section intros' },
  { name: 'contact', title: 'Contact' }],

  fields: [
  { name: 'heroHeading', title: 'Hero heading', type: 'string', group: 'hero', description: 'The final sentence is highlighted in lavender.' },
  { name: 'heroDescription', title: 'Hero description', type: 'text', rows: 3, group: 'hero' },
  { name: 'heroPrimaryCta', title: 'Primary button label', type: 'string', group: 'hero' },
  { name: 'heroSecondaryCta', title: 'Secondary button label', type: 'string', group: 'hero' },
  { name: 'aboutHeading', title: 'About heading', type: 'string', group: 'about' },
  { name: 'aboutBody', title: 'About paragraphs', type: 'array', of: [{ type: 'text', rows: 3 }], group: 'about' },
  { name: 'servicesHeading', title: 'Services heading', type: 'string', group: 'sections' },
  { name: 'servicesIntro', title: 'Services intro', type: 'text', rows: 2, group: 'sections' },
  { name: 'testimonialsHeading', title: 'Testimonials heading', type: 'string', group: 'sections' },
  { name: 'testimonialsIntro', title: 'Testimonials intro', type: 'text', rows: 2, group: 'sections' },
  { name: 'contactHeading', title: 'Contact heading', type: 'string', group: 'contact' },
  { name: 'contactDescription', title: 'Contact description', type: 'text', rows: 3, group: 'contact' }],

  preview: { prepare: () => ({ title: 'Homepage content' }) }
};