import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export const Footer: React.FC = () => {
  return (
    <footer className="oli-footer" aria-label="Studio Footer">
      <div className="oli-footer-inner">
        {/* Top: Disciplines statement */}
        <div className="oli-footer-statement">
          <p className="oli-footer-disciplines">
            Architecture · Interior · Landscape · Product Design — one studio, start to finish.
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
                <a
                  href="https://wa.me/?text=Hello%20OLI%20Design%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oli-footer-link"
                >
                  WhatsApp: Message Design Team ↗
                </a>
              </li>
              <li>
                <a href="mailto:olidesignstudio06@gmail.com" className="oli-footer-link">
                  Email: olidesignstudio06@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/olidesignstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oli-footer-link"
                >
                  Instagram: @olidesignstudio ↗
                </a>
              </li>
              <li style={{ opacity: 0.75, fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', marginTop: '4px' }}>
                Response: Within 24–48 Business Hours
              </li>
            </ul>
          </div>

          <div className="oli-footer-col">
            <h2 className="oli-footer-heading">Studio Practice</h2>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', lineHeight: 1.6, opacity: 0.85, margin: 0 }}>
              Regional Base: Western India (Mumbai &amp; Pune Region)
            </p>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', lineHeight: 1.5, opacity: 0.75, marginTop: '4px', margin: 0 }}>
              Operating Scope: Pan-India Residential, Interior &amp; Landscape Commissions
            </p>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', lineHeight: 1.5, opacity: 0.75, marginTop: '4px', margin: 0 }}>
              Studio Hours: Mon – Sat, 9:30 AM – 6:30 PM IST
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
