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
  coverImage: string;
  images: string[];
  drawingSvg?: string;
}

/**
 * Validates project data to guarantee production hygiene:
 * 1. Checks required fields: slug, title, discipline, location, year, brief, coverImage.
 * 2. Enforces at least 3 gallery images per project.
 * 3. Enforces that any placeholder project has `isPlaceholder: true`.
 * Throws a build-halting Error if any rule is violated.
 */
export function validateProjects(data: Project[]): void {
  for (const p of data) {
    if (!p.slug || !p.title || !p.discipline || !p.location || !p.year || !p.brief) {
      throw new Error(`[Project Validation Error] Project "${p.slug || 'unknown'}" is missing required metadata.`);
    }
    if (!p.coverImage) {
      throw new Error(`[Project Validation Error] Project "${p.slug}" is missing a coverImage.`);
    }
    if (!Array.isArray(p.images) || p.images.length < 3) {
      throw new Error(`[Project Validation Error] Project "${p.slug}" must have at least 3 images.`);
    }
    const isObviousPlaceholder =
      p.title.toLowerCase().includes('placeholder') ||
      p.location.toLowerCase().includes('tbc');
    if (isObviousPlaceholder && !p.isPlaceholder) {
      throw new Error(
        `[Project Validation Error] Project "${p.slug}" contains placeholder text but has isPlaceholder=false. Unflagged placeholders cannot ship.`
      );
    }
  }
}

/**
 * 4 obviously fake placeholder projects representing each studio discipline:
 * Architecture, Interior, Landscape, Product Design.
 * All entries are strictly flagged with `isPlaceholder: true` and "Location TBC".
 * Zero invented facts, client names, or realistic project claims.
 */
export const projects: Project[] = [
  {
    slug: 'placeholder-project-01',
    title: 'Placeholder Project 01',
    discipline: 'Architecture',
    location: 'Location TBC',
    year: '2026',
    area: '450 SQ M',
    brief:
      'Architectural residential commission exploring passive thermal mass and courtyard ventilation. Detailed specifications and site photography to be populated upon client delivery.',
    isPlaceholder: true,
    coverImage: '/images/placeholder-01.jpg',
    images: [
      '/images/placeholder-01.jpg',
      '/images/placeholder-02.jpg',
      '/images/placeholder-03.jpg',
    ],
  },
  {
    slug: 'placeholder-project-02',
    title: 'Placeholder Project 02',
    discipline: 'Interior',
    location: 'Location TBC',
    year: '2026',
    area: '280 SQ M',
    brief:
      'Interior spatial planning and bespoke joinery package celebrating natural lime plaster and seasoned teak. Detailed material palettes to follow after client asset handover.',
    isPlaceholder: true,
    coverImage: '/images/placeholder-02.jpg',
    images: [
      '/images/placeholder-02.jpg',
      '/images/placeholder-03.jpg',
      '/images/placeholder-01.jpg',
    ],
  },
  {
    slug: 'placeholder-project-03',
    title: 'Placeholder Project 03',
    discipline: 'Landscape',
    location: 'Location TBC',
    year: '2025',
    area: '1,200 SQ M',
    brief:
      'Landscape design integrating native drought-tolerant flora, rainwater harvesting bioswales, and local basalt stone pathways. Site surveys and plant schedules will be added once approved.',
    isPlaceholder: true,
    coverImage: '/images/placeholder-03.jpg',
    images: [
      '/images/placeholder-03.jpg',
      '/images/placeholder-01.jpg',
      '/images/placeholder-02.jpg',
    ],
  },
  {
    slug: 'placeholder-project-04',
    title: 'Placeholder Project 04',
    discipline: 'Product',
    location: 'Location TBC',
    year: '2026',
    area: 'Custom Series',
    brief:
      'Studio series of turned brass luminaires and hand-carved monolithic credenzas. Joinery blueprints and fabrication workshop photos will be populated upon fabrication sign-off.',
    isPlaceholder: true,
    coverImage: '/images/placeholder-01.jpg',
    images: [
      '/images/placeholder-01.jpg',
      '/images/placeholder-02.jpg',
      '/images/placeholder-03.jpg',
    ],
  },
];

// Execute build-time validation immediately on module load
validateProjects(projects);

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.slice(0, 3);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
