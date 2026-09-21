# Headless WordPress & React Architecture — Phase-Wise Implementation Roadmap

## 1. Executive Architecture Summary

This project implements a decoupled **Headless WordPress** ecosystem consisting of:
1. **Backend & Admin CMS:** WordPress core enhanced with a custom, lightweight, bespoke plugin (**Aegies Headless CMS**) located directly in the WordPress Admin sidebar.
2. **Data & Sync Layer:** High-speed WordPress REST API endpoints delivering structured, sanitized JSON schemas with instant cache invalidation.
3. **Frontend Presentation:** A modern React 19 + TypeScript + Vite + Tailwind CSS application that dynamically renders page structures, sections, repeater content, and media assets based on the CMS payload.

```
┌─────────────────────────────────────────────────────────────┐
│                    WordPress Admin Sidebar                  │
│  [ Aegies Headless CMS ] ───► Page Selector & Section Editor│
└──────────────────────────────┬──────────────────────────────┘
                               │ Saves to DB (wp_options / CPT)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Bespoke WP REST API Layer                   │
│   GET /wp-json/aegies/v1/page/{slug}  |  /global-settings   │
└──────────────────────────────┬──────────────────────────────┘
                               │ High-speed JSON Payload
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              React 19 Frontend (Vite + Tailwind)            │
│  Dynamic Section Engine ──► Hero, Features, Metrics, Modals │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Phase-by-Phase Roadmap

### Phase 1: Core Architecture & Data Schema Specification
**Goal:** Define the unified JSON structure for global site settings, individual pages, and modular dynamic sections.

* **1.1 Global Settings Schema (`/wp-json/aegies/v1/global`)**
  * Site branding (primary logo, dark logo, favicon, brand colors).
  * Navigation menus (Mega-menu hierarchy, links, badges, action CTAs).
  * Footer structure (column link trees, copyright, social media links).
  * Global SEO defaults and tracking scripts.
* **1.2 Modular Section Schema (`/wp-json/aegies/v1/page/{slug}`)**
  * Unique section ID, type identifier, order index, and visibility toggle.
  * Section-specific attributes:
    * `hero_section`: headline, subheadline, primary/secondary CTA, background visual, badges.
    * `trust_logos_section`: logo array (url, alt, dimensions, partner link).
    * `audience_tabs_section`: interactive tab switcher (Enterprise vs. Security Firms), tabs metadata, dynamic bullet points, feature cards.
    * `z_feature_rows_section`: alternating 2-column image/text rows with key-value highlights.
    * `case_studies_section`: 3-column metric cards (stat, title, excerpt, link).
    * `metrics_bar_section`: high-impact statistics (number, prefix/suffix, description).
    * `cta_banner_section`: full-width conversion banner with action triggers.
* **1.3 Storage & Versioning Strategy**
  * Structured storage in WordPress database using sanitized options or dedicated custom post records.
  * Revision history snapshots to prevent accidental content loss.

---

### Phase 2: Custom WordPress CMS Plugin (`aegies-headless-cms`)
**Goal:** Build a native, clean, user-friendly CMS management hub inside WP Admin.

* **2.1 Sidebar Menu Integration**
  * Register top-level admin menu: `Aegies CMS` with custom icon and admin capability checks (`manage_options`).
  * Sub-menus: **Pages Manager**, **Global Navigation**, **Site Branding**, and **API Settings**.
* **2.2 User Interface (UI/UX)**
  * Single-Page Application (SPA) feel inside WP Admin using modern reactive UI (vanilla JS/Alpine/Preact).
  * **Page Selector Bar:** Switch between pages (Home, Platform, Who We Serve, Pricing, Company).
  * **Section List & Reordering:** Drag-and-drop or order index to rearrange sections on any page.
  * **Section Controls:** Add Section, Duplicate Section, Toggle Active/Inactive, Delete Section.
* **2.3 Field Editors & Media Sync**
  * **Text & Rich Text:** Inline text inputs, textareas, and lightweight formatting controls.
  * **Native WordPress Media Integration:** One-click modal integration using `wp.media` for selecting, cropping, and uploading images from WP Media Library.
  * **Repeater Fields:** Dynamic addition and deletion of list items (e.g., logo clouds, benefit bullets, stat counters).
  * **Action Links:** URL, link target (`_self`/`_blank`), button variant (solid, outline, ghost).
* **2.4 Save & Sync State Management**
  * Nonce verification and permission verification on all operations.
  * Visual feedback: "Changes Saved", "Live Synchronized", or "Draft Preview".

---

### Phase 3: High-Performance REST API & Cache Layer
**Goal:** Expose optimized, secure, and lightning-fast JSON endpoints for decoupled consumption.

* **3.1 Custom REST Controller**
  * Namespace: `aegies/v1`.
  * Route `GET /aegies/v1/page/(?P<slug>[a-zA-Z0-9-]+)`: Returns full structured section data for a given page.
  * Route `GET /aegies/v1/pages`: Returns array of all available pages and basic meta.
  * Route `GET /aegies/v1/global`: Returns header, footer, branding, and global settings.
  * Route `POST /aegies/v1/preview`: Authenticated draft preview endpoint for staging changes.
* **3.2 Response Sanitization & Image Resolution**
  * Automatically resolve WordPress media attachment IDs into complete URLs, dimensions, srcset, and alt text.
  * Escape and sanitize output to prevent XSS.
* **3.3 Caching & Instant Invalidation**
  * Implement WordPress Transients API for sub-50ms API response times.
  * Invalidate cached transients immediately on saving changes in the Aegies CMS plugin.
* **3.4 CORS & Security Headers**
  * Whitelist frontend origins (e.g., `http://localhost:5173`, `http://localhost:3000`, and production domains).

