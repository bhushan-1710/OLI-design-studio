import React from 'react';

/**
 * HeroElevation
 * Architectural elevation drawing of the two-storey residence.
 * Ported directly from docs/reference/oli-hero.html preserving exact coordinates,
 * layers (.cl, .s1, .s2, .dim, .note), marker washes, and wobble filter.
 */
export function HeroElevation() {
  return (
    <div className="art hero-art">
      <svg
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMax meet"
        role="img"
        aria-label="Elevation drawing of a two-storey house with a cantilevered upper floor, drawn in pencil and then coloured in"
      >
        <defs>
          <filter id="pencil">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves={2}
              seed={4}
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={2.4} />
          </filter>
          <clipPath id="rise">
            <rect id="riseRect" x="0" y="0" width="1200" height="640" />
          </clipPath>
        </defs>

        <g id="art" className="hero-art-drawing">
          {/* Marker Washes (Color Fill Group) */}
          <g id="washes" clipPath="url(#rise)" opacity="0.88">
            <rect x="40" y="520" width="1120" height="10" fill="var(--wash-ground, #bdb4a1)" />
            <rect x="220" y="340" width="540" height="180" fill="var(--wash-sand, #d8c8aa)" />
            <rect x="330" y="210" width="650" height="130" fill="var(--wash-concrete, #cdc6b8)" />
            <rect x="310" y="196" width="690" height="14" fill="var(--wash-slab, #4a4743)" />
            <rect x="380" y="240" width="360" height="70" fill="var(--wash-glass, #9db6ba)" />
            <rect x="790" y="240" width="150" height="70" fill="var(--wash-glass, #9db6ba)" />
            <rect x="420" y="380" width="280" height="140" fill="var(--wash-glass, #9db6ba)" />
            <rect x="300" y="410" width="70" height="110" fill="var(--wash-timber, #8a5a3c)" />
            <rect x="956" y="340" width="8" height="180" fill="#8d877c" />
            <rect x="116" y="430" width="8" height="90" fill="#6b5238" />
            <path
              d="M120 432C70 424 56 366 98 344C88 300 150 282 172 322C216 330 208 396 162 418C152 436 132 440 120 432Z"
              fill="var(--wash-sage, #8fa27a)"
            />
            <path
              d="M1100 520q8-34 26-34q18 0 26 34Z M1135 520q8-26 22-26q14 0 20 26Z"
              fill="var(--wash-shrub, #7c9168)"
            />
          </g>

          {/* Ink Linework */}
          <g className="ink">
            {/* Construction Lines (.cl) */}
            <path className="d cl" pathLength="1" d="M40 520H1160" />
            <path className="d cl" pathLength="1" d="M120 196H1100" />
            <path className="d cl" pathLength="1" d="M120 340H1000" />
            <path className="d cl" pathLength="1" d="M220 150V570" />
            <path className="d cl" pathLength="1" d="M330 150V570" />
            <path className="d cl" pathLength="1" d="M760 300V570" />
            <path className="d cl" pathLength="1" d="M980 150V570" />

            {/* Primary Outline (.s1) */}
            <path className="d s1" pathLength="1" d="M40 520H1160" />
            <path className="d s1" pathLength="1" d="M220 340V520M220 340H330M760 340V520M330 520H760" />
            <path className="d s1" pathLength="1" d="M330 340V210H980V340H760" />
            <path className="d s1" pathLength="1" d="M310 196H1000M310 210H1000M310 196V210M1000 196V210" />
            <path className="d s1" pathLength="1" d="M960 340V520M968 340V520" />

            {/* Secondary Detail Linework (.s2) */}
            <path
              className="d s2"
              pathLength="1"
              d="M380 240H740V310H380ZM470 240V310M560 240V310M650 240V310M790 240H940V310H790Z"
            />
            <path
              className="d s2"
              pathLength="1"
              d="M420 380H700V520H420ZM490 380V520M560 380V520M630 380V520M300 410H370V520H300ZM360 470h4"
            />
            <path
              className="d s2"
              pathLength="1"
              d="M120 520V430M120 432C70 424 56 366 98 344C88 300 150 282 172 322C216 330 208 396 162 418C152 436 132 440 120 432"
            />
            <path
              className="d s2"
              pathLength="1"
              d="M1100 520q8-34 26-34q18 0 26 34M1135 520q8-26 22-26q14 0 20 26"
            />
            <path
              className="d s2"
              pathLength="1"
              d="M60 532l-10 14M110 532l-10 14M160 532l-10 14M210 532l-10 14M260 532l-10 14M310 532l-10 14M360 532l-10 14M410 532l-10 14M460 532l-10 14M510 532l-10 14M560 532l-10 14M610 532l-10 14M660 532l-10 14M710 532l-10 14M760 532l-10 14M810 532l-10 14M860 532l-10 14M910 532l-10 14M960 532l-10 14"
            />
          </g>

          {/* Dimension Lines (.dim) */}
          <path className="d dim" pathLength="1" d="M220 592H980M220 582V602M980 582V602" />
          <path className="d dim" pathLength="1" d="M1060 210V520M1050 210H1070M1050 520H1070" />
          <path className="d dim" pathLength="1" d="M790 176C830 170 880 180 912 204M902 190l10 14l-16 2" />

          {/* Annotations (.note) */}
          <text className="note" x="600" y="578" textAnchor="middle">
            12.40 M
          </text>
          <text className="note" transform="translate(1044 370) rotate(-90)" textAnchor="middle">
            6.20 M
          </text>
          <text className="note" x="640" y="172">
            CANTILEVER · 3.0 M
          </text>
          <text className="note" x="436" y="366">
            FULL-HEIGHT GLAZING
          </text>
          <text className="note" x="302" y="402">
            ENTRY
          </text>

          {/* Handed Over Stamp */}
          <g className="stamp">
            <rect className="d" pathLength="1" x="890" y="40" width="250" height="64" />
            <text x="1015" y="87" textAnchor="middle">
              HANDED OVER
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
