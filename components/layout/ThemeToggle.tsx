'use client';

import React, { useEffect, useState } from 'react';
import { getActiveTheme, setStoredTheme, type Theme } from '@/lib/theme';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getActiveTheme());
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setStoredTheme(next);
  };

  // Avoid hydration mismatch by rendering neutral text until mounted
  const label = mounted
    ? theme === 'dark'
      ? 'Theme: Dark [Switch to Light]'
      : 'Theme: Light [Switch to Dark]'
    : 'Theme: System';

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`oli-theme-toggle ${className}`.trim()}
      aria-label={label}
    >
      <span className="oli-theme-toggle-indicator" aria-hidden="true" />
      <span className="oli-theme-toggle-text">{label}</span>
    </button>
  );
};
