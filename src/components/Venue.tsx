import { useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Navigation, ExternalLink } from 'lucide-react';
import { Reveal } from './Reveal';

// Verified Google Maps destination URLs for RNS Institute of Technology (RNSIT), Channasandra, RR Nagar, Bengaluru
const MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=RNS+Institute+of+Technology,+Dr.+Vishnuvardhan+Road,+Channasandra,+RR+Nagar,+Bengaluru,+Karnataka+560098&destination_place_id=0x3bae3faa7127d143:0xb5b736b7617d5a57';

const MAPS_PLACE_URL =
  'https://www.google.com/maps/place/RNS+Institute+of+Technology/@12.9013959,77.5153206,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae3faa7127d143:0xb5b736b7617d5a57!8m2!3d12.9013959!4d77.5178955!16zL20vMGNsYmJj';

// Verified Google Maps embed for RNS Institute of Technology (Place ID: 0x3bae3faa7127d143:0xb5b736b7617d5a57)
const EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.399557797746!2d77.51532057507616!3d12.901395887391745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3faa7127d143%3A0xb5b736b7617d5a57!2sRNS%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin';

function LazyMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-rule bg-paper-deep sm:aspect-[16/10] lg:h-full lg:min-h-[440px]"
    >
      {shouldLoad ? (
        <>
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-paper-deep text-ink-soft">
              <MapPin className="h-6 w-6 text-gold animate-pulse" aria-hidden="true" />
              <span className="eyebrow text-xs text-ink-soft font-mono">Loading RNSIT Campus Map…</span>
            </div>
          )}
          <iframe
            src={EMBED_URL}
            title="Google Maps: RNS Institute of Technology (RNSIT) Campus, Channasandra, RR Nagar, Bengaluru"
            width="100%"
            height="100%"
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            aria-label="Google Maps showing RNS Institute of Technology, Channasandra, RR Nagar, Bengaluru"
          />
        </>
      ) : (
        /* Placeholder shown before intersection observer fires */
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-paper-deep p-6 text-center">
          <MapPin className="h-8 w-8 text-gold" aria-hidden="true" />
          <p className="font-medium text-navy">RNS Institute of Technology (RNSIT)</p>
          <p className="eyebrow text-xs text-ink-soft">Channasandra, RR Nagar, Bengaluru</p>
          <a
            href={MAPS_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs font-semibold text-blue underline-offset-4 hover:underline"
          >
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

export function Venue() {
  return (
    <section id="venue" aria-labelledby="venue-heading" className="bg-paper-deep py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3 text-gold-ink">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Conference Location
          </p>
          <h2
            id="venue-heading"
            className="display text-[clamp(2.6rem,6.4vw,5.5rem)] font-light text-navy"
          >
            Where It All <span className="italic text-blue">Happens.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 border-t border-rule pt-10 lg:grid-cols-12 lg:gap-8 items-stretch">
          {/* Venue credentials card */}
          <Reveal className="lg:col-span-5 flex">
            <div className="w-full flex flex-col justify-between rounded-2xl border border-rule bg-ivory p-7 sm:p-9 shadow-sm">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="eyebrow !text-[0.68rem] tracking-wider text-gold-ink font-mono font-semibold">
                    Academic Host &bull; Bengaluru
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/5 text-navy">
                    <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="display text-2xl sm:text-3xl font-medium text-navy leading-tight">
                  RNS Institute of Technology (RNSIT)
                </h3>
                <p className="mt-1 text-sm font-sans text-ink-soft">
                  Autonomous Institution &bull; Bengaluru Campus
                </p>

                <address className="mt-6 not-italic space-y-4 text-ink-soft border-t border-rule/70 pt-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-navy text-sm">Campus Address</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                        Dr. Vishnuvardhan Road, Channasandra,<br />
                        R.R. Nagar (Rajarajeshwari Nagar),<br />
                        Bengaluru, Karnataka – 560 098, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-ink-soft/70 font-mono">Conference Dates</p>
                      <p className="text-sm font-medium text-navy">06–07 October 2026</p>
                    </div>
                  </div>
                </address>

                <div className="mt-6 rounded-xl border border-rule/60 bg-paper/60 p-3.5 text-xs text-ink-soft leading-relaxed">
                  <span className="font-semibold text-navy">Transit Note: </span>
                  Conveniently situated in Channasandra, accessible via Rajarajeshwari Nagar Metro Station (Purple Line) and Mysore Road corridor.
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row pt-6 border-t border-rule/70">
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1 flex items-center justify-center gap-2 text-sm shadow-sm"
                  aria-label="Get directions to RNS Institute of Technology on Google Maps (opens in new tab)"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={MAPS_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary flex-1 flex items-center justify-center gap-2 text-sm"
                  aria-label="View RNS Institute of Technology campus on Google Maps (opens in new tab)"
                >
                  <span>View on Maps</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map Embed Column */}
          <Reveal delay={100} className="lg:col-span-7 flex flex-col">
            <LazyMap />
            <p className="mt-3 text-xs text-ink-soft flex items-center justify-between">
              <span>Interactive campus map of RNSIT, Channasandra, Bengaluru</span>
              <a
                href={MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:underline inline-flex items-center gap-1"
              >
                <span>Expand map</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
