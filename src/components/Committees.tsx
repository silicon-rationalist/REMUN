import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Globe, Shield, Scale, Landmark, Building2 } from 'lucide-react';
import { COMMITTEES } from '../data/committees';
import { Reveal } from './Reveal';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  globe: Globe,
  shield: Shield,
  scale: Scale,
  landmark: Landmark,
  'building-2': Building2,
};

export function Committees() {
  const [activeId, setActiveId] = useState(COMMITTEES[0].id);
  const active = COMMITTEES.find((c) => c.id === activeId)!;
  const ActiveIcon = ICON_MAP[active.icon] ?? Globe;

  return (
    <section id="committees" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3 text-gold-ink">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Committees
          </p>
          <h2 className="display text-[clamp(2.6rem,6.4vw,5.5rem)] font-light">
            Where the World{' '}
            <span className="italic text-blue">Comes Together.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 border-t border-rule pt-12 lg:grid-cols-12 lg:gap-0">
          {/* Tab list */}
          <div
            role="tablist"
            aria-label="Committees"
            className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-x-visible lg:border-r lg:border-rule lg:pb-0 lg:pr-10"
          >
            {COMMITTEES.map((c) => {
              const Icon = ICON_MAP[c.icon] ?? Globe;
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  id={`tab-${c.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${c.id}`}
                  onClick={() => setActiveId(c.id)}
                  className={`group flex shrink-0 items-center gap-3 border-l-2 py-4 pl-4 pr-6 text-left transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue lg:w-full ${
                    isActive
                      ? 'border-gold bg-paper-deep'
                      : 'border-transparent hover:border-blue/30 hover:bg-paper-deep/60'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors duration-200 ${isActive ? 'text-gold' : 'text-ink-soft group-hover:text-blue'}`}
                    aria-hidden
                  />
                  <span
                    className={`eyebrow !text-xs transition-colors duration-200 ${isActive ? 'text-navy' : 'text-ink-soft group-hover:text-navy'}`}
                  >
                    {c.shortName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            className="relative lg:col-span-8 lg:pl-12"
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                id={`panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="relative overflow-hidden"
              >
                {/* Watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -top-6 select-none font-serif text-[8rem] font-light leading-none text-blue/5 sm:text-[12rem]"
                >
                  {active.shortName}
                </span>

                <div className="relative">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="inline-flex items-center rounded-full bg-navy px-3 py-1 text-xs font-medium text-ivory">
                      {active.shortName}
                    </span>
                    <ActiveIcon className="h-5 w-5 text-gold" aria-hidden />
                  </div>

                  <h3 className="display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-tight text-navy">
                    {active.name}
                  </h3>

                  <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft">
                    {active.description}
                  </p>

                  <div className="mt-8 border-t border-rule pt-6">
                    <p className="eyebrow mb-2 text-gold-ink">Agenda</p>
                    <p className="text-base text-ink-soft">
                      {active.agenda === 'To be confirmed' ? (
                        <>
                          <span className="italic text-ink-soft">To be confirmed</span>
                          {/* TODO(organizers): Replace with the actual agenda topic for each committee. */}
                        </>
                      ) : (
                        active.agenda
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
