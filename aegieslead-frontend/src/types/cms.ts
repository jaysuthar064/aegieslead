/**
 * TypeScript Interfaces for Aegies Headless CMS Data Schemas
 */

export interface ActionButton {
  label: string;
  url: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
}

export interface MegaMenuColumnLink {
  label: string;
  desc?: string;
  url: string;
  icon?: string;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuColumnLink[];
}

export interface MegaMenuFeaturedCard {
  title: string;
  desc: string;
  cta_text: string;
  cta_url: string;
}

export interface MegaMenuItem {
  id: string;
  label: string;
  url: string;
  badge?: string;
  has_columns?: boolean;
  columns?: MegaMenuColumn[];
  featured_card?: MegaMenuFeaturedCard;
}

export interface HeaderNavSettings {
  mega_menu_enabled: boolean;
  menu_items: MegaMenuItem[];
  action_buttons: ActionButton[];
}

export interface FooterColumnLink {
  label: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  links: FooterColumnLink[];
}

export interface FooterSettings {
  about_text: string;
  columns: FooterColumn[];
  compliance_badges: string[];
  copyright: string;
}

export interface BrandingSettings {
  site_title: string;
  tagline: string;
  logo_text: string;
  logo_url: string;
  dark_logo_url: string;
  favicon_url: string;
  primary_color: string;
  accent_color: string;
  support_email: string;
  support_phone: string;
}

export interface GlobalSettings {
  branding: BrandingSettings;
  header_nav: HeaderNavSettings;
  footer: FooterSettings;
  seo: {
    meta_title: string;
    meta_description: string;
    og_image: string;
  };
}

// SECTION SETTINGS

export interface HeroSettings {
  badge: string;
  headline: string;
  subheadline: string;
  primary_cta: ActionButton;
  secondary_cta: ActionButton;
  hero_image?: string;
  highlight_chips: string[];
}

export interface TrustLogoItem {
  name: string;
  label: string;
  url?: string;
}

export interface TrustLogosSettings {
  title: string;
  logos: TrustLogoItem[];
}

export interface PersonaTabContent {
  tab_title: string;
  tagline: string;
  headline: string;
  description: string;
  bullets: string[];
  stat_badge?: string;
}

export interface AudienceTabsSettings {
  heading: string;
  subheading: string;
  tab_enterprise: PersonaTabContent;
  tab_guarding: PersonaTabContent;
}

export interface FloatingBadge {
  title: string;
  subtitle: string;
}

export interface ProductShowcaseSettings {
  badge: string;
  headline: string;
  subheadline: string;
  image_url?: string;
  floating_badges: FloatingBadge[];
}

export interface ZFeatureRow {
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  image_align: 'left' | 'right';
  image_url?: string;
  cta_text?: string;
  cta_url?: string;
}

export interface ZFeaturesSettings {
  section_title: string;
  rows: ZFeatureRow[];
}

export interface MetricItem {
  value: string;
  label: string;
  subtext: string;
}

export interface MetricsSettings {
  headline: string;
  description: string;
  items: MetricItem[];
}

export interface CaseStudyCard {
  metric: string;
  label: string;
  client: string;
  challenge: string;
  outcome: string;
  link_text: string;
  link_url: string;
}

export interface CaseStudiesSettings {
  title: string;
  subtitle: string;
  cards: CaseStudyCard[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqAccordionSettings {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface CtaBannerSettings {
  headline: string;
  subheadline: string;
  primary_button: ActionButton;
  secondary_button: ActionButton;
  footnote?: string;
}

export type SectionType =
  | 'hero'
  | 'trust_logos'
  | 'audience_tabs'
  | 'product_showcase'
  | 'z_features'
  | 'metrics'
  | 'case_studies'
  | 'faq_accordion'
  | 'cta_banner';

export interface CmsSection<T = any> {
  id: string;
  type: SectionType;
  active: boolean;
  order: number;
  settings: T;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface PageData {
  slug: string;
  meta: PageMeta;
  sections: CmsSection[];
  updated_at?: string;
}

export interface PageSummary {
  slug: string;
  title: string;
  icon: string;
  totalSections: number;
  activeSections: number;
  updatedAt: string;
}

export interface LeadPayload {
  name: string;
  email: string;
  company: string;
  phone?: string;
  guard_count: string;
  persona: string;
  message?: string;
  source?: string;
}

export interface LeadResponse {
  success: boolean;
  lead_id?: string;
  message: string;
  time?: string;
}
