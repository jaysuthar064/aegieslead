import React, { useState } from 'react';
import { MapPin, ShieldAlert, Sparkles, DollarSign, ArrowRight, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface Props {
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
}

export const HorizontalStoryReel: React.FC<Props> = ({ onRequestDemo }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const stories = [
    {
      id: '01',
      badge: 'PILLAR 01: GPS RADAR & FIELD PATROLS',
      title: 'Real-time GPS Checkpoint Radar with Zero Ghost Patrols',
      description: 'Guards verify checkpoints via geofenced coordinates and NFC tag scans. Eliminate unverified blind spots and stream real-time breadcrumbs to HQ.',
      bullets: ['15-meter geofence radius validation', 'Live breadcrumb route playback', 'Instant duress emergency alerts'],
      icon: MapPin,
      accentColor: 'from-blue-600 to-cyan-500',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      statNumber: '100%',
      statLabel: 'Geofence SLA Compliance',
    },
    {
      id: '02',
      badge: 'PILLAR 02: INCIDENT CHAIN OF CUSTODY',
      title: 'Tamper-Proof Incident Dossiers with SHA-256 Hashing',
      description: 'Frontline officers log photos, audio memos, and witness statements from mobile. Encrypted in immutable vaults for legal and insurance proof.',
      bullets: ['Court-ready PDF incident export', 'Supervisor multi-stage approval', 'Client portal instant escalation'],
      icon: ShieldAlert,
      accentColor: 'from-amber-600 to-orange-500',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      statNumber: '12ms',
      statLabel: 'Evidence Encryption Latency',
    },
    {
      id: '03',
      badge: 'PILLAR 03: COMMERCIAL AI SCOPING',
      title: 'AI Proposal Generator & Instant Enterprise Bids',
      description: 'Analyze facility risk and generate multi-tier rate cards (Standard, Overtime, Holiday) in minutes with AI precision to win high-margin RFPs.',
      bullets: ['Automated guard post modeling', 'HubSpot & CRM bid integration', 'Digital proposal e-signatures'],
      icon: Sparkles,
      accentColor: 'from-purple-600 to-indigo-500',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      statNumber: '+38%',
      statLabel: 'Commercial Win Rate Lift',
    },
    {
      id: '04',
      badge: 'PILLAR 04: FINANCIAL MARGIN RECOVERY',
      title: 'Automated Timesheet-to-Invoice Margin Engine',
      description: 'Convert verified clock-ins directly into approved client invoices in under 24 hours. Stop unbilled overtime and accelerate cash collection.',
      bullets: ['Direct QuickBooks & ADP sync', 'Real-time gross margin calculation', 'One-click client dispute proof'],
      icon: DollarSign,
      accentColor: 'from-emerald-600 to-teal-500',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      statNumber: '+$480K',
      statLabel: 'Annual Margin Leakage Recovered',
    },
  ];

  const current = stories[activeIndex];
  const IconComponent = current.icon;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 font-mono">
              OPERATIONAL STORYTELLING
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
              Four Core Pillars. One Connected Platform.
            </h2>
          </div>

          {/* Slider Step Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous Pillar"
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer active:scale-95 hover:border-blue-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-mono text-slate-400 font-bold px-2">
              0{activeIndex + 1} / 0{stories.length}
            </span>
            <button
              onClick={nextSlide}
              aria-label="Next Pillar"
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer active:scale-95 hover:border-blue-500"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Story Tab Track Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {stories.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveIndex(idx)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'bg-slate-800 border-blue-500 text-white shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="text-xs font-mono font-bold text-blue-400 mb-1">
                {s.id}
              </div>
              <div className="text-sm font-bold truncate">
                {s.title.split('with')[0].split('and')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Main Pinned Cinematic Showcase Card */}
        <div className="relative rounded-3xl bg-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Col: Narrative Copy & Bullets */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-bold font-mono uppercase tracking-wide">
                {current.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight font-sans">
                {current.title}
              </h3>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                {current.description}
              </p>

              <div className="space-y-3 pt-2">
                {current.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-3 text-slate-200 text-sm sm:text-base font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onRequestDemo ? onRequestDemo('Enterprise Security Leaders', 'demo') : (location.hash = '#demo')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-600/30 cursor-pointer active:scale-95 button-shimmer"
                >
                  <span>Explore This Pillar Live</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Col: 3D Tilt Visual Metric Card */}
            <div className="lg:col-span-5">
              <TiltCard maxTilt={8} className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                    VERIFIED BENCHMARK
                  </span>
                </div>

                <div className="space-y-1 text-center py-4">
                  <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white font-mono tracking-tight">
                    {current.statNumber}
                  </div>
                  <div className="text-sm font-bold text-slate-300">
                    {current.statLabel}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 text-center font-mono">
                  AES-256 Encrypted • Multi-Tenant Logic Isolation
                </div>
              </TiltCard>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
