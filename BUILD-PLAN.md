# Build Plan — nandish.dev

Orchestrator: Opus 5 (Claude Code, plan mode). Workers: Sonnet 5 (low effort), one sub-agent per feature branch/Trello card.
Read `PRD.md` (content) and `DESIGN.md` (visual spec) before starting. This file is the sequence only — no design/content decisions live here.

## Stack
Vite + React + TypeScript + Tailwind + GSAP (ScrollTrigger) + raw WebGL (or a thin wrapper — no heavy Three.js dependency needed for one shader) for Silk. Fully static output, deployable as static files to nandish.dev.

## One-time setup (orchestrator does this directly, no sub-agent)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git checkout -b dev
git push -u origin main
git push -u origin dev
```
Trello board "Portfolio Site – nandish.dev", columns: Backlog / In Progress / In Review / Done. One card per step below.

## Per-feature loop (repeats for every step)
```bash
git checkout dev && git pull origin dev
git checkout -b feature/<name>
# sub-agent works here
git add . && git commit -m "..."
git push -u origin feature/<name>
# open PR feature/<name> -> dev, review, merge, delete branch
# move Trello card to Done
```
When dev is stable: one PR `dev -> main` to ship. `main` stays always deploy-ready.

## Step sequence

1. **`chore/scaffold`** — Vite + React + TS + Tailwind scaffold. Install GSAP. Set up Fraunces + Hanken Grotesk + mono via Google Fonts (self-hosted or `@fontsource`, not a CDN `<link>` that blocks render). Base folder structure: `components/`, `sections/`, `shaders/`, `lib/`.
2. **`feature/silk-background`** — Standalone Silk WebGL component per DESIGN.md spec: fixed full-viewport canvas, domain-warp/fbm shader, pointer-intensity uniform, no-WebGL fallback panel, `prefers-reduced-motion` static-frame path. Test in isolation (just the canvas, nothing else) before wiring into layout.
3. **`feature/nav`** — Fixed nav, mix-blend-difference, desktop horizontal / mobile menu icon + overlay.
4. **`feature/intro-section`** — Opening section: name/heading with scroll-linked scale (GSAP ScrollTrigger), role label, summary line. Wires Silk in behind it.
5. **`feature/project-grid`** — Selected Work grid, 4 cards from PRD.md, hover states, responsive 2-col→1-col.
6. **`feature/manifesto-achievements`** — Manifesto/achievements section with scroll-triggered line-width animation, Silk visible behind.
7. **`feature/skills-strip`** — Skills section from PRD.md, grouped, mono sub-labels.
8. **`feature/contact-footer`** — Footer with social links, email, rights text.
9. **`feature/grain-overlay`** — Site-wide 15% noise overlay, mix-blend-overlay.
10. **`fix/responsive-pass`** — Full pass at phone/tablet/desktop breakpoints across every section; fix anything that breaks. Do this only after all sections exist.
11. **`chore/deploy-config`** — Static build config + deploy target for nandish.dev (needs: do you already control DNS for nandish.dev? Cloudflare/Namecheap/GoDaddy — answer this before this step, not before).

Each numbered step = one Trello card = one sub-agent invocation = one PR into `dev`. Don't start a step until the previous one is merged — sections depend on the scaffold and Silk component existing first, but 5/6/7/8 can run in parallel sub-agents once 1–4 are merged, since they don't depend on each other.

## What's still open (answer when you get there, not now)
- Deploy target/DNS access for nandish.dev — needed only at step 11.
- Footer CTA copy ("START A PROJECT" vs alternative) — needed only at step 8.
