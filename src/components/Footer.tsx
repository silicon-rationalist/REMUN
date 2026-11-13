import { Share2, Globe, Link } from 'lucide-react';
import { EVENT, NAV } from '../data/content';
import { SiteLink } from './SiteLink';
import { Wordmark } from './Wordmark';

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Committees', href: '#committees' },
  { label: 'Registration', href: '#registration' },
  { label: 'Venue', href: '#venue' },
  { label: 'Team', href: '#team' },
];

export function Footer() {
  return (
    <footer id="contact" className="on-dark border-t border-white/10 bg-navy-deep text-ivory">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Wordmark tone="light" />
          <p className="display mt-4 text-2xl italic text-[#b9ccee]">{EVENT.tagline}</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#aeb9d1]">
            {EVENT.organization} · {EVENT.institution}
            <br />
            {EVENT.dateLabel} · {EVENT.location}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="md:col-span-2">
          <p className="eyebrow mb-4 text-gold-light">Navigate</p>
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <SiteLink to={n.id} className="link-rule inline-block py-1.5 text-[0.95rem] text-[#dbe3f3]">
                  {n.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Quick links" className="md:col-span-2">
          <p className="eyebrow mb-4 text-gold-light">Quick Links</p>
          <ul className="space-y-1">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-rule inline-block py-1.5 text-[0.95rem] text-[#dbe3f3]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-4 text-gold-light">Contact</p>
          {/* TODO(organizers): official email, phone and social links. None were supplied, none are invented. */}
          <p className="text-sm leading-relaxed text-[#aeb9d1]">
            Official contact details will be listed here once confirmed by the organizers.
          </p>

          <div className="mt-6">
            <p className="eyebrow mb-3 text-gold-light">Follow Us</p>
            {/* TODO(organizers): Replace '#' with actual social media URLs */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-[#dbe3f3] transition-colors duration-200 hover:border-gold-light hover:text-gold-light"
              >
                <Share2 size={16} aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-[#dbe3f3] transition-colors duration-200 hover:border-gold-light hover:text-gold-light"
              >
                <Globe size={16} aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-[#dbe3f3] transition-colors duration-200 hover:border-gold-light hover:text-gold-light"
              >
                <Link size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-[#93a0bd] sm:flex-row sm:items-center sm:justify-between">
          <p>© {EVENT.year} {EVENT.name}</p>
          <SiteLink to="equity" className="link-rule inline-block w-fit text-[#dbe3f3]">
            Equity Policy
          </SiteLink>
        </div>
      </div>
    </footer>
  );
}
