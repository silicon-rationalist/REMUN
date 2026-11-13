export interface Committee {
  id: string;
  name: string;
  shortName: string;
  description: string;
  agenda: string;
  icon: string; // lucide icon name
}

// TODO(organizers): All committee data below is placeholder. Replace with verified information.
export const COMMITTEES: Committee[] = [
  {
    id: 'unga',
    name: 'United Nations General Assembly',
    shortName: 'UNGA',
    description:
      'The main deliberative, policymaking and representative organ of the United Nations.',
    agenda: 'To be confirmed',
    icon: 'globe',
  },
  {
    id: 'unsc',
    name: 'United Nations Security Council',
    shortName: 'UNSC',
    description:
      'Primary responsibility for the maintenance of international peace and security.',
    agenda: 'To be confirmed',
    icon: 'shield',
  },
  {
    id: 'unhrc',
    name: 'United Nations Human Rights Council',
    shortName: 'UNHRC',
    description:
      'Responsible for strengthening the promotion and protection of human rights around the globe.',
    agenda: 'To be confirmed',
    icon: 'scale',
  },
  {
    id: 'ecosoc',
    name: 'Economic and Social Council',
    shortName: 'ECOSOC',
    description:
      'Central platform for fostering debate and innovative thinking on sustainable development.',
    agenda: 'To be confirmed',
    icon: 'landmark',
  },
  {
    id: 'aippm',
    name: 'All India Political Parties Meet',
    shortName: 'AIPPM',
    description:
      'A simulation of Indian parliamentary proceedings and political discourse.',
    agenda: 'To be confirmed',
    icon: 'building-2',
  },
];
