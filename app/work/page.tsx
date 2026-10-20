import { SheetFrame } from '@/components/layout/SheetFrame';
import { TitleBlock } from '@/components/layout/TitleBlock';

export const metadata = {
  title: 'Work — OLI Design Studio',
  description: 'Selected projects across Architecture, Interior, Landscape, and Product Design.',
};

export default function WorkPage() {
  return (
    <div className="stage" style={{ minHeight: '60svh', position: 'relative' }}>
      <SheetFrame />
      <div style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '16px' }}>Work</h1>
        <p style={{ opacity: 0.7, marginBottom: '24px' }}>
          Portfolio index with discipline filtering planned for Phase 4.
        </p>
      </div>
      <TitleBlock sheetNumber="A-02" sheetTitle="Work" />
    </div>
  );
}
