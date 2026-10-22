'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

export interface CarouselSlide {
  image?: string;
  caption: string;
  meta?: string;
}

export interface CarouselSliderProps {
  slides: CarouselSlide[];
  title?: string;
  className?: string;
}

export function CarouselSlider({
  slides,
  title = 'Outcome Gallery',
  className = '',
}: CarouselSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isReduced, setIsReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsReduced(prefersReducedMotion());
  }, []);

  if (!slides || slides.length === 0) return null;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  const variants: Variants = {
    enter: (direction: number) => ({
      x: isReduced ? 0 : direction > 0 ? '100%' : '-100%',
      opacity: isReduced ? 1 : 0,
      scale: isReduced ? 1 : 0.96,
      rotateY: isReduced ? 0 : direction > 0 ? 8 : -8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: isReduced ? 0 : 0.45,
        ease: 'easeOut' as const,
      },
    },
    exit: (direction: number) => ({
      x: isReduced ? 0 : direction > 0 ? '-100%' : '100%',
      opacity: isReduced ? 1 : 0,
      scale: isReduced ? 1 : 0.96,
      rotateY: isReduced ? 0 : direction > 0 ? -8 : 8,
      transition: {
        duration: isReduced ? 0 : 0.35,
        ease: 'easeOut' as const,
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className={`oli-carousel-slider ${className}`.trim()}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        border: '1.5px solid var(--ink)',
        backgroundColor: 'var(--paper)',
        padding: 'clamp(16px, 3vw, 24px)',
        position: 'relative',
        boxSizing: 'border-box',
      }}
      aria-roledescription="carousel"
      aria-label={title}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--grid)',
          paddingBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--red)',
              fontWeight: 600,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              opacity: 0.6,
            }}
          >
            · VIEW {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Controls with inline SVGs (no external icon dependencies) */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous view"
            className="focus-visible-ring"
            style={{
              width: '36px',
              height: '36px',
              border: '1.5px solid var(--ink)',
              backgroundColor: 'var(--paper)',
              color: 'var(--ink)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 0,
            }}
          >
            {/* Inline SVG arrow left */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              aria-hidden="true"
            >
              <line x1="13" y1="8" x2="3" y2="8" />
              <polyline points="7,4 3,8 7,12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next view"
            className="focus-visible-ring"
            style={{
              width: '36px',
              height: '36px',
              border: '1.5px solid var(--ink)',
              backgroundColor: 'var(--paper)',
              color: 'var(--ink)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 0,
            }}
          >
            {/* Inline SVG arrow right */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              aria-hidden="true"
            >
              <line x1="3" y1="8" x2="13" y2="8" />
              <polyline points="9,4 13,8 9,12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Slide Stage with Perspective (Disabled under reduced motion) */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 10',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--paper)',
          border: '1px solid var(--ink)',
          perspective: isReduced ? 'none' : '1000px',
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: isReduced ? 'flat' : 'preserve-3d',
            }}
          >
            {currentSlide.image ? (
              <img
                src={currentSlide.image}
                alt={currentSlide.caption}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    border: '1px solid var(--ink)',
                    padding: '8px 16px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--paper)',
                  }}
                >
                  {currentSlide.caption}
                </div>
              </div>
            )}

            {/* Slide Annotation Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                border: '1px solid var(--ink)',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--paper)',
                opacity: 0.95,
              }}
            >
              {currentSlide.meta || `View 0${currentIndex + 1} · Handover`}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Strip */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '4px',
        }}
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className="focus-visible-ring"
            style={{
              width: idx === currentIndex ? '28px' : '10px',
              height: '4px',
              backgroundColor: idx === currentIndex ? 'var(--red)' : 'var(--grid)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              borderRadius: 0,
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
