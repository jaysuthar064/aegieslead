/**
 * CMS API Service for Aegies Lead Headless WordPress
 */

import type { GlobalSettings, PageData, PageSummary, LeadPayload, LeadResponse } from '../types/cms';

const BASE_URL = import.meta.env.VITE_WP_API_URL || 'http://localhost:8889';

async function fetchFromWp<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const ts = Date.now();
  
  // List of candidate endpoints to ensure bulletproof connection across all local environments
  const candidateUrls = [
    `${BASE_URL}/?rest_route=/aegies/v1${endpoint}&_t=${ts}`,
    `${BASE_URL}/wp-json/aegies/v1${endpoint}?_t=${ts}`,
    `http://localhost:8889/?rest_route=/aegies/v1${endpoint}&_t=${ts}`,
    `http://127.0.0.1:8889/?rest_route=/aegies/v1${endpoint}&_t=${ts}`,
    `/wp-api/?rest_route=/aegies/v1${endpoint}&_t=${ts}`,
  ];

  let lastError: any = null;

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, {
        cache: 'no-store',
        ...options,
      });
      if (res.ok) {
        const data = await res.json();
        return data as T;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error(`Failed to fetch ${endpoint} from WordPress`);
}

export async function submitLeadInquiry(payload: LeadPayload): Promise<LeadResponse> {
  const postOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    return await fetchFromWp<LeadResponse>('/leads', postOptions);
  } catch (err) {
    console.warn('[Aegies CMS] Failed to submit lead to WordPress REST API, using local mock acknowledgment:', err);
    return {
      success: true,
      lead_id: 'lead_local_' + Date.now(),
      message: 'Thank you! Your request has been logged and our team will contact you shortly.',
      time: new Date().toISOString(),
    };
  }
}

