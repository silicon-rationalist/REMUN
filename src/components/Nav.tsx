import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NAV } from '../data/content';
import { SiteLink } from './SiteLink';
import { Wordmark } from './Wordmark';

const SECTION_IDS = [
  'home',
  'about',
  'why',
  'experience',
  'committees',
  'event',
  'registration',
  'venue',
  'team',
  'contact',
];

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto max-w-6xl rounded-[1.75rem] border transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || open
            ? `border-rule ${open ? 'bg-paper' : 'bg-paper/80'} shadow-[0_8px_30px_-18px_rgba(10,26,58,0.35)] backdrop-blur-md`
            : 'border-transparent bg-paper/40 backdrop-blur-[6px]'
        }`}
      >
        <nav aria-label="Primary" className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <SiteLink to="home" aria-label="RNS MUN 2026, home" className="rounded-md">
            <Wordmark />
          </SiteLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const isActive = item.spy?.includes(active);
              return (
                <li key={item.id}>
                  <SiteLink
                    to={item.id}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-200 ${
                      isActive ? 'text-navy' : 'text-ink-soft hover:text-navy'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ease-out-quart ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </SiteLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <SiteLink to="registration" className="btn btn-primary hidden !min-h-10 !px-5 !text-sm sm:inline-flex">
              Register Now
            </SiteLink>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full text-navy transition-colors duration-200 hover:bg-navy/5 active:scale-95 lg:hidden"
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="border-t border-rule px-5 pb-5 pt-3">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    className="border-b border-rule last:border-0"
                  >
                    <SiteLink
                      to={item.id}
                      onNavigate={closeMenu}
                      aria-current={item.spy?.includes(active) ? 'location' : undefined}
                      className="display flex items-center justify-between py-3.5 text-2xl"
                    >
                      <span className={item.spy?.includes(active) ? 'text-blue' : ''}>{item.label}</span>
                      <span className="eyebrow !text-[0.65rem] text-ink-soft">{String(i + 1).padStart(2, '0')}</span>
                    </SiteLink>
                  </motion.li>
                ))}
                <li className="pt-4 sm:hidden">
                  <SiteLink to="registration" onNavigate={closeMenu} className="btn btn-primary w-full">
                    Register Now
                  </SiteLink>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
