import React from 'react';
import type { ProductShowcaseSettings } from '../../types/cms';
import { ShieldCheck, Lock, Globe, Server, Activity, Users, MapPin } from 'lucide-react';

interface Props {
  settings: ProductShowcaseSettings;
}

export const ProductShowcaseSection: React.FC<Props> = ({ settings }) => {
  return (
    <section id="platform" className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          {settings.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-4 font-mono">
              {settings.badge}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4 font-sans">
            {settings.headline}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {settings.subheadline}
          </p>
        </div>

        {/* Big Light-Themed Enterprise Command Center Window or Custom Image */}
        <div className="relative rounded-3xl bg-white border border-slate-300 shadow-2xl p-4 sm:p-8 hover-lift">
          
          {settings.image_url ? (
            <div className="rounded-2xl overflow-hidden shadow-inner border border-slate-200">
              <img
                src={settings.image_url}
                alt={settings.headline}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            /* Internal Application Frame */
            <div className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-inner">
              
              {/* Top Toolbar */}
              <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-base text-slate-900 tracking-tight font-sans">
                    AEGIES COMMAND DISPATCH
                  </span>
                  <span className="text-xs text-slate-500 font-mono">v4.2 PROD</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-emerald-700 flex items-center gap-1.5 font-bold font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    GEOFENCE RADAR ACTIVE
                  </span>
                  <span className="text-slate-500 font-medium">TENANT: METRO-SECURITY-GLOBAL</span>
                </div>
              </div>

              {/* Application Data Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Box 1: Shift & Roster Timeline */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs hover-lift">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800 pb-2 border-b border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-blue-700" /> ACTIVE SHIFT ROSTER
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">100% POSTED</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900">North Perimeter Guard</div>
                        <div className="text-[11px] text-slate-500">Officer M. Jenkins • NFC Checked</div>
                      </div>
                      <span className="text-emerald-700 font-bold">ON POST</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900">Main Facility Concierge</div>
                        <div className="text-[11px] text-slate-500">Officer S. Carter • GPS Locked</div>
                      </div>
                      <span className="text-blue-700 font-bold">ON POST</span>
                    </div>
                  </div>
                </div>

                {/* Box 2: Patrol Verification */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs hover-lift">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800 pb-2 border-b border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-700" /> GPS PATROL RADAR
                    </span>
                    <span className="text-blue-700 font-mono font-bold">32 SITES</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>Checkpoint #14 Scanned</span>
                        <span className="text-emerald-700 font-mono">08:04:12</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">Geofence verified within 15m radius</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>Checkpoint #15 Vault</span>
                        <span className="text-blue-700 font-mono">EN ROUTE</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">Next scan due in 8 minutes</div>
                    </div>
                  </div>
                </div>

                {/* Box 3: Automated Financials & Billing */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs hover-lift">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800 pb-2 border-b border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-emerald-700" /> MARGIN & BILLING
                    </span>
                    <span className="text-purple-700 font-mono font-bold">AUTOMATED</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Approved Guard Hours</span>
                      <span className="text-slate-900 font-mono font-bold">8,420 hrs</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Unbilled Overtime Prevented</span>
                      <span className="text-emerald-700 font-mono font-bold">$14,280</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Invoice Processing Time</span>
                      <span className="text-purple-700 font-mono font-bold">1.2 Days</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Floating White Compliance Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover-lift">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 uppercase">SOC 2 Type II Certified</div>
                <div className="text-[11px] text-slate-500">End-to-end encrypted audit logs</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover-lift">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 uppercase">Sub-Second Dispatch Ping</div>
                <div className="text-[11px] text-slate-500">Live GPS geofenced ping tracking</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover-lift">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 uppercase">99.99% Platform Uptime</div>
                <div className="text-[11px] text-slate-500">Enterprise mission-critical SLA</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
