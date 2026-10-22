import type { Metadata } from 'next';
import { fontClassNames } from '@/lib/fonts';
import { themeInitScript } from '@/lib/theme';
import { SkipLink } from '@/components/layout/SkipLink';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import '@/styles/base.css';
import '@/styles/components.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://olidesignstudio.in'),
  title: 'OLI Design Studio — Architecture, Interior, Landscape, Product',
  description: 'We take care of your projects from designing to handover.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'OLI Design Studio — Architecture, Interior, Landscape, Product',
    description: 'We take care of your projects from designing to handover.',
    url: 'https://olidesignstudio.in',
    siteName: 'OLI Design Studio',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'OLI Design Studio — Architectural Elevation Sheet',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OLI Design Studio — Architecture, Interior, Landscape, Product',
    description: 'We take care of your projects from designing to handover.',
    images: ['/og.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'OLI Design Studio',
  url: 'https://olidesignstudio.in',
  email: 'olidesignstudio06@gmail.com',
  sameAs: ['https://instagram.com/olidesignstudio'],
  description: 'We take care of your projects from designing to handover.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClassNames} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SkipLink />
        <PageTransition />
        <Nav />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
