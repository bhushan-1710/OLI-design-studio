export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'oli-theme';

/**
 * Pre-paint inline script string to be injected directly in the document <head>.
 * This runs synchronously before the first paint to prevent any theme flash or FOUC.
 */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);

    if (window.matchMedia && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('js');
    }
  } catch (e) {
    // Graceful fallback: light theme default
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

/**
 * Read the current active theme safely.
 */
export function getActiveTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'dark' ? 'dark' : 'light';
}

/**
 * Store and apply a theme preference.
 */
export function setStoredTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    // Ignore private browsing storage quota errors
  }
}

/**
 * Toggle the current theme and persist.
 */
export function toggleTheme(): Theme {
  const current = getActiveTheme();
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  setStoredTheme(next);
  return next;
}
