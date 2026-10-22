'use client';

import React from 'react';

interface ProjectSketchProps {
  slug: string;
}

/**
 * Bespoke architectural drafting linework tailored specifically to each project's
 * outcome photograph (16:10 aspect ratio, viewBox="0 0 1000 625").
 *
 * Each drawing aligns with the composition, perspective, camera angle, and major
 * spatial boundaries of its corresponding reveal photograph, ensuring genuine visual
 * integrity between the concept linework and the built reality.
 */
export function ProjectSketchDrawing({ slug }: ProjectSketchProps) {
  switch (slug) {
    case 'placeholder-project-01':
      return <ArchitecturePavilionLinework />;
    case 'placeholder-project-02':
      return <InteriorResidenceLinework />;
    case 'placeholder-project-03':
      return <LandscapeCourtyardLinework />;
    case 'placeholder-project-04':
      return <ProductFurnitureLinework />;
    default:
      return <ArchitecturePavilionLinework />;
  }
}

/**
 * Project 01 — Aura Residence (Architecture)
 * Aligns with arch-scrub.jpg:
 * - Cantilevered roof wing on the right (sloping upward to parapet cap)
 * - Low board-formed concrete mass on the left
 * - Full-height glass sliding portals and mullions
 * - Foreground reflection pool waterline and timber deck terrace
 */
