'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export interface NavProps {
  className?: string;
}

export const Nav: React.FC<NavProps> = ({ className = '' }) => {
  return (
    <nav className={`oli-nav ${className}`.trim()} aria-label="Primary Navigation">
      <Link href="/" className="oli-logo" aria-label="OLI Design Studio Home">
        <span className="oli-logo-hand">OLI</span>
        <small className="oli-logo-sub">Design Studio</small>
      </Link>

      <ul className="oli-nav-links">
        <li className="oli-nav-link-item">
          <Link href="/work/" className="oli-nav-link">
            Work
          </Link>
        </li>
        <li className="oli-nav-link-item">
          <Link href="/process/" className="oli-nav-link">
            Process
          </Link>
        </li>
        <li className="oli-nav-link-item">
          <Link href="/about/" className="oli-nav-link">
            About
          </Link>
        </li>
        <li className="oli-nav-enquire-item">
          <Button variant="primary" href="/contact/">
            Enquire
          </Button>
        </li>
      </ul>
    </nav>
  );
};
