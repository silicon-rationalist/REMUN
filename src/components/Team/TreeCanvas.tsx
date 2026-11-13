import { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Info,
  Compass,
  ChevronsUpDown,
} from 'lucide-react';
import type { TeamMember } from '../../data/team';
import {
  getMemberById,
  getSecretariatMembers,
  getBranchDepartments,
  getDepartmentMembers,
  DEPARTMENTS_DATA,
} from '../../data/team';
import { TreeNode } from './TreeNode';
import { ProfileModal } from './ProfileModal';

type BranchFilter = 'all' | 'operations' | 'diplomatic' | 'secretariat';

export function TreeCanvas() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);
  const [branchFilter, setBranchFilter] = useState<BranchFilter>('all');
  const [collapsedDepts, setCollapsedDepts] = useState<Record<string, boolean>>({});

  const toggleDept = (deptId: string) => {
    setCollapsedDepts((prev) => ({
      ...prev,
      [deptId]: !prev[deptId],
    }));
  };

  const allDeptsCollapsed = useMemo(() => {
    return DEPARTMENTS_DATA.every((dept) => collapsedDepts[dept.id]);
  }, [collapsedDepts]);

  const toggleAllDepts = () => {
    if (allDeptsCollapsed) {
      setCollapsedDepts({});
    } else {
      const allCollapsed: Record<string, boolean> = {};
      DEPARTMENTS_DATA.forEach((d) => {
        allCollapsed[d.id] = true;
      });
      setCollapsedDepts(allCollapsed);
    }
  };

  // Hierarchy Data References
  const secretariat = useMemo(() => getSecretariatMembers(), []);
  const sg = useMemo(() => secretariat.find((m) => m.id === 'sg'), [secretariat]);
  const dsg = useMemo(() => secretariat.find((m) => m.id === 'dsg'), [secretariat]);
  const cd = useMemo(() => secretariat.find((m) => m.id === 'cd'), [secretariat]);

  const operationsDepts = useMemo(() => getBranchDepartments('dsg'), []);
  const diplomaticDepts = useMemo(() => getBranchDepartments('cd'), []);

  // Compute chain of command highlighting
  const activeChain = useMemo(() => {
    if (!hoveredMemberId) return new Set<string>();
    const chain = new Set<string>();
    chain.add(hoveredMemberId);

    let curr = getMemberById(hoveredMemberId);
    while (curr && curr.parentId) {
      chain.add(curr.parentId);
      curr = getMemberById(curr.parentId);
    }
    return chain;
  }, [hoveredMemberId]);

  const showOperations = branchFilter === 'all' || branchFilter === 'operations';
  const showDiplomatic = branchFilter === 'all' || branchFilter === 'diplomatic';
  const showOnlySecretariat = branchFilter === 'secretariat';

  return (
    <div className="relative w-full">
      {/* ─── TREE NAVIGATION & FILTER BAR ─── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-rule/60 bg-navy/90 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
            <Compass size={18} />
          </div>
          <div>
            <h3 className="eyebrow !text-xs text-gold tracking-widest uppercase">
              Hierarchy &amp; Lineage Explorer
            </h3>
            <p className="text-xs text-ivory/60">
              Select any official to examine credentials, mandate, and reporting line.
            </p>
          </div>
        </div>

        {/* Action Controls: Branch Filters & Toggle All */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="tablist"
            aria-label="Filter tree branches"
            className="flex flex-wrap items-center gap-1.5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={branchFilter === 'all'}
              onClick={() => setBranchFilter('all')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-150 ${
                branchFilter === 'all'
                  ? 'border border-gold bg-gold text-navy font-semibold'
                  : 'border border-rule/80 bg-navy-deep/60 text-ivory/70 hover:border-gold/40 hover:text-ivory'
              }`}
            >
              Full Tree
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={branchFilter === 'secretariat'}
              onClick={() => setBranchFilter('secretariat')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                branchFilter === 'secretariat'
                  ? 'border border-gold bg-gold text-navy font-semibold'
                  : 'border border-rule/80 bg-navy-deep/60 text-ivory/70 hover:border-gold/40 hover:text-ivory'
              }`}
            >
              Secretariat Only
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={branchFilter === 'operations'}
              onClick={() => setBranchFilter('operations')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                branchFilter === 'operations'
                  ? 'border border-gold bg-gold text-navy font-semibold'
                  : 'border border-rule/80 bg-navy-deep/60 text-ivory/70 hover:border-gold/40 hover:text-ivory'
              }`}
            >
              Operations (DSG)
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={branchFilter === 'diplomatic'}
              onClick={() => setBranchFilter('diplomatic')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                branchFilter === 'diplomatic'
                  ? 'border border-gold bg-gold text-navy font-semibold'
                  : 'border border-rule/80 bg-navy-deep/60 text-ivory/70 hover:border-gold/40 hover:text-ivory'
              }`}
            >
              Diplomatic &amp; Media (CD)
            </button>
          </div>

          {!showOnlySecretariat && (
            <button
              type="button"
              onClick={toggleAllDepts}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-rule/80 bg-navy-deep/60 px-2.5 py-1.5 text-xs text-ivory/70 transition-colors hover:border-gold/40 hover:text-ivory"
              title={allDeptsCollapsed ? 'Expand all departments' : 'Collapse all departments'}
            >
              <ChevronsUpDown size={13} className="text-gold" />
              <span>{allDeptsCollapsed ? 'Expand All' : 'Collapse All'}</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── TREE VISUAL CANVAS ─── */}
      <div className="relative rounded-2xl border border-rule/70 bg-navy-deep p-4 sm:p-8 lg:p-10 overflow-hidden">
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* ══════════════════════════════════════════════════════════════════
              TIER 0: SECRETARY GENERAL (APEX NODE)
             ══════════════════════════════════════════════════════════════════ */}
          {sg && (
            <div className="relative z-20 flex flex-col items-center">
              <div className="mb-2 flex items-center gap-2 rounded border border-gold/40 bg-navy px-2.5 py-0.5 text-[0.62rem] font-semibold text-gold tracking-widest uppercase font-mono">
                <span>Apex Officer &bull; Level 01</span>
              </div>

              <TreeNode
                member={sg}
                variant="apex"
                isSelected={selectedMember?.id === sg.id}
                isHighlighted={activeChain.has(sg.id)}
                onSelect={(m) => setSelectedMember(m)}
                onHover={(id) => setHoveredMemberId(id)}
              />

              {/* Apex Stem Connector descending to Level 1 */}
              <div aria-hidden="true" className="relative flex flex-col items-center my-2">
                <div
                  className={`h-8 w-0.5 transition-colors duration-200 ${
                    activeChain.has('sg') && (activeChain.has('dsg') || activeChain.has('cd'))
                      ? 'bg-gold'
                      : 'bg-gold/40'
                  }`}
                />
                <div className="flex items-center gap-1.5 rounded border border-rule/80 bg-navy px-2.5 py-0.5 text-[0.62rem] font-mono text-ivory/60">
                  <span>Executive Secretariat Line</span>
                </div>
                <div
                  className={`h-6 w-0.5 transition-colors duration-200 ${
                    activeChain.size > 0 ? 'bg-gold/60' : 'bg-white/20'
                  }`}
                />
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TIER 1: SECRETARIAT LEADERSHIP (DSG & CD)
             ══════════════════════════════════════════════════════════════════ */}
          {(dsg || cd) && (
            <div className="relative z-10 w-full">
              {/* Horizontal crossbar connecting DSG and CD branches on desktop/tablet */}
              <div
                aria-hidden="true"
                className="hidden md:block relative w-3/4 mx-auto h-px mb-4"
              >
                <div
                  className={`absolute inset-0 transition-colors duration-200 ${
                    activeChain.has('dsg') || activeChain.has('cd')
                      ? 'bg-gradient-to-r from-gold/80 via-gold to-gold/80'
                      : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
                  }`}
                />
                {/* Branch junction dots */}
                <div className="absolute left-1/4 -top-1 h-2 w-2 rounded-full bg-gold" />
                <div className="absolute right-1/4 -top-1 h-2 w-2 rounded-full bg-gold" />
              </div>

              {/* Two Wing Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                {/* ── LEFT BRANCH: OPERATIONS WING (DSG) ── */}
                <div
                  className={`flex flex-col items-center transition-opacity duration-200 ${
                    showOperations ? 'opacity-100' : 'opacity-20 pointer-events-none hidden md:flex'
                  }`}
                >
                  {dsg && (
                    <div className="flex flex-col items-center w-full">
                      <div className="mb-2 text-center">
                        <span className="eyebrow !text-[0.62rem] text-gold-light tracking-widest uppercase">
                          Wing 01 &bull; Operations &amp; Delegate Affairs
                        </span>
                      </div>

                      <TreeNode
                        member={dsg}
                        variant="executive"
                        isSelected={selectedMember?.id === dsg.id}
                        isHighlighted={activeChain.has(dsg.id)}
                        onSelect={(m) => setSelectedMember(m)}
                        onHover={(id) => setHoveredMemberId(id)}
                      />

                      {/* Stem descending to operations departments */}
                      {!showOnlySecretariat && (
                        <div aria-hidden="true" className="flex flex-col items-center my-3">
                          <div
                            className={`h-7 w-0.5 transition-colors duration-200 ${
                              activeChain.has('dsg') && operationsDepts.some((d) => activeChain.has(d.headId || ''))
                                ? 'bg-gold'
                                : 'bg-white/20'
                            }`}
                          />
                          <span className="text-[0.6rem] font-mono text-ivory/50 uppercase tracking-widest">
                            Operations Wing &bull; 3 Departments
                          </span>
                          <div className="h-5 w-0.5 bg-white/20" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Operations Departments List */}
                  {!showOnlySecretariat && (
                    <div className="w-full space-y-4 mt-1">
                      {operationsDepts.map((dept) => {
                        const { head, members } = getDepartmentMembers(dept.name);
                        const isCollapsed = Boolean(collapsedDepts[dept.id]);
                        const isDeptActive =
                          activeChain.has(head?.id || '') ||
                          members.some((m) => activeChain.has(m.id));

                        return (
                          <div
                            key={dept.id}
                            className={`rounded-xl border transition-all duration-200 p-4 sm:p-5 ${
                              isDeptActive
                                ? 'border-gold bg-[#0b1c3a]'
                                : 'border-rule/70 bg-navy/80 hover:border-rule'
                            }`}
                          >
                            {/* Department Card Header */}
                            <div className="flex items-center justify-between border-b border-rule/60 pb-3 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-semibold text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/30">
                                  {dept.code}
                                </span>
                                <div>
                                  <h4 className="text-sm font-semibold text-ivory">{dept.name}</h4>
                                  <span className="text-[0.65rem] text-ivory/50">
                                    Reports to Deputy Secretary General
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => toggleDept(dept.id)}
                                aria-label={isCollapsed ? `Expand ${dept.name}` : `Collapse ${dept.name}`}
                                className="flex h-7 w-7 items-center justify-center rounded border border-rule/80 bg-navy-deep/60 text-ivory/70 hover:text-ivory hover:border-gold/40 transition-colors"
                              >
                                {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                              </button>
                            </div>

                            {/* Department Nodes Tree */}
                            {!isCollapsed && (
                              <div className="flex flex-col items-center pt-1">
                                {/* Department Head Node */}
                                {head && (
                                  <div className="flex flex-col items-center">
                                    <TreeNode
                                      member={head}
                                      variant="head"
                                      isSelected={selectedMember?.id === head.id}
                                      isHighlighted={activeChain.has(head.id)}
                                      onSelect={(m) => setSelectedMember(m)}
                                      onHover={(id) => setHoveredMemberId(id)}
                                    />

                                    {/* Stem to members if any */}
                                    {members.length > 0 && (
                                      <div aria-hidden="true" className="flex flex-col items-center my-2">
                                        <div
                                          className={`h-5 w-0.5 ${
                                            members.some((m) => activeChain.has(m.id))
                                              ? 'bg-gold'
                                              : 'bg-white/20'
                                          }`}
                                        />
                                        <span className="text-[0.58rem] font-mono text-ivory/40 uppercase">
                                          Department Members
                                        </span>
                                        <div className="h-3 w-0.5 bg-white/20" />
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Department Members Sub-branch */}
                                {members.length > 0 && (
                                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
                                    {members.map((member) => (
                                      <TreeNode
                                        key={member.id}
                                        member={member}
                                        variant="member"
                                        isSelected={selectedMember?.id === member.id}
                                        isHighlighted={activeChain.has(member.id)}
                                        onSelect={(m) => setSelectedMember(m)}
                                        onHover={(id) => setHoveredMemberId(id)}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* ── RIGHT BRANCH: EXTERNAL & MEDIA WING (CD) ── */}
                <div
                  className={`flex flex-col items-center transition-opacity duration-200 ${
                    showDiplomatic ? 'opacity-100' : 'opacity-20 pointer-events-none hidden md:flex'
                  }`}
                >
                  {cd && (
                    <div className="flex flex-col items-center w-full">
                      <div className="mb-2 text-center">
                        <span className="eyebrow !text-[0.62rem] text-gold-light tracking-widest uppercase">
                          Wing 02 &bull; External Affairs &amp; Outreach
                        </span>
                      </div>

                      <TreeNode
                        member={cd}
                        variant="executive"
                        isSelected={selectedMember?.id === cd.id}
                        isHighlighted={activeChain.has(cd.id)}
                        onSelect={(m) => setSelectedMember(m)}
                        onHover={(id) => setHoveredMemberId(id)}
                      />

                      {/* Stem descending to diplomatic departments */}
                      {!showOnlySecretariat && (
                        <div aria-hidden="true" className="flex flex-col items-center my-3">
                          <div
                            className={`h-7 w-0.5 transition-colors duration-200 ${
                              activeChain.has('cd') && diplomaticDepts.some((d) => activeChain.has(d.headId || ''))
                                ? 'bg-gold'
                                : 'bg-white/20'
                            }`}
                          />
                          <span className="text-[0.6rem] font-mono text-ivory/50 uppercase tracking-widest">
                            Diplomatic &amp; Media &bull; 4 Departments
                          </span>
                          <div className="h-5 w-0.5 bg-white/20" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Diplomatic & Media Departments List */}
                  {!showOnlySecretariat && (
                    <div className="w-full space-y-4 mt-1">
                      {diplomaticDepts.map((dept) => {
                        const { head, members } = getDepartmentMembers(dept.name);
                        const isCollapsed = Boolean(collapsedDepts[dept.id]);
                        const isDeptActive =
                          activeChain.has(head?.id || '') ||
                          members.some((m) => activeChain.has(m.id));

                        return (
                          <div
                            key={dept.id}
                            className={`rounded-xl border transition-all duration-200 p-4 sm:p-5 ${
                              isDeptActive
                                ? 'border-gold bg-[#0b1c3a]'
                                : 'border-rule/70 bg-navy/80 hover:border-rule'
                            }`}
                          >
                            {/* Department Card Header */}
                            <div className="flex items-center justify-between border-b border-rule/60 pb-3 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-semibold text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/30">
                                  {dept.code}
                                </span>
                                <div>
                                  <h4 className="text-sm font-semibold text-ivory">{dept.name}</h4>
                                  <span className="text-[0.65rem] text-ivory/50">
                                    Reports to Charge d&apos;Affaires
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => toggleDept(dept.id)}
                                aria-label={isCollapsed ? `Expand ${dept.name}` : `Collapse ${dept.name}`}
                                className="flex h-7 w-7 items-center justify-center rounded border border-rule/80 bg-navy-deep/60 text-ivory/70 hover:text-ivory hover:border-gold/40 transition-colors"
                              >
                                {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                              </button>
                            </div>

                            {/* Department Nodes Tree */}
                            {!isCollapsed && (
                              <div className="flex flex-col items-center pt-1">
                                {/* Department Head Node */}
                                {head && (
                                  <div className="flex flex-col items-center">
                                    <TreeNode
                                      member={head}
                                      variant="head"
                                      isSelected={selectedMember?.id === head.id}
                                      isHighlighted={activeChain.has(head.id)}
                                      onSelect={(m) => setSelectedMember(m)}
                                      onHover={(id) => setHoveredMemberId(id)}
                                    />

                                    {/* Stem to members if any */}
                                    {members.length > 0 && (
                                      <div aria-hidden="true" className="flex flex-col items-center my-2">
                                        <div
                                          className={`h-5 w-0.5 ${
                                            members.some((m) => activeChain.has(m.id))
                                              ? 'bg-gold'
                                              : 'bg-white/20'
                                          }`}
                                        />
                                        <span className="text-[0.58rem] font-mono text-ivory/40 uppercase">
                                          Department Members
                                        </span>
                                        <div className="h-3 w-0.5 bg-white/20" />
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Department Members Sub-branch */}
                                {members.length > 0 && (
                                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
                                    {members.map((member) => (
                                      <TreeNode
                                        key={member.id}
                                        member={member}
                                        variant="member"
                                        isSelected={selectedMember?.id === member.id}
                                        isHighlighted={activeChain.has(member.id)}
                                        onSelect={(m) => setSelectedMember(m)}
                                        onHover={(id) => setHoveredMemberId(id)}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hierarchy Legend & Reporting Chain Notice */}
        <div className="mt-10 pt-5 border-t border-rule/60 flex flex-wrap items-center justify-between gap-4 text-xs text-ivory/60">
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-gold bg-gold" />
              <span>Secretary General (Apex)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-gold/70 bg-navy" />
              <span>Secretariat (Level 01)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-[#7ba0d4] bg-navy" />
              <span>Department Head</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-white/30 bg-navy" />
              <span>Committee Member</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-gold font-mono text-[0.7rem]">
            <Info size={13} />
            <span>Hover any official to highlight full chain of command</span>
          </div>
        </div>
      </div>

      {/* ─── PROFILE POPUP MODAL ─── */}
      <ProfileModal
        member={selectedMember}
        isOpen={Boolean(selectedMember)}
        onClose={() => setSelectedMember(null)}
        onSelectMember={(m) => setSelectedMember(m)}
      />
    </div>
  );
}
