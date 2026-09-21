import React, { useState } from 'react';
import type { FaqAccordionSettings } from '../../types/cms';
import { ScrollReveal } from '../motion/ScrollReveal';

interface Props {
  settings: FaqAccordionSettings;
}

export const FaqAccordionSection: React.FC<Props> = ({ settings }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = settings.items || [];

  return (
    <section className="py-32 bg-white text-[#111]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-12 gap-16">
        
        <div className="col-span-12 md:col-span-4">
          <ScrollReveal variant="line-up">
            <h2 className="text-3xl font-serif tracking-tight mb-6">
              {settings.title}
            </h2>
            {settings.subtitle && (
              <p className="text-sm text-black/50 font-mono uppercase tracking-widest leading-relaxed">
                {settings.subtitle}
              </p>
            )}
          </ScrollReveal>
        </div>

        <div className="col-span-12 md:col-span-8 space-y-0 border-t border-black/10">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <ScrollReveal key={idx} variant="fade" delay={idx * 50} className="border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-8 text-left flex justify-between items-center group cursor-pointer"
                >
                  <span className="text-lg font-medium tracking-tight group-hover:pl-2 transition-all duration-300">
                    {item.q}
                  </span>
                  <span className={`font-mono text-xl transition-transform duration-300 ${isOpen ? 'rotate-45 opacity-40' : ''}`}>
                    +
                  </span>
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-black/60 font-serif leading-relaxed pr-12">
                    {item.a}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
