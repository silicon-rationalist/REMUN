import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface Props {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}

/** Purposeful scroll reveal: a single fade and 18px rise, once. */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;
  return (
    <Tag ref={ref} style={style} className={`reveal ${inView ? 'is-in' : ''} ${className}`}>
      {children}
    </Tag>
  );
}
