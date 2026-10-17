// Sanity Studio schema — Testimonials (video, image, or written).
export const testimonial = {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
  { name: 'clientName', title: 'Client name', type: 'string', validation: (Rule: {required: () => unknown;}) => Rule.required() },
  { name: 'roleCompany', title: 'Role / company', type: 'string', description: 'e.g. "Real estate investor, Phoenix AZ" or "Owner, Acme Co."' },
  { name: 'quote', title: 'Written testimonial', type: 'text', rows: 4 },
  {
    name: 'testimonialType',
    title: 'Testimonial type',
    type: 'string',
    initialValue: 'text',
    options: {
      list: [
      { title: 'Text', value: 'text' },
      { title: 'Image', value: 'image' },
      { title: 'Video', value: 'video' }],

      layout: 'radio',
      direction: 'horizontal'
    }
  },
  {
    name: 'clientPhoto',
    title: 'Client photograph',
    type: 'image',
    options: { hotspot: true },
    fields: [{ name: 'alt', title: 'Alt text', type: 'string' }]
  },
  {
    name: 'image',
    title: 'Testimonial image',
    type: 'image',
    options: { hotspot: true },
    hidden: ({ parent }: {parent?: {testimonialType?: string;};}) => parent?.testimonialType !== 'image'
  },
  {
    name: 'videoFile',
    title: 'Video file',
    type: 'file',
    options: { accept: 'video/*' },
    description: 'Upload an MP4/WebM, or use the Video URL field instead.',
    hidden: ({ parent }: {parent?: {testimonialType?: string;};}) => parent?.testimonialType !== 'video'
  },
  {
    name: 'videoUrl',
    title: 'Video URL',
    type: 'url',
    description: 'YouTube, Vimeo, or a direct video link.',
    hidden: ({ parent }: {parent?: {testimonialType?: string;};}) => parent?.testimonialType !== 'video'
  },
  {
    name: 'videoThumbnail',
    title: 'Video thumbnail',
    type: 'image',
    options: { hotspot: true },
    hidden: ({ parent }: {parent?: {testimonialType?: string;};}) => parent?.testimonialType !== 'video'
  },
  { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false, description: 'Featured video testimonials appear in the large spotlight.' },
  { name: 'order', title: 'Display order', type: 'number', initialValue: 10, description: 'Lower numbers appear first.' },
  { name: 'isVisible', title: 'Visible on website', type: 'boolean', initialValue: true }],

  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'clientName', subtitle: 'roleCompany', media: 'clientPhoto', type: 'testimonialType', featured: 'featured' },
    prepare({ title, subtitle, media, type, featured }: {title?: string;subtitle?: string;media?: unknown;type?: string;featured?: boolean;}) {
      return { title: `${featured ? '★ ' : ''}${title ?? 'Untitled'}`, subtitle: [type, subtitle].filter(Boolean).join(' · '), media };
    }
  }
};