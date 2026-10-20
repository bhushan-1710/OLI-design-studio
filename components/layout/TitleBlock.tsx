import React from 'react';

export interface TitleBlockProps {
  sheetNumber: string; // e.g. "A-01", "A-02"
  sheetTitle: string;  // e.g. "Home", "Work"
  scale?: string;      // default: "Scale 1:100"
  revision?: string;   // default: "Rev 0"
  className?: string;
}

/**
 * Reusable architectural sheet title block rendered at the bottom-right of a sheet section.
 * Hidden on viewports <= 820px per design.md §4.4.
 */
export const TitleBlock: React.FC<TitleBlockProps> = ({
  sheetNumber,
  sheetTitle,
  scale = 'Scale 1:100',
  revision = 'Rev 0',
  className = '',
}) => {
  return (
    <aside
      className={`oli-titleblock ${className}`.trim()}
      aria-label={`Drawing Sheet ${sheetNumber} Title Block`}
    >
      <div>OLI Design Studio</div>
      <div>
        Sheet {sheetNumber} · {sheetTitle}
      </div>
      <div>
        {scale} · {revision}
      </div>
    </aside>
  );
};
