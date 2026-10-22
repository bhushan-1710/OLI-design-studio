'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export interface NavProps {
  className?: string;
}

export const Nav: React.FC<NavProps> = ({ className = '' }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key to close drawer and lock body scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Track scroll position to show sticky mobile enquiry bar after hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 420) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (route: string) => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  };

  return (
    <>
      <nav className={`oli-nav ${className}`.trim()} aria-label="Primary Navigation">
        <Link href="/" className="oli-logo" aria-label="OLI Design Studio Home">
          <span className="oli-logo-hand">OLI</span>
          <small className="oli-logo-sub">Design Studio</small>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="oli-nav-links">
          <li className="oli-nav-link-item">
            <Link
              href="/work/"
              className={`oli-nav-link ${isActive('/work') ? 'oli-nav-link-active' : ''}`}
              aria-current={isActive('/work') ? 'page' : undefined}
            >
              Work
            </Link>
          </li>
          <li className="oli-nav-link-item">
            <Link
              href="/process/"
              className={`oli-nav-link ${isActive('/process') ? 'oli-nav-link-active' : ''}`}
              aria-current={isActive('/process') ? 'page' : undefined}
            >
              Process
            </Link>
          </li>
          <li className="oli-nav-link-item">
            <Link
              href="/about/"
              className={`oli-nav-link ${isActive('/about') ? 'oli-nav-link-active' : ''}`}
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              About
            </Link>
          </li>
          <li className="oli-nav-enquire-item">
            <Button variant="primary" href="/contact/">
              Enquire
            </Button>
          </li>
        </ul>

        {/* Mobile Navigation Controls (<=720px) */}
        <div className="oli-nav-mobile-controls">
          <Button
            variant="primary"
            href="/contact/"
            className="oli-nav-mobile-enquire"
          >
            Enquire
          </Button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="oli-nav-menu-toggle focus-visible-ring"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-sheet"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? 'Close ✕' : 'Menu ☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Sheet */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-sheet"
          className="oli-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Directory"
        >
          <div className="oli-mobile-drawer-header">
            <span className="oli-mobile-drawer-tag">SHEET NAV · DIRECTORY</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="oli-mobile-drawer-close focus-visible-ring"
              aria-label="Close menu"
            >
              Close ✕
            </button>
          </div>

          <div className="oli-mobile-drawer-body">
            <ul className="oli-mobile-nav-list">
              <li>
                <Link
                  href="/"
                  className={`oli-mobile-nav-link ${pathname === '/' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="oli-mobile-nav-num">00</span>
                  <span className="oli-mobile-nav-title">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/work/"
                  className={`oli-mobile-nav-link ${isActive('/work') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="oli-mobile-nav-num">01</span>
                  <span className="oli-mobile-nav-title">Work</span>
                  <span className="oli-mobile-nav-meta">Architecture · Interior · Landscape · Product</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/process/"
                  className={`oli-mobile-nav-link ${isActive('/process') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="oli-mobile-nav-num">02</span>
                  <span className="oli-mobile-nav-title">Process</span>
                  <span className="oli-mobile-nav-meta">From Sketch to Handover</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about/"
                  className={`oli-mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="oli-mobile-nav-num">03</span>
                  <span className="oli-mobile-nav-title">About</span>
                  <span className="oli-mobile-nav-meta">Practice & Philosophy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/"
                  className={`oli-mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="oli-mobile-nav-num">04</span>
                  <span className="oli-mobile-nav-title">Contact / Enquire</span>
                  <span className="oli-mobile-nav-meta">Direct Inquiries & Briefs</span>
                </Link>
              </li>
            </ul>

            <div className="oli-mobile-drawer-footer">
              <div className="oli-mobile-direct-links">
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oli-btn oli-btn-secondary"
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  WhatsApp Studio ↗
                </a>
                <a
                  href="mailto:olidesignstudio06@gmail.com"
                  className="oli-mobile-email"
                >
                  olidesignstudio06@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Contact Bar (Visible after scrolling past hero, hidden on contact page) */}
      {scrolledPastHero && pathname !== '/contact/' && pathname !== '/contact' && (
        <aside
          className="oli-sticky-mobile-bar"
          aria-label="Quick Action Bar"
        >
          <div className="oli-sticky-mobile-inner">
            <span className="oli-sticky-mobile-prompt">Start a Project:</span>
            <div className="oli-sticky-mobile-actions">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="oli-sticky-whatsapp-btn focus-visible-ring"
                aria-label="WhatsApp Studio"
              >
                WhatsApp ↗
              </a>
              <Link
                href="/contact/"
                className="oli-btn oli-btn-primary"
                style={{ padding: '6px 14px', fontSize: '11px', minHeight: '38px' }}
              >
                Enquire →
              </Link>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
