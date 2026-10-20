'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/content/projects';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

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
          {/* Bottom Layer: Outcome Photography / Material Render Placeholder */}
          <div
            ref={photoLayerRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'radial-gradient(ellipse at center, rgba(196, 77, 44, 0.08) 0%, rgba(0, 0, 0, 0.02) 70%), var(--paper)',
              zIndex: 1,
            }}
          >
            {/* Architectural elevation render simulation */}
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
              {/* Ground line */}
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

              {/* Massing volume 1 with wash concrete */}
              <div
                style={{
                  width: '45%',
                  height: '65%',
                  backgroundColor: 'var(--wash-concrete)',
                  border: '1.5px solid var(--ink)',
                  position: 'relative',
                  marginRight: '-5%',
                  zIndex: 2,
                  boxShadow: '4px 6px 16px rgba(0,0,0,0.06)',
                }}
              >
                {/* Window apertures */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20%',
                    right: '15%',
                    width: '35%',
                    height: '40%',
                    backgroundColor: 'var(--wash-glazing)',
                    border: '1px solid var(--ink)',
                  }}
                />
              </div>

              {/* Massing volume 2 with wash timber */}
              <div
                style={{
                  width: '40%',
                  height: '50%',
                  backgroundColor: 'var(--wash-timber)',
                  border: '1.5px solid var(--ink)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Louver lines */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '15%',
                    borderTop: '1px solid var(--ink)',
                    borderBottom: '1px solid var(--ink)',
                    opacity: 0.4,
                  }}
                />
              </div>
            </div>

            {/* Photo TBC Watermark */}
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
              04 Handover · [NEEDED: Project photo]
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
            <svg
              viewBox="0 0 1000 625"
              fill="none"
              style={{
                width: '100%',
                height: '100%',
                stroke: 'var(--ink)',
                strokeWidth: 1.5,
              }}
            >
              {/* Construction Grid & Datum Lines */}
              <g opacity="0.35" strokeDasharray="6 4">
                <line x1="80" y1="120" x2="920" y2="120" />
                <line x1="80" y1="320" x2="920" y2="320" />
                <line x1="80" y1="520" x2="920" y2="520" />
                <line x1="250" y1="80" x2="250" y2="550" />
                <line x1="550" y1="80" x2="550" y2="550" />
                <line x1="750" y1="80" x2="750" y2="550" />
              </g>

              {/* Main Structural Outlines */}
              <g strokeWidth="2">
                {/* Main house pavilion */}
                <rect x="250" y="240" width="300" height="280" />
                {/* Secondary cantilever wing */}
                <rect x="520" y="320" width="230" height="200" />
                {/* Parapet cap */}
                <line x1="230" y1="240" x2="570" y2="240" strokeWidth="2.5" />
              </g>

              {/* Glazing & Openings */}
              <g strokeWidth="1.2">
                <rect x="300" y="300" width="120" height="180" />
                <line x1="360" y1="300" x2="360" y2="480" />
                <rect x="560" y="360" width="140" height="120" />
                <line x1="630" y1="360" x2="630" y2="480" />
              </g>

              {/* Architectural Dimensions */}
              <g stroke="var(--ink)" strokeWidth="1" opacity="0.8">
                {/* Horizontal dimension string */}
                <line x1="250" y1="180" x2="750" y2="180" />
                <line x1="250" y1="172" x2="250" y2="188" />
                <line x1="550" y1="172" x2="550" y2="188" />
                <line x1="750" y1="172" x2="750" y2="188" />
                {/* Slash ticks */}
                <line x1="247" y1="183" x2="253" y2="177" strokeWidth="1.5" />
                <line x1="547" y1="183" x2="553" y2="177" strokeWidth="1.5" />
                <line x1="747" y1="183" x2="753" y2="177" strokeWidth="1.5" />
                <text
                  x="400"
                  y="170"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="12"
                  fill="var(--ink)"
                  textAnchor="middle"
                  letterSpacing="0.1em"
                >
                  6,000 MM
                </text>
                <text
                  x="650"
                  y="170"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="12"
                  fill="var(--ink)"
                  textAnchor="middle"
                  letterSpacing="0.1em"
                >
                  4,200 MM
                </text>
              </g>

              {/* Hand-lettered Drafting Notes */}
              <g fill="var(--ink)">
                <text
                  x="260"
                  y="225"
                  fontFamily="var(--font-hand, cursive)"
                  fontSize="22"
                  fill="var(--ink)"
                >
                  [NEEDED: Project note]
                </text>
                <path d="M 390 220 Q 420 225 440 238" stroke="var(--ink)" strokeWidth="1" fill="none" />
                <text
                  x="640"
                  y="305"
                  fontFamily="var(--font-hand, cursive)"
                  fontSize="22"
                  fill="var(--ink)"
                >
                  [NEEDED: Project note]
                </text>
                <path d="M 630 300 Q 600 305 580 325" stroke="var(--ink)" strokeWidth="1" fill="none" />
              </g>
            </svg>
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
