import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.95, marginBottom: '20px' }}>
        OLI Design Studio
      </h1>
      <p style={{ fontSize: '18px', maxWidth: '40ch', marginBottom: '30px' }}>
        We take care of your projects from designing to handover.
      </p>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Button variant="primary" href="#enquire">
          Enquire
        </Button>
        <Button variant="secondary">
          Secondary Action
        </Button>
      </div>
    </main>
  );
}
