import React, { useRef } from 'react';

interface Props {
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
}

export const HorizontalStoryReel: React.FC<Props> = ({ onRequestDemo }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const stories = [
    {
      id: '01',
      title: 'Real-time GPS Checkpoint Radar',
      description: 'Guards verify checkpoints via geofenced coordinates. Eliminate up to 100% of unverified blind spots.',
    },
    {
      id: '02',
      title: 'Tamper-Proof Incident Vault',
      description: 'Immutable cryptographic chain-of-custody for incident reports, photos, and digital witness memos.',
    },
    {
      id: '03',
      title: 'AI Commercial Scope Engine',
      description: 'Analyze facility risk and generate multi-tier rate cards to win high-margin enterprise RFP bids.',
    },
    {
      id: '04',
      title: 'Margin Recovery Automation',
      description: 'Convert verified clock-ins directly into approved client invoices in under 24 hours. Stop leakage.',
    },
  ];

  return (
    <section className="bg-[#111] text-white py-32 overflow-hidden border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 mb-16 flex justify-between items-end">
        <h2 className="text-4xl sm:text-5xl font-serif tracking-tight w-2/3">
          Architecture built for absolute assurance.
        </h2>
      </div>

      {/* Manual horizontal scroll container (no complex GSAP to keep it simple, accessible and fast) */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-8 px-6 sm:px-12 pb-12 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stories.map((s, idx) => (
          <div key={idx} className="shrink-0 w-[85vw] sm:w-[500px] snap-center">
            <div className="border border-white/20 p-8 sm:p-12 h-full flex flex-col justify-between group hover:border-white transition-colors duration-500">
              <div className="text-[10px] font-mono tracking-widest uppercase opacity-40 mb-12">
                Pillar // {s.id}
              </div>
              <div>
                <h3 className="text-2xl font-sans font-medium tracking-tight mb-6">
                  {s.title}
                </h3>
                <p className="text-white/60 font-serif leading-relaxed text-lg mb-12">
                  {s.description}
                </p>
                <button 
                  onClick={() => onRequestDemo?.()}
                  className="text-xs uppercase tracking-widest font-bold hover-line-grow inline-block"
                >
                  Explore Capabilities
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
