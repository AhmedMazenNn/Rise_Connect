import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { getVideoEmbedUrl } from '../utils/video';
import type { LightboxMedia } from '../types/content';

interface MediaLightboxProps {
  media: LightboxMedia | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function MediaLightbox({ media, onClose, onPrev, onNext }: MediaLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = media !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev?.();
      if (event.key === 'ArrowRight') onNext?.();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [isOpen, onClose, onPrev, onNext]);

  const embedUrl = media?.type === 'video' ? getVideoEmbedUrl(media.src) : null;

  return (
    <AnimatePresence>
      {media &&
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={media.title ?? (media.type === 'video' ? 'Video player' : 'Image preview')}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-plum/90 p-4 backdrop-blur-md sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={onClose}>
        
          <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender">
          
            <XIcon className="h-5 w-5" />
          </button>
          {onPrev &&
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous"
          className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender sm:flex">
          
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
        }
          {onNext &&
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next"
          className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender sm:flex">
          
              <ChevronRightIcon className="h-5 w-5" />
            </button>
        }

          <motion.figure
          key={media.src}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}>
          
            <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
              {media.type === 'video' ?
            embedUrl ?
            <div className="aspect-video w-full">
                    <iframe
                src={embedUrl}
                title={media.title ?? 'Video'}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen />
              
                  </div> :

            <video
              src={media.src}
              poster={media.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[78vh] w-full bg-black">
              
                    Your browser does not support embedded video.
                  </video> :


            <img src={media.src} alt={media.alt ?? media.title ?? ''} className="mx-auto max-h-[78vh] w-auto object-contain" />
            }
            </div>
            {(media.title || media.caption) &&
          <figcaption className="mt-4 text-center">
                {media.title && <p className="font-display text-base font-bold text-white">{media.title}</p>}
                {media.caption && <p className="mt-1 text-sm text-white/65">{media.caption}</p>}
              </figcaption>
          }
          </motion.figure>
        </motion.div>
      }
    </AnimatePresence>);

}