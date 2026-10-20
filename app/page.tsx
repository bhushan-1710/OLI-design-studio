import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      {/* Minimal spacer section so the pinned hero releases and transitions cleanly */}
      <section className="next-placeholder">
        Hero ends here · next: selected work
      </section>
    </main>
  );
}

