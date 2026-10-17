import React from 'react';
import { PlayIcon } from 'lucide-react';
import { sanityImage } from '../../utils/sanity';
import { getVideoEmbedUrl, getYouTubeThumbnail } from '../../utils/video';
import type { Testimonial } from '../../types/content';

interface TestimonialMediaProps {
  testimonial: Testimonial;
  width: number;
  size?: 'lg' | 'sm';
  onOpen: () => void;
  className?: string;
}

// Thumbnail + custom play button for video testimonials, or a zoomable image.
export function TestimonialMedia({ testimonial, width, size = 'sm', onOpen, className = '' }: TestimonialMediaProps) {
  const isVideo = testimonial.type === 'video';
  const canOpen = isVideo ? !!testimonial.videoUrl : !!testimonial.imageUrl;
  const directVideo = isVideo && testimonial.videoUrl && !getVideoEmbedUrl(testimonial.videoUrl) ? testimonial.videoUrl : undefined;
  const thumbnail =
  sanityImage(testimonial.videoThumbnailUrl, width) ?? (
  testimonial.videoUrl ? getYouTubeThumbnail(testimonial.videoUrl) : undefined) ??
  sanityImage(testimonial.imageUrl, width);

  const label = isVideo ?
  `Play video testimonial from ${testimonial.clientName}` :
  `View image from ${testimonial.clientName}`;

  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={!canOpen}
      aria-label={label}
      className={`group relative block w-full overflow-hidden bg-brand text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-lavender disabled:cursor-default ${className}`}>
      
      {thumbnail ?
      <img
        src={thumbnail}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out-expo group-hover:scale-[1.03]" /> :

      directVideo ?
      <video src={`${directVideo}#t=0.5`} preload="metadata" muted playsInline className="absolute inset-0 h-full w-full object-cover" /> :

      <span className="absolute inset-0 flex items-end bg-brand p-6" aria-hidden="true">
          <span className="text-sm text-white/60">
            {isVideo ? 'Upload a testimonial video in Sanity Studio' : 'Upload a testimonial image in Sanity Studio'}
          </span>
        </span>
      }
      <span className="absolute inset-0 bg-gradient-to-t from-brand-plum/60 via-transparent to-transparent" aria-hidden="true" />
      {isVideo &&
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span
          className={`flex items-center justify-center rounded-full bg-white text-brand shadow-[0_10px_40px_-5px_rgba(0,0,0,0.4)] ring-8 ring-white/20 transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95 ${
          size === 'lg' ? 'h-20 w-20' : 'h-14 w-14'}`
          }>
          
            <PlayIcon className={`${size === 'lg' ? 'h-7 w-7' : 'h-5 w-5'} translate-x-0.5`} fill="currentColor" />
          </span>
        </span>
      }
    </button>);

}