import { SheetFrame } from '@/components/layout/SheetFrame';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="stage" style={{ position: 'relative' }}>
      <SheetFrame />
      
      <div style={{ maxWidth: '800px', margin: '40px auto', position: 'relative', zIndex: 2 }}>
        <h1 style={{ fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.92, marginBottom: '24px' }}>
          From <em>sketch</em> to handover.
        </h1>
        <p style={{ fontSize: 'clamp(14px, 1.3vw, 18px)', maxWidth: '42ch', lineHeight: 1.6, marginBottom: '36px' }}>
          We take care of your projects from designing to handover.
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" href="/contact/">
            Enquire
          </Button>
          <Button variant="secondary" href="/work/">
            View Work
          </Button>
        </div>
      </div>

      <TitleBlock sheetNumber="A-01" sheetTitle="Home" />
    </div>
  );
}
