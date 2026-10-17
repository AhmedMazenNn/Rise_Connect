import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, QuoteIcon } from 'lucide-react';
import { TestimonialAuthor } from './TestimonialAuthor';
import { TestimonialMedia } from './TestimonialMedia';
import { PlaceholderBadge } from '../PlaceholderBadge';
import type { Testimonial } from '../../types/content';

interface TestimonialCarouselProps {
  items: Testimonial[];
  onOpen: (testimonial: Testimonial) => void;
}

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -40 })
};

export function TestimonialCarousel({ items, onOpen }: TestimonialCarouselProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const safeIndex = index % items.length;
  const current = items[safeIndex];
  const multiple = items.length > 1;

  const paginate = (step: number) =>
  setState(([i]) => [(i + step + items.length) % items.length, step]);
  const goTo = (target: number) => setState(([i]) => [target, target > i ? 1 : -1]);

  const hasMedia =
  current.type === 'video' || current.type === 'image' && !!current.imageUrl;

  return (
    <div className="flex h-full flex-col" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="relative min-h-[440px] flex-1 overflow-hidden rounded-[28px] bg-white ring-1 ring-brand-plum/5">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.article
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            drag={multiple ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) paginate(1);else
              if (info.offset.x > 60) paginate(-1);
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${safeIndex + 1} of ${items.length}`}
            className="flex h-full cursor-grab touch-pan-y flex-col p-6 active:cursor-grabbing sm:p-8">
            
            {hasMedia &&
            <TestimonialMedia
              testimonial={current}
              width={800}
              onOpen={() => onOpen(current)}
              className="mb-6 aspect-[16/10] rounded-2xl" />

            }
            <div className="flex items-start justify-between gap-4">
              <QuoteIcon className="h-7 w-7 text-brand-lavender" fill="currentColor" strokeWidth={0} aria-hidden="true" />
              {current.isPlaceholder && <PlaceholderBadge />}
            </div>
            {current.quote &&
            <blockquote className="text-pretty mt-4 text-lg leading-relaxed text-brand-plum">{current.quote}</blockquote>
            }
            <div className="mt-auto pt-8">
              <TestimonialAuthor testimonial={current} />
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {multiple &&
      <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1" role="tablist" aria-label="Choose testimonial">
            {items.map((item, i) =>
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === safeIndex}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => goTo(i)}
            className="flex h-8 items-center px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender rounded">
            
                <span
              className={`block h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out ${
              i === safeIndex ? 'w-7 bg-brand' : 'w-1.5 bg-brand-lilac'}`
              } />
            
              </button>
          )}
          </div>
          <div className="flex gap-2">
            <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-plum/10 bg-white text-brand-plum transition-colors duration-150 hover:bg-brand hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender active:scale-95">
            
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition-colors duration-150 hover:bg-brand-plum focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender active:scale-95">
            
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      }
    </div>);

}