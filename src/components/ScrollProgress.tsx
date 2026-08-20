import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Thin fixed top progress bar. Subtle — off-white, 2px, scrubbed to overall
// document scroll. Skipped under prefers-reduced-motion (kept static/hidden
// since it has no informational purpose beyond the animation itself).
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !barRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[70] h-[2px] w-full"
      style={{ transformOrigin: "0% 50%" }}
    >
      <div
        ref={barRef}
        className="h-full w-full"
        style={{
          backgroundColor: "var(--color-fg)",
          transform: "scaleX(0)",
          transformOrigin: "0% 50%",
          willChange: "transform",
        }}
      />
    </div>
  );
}
