import React from 'react';
import { sanityImage } from '../../utils/sanity';
import type { Testimonial } from '../../types/content';

interface TestimonialAuthorProps {
  testimonial: Testimonial;
  tone?: 'light' | 'dark';
}

export function TestimonialAuthor({ testimonial, tone = 'light' }: TestimonialAuthorProps) {
  const isDark = tone === 'dark';
  const photo = sanityImage(testimonial.clientPhotoUrl, 120);
  const initials = testimonial.clientName.
  split(' ').
  map((part) => part[0]).
  join('').
  slice(0, 2).
  toUpperCase();

  return (
    <div className="flex items-center gap-3.5">
      {photo ?
      <img
        src={photo}
        alt={testimonial.clientName}
        loading="lazy"
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-brand-lavender/40" /> :


      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${
        isDark ? 'bg-brand-lavender text-brand-plum' : 'bg-brand-mist text-brand'}`
        }
        aria-hidden="true">
        
          {initials}
        </span>
      }
      <div className="min-w-0">
        <p className={`truncate font-display text-base font-bold ${isDark ? 'text-white' : 'text-brand-plum'}`}>
          {testimonial.clientName}
        </p>
        {testimonial.roleCompany &&
        <p className={`truncate text-sm ${isDark ? 'text-white/60' : 'text-brand-muted'}`}>{testimonial.roleCompany}</p>
        }
      </div>
    </div>);

}