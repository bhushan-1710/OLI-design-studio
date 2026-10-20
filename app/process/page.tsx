import { SheetFrame } from '@/components/layout/SheetFrame';
import { TitleBlock } from '@/components/layout/TitleBlock';

export const metadata = {
  title: 'Process — OLI Design Studio',
  description: 'How a project moves from sketch to handover.',
};

export default function ProcessPage() {
  return (
    <div className="stage" style={{ minHeight: '60svh', position: 'relative' }}>
      <SheetFrame />
      <div style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '16px' }}>Process</h1>
        <p style={{ opacity: 0.7, marginBottom: '24px' }}>
          Detailed project stages (Sketch, Develop, Build, Handover) planned for Phase 5.
        </p>
      </div>
      <TitleBlock sheetNumber="A-03" sheetTitle="Process" />
    </div>
  );
}
