import { useState } from 'react';
import type { TeamMember } from '../../data/team';

interface TreeNodeProps {
  member: TeamMember;
  variant?: 'apex' | 'executive' | 'head' | 'member';
  isSelected?: boolean;
  isHighlighted?: boolean;
  onSelect: (member: TeamMember) => void;
  onHover?: (memberId: string | null) => void;
}

export function TreeNode({
  member,
  variant = 'member',
  isSelected = false,
  isHighlighted = false,
  onSelect,
  onHover,
}: TreeNodeProps) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = Boolean(member.image) && !imgError;

  const initials = member.name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const isApex = variant === 'apex';
  const isExecutive = variant === 'executive' || isApex;
  const isHead = variant === 'head';

  // Dimension classes based on hierarchy tier
  const avatarSizeClasses = isApex
    ? 'h-24 w-24 sm:h-28 sm:w-28'
    : isExecutive
      ? 'h-20 w-20 sm:h-22 sm:w-22'
      : isHead
        ? 'h-16 w-16 sm:h-18 sm:w-18'
        : 'h-14 w-14 sm:h-16 sm:w-16';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(member)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(member);
        }
      }}
      onMouseEnter={() => onHover?.(member.id)}
      onMouseLeave={() => onHover?.(null)}
      aria-label={`View credentials of ${member.name}, ${member.designation}`}
      className={`group relative flex flex-col items-center text-center cursor-pointer select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep rounded-2xl p-2 ${
        isSelected
          ? 'scale-[1.03]'
          : isHighlighted
            ? 'scale-[1.02]'
            : 'hover:-translate-y-0.5'
      }`}
    >
      {/* Node Portrait Bubble Container */}
      <div className="relative flex items-center justify-center">
        {/* Outer Circular Ring with Diplomatic Hairlines */}
        <div
          className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${avatarSizeClasses} ${
            isApex
              ? 'border-2 border-gold bg-navy p-1'
              : isExecutive
                ? 'border border-gold/70 bg-navy p-1'
                : isHead
                  ? 'border border-[#7ba0d4] bg-navy p-0.5'
                  : 'border border-white/20 bg-navy/90 p-0.5'
          } ${
            isSelected
              ? '!border-gold ring-2 ring-gold/40'
              : isHighlighted
                ? '!border-gold-light ring-1 ring-gold/30'
                : 'group-hover:border-gold-light'
          }`}
        >
          {/* Inner Avatar Bubble */}
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[#07122b] flex items-center justify-center">
            {hasPhoto ? (
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              /* Diplomatic Monogram Fallback */
              <div className="flex h-full w-full flex-col items-center justify-center bg-navy text-center">
                <span
                  className={`display font-normal tracking-wider transition-colors duration-200 ${
                    isApex
                      ? 'text-2xl sm:text-3xl text-gold'
                      : isExecutive
                        ? 'text-xl sm:text-2xl text-gold-light'
                        : isHead
                          ? 'text-lg sm:text-xl text-[#b9ccee]'
                          : 'text-sm sm:text-base text-ivory/80'
                  }`}
                >
                  {initials}
                </span>
              </div>
            )}

            {/* Subtle Hover Overlay with Diplomatic "View" Cue */}
            <div className="absolute inset-0 flex items-center justify-center bg-navy/75 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="text-[0.62rem] sm:text-[0.68rem] font-medium uppercase tracking-widest text-gold-light">
                Profile
              </span>
            </div>
          </div>

          {/* Tier Pip Crest Indicator */}
          <div
            aria-hidden="true"
            className={`absolute -bottom-1 -right-1 flex items-center justify-center rounded-full border bg-navy ${
              isApex
                ? 'h-6 w-6 border-gold text-gold'
                : isExecutive
                  ? 'h-5 w-5 border-gold/60 text-gold-light'
                  : isHead
                    ? 'h-4 w-4 border-[#7ba0d4] text-[#b9ccee]'
                    : 'h-3.5 w-3.5 border-white/20 text-ivory/50'
            }`}
          >
            {isApex ? (
              <span className="text-[0.6rem] font-bold font-mono">I</span>
            ) : isExecutive ? (
              <span className="text-[0.55rem] font-bold font-mono">II</span>
            ) : isHead ? (
              <span className="text-[0.5rem] font-bold font-mono">H</span>
            ) : (
              <span className="h-1 w-1 rounded-full bg-white/40" />
            )}
          </div>
        </div>
      </div>

      {/* Node Label Details */}
      <div className="mt-2.5 max-w-[130px] sm:max-w-[155px] flex flex-col items-center">
        {/* Tier / Role Eyebrow */}
        <span
          className={`eyebrow !text-[0.6rem] sm:!text-[0.64rem] font-mono tracking-widest uppercase transition-colors ${
            isApex
              ? 'text-gold'
              : isExecutive
                ? 'text-gold-light'
                : isHead
                  ? 'text-[#b9ccee]'
                  : 'text-ivory/50'
          }`}
        >
          {isApex ? 'Secretary General' : member.isHead ? 'Dept Head' : 'Committee Member'}
        </span>

        {/* Member Name */}
        <h4
          className={`font-sans font-medium text-ivory mt-0.5 leading-snug line-clamp-1 transition-colors duration-200 group-hover:text-gold-light ${
            isApex
              ? 'text-sm sm:text-base font-semibold'
              : isExecutive
                ? 'text-xs sm:text-sm font-semibold'
                : 'text-xs sm:text-[0.82rem]'
          }`}
        >
          {member.name}
        </h4>

        {/* Designation */}
        <p className="text-[0.68rem] sm:text-[0.72rem] leading-tight text-ivory/60 line-clamp-1 mt-0.5">
          {member.designation}
        </p>
      </div>
    </div>
  );
}
