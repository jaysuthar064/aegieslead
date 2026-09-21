import React, { useState } from 'react';
import type { AudienceTabsSettings } from '../../types/cms';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ArrowRight } from 'lucide-react';

interface Props {
  settings: AudienceTabsSettings;
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
}

export const AudienceTabsSection: React.FC<Props> = ({ settings, onRequestDemo }) => {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'guarding'>('enterprise');

  const current = activeTab === 'enterprise' ? settings.tab_enterprise : settings.tab_guarding;

  return (
    <section className="py-32 bg-white text-[#111]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <ScrollReveal variant="line-up" className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight">
              {settings.heading}
            </h2>
          </ScrollReveal>
          
          <div className="flex gap-6 border-b border-black/10 pb-4">
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`text-xs uppercase tracking-widest font-bold ${activeTab === 'enterprise' ? 'text-black' : 'text-black/40 hover:text-black'}`}
            >
              Enterprise
            </button>
            <button
              onClick={() => setActiveTab('guarding')}
              className={`text-xs uppercase tracking-widest font-bold ${activeTab === 'guarding' ? 'text-black' : 'text-black/40 hover:text-black'}`}
            >
              Contractors
            </button>
          </div>
        </div>

        {current && (
          <div key={activeTab} className="editorial-grid items-start animate-fade-in">
            <div className="col-span-12 md:col-span-5 pr-8 border-r border-black/10">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 block mb-8">
                {current.tagline}
              </span>
              <h3 className="text-3xl font-medium tracking-tight mb-8">
                {current.headline}
              </h3>
              <button 
                onClick={() => onRequestDemo?.(activeTab === 'enterprise' ? 'Enterprise' : 'Guarding', 'demo')}
                className="btn-editorial px-6 py-3 text-xs uppercase tracking-widest font-bold inline-flex items-center gap-4"
              >
                View Workflow <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="col-span-12 md:col-span-6 md:col-start-7 mt-8 md:mt-0">
              <p className="text-xl text-black/70 font-serif leading-relaxed mb-12">
                {current.description}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                {current.bullets?.map((bullet, idx) => (
                  <li key={idx} className="text-sm border-t border-black/10 pt-4 text-black/80">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
