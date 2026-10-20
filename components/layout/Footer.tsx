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
              <li><Link href="/work/">Work</Link></li>
              <li><Link href="/process/">Process</Link></li>
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/contact/">Contact / Enquire</Link></li>
            </ul>
          </div>

          <div className="oli-footer-col">
            <h2 className="oli-footer-heading">Direct Contact</h2>
            <ul className="oli-footer-contact-list">
              <li>
                <a href="mailto:olidesignstudio06@gmail.com" className="oli-footer-link">
                  olidesignstudio06@gmail.com
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
              <li className="oli-footer-placeholder">
                WhatsApp: <span className="oli-needed-tag">[NEEDED]</span>
              </li>
              <li className="oli-footer-placeholder">
                Phone: <span className="oli-needed-tag">[NEEDED]</span>
              </li>
            </ul>
          </div>

          <div className="oli-footer-col">
            <h2 className="oli-footer-heading">Studio</h2>
            <p className="oli-footer-placeholder">
              Location: <span className="oli-needed-tag">[NEEDED]</span>
            </p>
            <p className="oli-footer-placeholder">
              Office Hours: <span className="oli-needed-tag">[NEEDED]</span>
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
