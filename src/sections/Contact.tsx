// Contact / footer section. See DESIGN.md "Contact / footer" + PRD.md
// "Contact / footer" content block. This is the second hard tonal flip on
// the page (light background against the dark sections above it).

const socialLinks = [
  { label: "GitHub", href: "https://github.com/NandishSinha1403" },
  { label: "LinkedIn", href: "https://linkedin.com/in/nandishsinha" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-6"
      style={{ backgroundColor: "#fafafa", color: "#000000" }}
    >
      {/* Top: full-width display text */}
      <div className="border-b" style={{ borderColor: "#000000" }}>
        <h2
          className="font-heading uppercase leading-none pb-4"
          style={{
            fontSize: "clamp(2.5rem, 12vw, 14rem)",
            fontWeight: 700,
            letterSpacing: "-0.005em",
            wordSpacing: "0.08em",
            color: "#000000",
          }}
        >
          Get in touch
        </h2>
      </div>

      {/* Bottom: 3-column grid, stacks on mobile */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        {/* Column 1: social links */}
        <div className="flex flex-col gap-3">
          <span
            className="font-mono uppercase"
            style={{ fontSize: "14px", color: "#888" }}
          >
            Elsewhere
          </span>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-medium w-fit"
              style={{
                color: "#000000",
                textUnderlineOffset: "4px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecorationLine = "underline";
                e.currentTarget.style.textDecorationStyle = "wavy";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecorationLine = "none";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Column 2: email */}
        <div className="flex flex-col justify-start">
          <span
            className="font-mono uppercase mb-3"
            style={{ fontSize: "14px", color: "#888" }}
          >
            Email
          </span>
          <a
            href="mailto:sinha.nandish@gmail.com"
            className="font-body font-medium break-words"
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.875rem)",
              color: "#000000",
            }}
          >
            sinha.nandish@gmail.com
          </a>
        </div>

        {/* Column 3: rights reserved, bottom-right aligned */}
        <div className="flex items-end justify-start md:justify-end">
          <p
            className="font-body font-medium"
            style={{ color: "#888", fontSize: "0.875rem" }}
          >
            © 2026 Nandish Sinha. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
