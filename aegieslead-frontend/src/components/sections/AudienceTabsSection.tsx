import React, { useState } from 'react';
import type { AudienceTabsSettings } from '../../types/cms';
import { Building2, Users, CheckCircle2, ArrowRight, ShieldAlert, DollarSign, FileCheck } from 'lucide-react';

interface Props {
  settings: AudienceTabsSettings;
  onRequestDemo?: (persona?: string) => void;
}

export const AudienceTabsSection: React.FC<Props> = ({ settings, onRequestDemo }) => {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'guarding'>('enterprise');

  const current = activeTab === 'enterprise' ? settings.tab_enterprise : settings.tab_guarding;

  return (
    <section id="who-we-serve" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            PERSONA-DRIVEN WORKFLOWS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            {settings.heading}
          </h2>
          <p className="text-lg text-slate-600">
            {settings.subheading}
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-300 shadow-inner">
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`flex items-center gap-3 px-7 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'enterprise'
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-700/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              {settings.tab_enterprise?.tab_title || 'Enterprise Security Leaders'}
            </button>

            <button
              onClick={() => setActiveTab('guarding')}
              className={`flex items-center gap-3 px-7 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'guarding'
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-700/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Users className="w-4 h-4" />
              {settings.tab_guarding?.tab_title || 'Security Guarding Firms'}
            </button>
          </div>
        </div>

        {/* Tab Content Display Card */}
        {current && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
            
            {/* Left Col (7 cols): Copy, Bullets, and CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3 py-1 rounded-md bg-blue-100/70 border border-blue-300 text-blue-800 text-xs font-bold font-mono uppercase tracking-wide">
                {current.tagline}
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                {current.headline}
              </h3>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-3.5 pt-2">
                {current.bullets && current.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-800 text-base font-semibold">{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onRequestDemo ? onRequestDemo(activeTab === 'enterprise' ? 'Enterprise Security Leaders' : 'Guarding Contractor Firms') : (location.hash = '#demo')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm transition-all shadow-md shadow-blue-700/20 cursor-pointer"
                >
                  <span>See Tailored Solution for {activeTab === 'enterprise' ? 'Enterprise Security' : 'Guarding Contractors'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Col (5 cols): Navy Accent Operational Proof Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-7 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-5 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-blue-400">OPERATIONAL CAPABILITIES</span>
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                </div>

                {activeTab === 'enterprise' ? (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <div className="font-bold text-white mb-1 flex items-center gap-2 text-sm">
                        <ShieldAlert className="w-4 h-4 text-blue-400" />
                        Multi-Site Risk Oversight
                      </div>
                      Real-time dashboard aggregates incident escalations across all contracted security vendors.
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <div className="font-bold text-white mb-1 text-sm">Automated SLA Compliance</div>
                      Instant verification of minimum staffing levels, patrol timings, and COI certificate expiries.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <div className="font-bold text-white mb-1 flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        Direct Timesheet-to-Invoice
                      </div>
                      Converts verified clock-ins directly into client-ready invoices, eliminating payroll leakage.
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <div className="font-bold text-white mb-1 text-sm">AI Proposal Scoping Engine</div>
                      Draft RFP bids, rate cards, and SLA contracts in under 5 minutes with AI recommendations.
                    </div>
                  </div>
                )}

                {current.stat_badge && (
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold text-center">
                    ✓ {current.stat_badge}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
