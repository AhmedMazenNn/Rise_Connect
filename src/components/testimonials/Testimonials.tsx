import React, { useCallback, useMemo, useState } from 'react';
import { MessageSquareQuoteIcon } from 'lucide-react';
import { FeaturedTestimonial } from './FeaturedTestimonial';
import { TestimonialCarousel } from './TestimonialCarousel';
import { MediaLightbox } from '../MediaLightbox';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../SectionHeading';
import { sanityImage } from '../../utils/sanity';
import type { HomepageContent, LightboxMedia, LoadStatus, Testimonial } from '../../types/content';

interface TestimonialsProps {
  home: HomepageContent;
  testimonials: Testimonial[];
  status: LoadStatus;
}

export function Testimonials({ home, testimonials, status }: TestimonialsProps) {
  const [media, setMedia] = useState<LightboxMedia | null>(null);
  const closeMedia = useCallback(() => setMedia(null), []);

  const { featured, rest } = useMemo(() => {
    const pick =
    testimonials.find((t) => t.featured && t.type === 'video') ??
    testimonials.find((t) => t.featured) ??
    testimonials.find((t) => t.type === 'video') ??
    testimonials[0];
    return { featured: pick, rest: testimonials.filter((t) => t.id !== pick?.id) };
  }, [testimonials]);

  const open = (t: Testimonial) => {
    if (t.type === 'video' && t.videoUrl) {
      setMedia({ type: 'video', src: t.videoUrl, title: t.clientName, caption: t.roleCompany, poster: sanityImage(t.videoThumbnailUrl, 1600) });
    } else if (t.imageUrl) {
      setMedia({ type: 'image', src: sanityImage(t.imageUrl, 1800) ?? t.imageUrl, title: t.clientName, caption: t.roleCompany, alt: `Testimonial from ${t.clientName}` });
    }
  };

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="bg-brand-mist py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="testimonials-heading" eyebrow="Client stories" title={home.testimonialsHeading} />
          <p className="text-pretty max-w-md text-base leading-relaxed text-brand-muted lg:pb-2">{home.testimonialsIntro}</p>
        </div>

        <div className="mt-14">
          {status === 'loading' ?
          <div className="grid gap-6 lg:grid-cols-12" aria-busy="true" aria-label="Loading testimonials">
              <div className="h-[520px] animate-pulse rounded-[28px] bg-brand-lilac/60 lg:col-span-7" />
              <div className="h-[520px] animate-pulse rounded-[28px] bg-white lg:col-span-5" />
            </div> :
          !featured ?
          <Reveal className="flex flex-col items-center rounded-[28px] bg-white px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-mist text-brand">
                <MessageSquareQuoteIcon className="h-6 w-6" />
              </span>
              <p className="mt-5 font-display text-xl font-bold text-brand-plum">Client stories are on the way.</p>
              <p className="mt-2 max-w-sm text-brand-muted">Check back soon to hear from the businesses we support.</p>
            </Reveal> :

          <div className="grid items-stretch gap-6 lg:grid-cols-12">
              <Reveal className={rest.length ? 'lg:col-span-7' : 'lg:col-span-12'}>
                <FeaturedTestimonial testimonial={featured} onOpen={open} />
              </Reveal>
              {rest.length > 0 &&
            <Reveal delay={0.06} className="lg:col-span-5">
                  <TestimonialCarousel items={rest} onOpen={open} />
                </Reveal>
            }
            </div>
          }
        </div>
      </div>
      <MediaLightbox media={media} onClose={closeMedia} />
    </section>);

}