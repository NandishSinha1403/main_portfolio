import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Manifesto / achievements section. See DESIGN.md "Manifesto / achievements"
// and PRD.md "Achievements". Flat background, no shader.
const ACHIEVEMENTS = [
  "2× National-Level Hackathon Finalist — SIH 2022, India Innovates 2026",
  "Participant, JPMC Code for Good 2026",
  "Participant, Google Kickstart 2020",
  "GitHub Arctic Code Vault Contributor (2020)",
  "University of Helsinki — Python Programming",
  "Java Certified, SoloLearn (2019)",
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

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
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
              trigger: statementRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
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
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
              trigger: ruleRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-24 md:flex-row md:items-center md:gap-16 md:py-0">
        {/* Portrait */}
        <div className="flex-shrink-0 md:w-2/5">
          <img
            src="/images/portrait.jpg"
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
              color: "#F5F5F5",
              letterSpacing: "-0.005em",
              wordSpacing: "0.08em",
            }}
          >
            I build backend, real-time, and AI-voice systems, and ship them to
            production.
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

          <ul className="font-mono mt-10 flex flex-col gap-3">
            {ACHIEVEMENTS.map((item) => (
              <li
                key={item}
                className="text-sm leading-relaxed"
                style={{ color: "#888", fontSize: "14px" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
