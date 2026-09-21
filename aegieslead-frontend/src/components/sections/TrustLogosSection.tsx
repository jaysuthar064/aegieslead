import React from 'react';
import type { TrustLogosSettings } from '../../types/cms';
import { Shield, Building2, ShieldAlert, Award } from 'lucide-react';

interface Props {
  settings: TrustLogosSettings;
}

export const TrustLogosSection: React.FC<Props> = ({ settings }) => {
  const logos = settings.logos || [];

  const getBrandIcon = (idx: number) => {
    switch (idx % 4) {
      case 0:
        return <Shield className="w-5 h-5 text-slate-400 group-hover:text-blue-700 transition-colors" />;
      case 1:
        return <Building2 className="w-5 h-5 text-slate-400 group-hover:text-blue-700 transition-colors" />;
      case 2:
        return <ShieldAlert className="w-5 h-5 text-slate-400 group-hover:text-blue-700 transition-colors" />;
      default:
        return <Award className="w-5 h-5 text-slate-400 group-hover:text-blue-700 transition-colors" />;
    }
  };

  return (
    <section className="bg-slate-100/70 border-b border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {settings.title && (
          <p className="text-center text-xs font-bold tracking-widest text-slate-500 uppercase mb-8 font-mono">
            {settings.title}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                {getBrandIcon(index)}
                <span className="text-xs font-black tracking-wider text-slate-700 group-hover:text-blue-900 transition-colors uppercase font-sans">
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
