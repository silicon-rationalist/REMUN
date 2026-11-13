import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CHAPTERS } from '../data/content';
import { Reveal } from './Reveal';
import { useInView } from '../hooks/useInView';

/** Line-art motifs: drawn once when their chapter enters view. No imagery, no stock. */
function Motif({ index, drawn }: { index: number; drawn: boolean }) {
  const common = { pathLength: 1, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const shapes: ReactNode[] = [
    // Represent: a country placard
    <g key="a">
      <rect x="18" y="18" width="84" height="52" rx="3" {...common} />
      <path d="M32 38h56M32 50h36" {...common} />
      <path d="M60 70v38M44 108h32" {...common} />
      <circle cx="60" cy="14" r="3" {...common} className="gold" />
    </g>,
    // Debate: two voices
    <g key="b">
      <path d="M14 22h58a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H40l-14 12V60H14a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6Z" {...common} />
      <path d="M52 76h38l12 12V76h6a6 6 0 0 0 6-6V48" {...common} className="gold" />
      <path d="M24 36h40M24 46h24" {...common} />
    </g>,
    // Negotiate: overlapping positions
    <g key="c">
      <circle cx="44" cy="60" r="30" {...common} />
      <circle cx="76" cy="60" r="30" {...common} />
      <path d="M60 36.5a30 30 0 0 1 0 47" {...common} className="gold" />
    </g>,
    // Resolve: a signed document
    <g key="d">
      <path d="M30 12h46l18 18v78H30Z" {...common} />
      <path d="M76 12v18h18" {...common} />
      <path d="M42 46h40M42 58h40M42 70h24" {...common} />
      <circle cx="74" cy="92" r="11" {...common} className="gold" />
      <path d="m68.5 92 4 4 7-8" {...common} className="gold" />
    </g>,
  ];
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={`motif h-24 w-24 sm:h-28 sm:w-28 ${drawn ? 'is-drawn' : ''}`}
    >
      {shapes[index]}
    </svg>
  );
}

function ChapterArticle({
  i,
  chapter,
  setRef,
}: {
  i: number;
  chapter: (typeof CHAPTERS)[number];
  setRef: (el: HTMLElement | null) => void;
}) {
  const [ref, drawn] = useInView<HTMLDivElement>({ threshold: 0.35 });
  return (
    <article
      id={`chapter-${i + 1}`}
      ref={setRef}
      aria-labelledby={`chapter-${i + 1}-title`}
      className="flex flex-col justify-center border-t border-rule py-14 first:border-t-0 first:pt-0 lg:min-h-[78vh] lg:py-20"
    >
      <div ref={ref}>
        <div className="mb-8 flex items-end justify-between gap-6">
          <Motif index={i} drawn={drawn} />
          <span className="display text-[4.5rem] font-light leading-none text-blue/25 sm:text-[6rem]" aria-hidden="true">
            {chapter.n}
          </span>
        </div>
        <h3
          id={`chapter-${i + 1}-title`}
          className="display text-[clamp(3.2rem,8.5vw,7rem)] font-light italic leading-[0.95] text-navy"
        >
          {chapter.word}
        </h3>
        <p className="display mt-6 text-[clamp(1.35rem,2.2vw,1.9rem)] leading-snug text-blue">{chapter.lead}</p>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">{chapter.body}</p>
      </div>
    </article>
  );
}

export function Experience() {
  const [active, setActive] = useState(0);
  const els = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.current.indexOf(e.target as HTMLElement));
        });
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    els.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" className="bg-paper py-24 sm:py-32">
      <style>{`
        .motif path,.motif circle,.motif rect{stroke:#1e4fa3;stroke-width:1.6;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.3s var(--ease-out-quart)}
        .motif .gold{stroke:#a98a4e}
        .motif.is-drawn path,.motif.is-drawn circle,.motif.is-drawn rect{stroke-dashoffset:0}
        @media (prefers-reduced-motion:reduce){.motif path,.motif circle,.motif rect{stroke-dashoffset:0;transition:none}}
      `}</style>
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 className="eyebrow mb-6 flex items-center gap-3 text-gold-ink">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                The Delegate Experience
              </h2>
              <p className="display max-w-md text-[clamp(1.8rem,3vw,2.5rem)] leading-tight">
                Four verbs describe two days in committee.
              </p>
            </Reveal>

            <ol className="mt-10 hidden lg:block" aria-label="Chapters">
              {CHAPTERS.map((c, i) => (
                <li key={c.n}>
                  <a
                    href={`#chapter-${i + 1}`}
                    aria-current={active === i ? 'true' : undefined}
                    className="group flex items-center gap-5 border-t border-rule py-4 last:border-b"
                  >
                    <span className={`eyebrow !text-[0.7rem] transition-colors duration-300 ${active === i ? 'text-gold-ink' : 'text-ink-soft'}`}>
                      {c.n}
                    </span>
                    <span
                      className={`display text-3xl transition-[transform,color] duration-300 ease-out-quart ${
                        active === i ? 'translate-x-2 text-navy' : 'text-ink-soft group-hover:text-navy'
                      }`}
                    >
                      {c.word}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto h-px bg-gold transition-[width] duration-500 ease-out-quart ${active === i ? 'w-10' : 'w-0'}`}
                    />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lg:col-span-7">
          {CHAPTERS.map((c, i) => (
            <ChapterArticle key={c.n} i={i} chapter={c} setRef={(el) => (els.current[i] = el)} />
          ))}
        </div>
      </div>
    </section>
  );
}
