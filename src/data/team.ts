export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  parentId?: string | null;
  reportsToTitle?: string;
  image?: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
  order: number;
  bio?: string;
  roleDescription?: string;
  tenure?: string;
  isLeadership?: boolean;
  isHead?: boolean;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  description?: string;
  headId?: string;
  parentExecutiveId: 'dsg' | 'cd';
}

// Single source of truth for verified team and hierarchy structure.
// TODO(organizers): Replace placeholder names and social links with verified organizer profiles when confirmed.
export const TEAM_MEMBERS: TeamMember[] = [
  // ── 1. Executive Secretariat (Level 01) ──
  {
    id: 'sg',
    name: 'Secretary General',
    designation: 'Secretary General',
    department: 'Executive Secretariat',
    parentId: null,
    order: 1,
    isLeadership: true,
    isHead: true,
    tenure: '2025–2026 Session',
    bio: 'Chief Executive Officer of RNS MUN 2026, overseeing overall conference direction, academic rigor, and diplomacy.',
    roleDescription:
      'Exercises ultimate stewardship over the entire conference proceedings, presiding over high-level plenary sessions, setting the diplomatic vision, and ensuring international standard debate across all committees.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'secgen@rnsmun.org',
  },
  {
    id: 'dsg',
    name: 'Deputy Secretary General',
    designation: 'Deputy Secretary General',
    department: 'Executive Secretariat',
    parentId: 'sg',
    reportsToTitle: 'Secretary General',
    order: 2,
    isLeadership: true,
    isHead: false,
    tenure: '2025–2026 Session',
    bio: 'Oversees operational readiness, inter-departmental coordination, and delegate experience.',
    roleDescription:
      'Directs the operational wing of RNS MUN 2026. Manages the Organising Committee, Delegate Affairs, and Logistics departments, ensuring flawless execution from registration through committee deliberation.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'dsg@rnsmun.org',
  },
  {
    id: 'cd',
    name: "Charge d'Affaires",
    designation: "Charge d'Affaires",
    department: 'Executive Secretariat',
    parentId: 'sg',
    reportsToTitle: 'Secretary General',
    order: 3,
    isLeadership: true,
    isHead: false,
    tenure: '2025–2026 Session',
    bio: 'Leads external diplomacy, institutional affairs, and high-level communications.',
    roleDescription:
      'Champions the institutional representation and public presence of RNS MUN 2026. Oversees Public Relations, Marketing, Design & Media, and Technical Teams to uphold conference prestige and outreach.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'chargedaffaires@rnsmun.org',
  },

  // ── 2. Operations Wing (Reporting to DSG) ──
  // Organising Committee
  {
    id: 'oc-1',
    name: 'OC Head',
    designation: 'Head of Organising Committee',
    department: 'Organising Committee',
    parentId: 'dsg',
    reportsToTitle: 'Deputy Secretary General',
    order: 10,
    isHead: true,
    tenure: '2025–2026 Session',
    bio: 'Directs day-to-day committee execution and overall conference workflow.',
    roleDescription:
      'Supervises committee logistics, master session scheduling, volunteer deployment, and floor governance across all assembly halls during conference days.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'oc@rnsmun.org',
  },
  {
    id: 'oc-2',
    name: 'OC Executive',
    designation: 'Organising Committee Member',
    department: 'Organising Committee',
    parentId: 'oc-1',
    reportsToTitle: 'Head of Organising Committee',
    order: 11,
    isHead: false,
    tenure: '2025–2026 Session',
    bio: 'Assists in floor coordination, committee pacing, and administrative logistics.',
    roleDescription:
      'Supports the OC Head with on-ground time management, resolution printing, page communications, and real-time delegate assistance.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'oc.exec@rnsmun.org',
  },

  // Delegate Affairs
  {
    id: 'da-1',
    name: 'DA Head',
    designation: 'Head of Delegate Affairs',
    department: 'Delegate Affairs',
    parentId: 'dsg',
    reportsToTitle: 'Deputy Secretary General',
    order: 20,
    isHead: true,
    tenure: '2025–2026 Session',
    bio: 'Manages delegation allocations, committee queries, and delegate onboarding.',
    roleDescription:
      'Leads the primary delegate care division, handling portfolio allocation matrixes, pre-conference background guide distribution, and rules of procedure inquiries.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'delegates@rnsmun.org',
  },
  {
    id: 'da-2',
    name: 'DA Executive',
    designation: 'Delegate Affairs Member',
    department: 'Delegate Affairs',
    parentId: 'da-1',
    reportsToTitle: 'Head of Delegate Affairs',
    order: 21,
    isHead: false,
    tenure: '2025–2026 Session',
    bio: 'Coordinates delegate credentials, registration check-ins, and committee queries.',
    roleDescription:
      'Executes delegation check-in protocols, issues conference dossiers and badges, and manages real-time delegate queries during sessions.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'da.exec@rnsmun.org',
  },

  // Logistics
  {
    id: 'log-1',
    name: 'Logistics Head',
    designation: 'Head of Logistics',
    department: 'Logistics',
    parentId: 'dsg',
    reportsToTitle: 'Deputy Secretary General',
    order: 50,
    isHead: true,
    tenure: '2025–2026 Session',
    bio: 'Coordinates venue facilities, hospitality, technical staging, and conference logistics.',
    roleDescription:
      'Commands all physical venue setups at RNSIT, including committee room seating, delegate kits, catering, AV hardware, and emergency medical contingencies.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'logistics@rnsmun.org',
  },

  // ── 3. Diplomatic & External Wing (Reporting to CD) ──
  // Public Relations
  {
    id: 'pr-1',
    name: 'PR Head',
    designation: 'Head of Public Relations',
    department: 'Public Relations',
    parentId: 'cd',
    reportsToTitle: "Charge d'Affaires",
    order: 30,
    isHead: true,
    tenure: '2025–2026 Session',
    bio: 'Handles external institutional relations, press coverage, and guest dignitary coordination.',
    roleDescription:
      'Directs diplomatic protocol for chief guests, keynote speakers, visiting university delegations, and press media relations throughout RNS MUN 2026.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'pr@rnsmun.org',
  },

  // Marketing
  {
    id: 'mktg-1',
    name: 'Marketing Head',
    designation: 'Head of Marketing',
    department: 'Marketing',
    parentId: 'cd',
    reportsToTitle: "Charge d'Affaires",
    order: 40,
    isHead: true,
    tenure: '2025–2026 Session',
    bio: 'Drives outreach campaigns, institutional partnerships, and delegate registrations.',
    roleDescription:
      'Orchestrates multi-channel outreach to educational institutions across the country, manages the Campus Ambassador initiative, and leads delegate recruitment.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'marketing@rnsmun.org',
  },

  // Design & Media
  {
    id: 'design-1',
    name: 'Design & Media Head',
    designation: 'Head of Design & Media',
    department: 'Design & Media',
    parentId: 'cd',
    reportsToTitle: "Charge d'Affaires",
    order: 60,
    isHead: true,
    tenure: '2025–2026 Session',
    bio: 'Shapes the conference brand identity, visual guidelines, photography, and multimedia assets.',
    roleDescription:
      'Crafts the official visual identity of RNS MUN 2026, including conference placards, stationery, digital assets, session photography, and highlight reels.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'design@rnsmun.org',
  },

  // Technical Team
  {
    id: 'tech-1',
    name: 'Tech Head',
    designation: 'Head of Technical Team',
    department: 'Technical Team',
    parentId: 'cd',
    reportsToTitle: "Charge d'Affaires",
    order: 70,
    isHead: true,
    tenure: '2025–2026 Session',
    bio: 'Architects and maintains the digital infrastructure, registration systems, and web presence.',
    roleDescription:
      'Engineers the official web portal, delegates allocation database, automated ticketing, and real-time technical infrastructure for committee voting.',
    instagram: 'https://instagram.com/rnsmun',
    linkedin: 'https://linkedin.com/company/rns-mun',
    email: 'tech@rnsmun.org',
  },
];

