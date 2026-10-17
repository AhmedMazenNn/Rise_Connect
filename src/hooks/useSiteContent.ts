import { useEffect, useState } from 'react';
import { defaultHome, defaultSettings, defaultServices, placeholderTestimonials } from '../content/defaultContent';
import { isSanityConfigured, sanityFetch, showPlaceholders } from '../utils/sanity';
import { siteContentQuery } from '../utils/sanityQueries';
import type { HomepageContent, LoadStatus, Service, SiteContent, SiteSettings, Testimonial } from '../types/content';

interface RawContent {
  settings: Partial<SiteSettings> | null;
  home: Partial<HomepageContent> | null;
  services: Service[] | null;
  testimonials: Testimonial[] | null;
}

const fallbackContent: SiteContent = {
  settings: defaultSettings,
  home: defaultHome,
  services: defaultServices,
  testimonials: placeholderTestimonials
};

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(() =>
  isSanityConfigured ? { ...fallbackContent, testimonials: [] } : fallbackContent
  );
  const [status, setStatus] = useState<LoadStatus>(isSanityConfigured ? 'loading' : 'ready');

  useEffect(() => {
    if (!isSanityConfigured) return;
    const controller = new AbortController();
    sanityFetch<RawContent>(siteContentQuery, controller.signal).
    then((raw) => {
      setContent(mergeContent(raw));
      setStatus('ready');
    }).
    catch(() => {
      if (controller.signal.aborted) return;
      setContent({ ...fallbackContent, testimonials: showPlaceholders ? placeholderTestimonials : [] });
      setStatus('error');
    });
    return () => controller.abort();
  }, []);

  return { content, status };
}

function mergeContent(raw: RawContent): SiteContent {
  const home = { ...defaultHome, ...withoutEmpty(raw.home) };
  return {
    settings: { ...defaultSettings, ...withoutEmpty(raw.settings) },
    home: { ...home, aboutBody: home.aboutBody?.length ? home.aboutBody : defaultHome.aboutBody },
    services: raw.services?.length ? raw.services : defaultServices,
    testimonials: raw.testimonials?.length ? raw.testimonials : showPlaceholders ? placeholderTestimonials : []
  };
}

function withoutEmpty<T extends object>(value: T | null): Partial<T> {
  if (!value) return {};
  return Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== null && v !== undefined && v !== '')
  ) as Partial<T>;
}
