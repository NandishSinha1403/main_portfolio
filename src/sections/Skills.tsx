import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Skills strip — see DESIGN.md "Skills strip", "Color palette", "Fonts",
// "Motion". Two content blocks per PRD.md: Experience, then Skills. Quiet,
// restrained section — no rounded corners, no color outside the monochrome
// palette.

type ExperienceEntry = {
  role: string;
  org: string;
  meta: string;
  period: string;
  stats?: string;
  bullets: string[];
};

const experience: ExperienceEntry[] = [
  {
    role: "DevOps Volunteer",
    org: "AlgoArena",
    meta: "algorithm-arena.one · Club project, GDG ITER BBSR",
    period: "2025–Present",
    stats: "50+ challenges · 200+ coders · 1.5k+ submissions",
    bullets: [
      "Deployed on AWS EC2 via Docker Compose behind an Nginx reverse proxy, Certbot-managed HTTPS.",
      "MongoDB Atlas with indexed queries + connection pooling for 1,500+ submissions; basic uptime/error monitoring.",
      "systemd/PM2 process supervision for auto-restart and zero-downtime redeploys on merge.",
    ],
  },
  {
    role: "Tech Team Member",
    org: "GDG ITER BBSR",
    meta: "Google Developer Groups",
    period: "2024–Present",
    bullets: [
      "Collaborates with a student engineering team on technical events/projects under Google Developer Groups.",
    ],
  },
];

type SkillGroup = { label: string; items: string[] };

const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "Java", "C", "C++", "JavaScript (Node.js)"],
  },
  {
    label: "Backend & Real-time",
    items: [
      "FastAPI",
      "Django",
      "Node.js",
      "Express",
      "WebSocket",
      "Twilio",
      "Exotel",
    ],
  },
  {
    label: "AI/ML",
    items: [
      "Gemini 3.1/2.5",
      "Groq (Llama 3.1)",
      "Faster-Whisper",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS (EC2, Lightsail)",
      "Docker",
      "Nginx",
      "MongoDB Atlas",
      "Google Cloud",
      "PM2/systemd",
    ],
  },
  {
    label: "Mobile & Tools",
    items: ["React Native", "React", "SQL", "Redis", "Git & GitHub"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const targets = sectionRef.current!.querySelectorAll<HTMLElement>(
        "[data-animate]"
      );

      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="px-6 py-24 md:py-32"
      style={{ backgroundColor: "#0F0F0F" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Experience */}
        <div data-animate>
          <h2
            className="font-heading"
            style={{
              color: "#F5F5F5",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.005em",
              wordSpacing: "0.08em",
            }}
          >
            Experience
          </h2>

          <div className="mt-10 flex flex-col gap-12 md:mt-14 md:gap-14">
            {experience.map((entry) => (
              <div
                key={entry.role}
                className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,220px)_1fr] md:gap-10"
              >
                <div>
                  <p
                    className="font-mono uppercase"
                    style={{
                      color: "#888",
                      fontSize: "14px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {entry.period}
                  </p>
                  <p
                    className="font-body mt-2 font-medium"
                    style={{ color: "#e5e5e5" }}
                  >
                    {entry.role}
                  </p>
                  <p
                    className="font-body font-medium"
                    style={{ color: "#e5e5e5", opacity: 0.7 }}
                  >
                    {entry.org}
                  </p>
                </div>

                <div>
                  <p
                    className="font-mono uppercase"
                    style={{
                      color: "#888",
                      fontSize: "14px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {entry.meta}
                  </p>

                  {entry.stats && (
                    <p
                      className="font-body mt-3 font-medium"
                      style={{ color: "#e5e5e5" }}
                    >
                      {entry.stats}
                    </p>
                  )}

                  <ul className="mt-4 flex flex-col gap-2">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="font-body font-medium"
                        style={{ color: "#e5e5e5", opacity: 0.85 }}
                      >
                        <span style={{ color: "#888" }}>— </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="my-16 md:my-24"
          style={{
            height: "1px",
            width: "100%",
            backgroundColor: "rgba(229,229,229,0.12)",
          }}
        />

        {/* Skills */}
        <div data-animate>
          <h2
            className="font-heading"
            style={{
              color: "#F5F5F5",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.005em",
              wordSpacing: "0.08em",
            }}
          >
            Skills
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 md:mt-14 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p
                  className="font-mono uppercase"
                  style={{
                    color: "#888",
                    fontSize: "14px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {group.label}
                </p>
                <p
                  className="font-body mt-3 font-medium leading-relaxed"
                  style={{ color: "#e5e5e5" }}
                >
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
