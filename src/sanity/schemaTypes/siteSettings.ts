// Sanity Studio schema — Site settings (singleton).
export const siteSettings = {
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
  { name: 'brand', title: 'Brand', default: true },
  { name: 'contact', title: 'Contact' },
  { name: 'seo', title: 'SEO' }],

  fields: [
  { name: 'companyName', title: 'Company name', type: 'string', group: 'brand', initialValue: 'Rise and Connect' },
  { name: 'logo', title: 'Company logo', type: 'image', group: 'brand', description: 'Use a transparent PNG or SVG.' },
  { name: 'footerText', title: 'Footer description', type: 'text', rows: 3, group: 'brand' },
  {
    name: 'contactEmail',
    title: 'Contact email (Gmail button)',
    type: 'string',
    group: 'contact',
    validation: (Rule: {email: () => unknown;}) => Rule.email()
  },
  { name: 'discordUrl', title: 'Discord invite / server URL', type: 'url', group: 'contact' },
  {
    name: 'slackWebhookUrl',
    title: 'Slack incoming webhook URL',
    type: 'url',
    group: 'contact',
    description:
    'Legacy/local fallback only. Prefer the Cloudflare Worker endpoint below so the Slack webhook stays private.'
  },
  {
    name: 'slackEndpointUrl',
    title: 'Slack Cloudflare Worker endpoint',
    type: 'url',
    group: 'contact',
    description: 'Preferred production endpoint. The Worker should validate and forward submissions to Slack without exposing the Slack webhook in the browser.'
  },
  {
    name: 'address',
    title: 'Business address',
    type: 'object',
    group: 'contact',
    fields: [
      { name: 'street', title: 'Street', type: 'string' },
      { name: 'cityStateZip', title: 'City, state, ZIP', type: 'string' },
      { name: 'phone', title: 'Phone', type: 'string' }
    ]
  },
  {
    name: 'socialLinks',
    title: 'Social media links',
    type: 'array',
    group: 'contact',
    of: [
    {
      type: 'object',
      name: 'socialLink',
      fields: [
      { name: 'label', title: 'Label', type: 'string' },
      { name: 'url', title: 'URL', type: 'url' }]

    }]

  },
  { name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo' },
  { name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, group: 'seo' },
  { name: 'ogImage', title: 'Social sharing image', type: 'image', group: 'seo', description: '1200 × 630 recommended.' }],

  preview: { prepare: () => ({ title: 'Site settings' }) }
};
