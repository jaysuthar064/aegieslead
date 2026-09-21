import React from 'react';
import type { HeroSettings } from '../../types/cms';
import { ArrowRight } from 'lucide-react';
import { TextReveal } from '../motion/TextReveal';
import { ScrollReveal } from '../motion/ScrollReveal';

interface Props {
  settings: HeroSettings;
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
}

export const HeroSection: React.FC<Props> = ({ settings, onRequestDemo }) => {
  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-white text-[#111] overflow-hidden border-b-2 border-black/5">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 editorial-grid items-end">
        
        {/* Left Typography Block */}
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-end">
          <div className="mb-6 overflow-hidden">
            <span className="inline-block font-mono text-[10px] tracking-widest uppercase text-black/40 border border-black/10 px-3 py-1 animate-fade-in-up">
              {settings.badge || 'Aegies Lead v4'}
            </span>
          </div>

          <TextReveal 
            text={settings.headline} 
            as="h1" 
            className="text-5xl sm:text-7xl lg:text-[100px] font-medium tracking-tighter leading-[1.05] text-[#111]" 
          />

          <ScrollReveal variant="fade" delay={400} className="mt-8 flex flex-col sm:flex-row gap-6 sm:gap-12 max-w-2xl">
            <p className="text-lg sm:text-2xl text-black/60 font-serif leading-relaxed">
              {settings.subheadline}
            </p>
            <div className="shrink-0 flex flex-col gap-4">
              <button 
                onClick={() => onRequestDemo?.('Enterprise', 'demo')}
                className="btn-editorial-solid px-8 py-4 text-xs tracking-widest font-bold uppercase flex items-center justify-between w-full sm:w-auto"
              >
                Request Access <ArrowRight className="w-4 h-4 ml-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Media / Abstract Data Block */}
        <div className="col-span-12 lg:col-span-4 mt-16 lg:mt-0">
          <ScrollReveal variant="mask-up" delay={600} className="w-full aspect-[3/4] bg-[#f9f9f9] border border-black/10 flex flex-col justify-between p-6">
            {settings.hero_image ? (
              <img src={settings.hero_image} className="w-full h-full object-cover grayscale opacity-90 contrast-125" alt="" />
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <span className="w-2 h-2 bg-[#f43f5e] rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">System Live</span>
                </div>
                <div className="space-y-2">
                  <div className="text-6xl font-serif">99.9%</div>
                  <div className="text-xs uppercase font-mono tracking-widest opacity-50">SLA Audit Rate</div>
                  <div className="w-full h-1 bg-black/5 mt-4">
                    <div className="h-full bg-black w-[99.9%]" />
                  </div>
                </div>
              </>
            )}
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
