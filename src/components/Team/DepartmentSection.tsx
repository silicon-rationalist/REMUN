import { Users, CornerDownRight } from 'lucide-react';
import type { DepartmentInfo, TeamMember } from '../../data/team';
import { MemberCard } from './MemberCard';

interface DepartmentSectionProps {
  department: DepartmentInfo;
  head?: TeamMember;
  members: TeamMember[];
  index: number;
  onSelectMember?: (member: TeamMember) => void;
}

export function DepartmentSection({
  department,
  head,
  members,
  index,
  onSelectMember,
}: DepartmentSectionProps) {
  const indexStr = String(index + 1).padStart(2, '0');

  return (
    <section
      id={`dept-${department.id}`}
      aria-labelledby={`dept-heading-${department.id}`}
      className="relative rounded-2xl border border-rule/70 bg-navy p-6 sm:p-8"
    >
      {/* Department Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-rule/60">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="eyebrow !text-xs font-mono text-gold">{indexStr}</span>
            <span className="h-px w-6 bg-gold/40" aria-hidden="true" />
            <span className="eyebrow !text-xs tracking-widest text-[#b9ccee]">Department</span>
          </div>

          <h3 id={`dept-heading-${department.id}`} className="display text-2xl sm:text-3xl text-ivory">
            {department.name}
          </h3>

          {department.description && (
            <p className="mt-2 text-sm leading-relaxed text-ivory/70">
              {department.description}
            </p>
          )}
        </div>

        {/* Member count pill */}
        <div className="flex items-center gap-2 self-start md:self-auto rounded border border-rule/80 bg-navy-deep/60 px-3 py-1 text-xs text-ivory/70 font-mono">
          <Users size={13} className="text-gold" aria-hidden="true" />
          <span>
            {1 + members.length} {1 + members.length === 1 ? 'official' : 'officials'}
          </span>
        </div>
      </div>

      {/* Department Hierarchy Layout */}
      <div className="mt-6 space-y-6">
        {/* Department Head Spotlight */}
        {head && (
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-medium text-gold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="eyebrow !text-[0.65rem] tracking-wider uppercase">Department Leadership</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-sm sm:max-w-none">
              <MemberCard
                member={head}
                featured={false}
                className="w-full sm:max-w-xs"
                onSelect={onSelectMember}
              />
            </div>
          </div>
        )}

        {/* Department Members Grid */}
        {members.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-3 text-xs font-medium text-ivory/50">
              <CornerDownRight size={13} className="text-gold" aria-hidden="true" />
              <span className="eyebrow !text-[0.65rem] tracking-wider uppercase text-ivory/60">
                Department Members · Lineage to {head ? head.name : 'Department Head'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onSelect={onSelectMember}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
