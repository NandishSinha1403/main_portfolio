# Design Spec — Cinematic Noir + Silk

## Fonts (final — free only)
- **Headings**: Fraunces (variable, Google Fonts). Use its full range: Thin Italic (100 italic) for accent labels, Black (900) for display headlines. This replaces "ZTNature" everywhere below — same intent (extreme weight contrast), free and distinctive.
- **Body**: Hanken Grotesk (Google Fonts). Quiet, stays out of Fraunces' way.
- **Mono / sub-labels**: JetBrains Mono or IBM Plex Mono (Google Fonts), 14px, for category tags.
- Do not use Inter or any generic system sans as a substitute.

## Color palette
- Backgrounds: Deep Black `#000000`, Zinc Black `#09090b`, Surface Gray `#18181b`, Pure White `#FFFFFF`, Ghost White `#fafafa`
- Foreground: Off-White `#e5e5e5`, Muted Gray `#888`, Deep Black `#000000`
- Highlight: Red `#ef4444` (selection/accent only — nowhere else)
- No other vibrant colors. No rounded corners anywhere — sharp, architectural edges only.

## Global background: Silk shader
Persistent, full-page, fixed WebGL canvas behind every section (not swapped out for white sections — white sections sit on top of it via their own opaque background color, so Silk is only visible where a section is intentionally transparent/dark, e.g. hero, manifesto).
- Ground `#0F0D2B`, accents `#9890FA` and `#EDECFF`. Keep to these 2-3 values.
- Two-level domain-warped fbm folded through sine → continuous ribbons, not marbling.
- Pointer movement raises a smoothed "intensity" uniform; relaxes when pointer leaves.
- `<canvas>` fixed, inset 0, behind all content (z-index below page content, above page background color).
- Fallback: hidden panel shown only if WebGL context creation fails.
- Respect `prefers-reduced-motion`: render a single static frame, no animation loop.
- **Suppression**: the raw shader overwhelms foreground content, so it is pushed back with pure CSS over an untouched canvas — a blur plus a ground-colored scrim, both tunable via `BLUR_PX` and `SCRIM_OPACITY` constants at the top of `SilkBackground.tsx`. Current values: 2.5px blur, 0.4 scrim.

## Motion
- Entrance easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Scroll-linked transforms via GSAP ScrollTrigger: background/image scale 1.0→1.27, hero heading scale 1.0→0.89, both tied to scroll position (not on-load).
- `transform-style: preserve-3d` and `will-change: transform` on scroll-scaled elements for GPU acceleration.
- Noise/grain overlay at 15% opacity, `mix-blend-overlay`, across the whole site.

## Sections (top to bottom)

### Nav
Fixed, `top-0 w-full z-50`, `px-6 py-6`. **Glassmorphism**: `backdrop-blur-xl` over a dark tint (`rgba(15,13,43,0.55)`) with a hairline bottom border (`rgba(229,229,229,0.12)`). Links stay `#e5e5e5` throughout.

This replaces the original `mix-blend-difference` approach. The blend mode inverted the links against the indigo shader and rendered them a pale yellow-green; the dark-tinted glass solves the same problem — legibility over both the dark Silk and the light Selected Works section — while keeping the links a true off-white.

Links 18px/500, tight tracking. Desktop: horizontal flex, 3rem gap. Mobile: single Lucide `Menu` icon → full-screen overlay menu.

### Opening / intro section (do not call it "Hero" in UI or copy — internal dev label only)
`min-h-[100vh]` (min 857px). Silk visible behind it.
- Back layer: subtle radial tint + grain over Silk, scale-linked to scroll (1.0→1.27).
- Mid layer: name/display heading, 11–12vw, Fraunces Black, `#e5e5e5`, scale-linked to scroll (1.0→0.89).
- Overlay: role/sub-label (Fraunces Thin Italic, ~32px) positioned `left-[calc(100%+1rem)]` relative to heading, fades out on scroll.
- Bottom: one-line summary, `max-w-2xl`, white/70% opacity.

### Selected Work (project grid)
Background `#FFFFFF` (opaque — Silk not visible here), text `#000000`. `py-24 px-6`.
Heading: "SELECTED WORKS" — "SELECTED" 8vw Black, "WORKS" italic Thin.
Grid: 2-column, 2rem gap (collapses to 1 column under ~768px).
Cards: aspect 16:10 desktop / 4:5 mobile, background `#18181b` for the image layer, zoom 1.05 on hover. Title bottom-aligned, `translateY(1rem)→0` on hover. Hover reveals white circular button with Lucide `ArrowUpRight`. Metadata translates `4px→0` on hover, action button fades `0→1` over 300ms.
Use the 4 projects from PRD.md in order: Samadhan AI, PRGI, MarketScope, Grector.

### Manifesto / achievements
Background `#09090b`, `100vh`, Silk visible behind (dark, so it reads through). Centered text, 5–7vw, Fraunces Medium, tight leading. Text slides up + fades in on scroll-into-view. Below: horizontal line `#ffffff/30%`, animates width `0→100%` (max 320px) on scroll-into-view.
Content: pull from PRD.md "Achievements" — do not pad with invented lines.

### Skills strip
Simple, quiet section between manifesto and contact — grouped list from PRD.md Technical Skills. Mono sub-labels for group names (Languages, Backend & Real-time, AI/ML, Cloud & DevOps, Mobile & Tools).

### Contact / footer
Background `#fafafa`. `py-20 px-6`. Top: full-width `border-b`, "START A PROJECT" 12vw Black uppercase (or a variant that isn't a fake CTA — he's a student, "LET'S TALK" or similar works too — copy decision, not a content invention issue). Bottom: 3-column grid — Col 1: social links (GitHub, LinkedIn) with wavy-underline hover; Col 2: email, 3xl; Col 3: rights-reserved text, bottom-right aligned.

## Special notes
- MUST: full weight range (100–900) on Fraunces, used deliberately (thin italic next to black, never mid-weights for display type).
- MUST: grain overlay site-wide.
- MUST: nav stays legible across all section backgrounds — handled by the dark-tinted glass bar, not `mix-blend-difference`.
- DO NOT: rounded corners anywhere.
- DO NOT: any color outside the palette above, except the single red accent.
- DO NOT: call the intro section "Hero" in any user-facing copy.
