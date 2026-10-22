export type Discipline = 'Architecture' | 'Interior' | 'Landscape' | 'Product';

export interface Project {
  slug: string;
  title: string;
  discipline: Discipline;
  location: string;
  year: string;
  area?: string;
  brief: string;
  concept?: string;
  materials?: string[];
  scope?: string;
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
 * Curated projects representing each studio discipline:
 * Architecture, Interior, Landscape, Product Design.
 * All entries are flagged with `isPlaceholder: true` as architectural design studies / illustrative reference
 * until authentic client project assets are delivered.
 */
export const projects: Project[] = [
  {
    slug: 'placeholder-project-01',
    title: 'Aura Residence · Pavilion on the Ridge',
    discipline: 'Architecture',
    location: 'Western Ghats, Maharashtra [Design Study]',
    year: '2024',
    area: '4,800 SQ FT',
    brief:
      'A monolithic residential pavilion embedded into a sloping laterite ridge. Designed around dual central courtyards to facilitate passive stack-effect ventilation and natural day lighting through severe seasonal monsoon transitions.',
    concept:
      'Thermal massing formed from 300 mm board-formed concrete walls paired with hand-troweled lime plaster. Deep 2.4-metre horizontal roof overhangs shield full-height glazing from harsh solar gain while framing panoramic valley views.',
    scope: 'Architecture · Structural Coordination · On-site Execution',
    materials: [
      'Board-formed fair-faced concrete',
      'Hydraulic lime plaster',
      'Thermal-break aluminium glazing',
      'Honed basalt stone flooring',
    ],
    isPlaceholder: true,
    coverImage: '/images/projects/arch-cover.jpg',
    images: [
      '/images/projects/arch-scrub.jpg',
      '/images/projects/arch-outcome-1.jpg',
      '/images/projects/arch-outcome-2.jpg',
    ],
  },
  {
    slug: 'placeholder-project-02',
    title: 'Clay & Timber Residence',
    discipline: 'Interior',
    location: 'Juhu, Mumbai [Design Study]',
    year: '2024',
    area: '2,600 SQ FT',
    brief:
      'A quiet coastal interior composed of raw lime plaster, reclaimed teak joinery, and honed green Kota stone. The spatial plan removes non-structural barriers to introduce continuous ocean light into the deep floor plate.',
    concept:
      'Architectural joinery units function as functional spatial dividers rather than rigid partitions. Fluted plaster screens filter light between living and dining volumes, while recessed shadow reveals eliminate applied surface trims.',
    scope: 'Interior Architecture · Custom Millwork · Lighting Detailing',
    materials: [
      'Honed green Kota stone',
      'Reclaimed Indian teak wood',
      'Off-white lime plaster',
      'Unlacquered satin brass',
    ],
    isPlaceholder: true,
    coverImage: '/images/projects/interior-cover.jpg',
    images: [
      '/images/projects/interior-scrub.jpg',
      '/images/projects/interior-outcome-1.jpg',
      '/images/projects/interior-outcome-2.jpg',
    ],
  },
  {
    slug: 'placeholder-project-03',
    title: 'Basalt Courtyard & Rain Garden',
    discipline: 'Landscape',
    location: 'Pune, Maharashtra [Design Study]',
    year: '2023',
    area: '12,000 SQ FT',
    brief:
      'A climate-resilient landscape integrating native Deccan flora, stepped rainwater retention terraces, and hand-chiseled basalt stone pavers. Designed to retain and percolate 100% of seasonal monsoon precipitation on site.',
    concept:
      'Graded basalt swales guide surface runoff into central bio-retention basins bordered by frangipani and native ferns. Shaded stone verandas create an unbroken outdoor room between the living pavilion and garden.',
    scope: 'Landscape Architecture · Stormwater Grading · Native Planting Plan',
    materials: [
      'Chiseled black basalt stone',
      'Riverbed pea gravel',
      'Board-marked concrete boundary walls',
      'Native monsoon flora',
    ],
    isPlaceholder: true,
    coverImage: '/images/projects/landscape-cover.jpg',
    images: [
      '/images/projects/landscape-scrub.jpg',
      '/images/projects/landscape-outcome-1.jpg',
      '/images/projects/landscape-outcome-2.jpg',
    ],
  },
  {
    slug: 'placeholder-project-04',
    title: 'Kanso Credenza & Cast Brass Hardware',
    discipline: 'Product',
    location: 'Studio Workshop [Design Study]',
    year: '2024',
    area: 'Limited Edition (06 Units)',
    brief:
      'An architectural credenza and low lounge bench engineered in solid Indian teak. Explores traditional visible mortise-and-tenon joinery paired with custom hand-turned blackened brass hardware.',
    concept:
      'A 45-degree chamfered shadow reveal elevates the solid timber mass 150 mm above the floor plane. Drawer faces are book-matched from a single flitch of seasoned teak, treated with hand-rubbed cold-pressed linseed oil.',
    scope: 'Product Design · Joinery Detailing · Prototype Fabrication',
    materials: [
      'Seasoned Indian teak',
      'Solid blackened cast brass',
      'Cold-pressed natural oil',
      'Concealed mechanical slides',
    ],
    isPlaceholder: true,
    coverImage: '/images/projects/product-cover.jpg',
    images: [
      '/images/projects/product-scrub.jpg',
      '/images/projects/product-outcome-1.jpg',
      '/images/projects/product-outcome-2.jpg',
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
