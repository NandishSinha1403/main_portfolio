import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      // Focus trap. The overlay is aria-modal, but that only tells assistive
      // tech it is modal — it does not stop Tab walking into the page behind,
      // which left keyboard users focused on invisible links under a
      // full-screen panel with no way back.
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      {/* Glass bar rather than mix-blend-difference. The dark tint means the
          bar stays legible over the light Selected Works section too, without
          inverting the link colors the way the blend mode did. */}
      <nav
        className="fixed top-0 w-full z-50 px-6 py-6 backdrop-blur-xl border-b"
        style={{
          backgroundColor: "rgba(10, 10, 10, 0.55)",
          borderBottomColor: "rgba(229, 229, 229, 0.12)",
        }}
        aria-label="Primary"
      >
        <div className="flex items-center justify-between">
          <a
            href="#top"
            className="text-[18px] font-medium tracking-tight text-[#e5e5e5]"
          >
            Nandish Sinha
          </a>

          <ul className="hidden md:flex items-center gap-12">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[18px] font-medium tracking-tight text-[#e5e5e5]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            className="md:hidden text-[#e5e5e5] -m-2 p-2"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col px-6 py-8"
          style={{ backgroundColor: "#0F0F0F" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[18px] font-medium tracking-tight text-[#e5e5e5]">
              Nandish Sinha
            </span>
            <button
              ref={closeRef}
              type="button"
              className="text-[#e5e5e5] -m-2 p-2"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>

          <ul className="flex-1 flex flex-col items-start justify-center gap-6">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-[#e5e5e5] text-[12vw] leading-none tracking-tight"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
