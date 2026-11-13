import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WORLD_PATH } from '../data/geo';
import { HOME_MARKER, TOPICS } from '../data/content';
import { useInView } from '../hooks/useInView';

// Map geometry: equirectangular, lat 83° → -57°, matches the generated WORLD_PATH.
const W = 1000;
const H = 389;
const px = (lon: number) => ((lon + 180) / 360) * W;
const py = (lat: number) => ((83 - lat) / 360) * W;

export function WorldMap() {
  const [activeId, setActiveId] = useState(TOPICS[0].id);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const active = TOPICS.find((t) => t.id === activeId)!;

  const graticule = useMemo(() => {
    let d = '';
    for (let lon = -150; lon <= 180; lon += 30) d += `M${px(lon)} 0V${H}`;
    for (let lat = -30; lat <= 60; lat += 30) d += `M0 ${py(lat)}H${W}`;
    return d;
  }, []);

  const links = useMemo(() => {
    const [hx, hy] = [px(HOME_MARKER[0]), py(HOME_MARKER[1])];
    return TOPICS.map((t) => {
      const [x, y] = [px(t.at[0]), py(t.at[1])];
      const mx = (x + hx) / 2;
      const my = Math.min(y, hy) - Math.abs(x - hx) * 0.16;
      return `M${x} ${y}Q${mx} ${my} ${hx} ${hy}`;
    }).join('');
  }, []);

  return (
    <div>
      {/* Map */}
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-[1.25rem] border border-rule bg-ivory transition-[opacity,transform] duration-[900ms] ease-out-expo ${
          inView ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.985] opacity-0'
        } motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100`}
      >
        <div className="relative px-1 py-3 sm:px-6 sm:py-8" style={{ aspectRatio: 'auto' }}>
          <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={`Illustrative world map with markers for ${TOPICS.map((t) => t.title).join(', ')}. The same topics are listed below the map.`}
            >
              <path d={graticule} fill="none" stroke="#1e4fa3" strokeOpacity="0.12" strokeWidth="0.6" />
              <path d={WORLD_PATH} fill="#dce6f5" stroke="#1e4fa3" strokeOpacity="0.55" strokeWidth="0.5" strokeLinejoin="round" />
              <path d={links} fill="none" stroke="#a98a4e" strokeOpacity="0.7" strokeWidth="0.9" strokeDasharray="3 4" />
              <circle cx={px(HOME_MARKER[0])} cy={py(HOME_MARKER[1])} r="4.5" fill="#a98a4e" stroke="#fbf8f1" strokeWidth="1.5" />
            </svg>

            {TOPICS.map((t) => {
              const on = t.id === activeId;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={on}
                  aria-label={t.title}
                  onClick={() => setActiveId(t.id)}
                  className="group absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full sm:h-11 sm:w-11"
                  style={{ left: `${(px(t.at[0]) / W) * 100}%`, top: `${(py(t.at[1]) / H) * 100}%` }}
                >
                  <span
                    aria-hidden="true"
                    className={`block rounded-full border-2 transition-[transform,background-color,border-color] duration-200 ease-out-quart group-active:scale-90 ${
                      on
                        ? 'h-4 w-4 border-gold bg-navy sm:h-5 sm:w-5'
                        : 'h-3 w-3 border-blue bg-ivory group-hover:scale-125 sm:h-3.5 sm:w-3.5'
                    }`}
                  />
                  {on && (
                    <span
                      aria-hidden="true"
                      className="pulse-ring pointer-events-none absolute h-5 w-5 rounded-full border border-gold"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-1/2 top-full mt-0.5 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-2.5 py-1 text-[0.7rem] font-medium text-ivory transition-opacity duration-200 sm:block ${
                      on ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                    }`}
                  >
                    {t.title}
                  </span>
                </button>
              );
            })}

            <span
              className="eyebrow pointer-events-none absolute hidden -translate-y-1/2 pl-3 !text-[0.62rem] text-gold-ink sm:block"
              style={{ left: `${(px(HOME_MARKER[0]) / W) * 100}%`, top: `${(py(HOME_MARKER[1]) / H) * 100 + 4.5}%` }}
            >
              RNS MUN 2026
            </span>
          </div>
        </div>
        <p className="border-t border-rule px-5 py-3 text-xs text-ink-soft sm:px-6">
          Illustrative map. Marker positions are symbolic and don’t refer to specific countries or events.
        </p>
      </div>

      {/* Text equivalent + explanation */}
      <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-8">
        <ul className="md:col-span-5" aria-label="MUN topics">
          {TOPICS.map((t, i) => {
            const on = t.id === activeId;
            return (
              <li key={t.id} className="border-b border-rule first:border-t">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActiveId(t.id)}
                  className="group flex min-h-14 w-full items-center gap-4 py-3 text-left"
                >
                  <span className={`eyebrow !text-[0.7rem] transition-colors duration-200 ${on ? 'text-gold-ink' : 'text-ink-soft'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`display text-[1.4rem] transition-[color,transform] duration-300 ease-out-quart sm:text-[1.6rem] ${
                      on ? 'translate-x-1 text-navy' : 'text-ink-soft group-hover:text-navy'
                    }`}
                  >
                    {t.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="md:col-span-7 md:pl-6" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            >
              <p className="eyebrow mb-4 text-gold-ink">Topic · {active.title}</p>
              <p className="display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] text-navy">{active.blurb}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
