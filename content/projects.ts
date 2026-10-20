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
 * 3. Enforces that any project containing placeholder indicators has `isPlaceholder: true`.
 * 4. PRODUCTION GUARD: If `process.env.OLI_PRODUCTION === '1'`, fails the build immediately
 *    if ANY project has `isPlaceholder: true`. Development builds (without the flag) pass.
 *
 * What this guard blocks:
 * - In dev/test: blocks incomplete records, <3 images, or unflagged placeholders disguised as real projects.
 * - In production (OLI_PRODUCTION=1): blocks ANY project with `isPlaceholder: true` from building.
 *
 * What this guard does NOT block:
 * - In non-production builds (standard dev/test): allows flagged placeholder projects (`isPlaceholder: true`).
 * - Does not check image binary dimensions/resolutions or verify external URL reachability.
 * - Does not inspect whether non-placeholder text is grammatically correct or factually verified.
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
      p.location.toLowerCase().includes('tbc') ||
      p.year.toLowerCase().includes('tbc');
    if (isObviousPlaceholder && !p.isPlaceholder) {
      throw new Error(
        `[Project Validation Error] Project "${p.slug}" contains placeholder markers ("${p.title}", "${p.location}") but has isPlaceholder=false. Unflagged placeholders cannot ship.`
      );
    }
    if (process.env.OLI_PRODUCTION === '1' && p.isPlaceholder) {
      throw new Error(
        `[Production Build Guard] Cannot build for production (OLI_PRODUCTION=1) with placeholder projects active: "${p.slug}". Real project assets required before production deployment.`
      );
    }
  }
}

/**
 * 4 obviously fake placeholder projects representing each studio discipline:
 * Architecture, Interior, Landscape, Product Design.
 * All entries are strictly flagged with `isPlaceholder: true`, "Location TBC", "Year TBC", "Area TBC".
 * Zero invented specifics, narrative claims, or plausible numbers.
 */
export const projects: Project[] = [
  {
    slug: 'placeholder-project-01',
    title: 'Placeholder Project 01',
    discipline: 'Architecture',
    location: 'Location TBC',
    year: 'Year TBC',
    area: 'Area TBC',
    brief: '[NEEDED: Project brief from studio, 2–3 sentences]',
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
    year: 'Year TBC',
    area: 'Area TBC',
    brief: '[NEEDED: Project brief from studio, 2–3 sentences]',
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
    year: 'Year TBC',
    area: 'Area TBC',
    brief: '[NEEDED: Project brief from studio, 2–3 sentences]',
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
    year: 'Year TBC',
    area: 'Area TBC',
    brief: '[NEEDED: Project brief from studio, 2–3 sentences]',
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
