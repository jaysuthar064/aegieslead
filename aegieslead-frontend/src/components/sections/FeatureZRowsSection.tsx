import React from 'react';
import type { ZFeaturesSettings } from '../../types/cms';
import { ScrollReveal } from '../motion/ScrollReveal';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-cursor'?: string;
  }
}

interface Props {
  settings: ZFeaturesSettings;
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
}

export const FeatureZRowsSection: React.FC<Props> = ({ settings, onRequestDemo }) => {
  const rows = settings.rows || [];

  return (
    <section className="py-32 bg-white text-[#111]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        
        {settings.section_title && (
          <ScrollReveal variant="line-up" className="mb-24 md:w-2/3">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight font-serif leading-tight">
              {settings.section_title}
            </h2>
          </ScrollReveal>
        )}

        <div className="space-y-32">
          {rows.map((row, idx) => (
            <div key={idx} className="editorial-grid items-start border-t-2 border-black/5 pt-12">
              
              {/* Counter & Badge */}
              <div className="col-span-12 md:col-span-3 flex md:flex-col justify-between mb-8 md:mb-0">
                <span className="font-mono text-xs opacity-40">0{idx + 1}</span>
                {row.badge && <span className="font-mono text-[10px] uppercase tracking-widest mt-auto border border-black/10 px-2 py-1 inline-block w-max">{row.badge}</span>}
              </div>

              {/* Typography */}
              <div className="col-span-12 md:col-span-5 pr-8">
                <h3 className="text-3xl font-medium tracking-tight mb-6 leading-snug">
                  {row.title}
                </h3>
                <p className="text-lg text-black/60 font-serif leading-relaxed mb-8">
                  {row.description}
                </p>
                
                {row.bullets && row.bullets.length > 0 && (
                  <ul className="space-y-3 mb-10 border-l border-black/10 pl-6">
                    {row.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-sm font-sans tracking-wide text-black/80">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                
                {row.cta_text && (
                  <button 
                    onClick={() => onRequestDemo?.()}
                    className="text-xs uppercase tracking-widest font-bold hover-line-grow inline-block"
                  >
                    {row.cta_text}
                  </button>
                )}
              </div>

              {/* Image / Graphic Reveal */}
              <div className="col-span-12 md:col-span-4 mt-12 md:mt-0">
                <ScrollReveal variant="mask-up" className="aspect-[4/5] bg-[#f9f9f9] border border-black/5 p-4 flex flex-col justify-between" data-cursor="view">
                  {row.image_url ? (
                    <img src={row.image_url} className="w-full h-full object-cover grayscale opacity-90 contrast-125" alt="" />
                  ) : (
                    <div className="h-full border border-black/10 p-6 flex flex-col justify-between text-xs font-mono opacity-50">
                      <div className="flex justify-between">
                        <span>DATA_STREAM</span>
                        <span>[ ACTIVE ]</span>
                      </div>
                      <div className="text-4xl font-serif mt-12 mb-auto">+38%</div>
                      <span>ENCRYPTED VAULT // {idx}</span>
                    </div>
                  )}
                </ScrollReveal>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