export const DEPARTMENTS_DATA: DepartmentInfo[] = [
  {
    id: 'oc',
    name: 'Organising Committee',
    code: 'OC',
    description: 'Responsible for general conference strategy, schedule governance, and inter-team synchronization.',
    headId: 'oc-1',
    parentExecutiveId: 'dsg',
  },
  {
    id: 'da',
    name: 'Delegate Affairs',
    code: 'DA',
    description: 'Direct contact point for all delegate inquiries, committee allocations, rules of procedure, and guidance.',
    headId: 'da-1',
    parentExecutiveId: 'dsg',
  },
  {
    id: 'log',
    name: 'Logistics',
    code: 'LOG',
    description: 'Ensuring seamless venue infrastructure, stationery, catering, delegate transport, and technical audio-visual setups.',
    headId: 'log-1',
    parentExecutiveId: 'dsg',
  },
  {
    id: 'pr',
    name: 'Public Relations',
    code: 'PR',
    description: 'Managing external outreach, guest invitations, diplomatic press communications, and conference dignity.',
    headId: 'pr-1',
    parentExecutiveId: 'cd',
  },
  {
    id: 'mktg',
    name: 'Marketing',
    code: 'MKTG',
    description: 'Overseeing social media presence, campus ambassadors, promotional campaigns, and institutional reach.',
    headId: 'mktg-1',
    parentExecutiveId: 'cd',
  },
  {
    id: 'design',
    name: 'Design & Media',
    code: 'DES',
    description: 'Crafting the official visual aesthetics, editorial collateral, digital design, photography, and video coverage.',
    headId: 'design-1',
    parentExecutiveId: 'cd',
  },
  {
    id: 'tech',
    name: 'Technical Team',
    code: 'TECH',
    description: 'Building and securing high-performance web systems, online payments, database verification, and live technical support.',
    headId: 'tech-1',
    parentExecutiveId: 'cd',
  },
];

