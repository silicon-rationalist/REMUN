import { useEffect, useRef, useState } from 'react';

/** Reports whether the element has entered the viewport. `once` latches true. */
export function useInView<T extends Element>(options?: { once?: boolean; margin?: string; threshold?: number }) {
  const { once = true, margin = '0px 0px -10% 0px', threshold = 0.1 } = options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, margin, threshold]);

  return [ref, inView] as const;
}
