'use client';

import React from 'react';
import Link from 'next/link';
import { DimensionRule } from '@/components/ui/DimensionRule';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { getFeaturedProjects } from '@/content/projects';

export function SelectedWorkSection() {
  const projects = getFeaturedProjects();

  return (
    <section className="selected-work-section" style={{ position: 'relative', padding: 'clamp(32px, 5vw, 64px) clamp(22px, 3vw, 38px)' }}>
      {/* Dimension divider preceding the section */}
      <div style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }}>
        <DimensionRule value="4.2 M" />
      </div>

      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 'clamp(28px, 4vw, 44px)',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontWeight: 400,
            lineHeight: 1.0,
          }}
        >
          Selected work
        </h2>

        <Link
          href="/work/"
          style={{
            fontSize: '12px',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            borderBottom: '1px solid var(--ink)',
            paddingBottom: '2px',
          }}
        >
          All work →
        </Link>
      </div>

      {/* Responsive Cards Grid */}
      <div
        className="cards-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(20px, 3vw, 36px)',
        }}
      >
        {projects.map((project, idx) => (
          <ProjectCard key={project.slug} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
