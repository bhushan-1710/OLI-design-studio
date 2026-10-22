'use client';

import React from 'react';
import Link from 'next/link';
import { DimensionRule } from '@/components/ui/DimensionRule';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { getAllProjects } from '@/content/projects';

export function SelectedWorkSection() {
  const projects = getAllProjects();

  return (
    <section
      className="selected-work-section"
      style={{
        position: 'relative',
        padding: 'clamp(32px, 5vw, 64px) clamp(22px, 3vw, 38px)',
        backgroundColor: 'var(--paper)',
      }}
      aria-label="Selected studio projects"
    >
      {/* Dimension divider preceding the section */}
      <div style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }}>
        <DimensionRule value="4.2 M" />
      </div>

      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(28px, 4vw, 44px)',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--red)',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Portfolio Highlights · 04 Disciplines
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontWeight: 400,
              lineHeight: 1.05,
              margin: '0 0 8px 0',
            }}
          >
            Selected work
          </h2>
          <p
            style={{
              fontSize: 'clamp(13px, 1.15vw, 15px)',
              fontFamily: 'var(--font-mono, monospace)',
              lineHeight: 1.6,
              opacity: 0.75,
              margin: 0,
            }}
          >
            Representative projects demonstrating our integrated approach from concept drafting to built handover.
          </p>
        </div>

        <Link
          href="/work/"
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1.5px solid var(--ink)',
            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
            padding: '8px 16px',
            transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
          }}
          className="focus-visible-ring"
        >
          View all projects ({projects.length}) →
        </Link>
      </div>

      {/* Responsive Cards Grid (2-column editorial on desktop, 1-column on mobile) */}
      <div
        className="cards-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 'clamp(24px, 3.5vw, 44px)',
        }}
      >
        {projects.map((project, idx) => (
          <ProjectCard key={project.slug} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
