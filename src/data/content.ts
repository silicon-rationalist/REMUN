// Single source for homepage content. Only organizer-supplied facts live here.
// Anything uncertain is marked TODO and surfaced as "to be confirmed" in the UI.

export const EVENT = {
  name: 'RNS MUN 2026',
  tagline: 'A World in Session.',
  organization: 'RNS MUN',
  institution: 'RNSIT',
  dateLabel: '06–07 October 2026',
  dateShort: '06–07 Oct',
  year: '2026',
  location: 'Bengaluru, India',
  city: 'Bengaluru',
  prizePoolValue: 100000,
  prizePoolLabel: '₹1,00,000+',
  durationDays: 2,
} as const;

export type NavId = 'home' | 'registration' | 'venue' | 'contact' | 'team' | 'equity';

export interface NavItem {
  id: NavId;
  label: string;
  /** Real in-page anchor, or null when the inner page does not exist yet. */
  href: string | null;
  /** Section ids that count as "this link is active" while scrolling. */
  spy?: string[];
}

// Exact labels and order: Home → Registration → Venue → Team → Contact → Equity Policy.
// href === null → prototype placeholder (inner page is out of scope for this phase).
export const NAV: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home', spy: ['home', 'about', 'why', 'experience', 'committees', 'event'] },
  { id: 'registration', label: 'Registration', href: '#registration', spy: ['registration'] },
  { id: 'venue', label: 'Venue', href: '#venue', spy: ['venue'] },
  { id: 'team', label: 'Team', href: '#team', spy: ['team'] },
  { id: 'contact', label: 'Contact', href: '#contact', spy: ['contact'] },
  { id: 'equity', label: 'Equity Policy', href: null },
];

export interface Topic {
  id: string;
  title: string;
  blurb: string;
  /** Illustrative placement only: [lon, lat]. Not geopolitical data. */
  at: [number, number];
}

export const TOPICS: Topic[] = [
  {
    id: 'diplomacy',
    title: 'Diplomacy',
    blurb:
      'The craft of speaking for someone else and still being heard. Delegates learn to build trust, read a room and move opponents toward common ground.',
    at: [-74, 40.7],
  },
  {
    id: 'security',
    title: 'International Security',
    blurb:
      'How states respond to conflict, tension and threats that cross borders. Committees weigh prevention, response and the cost of inaction.',
    at: [66, 46],
  },
  {
    id: 'rights',
    title: 'Human Rights',
    blurb:
      'Debates on dignity, equality and protection. Delegates test how principles hold up against national interests and real constraints.',
    at: [6, 46.2],
  },
  {
    id: 'development',
    title: 'Sustainable Development',
    blurb:
      'Questions of climate, resources and growth that no single country can settle alone, and what a fair path forward might look like.',
    at: [37, -1.3],
  },
  {
    id: 'cooperation',
    title: 'Global Cooperation',
    blurb:
      'The shared work of treaties, coalitions and joint action. Delegates practise drafting language that many different countries can sign.',
    at: [104, 1.4],
  },
];

export const HOME_MARKER: [number, number] = [77.59, 12.97]; // Bengaluru

export interface Chapter {
  n: string;
  word: string;
  lead: string;
  body: string;
}

export const CHAPTERS: Chapter[] = [
  {
    n: '01',
    word: 'Represent.',
    lead: 'Take a seat that is not yours.',
    body: 'You are assigned a country and a brief. Before a word is spoken, you research its history, its interests and the pressures on its government, then carry that perspective into the room.',
  },
  {
    n: '02',
    word: 'Debate.',
    lead: 'Make your case, then answer for it.',
    body: 'Speeches, points and rebuttals. Debate rewards clear structure and evidence, and it rewards listening just as much as speaking.',
  },
  {
    n: '03',
    word: 'Negotiate.',
    lead: 'The real work happens between speeches.',
    body: 'Blocs form and positions shift in the corridors. You trade, compromise and persuade, and you learn where your country’s lines really are.',
  },
  {
    n: '04',
    word: 'Resolve.',
    lead: 'End with something written down.',
    body: 'Committees turn disagreement into draft resolutions. Every clause is argued over, amended and finally put to a vote.',
  },
];
