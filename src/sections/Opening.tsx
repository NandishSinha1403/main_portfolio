import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidMetalBackground from "../components/LiquidMetalBackground";

gsap.registerPlugin(ScrollTrigger);

const NAME = "Nandish Sinha";

// Opening section (internal dev label only — never call this "Hero" in
// user-facing copy). See DESIGN.md "Opening section" + "Background: Liquid
// Metal" + "Motion".
export default function Opening() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const chars = headingRef.current
        ? headingRef.current.querySelectorAll<HTMLElement>("[data-char]")
        : null;

      // Entrance: characters stagger in on load, independent of scroll.
      if (chars && chars.length) {
        gsap.fromTo(
          chars,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.1,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            stagger: 0.028,
            delay: 0.15,
          }
        );
      }

      if (roleRef.current) {
        gsap.fromTo(
          roleRef.current,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            delay: 0.9,
          }
        );
      }

      // matchMedia keeps the pinned/scrubbed heavy-lift transforms (shader
      // scale, heading scale, character drift) on larger screens where they
      // read cleanly, and swaps to a lighter fade for the scroll cue + role
      // label everywhere so nothing feels janky on small viewports.
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 769px)",
          isMobile: "(max-width: 768px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          if (bgRef.current) {
            gsap.to(bgRef.current, {
              scale: isDesktop ? 1.27 : 1.12,
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
              scale: isDesktop ? 0.89 : 0.95,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          // Per-character drift apart on scroll — only worth the cost on
          // wider screens where the name has room to breathe.
          if (isDesktop && chars && chars.length) {
            const mid = (chars.length - 1) / 2;
            chars.forEach((el, i) => {
              gsap.to(el, {
                x: (i - mid) * 3,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                },
              });
            });
          }
        }
      );

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

      if (cueRef.current) {
        gsap.fromTo(
          cueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 1.4, ease: "power1.out" }
        );
        gsap.to(cueRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "18% top",
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
            className="font-display leading-[0.9]"
            style={{
              fontSize: "clamp(3rem, 11vw, 11rem)",
              color: "#F5F5F5",
              fontWeight: 700,
              // -0.05em (from the reference) collides glyphs in long mixed-case
              // strings; that value suits short all-caps settings.
              letterSpacing: "-0.005em",
              wordSpacing: "0.08em",
              willChange: "transform",
              transformStyle: "preserve-3d",
            }}
          >
            {NAME.split("").map((char, i) =>
              char === " " ? (
                <span key={i} aria-hidden="true">
                  {" "}
                </span>
              ) : (
                <span
                  key={i}
                  data-char
                  className="inline-block overflow-hidden"
                  style={{ willChange: "transform" }}
                  aria-hidden="true"
                >
                  <span className="inline-block">{char}</span>
                </span>
              )
            )}
            <span className="sr-only">{NAME}</span>
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
          AI/ML and forward deployed engineer. Real-time voice systems, applied
          ML, and the infrastructure that keeps them running.
        </p>
      </div>

      {/* Scroll cue, fades out on first scroll */}
      <div
        ref={cueRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: 0 }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "rgba(229,229,229,0.6)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </div>
        <div
          className="mx-auto mt-2 h-8 w-px"
          style={{ backgroundColor: "rgba(229,229,229,0.35)" }}
        />
      </div>
    </section>
  );
}
