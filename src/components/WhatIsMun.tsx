import { Reveal } from './Reveal';
import { WorldMap } from './WorldMap';

const POINTS = [
  ['Take a role.', 'Each delegate represents a country in a committee and argues from that country’s point of view.'],
  ['Debate the issue.', 'Committees discuss real global questions, from security to development, following formal rules of procedure.'],
  ['Write the answer.', 'Delegates negotiate with one another and draft resolutions that the committee votes on.'],
];

export function WhatIsMun() {
  return (
    <section id="about" className="relative bg-paper py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5 flex items-center gap-3 text-gold-ink">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                What is MUN?
              </p>
              <h2 className="display text-[clamp(2.6rem,6.4vw,5.5rem)] font-light">
                One World.
                <br />
                <span className="italic text-blue">Many Perspectives.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-4">
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-ink-soft">
                Model United Nations is a simulation of the United Nations. Students take the place of diplomats,
                research a country they may never have visited and work through the questions world leaders actually
                face. No experience is needed to start. You learn by taking part.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-14 grid gap-8 border-t border-rule pt-8 sm:grid-cols-3 sm:gap-10">
          {POINTS.map(([t, d], i) => (
            <div key={t}>
              <p className="eyebrow mb-3 text-gold-ink">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="display text-2xl font-medium">{t}</h3>
              <p className="mt-2 text-ink-soft">{d}</p>
            </div>
          ))}
        </Reveal>

        <div className="mt-20 sm:mt-24">
          <Reveal>
            <h3 className="display mb-8 max-w-2xl text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15]">
              Five themes MUN debates keep coming back to. Select one on the map.
            </h3>
          </Reveal>
          <WorldMap />
        </div>
      </div>
    </section>
  );
}
