import React from 'react';
import type { ZFeaturesSettings } from '../../types/cms';
import { CheckCircle2, ArrowRight, ShieldCheck, Camera, Sparkles, MapPin } from 'lucide-react';

interface Props {
  settings: ZFeaturesSettings;
  onRequestDemo?: (persona?: string) => void;
}

export const FeatureZRowsSection: React.FC<Props> = ({ settings, onRequestDemo }) => {
  const rows = settings.rows || [];

  const getVisualContent = (badge: string, title: string) => {
    if (badge.includes('FIELD') || title.includes('Patrol')) {
      return (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl text-white">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
            <span className="font-mono font-bold text-cyan-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> GPS RADAR • ACTIVE ROUTE 04
            </span>
            <span className="text-slate-400 font-mono">100% GEOFENCED</span>
          </div>
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-white font-bold">Checkpoint A: Main Gate</span>
              <span className="text-emerald-400 font-mono font-bold">Scanned 08:04:12</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-white font-bold">Checkpoint B: Vault Access</span>
              <span className="text-emerald-400 font-mono font-bold">Scanned 08:18:40</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-white font-bold">Checkpoint C: Loading Dock</span>
              <span className="text-blue-400 font-mono font-bold">Guards En Route (30m)</span>
            </div>
          </div>
        </div>
      );
    }

    if (badge.includes('INCIDENT') || title.includes('Incident')) {
      return (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl text-white">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
            <span className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <Camera className="w-4 h-4" /> EVIDENCE PACKAGE #INC-4091
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold">TAMPER-PROOF</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
            <div className="text-white font-bold text-sm">Vehicle Impact Report • South Parking Lot</div>
            <div className="text-slate-400 leading-relaxed">Captured via Mobile Guard App with GPS timestamp, 3 high-res photos, and witness statement.</div>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Signed & Approved by Field Supervisor J. Ramirez</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl text-white">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
          <span className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> AI COMMERCIAL SUITE
          </span>
          <span className="text-slate-400 font-mono font-bold">SCOPING ENGINE</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
          <div className="text-white font-bold text-sm">Automated Security Proposal Draft #PR-882</div>
          <div className="text-slate-400 leading-relaxed">AI analyzed site risk requirements, recommended 4 guard posts, and generated 3-tier billable rate cards.</div>
          <div className="flex justify-between items-center pt-2.5 border-t border-slate-800 text-[11px]">
            <span className="text-emerald-400 font-bold">Win Rate Lift: +38%</span>
            <span className="text-purple-300 font-semibold">Ready to Send PDF</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {settings.section_title && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              CORE PRODUCT CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {settings.section_title}
            </h2>
          </div>
        )}

        {rows.map((row, idx) => {
          const isImageLeft = row.image_align === 'left';

          return (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isImageLeft ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Column */}
              <div className={`lg:col-span-6 space-y-6 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                {row.badge && (
                  <div className="inline-block px-3 py-1 rounded-md bg-blue-100/70 border border-blue-300 text-blue-800 text-xs font-bold font-mono uppercase tracking-wider">
                    {row.badge}
                  </div>
                )}

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  {row.title}
                </h3>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {row.description}
                </p>

                {row.bullets && row.bullets.length > 0 && (
                  <div className="space-y-3 pt-2">
                    {row.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-base text-slate-800 font-semibold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}

                {row.cta_text && (
                  <div className="pt-4">
                    <a
                      href={row.cta_url || '#demo'}
                      onClick={(e) => {
                        if (row.cta_url === '#demo' || !row.cta_url || row.cta_url === '#') {
                          e.preventDefault();
                          if (onRequestDemo) onRequestDemo();
                        }
                      }}
                      className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-bold text-sm group cursor-pointer"
                    >
                      <span>{row.cta_text}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>

              {/* Visual Card Column: Custom Image or Vector Interface */}
              <div className={`lg:col-span-6 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                {row.image_url ? (
                  <div className="rounded-2xl bg-white border border-slate-300 shadow-xl overflow-hidden p-2">
                    <img
                      src={row.image_url}
                      alt={row.title}
                      className="w-full h-auto rounded-xl object-cover"
                    />
                  </div>
                ) : (
                  getVisualContent(row.badge, row.title)
                )}
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
};
