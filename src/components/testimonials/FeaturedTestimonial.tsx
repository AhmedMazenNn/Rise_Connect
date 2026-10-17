import React from 'react';
import { QuoteIcon } from 'lucide-react';
import { TestimonialAuthor } from './TestimonialAuthor';
import { TestimonialMedia } from './TestimonialMedia';
import { PlaceholderBadge } from '../PlaceholderBadge';
import type { Testimonial } from '../../types/content';

interface FeaturedTestimonialProps {
  testimonial: Testimonial;
  onOpen: (testimonial: Testimonial) => void;
}

export function FeaturedTestimonial({ testimonial, onOpen }: FeaturedTestimonialProps) {
  const hasMedia = testimonial.type === 'video' || testimonial.type === 'image' && !!testimonial.imageUrl;

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-brand-plum text-white shadow-[0_40px_80px_-40px_rgba(33,24,47,0.6)]">
      {hasMedia &&
      <TestimonialMedia
        testimonial={testimonial}
        width={1400}
        size="lg"
        onOpen={() => onOpen(testimonial)}
        className="aspect-video" />

      }
      {testimonial.isPlaceholder &&
      <div className="absolute left-5 top-5">
          <PlaceholderBadge tone="dark" />
        </div>
      }
      <div className="flex flex-1 flex-col p-7 sm:p-10">
        <QuoteIcon className="h-8 w-8 text-brand-lavender" fill="currentColor" strokeWidth={0} aria-hidden="true" />
        {testimonial.quote &&
        <blockquote className="text-pretty mt-5 font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
            {testimonial.quote}
          </blockquote>
        }
        <div className="mt-auto pt-8">
          <TestimonialAuthor testimonial={testimonial} tone="dark" />
        </div>
      </div>
    </article>);

}