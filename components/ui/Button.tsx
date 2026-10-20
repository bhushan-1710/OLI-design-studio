import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ href, variant = 'primary', children, className = '', ...props }, ref) => {
    const baseClassName = `oli-btn oli-btn-${variant} ${className}`.trim();

    if (href) {
      const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={baseClassName}
            target={props.target}
            rel={props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined)}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClassName}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
