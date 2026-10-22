'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Project, Discipline, getAllProjects } from '@/content/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Chip } from '@/components/ui/Chip';
import { DiscreteTabs } from '@/components/ui/discrete-tabs';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

const ALL_DISCIPLINES: Discipline[] = ['Architecture', 'Interior', 'Landscape', 'Product'];

export function WorkGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type');

  // Normalize initial filter
  const initialFilter: 'All' | Discipline = useMemo(() => {
    if (!initialType) return 'All';
    const match = ALL_DISCIPLINES.find(
      (d) => d.toLowerCase() === initialType.toLowerCase()
    );
    return match || 'All';
  }, [initialType]);

  const [activeFilter, setActiveFilter] = useState<'All' | Discipline>(initialFilter);
  const gridRef = useRef<HTMLDivElement>(null);
  const allProjects = useMemo(() => getAllProjects(), []);

  // Sync state if search params change externally (e.g. back button)
  useEffect(() => {
    if (!initialType) {
      setActiveFilter('All');
    } else {
      const match = ALL_DISCIPLINES.find(
        (d) => d.toLowerCase() === initialType.toLowerCase()
      );
      setActiveFilter(match || 'All');
    }
  }, [initialType]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return allProjects;
    return allProjects.filter((p) => p.discipline === activeFilter);
  }, [activeFilter, allProjects]);

  // Counts for badges
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: allProjects.length };
    for (const d of ALL_DISCIPLINES) {
      map[d] = allProjects.filter((p) => p.discipline === d).length;
    }
    return map;
  }, [allProjects]);

  // Handle filter selection with URL state synchronization
  const handleSelectFilter = useCallback(
    (discipline: 'All' | Discipline) => {
      setActiveFilter(discipline);

      const params = new URLSearchParams(window.location.search);
      if (discipline === 'All') {
        params.delete('type');
      } else {
        params.set('type', discipline.toLowerCase());
      }

      const queryString = params.toString();
      const newUrl = queryString ? `/work/?${queryString}` : '/work/';
      window.history.pushState(null, '', newUrl);
    },
    []
  );

  // Subtle stagger animation on filter change
  useEffect(() => {
    if (!gridRef.current || prefersReducedMotion()) return;

    const cards = gridRef.current.querySelectorAll('.project-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
      );
    }
  }, [activeFilter]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {/* Filter Bar */}
      <div
        role="region"
        aria-label="Filter projects by discipline"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          paddingBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--grid)',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            opacity: 0.6,
            marginRight: '8px',
          }}
        >
          FILTER:
        </span>

        <DiscreteTabs
          ariaLabel="Filter projects by discipline"
          activeId={activeFilter}
          onChange={(id) => handleSelectFilter(id as 'All' | Discipline)}
          tabs={[
            { id: 'All', label: 'All', badge: counts['All'] || 0 },
            ...ALL_DISCIPLINES.map((d) => ({
              id: d,
              label: d,
              badge: counts[d] || 0,
            })),
          ]}
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div
          style={{
            padding: 'var(--space-12) var(--space-4)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-4)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '14px',
              letterSpacing: '0.08em',
              opacity: 0.8,
            }}
          >
            Nothing here yet. Try another discipline.
          </p>
          <button
            type="button"
            onClick={() => handleSelectFilter('All')}
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--red)',
              textDecoration: 'underline',
              padding: '8px 16px',
            }}
          >
            Show All Projects →
          </button>
        </div>
      ) : (
        <div
          ref={gridRef}
          className="work-gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'var(--space-8)',
          }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