// Helper functions for data consumers
export function getMemberById(id: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}

export function getParentMember(member: TeamMember): TeamMember | undefined {
  if (!member.parentId) return undefined;
  return TEAM_MEMBERS.find((m) => m.id === member.parentId);
}

export function getChildMembers(memberId: string): TeamMember[] {
  return TEAM_MEMBERS.filter((m) => m.parentId === memberId).sort((a, b) => a.order - b.order);
}

export function getSecretariatMembers(): TeamMember[] {
  return TEAM_MEMBERS.filter((m) => m.isLeadership).sort((a, b) => a.order - b.order);
}

export function getDepartmentMembers(departmentName: string): { head?: TeamMember; members: TeamMember[] } {
  const deptMembers = TEAM_MEMBERS.filter(
    (m) => m.department.toLowerCase() === departmentName.toLowerCase() && !m.isLeadership,
  ).sort((a, b) => a.order - b.order);

  const head = deptMembers.find((m) => m.isHead);
  const members = deptMembers.filter((m) => !m.isHead);

  return { head, members };
}

export function getBranchDepartments(executiveId: 'dsg' | 'cd'): DepartmentInfo[] {
  return DEPARTMENTS_DATA.filter((dept) => dept.parentExecutiveId === executiveId);
}

// Backward-compatibility export matching previous shape if referenced elsewhere
export const TEAM = {
  leadership: getSecretariatMembers(),
  departments: DEPARTMENTS_DATA.map((dept) => {
    const { head, members } = getDepartmentMembers(dept.name);
    return {
      id: dept.id,
      name: dept.name,
      description: dept.description,
      members: head ? [head, ...members] : members,
    };
  }),
};
