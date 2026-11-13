import { Reveal } from '../Reveal';
import { TreeCanvas } from './TreeCanvas';

export function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative bg-navy-deep py-24 sm:py-32 text-ivory border-t border-rule/50"
    >
      <div className="container-x relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="eyebrow mb-4 flex items-center gap-3 text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              The Secretariat &amp; Organizing Body
            </p>
            <h2
              id="team-heading"
              className="display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-ivory"
            >
              The <span className="italic text-[#b9ccee]">Leadership</span> &amp; Governance.
            </h2>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-ivory/70 font-sans">
              RNS MUN 2026 is stewarded by an organized student collegiate dedicated to diplomatic
              rigor, impartial debate, and institutional excellence. Explore the organizational hierarchy
              and discover the leaders presiding over each wing.
            </p>
          </div>
        </Reveal>

        {/* ─── INTERACTIVE ORGANISATIONAL TREE ─── */}
        <Reveal delay={100}>
          <TreeCanvas />
        </Reveal>
      </div>
    </section>
  );
}

export { TreeCanvas } from './TreeCanvas';
export { TreeNode } from './TreeNode';
export { ProfileModal } from './ProfileModal';
