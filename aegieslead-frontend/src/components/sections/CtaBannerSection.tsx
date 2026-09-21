import React from 'react';
import type { CtaBannerSettings } from '../../types/cms';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface Props {
  settings: CtaBannerSettings;
}

export const CtaBannerSection: React.FC<Props> = ({ settings }) => {
  return (
    <section id="demo" className="py-24 bg-white text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-900 p-10 sm:p-16 text-center space-y-6 shadow-2xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            TRANSFORM YOUR SECURITY OPERATIONS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto font-sans">
            {settings.headline}
          </h2>

          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto font-normal leading-relaxed">
            {settings.subheadline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {settings.primary_button && (
              <a
                href={settings.primary_button.url || '#demo'}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-900 font-extrabold text-base transition-all shadow-xl hover:bg-slate-100 hover:scale-[1.02]"
              >
                {settings.primary_button.label || 'Request a Demo'}
                <ArrowRight className="w-5 h-5 text-blue-800" />
              </a>
            )}

            {settings.secondary_button && (
              <a
                href={settings.secondary_button.url || '#contact'}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-blue-950/60 hover:bg-blue-950 border border-blue-400/40 text-white font-bold text-base transition-all"
              >
                {settings.secondary_button.label || 'Contact Sales'}
              </a>
            )}
          </div>

          {settings.footnote && (
            <div className="pt-6 flex items-center justify-center gap-2 text-xs text-blue-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{settings.footnote}</span>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
