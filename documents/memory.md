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

## 2. High-End Editorial Art Direction (Awwwards Grade)

Moved entirely away from the generic "SaaS template" aesthetic (excessive gradients, glassmorphism, glowing blobs, soft borders) towards a highly cinematic, art-directed editorial experience.

* **Typography-First Strategy:** Dramatic oversized tracking (`font-serif`, `tracking-tighter`, `leading-none`) for headlines, contrasting with crisp technical mono-spaced data labels (`tracking-widest`, `text-[10px]`).
* **Stark Restrained Palette:** Strict monochrome (`#111111`, `#f9f9f9`, `#ffffff`) with ultra-fine `1px` crisp grid borders (`border-black/5`).
* **Cinematic Scroll Choreography:** Custom `clip-path` polygon mask reveals (`animate-mask-up`) for images and a staggered line-by-line masked typography reveal (`TextReveal.tsx`) replacing generic soft fades.
* **Sharp Brutalist Interaction:** Completely flat interactive components, sharp unrounded edges, severe contrast inversions on hover (`btn-editorial`), and line slide/grow micro-interactions instead of floaty shadow lifts.
* **Abstract Data Imagery:** Removed generic 3D mockups. Images default to grayscale, high-contrast, or use abstract typographic data grids (`DATA_STREAM [ ACTIVE ]`) when no image is supplied.

---

## 3. Cinematic Motion Design & Interactive Architecture

* **Interactive Custom Cursor (`CustomCursor.tsx`):** Precision 6px center dot paired with a spring-interpolated trailing ambient ring. Auto-disables on touch.
* **Magnetic Button Pull (`Magnetic.tsx`):** Spring dampening pull physics drawing buttons toward cursor position on hover.
* **Oversized Horizontal Typography Reels:** Native smooth horizontal scrolling snap points `snap-x snap-mandatory` preserving accessibility.
* **Full Accessibility & Reduced Motion:** Native `@media (prefers-reduced-motion: reduce)` rules instantly kill intense transforms and mask unrolls for users with vestibular sensitivities.

---

## 4. Phase Execution & State Tracking

| Phase | Description | Status | Deliverables / Milestones |
|---|---|---|---|
| **Phase 1** | Core Architecture & Data Schema Specification | ✅ Complete | `HEADLESS_WP_PHASE_ROADMAP.md`, `memory.md`, JSON schemas for pages and dynamic sections |
| **Phase 2** | Custom WordPress CMS Plugin (`aegies-headless-cms`) | ✅ Complete | Native WP Admin sidebar menu, page selector tabs, section accordions, native `wp.media` modal, AJAX save |
| **Phase 3** | High-Performance REST API & Open CORS Layer | ✅ Complete | Endpoints `/global`, `/pages`, `/page/{slug}`, `/leads`, 100% open CORS in `.htaccess` and `mu-plugins` |
| **Phase 4** | React Frontend Dynamic Section Engine | ✅ Complete | High-contrast B2B SaaS React component structures |
| **Phase 5** | Live Sync, .env Security & Media Pipeline | ✅ Complete | Background revalidation, `.env` gitignore security, dynamic image upload rendering |
| **Phase 6** | Multi-Page Architecture, Leads Suite & Routing | ✅ Complete | 6 rich pages, multi-route engine, dual Leads modal (`demo` vs `sales`) |
| **Phase 7** | Editorial Art Direction & Cinematic Motion Overhaul | ✅ Complete | Complete shift to Awwwards-grade stark typography, mask-unroll motion, & thin-grid brutalist aesthetic |
