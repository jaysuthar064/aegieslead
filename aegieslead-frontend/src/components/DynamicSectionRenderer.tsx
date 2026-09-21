import React from 'react';
import type { CmsSection } from '../types/cms';
import { HeroSection } from './sections/HeroSection';
import { TrustLogosSection } from './sections/TrustLogosSection';
import { AudienceTabsSection } from './sections/AudienceTabsSection';
import { ProductShowcaseSection } from './sections/ProductShowcaseSection';
import { FeatureZRowsSection } from './sections/FeatureZRowsSection';
import { MetricsSection } from './sections/MetricsSection';
import { CaseStudiesSection } from './sections/CaseStudiesSection';
import { FaqAccordionSection } from './sections/FaqAccordionSection';
import { CtaBannerSection } from './sections/CtaBannerSection';

interface Props {
  sections: CmsSection[];
  onRequestDemo?: (persona?: string) => void;
}

export const DynamicSectionRenderer: React.FC<Props> = ({ sections, onRequestDemo }) => {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return (
      <div className="py-24 text-center text-slate-400">
        <p>No active sections configured for this page in WordPress CMS.</p>
      </div>
    );
  }

  // Filter only active sections and sort by order
  const activeSections = sections
    .filter((sec) => sec.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="w-full">
      {activeSections.map((sec) => {
        switch (sec.type) {
          case 'hero':
            return <HeroSection key={sec.id} settings={sec.settings} onRequestDemo={onRequestDemo} />;
          case 'trust_logos':
            return <TrustLogosSection key={sec.id} settings={sec.settings} />;
          case 'audience_tabs':
            return <AudienceTabsSection key={sec.id} settings={sec.settings} onRequestDemo={onRequestDemo} />;
          case 'product_showcase':
            return <ProductShowcaseSection key={sec.id} settings={sec.settings} />;
          case 'z_features':
            return <FeatureZRowsSection key={sec.id} settings={sec.settings} onRequestDemo={onRequestDemo} />;
          case 'metrics':
            return <MetricsSection key={sec.id} settings={sec.settings} />;
          case 'case_studies':
            return <CaseStudiesSection key={sec.id} settings={sec.settings} />;
          case 'faq_accordion':
            return <FaqAccordionSection key={sec.id} settings={sec.settings} />;
          case 'cta_banner':
            return <CtaBannerSection key={sec.id} settings={sec.settings} onRequestDemo={onRequestDemo} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
