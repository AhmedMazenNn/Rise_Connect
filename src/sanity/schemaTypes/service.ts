// Sanity Studio schema — Services.
export const service = {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
  { name: 'title', title: 'Title', type: 'string', validation: (Rule: {required: () => unknown;}) => Rule.required() },
  { name: 'description', title: 'Description', type: 'text', rows: 3 },
  {
    name: 'icon',
    title: 'Icon',
    type: 'string',
    options: {
      list: [
      { title: 'Phone (calling & VAs)', value: 'phone' },
      { title: 'House (real estate)', value: 'home' },
      { title: 'Database (CRM & dialer)', value: 'database' },
      { title: 'Calendar (appointments)', value: 'calendar' }]

    }
  },
  { name: 'image', title: 'Custom icon image', type: 'image', description: 'Optional — replaces the icon above.' },
  { name: 'points', title: 'Included tasks', type: 'array', of: [{ type: 'string' }] },
  { name: 'order', title: 'Display order', type: 'number', initialValue: 10 },
  { name: 'isVisible', title: 'Visible on website', type: 'boolean', initialValue: true }],

  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'description', media: 'image' } }
};