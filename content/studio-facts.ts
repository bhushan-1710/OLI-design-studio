/**
 * Studio Facts — OLI Design Studio
 * Single source of truth for all studio claims and copy.
 * Unconfirmed items remain strictly marked with [NEEDED].
 * Never invent facts, statistics, locations, hours, materials, promises, or team members.
 */

export interface StudioFacts {
  name: string;
  legalName: string;
  tagline: string;
  disciplines: {
    name: string;
    description: string;
    scope: string;
  }[];
  email: string;
  instagram: {
    handle: string;
    url: string;
  };
  whatsapp: {
    number: string;
    display: string;
    isConfirmed: boolean;
  };
  phone: {
    number: string;
    display: string;
    isConfirmed: boolean;
  };
  office: {
    region: string;
    address: string;
    isConfirmed: boolean;
    hours: string;
  };
  location: string;
  address: string;
  hours: string;
  responseTime: string;
  promise: string;
  philosophy: string;
  process: {
    stage: string;
    name: string;
    tagline: string;
    whatWeDo: string[];
    whatYouDecide: string[];
    whatYouReceive: string[];
  }[];
  teamStatus: string;
}

export const studioFacts: StudioFacts = {
  name: 'OLI Design Studio',
  legalName: 'OLI Design Studio',
  tagline: 'We take care of your projects from designing to handover.',
  disciplines: [
    {
      name: 'Architecture',
      description: '[NEEDED: Studio architecture discipline description]',
      scope: '[NEEDED: Scope of architectural services]',
    },
    {
      name: 'Interior',
      description: '[NEEDED: Studio interior discipline description]',
      scope: '[NEEDED: Scope of interior services]',
    },
    {
      name: 'Landscape',
      description: '[NEEDED: Studio landscape discipline description]',
      scope: '[NEEDED: Scope of landscape services]',
    },
    {
      name: 'Product Design',
      description: '[NEEDED: Studio product design discipline description]',
      scope: '[NEEDED: Scope of product design services]',
    },
  ],
  email: 'olidesignstudio06@gmail.com',
  instagram: {
    handle: '@olidesignstudio',
    url: 'https://instagram.com/olidesignstudio',
  },
  whatsapp: {
    number: '',
    display: '[NEEDED: WhatsApp number]',
    isConfirmed: false,
  },
  phone: {
    number: '',
    display: '[NEEDED: Phone number]',
    isConfirmed: false,
  },
  office: {
    region: '[NEEDED: Studio location]',
    address: '[NEEDED: Studio address]',
    isConfirmed: false,
    hours: '[NEEDED: Studio working hours]',
  },
  location: '[NEEDED: Studio location]',
  address: '[NEEDED: Studio address]',
  hours: '[NEEDED: Studio working hours]',
  responseTime: '[NEEDED: Studio response time]',
  promise: 'We take care of your projects from designing to handover.',
  philosophy: '[NEEDED: Studio philosophy statement (<= 80 words)]',
  process: [
    {
      stage: '01',
      name: 'Sketch',
      tagline: 'We start on paper: your site, your brief, first ideas drawn by hand.',
      whatWeDo: ['[NEEDED: Studio stage 01 what we do]'],
      whatYouDecide: ['[NEEDED: Studio stage 01 what you decide]'],
      whatYouReceive: ['[NEEDED: Studio stage 01 what you receive]'],
    },
    {
      stage: '02',
      name: 'Develop',
      tagline: 'Ideas become plans, sections and materials you can review and change.',
      whatWeDo: ['[NEEDED: Studio stage 02 what we do]'],
      whatYouDecide: ['[NEEDED: Studio stage 02 what you decide]'],
      whatYouReceive: ['[NEEDED: Studio stage 02 what you receive]'],
    },
    {
      stage: '03',
      name: 'Build',
      tagline: 'We detail the drawings, coordinate vendors and visit site as it goes up.',
      whatWeDo: ['[NEEDED: Studio stage 03 what we do]'],
      whatYouDecide: ['[NEEDED: Studio stage 03 what you decide]'],
      whatYouReceive: ['[NEEDED: Studio stage 03 what you receive]'],
    },
    {
      stage: '04',
      name: 'Handover',
      tagline: 'You receive the finished space and the documents behind it.',
      whatWeDo: ['[NEEDED: Studio stage 04 what we do]'],
      whatYouDecide: ['[NEEDED: Studio stage 04 what you decide]'],
      whatYouReceive: ['[NEEDED: Studio stage 04 what you receive]'],
    },
  ],
  teamStatus: '[NEEDED: Studio leadership and team profiles]',
};

