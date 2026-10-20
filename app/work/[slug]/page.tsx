import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug, Project } from '@/content/projects';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { SketchScrub } from '@/components/work/SketchScrub';
import { Button } from '@/components/ui/Button';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const allProjects = getAllProjects();
  return allProjects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found · OLI Design Studio' };

  return {
    title: `${project.title} · OLI Design Studio`,
    description: project.brief,
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = allProjects[currentIndex];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const sheetNumber = `A-02.${String(currentIndex + 1).padStart(2, '0')}`;

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100svh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="oli-sheet-content"
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'calc(var(--nav-height) + var(--space-8)) var(--space-6) var(--space-20)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-12)',
          boxSizing: 'border-box',
        }}
      >
        {/* Project Header */}
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            maxWidth: '840px',
            borderBottom: '1.5px solid var(--ink)',
            paddingBottom: 'var(--space-8)',
          }}
        >
          {/* Breadcrumb / Sheet Identifier */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--red)',
            }}
          >
            <Link
              href="/work/"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                opacity: 0.8,
              }}
            >
              ← ALL WORK
            </Link>
            <span>·</span>
            <span>SHEET {sheetNumber}</span>
            <span>·</span>
            <span>{project.discipline.toUpperCase()}</span>
          </div>

          {/* Project Title */}
          <h1
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(40px, 6vw, 76px)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            {project.title}
          </h1>

          {/* Metadata String */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.75,
              paddingTop: 'var(--space-2)',
            }}
          >
            <span>DISCIPLINE: {project.discipline}</span>
            <span>·</span>
            <span>LOCATION: {project.location}</span>
            <span>·</span>
            <span>YEAR: {project.year}</span>
            {project.area && (
              <>
                <span>·</span>
                <span>SCALE: {project.area}</span>
              </>
            )}
          </div>

          {/* Project Brief */}
          <p
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 2.4vw, 26px)',
              lineHeight: 1.45,
              color: 'var(--ink)',
              opacity: 0.9,
              marginTop: 'var(--space-4)',
              margin: 0,
            }}
          >
            {project.brief}
          </p>
        </header>

        {/* Signature Pinned Sketch-to-Photo Scrub */}
        <section aria-label="From Sketch to Handover Scrub Reveal">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              opacity: 0.6,
              marginBottom: 'var(--space-2)',
            }}
          >
            <span>01 Sketch → 04 Handover</span>
          </div>
          <SketchScrub project={project} />
        </section>

        {/* Process Section (Plans, Sections, Joinery) */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid var(--grid)',
          }}
          aria-label="Process drawings and studies"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              opacity: 0.6,
            }}
          >
            <span>02 Develop & 03 Build · Process</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 400,
              margin: 0,
            }}
          >
            Process
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {/* Process Card 1: Schematic Ground Plan */}
            <div
              style={{
                border: '1.5px solid var(--ink)',
                backgroundColor: 'var(--paper)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid var(--ink)',
                  padding: 'var(--space-4)',
                  boxSizing: 'border-box',
                }}
              >
                <svg
                  viewBox="0 0 240 180"
                  fill="none"
                  style={{ width: '85%', height: '85%', stroke: 'var(--ink)', strokeWidth: 1.2 }}
                >
                  <rect x="20" y="20" width="200" height="140" strokeWidth="1.8" />
                  <line x1="20" y1="80" x2="220" y2="80" strokeDasharray="4 2" />
                  <line x1="120" y1="20" x2="120" y2="160" />
                  <path d="M 60 80 A 30 30 0 0 1 90 50" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="60" y1="80" x2="60" y2="50" />
                  <text
                    x="70"
                    y="130"
                    fontFamily="var(--font-mono, monospace)"
                    fontSize="9"
                    fill="var(--ink)"
                    opacity="0.7"
                    letterSpacing="0.1em"
                  >
                    COURTYARD
                  </text>
                  <text
                    x="150"
                    y="60"
                    fontFamily="var(--font-mono, monospace)"
                    fontSize="9"
                    fill="var(--ink)"
                    opacity="0.7"
                    letterSpacing="0.1em"
                  >
                    LIVING
                  </text>
                </svg>
              </div>
              <div
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity: 0.8,
                }}
              >
                [NEEDED: Process caption — concept drawing]
              </div>
            </div>

            {/* Process Card 2: Longitudinal Section */}
            <div
              style={{
                border: '1.5px solid var(--ink)',
                backgroundColor: 'var(--paper)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid var(--ink)',
                  padding: 'var(--space-4)',
                  boxSizing: 'border-box',
                }}
              >
                <svg
                  viewBox="0 0 240 180"
                  fill="none"
                  style={{ width: '85%', height: '85%', stroke: 'var(--ink)', strokeWidth: 1.2 }}
                >
                  <line x1="10" y1="150" x2="230" y2="150" strokeWidth="2" />
                  <polygon points="40,150 40,80 140,80 140,50 200,50 200,150" strokeWidth="1.8" />
                  <line x1="40" y1="110" x2="140" y2="110" strokeDasharray="3 3" />
                  <line x1="90" y1="80" x2="90" y2="150" strokeWidth="1" />
                  <text
                    x="120"
                    y="35"
                    fontFamily="var(--font-mono, monospace)"
                    fontSize="9"
                    fill="var(--ink)"
                    opacity="0.7"
                    textAnchor="middle"
                  >
                    +6.40 M PARAPET
                  </text>
                </svg>
              </div>
              <div
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity: 0.8,
                }}
              >
                [NEEDED: Process caption — section study]
              </div>
            </div>

            {/* Process Card 3: Joinery & Material Details */}
            <div
              style={{
                border: '1.5px solid var(--ink)',
                backgroundColor: 'var(--paper)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid var(--ink)',
                  padding: 'var(--space-4)',
                  boxSizing: 'border-box',
                }}
              >
                <svg
                  viewBox="0 0 240 180"
                  fill="none"
                  style={{ width: '85%', height: '85%', stroke: 'var(--ink)', strokeWidth: 1.2 }}
                >
                  <rect x="50" y="30" width="140" height="120" strokeWidth="1.5" />
                  <line x1="50" y1="70" x2="190" y2="70" />
                  <line x1="50" y1="110" x2="190" y2="110" />
                  <line x1="120" y1="30" x2="120" y2="150" strokeDasharray="4 2" />
                  <circle cx="120" cy="90" r="14" strokeWidth="1" />
                  <text
                    x="120"
                    y="170"
                    fontFamily="var(--font-hand, cursive)"
                    fontSize="16"
                    fill="var(--ink)"
                    textAnchor="middle"
                  >
                    Fluted joinery detail
                  </text>
                </svg>
              </div>
              <div
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity: 0.8,
                }}
              >
                [NEEDED: Process caption — detail study]
              </div>
            </div>
          </div>
        </section>

        {/* Outcome Gallery */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid var(--grid)',
          }}
          aria-label="Built outcome gallery"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              opacity: 0.6,
            }}
          >
            <span>04 Handover · Outcome</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 400,
              margin: 0,
            }}
          >
            Outcome
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {project.images.slice(0, 2).map((img, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  border: '1.5px solid var(--ink)',
                  backgroundColor: 'var(--paper)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              >
                <div
                  style={{
                    border: '1px solid var(--ink)',
                    padding: '6px 12px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--paper)',
                  }}
                >
                  [NEEDED: Outcome photo {i + 1}] · PHOTO TBC
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Project & Enquire Footer Bar */}
        <footer
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-6)',
            paddingTop: 'var(--space-10)',
            borderTop: '1.5px solid var(--ink)',
            marginTop: 'var(--space-8)',
          }}
        >
          {/* Next Project Link */}
          <Link
            href={`/work/${nextProject.slug}/`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--red)',
              }}
            >
              NEXT PROJECT →
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontSize: 'clamp(22px, 2.5vw, 32px)',
                fontWeight: 400,
                textDecoration: 'underline',
              }}
            >
              {nextProject.title}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              {nextProject.discipline} · {nextProject.year}
            </span>
          </Link>

          {/* Project Enquiry CTA */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                opacity: 0.7,
              }}
            >
              Planning something similar?
            </span>
            <Button
              href={`/contact?type=${project.discipline.toLowerCase()}`}
              variant="primary"
            >
              Enquire About This Project →
            </Button>
          </div>
        </footer>
      </div>

      {/* Sheet Title Block */}
      <TitleBlock sheetNumber={sheetNumber} sheetTitle={project.title} scale="Scale 1:50" />
    </div>
  );
}
