export type Discipline = 'Architecture' | 'Interior' | 'Landscape' | 'Product';

export interface Project {
  slug: string;
  title: string;
  discipline: Discipline;
  location: string;
  year: string;
  area?: string;
  brief: string;
  isPlaceholder: boolean;
  coverImage?: string;
  images: string[];
}

/**
 * Featured projects seeded with obvious placeholder data.
 * All placeholder entries are strictly flagged with `isPlaceholder: true`.
 * Zero invented facts, addresses, or realistic names.
 */
export const projects: Project[] = [
  {
    slug: 'placeholder-project-01',
    title: 'Placeholder Project 01',
    discipline: 'Architecture',
    location: 'Location TBC',
    year: '2026',
    area: '450 SQ M',
    brief: 'Architectural residential project currently in design phase. Detailed specifications and site photography to be populated upon client delivery.',
    isPlaceholder: true,
    images: ['/images/placeholder-01.jpg', '/images/placeholder-02.jpg', '/images/placeholder-03.jpg'],
  },
  {
    slug: 'placeholder-project-02',
    title: 'Placeholder Project 02',
    discipline: 'Interior',
    location: 'Location TBC',
    year: '2026',
    area: '280 SQ M',
    brief: 'Interior design and bespoke joinery commission. Detailed material palettes and documentation to follow after client asset handover.',
    isPlaceholder: true,
    images: ['/images/placeholder-01.jpg', '/images/placeholder-02.jpg', '/images/placeholder-03.jpg'],
  },
  {
    slug: 'placeholder-project-03',
    title: 'Placeholder Project 03',
    discipline: 'Landscape',
    location: 'Location TBC',
    year: '2025',
    area: '1,200 SQ M',
    brief: 'Landscape architecture and terrain contour planning project. Site surveys and plant schedules will be added once approved.',
    isPlaceholder: true,
    images: ['/images/placeholder-01.jpg', '/images/placeholder-02.jpg', '/images/placeholder-03.jpg'],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.slice(0, 3);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
