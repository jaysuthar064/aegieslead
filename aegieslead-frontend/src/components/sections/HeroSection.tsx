import React from 'react';
import type { HeroSettings } from '../../types/cms';
import { Shield, ArrowRight, CheckCircle2, Play, Activity, MapPin, Radio, Smartphone } from 'lucide-react';

interface Props {
  settings: HeroSettings;
  onRequestDemo?: (persona?: string) => void;
}

export const HeroSection: React.FC<Props> = ({ settings, onRequestDemo }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (50% width): Headline, Copy, Action CTAs & Trust Markers */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow Badge Pill */}
            {settings.badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase shadow-xs">
                <Radio className="w-3.5 h-3.5 text-blue-700 animate-pulse" />
                {settings.badge}
              </div>
            )}

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.12] font-sans">
              {settings.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-xl">
              {settings.subheadline}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {settings.primary_cta && (
                <button
                  type="button"
                  onClick={() => onRequestDemo ? onRequestDemo() : (location.hash = '#demo')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition-all shadow-md shadow-blue-700/20 hover:translate-y-[-1px] cursor-pointer"
                >
                  <span>{settings.primary_cta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {settings.secondary_cta && (
                <a
                  href={settings.secondary_cta.url}
                  onClick={(e) => {
                    if (settings.secondary_cta?.url.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(settings.secondary_cta.url)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-base transition-all shadow-xs cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-blue-700" />
                  <span>{settings.secondary_cta.label}</span>
                </a>
              )}
            </div>

            {/* Highlight Chips */}
            {settings.highlight_chips && settings.highlight_chips.length > 0 && (
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-2 gap-3.5">
                {settings.highlight_chips.map((chip, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{chip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (50% width): Ultra-High-Fidelity Layered Software Interface or Custom CMS Image */}
          <div className="lg:col-span-6 relative">
            {settings.hero_image ? (
              <div className="relative mx-auto rounded-2xl bg-white border border-slate-300 shadow-2xl p-2 sm:p-3 overflow-hidden">
                <img
                  src={settings.hero_image}
                  alt={settings.headline}
                  className="w-full h-auto rounded-xl object-cover shadow-sm"
                />
              </div>
            ) : (
              <div className="relative mx-auto rounded-2xl bg-white border border-slate-300/80 shadow-2xl shadow-slate-900/15 overflow-hidden">
                
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-400 font-mono ml-2">aegies.app/dispatch/live-map</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-700 px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    32 SITES ACTIVE
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-5 bg-slate-50 space-y-4">
                  
                  {/* 3 Metrics Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Patrol SLA</span>
                        <Activity className="w-3.5 h-3.5 text-blue-700" />
                      </div>
                      <div className="text-xl font-bold text-slate-900">99.8%</div>
                      <div className="text-[11px] text-emerald-600 font-medium mt-0.5">+1.4% on-time</div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Guards On Post</span>
                        <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="text-xl font-bold text-slate-900">128 / 128</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">0 Open Shifts</div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Geofenced Radar</span>
                        <MapPin className="w-3.5 h-3.5 text-blue-700" />
                      </div>
                      <div className="text-xl font-bold text-slate-900">32 Sites</div>
                      <div className="text-[11px] text-blue-700 font-medium mt-0.5">0 Blind Spots</div>
                    </div>
                  </div>

                  {/* Live Geofenced Breadcrumb Feed */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5 shadow-xs">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800 pb-1 border-b border-slate-100">
                      <span>LIVE GPS GEOFENCED PATROL BREADCRUMBS</span>
                      <span className="text-slate-400 font-mono">14:24:08 UTC</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span className="font-bold text-slate-900">Officer M. Jenkins</span>
                          <span className="text-slate-600">Checkpoint 14 (North Vault Gate)</span>
                        </div>
                        <span className="text-emerald-700 font-mono font-bold text-[11px]">Geofence Verified</span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                          <span className="font-bold text-slate-900">Officer S. Carter</span>
                          <span className="text-slate-600">Shift Started • Logistics Terminal</span>
                        </div>
                        <span className="text-blue-700 font-mono font-bold text-[11px]">NFC Clock-in</span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                          <span className="font-bold text-slate-900">AI Auto-Billing Engine</span>
                          <span className="text-slate-600">Generated Invoice #AEG-8492 ($18,450)</span>
                        </div>
                        <span className="text-purple-700 font-mono font-bold text-[11px]">Approved</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Floating Overlapping Guard Mobile App Preview */}
                <div className="hidden sm:flex absolute bottom-4 right-4 bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-600 text-white">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">GUARD MOBILE PORTAL</div>
                    <div className="text-[11px] text-slate-300">Offline Queue • NFC Tag Scanner</div>
                  </div>
                </div>

              </div>
            )}

            {/* Floating Trust Certification Stamp */}
            <div className="hidden sm:flex absolute -bottom-5 -left-4 bg-white border border-slate-200 shadow-xl px-4 py-2.5 rounded-xl items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">SOC 2 TYPE II CERTIFIED</div>
                <div className="text-[11px] text-slate-500">Continuous Security & Compliance</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
