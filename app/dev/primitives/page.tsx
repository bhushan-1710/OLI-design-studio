'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { SheetFrame } from '@/components/layout/SheetFrame';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Stamp } from '@/components/ui/Stamp';
import { DimensionRule } from '@/components/ui/DimensionRule';
import { Annotation } from '@/components/ui/Annotation';
import { HandCircle } from '@/components/ui/HandCircle';
import { initSmoothScroll } from '@/lib/motion/lenis';
import { trackEvent } from '@/lib/analytics';

export default function DevPrimitivesPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const [activeChip, setActiveChip] = useState<'all' | 'arch' | 'interior' | 'landscape' | 'product'>('all');

  useEffect(() => {
    const cleanup = initSmoothScroll();
    return () => cleanup();
  }, []);

  const handleChipClick = (discipline: typeof activeChip) => {
    setActiveChip(discipline);
    trackEvent('filter_click', { discipline });
  };

  return (
    <div className="stage" style={{ position: 'relative', minHeight: '100svh' }}>
      <SheetFrame />

      <div style={{ maxWidth: '900px', margin: '30px auto', position: 'relative', zIndex: 2 }}>
        <div style={{ marginBottom: '16px', opacity: 0.7, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Dev Showcase · UI Primitives & Design System
        </div>

        {/* Headline with HandCircle */}
        <h1 style={{ fontSize: 'clamp(44px, 7.2vw, 100px)', lineHeight: 0.92, marginBottom: '24px' }}>
          From <em>sketch</em> to <HandCircle>handover.</HandCircle>
        </h1>

        <p style={{ fontSize: 'clamp(14px, 1.25vw, 18px)', maxWidth: '42ch', lineHeight: 1.6, marginBottom: '32px' }}>
          We take care of your projects from designing to handover.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          <Button variant="primary" href="/contact/">
            Enquire
          </Button>
          <Button variant="secondary" href="/work/">
            View Work
          </Button>
          <Annotation text="CANTILEVER · 3.0 M" arrow="left" />
        </div>

        {/* DimensionRule */}
        <DimensionRule value="12.40 M" />

        {/* Filter Chips & Stamp Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip active={activeChip === 'all'} onClick={() => handleChipClick('all')}>
              All Disciplines
            </Chip>
            <Chip active={activeChip === 'arch'} onClick={() => handleChipClick('arch')}>
              Architecture
            </Chip>
            <Chip active={activeChip === 'interior'} onClick={() => handleChipClick('interior')}>
              Interior
            </Chip>
            <Chip active={activeChip === 'landscape'} onClick={() => handleChipClick('landscape')}>
              Landscape
            </Chip>
            <Chip active={activeChip === 'product'} onClick={() => handleChipClick('product')}>
              Product
            </Chip>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Stamp text="HANDED OVER" animate={true} />
            <Annotation text="DRAWING READY" arrow="up" />
          </div>
        </div>
      </div>

      <TitleBlock sheetNumber="DEV-01" sheetTitle="Primitives" />
    </div>
  );
}
