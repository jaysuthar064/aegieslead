import React from 'react';
import type { CaseStudiesSettings } from '../../types/cms';
import { ArrowRight, TrendingUp, Building2 } from 'lucide-react';

interface Props {
  settings: CaseStudiesSettings;
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
}

export const CaseStudiesSection: React.FC<Props> = ({ settings, onRequestDemo }) => {
  const cards = settings.cards || [];

  return (
    <section id="case-studies" className="py-24 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            VERIFIED ENTERPRISE RESULTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            {settings.title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {settings.subtitle}
          </p>
        </div>

        {/* 3-Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl bg-white border border-slate-200 p-8 shadow-xs hover-lift group"
            >
              <div className="space-y-4">
                {/* Metric */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="text-4xl font-black text-blue-700 font-mono tracking-tight">
                      {card.metric}
                    </div>
                    <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                      {card.label}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>

                {/* Client Name */}
                <div className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                  <Building2 className="w-4 h-4 text-slate-400 group-hover:text-blue-700 transition-colors" />
                  <span>{card.client}</span>
                </div>

                {/* Outcome */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {card.outcome}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onRequestDemo ? onRequestDemo('Enterprise Security Leaders', 'demo') : (location.hash = '#demo')}
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 group-hover:text-blue-800 transition-colors cursor-pointer"
                >
                  <span>{card.link_text || 'Read Case Study'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