function ArchitecturePavilionLinework() {
  return (
    <svg
      viewBox="0 0 1000 625"
      fill="none"
      style={{ width: '100%', height: '100%', stroke: 'var(--ink)', strokeWidth: 1.5 }}
      aria-label="Architectural elevation linework of Aura Residence pavilion"
    >
      {/* Structural Construction Datum Grid */}
      <g opacity="0.3" strokeDasharray="6 4">
        <line x1="60" y1="120" x2="940" y2="120" />
        <line x1="60" y1="280" x2="940" y2="280" />
        <line x1="60" y1="480" x2="940" y2="480" />
        <line x1="160" y1="60" x2="160" y2="560" />
        <line x1="480" y1="60" x2="480" y2="560" />
        <line x1="780" y1="60" x2="780" y2="560" />
      </g>

      {/* Ground & Pool Horizon Line */}
      <line className="d" x1="60" y1="480" x2="940" y2="480" strokeWidth="2.2" />

      {/* Foreground Reflection Pool Rim & Stepping Terraces */}
      <polygon
        className="d"
        points="80,560 620,480 820,480 340,580"
        strokeWidth="1.8"
        stroke="var(--ink)"
      />
      <line className="d" x1="100" y1="540" x2="600" y2="488" strokeDasharray="4 4" opacity="0.5" />
      <text
        x="240"
        y="535"
        fill="var(--red)"
        style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', letterSpacing: '0.12em' }}
      >
        WL -0.450 M · REFLECTION POOL
      </text>

      {/* Left Wing: Board-Formed Concrete Monolith */}
      <g strokeWidth="2.4">
        <polygon points="100,240 480,240 480,480 100,480" />
        {/* Horizontal Timber Board Shuttering Grooves */}
        <line className="d" x1="100" y1="280" x2="480" y2="280" strokeWidth="1" opacity="0.5" />
        <line className="d" x1="100" y1="320" x2="480" y2="320" strokeWidth="1" opacity="0.5" />
        <line className="d" x1="100" y1="360" x2="480" y2="360" strokeWidth="1" opacity="0.5" />
        <line className="d" x1="100" y1="400" x2="480" y2="400" strokeWidth="1" opacity="0.5" />
        <line className="d" x1="100" y1="440" x2="480" y2="440" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Left Portal Recess & Sliding Glazing */}
      <rect className="d" x="260" y="275" width="200" height="205" strokeWidth="1.6" />
      <line className="d" x1="360" y1="275" x2="360" y2="480" strokeWidth="1.2" />

      {/* Right Wing: High-Ceiling Cantilever Volume with Dramatic Overhang */}
      <polygon
        className="d"
        points="460,240 920,160 920,440 800,480 460,480"
        strokeWidth="2.6"
      />
      {/* Cantilever Roof Fascia & Soffit */}
      <line className="d" x1="450" y1="230" x2="930" y2="150" strokeWidth="3.2" stroke="var(--ink)" />
      <line className="d" x1="460" y1="240" x2="920" y2="160" strokeWidth="1.8" />

      {/* Floor-to-Ceiling Glazing Sliders (Right Volume) */}
      <g strokeWidth="1.6">
        <polygon points="530,260 760,220 760,460 530,470" />
        <line className="d" x1="605" y1="247" x2="605" y2="463" strokeWidth="1.2" />
        <line className="d" x1="680" y1="234" x2="680" y2="461" strokeWidth="1.2" />

        <polygon points="760,220 830,205 830,450 760,460" />
      </g>

      {/* Outdoor Timber Sun Deck (Far Right) */}
      <polygon className="d" points="800,480 940,480 950,520 780,520" strokeWidth="1.4" />
      <line className="d" x1="810" y1="490" x2="935" y2="490" strokeDasharray="3 3" opacity="0.6" />
      <line className="d" x1="800" y1="505" x2="945" y2="505" strokeDasharray="3 3" opacity="0.6" />

      {/* Architectural Dimension Strings (Red) */}
      <g stroke="var(--red)" strokeWidth="1.2">
        {/* Horizontal dimension across main facade */}
        <line className="d" x1="100" y1="180" x2="920" y2="180" />
        <line x1="100" y1="172" x2="100" y2="188" />
        <line x1="480" y1="172" x2="480" y2="188" />
        <line x1="920" y1="172" x2="920" y2="188" />
        {/* Ticks */}
        <line x1="97" y1="183" x2="103" y2="177" strokeWidth="1.8" />
        <line x1="477" y1="183" x2="483" y2="177" strokeWidth="1.8" />
        <line x1="917" y1="183" x2="923" y2="177" strokeWidth="1.8" />
        <text
          x="290"
          y="170"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          fill="var(--red)"
          textAnchor="middle"
          letterSpacing="0.12em"
        >
          14,200 MM (WEST WING)
        </text>
        <text
          x="700"
          y="170"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          fill="var(--red)"
          textAnchor="middle"
          letterSpacing="0.12em"
        >
          12,400 MM (CANOPY WING)
        </text>

        {/* Vertical dimension for roof overhang */}
        <line className="d" x1="945" y1="150" x2="945" y2="480" />
        <line x1="937" y1="150" x2="953" y2="150" />
        <line x1="937" y1="480" x2="953" y2="480" />
        <text
          x="975"
          y="320"
          fontFamily="var(--font-mono, monospace)"
          fontSize="10"
          fill="var(--red)"
          textAnchor="middle"
          letterSpacing="0.12em"
          transform="rotate(90, 975, 320)"
        >
          +4.60 M CANTILEVER
        </text>
      </g>

      {/* Studio Specification Callouts */}
      <g fill="var(--ink)">
        <text
          x="120"
          y="265"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          letterSpacing="0.08em"
          opacity="0.85"
        >
          300mm Board-formed concrete
        </text>
        <text
          x="550"
          y="285"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          letterSpacing="0.08em"
          opacity="0.85"
        >
          Double-glazed thermal sliders
        </text>
      </g>
    </svg>
  );
}

/**
 * Project 02 — Clay & Timber Residence (Interior)
 * Aligns with interior-scrub.jpg:
 * - Fluted hydraulic lime plaster columns flanking left & right
 * - Heavy exposed timber rafters & roof ridge with clerestory skylight
 * - Large garden aperture in center background with lounge seating
 * - Foreground solid teak dining table & cane chairs
 */
