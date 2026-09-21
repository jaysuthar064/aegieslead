import React from 'react';
import type { CtaBannerSettings } from '../../types/cms';
import { ScrollReveal } from '../motion/ScrollReveal';

interface Props {
  settings: CtaBannerSettings;
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
}

export const CtaBannerSection: React.FC<Props> = ({ settings, onRequestDemo }) => {
  return (
    <section className="py-40 bg-white border-t border-b border-black text-[#111]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 text-center flex flex-col items-center">
        
        <ScrollReveal variant="line-up" delay={0}>
          <h2 className="text-5xl sm:text-7xl font-sans tracking-tighter font-medium leading-[1.05] mb-8">
            {settings.headline}
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fade" delay={150}>
          <p className="text-xl text-black/50 font-serif max-w-2xl mx-auto mb-12">
            {settings.subheadline}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade" delay={300} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          {settings.primary_button && (
            <button
              onClick={() => onRequestDemo?.('Enterprise', 'demo')}
              className="btn-editorial-solid px-12 py-5 text-xs tracking-widest font-bold uppercase w-full sm:w-auto"
            >
              {settings.primary_button.label}
            </button>
          )}

          {settings.secondary_button && (
            <button
              onClick={() => onRequestDemo?.('Enterprise', 'sales')}
              className="btn-editorial px-12 py-5 text-xs tracking-widest font-bold uppercase w-full sm:w-auto"
            >
              {settings.secondary_button.label}
            </button>
          )}
        </ScrollReveal>

      </div>
    </section>
  );
};
