import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Selected Work section. See DESIGN.md "Selected Work (project grid)" and
// PRD.md "Selected Work (Projects — grid section)" for spec/content.
interface Project {
  title: string;
  year: string;
  image: string;
  stack: string[];
  note?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Samadhan AI — DMC Voice Assistant",
    year: "2026",
    image: "/images/samadhan.jpg",
    stack: [
      "Node.js",
      "WebSocket",
      "Gemini 3.1 Live",
      "Twilio",
      "Exotel",
      "React Native",
      "Redis",
    ],
    note: "National finalist, India Innovates 2026",
  },
  {
    title: "PRGI Title Similarity & Compliance Validation System",
    year: "2026",
    image: "/images/prgi.jpg",
    stack: ["Python", "FastAPI", "SQL", "jellyfish", "rapidfuzz"],
  },
  {
    title: "MarketScope — Stock Market Trend Visualiser",
    year: "2025",
    image: "/images/marketscope.jpg",
    stack: ["Python", "Pandas", "Matplotlib", "NumPy"],
  },
  {
    title: "Grector — Smart Vehicle Safety System",
    year: "2022",
    image: "/images/grector.jpg",
    stack: ["Arduino", "ultrasonic sensors"],
    note: "National finalist, Smart India Hackathon 2022",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="work-card group relative w-full overflow-hidden"
      style={{ backgroundColor: "#18181b" }}
    >
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        className="work-card-img absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* Overlay gradient for text legibility over the image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          // Several of these screenshots are light UIs, so once desaturated
          // they read almost white. The scrim has to run darker and further up
          // the card than usual or the title and stack are unreadable — the
          // stack line wraps to two lines on the widest card.
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.88) 28%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 78%, transparent 100%)",
        }}
      />

      {/* Circular hover button */}
      <div
        className="work-card-btn pointer-events-none absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white opacity-0"
        aria-hidden="true"
      >
        <ArrowUpRight size={20} color="#0A0A0A" strokeWidth={2.25} />
      </div>

      {/* Bottom content block: title + metadata, always visible, animates on hover */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <p
          className="work-card-meta font-mono"
          style={{ fontSize: "14px", color: "#e5e5e5" }}
        >
          {project.year} · {project.stack.join(", ")}
        </p>
        {project.note && (
          <p
            className="font-serif mt-1"
            style={{
              fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
              fontWeight: 700,
              color: "#F5F5F5",
              letterSpacing: "0.01em",
            }}
          >
            {project.note}
          </p>
        )}
        <h3
          className="work-card-title font-heading mt-2"
          style={{
            fontWeight: 500,
            fontSize: "clamp(1.1rem, 2.4vw, 1.75rem)",
            color: "#F5F5F5",
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll<HTMLElement>(
          ".work-card"
        );
        gsap.fromTo(
          cards,
          {
            y: 64,
            scale: 0.94,
            clipPath: "inset(6% 6% 6% 6% round 0px)",
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

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
      id="work"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
    >
      <style>{`
        .work-card {
          aspect-ratio: 4 / 5;
        }
        @media (min-width: 768px) {
          .work-card { aspect-ratio: 16 / 10; }
        }
        .work-card-img {
          filter: grayscale(1) brightness(0.8);
          transform: scale(1);
          transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .work-card:hover .work-card-img {
          transform: scale(1.05);
          filter: grayscale(0.15) brightness(0.95);
        }
        .work-card-btn {
          transition: opacity 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .work-card:hover .work-card-btn {
          opacity: 1;
        }
        .work-card-meta {
          transform: translateY(4px);
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .work-card:hover .work-card-meta {
          transform: translateY(0);
        }
        .work-card-title {
          transform: translateY(1rem);
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .work-card:hover .work-card-title {
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .work-card-img,
          .work-card-btn,
          .work-card-meta,
          .work-card-title {
            transition: none !important;
          }
        }
        /* Touch devices have no hover state — surface the affordances that
           would otherwise be stuck invisible/offset behind :hover. */
        @media (hover: none) {
          .work-card-btn {
            opacity: 0.85;
          }
          .work-card-meta,
          .work-card-title {
            transform: translateY(0);
          }
        }
      `}</style>

      <h2
        ref={headingRef}
        className="font-display mb-16 leading-[0.9]"
        style={{ letterSpacing: "-0.005em", wordSpacing: "0.08em" }}
      >
        <span
          className="block"
          style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 8vw, 9rem)" }}
        >
          SELECTED
        </span>
        <span
          className="block"
          style={{ fontWeight: 300, fontSize: "clamp(2.5rem, 8vw, 9rem)" }}
        >
          WORKS
        </span>
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: "2rem" }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
