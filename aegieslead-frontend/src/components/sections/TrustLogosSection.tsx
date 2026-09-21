import React from 'react';
import type { TrustLogosSettings } from '../../types/cms';
import { Shield, Building2, ShieldAlert, Award, Star } from 'lucide-react';

interface Props {
  settings: TrustLogosSettings;
}

export const TrustLogosSection: React.FC<Props> = ({ settings }) => {
  const logos = settings.logos && settings.logos.length > 0 ? settings.logos : [
    { name: 'Airbus Defense', label: 'AIRBUS DEFENSE' },
    { name: 'Sanofi Global', label: 'SANOFI HEALTH' },
    { name: 'Renault Group', label: 'RENAULT AUTOMOTIVE' },
    { name: 'Metro Guard Corp', label: 'METRO GUARD' },
    { name: 'Vanguard Asset Care', label: 'VANGUARD SECURE' },
    { name: 'Apex Tactical Logistics', label: 'APEX DEFENSE' },
  ];

  // Duplicate for seamless infinite loop
  const marqueeLogos = [...logos, ...logos, ...logos];

  const getBrandIcon = (idx: number) => {
    switch (idx % 5) {
      case 0:
        return <Shield className="w-5 h-5 text-slate-400 group-hover:text-blue-700 transition-colors" />;
      case 1:
        return <Building2 className="w-5 h-5 text-slate-400 group-hover:text-blue-700 transition-colors" />;
      case 2:
        return <ShieldAlert className="w-5 h-5 text-slate-400 group-hover:text-blue-700 transition-colors" />;
      case 3:
        return <Award className="w-5 h-5 text-slate-400 group-hover:text-blue-700 transition-colors" />;
      default:
        return <Star className="w-5 h-5 text-slate-400 group-hover:text-blue-700 transition-colors" />;
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-100/70 border-b border-slate-200 py-12">
      {/* Left and Right Fade Gradients for Slider */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        {settings.title && (
          <p className="text-center text-xs font-bold tracking-widest text-slate-500 uppercase font-mono">
            {settings.title}
          </p>
        )}
      </div>

      {/* Infinite Horizontal Logo Marquee Slider */}
      <div className="flex overflow-hidden select-none">
        <div className="animate-marquee flex gap-6 items-center py-2">
          {marqueeLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-6 py-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all duration-300 group cursor-pointer shrink-0 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors">
                  {getBrandIcon(index)}
                </div>
                <span className="text-xs font-black tracking-wider text-slate-700 group-hover:text-blue-900 transition-colors uppercase font-sans whitespace-nowrap">
                  {logo.label || logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
