import { SheetFrame } from '@/components/layout/SheetFrame';
import { TitleBlock } from '@/components/layout/TitleBlock';

export const metadata = {
  title: 'About — OLI Design Studio',
  description: 'About OLI Design Studio — Architecture, Interior, Landscape, Product.',
};

export default function AboutPage() {
  return (
    <div className="stage" style={{ minHeight: '60svh', position: 'relative' }}>
      <SheetFrame />
      <div style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '16px' }}>About</h1>
        <p style={{ opacity: 0.7, marginBottom: '24px' }}>
          Studio philosophy, team details, and locations planned for Phase 5.
        </p>
      </div>
      <TitleBlock sheetNumber="A-04" sheetTitle="About" />
    </div>
  );
}
