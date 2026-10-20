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
  title: 'OLI Design Studio — Architecture · Interior · Landscape · Product',
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
