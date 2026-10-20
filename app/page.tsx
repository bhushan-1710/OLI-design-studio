import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { DisciplinesSection } from '@/components/sections/DisciplinesSection';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <ProcessSection />
      <DisciplinesSection />
      <ClosingCtaSection />
    </>
  );
}
