import React, { useState } from 'react';
import type { FaqAccordionSettings } from '../../types/cms';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface Props {
  settings: FaqAccordionSettings;
}

export const FaqAccordionSection: React.FC<Props> = ({ settings }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = settings.items || [];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white text-slate-900 relative border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-3">
            {settings.title}
          </h2>
          {settings.subtitle && (
            <p className="text-slate-600 text-base">
              {settings.subtitle}
            </p>
          )}
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-50 border border-slate-200/90 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-base sm:text-lg text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 ml-4 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-blue-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200 bg-white">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
