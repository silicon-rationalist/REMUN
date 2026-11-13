import { ArrowRight } from 'lucide-react';
import { EVENT } from '../data/content';
import { Globe } from './Globe';
import { Reveal } from './Reveal';
import { SiteLink } from './SiteLink';

export function ClosingCta() {
  return (
    <section id="register" className="on-dark relative overflow-hidden bg-navy-deep py-28 text-ivory sm:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[18%] top-1/2 w-[min(120vw,60rem)] -translate-y-1/2 opacity-[0.32]">
        <Globe tone="navy" still startLon={78} className="block h-auto w-full" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,#07122b_28%,rgba(7,18,43,0.55)_70%,rgba(7,18,43,0.25))]" />

      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold-light">
            <span aria-hidden="true" className="h-px w-8 bg-gold-light" />
            {EVENT.name} · {EVENT.dateLabel}
          </p>
          <h2 className="display max-w-4xl text-[clamp(2.8rem,7.4vw,6.5rem)] font-light text-ivory">
            The World Is Waiting for <span className="italic text-[#b9ccee]">Your Voice.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-lg text-lg text-[#c3cde2]">
            Take a seat, find your country and join the conversation in {EVENT.city}.
          </p>
          <div className="mt-10">
            <SiteLink to="registration" className="btn btn-light !min-h-14 !px-8 !text-base">
              Register Now
              <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
            </SiteLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
