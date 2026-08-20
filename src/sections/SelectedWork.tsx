import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Selected Work section. See DESIGN.md "Selected Work (project grid)" and
// PRD.md "Selected Work (Projects — grid section)" for spec/content.
interface Project {
  title: string;
  year: string;
  image: string;
  /** Intrinsic size, so the browser reserves the box before the file loads. */
  width: number;
  height: number;
  /** What the image actually shows. Not the project name again — a screen
      reader already has the title from the adjacent heading. */
  alt: string;
  stack: string[];
  note?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Samadhan AI — DMC Voice Assistant",
    year: "2026",
    image: "/images/samadhan.jpg",
    width: 848,
    height: 418,
    alt: "The Samadhan AI call console, showing a live Hindi transcript between a caller and the assistant alongside session stats and a generated ticket ID.",
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
    width: 1600,
    height: 867,
    alt: "The PRGI validator home screen, headed Press Registrar General of India, with counters for 77,564 registered titles and a title uniqueness check field.",
    stack: ["Python", "FastAPI", "SQL", "jellyfish", "rapidfuzz"],
  },
  {
    title: "MarketScope — Stock Market Trend Visualiser",
    year: "2025",
    image: "/images/marketscope.jpg",
    width: 1400,
    height: 840,
    alt: "A MarketScope line chart of BTC-USD closing prices across October, falling from roughly 125,000 to 108,000 USD.",
    stack: ["Python", "Pandas", "Matplotlib", "NumPy"],
  },
  {
    title: "Grector — Smart Vehicle Safety System",
    year: "2022",
    image: "/images/grector.jpg",
    width: 1600,
    height: 1151,
    alt: "The Grector prototype: a four-wheeled chassis carrying an ultrasonic distance sensor and a microcontroller board wired to the drive electronics.",
    stack: ["Arduino", "ultrasonic sensors"],
    note: "National finalist, Smart India Hackathon 2022",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="work-card group relative w-full overflow-hidden"
      style={{ backgroundColor: "var(--color-card)" }}
    >
      <img
        src={project.image}
        alt={project.alt}
        className="work-card-img absolute inset-0 h-full w-full object-cover"
        width={project.width}
        height={project.height}
        loading="lazy"
        decoding="async"
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


      {/* Bottom content block: title + metadata, always visible, animates on hover */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <p
          className="work-card-meta font-mono"
          style={{ fontSize: "14px", color: "var(--color-fg)" }}
        >
          {project.year} · {project.stack.join(", ")}
        </p>
        {project.note && (
          <p
            className="font-serif mt-1"
            style={{
              fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
              fontWeight: 700,
              color: "var(--color-bright)",
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
            color: "var(--color-bright)",
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
            ease: "var(--ease-out-expo)",
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
            ease: "var(--ease-out-expo)",
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
      style={{ backgroundColor: "var(--color-paper)", color: "var(--color-ink)" }}
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
          transition: transform 500ms var(--ease-out-expo),
            filter 500ms var(--ease-out-expo);
        }
        .work-card:hover .work-card-img {
          transform: scale(1.05);
          filter: grayscale(0.15) brightness(0.95);
        }
        .work-card-meta {
          transform: translateY(4px);
          transition: transform 300ms var(--ease-out-expo);
        }
        .work-card:hover .work-card-meta {
          transform: translateY(0);
        }
        .work-card-title {
          transform: translateY(1rem);
          transition: transform 300ms var(--ease-out-expo);
        }
        .work-card:hover .work-card-title {
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .work-card-img,
          .work-card-meta,
          .work-card-title {
            transition: none !important;
          }
        }
        /* Touch devices have no hover state — surface the affordances that
           would otherwise be stuck invisible/offset behind :hover. */
        @media (hover: none) {
          .work-card-meta,
          .work-card-title {
            transform: translateY(0);
          }
        }
      `}</style>

      <h2
        ref={headingRef}
        className="font-heading mb-16 leading-[0.9]"
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
          style={{ fontWeight: 200, fontSize: "clamp(2.5rem, 8vw, 9rem)" }}
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
