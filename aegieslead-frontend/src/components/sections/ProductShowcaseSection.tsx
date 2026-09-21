import React from 'react';
import type { ProductShowcaseSettings } from '../../types/cms';
import { ScrollReveal } from '../motion/ScrollReveal';

interface Props {
  settings: ProductShowcaseSettings;
}

export const ProductShowcaseSection: React.FC<Props> = ({ settings }) => {
  return (
    <section id="platform" className="py-32 bg-[#111] text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 editorial-grid items-center">
        
        <div className="col-span-12 lg:col-span-5 mb-16 lg:mb-0">
          {settings.badge && (
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 border border-white/20 px-3 py-1 mb-8 inline-block">
              {settings.badge}
            </span>
          )}
          <h2 className="text-4xl sm:text-6xl font-serif font-medium tracking-tight mb-8 leading-[1.1]">
            {settings.headline}
          </h2>
          <p className="text-xl text-white/60 font-sans font-light leading-relaxed">
            {settings.subheadline}
          </p>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <ScrollReveal variant="mask-up" className="aspect-square sm:aspect-video lg:aspect-square bg-black border border-white/10 relative overflow-hidden" data-cursor="drag">
            {settings.image_url ? (
              <img src={settings.image_url} className="w-full h-full object-cover opacity-80" alt="" />
            ) : (
              <div className="absolute inset-0 p-8 flex flex-col justify-between font-mono text-[10px] uppercase tracking-widest opacity-60">
                <div className="flex justify-between border-b border-white/20 pb-4">
                  <span>Aegies Dispatch Control</span>
                  <span>System Nominal</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="border border-white/20 p-4">
                    <div className="text-2xl font-serif mb-2 text-white">99.8%</div>
                    <span>SLA Uptime</span>
                  </div>
                  <div className="border border-white/20 p-4">
                    <div className="text-2xl font-serif mb-2 text-white">12ms</div>
                    <span>Ping Latency</span>
                  </div>
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
