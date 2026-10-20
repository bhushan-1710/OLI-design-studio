import type { Metadata } from 'next';
import { fontClassNames } from '@/lib/fonts';
import { themeInitScript } from '@/lib/theme';
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
        {children}
      </body>
    </html>
  );
}
