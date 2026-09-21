# Aegies Lead — System Context & Memory Log

> **File Purpose:** Persistent memory, architectural context, domain understanding, and phase-by-phase execution tracking for the Aegies Lead Headless WordPress and React project.

---

## 1. Quick Local Environment & Auto-Login Links

* **WordPress Site:** `http://localhost:8889`
* **Auto-Login Admin URL (1-Click Passwordless into Aegies CMS):**  
  👉 `http://localhost:8889/?aegies_login=1&token=aegies-dev-token-123`
* **Direct Aegies Headless CMS Sidebar URL:**  
  👉 `http://localhost:8889/wp-admin/admin.php?page=aegies-headless-cms`
* **Leads & Inquiries Log:**  
  👉 `http://localhost:8889/wp-admin/admin.php?page=aegies-headless-cms-leads`
* **REST API Endpoints:**  
  * Global Settings: `http://localhost:8889/?rest_route=/aegies/v1/global`
  * Page 1 (Home): `http://localhost:8889/?rest_route=/aegies/v1/page/home`
  * Page 2 (Platform): `http://localhost:8889/?rest_route=/aegies/v1/page/platform`
  * Page 3 (Who We Serve): `http://localhost:8889/?rest_route=/aegies/v1/page/who-we-serve`
  * Page 4 (Workforce): `http://localhost:8889/?rest_route=/aegies/v1/page/workforce`
  * Page 5 (Pricing): `http://localhost:8889/?rest_route=/aegies/v1/page/pricing`
  * Page 6 (Company): `http://localhost:8889/?rest_route=/aegies/v1/page/company`
  * Inbound Leads API: `http://localhost:8889/?rest_route=/aegies/v1/leads`
  * Pages Catalog: `http://localhost:8889/?rest_route=/aegies/v1/pages`
* **React Frontend Directory:** `aegieslead-frontend/` (`http://localhost:5173`)
* **Git Repository:** `https://github.com/jaysuthar064/aegieslead.git` (branch: `main`)

---

## 2. Cinematic Motion Design & Interactive Architecture

* **Interactive Custom Cursor (`CustomCursor.tsx`):** Precision 6px center dot paired with a spring-lerped trailing ring that expands on interactive elements (`button`, `a`, `select`, `input`, `textarea`), with automatic touch-screen deactivation.
* **Magnetic Button Pull (`Magnetic.tsx`):** Spring dampening pull physics drawing buttons toward cursor position on hover.
* **3D Perspective Card Tilt (`TiltCard.tsx`):** Dynamic 3D perspective rotation (`perspective(1200px) rotateX(...) rotateY(...)`) with dynamic specular lighting glare overlays tracking cursor coordinates.
* **Dramatic Typography & Scroll Reveal (`TextReveal.tsx`, `ScrollReveal.tsx`):** Word-by-word clip mask transitions and staggered scroll-triggered reveals using native `IntersectionObserver` with hardware-accelerated transforms.
* **Pinned Horizontal Storytelling Reel (`HorizontalStoryReel.tsx`):** Interactive horizontal feature carousel showcasing the 4 core pillars with step counters, tab track selectors, and 3D tilt stat cards.
* **Infinite Logo Marquee Slider (`TrustLogosSection.tsx`):** Smooth continuous loop with edge gradient fade masks and hover-pause capability.
* **Full Accessibility & Reduced Motion:** Native `@media (prefers-reduced-motion: reduce)` support instantly disables intensive motion for users with vestibular sensitivities.

---

## 3. Multi-Page Architecture & Content Inventory

1. **Home (`/`):** Unified Operating System for Physical Security (Hero, Infinite Logo Marquee Slider, Dual Persona Switcher, Pinned Story Reel, Command Center Interface, Z-Pattern Features, Metrics Bar, Case Studies, FAQ, Dual CTA).
2. **Platform Architecture (`/platform`):** Comprehensive Technical Capabilities (Sub-Second GPS Dispatch, Chain-of-Custody Incident Management, Automated Invoicing, Performance Benchmarks, FAQ).
3. **Who We Serve / Solutions (`/who-we-serve`):** Enterprise Security Teams vs. Guarding Contractor Agencies vs. Industry Verticals (Commercial Real Estate, Healthcare Systems, Critical Infrastructure NERC CIP).
4. **Workforce Management & Mobile Guard (`/workforce`):** Offline-First Guard Mobile Portal, NFC Checkpoint Scanning, Emergency Duress / Panic Alerts, Shift Rostering & Attendance Reminders.
5. **Pricing & ROI (`/pricing`):** Transparent Guard Capacity Tiers (Starter, Professional, Enterprise Scale), ROI Calculator (3.4x Annual ROI), Feature Comparison Matrix, Licensing FAQ.
6. **Company, Security & Trust (`/company`):** Security Governance (SOC 2 Type II, ISO 27001, GDPR, HIPAA), 99.99% AWS Multi-Region Infrastructure, System Status.

---

## 4. Phase Execution & State Tracking

| Phase | Description | Status | Deliverables / Milestones |
|---|---|---|---|
| **Phase 1** | Core Architecture & Data Schema Specification | ✅ Complete | `HEADLESS_WP_PHASE_ROADMAP.md`, `memory.md`, JSON schemas for pages and dynamic sections |
| **Phase 2** | Custom WordPress CMS Plugin (`aegies-headless-cms`) | ✅ Complete | Native WP Admin sidebar menu, page selector tabs, section accordions, native `wp.media` modal, AJAX save |
| **Phase 3** | High-Performance REST API & Open CORS Layer | ✅ Complete | Endpoints `/global`, `/pages`, `/page/{slug}`, `/leads`, 100% open CORS in `.htaccess` and `mu-plugins` |
| **Phase 4** | React Frontend Dynamic Section Engine | ✅ Complete | High-contrast Trackforce 1:1 light SaaS design system matching `design-study.md` |
| **Phase 5** | Live Sync, .env Security & Media Pipeline | ✅ Complete | Background revalidation, `.env` gitignore security, dynamic image upload rendering |
| **Phase 6** | Cinematic Motion Design, Multi-Page & Leads Suite | ✅ Complete | Custom cursor, magnetic buttons, 3D card tilt, horizontal story reel, dual modal, 6 rich pages |
