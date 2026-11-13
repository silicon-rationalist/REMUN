import { EVENT } from '../data/content';
import { CountUp } from './CountUp';
import { Reveal } from './Reveal';

export function WhyRns() {
  return (
    <section id="why" className="bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3 text-gold-ink">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Why RNS MUN?
          </p>
          <h2 className="display max-w-5xl text-[clamp(2.4rem,6vw,5.25rem)] font-light">
            A Platform for the Next Generation of <span className="italic text-blue">Diplomats.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 border-t border-rule pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-16">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow mb-3 text-ink-soft">Prize pool</p>
            <p className="display text-[clamp(3.2rem,12vw,10rem)] font-light leading-[0.95] tracking-[-0.035em] text-navy">
              <CountUp value={EVENT.prizePoolValue} prefix="₹" suffix="+" />
            </p>
            <p className="mt-5 max-w-md text-ink-soft">
              The prize pool listed for the 2026 conference, as shown on the current RNS MUN website.
            </p>
          </Reveal>

          <div className="grid content-start gap-10 lg:col-span-4 lg:pt-8">
            <Reveal delay={120}>
              <p className="eyebrow mb-2 text-ink-soft">Conference days</p>
              <p className="display text-[clamp(3rem,6vw,5rem)] font-light leading-none">
                <CountUp value={EVENT.durationDays} />
              </p>
              <p className="mt-2 text-ink-soft">{EVENT.dateLabel}</p>
            </Reveal>
            <Reveal delay={220} className="border-t border-rule pt-8">
              <p className="eyebrow mb-2 text-ink-soft">Host city</p>
              <p className="display text-[clamp(2rem,3.4vw,2.8rem)] font-light leading-none">{EVENT.city}</p>
              <p className="mt-2 text-ink-soft">India</p>
            </Reveal>
          </div>
        </div>

        {/* TODO(organizers): committee count, delegate count and participating institutions are unverified. */}
        <p className="mt-14 max-w-xl border-l-2 border-gold pl-4 text-sm text-ink-soft">
          Prototype note: committee, delegate and institution figures will be added here once the organizers confirm them.
        </p>
      </div>
    </section>
  );
}
