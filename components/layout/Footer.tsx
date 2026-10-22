import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { studioFacts } from '@/content/studio-facts';

export const Footer: React.FC = () => {
  return (
    <footer className="oli-footer" aria-label="Studio Footer">
      <div className="oli-footer-inner">
        {/* Top: Disciplines statement */}
        <div className="oli-footer-statement">
          <p className="oli-footer-disciplines">
            {studioFacts.disciplines.map((d) => d.name).join(' · ')} — one studio, start to finish.
          </p>
        </div>

        {/* Middle: Links and authentic contact details */}
        <div className="oli-footer-grid">
          <div className="oli-footer-col">
            <h2 className="oli-footer-heading">Navigation</h2>
            <ul className="oli-footer-nav-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/work/">Work Archive</Link></li>
              <li><Link href="/process/">Process (4 Stages)</Link></li>
              <li><Link href="/about/">About Studio</Link></li>
              <li><Link href="/contact/">Contact &amp; Brief</Link></li>
            </ul>
          </div>

          <div className="oli-footer-col">
            <h2 className="oli-footer-heading">Direct Channels</h2>
            <ul className="oli-footer-contact-list">
              <li>
                <a href={`mailto:${studioFacts.email}`} className="oli-footer-link">
                  Email: {studioFacts.email}
                </a>
              </li>
              <li>
                <a
                  href={studioFacts.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oli-footer-link"
                >
                  Instagram: {studioFacts.instagram.handle} ↗
                </a>
              </li>
              {studioFacts.whatsapp.isConfirmed ? (
                <li>
                  <a
                    href={`https://wa.me/${studioFacts.whatsapp.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="oli-footer-link"
                  >
                    WhatsApp: {studioFacts.whatsapp.display} ↗
                  </a>
                </li>
              ) : (
                <li style={{ opacity: 0.6, fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', marginTop: '4px' }}>
                  WhatsApp: [NEEDED]
                </li>
              )}
            </ul>
          </div>

          <div className="oli-footer-col">
            <h2 className="oli-footer-heading">Studio Practice</h2>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', lineHeight: 1.6, opacity: 0.85, margin: 0 }}>
              Region: {studioFacts.office.region}
            </p>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', lineHeight: 1.5, opacity: 0.75, marginTop: '4px', margin: 0 }}>
              Hours: {studioFacts.office.hours}
            </p>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', lineHeight: 1.5, opacity: 0.75, marginTop: '4px', margin: 0 }}>
              Promise: {studioFacts.promise}
            </p>
          </div>
        </div>

        {/* Bottom bar: ThemeToggle and copyright */}
        <div className="oli-footer-bottom">
          <div className="oli-footer-theme-wrap">
            <ThemeToggle />
          </div>
          <div className="oli-footer-copy">
            © {new Date().getFullYear()} OLI Design Studio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
