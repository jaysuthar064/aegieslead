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

## 2. Phase-Wise Execution & Status

| Phase | Description | Status | Deliverables / Milestones |
|---|---|---|---|
| **Phase 1** | Core Architecture & Data Schema Specification | ✅ Complete | `HEADLESS_WP_PHASE_ROADMAP.md`, `memory.md`, JSON schemas for pages and dynamic sections |
| **Phase 2** | Custom WordPress CMS Plugin (`aegies-headless-cms`) | ✅ Complete | Native WP Admin sidebar menu, page selector tabs, section accordions, native `wp.media` modal, AJAX save |
| **Phase 3** | High-Performance REST API & Open CORS Layer | ✅ Complete | Endpoints `/global`, `/pages`, `/page/{slug}`, `/status`, 100% open CORS in `.htaccess` and `mu-plugins` |
| **Phase 4** | React Frontend Dynamic Section Engine (Trackforce 1:1 Light Theme) | ✅ Complete | Modular section components, high-contrast B2B SaaS design system matching `design-study.md` |
| **Phase 5** | Live Sync, .env Security & Media Pipeline | ✅ Complete | Background revalidation, `.env` gitignore security, dynamic image upload rendering |
| **Phase 6** | Interactive Lead Capture Modal, Dynamic SEO & Multi-Page Routing | ✅ Complete | Interactive `DemoModal`, Leads REST endpoint (`POST /aegies/v1/leads`), WP Admin Leads dashboard, `SeoHead` dynamic meta tags |

---

## 3. Real-Time Headless WordPress Synchronization Engine

1. **Frontend Environment Configuration (`.env`):**  
   `VITE_WP_API_URL=http://localhost:8889` defines the backend endpoint used by `src/services/cmsApi.ts`.
2. **Open CORS Engine (`.htaccess` & `mu-plugins/aegies-cors.php`):**  
   Permits all origins (`*` or dynamic origin), all HTTP methods (`GET, POST, PUT, PATCH, DELETE, OPTIONS`), and all headers (`Cache-Control`, `Pragma`, `X-Requested-With`, `Authorization`, `Origin`, `Content-Type`, `If-Modified-Since`, `X-HTTP-Method-Override`) with preflight `OPTIONS` returning `HTTP 200`.
3. **Multi-Strategy Fallback Connection Pipeline:**  
   `fetchFromWp` attempts connection in order:
   - `VITE_WP_API_URL` query parameter REST endpoint (`?rest_route=/aegies/v1/...`)
   - `VITE_WP_API_URL` path REST endpoint (`/wp-json/aegies/v1/...`)
   - Direct loopback `127.0.0.1:8889` and `localhost:8889`
   - Vite proxy `/wp-api`
4. **Interactive Lead Capture & Demo Inquiries (`POST /aegies/v1/leads`):**  
   Frontend demo requests are submitted to WordPress, stored in the database, and rendered in the **Aegies CMS > Leads & Inquiries** admin dashboard.
5. **Real-Time Client Revalidation & SEO:**  
   React revalidates data on window focus and at background intervals, dynamically updating text, sections, custom images, and browser SEO meta tags.
