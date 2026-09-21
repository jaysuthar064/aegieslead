import React from 'react';
import type { MetricsSettings } from '../../types/cms';
import { ScrollReveal } from '../motion/ScrollReveal';

interface Props {
  settings: MetricsSettings;
}

export const MetricsSection: React.FC<Props> = ({ settings }) => {
  const items = settings.items || [];

  return (
    <section className="py-24 bg-[#111] text-white">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/20">
          {items.map((item, idx) => (
            <ScrollReveal key={idx} variant="fade" delay={idx * 150} className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/20 last:border-0 flex flex-col justify-end min-h-[240px]">
              <div className="text-[10px] font-mono tracking-widest uppercase opacity-40 mb-auto">
                {item.label}
              </div>
              <div>
                <div className="text-5xl lg:text-6xl font-medium tracking-tighter mb-4">
                  {item.value}
                </div>
                <div className="text-sm text-white/60 font-serif">
                  {item.subtext}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
