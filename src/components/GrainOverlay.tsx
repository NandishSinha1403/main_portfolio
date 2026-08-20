/**
 * Site-wide film grain, per DESIGN.md ("MUST: grain overlay site-wide").
 *
 * The noise is an inline SVG feTurbulence data URI rather than a raster tile —
 * it stays crisp at any DPR and costs nothing to download. Fixed to the
 * viewport and pointer-events:none so it never intercepts interaction, and
 * sits above page content but below the nav.
 */
const GRAIN_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <rect width="200" height="200" filter="url(#n)" opacity="1"/>
  </svg>`
);

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
      style={{
        backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
        backgroundRepeat: "repeat",
        opacity: 0.15,
        mixBlendMode: "overlay",
      }}
    />
  );
}
