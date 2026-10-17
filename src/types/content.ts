export type TestimonialType = 'text' | 'image' | 'video';
export type MediaType = 'image' | 'video';
export type ServiceIconKey = 'phone' | 'home' | 'database' | 'calendar';
export type LoadStatus = 'loading' | 'ready' | 'error';

export interface Testimonial {
  id: string;
  clientName: string;
  roleCompany?: string;
  quote?: string;
  type: TestimonialType;
  clientPhotoUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  featured?: boolean;
  order?: number;
  isPlaceholder?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: ServiceIconKey;
  imageUrl?: string;
  points: string[];
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  companyName: string;
  logoUrl?: string;
  contactEmail?: string;
  discordUrl?: string;
  slackWebhookUrl?: string;
  slackEndpointUrl?: string;
  address?: {
    street: string;
    cityStateZip: string;
    phone: string;
  };
  socialLinks: SocialLink[];
  seoTitle: string;
  seoDescription: string;
  ogImageUrl?: string;
  footerText: string;
}

export interface HomepageContent {
  heroHeading: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  aboutHeading: string;
  aboutBody: string[];
  servicesHeading: string;
  servicesIntro: string;
  testimonialsHeading: string;
  testimonialsIntro: string;
  contactHeading: string;
  contactDescription: string;
}

export interface SiteContent {
  settings: SiteSettings;
  home: HomepageContent;
  services: Service[];
  testimonials: Testimonial[];
}

export interface LightboxMedia {
  type: MediaType;
  src: string;
  title?: string;
  caption?: string;
  poster?: string;
  alt?: string;
}
