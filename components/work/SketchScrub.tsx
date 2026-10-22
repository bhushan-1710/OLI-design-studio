'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/content/projects';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';
import { ProjectSketchDrawing } from './ProjectSketchDrawings';

interface SketchScrubProps {
  project: Project;
}

export function SketchScrub({ project }: SketchScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const sketchLayerRef = useRef<HTMLDivElement>(null);
  const photoLayerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'both' | 'sketch' | 'photo'>('both');
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    const sketchLayer = sketchLayerRef.current;
    const photoLayer = photoLayerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !pinWrapper || !sketchLayer || !photoLayer) return;

    if (prefersReducedMotion()) {
      setIsReduced(true);
      gsap.set(sketchLayer, { opacity: 0.3 });
      gsap.set(photoLayer, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(sketchLayer, { opacity: 1 });
      gsap.set(photoLayer, { opacity: 0, scale: 0.98 });

      // Create pinned scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=150%',
          pin: pinWrapper,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (indicator) {
              const progress = self.progress;
              if (progress < 0.25) {
                indicator.innerText = '01 Sketch';
                indicator.style.color = 'var(--ink)';
              } else if (progress < 0.5) {
                indicator.innerText = '02 Develop';
                indicator.style.color = 'var(--ink)';
              } else if (progress < 0.75) {
                indicator.innerText = '03 Build';
                indicator.style.color = 'var(--ink)';
              } else {
                indicator.innerText = '04 Handover';
                indicator.style.color = 'var(--red)';
              }
            }
          },
        },
      });

      // Scrub animation:
      // 0% -> 50%: Linework dims down, dimensions and notes fade
      tl.to(
        sketchLayer,
        {
          opacity: 0.15,
          duration: 0.6,
          ease: 'power1.inOut',
        },
        0
      );

      // 30% -> 90%: Photo dissolves in from 0 to 1 and settles scale
      tl.to(
        photoLayer,
        {
          opacity: 1,
          scale: 1.0,
          duration: 0.7,
          ease: 'power1.inOut',
        },
        0.3
      );

      // 90% -> 100%: Linework drops to zero opacity for crystal-clear outcome view
      tl.to(
        sketchLayer,
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.out',
        },
        0.8
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: isReduced ? 'auto' : '100svh',
        margin: 'var(--space-8) 0',
      }}
      aria-label={`Scroll-scrubbed sketch to handover reveal for ${project.title}`}
    >
      <div
        ref={pinWrapperRef}
        style={{
          position: 'relative',
          width: '100%',
          height: isReduced ? 'auto' : '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'var(--space-4) 0',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Frame container with architectural aspect ratio */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1100px',
            aspectRatio: '16 / 10',
            border: '1.5px solid var(--ink)',
            backgroundColor: 'var(--paper)',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Bottom Layer: Outcome Photography */}
          <div
            ref={photoLayerRef}
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              backgroundColor: 'var(--paper)',
              zIndex: 1,
            }}
          >
            {project.images && project.images[0] ? (
              <img
                src={project.images[0]}
                alt={`${project.title} outcome reveal`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              /* Architectural elevation render simulation fallback */
              <div
                style={{
                  width: '80%',
                  height: '70%',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--ink)',
                    opacity: 0.8,
                  }}
                />
              </div>
            )}

            {/* Handover Badge */}
            <div
              style={{
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                border: '1px solid var(--ink)',
                padding: '4px 8px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--paper)',
                zIndex: 4,
              }}
            >
              04 Handover · Built Outcome
            </div>
          </div>

          {/* Top Layer: Architectural Drafting Linework */}
          <div
            ref={sketchLayerRef}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
              padding: 'var(--space-6)',
              boxSizing: 'border-box',
            }}
          >
            <ProjectSketchDrawing slug={project.slug} />
          </div>

          {/* Scrub Status Indicator (Top-Left) */}
          <div
            ref={indicatorRef}
            style={{
              position: 'absolute',
              top: 'var(--space-4)',
              left: 'var(--space-4)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              backgroundColor: 'var(--paper)',
              padding: '4px 8px',
              border: '1px solid var(--ink)',
              zIndex: 4,
              transition: 'color 0.3s ease',
            }}
          >
            01 Sketch
          </div>

          {/* Interactive Scrub Cue (Bottom-Center) */}
          {!isReduced && (
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-3)',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                opacity: 0.6,
                backgroundColor: 'var(--paper)',
                padding: '2px 8px',
                border: '1px solid var(--grid)',
                zIndex: 4,
                pointerEvents: 'none',
              }}
            >
              Scroll to reveal handover ↓
            </div>
          )}
        </div>

        {/* Reduced Motion Controls */}
        {isReduced && (
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: 'var(--space-4)',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveTab('sketch');
                if (sketchLayerRef.current) sketchLayerRef.current.style.opacity = '1';
                if (photoLayerRef.current) photoLayerRef.current.style.opacity = '0';
              }}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                border: '1px solid var(--ink)',
                backgroundColor: activeTab === 'sketch' ? 'var(--ink)' : 'transparent',
                color: activeTab === 'sketch' ? 'var(--paper)' : 'var(--ink)',
              }}
            >
              View Linework
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('photo');
                if (sketchLayerRef.current) sketchLayerRef.current.style.opacity = '0';
                if (photoLayerRef.current) photoLayerRef.current.style.opacity = '1';
              }}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                border: '1px solid var(--ink)',
                backgroundColor: activeTab === 'photo' ? 'var(--ink)' : 'transparent',
                color: activeTab === 'photo' ? 'var(--paper)' : 'var(--ink)',
              }}
            >
              View Handover Photo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
