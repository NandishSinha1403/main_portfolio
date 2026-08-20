import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidMetalBackground from "../components/LiquidMetalBackground";

gsap.registerPlugin(ScrollTrigger);

// Opening section (internal dev label only — never call this "Hero" in
// user-facing copy). See DESIGN.md "Opening section" + "Background: Liquid
// Metal" + "Motion".
export default function Opening() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.27,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (headingRef.current) {
        gsap.to(headingRef.current, {
          scale: 0.89,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (roleRef.current) {
        gsap.to(roleRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: "857px" }}
    >
      {/* Layer 1: shader background, scroll-scaled */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
      >
        <LiquidMetalBackground />
      </div>

      {/* Layer 1.5: dark plate for type legibility, sized behind the heading block */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[110vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.6) 40%, transparent 75%)",
        }}
      />

      {/* Layer 2 + 3 + bottom: content */}
      <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
        <div className="relative inline-flex flex-col items-center">
          <h1
            ref={headingRef}
            className="font-heading leading-[0.9]"
            style={{
              fontSize: "clamp(3rem, 11vw, 11rem)",
              color: "#F5F5F5",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              willChange: "transform",
              transformStyle: "preserve-3d",
            }}
          >
            Nandish Sinha
          </h1>

          {/* Role sub-label. DESIGN.md specifies this hanging off the heading's
              right edge at left-[calc(100%+1rem)], but that only works if the
              heading leaves room beside it. At the specified 11vw the name
              spans nearly the full viewport, so the label was starting past
              the right edge and being clipped (~480px lost at 1470px wide).
              Stacked beneath the heading instead, which holds at every width. */}
          <p
            ref={roleRef}
            className="font-heading mt-4"
            style={{
              // Clash Display has no italic and no 100 weight, so the previous
              // Thin Italic treatment would have been a synthesized oblique.
              // Weight 200 against the heading's 700 gives real contrast.
              fontWeight: 200,
              fontSize: "clamp(1rem, 2.2vw, 2rem)",
              letterSpacing: "-0.02em",
              color: "#F5F5F5",
            }}
          >
            B.Tech CSE · ITER Bhubaneswar · 2024–2028
          </p>
        </div>

        <p
          className="font-body mt-8 max-w-2xl text-base md:text-lg font-medium"
          style={{ color: "#e5e5e5", opacity: 0.7 }}
        >
          CS undergrad building backend, real-time, and AI-voice systems.
          Two-time national hackathon finalist.
        </p>
      </div>
    </section>
  );
}