---

### Phase 4: React Frontend Dynamic Rendering Engine
**Goal:** Dynamically render frontend pages and modular sections based on the WordPress API response.

* **4.1 Architecture & API Service**
  * Centralized API client (`src/services/cmsApi.ts`) with type-safe interfaces (`src/types/cms.ts`).
  * Fallback static defaults to ensure the website renders even if the WordPress backend is unreachable.
* **4.2 Dynamic Section Renderer (`DynamicSectionRenderer.tsx`)**
  * Iterates over page sections array and dynamically loads corresponding React components:
    * `<HeroSection />`
    * `<TrustLogosSection />`
    * `<AudienceTabsSection />`
    * `<FeatureZRowsSection />`
    * `<MetricsSection />`
    * `<CaseStudiesSection />`
    * `<CtaBannerSection />`
    * `<CustomHtmlSection />`
* **4.3 Responsive UI & Design Alignment**
  * Strict adherence to B2B Security SaaS aesthetic (high contrast, 2-column hero, clean cards, metric typography, mega-menu, dark navy footer).
  * Tailwind CSS styling for smooth animations, hover states, and mobile responsiveness.

---

### Phase 5: Live Synchronization, Media Pipeline & SEO
**Goal:** Provide real-time feedback loops and complete SEO parity.

* **5.1 Real-time Sync & Dev Mode**
  * SWR / TanStack Query or polling hook in React frontend for instant preview updates when editing content in WP Admin.
* **5.2 Media Optimization**
  * Support for WebP, modern aspect ratios, lazy-loading, and responsive images.
* **5.3 Headless SEO Synchronization**
  * Dynamic document title, meta descriptions, OpenGraph tags, and favicon injected directly from CMS global and page payloads.

---

### Phase 6: Testing, Quality Assurance & Deployment
**Goal:** Verify data integrity, frontend rendering resilience, and production readiness.

* **6.1 Validation Checkpoints**
  * CMS Plugin Activation & Deactivation life-cycle checks.
  * CRUD operations for pages, sections, and repeater items.
  * API latency benchmarking (< 50ms with caching enabled).
  * Frontend rendering with incomplete or partially configured CMS sections.
* **6.2 Deployment Setup**
  * Automated setup scripts linking WordPress backend and React frontend.
  * Environment variable mapping (`VITE_WP_API_URL`, `AEGIES_API_SECRET`).

---

## 3. Section Component Matrix

| Section Identifier | Purpose | Configurable Fields |
|---|---|---|
| `hero` | Main value proposition & CTA | Title, Subtitle, Primary CTA (label, url), Secondary CTA, Hero Image/Mockup, Badges |
| `trust_logos` | Social proof & enterprise logos | Section Title, Logo Repeater (image, alt, url) |
| `audience_tabs` | Interactive persona switcher | Tab 1 Title/Content (Enterprise), Tab 2 Title/Content (Guarding Firms), Feature Cards |
| `z_features` | Alternating feature highlights | Rows Repeater: Title, Description, Image, Image Alignment (Left/Right), Bullet Points |
| `metrics` | Hard numbers & scale indicators | Metrics Repeater: Value (e.g. `600k+`), Label, Subtext |
| `case_studies` | 3-Column customer proof cards | Cards Repeater: Metric, Client Name, Challenge/Outcome, Action Link |
| `cta_banner` | Bottom conversion banner | Headline, Description, Button Label, Button URL, Background Theme |
| `mega_menu` | Global navigation structure | Menu Tree: Dropdown columns, icons, product links, featured resource card |
| `footer` | SEO link farm & compliance | Multi-column links, Copyright text, Social links, Compliance badges |
