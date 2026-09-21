import React from 'react';
import type { TrustLogosSettings } from '../../types/cms';

interface Props {
  settings: TrustLogosSettings;
}

export const TrustLogosSection: React.FC<Props> = ({ settings }) => {
  const logos = settings.logos && settings.logos.length > 0 ? settings.logos : [
    { name: 'Airbus', label: 'AIRBUS' },
    { name: 'Sanofi', label: 'SANOFI' },
    { name: 'Renault', label: 'RENAULT' },
    { name: 'Vanguard', label: 'VANGUARD' },
    { name: 'Apex', label: 'APEX LOGISTICS' },
    { name: 'Metro Guard', label: 'METRO GUARD' }
  ];

  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-6 border-b-2 border-black/5 bg-[#fafafa] overflow-hidden flex items-center">
      <div className="shrink-0 px-6 sm:px-12 border-r-2 border-black/5 hidden md:block">
        <span className="font-mono text-[10px] tracking-widest uppercase text-black/40">Trusted By</span>
      </div>
      <div className="flex overflow-hidden w-full">
        <div className="animate-marquee flex items-center">
          {marqueeLogos.map((logo, idx) => (
            <span key={idx} className="font-serif italic text-xl px-12 text-black/60 shrink-0">
              {logo.label || logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
