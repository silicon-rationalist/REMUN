import { ArrowRight } from 'lucide-react';
import { EVENT } from '../data/content';
import { Reveal } from './Reveal';
import { SiteLink } from './SiteLink';
import { Stamp } from './Stamp';

// TODO(organizers): venue name/address, schedule and committee list are unverified, so they are shown as pending.
const DETAILS: { k: string; v: string; pending?: boolean }[] = [
  { k: 'Dates', v: EVENT.dateLabel },
  { k: 'Location', v: EVENT.location },
  { k: 'Venue', v: 'To be confirmed', pending: true },
  { k: 'Schedule', v: 'To be confirmed', pending: true },
  { k: 'Committees', v: 'To be confirmed', pending: true },
];

export function EventSection() {
  return (
    <section id="event" className="relative overflow-hidden bg-paper-deep py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3 text-gold-ink">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              {EVENT.name}
            </p>
            <h2 className="display text-[clamp(2.6rem,6.2vw,5.5rem)] font-light">
              Two Days.
              <br />
              <span className="italic text-blue">A World of Possibilities.</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <dl className="mt-12 max-w-xl">
              {DETAILS.map(({ k, v, pending }) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-t border-rule py-4 last:border-b sm:grid-cols-[9rem_1fr]">
                  <dt className="eyebrow !text-[0.7rem] text-ink-soft">{k}</dt>
                  <dd className={pending ? 'text-ink-soft italic' : 'display text-xl font-medium sm:text-2xl'}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <SiteLink to="registration" className="btn btn-primary">
                Registration
                <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
              </SiteLink>
              <p className="text-sm text-ink-soft">Venue and schedule details will be published here once confirmed.</p>
            </div>
          </Reveal>
        </div>

        <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] border border-rule" />
            <div className="relative grid h-72 w-72 place-items-center rounded-[1.5rem] bg-ivory sm:h-80 sm:w-80">
              <Stamp className="h-60 w-60 sm:h-64 sm:w-64" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
