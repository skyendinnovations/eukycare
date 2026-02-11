'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import MotionDiv from '@/components/MotionDiv';

interface Testimonial {
  id?: string;
  quote: string;
  name: string;
  role: string;
  rating?: number;
  image_url?: string;
}

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-white/70 text-sm">No testimonials available yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative px-8 sm:px-10 lg:px-0">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-12 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/20"
          aria-label="Previous testimonial"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-12 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/20"
          aria-label="Next testimonial"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slider Container */}
        <div className="overflow-hidden">
          <div className="relative min-h-[300px] md:min-h-[250px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <MotionDiv
                key={currentSlide}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {[0, 1, 2].map((offset) => {
                    if (offset >= testimonials.length) return null;
                    const index = (currentSlide + offset) % testimonials.length;
                    const testimonial = testimonials[index];
                    return (
                      <div
                        key={`${currentSlide}-${offset}`}
                        className={`bg-eukyPurple/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 ${
                          offset > 0 ? 'hidden md:block' : ''
                        }`}
                      >
                        <p className="text-white/90 text-sm leading-relaxed mb-6">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                            {testimonial.image_url ? (
                              <img src={testimonial.image_url} alt={testimonial.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-lg">👤</span>
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{testimonial.name}</p>
                            <p className="text-white/60 text-xs">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </MotionDiv>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
