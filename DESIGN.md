# Design Spec — Cinematic Noir + Liquid Metal

## Fonts (final — free, self-hosted)
- **Headings**: Clash Display (Fontshare, ITF Free Font License). Weight 700 for display, 200 for light sub-labels — the weight contrast replaces the old thin-italic/black serif pairing.
- **Body**: Satoshi (Fontshare), weight 500.
- **Mono / sub-labels**: JetBrains Mono, 14px, for category tags.
- Neither Clash Display nor Satoshi is on Google Fonts or fontsource, so the woff2 files are vendored in `src/fonts/` and declared in `src/fonts/fonts.css`. No runtime CDN dependency.
- **Clash Display has no italic and no weight below 200.** Never apply `italic` to it — the browser will synthesize a sheared oblique. If a true italic is ever needed, it must come from a second family.
- Display tracking: around `-0.005em` with `wordSpacing: 0.08em`. Tighter values collide glyphs in long mixed-case strings; the very tight tracking seen in all-caps references does not transfer.
- Do not use Inter or any generic system sans as a substitute.

## Color palette
Fully monochromatic, with one red accent. The site has no other chroma anywhere.

- Backgrounds: Metal Black `#0F0F0F`, Deep Black `#0A0A0A`, Surface Gray `#18181b`, Pure White `#FFFFFF`, Ghost White `#fafafa`
- Foreground: Off-White `#e5e5e5`, Bright White `#F5F5F5`, Muted Gray `#888`, Deep Black `#000000`
- Highlight: Red `#ef4444`

**On the red**: keep it scarce — `::selection` and the project-card hover affordance, nothing else. A single chroma on neutral greyscale is powerful precisely because it is rare. It must only ever sit on a controlled flat surface, never directly on the shader, where a white blowout would swallow it.

No rounded corners anywhere — sharp, architectural edges only.

## Background: Liquid Metal (opening section only)

**This is deliberately NOT a persistent whole-page background.** An earlier revision ran a shader behind every section; that was abandoned once Liquid Metal's real output was seen. The effect spans the full 0–255 range — near-pure white regions adjacent to true black — so no single text color survives on top of it, and suppressing it enough to be type-safe (a scrim around 0.75) destroys the specular contrast that makes it worth having. It is a foreground image, not a wallpaper.

So: the shader runs at **full strength behind the opening section only**, at `100vh`. Everything below settles onto flat section backgrounds. The shader is an entrance, not a texture.

### Shader spec
- Ground `#0F0F0F`, accents `#F5F5F5` and `#0A0A0A`. No chroma anywhere at all.
- A steep value ramp with a narrow specular: a two-level domain-warped field taken through a steep smoothstep, plus a narrow eighth-power highlight band and a cubed dark term.
- GLSL preamble (shared, reusable): hashed value noise, six-octave fbm, two-level domain-warp helper.
- Uniforms: resolution, time, and a smoothed pointer-intensity uniform — pointer movement raises intensity, which eases back down when the pointer stops or leaves.
- `prefers-reduced-motion`: render a single static frame, no rAF loop.
- No-WebGL fallback: a hidden panel behind the canvas, shown only if context creation fails, filled with the ground color.
- DPR-aware resize, capped at 2x. Clean up rAF and listeners on unmount.
- **Do not** call `WEBGL_lose_context` in effect cleanup — `getContext()` returns the same context per canvas, so losing it leaves StrictMode's second mount with a dead context and nothing renders.
- Canvas is `absolute inset-0` **within the opening section**, not `fixed` to the viewport. `pointer-events: none`; track the pointer via a window listener.

### Type legibility over the shader
The name sits directly on the shader, which is the one place type and blowouts overlap. Carve a controlled surface behind it — a soft dark plate (radial or linear gradient from `rgba(10,10,10,0.85)` at center to transparent at the edges) between canvas and text. This keeps the specular visible around the type while guaranteeing contrast under it. Do not solve this by scrimming the whole canvas.

