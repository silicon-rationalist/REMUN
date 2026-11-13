import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { TeamMember } from '../../data/team';
import { getParentMember, TEAM_MEMBERS } from '../../data/team';

interface ProfileModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectMember: (member: TeamMember) => void;
}

function InstagramIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function ProfileModal({ member, isOpen, onClose, onSelectMember }: ProfileModalProps) {
  // Lock background scroll when modal is active
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!member) return null;

  const parent = getParentMember(member);
  const initials = member.name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const isExecutive = member.isLeadership || member.designation.includes('Secretary General');

  // Navigation between members
  const currentIndex = TEAM_MEMBERS.findIndex((m) => m.id === member.id);
  const prevMember = currentIndex > 0 ? TEAM_MEMBERS[currentIndex - 1] : TEAM_MEMBERS[TEAM_MEMBERS.length - 1];
  const nextMember = currentIndex < TEAM_MEMBERS.length - 1 ? TEAM_MEMBERS[currentIndex + 1] : TEAM_MEMBERS[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-modal-name"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop with restrained dimming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07122b]/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-gold/40 bg-navy-deep text-ivory shadow-2xl max-h-[92vh] flex flex-col my-auto"
          >
            {/* Top Hairline Rule */}
            <div className="h-1 w-full bg-gold" />

            {/* Header controls bar */}
            <div className="flex items-center justify-between border-b border-rule/60 bg-navy/80 px-5 py-3 sm:px-7 sm:py-3.5">
              <div className="flex items-center gap-3">
                <span className="eyebrow !text-[0.62rem] sm:!text-[0.68rem] tracking-widest text-gold font-mono">
                  RNS MUN 2026 &bull; OFFICIAL CREDENTIALS
                </span>
                <span className="hidden sm:inline-block h-3 w-px bg-white/20" />
                <span className="hidden sm:inline-block text-xs text-ivory/50 font-mono">
                  REF-{member.id.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Previous / Next Roster Navigation */}
                <button
                  type="button"
                  onClick={() => onSelectMember(prevMember)}
                  title={`Previous: ${prevMember.name}`}
                  aria-label="Previous team member"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectMember(nextMember)}
                  title={`Next: ${nextMember.name}`}
                  aria-label="Next team member"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close profile popup"
                  className="ml-1 sm:ml-2 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-ivory/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable Body Content */}
            <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 space-y-6">
              {/* Profile Overview: Prominent Portrait + Header Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-rule/60 items-start">
                {/* Prominent Photograph / Monogram Column */}
                <div className="md:col-span-5 flex flex-col items-center sm:items-start">
                  <div
                    className={`relative w-full max-w-[240px] aspect-[4/5] rounded-xl overflow-hidden border ${
                      isExecutive
                        ? 'border-gold bg-navy'
                        : member.isHead
                          ? 'border-[#7ba0d4] bg-navy'
                          : 'border-white/20 bg-navy'
                    } flex items-center justify-center`}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={`Official portrait of ${member.name}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-6 h-full w-full bg-gradient-to-b from-navy to-[#07122b]">
                        <span className="display text-4xl sm:text-5xl font-light text-gold tracking-wide">
                          {initials}
                        </span>
                        <div className="mt-4 pt-4 border-t border-rule w-3/4 text-center">
                          <span className="eyebrow !text-[0.58rem] text-ivory/50">
                            RNS MUN 2026
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {member.tenure && (
                    <div className="mt-3 text-xs font-mono text-ivory/50 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      <span>{member.tenure}</span>
                    </div>
                  )}
                </div>

                {/* Identity & Core Designation Details */}
                <div className="md:col-span-7 flex flex-col justify-start">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded text-[0.7rem] font-mono uppercase tracking-wider font-semibold border ${
                        isExecutive
                          ? 'border-gold/50 bg-gold/10 text-gold-light'
                          : member.isHead
                            ? 'border-[#7ba0d4]/50 bg-blue/10 text-[#b9ccee]'
                            : 'border-white/20 bg-white/5 text-ivory/80'
                      }`}
                    >
                      {isExecutive ? 'Executive Secretariat' : member.isHead ? 'Department Head' : 'Committee Member'}
                    </span>

                    <span className="text-xs text-ivory/40 font-mono">
                      {member.department}
                    </span>
                  </div>

                  <h3
                    id="profile-modal-name"
                    className="display text-2xl sm:text-4xl font-normal text-ivory tracking-tight leading-tight mt-1"
                  >
                    {member.name}
                  </h3>

                  <p className="mt-1 text-base sm:text-lg font-medium text-gold-light">
                    {member.designation}
                  </p>

                  {/* Reporting Relationship Card */}
                  <div className="mt-5 rounded-xl border border-rule/60 bg-navy/60 p-4">
                    <span className="eyebrow !text-[0.6rem] text-gold block mb-1.5">
                      Organizational Reporting Line
                    </span>
                    {parent ? (
                      <button
                        type="button"
                        onClick={() => onSelectMember(parent)}
                        className="text-left group flex items-center justify-between w-full rounded hover:bg-white/5 p-1 -m-1 transition-colors"
                      >
                        <div>
                          <div className="text-sm font-semibold text-ivory group-hover:text-gold transition-colors">
                            {parent.name}
                          </div>
                          <div className="text-xs text-ivory/60">{parent.designation}</div>
                        </div>
                        <span className="text-xs text-gold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-medium">
                          <span>View Leader</span>
                          <span aria-hidden="true">&rarr;</span>
                        </span>
                      </button>
                    ) : (
                      <div className="text-xs text-ivory/80 font-medium">
                        Apex Presiding Officer &bull; Level 01 Leadership
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Responsibilities & Stewardship */}
              <div className="space-y-3">
                <h4 className="eyebrow !text-xs text-gold tracking-wider">
                  Mandate &amp; Responsibilities
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-ivory/80">
                  {member.roleDescription || member.bio || 'Responsible for conference oversight and institutional diplomacy.'}
                </p>
                {member.bio && member.roleDescription && (
                  <p className="text-xs sm:text-sm leading-relaxed text-ivory/60 italic border-l border-gold/50 pl-3.5 my-2">
                    &ldquo;{member.bio}&rdquo;
                  </p>
                )}
              </div>

              {/* Verified Contact & Social Channels */}
              <div className="pt-4 border-t border-rule/60">
                <h4 className="eyebrow !text-[0.68rem] text-ivory/50 tracking-wider mb-3">
                  Official Channels &amp; Verification
                </h4>

                <div className="flex flex-wrap items-center gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-rule/80 bg-navy/80 px-3.5 py-2 text-xs font-medium text-ivory/90 transition-all hover:border-gold hover:text-gold"
                    >
                      <LinkedinIcon size={15} />
                      <span>LinkedIn</span>
                      <ExternalLink size={12} className="opacity-50" />
                    </a>
                  )}

                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-rule/80 bg-navy/80 px-3.5 py-2 text-xs font-medium text-ivory/90 transition-all hover:border-gold hover:text-gold"
                    >
                      <InstagramIcon size={15} />
                      <span>Instagram</span>
                      <ExternalLink size={12} className="opacity-50" />
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-rule/80 bg-navy/80 px-3.5 py-2 text-xs font-medium text-ivory/90 transition-all hover:border-gold hover:text-gold"
                    >
                      <Mail size={15} />
                      <span>{member.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Footer with institutional seal notice */}
            <div className="bg-navy px-5 py-3 border-t border-rule/60 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center text-[0.65rem] text-ivory/40">
              <span>RNS Model United Nations 2026 &bull; Secretariat Directory</span>
              <span className="mt-1 sm:mt-0 font-mono">Status: Verified Official</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
