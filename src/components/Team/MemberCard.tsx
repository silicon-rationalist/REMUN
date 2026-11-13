import { useState } from 'react';
import { Mail } from 'lucide-react';
import type { TeamMember } from '../../data/team';

function InstagramIcon({ size = 15, className = '' }: { size?: number; className?: string }) {
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

function LinkedinIcon({ size = 15, className = '' }: { size?: number; className?: string }) {
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

interface MemberCardProps {
  member: TeamMember;
  featured?: boolean;
  priority?: boolean;
  className?: string;
  onSelect?: (member: TeamMember) => void;
}

export function MemberCard({ member, featured = false, className = '', onSelect }: MemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasPhoto = Boolean(member.image) && !imageError;

  const initials = member.name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const isExecutive = member.isLeadership || member.designation.includes('Secretary General');

  return (
    <article
      onClick={() => onSelect?.(member)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border transition-all duration-200 ${
        onSelect ? 'cursor-pointer' : ''
      } ${
        featured
          ? 'border-gold/50 bg-navy'
          : member.isHead
            ? 'border-[#7ba0d4]/40 bg-navy'
            : 'border-rule/70 bg-navy/90 hover:border-gold/40'
      } ${className}`}
    >
      {/* Top Media Container with 4:5 aspect ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#07122b]">
        {hasPhoto ? (
          <img
            src={member.image}
            alt={`Portrait of ${member.name}, ${member.designation}`}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-102"
          />
        ) : (
          /* Editorial Placeholder */
          <div
            className="relative flex h-full w-full flex-col items-center justify-between p-5 text-center select-none"
            aria-label={`Photo placeholder for ${member.name}`}
          >
            {/* Department tag badge */}
            <div className="relative z-10 flex w-full justify-between items-center text-[0.65rem] tracking-wider uppercase">
              <span className="eyebrow !text-[0.6rem] text-gold font-mono">
                {member.department.slice(0, 4).toUpperCase()}
              </span>
              {isExecutive ? (
                <span className="font-semibold text-gold font-mono text-[0.6rem]">Executive</span>
              ) : member.isHead ? (
                <span className="font-semibold text-[#b9ccee] font-mono text-[0.6rem]">Head</span>
              ) : (
                <span className="text-ivory/40 font-mono text-[0.6rem]">Member</span>
              )}
            </div>

            {/* Monogram emblem */}
            <div className="relative z-10 my-auto flex flex-col items-center">
              <div
                className={`relative flex h-18 w-18 items-center justify-center rounded-full border ${
                  isExecutive
                    ? 'border-gold/60 bg-gold/10 text-gold-light'
                    : member.isHead
                      ? 'border-[#7ba0d4]/50 bg-blue/10 text-[#b9ccee]'
                      : 'border-white/20 bg-white/5 text-ivory/70'
                }`}
              >
                <span className="display text-2xl font-normal tracking-wider">{initials}</span>
              </div>
              <span className="mt-2 text-[0.65rem] uppercase tracking-widest text-ivory/40 font-mono">
                Official Portrait Pending
              </span>
            </div>

            {/* Bottom watermark */}
            <div className="relative z-10 w-full text-center">
              <span className="eyebrow !text-[0.55rem] text-ivory/30">RNS MUN 2026</span>
            </div>
          </div>
        )}

        {/* Floating Role Badge */}
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          {isExecutive && (
            <span className="inline-flex items-center gap-1 rounded border border-gold/40 bg-navy/90 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-gold-light">
              Secretariat
            </span>
          )}
          {member.isHead && !isExecutive && (
            <span className="inline-flex items-center gap-1 rounded border border-[#7ba0d4]/40 bg-navy/90 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-[#b9ccee]">
              Department Head
            </span>
          )}
        </div>
      </div>

      {/* Card Content Information */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 text-left">
        <div>
          {/* Department eyebrow */}
          <p className="eyebrow !text-[0.62rem] text-gold mb-1 flex items-center justify-between">
            <span>{member.department}</span>
            {member.parentId && (
              <span className="text-[0.6rem] text-ivory/40 normal-case tracking-normal">
                Reports to: {member.parentId.toUpperCase()}
              </span>
            )}
          </p>

          {/* Full Name */}
          <h3
            className={`display font-normal text-ivory transition-colors duration-200 group-hover:text-gold-light ${
              featured ? 'text-2xl' : 'text-lg sm:text-xl'
            }`}
          >
            {member.name}
          </h3>

          {/* Designation */}
          <p
            className={`mt-1 font-sans text-xs sm:text-sm font-medium ${
              isExecutive ? 'text-gold-light' : member.isHead ? 'text-[#b9ccee]' : 'text-ivory/70'
            }`}
          >
            {member.designation}
          </p>

          {/* Bio if available */}
          {member.bio && (
            <p className="mt-2.5 text-xs leading-relaxed text-ivory/60 line-clamp-2">
              {member.bio}
            </p>
          )}
        </div>

        {/* Social Links Row */}
        <div className="mt-4 pt-3 border-t border-rule/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5" aria-label={`Social links for ${member.name}`}>
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${member.name} on Instagram (opens in new tab)`}
                className="flex h-8 w-8 items-center justify-center rounded border border-rule/80 bg-navy-deep/60 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                <InstagramIcon size={14} />
              </a>
            )}

            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${member.name} on LinkedIn (opens in new tab)`}
                className="flex h-8 w-8 items-center justify-center rounded border border-rule/80 bg-navy-deep/60 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                <LinkedinIcon size={14} />
              </a>
            )}

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Email ${member.name}`}
                className="flex h-8 w-8 items-center justify-center rounded border border-rule/80 bg-navy-deep/60 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Mail size={14} aria-hidden="true" />
              </a>
            )}
          </div>

          <span className="text-[0.62rem] tracking-wider uppercase text-ivory/30 font-mono">
            REF-{member.id.toUpperCase()}
          </span>
        </div>
      </div>
    </article>
  );
}
