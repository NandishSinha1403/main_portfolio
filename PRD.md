# PRD — nandish.dev Portfolio

## Who

Nandish Sinha. B.Tech CSE, ITER (SOA University), Bhubaneswar, 2024–2028. CGPA 9.75.

## Site goal

A one-page scrollytelling portfolio that gets a recruiter/hiring manager to (a) understand what he builds, (b) see 2-3 strong projects, (c) contact him. Visual bar: should look like an agency/design-studio site, not a template.

## Content (verbatim from resume — do not invent or embellish)

### Hero
Name: Nandish Sinha
Role line: B.Tech CSE student, ITER Bhubaneswar (2024–2028)
Contact: sinha.nandish@gmail.com · +91-8010117295
Links: github.com/NandishSinha1403 · linkedin.com/in/nandishsinha

### About / summary
CS undergrad (CGPA 9.75) building backend, real-time, and AI-voice systems. Two-time national hackathon finalist. DevOps volunteer running a live production platform (AlgoArena) on AWS.

### Selected Work (Projects — grid section)

1. **Samadhan AI — DMC Voice Assistant** (2026) — National finalist, India Innovates 2026
   Stack: Node.js, WebSocket, Gemini 3.1 Live, Twilio, Exotel, React Native, Redis
   - Real-time voice assistant for Delhi Municipal Corporation over Twilio/Exotel PSTN, streaming audio via WebSocket + Gemini 3.1 Flash Live across 22+ Indian languages.
   - Built the DSP audio transcoding pipeline (MULAW ↔ PCM) and a Jaccard-similarity ticket engine for duplicate detection.

2. **PRGI Title Similarity & Compliance Validation System** (2026)
   Stack: Python, FastAPI, SQL, jellyfish, rapidfuzz
   - FastAPI + SQL backend for real-time newspaper-title validation using phonetic (Soundex, NYSIIS) and fuzzy matching, with an Approval Probability Engine scored on similarity thresholds.

3. **MarketScope — Stock Market Trend Visualiser** (2025)
   Stack: Python, Pandas, Matplotlib, NumPy
   - Pandas ETL pipeline fetching/cleaning historical OHLC data, computing rolling averages and volatility bands over custom windows.
   - Matplotlib visualizations with statistical overlays (moving averages, trend lines) for cross-ticker trend comparison.

4. **Grector — Smart Vehicle Safety System** (SIH 2022) — National-level finalist, Smart India Hackathon
   Ultrasonic obstacle detection, in-built alcohol detection, smart safety unlock.

### Experience

**DevOps Volunteer — AlgoArena** (algorithm-arena.one), Club project, GDG ITER BBSR — 2025–Present
Competitive programming platform: 50+ challenges, 200+ coders, 1.5k+ submissions.
- Deployed on AWS EC2 via Docker Compose behind an Nginx reverse proxy, Certbot-managed HTTPS.
- MongoDB Atlas with indexed queries + connection pooling for 1,500+ submissions; basic uptime/error monitoring.
- systemd/PM2 process supervision for auto-restart and zero-downtime redeploys on merge.

**Tech Team Member — GDG ITER BBSR** — 2024–Present
Collaborates with a student engineering team on technical events/projects under Google Developer Groups.

### Achievements (for a compact strip/manifesto-adjacent section, not a full grid)
- 2× National-Level Hackathon Finalist — SIH 2022, India Innovates 2026
- Participant, JPMC Code for Good 2026
- Participant, Google Kickstart 2020
- GitHub Arctic Code Vault Contributor (2020)
- University of Helsinki — Python Programming (OOP, data structures, algorithms)
- Java Certified, SoloLearn (2019)

### Certifications
- Microsoft Learn — Level 6, 28,475 XP (GenAI, Azure OpenAI, Cloud Computing, Microsoft Copilot)
- Google Cloud Innovator — Community recognition for cloud skills

### Technical Skills (skills section — group as shown)
- Languages: Python, Java, C, C++, JavaScript (Node.js)
- Backend & Real-time: FastAPI, Django, Node.js, Express, WebSocket, Twilio, Exotel
- AI/ML: Gemini 3.1/2.5, Groq (Llama 3.1), Faster-Whisper, Scikit-Learn, Pandas, NumPy
- Cloud & DevOps: AWS (EC2, Lightsail), Docker, Nginx, MongoDB Atlas, Google Cloud, PM2/systemd
- Mobile & Tools: React Native, React, SQL, Redis, Git & GitHub

### Contact / footer
Email: sinha.nandish@gmail.com
GitHub: github.com/NandishSinha1403
LinkedIn: linkedin.com/in/nandishsinha

## Non-content requirements
- Fully responsive: phone, tablet, desktop — no section may break, overlap, or require horizontal scroll at any breakpoint.
- Static site, deployable to nandish.dev.
- One signature scroll effect done well, not a dozen competing ones (per design doc).
- Liquid Metal WebGL shader behind the opening section only — NOT a persistent whole-page background. See DESIGN.md for why.
- Fonts: Clash Display (headings) + Satoshi (body), self-hosted from Fontshare. Free for commercial use, no paid fonts, no Inter.
