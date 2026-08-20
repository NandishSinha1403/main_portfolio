import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Manifesto / achievements section. See DESIGN.md "Manifesto / achievements"
// and PRD.md "Achievements". Flat background, no shader.
const ACHIEVEMENTS: { label: string; href?: string }[] = [
  { label: "2× National-Level Hackathon Finalist — SIH 2022, India Innovates 2026" },
  { label: "Participant, JPMorganChase & Co. Code for Good 2026" },
  { label: "Participant, Google Kickstart 2020" },
  { label: "GitHub Arctic Code Vault Contributor (2020)" },
  {
    label: "University of Helsinki — Python Programming",
    href: "https://certificates.mooc.fi/validate/8t4sd1ymoic",
  },
  { label: "Java Certified, SoloLearn (2019)" },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "var(--ease-out-expo)",
            scrollTrigger: {
              trigger: statementRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (ruleRef.current) {
        gsap.fromTo(
          ruleRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: 1,
            ease: "var(--ease-out-expo)",
            scrollTrigger: {
              trigger: ruleRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      if (achievementsRef.current) {
        gsap.fromTo(
          achievementsRef.current.children,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "var(--ease-out-expo)",
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // Classic scrollytelling parallax: the portrait drifts slower than the
      // text column while the section scrolls past. Desktop-only — on
      // narrower layouts the two stack vertically and a parallax offset just
      // introduces gaps/overlap risk against the text below it.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        if (portraitRef.current) {
          gsap.to(portraitRef.current, {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    // Trigger positions are measured before the portrait and webfonts finish
    // loading, which shifts layout underneath them. Without a refresh the
    // start points sit at stale offsets and reveals can fail to fire.
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--color-deep)" }}
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-24 md:flex-row md:items-center md:gap-16 md:py-0">
        {/* Portrait */}
        <div ref={portraitRef} className="flex-shrink-0 md:w-2/5" style={{ willChange: "transform" }}>
          <img
            src="/images/portrait-alt.jpg"
            alt="Portrait of Nandish Sinha"
            className="w-full object-cover"
            style={{ filter: "grayscale(1)" }}
          />
        </div>

        {/* Statement + achievements */}
        <div className="md:w-3/5">
          <p
            ref={statementRef}
            className="font-heading leading-[1.05]"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              fontWeight: 500,
              color: "var(--color-bright)",
              letterSpacing: "-0.005em",
              wordSpacing: "0.08em",
            }}
          >
            I build AI systems that talk to people, and the infrastructure that
            keeps them up.
          </p>

          <div
            ref={ruleRef}
            className="mt-10 h-px"
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              maxWidth: "320px",
              width: 0,
            }}
          />

          <ul ref={achievementsRef} className="font-mono mt-10 flex flex-col gap-3">
            {ACHIEVEMENTS.map((item) => (
              <li
                key={item.label}
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-muted)", fontSize: "14px" }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="achievement-link"
                  >
                    {item.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
