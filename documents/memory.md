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
  * Page Content (Home): `http://localhost:8889/?rest_route=/aegies/v1/page/home`
  * Platform: `http://localhost:8889/?rest_route=/aegies/v1/page/platform`
  * Who We Serve: `http://localhost:8889/?rest_route=/aegies/v1/page/who-we-serve`
  * Pricing: `http://localhost:8889/?rest_route=/aegies/v1/page/pricing`
  * Company: `http://localhost:8889/?rest_route=/aegies/v1/page/company`
  * Inbound Leads API: `http://localhost:8889/?rest_route=/aegies/v1/leads`
  * Pages Catalog: `http://localhost:8889/?rest_route=/aegies/v1/pages`
* **React Frontend Directory:** `aegieslead-frontend/` (`http://localhost:5173`)
* **Git Repository:** `https://github.com/jaysuthar064/aegieslead.git` (branch: `main`)

---

## 2. Browser Routing & Navigation Architecture

* **Clean URL History:** Synchronized browser address bar (`/`, `/platform`, `/who-we-serve`, `/pricing`, `/company`) using `window.history.pushState` with full `popstate` support for Back and Forward buttons.
* **Anchor Routing:** Mega-menu and footer links (`#patrols`, `#incidents`, `#proposals`, `#billing`, `#case-studies`, `#demo`, `#contact`) smoothly navigate to the relevant page and scroll down to the targeted section.
* **Active Navigation States:** Top navigation items highlight with Royal Blue indicators when active.
* **Interactive Button Workflows:** All CTA buttons across Navbar, Hero, Persona Tabs, Z-Features, and Bottom Banners trigger the high-trust `DemoModal` or perform smooth anchor scrolling.

---

## 3. Phase Execution & State Tracking

| Phase | Description | Status | Deliverables / Milestones |
|---|---|---|---|
| **Phase 1** | Core Architecture & Data Schema Specification | ✅ Complete | `HEADLESS_WP_PHASE_ROADMAP.md`, `memory.md`, JSON schemas for pages and dynamic sections |
| **Phase 2** | Custom WordPress CMS Plugin (`aegies-headless-cms`) | ✅ Complete | Native WP Admin sidebar menu, page selector tabs, section accordions, native `wp.media` modal, AJAX save |
| **Phase 3** | High-Performance REST API & Open CORS Layer | ✅ Complete | Endpoints `/global`, `/pages`, `/page/{slug}`, `/leads`, 100% open CORS in `.htaccess` and `mu-plugins` |
| **Phase 4** | React Frontend Dynamic Section Engine | ✅ Complete | High-contrast B2B SaaS design system matching Trackforce standard (`design-study.md`) |
| **Phase 5** | Live Sync, .env Security & Media Pipeline | ✅ Complete | Background revalidation, `.env` gitignore security, dynamic image upload rendering |
| **Phase 6** | Navigation Overhaul, Lead Capture & Dynamic SEO | ✅ Complete | PushState URL routing, popstate history, `DemoModal`, Leads REST endpoint, `SeoHead` dynamic meta tags |
