import { SheetFrame } from '@/components/layout/SheetFrame';
import { TitleBlock } from '@/components/layout/TitleBlock';

export const metadata = {
  title: 'Contact — OLI Design Studio',
  description: 'Let’s talk about your project. Architecture, Interior, Landscape, Product.',
};

export default function ContactPage() {
  return (
    <div className="stage" style={{ minHeight: '60svh', position: 'relative' }}>
      <SheetFrame />
      <div style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '16px' }}>Contact</h1>
        <p style={{ opacity: 0.7, marginBottom: '24px' }}>
          Enquiry form, WhatsApp click-to-chat, and direct email planned for Phase 5.
        </p>
      </div>
      <TitleBlock sheetNumber="A-05" sheetTitle="Contact" />
    </div>
  );
}