function InteriorResidenceLinework() {
  return (
    <svg
      viewBox="0 0 1000 625"
      fill="none"
      style={{ width: '100%', height: '100%', stroke: 'var(--ink)', strokeWidth: 1.5 }}
      aria-label="Interior architectural section linework of Clay and Timber Residence"
    >
      {/* Ceiling Pitch & Timber Rafter Trusses */}
      <g strokeWidth="2.4">
        {/* Ridge and sloping roof beams */}
        <line className="d" x1="80" y1="120" x2="500" y2="50" />
        <line className="d" x1="500" y1="50" x2="920" y2="120" />
        <line className="d" x1="80" y1="150" x2="920" y2="150" strokeWidth="2.8" />
        {/* King post */}
        <line className="d" x1="500" y1="50" x2="500" y2="150" strokeWidth="2" />
        {/* Clerestory Skylight Header */}
        <rect className="d" x="400" y="70" width="200" height="40" stroke="var(--red)" strokeWidth="1.4" />
        <text
          x="500"
          y="95"
          textAnchor="middle"
          fill="var(--red)"
          style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '9px', letterSpacing: '0.14em' }}
        >
          CLERESTORY SKYLIGHT
        </text>
      </g>

      {/* Rafter Beams Spacing (c/c 600mm) */}
      <g opacity="0.4" strokeWidth="1.2">
        <line x1="200" y1="130" x2="200" y2="150" />
        <line x1="300" y1="110" x2="300" y2="150" />
        <line x1="400" y1="90" x2="400" y2="150" />
        <line x1="600" y1="90" x2="600" y2="150" />
        <line x1="700" y1="110" x2="700" y2="150" />
        <line x1="800" y1="130" x2="800" y2="150" />
      </g>

      {/* Left Fluted Plaster Columns */}
      <g strokeWidth="2">
        <path d="M 60 150 Q 150 150, 180 200 L 180 580 L 60 580 Z" />
        {/* Fluted Vertical Grooves */}
        <line className="d" x1="80" y1="160" x2="80" y2="580" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="100" y1="165" x2="100" y2="580" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="120" y1="170" x2="120" y2="580" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="140" y1="175" x2="140" y2="580" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="160" y1="185" x2="160" y2="580" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Right Fluted Plaster Wall */}
      <g strokeWidth="2">
        <path d="M 740 150 L 920 150 L 920 580 L 740 580 Z" />
        <line className="d" x1="760" y1="150" x2="760" y2="580" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="780" y1="150" x2="780" y2="580" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="800" y1="150" x2="800" y2="580" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="820" y1="150" x2="820" y2="580" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="840" y1="150" x2="840" y2="580" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Central Garden Portal & Sliding Steel French Doors */}
      <g strokeWidth="1.8">
        <rect className="d" x="380" y="190" width="220" height="230" />
        <line className="d" x1="490" y1="190" x2="490" y2="420" />
        {/* Exterior Courtyard Foliage Contours in Portal */}
        <path className="d" d="M 400 360 Q 430 300, 470 330 T 580 340" stroke="var(--ink)" opacity="0.5" />
        {/* Sectional Sofa Outline in Living Zone */}
        <rect className="d" x="480" y="340" width="160" height="70" strokeWidth="1.2" opacity="0.8" />
      </g>

      {/* Foreground Dining Table & Cane Chairs */}
      <g strokeWidth="2.2">
        {/* Table top */}
        <polygon points="500,430 880,430 840,480 460,480" />
        {/* Table legs */}
        <line className="d" x1="500" y1="480" x2="490" y2="570" strokeWidth="2.8" />
        <line className="d" x1="820" y1="480" x2="810" y2="570" strokeWidth="2.8" />

        {/* Chair Profiles */}
        <rect className="d" x="480" y="470" width="60" height="90" strokeWidth="1.4" />
        <rect className="d" x="580" y="470" width="60" height="90" strokeWidth="1.4" />
        <rect className="d" x="680" y="470" width="60" height="90" strokeWidth="1.4" />
        <rect className="d" x="780" y="470" width="60" height="90" strokeWidth="1.4" />
      </g>

      {/* Dimension Strings (Red) */}
      <g stroke="var(--red)" strokeWidth="1.2">
        <line className="d" x1="180" y1="230" x2="740" y2="230" />
        <line x1="180" y1="222" x2="180" y2="238" />
        <line x1="740" y1="222" x2="740" y2="238" />
        <text
          x="460"
          y="220"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          fill="var(--red)"
          textAnchor="middle"
          letterSpacing="0.12em"
        >
          7,200 MM (UNBROKEN TRANSVERSE AXIS)
        </text>
      </g>

      {/* Annotations */}
      <g fill="var(--ink)">
        <text
          x="200"
          y="280"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          letterSpacing="0.08em"
          opacity="0.85"
        >
          Fluted hydraulic lime plaster
        </text>
        <text
          x="530"
          y="415"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          letterSpacing="0.08em"
          opacity="0.85"
        >
          Solid Indian teak & woven cane
        </text>
      </g>
    </svg>
  );
}

