import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { NAV, type NavId } from '../data/content';
import { useToast } from './Toast';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: NavId;
  children: ReactNode;
  onNavigate?: () => void;
}

/**
 * Resolves a destination from the NAV config.
 * Real anchors scroll in-page. Destinations whose inner page isn't built yet
 * (href === null) are clearly-flagged prototype placeholders: no fabricated page,
 * no dead hash, just an explanatory notice.
 */
export function SiteLink({ to, children, onNavigate, onClick, ...rest }: Props) {
  const { notify } = useToast();
  const item = NAV.find((n) => n.id === to)!;

  if (item.href) {
    return (
      <a
        href={item.href}
        onClick={(e) => {
          onClick?.(e);
          const target = document.querySelector(item.href!);
          if (target) {
            // Explicit jump: keeps smooth scrolling reliable even when the mobile menu collapses mid-scroll.
            e.preventDefault();
            history.replaceState(null, '', item.href);
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
            if (onNavigate) {
              // Menu collapse cancels an in-flight smooth scroll, so wait for its exit animation (300ms).
              onNavigate();
              window.setTimeout(() => target.scrollIntoView({ behavior }), 320);
            } else target.scrollIntoView({ behavior });
          } else onNavigate?.();
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={`#${to}`}
      data-prototype-placeholder={to}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        onNavigate?.();
        notify(`${item.label} is a prototype placeholder. This inner page isn’t part of the homepage phase.`);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