## Motion
- Entrance easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Scroll-linked transforms via GSAP ScrollTrigger: background scale 1.0→1.27, opening heading scale 1.0→0.89, both tied to scroll position (not on-load).
- `transform-style: preserve-3d` and `will-change: transform` on scroll-scaled elements for GPU acceleration.
- Grain overlay at 15% opacity, `mix-blend-overlay`, across the whole site.

## Sections (top to bottom)

### Nav
Fixed, `top-0 w-full z-50`, `px-6 py-6`. **Glassmorphism**: `backdrop-blur-xl` over a dark neutral tint (`rgba(10,10,10,0.55)`) with a hairline bottom border (`rgba(229,229,229,0.12)`). Links stay `#e5e5e5` throughout.

This replaces an earlier `mix-blend-difference` approach, which inverted the links to a pale yellow-green. The dark-tinted glass solves the same problem — legibility over both the dark opening section and the light Selected Works section — while keeping links a true off-white.

Links 18px/500, tight tracking. Desktop: horizontal flex, 3rem gap. Mobile: single Lucide `Menu` icon → full-screen overlay menu.

### Opening section (do not call it "Hero" in UI or copy — internal dev label only)
`min-h-[100vh]` (min 857px). Liquid Metal at full strength behind it, plus the dark plate described above.
- Back layer: the shader canvas, scale-linked to scroll (1.0→1.27).
- Mid layer: name/display heading, 11–12vw, Clash Display 700, `#F5F5F5`, scale-linked to scroll (1.0→0.89).
- Sub-label: role line (Clash Display 200, ~32px) stacked beneath the name. It does NOT fade on scroll — an earlier scrub to opacity 0 read as a glitch. It is also not positioned beside the heading; at display size the name spans the viewport and the label was clipped off-screen.
- Bottom: one-line summary, `max-w-2xl`, `#e5e5e5` at 70% opacity.

### Selected Work (project grid)
Background `#FFFFFF`, text `#000000`. `py-24 px-6`. The black→white transition out of the opening section is a deliberate hard architectural flip — do not soften it with a gradient.
Heading: "SELECTED WORKS" — "SELECTED" 8vw at weight 700, "WORKS" at weight 200.
Grid: 2-column, 2rem gap (collapses to 1 column under ~768px).
Cards: aspect 16:10 desktop / 4:5 mobile, `#18181b` image layer, zoom 1.05 on hover. Title bottom-aligned, `translateY(1rem)→0` on hover. Hover reveals a white circular button with Lucide `ArrowUpRight`; this is where the red accent may appear. Metadata translates `4px→0`, action button fades `0→1` over 300ms.
Use the 4 projects from PRD.md in order: Samadhan AI, PRGI, MarketScope, Grector.

### Manifesto / achievements
Background `#0A0A0A`, `100vh`. Flat — no shader. Centered text, 5–7vw, Clash Display 500, tight leading. Text slides up + fades in on scroll-into-view. Below: horizontal line `#ffffff/30%`, animating width `0→100%` (max 320px) on scroll-into-view.
Content: from PRD.md "Achievements" — do not pad with invented lines.

### Skills strip
Background `#0F0F0F`. Quiet section between manifesto and contact — grouped list from PRD.md Technical Skills, mono sub-labels for group names (Languages, Backend & Real-time, AI/ML, Cloud & DevOps, Mobile & Tools).

### Contact / footer
Background `#fafafa`. `py-20 px-6`. Top: full-width `border-b`, "GET IN TOUCH" 12vw Black uppercase. Bottom: 3-column grid — Col 1: social links (GitHub, LinkedIn) with wavy-underline hover; Col 2: email, 3xl; Col 3: rights-reserved text, bottom-right aligned.

## Special notes
- MUST: use Clash Display's weight range deliberately — 700 display against 200 sub-labels, never mid-weights for display type.
- MUST: grain overlay site-wide.
- MUST: nav stays legible across all section backgrounds — handled by the dark-tinted glass bar.
- DO NOT: run the shader behind sections other than the opening one.
- DO NOT: use rounded corners anywhere.
- DO NOT: introduce any color outside the greyscale palette, except the single red accent.
- DO NOT: call the opening section "Hero" in any user-facing copy.