/**
 * Project 03 — Basalt Courtyard & Rain Garden (Landscape)
 * Aligns with landscape-scrub.jpg:
 * - Stepped basalt retention planter terraces on the left
 * - Central linear rainwater reflection pool with lily pads
 * - Covered timber veranda on the right with stone masonry columns
 * - Concrete boundary wall with creeping foliage
 */
function LandscapeCourtyardLinework() {
  return (
    <svg
      viewBox="0 0 1000 625"
      fill="none"
      style={{ width: '100%', height: '100%', stroke: 'var(--ink)', strokeWidth: 1.5 }}
      aria-label="Landscape section linework of Basalt Courtyard and Rain Garden"
    >
      {/* Background Pavilion & Boundary Wall */}
      <g strokeWidth="1.8">
        <rect className="d" x="60" y="80" width="280" height="240" opacity="0.8" />
        <rect className="d" x="380" y="140" width="160" height="180" strokeWidth="1.4" opacity="0.6" />
        <line className="d" x1="420" y1="180" x2="500" y2="180" strokeWidth="1" />
      </g>

      {/* Left Stepped Basalt Terraces */}
      <g strokeWidth="2.2">
        {/* Tier 1 (Lowest) */}
        <polygon points="60,480 380,480 340,580 60,580" fill="var(--wash-slab)" fillOpacity="0.15" />
        {/* Tier 2 (Mid) */}
        <polygon points="60,380 340,380 340,480 60,480" />
        {/* Tier 3 (High) */}
        <polygon points="60,280 280,280 280,380 60,380" />

        {/* Terrace Steps Tread Lines */}
        <line className="d" x1="60" y1="520" x2="360" y2="520" strokeWidth="1.2" opacity="0.5" />
        <line className="d" x1="60" y1="430" x2="340" y2="430" strokeWidth="1.2" opacity="0.5" />
        <line className="d" x1="60" y1="330" x2="280" y2="330" strokeWidth="1.2" opacity="0.5" />
      </g>

      {/* Central Linear Rainwater Reflection Pool */}
      <g strokeWidth="2.4">
        <polygon
          className="d"
          points="380,420 560,420 680,600 340,600"
          stroke="var(--ink)"
          fill="var(--wash-glass)"
          fillOpacity="0.25"
        />
        {/* Water Level Ripples & Lily Pads */}
        <ellipse cx="440" cy="460" rx="20" ry="8" stroke="var(--red)" strokeWidth="1" />
        <ellipse cx="500" cy="510" rx="30" ry="12" stroke="var(--red)" strokeWidth="1" />
        <ellipse cx="430" cy="550" rx="35" ry="14" stroke="var(--red)" strokeWidth="1" />
        <text
          x="480"
          y="490"
          textAnchor="middle"
          fill="var(--red)"
          style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '9px', letterSpacing: '0.12em' }}
        >
          BIO-RETENTION SWALE
        </text>
      </g>

      {/* Right Covered Veranda with Heavy Stone Masonry Columns */}
      <g strokeWidth="2.4">
        {/* Sloping Timber Veranda Roof */}
        <polygon points="560,200 940,30 980,60 620,240" fill="var(--wash-timber)" fillOpacity="0.2" />
        <line className="d" x1="550" y1="195" x2="945" y2="25" strokeWidth="3" stroke="var(--ink)" />

        {/* Stone Masonry Column 1 */}
        <rect className="d" x="610" y="240" width="55" height="280" strokeWidth="2.2" />
        <line className="d" x1="610" y1="300" x2="665" y2="300" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="610" y1="360" x2="665" y2="360" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="610" y1="420" x2="665" y2="420" strokeWidth="1" opacity="0.6" />

        {/* Stone Masonry Column 2 */}
        <rect className="d" x="675" y="220" width="55" height="300" strokeWidth="2.2" />
        <line className="d" x1="675" y1="280" x2="730" y2="280" strokeWidth="1" opacity="0.6" />
        <line className="d" x1="675" y1="340" x2="730" y2="340" strokeWidth="1" opacity="0.6" />

        {/* Veranda Paved Terrace Floor */}
        <polygon className="d" points="665,520 950,520 960,600 680,600" strokeWidth="1.6" />
      </g>

      {/* Dimension Strings (Red) */}
      <g stroke="var(--red)" strokeWidth="1.2">
        <line className="d" x1="60" y1="250" x2="610" y2="250" />
        <line x1="60" y1="242" x2="60" y2="258" />
        <line x1="610" y1="242" x2="610" y2="258" />
        <text
          x="330"
          y="240"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          fill="var(--red)"
          textAnchor="middle"
          letterSpacing="0.12em"
        >
          18,000 MM COURTYARD LENGTH
        </text>
      </g>

      {/* Annotations */}
      <g fill="var(--ink)">
        <text
          x="80"
          y="310"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          letterSpacing="0.08em"
          opacity="0.85"
        >
          Stepped basalt stone terraces
        </text>
        <text
          x="680"
          y="270"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          letterSpacing="0.08em"
          opacity="0.85"
        >
          Chiseled basalt masonry pillars
        </text>
      </g>
    </svg>
  );
}

