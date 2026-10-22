import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { DisciplinesSection } from '@/components/sections/DisciplinesSection';
import { StudioPillarsSection } from '@/components/sections/StudioPillarsSection';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export const metadata: Metadata = {
  title: 'OLI Design Studio — Architecture, Interior, Landscape, Product',
  description: 'We take care of your projects from designing to handover.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <ProcessSection />
      <DisciplinesSection />
      <StudioPillarsSection />
      <ClosingCtaSection />
    </>
  );
}
