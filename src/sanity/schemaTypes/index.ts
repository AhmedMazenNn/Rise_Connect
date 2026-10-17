import { testimonial } from './testimonial';
import { service } from './service';
import { siteSettings } from './siteSettings';
import { homepageContent } from './homepageContent';

export const schemaTypes = [siteSettings, homepageContent, service, testimonial];

export const singletonTypes = new Set(['siteSettings', 'homepageContent']);