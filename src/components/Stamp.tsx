import { useId } from 'react';
import { EVENT } from '../data/content';
import { useInView } from '../hooks/useInView';

/** Passport-style entry stamp. Used once, as a nod to the current site's identity. */
export function Stamp({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  return (
    <div
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-500 ease-out-quart motion-reduce:transition-none ${
        inView ? 'rotate-[-9deg] scale-100 opacity-100' : 'rotate-[-14deg] scale-[1.12] opacity-0'
      } motion-reduce:rotate-[-9deg] motion-reduce:scale-100 motion-reduce:opacity-100`}
    >
      <svg viewBox="0 0 240 240" role="img" aria-label={`Entry stamp: ${EVENT.name}, ${EVENT.dateLabel}, ${EVENT.location}`} className="h-full w-full text-blue mix-blend-multiply">
        <defs>
          <path id={`${id}-ring`} d="M120 120m-86 0a86 86 0 1 1 172 0a86 86 0 1 1-172 0" />
        </defs>
        <g fill="none" stroke="currentColor" opacity="0.88">
          <circle cx="120" cy="120" r="112" strokeWidth="3" />
          <circle cx="120" cy="120" r="104" strokeWidth="1" />
          <circle cx="120" cy="120" r="66" strokeWidth="1.5" strokeDasharray="2 4" />
        </g>
        <text fill="currentColor" opacity="0.9" fontFamily="var(--font-sans)" fontWeight="600" fontSize="13.5" letterSpacing="4.4">
          <textPath href={`#${id}-ring`} startOffset="0">
            RNS MUN · BENGALURU · INDIA · ENTRY ·
          </textPath>
        </text>
        <g fill="currentColor" opacity="0.92" textAnchor="middle">
          <text x="120" y="118" fontFamily="var(--font-display)" fontSize="38" fontWeight="500" letterSpacing="-1">
            06–07
          </text>
          <text x="120" y="142" fontFamily="var(--font-sans)" fontSize="13" fontWeight="600" letterSpacing="4">
            OCT 2026
          </text>
        </g>
        <path d="M92 156h56" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      </svg>
    </div>
  );
}
