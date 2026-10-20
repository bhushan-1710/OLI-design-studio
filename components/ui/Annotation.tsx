import React from 'react';

export interface AnnotationProps {
  text: string;
  arrow?: 'left' | 'right' | 'down' | 'up';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Annotation label component (design.md §4.9)
 * Hand font, red color, max 1-4 words per use, with optional curved arrow.
 */
export const Annotation: React.FC<AnnotationProps> = ({
  text,
  arrow,
  className = '',
  style,
}) => {
  return (
    <span className={`oli-annotation ${className}`.trim()} style={style}>
      {arrow === 'left' && (
        <svg className="oli-annotation-arrow oli-annotation-arrow-left" viewBox="0 0 24 16" aria-hidden="true">
          <path d="M22 8 H2 M8 2 L2 8 L8 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}

      {arrow === 'up' && (
        <svg className="oli-annotation-arrow oli-annotation-arrow-up" viewBox="0 0 16 24" aria-hidden="true">
          <path d="M8 22 V2 M2 8 L8 2 L14 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}

      <span className="oli-annotation-text">{text}</span>

      {arrow === 'right' && (
        <svg className="oli-annotation-arrow oli-annotation-arrow-right" viewBox="0 0 24 16" aria-hidden="true">
          <path d="M2 8 H22 M16 2 L22 8 L16 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}

      {arrow === 'down' && (
        <svg className="oli-annotation-arrow oli-annotation-arrow-down" viewBox="0 0 16 24" aria-hidden="true">
          <path d="M8 2 V22 M2 16 L8 22 L14 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
};
