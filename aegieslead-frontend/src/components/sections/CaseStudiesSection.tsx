import React from 'react';
import type { CaseStudiesSettings } from '../../types/cms';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ArrowRight } from 'lucide-react';

interface Props {
  settings: CaseStudiesSettings;
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
}

export const CaseStudiesSection: React.FC<Props> = ({ settings, onRequestDemo }) => {
  const cards = settings.cards || [];

  return (
    <section className="py-32 bg-[#fafafa] text-[#111]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        <ScrollReveal variant="fade" className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-black/10 pb-8">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
            {settings.title}
          </h2>
          <p className="text-sm font-mono opacity-50 mt-4 md:mt-0 uppercase tracking-widest max-w-sm text-right">
            {settings.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cards.map((card, idx) => (
            <ScrollReveal key={idx} variant="line-up" delay={idx * 100} className="border-l border-black/10 pl-8 group">
              <div className="text-6xl lg:text-7xl font-sans tracking-tighter font-medium mb-6">
                {card.metric}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-8 border-b border-black/5 pb-4">
                {card.label}
              </div>
              <div className="text-lg font-bold mb-4">
                {card.client}
              </div>
              <p className="text-sm text-black/70 mb-8 leading-relaxed">
                {card.outcome}
              </p>
              <button 
                onClick={() => onRequestDemo?.()} 
                className="text-xs uppercase tracking-widest font-bold hover-line-grow flex items-center gap-2"
              >
                {card.link_text || 'View Case'} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
