import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  locale?: string;
}

/**
 * One-time count-up. The final value is always in the DOM for screen readers
 * and reserves layout width, so nothing shifts and nothing is hidden while counting.
 */
export function CountUp({ value, prefix = '', suffix = '', duration = 1800, locale = 'en-IN' }: Props) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [current, setCurrent] = useState(reduced ? value : 0);
  const fmt = (n: number) => `${prefix}${new Intl.NumberFormat(locale).format(Math.round(n))}${suffix}`;

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCurrent(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
      setCurrent(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span className="sr-only">{fmt(value)}</span>
      <span aria-hidden="true" className="invisible">
        {fmt(value)}
      </span>
      <span aria-hidden="true" className="absolute inset-0 text-left">
        {fmt(current)}
      </span>
    </span>
  );
}
