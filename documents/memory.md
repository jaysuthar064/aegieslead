# Aegies Lead — System Context & Memory Log

> **File Purpose:** Persistent memory, architectural context, domain understanding, and phase-by-phase execution tracking for the Aegies Lead Headless WordPress and React project.

---

## 1. Quick Local Environment & Auto-Login Links

* **WordPress Site:** `http://localhost:8889`
* **Auto-Login Admin URL (1-Click Passwordless into Aegies CMS):**  
  👉 `http://localhost:8889/?aegies_login=1&token=aegies-dev-token-123`
* **Direct Aegies Headless CMS Sidebar URL:**  
  👉 `http://localhost:8889/wp-admin/admin.php?page=aegies-headless-cms`
* **REST API Endpoints:**  
  * Global Settings: `http://localhost:8889/?rest_route=/aegies/v1/global`
  * Page Content (Home): `http://localhost:8889/?rest_route=/aegies/v1/page/home`
  * Platform: `http://localhost:8889/?rest_route=/aegies/v1/page/platform`
  * Who We Serve: `http://localhost:8889/?rest_route=/aegies/v1/page/who-we-serve`
  * Pricing: `http://localhost:8889/?rest_route=/aegies/v1/page/pricing`
  * Company: `http://localhost:8889/?rest_route=/aegies/v1/page/company`
  * Pages Catalog: `http://localhost:8889/?rest_route=/aegies/v1/pages`
* **React Frontend Directory:** `aegieslead-frontend/` (`http://localhost:5173`)
  * `.env` configured with `VITE_WP_API_URL=http://localhost:8889`
  * Vite proxy configured for `/wp-api` -> `http://localhost:8889`

---

## 2. Real-Time Headless WordPress Synchronization Engine

### Connection & Sync Setup:
1. **Frontend Environment Configuration (`.env`):**  
   `VITE_WP_API_URL=http://localhost:8889` defines the backend endpoint used by `src/services/cmsApi.ts`.
2. **CORS Preflight & Header Engine (`mu-plugins/aegies-cors.php`):**  
   Permits all headers (`Cache-Control`, `Pragma`, `X-Requested-With`, `Authorization`, `Origin`, `Content-Type`), handling preflight `OPTIONS` with `HTTP 200`.
3. **Multi-Strategy Fallback Connection Pipeline:**  
   `fetchFromWp` attempts connection in order:
   - `VITE_WP_API_URL` query parameter REST endpoint (`?rest_route=/aegies/v1/...`)
   - `VITE_WP_API_URL` path REST endpoint (`/wp-json/aegies/v1/...`)
   - Direct loopback `127.0.0.1:8889` and `localhost:8889`
   - Vite proxy `/wp-api`
4. **Media Library Integration (`wp.media`):**  
   Custom uploaded images (Hero, Showcase, Feature rows) are saved as attachment URLs or direct image URLs and rendered immediately on the React frontend.
5. **Real-Time Client Revalidation:**  
   React revalidates data on window focus and at background intervals, pulling CMS edits into the interface automatically.

---

## 3. Production B2B SaaS Design Standard (Trackforce Benchmark)

* **Pure Clean Marketing Frontend:** All dev/preview bars and floating pills removed.
* **White Navigation Mega-Menu:** Clean fixed `#ffffff` header, Royal Blue brand shield, structured multi-column dropdowns for *Field Operations*, *Commercial*, and *Buyer Solutions*.
* **2-Column Light Hero Section:** High-contrast headline, benefit copy, primary "Request a Demo" and secondary "Explore Platform" CTAs, verified trust chips, and dynamic media rendering (custom image upload or interactive vector command console).
* **Trust Logo Ribbon:** Clean light-gray stripe (`#f8fafc`) featuring monochrome SVG enterprise brand marks.
* **Dual-Persona Switcher:** Crisp white cards with high-contrast tab buttons switching between **Enterprise Security Leaders** and **Guarding Contractors**.
* **Product Interface Showcase:** Light-themed command console on soft gray (`#f8fafc`) with floating compliance cards (SOC 2 Type II, Sub-Second Dispatch, 99.99% Uptime).
* **Alternating Z-Pattern Features:** Alternating white and soft-gray rows with dynamic image upload support and checkmark lists.
* **Hard Metrics Bar:** Ice-blue band (`#eff6ff`) with giant Royal Blue numbers (`600k+`, `250M+`, `0 Blind Spots`, `99.99%`) and dark charcoal labels.
* **Case Studies:** 3-column crisp white cards on neutral gray (`#f8fafc`) with blue metrics and case study links.
* **FAQ Accordion:** Clean white and light gray expandable cards.
* **Bottom CTA Banner:** Full-width Royal Blue gradient box with dual action buttons.
* **Footer:** Comprehensive 6-column enterprise link farm in deep navy (`#0a0f1d`).

---

## 4. Phase Execution & State Tracking

| Phase | Description | Status | Output / Milestones |
|---|---|---|---|
| **Phase 1** | Architecture, Data Schema & Strategy Document | ✅ Completed | `documents/HEADLESS_WP_PHASE_ROADMAP.md` & `documents/memory.md` |
| **Phase 2** | Custom WordPress CMS Plugin (`aegies-headless-cms`) | ✅ Completed | `wordpress/wp-content/plugins/aegies-headless-cms/` (Sidebar admin menu, section builder, WP Media picker, AJAX save) |
| **Phase 3** | REST API & Sync Endpoints | ✅ Completed | Dual-format endpoint handler (`/wp-json/` & `?rest_route=`) with automated transient cache invalidation |
| **Phase 4** | React Frontend Dynamic Section Engine (Trackforce Light Theme) | ✅ Completed | Authentic Trackforce/TrackTik light SaaS aesthetic matching `design-study.md` |
| **Phase 5** | Live Sync, .env Connection & Dynamic Media Uploads | ✅ Completed | `.env` created, unblockable CORS engine, real-time background revalidation verified |
| **Phase 6** | End-to-End Verification & Production Readiness | ✅ Completed | Tested WordPress save with custom text & images, verified live fetch returning HTTP 200, build passed in 1.65s |