/**
 * Project 04 — Kanso Credenza & Task Lamp (Product)
 * Aligns with product-scrub.jpg:
 * - Minimalist brass task floor lamp (slender vertical tube, right-angle arm, cylindrical shade)
 * - Tailored mid-century lounge armchair with tapered angled legs
 * - Low credenza console with chamfered shadow reveal
 * - Wall-mounted geometric artwork frame
 */
function ProductFurnitureLinework() {
  return (
    <svg
      viewBox="0 0 1000 625"
      fill="none"
      style={{ width: '100%', height: '100%', stroke: 'var(--ink)', strokeWidth: 1.5 }}
      aria-label="Product design and furniture drafting linework of Kanso Credenza and Brass Task Lamp"
    >
      {/* Wall Corner Datum & Horizon */}
      <line className="d" x1="60" y1="480" x2="940" y2="480" strokeWidth="2.2" />
      <line className="d" x1="200" y1="60" x2="200" y2="580" strokeWidth="2.4" />

      {/* Background Millwork Cabinetry (Left) */}
      <rect className="d" x="60" y="60" width="140" height="420" strokeWidth="2" opacity="0.8" />
      <line className="d" x1="60" y1="260" x2="200" y2="260" strokeWidth="1.2" />

      {/* Framed Minimalist Geometric Artwork on Wall */}
      <g strokeWidth="1.8">
        <rect className="d" x="460" y="100" width="180" height="220" />
        <circle cx="530" cy="230" r="34" stroke="var(--red)" strokeWidth="1.5" />
        <line className="d" x1="490" y1="140" x2="610" y2="210" strokeWidth="1.2" />
      </g>

      {/* Bespoke Brass Task Floor Lamp */}
      <g stroke="var(--ink)" strokeWidth="2.2">
        {/* Circular weighted brass base */}
        <ellipse className="d" cx="280" cy="500" rx="55" ry="16" strokeWidth="2.6" />
        {/* Slender vertical tubular stem */}
        <line className="d" x1="270" y1="500" x2="270" y2="140" strokeWidth="3" stroke="var(--red)" />
        {/* Horizontal Cantilever Arm */}
        <line className="d" x1="270" y1="140" x2="400" y2="140" strokeWidth="3" stroke="var(--red)" />
        {/* Cylindrical Luminaire Head */}
        <rect className="d" x="390" y="125" width="22" height="60" stroke="var(--red)" strokeWidth="2.2" fill="var(--paper)" />
        {/* Downlight Beam Cones (Dashed) */}
        <line className="d" x1="390" y1="185" x2="330" y2="340" stroke="var(--red)" strokeDasharray="3 3" opacity="0.4" />
        <line className="d" x1="412" y1="185" x2="470" y2="340" stroke="var(--red)" strokeDasharray="3 3" opacity="0.4" />
      </g>

      {/* Mid-Century Lounge Armchair */}
      <g strokeWidth="2.4">
        {/* Chair Backrest & Seat Cushion Contours */}
        <path
          className="d"
          d="M 370 330 C 360 410, 360 450, 390 480 L 620 480 C 650 450, 650 410, 630 330 Z"
          fill="var(--wash-sand)"
          fillOpacity="0.3"
        />
        {/* Seat Cushion Top */}
        <rect className="d" x="390" y="420" width="230" height="60" rx="8" strokeWidth="2" />

        {/* Tapered Turned Timber Legs */}
        <line className="d" x1="400" y1="480" x2="385" y2="530" strokeWidth="3.2" />
        <line className="d" x1="610" y1="480" x2="625" y2="530" strokeWidth="3.2" />
        <line className="d" x1="435" y1="480" x2="430" y2="520" strokeWidth="2.2" opacity="0.6" />
        <line className="d" x1="575" y1="480" x2="580" y2="520" strokeWidth="2.2" opacity="0.6" />
      </g>

      {/* Marble & Brass Pedestal Side Table with Plant Vase */}
      <g strokeWidth="1.6">
        <ellipse cx="690" cy="380" rx="45" ry="12" />
        <line x1="690" y1="392" x2="690" y2="470" strokeWidth="2.4" stroke="var(--red)" />
        <rect x="675" y="470" width="30" height="30" strokeWidth="2" />
        {/* Glass Vase & Floral Stems */}
        <rect x="682" y="300" width="16" height="70" strokeWidth="1.2" />
        <path d="M 690 300 Q 670 240, 660 210" stroke="var(--wash-shrub)" strokeWidth="1.8" />
        <path d="M 690 300 Q 710 240, 730 200" stroke="var(--wash-shrub)" strokeWidth="1.8" />
      </g>

      {/* Low Architectural Media Credenza (Right) */}
      <g strokeWidth="2.4">
        {/* Cabinet Body */}
        <rect className="d" x="740" y="370" width="200" height="110" />
        <line className="d" x1="740" y1="425" x2="940" y2="425" strokeWidth="1.4" />
        <line className="d" x1="840" y1="370" x2="840" y2="480" strokeWidth="1.4" />

        {/* 45° Chamfer Shadow Reveal */}
        <rect className="d" x="750" y="480" width="180" height="15" stroke="var(--red)" strokeWidth="1.4" />
        <text
          x="840"
          y="492"
          textAnchor="middle"
          fill="var(--red)"
          style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '8px', letterSpacing: '0.14em' }}
        >
          CHAMFER REVEAL
        </text>

        {/* Minimalist Brass Feet */}
        <line className="d" x1="760" y1="495" x2="760" y2="515" strokeWidth="3" />
        <line className="d" x1="920" y1="495" x2="920" y2="515" strokeWidth="3" />
      </g>

      {/* Technical Dimension Strings (Red) */}
      <g stroke="var(--red)" strokeWidth="1.2">
        {/* Lamp Height */}
        <line className="d" x1="230" y1="125" x2="230" y2="500" />
        <line x1="222" y1="125" x2="238" y2="125" />
        <line x1="222" y1="500" x2="238" y2="500" />
        <text
          x="215"
          y="310"
          fontFamily="var(--font-mono, monospace)"
          fontSize="10"
          fill="var(--red)"
          textAnchor="middle"
          letterSpacing="0.1em"
          transform="rotate(-90, 215, 310)"
        >
          H 1,450 MM (LUMINAIRE SOFFIT)
        </text>

        {/* Chair Width */}
        <line className="d" x1="370" y1="550" x2="640" y2="550" />
        <line x1="370" y1="542" x2="370" y2="558" />
        <line x1="640" y1="542" x2="640" y2="558" />
        <text
          x="505"
          y="570"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          fill="var(--red)"
          textAnchor="middle"
          letterSpacing="0.12em"
        >
          W 820 MM (LOUNGE CHAIR)
        </text>
      </g>

      {/* Annotations */}
      <g fill="var(--ink)">
        <text
          x="280"
          y="115"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          letterSpacing="0.08em"
          opacity="0.85"
        >
          Solid unlacquered brass ø25mm
        </text>
        <text
          x="750"
          y="355"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          letterSpacing="0.08em"
          opacity="0.85"
        >
          Teak credenza · 45° shadow reveal
        </text>
      </g>
    </svg>
  );
}
