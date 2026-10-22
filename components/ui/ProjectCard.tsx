'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/content/projects';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<SVGPathElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const card = cardRef.current;
    const media = mediaRef.current;
    const outline = outlineRef.current;
    const meta = metaRef.current;
    const underline = underlineRef.current;
    if (!card || !media) return;

    if (prefersReducedMotion()) {
      if (outline) gsap.set(outline, { strokeDashoffset: 0 });
      gsap.set(media, { clipPath: 'inset(0)' });
      if (meta) gsap.set(meta, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(media, { clipPath: 'inset(100% 0 0 0)' });
      if (outline) gsap.set(outline, { strokeDashoffset: 1 });
      if (meta) gsap.set(meta, { opacity: 0, y: 16 });
      if (underline) gsap.set(underline, { scaleX: 0, transformOrigin: 'left center' });

      // Enter animation triggered on scroll enter (top 80%)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          once: true,
        },
      });

      if (outline) {
        tl.to(outline, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, 0);
      }
      tl.to(media, { clipPath: 'inset(0%)', duration: 0.8, ease: 'power2.out' }, 0.2);
      if (meta) {
        tl.to(meta, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5);
      }
    }, card);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (prefersReducedMotion()) return;
    if (mediaRef.current) {
      gsap.to(mediaRef.current, { scale: 1.03, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
    }
    if (underlineRef.current) {
      gsap.to(underlineRef.current, { scaleX: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 3, y: -3, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    }
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion()) return;
    if (mediaRef.current) {
      gsap.to(mediaRef.current, { scale: 1.0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
    }
    if (underlineRef.current) {
      gsap.to(underlineRef.current, { scaleX: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    }
  };

  return (
    <Link
      ref={cardRef}
      href={`/work/${project.slug}/`}
      className="project-card focus-visible-ring"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`View project details for ${project.title} (${project.discipline}, ${project.year})`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {/* Media Wrapper with 4:3 ratio and overflow hidden */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '75%', // 4:3 Aspect Ratio
          overflow: 'hidden',
          backgroundColor: 'var(--paper)',
          border: '1px solid var(--ink)',
        }}
      >
        <div
          ref={mediaRef}
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            backgroundColor: 'var(--paper)',
          }}
        >
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={`${project.title} · ${project.discipline}`}
              loading={index < 2 ? 'eager' : 'lazy'}
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
                background:
                  'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
              }}
            >
              <svg
                viewBox="0 0 200 150"
                style={{ width: '60%', height: '60%', opacity: 0.25, stroke: 'var(--ink)' }}
                fill="none"
                strokeWidth="1.2"
              >
                <rect x="20" y="30" width="160" height="90" />
                <line x1="20" y1="75" x2="180" y2="75" strokeDasharray="3 3" />
                <line x1="100" y1="30" x2="100" y2="120" strokeDasharray="3 3" />
                <circle cx="100" cy="75" r="25" />
              </svg>
            </div>
          )}
        </div>

        {/* SVG Sketch Outline Overlay */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        >
          <path
            ref={outlineRef}
            className="d"
            pathLength="1"
            d="M 2 2 H 100% V 100% H 2 Z"
            fill="none"
            stroke="var(--red)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Card Meta */}
      <div ref={metaRef} style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
          <h2
            style={{
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontWeight: 400,
              lineHeight: 1.2,
              position: 'relative',
              display: 'inline-block',
              width: 'fit-content',
              margin: 0,
            }}
          >
            {project.title}
            <span
              ref={underlineRef}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '-2px',
                height: '1.5px',
                backgroundColor: 'var(--red)',
                display: 'block',
                transform: 'scaleX(0)',
              }}
            />
          </h2>
          <span
            ref={arrowRef}
            className="project-card-arrow"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '14px',
              color: 'var(--red)',
              flexShrink: 0,
              paddingTop: '2px',
              display: 'inline-block',
            }}
            aria-hidden="true"
          >
            ↗
          </span>
        </div>

        <div
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            opacity: 0.75,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <span>{project.discipline}</span>
          <span>·</span>
          <span>{project.location}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
