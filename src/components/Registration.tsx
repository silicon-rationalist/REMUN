import { Calendar, MapPin, Award, Users, Info } from 'lucide-react';
import { EVENT } from '../data/content';
import { Reveal } from './Reveal';

interface InfoCard {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  label: string;
  value: string;
  note?: string;
}

const INFO_CARDS: InfoCard[] = [
  {
    icon: Calendar,
    label: 'Dates',
    value: EVENT.dateLabel,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: EVENT.location,
  },
  {
    icon: Award,
    label: 'Prize Pool',
    value: EVENT.prizePoolLabel,
  },
  {
    icon: Users,
    label: 'Eligibility',
    // TODO(organizers): Confirm eligibility criteria.
    value: 'Open to all college students',
    note: 'To be confirmed',
  },
  {
    icon: Info,
    label: 'Registration Fee',
    // TODO(organizers): Confirm registration fee.
    value: 'To be confirmed',
    note: 'Details coming soon',
  },
];

export function Registration() {
  return (
    <section id="registration" className="bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3 text-gold-ink">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Registration
          </p>
          <h2 className="display max-w-3xl text-[clamp(2.6rem,6.4vw,5.5rem)] font-light">
            Claim Your{' '}
            <span className="italic text-blue">Seat</span>{' '}
            at the Table.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            RNS MUN 2026 brings together delegates from across India for two days of debate,
            diplomacy, and resolution-writing. Secure your place before spots fill.
          </p>
        </Reveal>

        {/* Info grid */}
        <Reveal className="mt-16 grid gap-5 border-t border-rule pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {INFO_CARDS.map((card) => {
            const Icon = card.icon;
            const isPending = card.value === 'To be confirmed';
            return (
              <div
                key={card.label}
                className="rounded-xl border border-rule bg-paper/60 px-5 py-5 transition-shadow duration-200 hover:shadow-sm"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-navy/8">
                  <Icon className="h-4 w-4 text-navy" aria-hidden />
                </div>
                <p className="eyebrow mb-1.5 text-ink-soft">{card.label}</p>
                <p
                  className={`display text-lg font-medium leading-tight ${isPending ? 'italic text-ink-soft' : 'text-navy'}`}
                >
                  {card.value}
                </p>
                {card.note && (
                  <p className="mt-1 text-xs text-ink-soft/70">{card.note}</p>
                )}
              </div>
            );
          })}
        </Reveal>

        {/* CTA */}
        <Reveal delay={160} className="mt-14">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-rule bg-paper px-8 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-12">
            <div>
              <h3 className="display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-tight text-navy">
                Ready to represent?
              </h3>
              <p className="mt-2 text-ink-soft">
                Registration opens soon. Leave your details to be notified first.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
              {/* TODO(organizers): Replace href with the actual registration form URL when live. */}
              <a
                href="#"
                aria-disabled="true"
                onClick={(e) => e.preventDefault()}
                className="btn btn-primary cursor-not-allowed px-10 py-4 text-base opacity-70"
                aria-label="Register Now — link coming soon"
              >
                Register Now
              </a>
              <p className="text-xs text-ink-soft">
                Registration link coming soon
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-prose border-l-2 border-gold pl-4 text-sm text-ink-soft">
            Registration details will be confirmed by the organizers. All information above marked
            "to be confirmed" is subject to change.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