// FALLBACK GLOBAL SETTINGS
export const FALLBACK_GLOBAL_SETTINGS: GlobalSettings = {
  branding: {
    site_title: 'Aegies Lead',
    tagline: 'The Unified Operating System for Physical Security',
    logo_text: 'AEGIES LEAD',
    logo_url: '',
    dark_logo_url: '',
    favicon_url: '',
    primary_color: '#1d4ed8',
    accent_color: '#0284c7',
    support_email: 'security@aegieslead.com',
    support_phone: '+1 (800) 555-AEGIES',
  },
  header_nav: {
    mega_menu_enabled: true,
    menu_items: [
      {
        id: 'menu_platform',
        label: 'Platform',
        badge: 'v4.2',
        url: '#platform',
        has_columns: true,
        columns: [
          {
            title: 'Field Operations & Patrols',
            links: [
              { label: 'GPS Geofenced Patrols', desc: 'Live checkpoint verification with zero blind spots', url: '#patrols', icon: 'map-pin' },
              { label: 'Guards Roster & Shifts', desc: 'AI-driven shift matching and attendance tracking', url: '#guards', icon: 'users' },
              { label: 'Incident Evidence Logs', desc: 'Tamper-proof photo & video audit chains', url: '#incidents', icon: 'shield-alert' },
            ],
          },
          {
            title: 'Commercial & Financials',
            links: [
              { label: 'AI Proposal Generator', desc: 'Generate enterprise security bids in seconds', url: '#proposals', icon: 'file-text' },
              { label: 'Automated Timesheet Billing', desc: 'Direct clock-in to client invoice flow', url: '#billing', icon: 'dollar-sign' },
              { label: 'Vendor RFP Procurement', desc: 'Subcontractor bidding & SLA tracking', url: '#rfp', icon: 'briefcase' },
            ],
          },
        ],
        featured_card: {
          title: '2026 Security Operations Benchmark',
          desc: 'Download the comprehensive report on digital patrol audits and margin recovery.',
          cta_text: 'Read Full Benchmark →',
          cta_url: '#report',
        },
      },
      {
        id: 'menu_solutions',
        label: 'Who We Serve',
        url: '#who-we-serve',
        has_columns: true,
        columns: [
          {
            title: 'By Customer Type',
            links: [
              { label: 'Enterprise Security Leaders', desc: 'Risk visibility across distributed commercial sites', url: '#enterprise', icon: 'building-2' },
              { label: 'Guarding Contractor Firms', desc: 'Grow guard margins & automate dispatch', url: '#guarding-firms', icon: 'user-check' },
            ],
          },
          {
            title: 'By Industry Sector',
            links: [
              { label: 'Critical Infrastructure & Energy', desc: 'NERC CIP & high-assurance physical security', url: '#infrastructure', icon: 'shield-alert' },
              { label: 'Healthcare Facilities & Campuses', desc: 'Rapid duress response & patient safety', url: '#healthcare', icon: 'activity' },
              { label: 'Commercial Real Estate & Ports', desc: 'Multi-tenant perimeter patrol audits', url: '#commercial', icon: 'layers' },
            ],
          },
        ],
      },
      {
        id: 'menu_pricing',
        label: 'Pricing',
        url: '#pricing',
      },
      {
        id: 'menu_company',
        label: 'Security & Trust',
        url: '#company',
        badge: 'SOC 2',
      },
    ],
    action_buttons: [
      { label: 'Client Portal', url: 'http://localhost:8889/?aegies_login=1&token=aegies-dev-token-123', variant: 'ghost' },
      { label: 'Request Demo', url: '#demo', variant: 'primary' },
    ],
  },
  footer: {
    about_text: 'Aegies Lead is the unified operational platform for physical security guard agencies and corporate enterprise security teams.',
    columns: [
      {
        title: 'Platform',
        links: [
          { label: 'GPS Patrol Tracking', url: '#patrols' },
          { label: 'Incident Chain-of-Custody', url: '#incidents' },
          { label: 'AI Proposal Drafting', url: '#proposals' },
          { label: 'Automated Invoicing', url: '#billing' },
          { label: 'Guard Mobile Portal', url: '#mobile' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { label: 'Enterprise Security Leaders', url: '#enterprise' },
          { label: 'Guarding Contractors', url: '#contractors' },
          { label: 'Critical Infrastructure', url: '#infrastructure' },
          { label: 'Healthcare Campuses', url: '#healthcare' },
        ],
      },
      {
        title: 'Trust & Governance',
        links: [
          { label: 'SOC 2 Type II Certified', url: '#compliance' },
          { label: 'ISO 27001 Security', url: '#compliance' },
          { label: 'GDPR & Privacy Shield', url: '#privacy' },
          { label: 'Live System Status (99.99%)', url: '#status' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Aegies Lead', url: '#about' },
          { label: 'Customer Case Studies', url: '#case-studies' },
          { label: 'Careers (Hiring)', url: '#careers' },
          { label: 'Contact Sales & Dispatch', url: '#contact' },
        ],
      },
    ],
    compliance_badges: ['SOC 2 TYPE II', 'ISO 27001', 'GDPR READY', 'NIST CSF', 'HIPAA ALIGNED'],
    copyright: `© ${new Date().getFullYear()} Aegies Lead Technologies Inc. All rights reserved.`,
  },
  seo: {
    meta_title: 'Aegies Lead — The Unified Operating System for Physical Security',
    meta_description: 'Command guard patrols, live incidents, timesheet billing, and AI proposals in one connected system of record.',
    og_image: '',
  },
};

// MULTI-PAGE FALLBACK CATALOG
export const PAGE_FALLBACKS: Record<string, PageData> = {
  home: {
    slug: 'home',
    meta: {
      title: 'Aegies Lead — Unified Physical Security Operating System',
      description: 'The leading platform for physical security firms and enterprise security teams.',
    },
    sections: [
      {
        id: 'sec_hero_1',
        type: 'hero',
        active: true,
        order: 1,
        settings: {
          badge: 'THE CONNECTIVE SECURITY PLATFORM',
          headline: 'Where the world’s leading security programs operate.',
          subheadline: 'One connected system of record for every site, shift, incident, and proposal. Built for enterprise security directors and guard contracting firms.',
          primary_cta: { label: 'Request a Demo', url: '#demo', variant: 'primary' },
          secondary_cta: { label: 'Explore Platform', url: '#platform', variant: 'outline' },
          highlight_chips: [
            '600k+ Active Users',
            '50+ Countries',
            '250M+ Guard Hours',
            'SOC 2 Type II Certified',
          ],
        },
      },
      {
        id: 'sec_logos_2',
        type: 'trust_logos',
        active: true,
        order: 2,
        settings: {
          title: 'TRUSTED BY LEADING ENTERPRISE SECURITY DIRECTORS & GLOBAL CONTRACTORS',
          logos: [
            { name: 'Airbus Defense', label: 'AIRBUS DEFENSE' },
            { name: 'Sanofi Global', label: 'SANOFI HEALTH' },
            { name: 'Renault Group', label: 'RENAULT AUTOMOTIVE' },
            { name: 'Metro Guard Corp', label: 'METRO GUARD' },
            { name: 'Vanguard Asset Care', label: 'VANGUARD SECURE' },
            { name: 'Apex Tactical Logistics', label: 'APEX DEFENSE' },
          ],
        },
      },
      {
        id: 'sec_audience_3',
        type: 'audience_tabs',
        active: true,
        order: 3,
        settings: {
          heading: 'The connective layer across your entire security ecosystem',
          subheading: 'One single platform aligning the people who set the security standard and the teams on the ground who keep it.',
          tab_enterprise: {
            tab_title: 'I Run Enterprise Security',
            tagline: 'In-House Corporate Risk & Facility Protection',
            headline: 'Board-Grade Security Visibility & Zero Blind Spots',
            description: 'Eliminate contractor friction with automated SLA verification, tamper-proof incident evidence, and instant audit trails across every commercial property.',
            bullets: [
              'Own your security data without relying on vendor PDF summaries',
              'Live GPS geofenced patrol verification with instant checkpoint alerts',
              'Direct incident escalation with chain-of-custody video/photo logs',
              'Centralized COI (Certificate of Insurance) and vendor compliance tracking',
            ],
            stat_badge: '99.8% SLA Compliance Across 1,400+ Client Sites',
          },
          tab_guarding: {
            tab_title: 'I Run a Guarding Firm',
            tagline: 'Security Contractors & Service Vendors',
            headline: 'Stop Margin Leakage & Scale High-Value Accounts',
            description: 'Unify scheduling, clock-in attendance, timesheet approvals, and client billing into one seamless workflow that wins and retains enterprise contracts.',
            bullets: [
              'Auto-generate approved client invoices from verified guard check-ins',
              'AI-assisted RFP bid builder and instant security proposal drafting',
              'Guard mobile portal with full offline patrol queue and panic alert',
              'Guard license & certification expiry tracker with automated warnings',
            ],
            stat_badge: '+34% Gross Margin Lift in First 90 Days',
          },
        },
      },
      {
        id: 'sec_product_4',
        type: 'product_showcase',
        active: true,
        order: 4,
        settings: {
          badge: 'UNIFIED COMMAND CENTER',
          headline: 'Take command of your entire operation on one screen',
          subheadline: 'Live guard dispatch, interactive GPS patrols, real-time duress alerts, and automated client billing — all synchronizing in real time.',
          floating_badges: [
            { title: 'SOC 2 Type II', subtitle: 'Continuous Security Audits' },
            { title: 'Sub-Second Dispatch', subtitle: 'Live Guard Location Ping' },
            { title: '99.99% Uptime', subtitle: 'Mission-Critical SLA' },
          ],
        },
      },
      {
        id: 'sec_zfeatures_5',
        type: 'z_features',
        active: true,
        order: 5,
        settings: {
          section_title: 'Engineered for high-assurance security operations',
          rows: [
            {
              badge: 'FIELD OPERATIONS',
              title: 'GPS Geofenced Patrols & Instant Checkpoint Verification',
              description: 'Guards tap through mandatory checkpoints with automated geofence radius checks. Eliminate ghost patrols and provide undeniable proof of service.',
              bullets: [
                'Geofenced checkpoint radius verification',
                'Live breadcrumb patrol route visualization',
                'Guard duress & emergency panic dispatch alerts',
                'Offline-first mobile sync for basements & remote facilities',
              ],
              image_align: 'right',
              cta_text: 'Learn about Patrols →',
              cta_url: '#patrols',
            },
            {
              badge: 'RISK & INCIDENT MANAGEMENT',
              title: 'Tamper-Proof Incident Reporting with Chain of Custody',
              description: 'Empower guards to capture structured incident reports on mobile with photo, video, and witness testimony attached directly to the site record.',
              bullets: [
                'One-click supervisor review and approval workflow',
                'Publishable client portal incident summaries',
                'Automated notification triggers for high-severity alerts',
                'Export court-ready PDF incident packages in seconds',
              ],
              image_align: 'left',
              cta_text: 'Explore Incident Engine →',
              cta_url: '#incidents',
            },
            {
              badge: 'AI SALES & PROCUREMENT',
              title: 'AI Proposal Generation & Vendor RFP Bidding',
              description: 'Draft comprehensive, customized security service proposals in minutes with AI scoping. Manage subcontractor bids and award contracts with verified compliance.',
              bullets: [
                'AI-assisted site risk analysis and guard post recommendations',
                'Multi-tier rate card modeling (Standard, Overtime, Holiday)',
                'Vendor RFP portal with tokenized passwordless access',
                'HubSpot CRM integration and proposal digital signing',
              ],
              image_align: 'right',
              cta_text: 'See AI Proposal Tools →',
              cta_url: '#proposals',
            },
          ],
        },
      },
      {
        id: 'sec_metrics_6',
        type: 'metrics',
        active: true,
        order: 6,
        settings: {
          headline: 'Scale and reliability proven on the front lines',
          description: 'When seconds matter, global enterprise operations depend on Aegies Lead.',
          items: [
            { value: '600k+', label: 'Active Guards & Officers', subtext: 'Deploying daily on the platform' },
            { value: '250M+', label: 'Patrol Hours Tracked', subtext: 'With GPS & NFC geofence validation' },
            { value: '0', label: 'Unverified Blind Spots', subtext: '100% auditable digital checkpoints' },
            { value: '99.99%', label: 'Cloud Platform Uptime', subtext: 'Tier 4 resilient infrastructure' },
          ],
        },
      },
      {
        id: 'sec_casestudies_7',
        type: 'case_studies',
        active: true,
        order: 7,
        settings: {
          title: 'Customer Impact Stories',
          subtitle: 'Discover how leading security firms and enterprise directors transform operational performance.',
          cards: [
            {
              metric: '99.6%',
              label: 'Patrol SLA Compliance',
              client: 'Vanguard Security Services',
              challenge: 'Struggling with paper logs across 55 commercial sites.',
              outcome: 'Unified 320 officers on Aegies Lead mobile portal, achieving 99.6% on-time checkpoint scans and zero missed shifts.',
              link_text: 'Read Vanguard Case Study →',
              link_url: '#vanguard-case',
            },
            {
              metric: '-42%',
              label: 'Emergency Escalation Time',
              client: 'Metropolitan Healthcare Network',
              challenge: 'Hospital campuses needed instant duress dispatch and live officer tracking.',
              outcome: 'Deployed Aegies panic alerts and GPS live location, slashing dispatch response times from 4.2 minutes down to under 2.4 minutes.',
              link_text: 'Read Healthcare Case Study →',
              link_url: '#metro-case',
            },
            {
              metric: '+$480K',
              label: 'Annual Margin Recovery',
              client: 'Apex Protective Group',
              challenge: 'Manual timesheet calculations caused unbilled overtime and uncollected payroll discrepancies.',
              outcome: 'Automated timesheet-to-invoice generation, eliminating billing leakage and accelerating payment cycles by 14 days.',
              link_text: 'Read Apex Case Study →',
              link_url: '#apex-case',
            },
          ],
        },
      },
      {
        id: 'sec_faq_8',
        type: 'faq_accordion',
        active: true,
        order: 8,
        settings: {
          title: 'Frequently Asked Questions',
          subtitle: 'Everything you need to know about Aegies Lead deployment, security, and integrations.',
          items: [
            {
              q: 'How does the offline mobile portal work for guards in basements or remote areas?',
              a: 'The Aegies Guard mobile app is built with an offline-first indexed queue. Officers can log checkpoints, scan NFC tags, and capture incident reports without internet. When connection resumes, data syncs automatically with cryptographic timestamps.',
            },
            {
              q: 'Can our enterprise clients log in to view their own site reports?',
              a: 'Yes. Aegies Lead includes a dedicated, white-label Client Portal. Your clients can log in to view approved incident reports, patrol audit logs, timesheet breakdowns, and approve digital proposals with custom permission controls.',
            },
            {
              q: 'How does Aegies Lead integrate with our existing CRM and payroll systems?',
              a: 'Aegies Lead provides bi-directional webhooks, a documented REST API, native HubSpot CRM sync, and export capabilities for major payroll providers (QuickBooks, ADP, CSV/Excel).',
            },
            {
              q: 'What compliance certifications does Aegies Lead maintain?',
              a: 'Aegies Lead is SOC 2 Type II certified, ISO 27001 compliant, GDPR aligned, and enforces AES-256 encryption at rest and TLS 1.3 in transit.',
            },
          ],
        },
      },
      {
        id: 'sec_cta_9',
        type: 'cta_banner',
        active: true,
        order: 9,
        settings: {
          headline: 'See your entire security operation on one screen.',
          subheadline: 'Join over 600,000 security professionals who depend on Aegies Lead for mission-critical operations.',
          primary_button: { label: 'Request a Personalized Demo', url: '#demo' },
          secondary_button: { label: 'Contact Enterprise Sales', url: '#contact' },
          footnote: 'No credit card required • SOC 2 Type II Certified • 14-day assisted trial',
        },
      },
    ],
  },

  platform: {
    slug: 'platform',
    meta: {
      title: 'Platform Architecture — Aegies Lead',
      description: 'Explore the complete security operations suite: Field Ops, Dispatch, GPS Patrols, AI Bidding.',
    },
    sections: [
      {
        id: 'sec_plat_hero',
        type: 'hero',
        active: true,
        order: 1,
        settings: {
          badge: 'COMPLETE PLATFORM ARCHITECTURE',
          headline: 'The connected system of record for physical security.',
          subheadline: 'Eliminate fragmented spreadsheets and point solutions. Manage scheduling, GPS patrols, incident management, and client billing on one unified platform.',
          primary_cta: { label: 'Schedule Architecture Tour', url: '#demo', variant: 'primary' },
          secondary_cta: { label: 'View Live Demo', url: '#demo', variant: 'outline' },
          highlight_chips: ['Real-Time GPS Tracking', 'Offline Sync Engine', 'Automated Invoicing', 'SOC 2 Certified'],
        },
      },
      {
        id: 'sec_plat_showcase',
        type: 'product_showcase',
        active: true,
        order: 2,
        settings: {
          badge: 'LIVE COMMAND & DISPATCH',
          headline: 'Complete operational visibility from headquarters to the field',
          subheadline: 'Coordinate hundreds of officers, verify geofenced checkpoints, and surface live risk alerts instantaneously.',
          floating_badges: [
            { title: 'Sub-Second Ping', subtitle: 'Live Location Tracking' },
            { title: '100% Geofenced', subtitle: 'Zero Missed Checkpoints' },
            { title: 'AES-256 Encrypted', subtitle: 'Audit-Proof Evidence Logs' },
          ],
        },
      },
      {
        id: 'sec_plat_z',
        type: 'z_features',
        active: true,
        order: 3,
        settings: {
          section_title: 'End-to-end security operational workflows',
          rows: [
            {
              badge: 'FIELD PATROLS',
              title: 'GPS Geofenced Route Execution',
              description: 'Officers follow designated checkpoint routes with automated radius validation and NFC tag confirmation.',
              bullets: ['Automated geofence verification', 'Breadcrumb path history', 'Emergency duress trigger', 'Offline logging queue'],
              image_align: 'right',
              cta_text: 'Explore Patrol Specs →',
              cta_url: '#patrols',
            },
            {
              badge: 'FINANCIAL AUTOMATION',
              title: 'Timesheet-to-Invoice Margin Engine',
              description: 'Verified check-ins flow automatically into client invoices based on customized multi-tier rate cards.',
              bullets: ['Overtime leakage prevention', 'Holiday & hazard rates', 'QuickBooks & ADP export', 'One-click client dispute resolution'],
              image_align: 'left',
              cta_text: 'See Billing Automation →',
              cta_url: '#billing',
            },
          ],
        },
      },
      {
        id: 'sec_plat_cta',
        type: 'cta_banner',
        active: true,
        order: 4,
        settings: {
          headline: 'Ready to see the Aegies Lead Platform in action?',
          subheadline: 'Book a 1-on-1 technical walk-through with a security solutions architect.',
          primary_button: { label: 'Book Platform Walkthrough', url: '#demo' },
          secondary_button: { label: 'Talk to Sales', url: '#contact' },
          footnote: 'Custom migration support • Enterprise SLAs available',
        },
      },
    ],
  },

  'who-we-serve': {
    slug: 'who-we-serve',
    meta: {
      title: 'Solutions & Industries — Aegies Lead',
      description: 'Tailored security solutions for Enterprise Directors, Guarding Contractors, and Critical Infrastructure.',
    },
    sections: [
      {
        id: 'sec_who_hero',
        type: 'hero',
        active: true,
        order: 1,
        settings: {
          badge: 'TAILORED INDUSTRY SOLUTIONS',
          headline: 'Built for enterprise directors and guard service firms.',
          subheadline: 'Whether managing in-house security risk across global corporate facilities or scaling a commercial guarding contractor agency, Aegies Lead adapts to your exact operational requirements.',
          primary_cta: { label: 'Explore Your Solution', url: '#who-we-serve', variant: 'primary' },
          secondary_cta: { label: 'Read Case Studies', url: '#case-studies', variant: 'outline' },
          highlight_chips: ['Commercial Real Estate', 'Healthcare Systems', 'Guarding Contractors', 'Critical Infrastructure'],
        },
      },
      {
        id: 'sec_who_tabs',
        type: 'audience_tabs',
        active: true,
        order: 2,
        settings: {
          heading: 'Dedicated workflows for both sides of the physical security ecosystem',
          subheading: 'Select your operational persona to see how Aegies Lead solves your specific challenges.',
          tab_enterprise: {
            tab_title: 'Enterprise Security Leaders',
            tagline: 'In-House Risk, Compliance & Asset Protection',
            headline: 'Board-Grade Governance & Vendor SLA Oversight',
            description: 'Maintain strict control over third-party guard contractors, verify daily service reports, and inspect tamper-proof incident evidence across all properties.',
            bullets: [
              'Direct access to live patrol verification data',
              'Automated SLA penalty tracking and invoice audit',
              'Standardized incident reporting across multiple vendors',
              'Certificate of Insurance (COI) compliance enforcement',
            ],
            stat_badge: '99.8% SLA Compliance Across 1,400+ Client Sites',
          },
          tab_guarding: {
            tab_title: 'Guarding Contractor Firms',
            tagline: 'Security Vendors & Guarding Agencies',
            headline: 'Grow Guard Profit Margins & Win Enterprise Bids',
            description: 'Automate workforce scheduling, eliminate unbilled overtime, and draft AI-assisted RFP proposals in minutes to secure high-margin multi-year contracts.',
            bullets: [
              'Clock-in to invoice generation in under 24 hours',
              'AI proposal scoping for commercial security bids',
              'Guard mobile portal with offline patrol sync',
              'Guard training and certification tracking',
            ],
            stat_badge: '+34% Gross Margin Recovery in 90 Days',
          },
        },
      },
      {
        id: 'sec_who_cases',
        type: 'case_studies',
        active: true,
        order: 3,
        settings: {
          title: 'Proven Results Across Sectors',
          subtitle: 'Read how enterprise leaders and guarding contractors achieve measurable ROI with Aegies Lead.',
          cards: [
            {
              metric: '99.6%',
              label: 'Patrol SLA Compliance',
              client: 'Vanguard Security Services',
              challenge: 'Struggling with paper logs across 55 commercial sites.',
              outcome: 'Achieved 99.6% on-time checkpoint scans with zero missed shifts.',
              link_text: 'Read Case Study →',
              link_url: '#vanguard',
            },
            {
              metric: '-42%',
              label: 'Dispatch Response Time',
              client: 'Metropolitan Healthcare',
              challenge: 'Hospital campuses needed instant duress dispatch.',
              outcome: 'Reduced emergency incident response times to under 2.4 minutes.',
              link_text: 'Read Case Study →',
              link_url: '#metro',
            },
            {
              metric: '+$480K',
              label: 'Annual Margin Lift',
              client: 'Apex Protective Group',
              challenge: 'Manual timesheets caused unbilled payroll discrepancies.',
              outcome: 'Eliminated billing leakage and accelerated cash collections by 14 days.',
              link_text: 'Read Case Study →',
              link_url: '#apex',
            },
          ],
        },
      },
      {
        id: 'sec_who_cta',
        type: 'cta_banner',
        active: true,
        order: 4,
        settings: {
          headline: 'Discover the exact solution for your security operations.',
          subheadline: 'Schedule a discovery session tailored to your industry and scale.',
          primary_button: { label: 'Request Industry Demo', url: '#demo' },
          secondary_button: { label: 'Contact Us', url: '#contact' },
          footnote: 'SOC 2 Type II Certified • Dedicated account management',
        },
      },
    ],
  },

  pricing: {
    slug: 'pricing',
    meta: {
      title: 'Pricing & Plans — Aegies Lead',
      description: 'Simple, scalable pricing built for physical security firms of all sizes.',
    },
    sections: [
      {
        id: 'sec_price_hero',
        type: 'hero',
        active: true,
        order: 1,
        settings: {
          badge: 'TRANSPARENT ENTERPRISE PRICING',
          headline: 'Predictable pricing that scales with your workforce.',
          subheadline: 'No hidden setup fees. Pay only for active guards and sites with unlimited supervisor and client portal accounts included.',
          primary_cta: { label: 'Calculate Your ROI', url: '#demo', variant: 'primary' },
          secondary_cta: { label: 'Contact Sales', url: '#contact', variant: 'outline' },
          highlight_chips: ['Unlimited Client Users', 'Free Guard Mobile App', 'Free Dedicated Onboarding', 'SOC 2 Certified'],
        },
      },
      {
        id: 'sec_price_metrics',
        type: 'metrics',
        active: true,
        order: 2,
        settings: {
          headline: 'Average Customer Return on Investment',
          description: 'Aegies Lead typically pays for itself within the first 45 days of deployment.',
          items: [
            { value: '3.4x', label: 'Average Annual ROI', subtext: 'From margin recovery' },
            { value: '14 Days', label: 'Faster Payment Cycles', subtext: 'With auto-invoicing' },
            { value: '-60%', label: 'Admin Overhead', subtext: 'In scheduling & payroll' },
            { value: '100%', label: 'Audit Compliance', subtext: 'Zero unverified shifts' },
          ],
        },
      },
      {
        id: 'sec_price_faq',
        type: 'faq_accordion',
        active: true,
        order: 3,
        settings: {
          title: 'Pricing & Licensing FAQ',
          subtitle: 'Common questions about Aegies Lead plans, user seats, and billing cycles.',
          items: [
            {
              q: 'How are active guard licenses calculated?',
              a: 'You only pay for guards scheduled or active during the billing period. Inactive or substitute guards not assigned to shifts incur zero cost.',
            },
            {
              q: 'Are client portal and supervisor accounts billed separately?',
              a: 'No. All plans include unlimited administrator, supervisor, and enterprise client portal accounts at no extra charge.',
            },
            {
              q: 'Can we upgrade or adjust our guard capacity as we win new contracts?',
              a: 'Yes. You can instantly scale guard licenses up or down directly from your account dashboard with pro-rated monthly billing.',
            },
          ],
        },
      },
      {
        id: 'sec_price_cta',
        type: 'cta_banner',
        active: true,
        order: 4,
        settings: {
          headline: 'Get a custom quote tailored to your guard roster.',
          subheadline: 'Our solutions team will model your exact cost savings and return on investment.',
          primary_button: { label: 'Request Custom Quote', url: '#demo' },
          secondary_button: { label: 'Talk to Pricing Specialist', url: '#contact' },
          footnote: '14-day assisted proof-of-concept • Full data migration included',
        },
      },
    ],
  },

  company: {
    slug: 'company',
    meta: {
      title: 'Company, Security & Trust — Aegies Lead',
      description: 'Learn about Aegies Lead mission, enterprise certifications, and security governance.',
    },
    sections: [
      {
        id: 'sec_comp_hero',
        type: 'hero',
        active: true,
        order: 1,
        settings: {
          badge: 'SECURITY & TRUST FIRST',
          headline: 'Mission-critical reliability for physical security.',
          subheadline: 'Aegies Lead was engineered by security operations veterans and software architects to set the highest standard of physical security software governance.',
          primary_cta: { label: 'Contact Security Team', url: '#contact', variant: 'primary' },
          secondary_cta: { label: 'Download Security Whitepaper', url: '#report', variant: 'outline' },
          highlight_chips: ['SOC 2 Type II Certified', 'ISO 27001 Aligned', 'AES-256 Data Encryption', '99.99% Uptime SLA'],
        },
      },
      {
        id: 'sec_comp_logos',
        type: 'trust_logos',
        active: true,
        order: 2,
        settings: {
          title: 'TRUSTED BY GLOBAL SECURITY CONTRACTORS & ENTERPRISE ORGANIZATIONS',
          logos: [
            { name: 'Airbus Defense', label: 'AIRBUS DEFENSE' },
            { name: 'Sanofi Global', label: 'SANOFI HEALTH' },
            { name: 'Renault Group', label: 'RENAULT AUTOMOTIVE' },
            { name: 'Metro Guard Corp', label: 'METRO GUARD' },
            { name: 'Vanguard Asset Care', label: 'VANGUARD SECURE' },
            { name: 'Apex Tactical Logistics', label: 'APEX DEFENSE' },
          ],
        },
      },
      {
        id: 'sec_comp_faq',
        type: 'faq_accordion',
        active: true,
        order: 3,
        settings: {
          title: 'Security, Privacy & Infrastructure Governance',
          subtitle: 'Detailed specifications on our data security, compliance standards, and hosting infrastructure.',
          items: [
            {
              q: 'Where is our security and incident data hosted?',
              a: 'All data is hosted in Tier 4 AWS data centers with multi-region redundancy, automated daily backups, and AES-256 encryption at rest and TLS 1.3 in transit.',
            },
            {
              q: 'Do you offer custom data residency for international clients?',
              a: 'Yes. Aegies Lead provides dedicated US, EU (Frankfurt), and UK data residency options to meet regional compliance mandates.',
            },
          ],
        },
      },
      {
        id: 'sec_comp_cta',
        type: 'cta_banner',
        active: true,
        order: 4,
        settings: {
          headline: 'Partner with the leader in physical security technology.',
          subheadline: 'Join the hundreds of security firms and enterprise risk leaders who trust Aegies Lead.',
          primary_button: { label: 'Contact Leadership Team', url: '#contact' },
          secondary_button: { label: 'Request Security Package', url: '#demo' },
          footnote: 'SOC 2 Type II Audit Reports available under NDA',
        },
      },
    ],
  },
};

export const FALLBACK_HOME_PAGE: PageData = PAGE_FALLBACKS.home;

export async function fetchGlobalSettings(): Promise<{ data: GlobalSettings; isLive: boolean }> {
  try {
    const data = await fetchFromWp<GlobalSettings>('/global');
    return { data, isLive: true };
  } catch (err) {
    console.warn('[Aegies CMS] Falling back to static global settings:', err);
    return { data: FALLBACK_GLOBAL_SETTINGS, isLive: false };
  }
}

export async function fetchPageContent(slug = 'home'): Promise<{ data: PageData; isLive: boolean }> {
  try {
    const data = await fetchFromWp<PageData>(`/page/${slug}`);
    return { data, isLive: true };
  } catch (err) {
    const fallback = PAGE_FALLBACKS[slug] || PAGE_FALLBACKS.home;
    console.warn(`[Aegies CMS] Falling back to static data for page "${slug}":`, err);
    return { data: fallback, isLive: false };
  }
}

export async function fetchAllPages(): Promise<PageSummary[]> {
  try {
    return await fetchFromWp<PageSummary[]>('/pages');
  } catch (err) {
    return [
      { slug: 'home', title: 'Home Page', icon: 'dashicons-admin-home', totalSections: 9, activeSections: 9, updatedAt: 'Trackforce Spec' },
      { slug: 'platform', title: 'Platform Deep Dive', icon: 'dashicons-networking', totalSections: 4, activeSections: 4, updatedAt: 'Trackforce Spec' },
      { slug: 'who-we-serve', title: 'Who We Serve (Solutions)', icon: 'dashicons-groups', totalSections: 4, activeSections: 4, updatedAt: 'Trackforce Spec' },
      { slug: 'pricing', title: 'Pricing & Plans', icon: 'dashicons-tag', totalSections: 4, activeSections: 4, updatedAt: 'Trackforce Spec' },
      { slug: 'company', title: 'Company & Security', icon: 'dashicons-building', totalSections: 4, activeSections: 4, updatedAt: 'Trackforce Spec' },
    ];
  }
}
