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
import { HorizontalStoryReel } from './motion/HorizontalStoryReel';
import { ScrollReveal } from './motion/ScrollReveal';

interface Props {
  sections: CmsSection[];
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
  showStoryReel?: boolean;
}

export const DynamicSectionRenderer: React.FC<Props> = ({
  sections,
  onRequestDemo,
  showStoryReel = true
}) => {
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
        let content: React.ReactNode = null;

        switch (sec.type) {
          case 'hero':
            content = <HeroSection key={sec.id} settings={sec.settings} onRequestDemo={onRequestDemo} />;
            break;
          case 'trust_logos':
            content = <TrustLogosSection key={sec.id} settings={sec.settings} />;
            break;
          case 'audience_tabs':
            content = <AudienceTabsSection key={sec.id} settings={sec.settings} onRequestDemo={onRequestDemo} />;
            break;
          case 'product_showcase':
            content = <ProductShowcaseSection key={sec.id} settings={sec.settings} />;
            break;
          case 'z_features':
            content = <FeatureZRowsSection key={sec.id} settings={sec.settings} onRequestDemo={onRequestDemo} />;
            break;
          case 'metrics':
            content = <MetricsSection key={sec.id} settings={sec.settings} />;
            break;
          case 'case_studies':
            content = <CaseStudiesSection key={sec.id} settings={sec.settings} onRequestDemo={onRequestDemo} />;
            break;
          case 'faq_accordion':
            content = <FaqAccordionSection key={sec.id} settings={sec.settings} />;
            break;
          case 'cta_banner':
            content = <CtaBannerSection key={sec.id} settings={sec.settings} onRequestDemo={onRequestDemo} />;
            break;
          default:
            content = null;
            break;
        }

        const isHeroOrLogos = sec.type === 'hero' || sec.type === 'trust_logos';

        return (
          <React.Fragment key={sec.id}>
            {isHeroOrLogos ? (
              content
            ) : (
              <ScrollReveal variant="fade" delay={50} threshold={0.1}>
                {content}
              </ScrollReveal>
            )}

            {/* Inject Pinned Horizontal Story Reel right after product showcase or audience tabs */}
            {showStoryReel && (sec.type === 'audience_tabs' || (sec.type === 'product_showcase' && activeSections.length < 6)) && (
              <ScrollReveal variant="fade" delay={80} threshold={0.1}>
                <HorizontalStoryReel onRequestDemo={onRequestDemo} />
              </ScrollReveal>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
