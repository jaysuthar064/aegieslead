import React from 'react';
import type { FooterSettings, BrandingSettings } from '../types/cms';
import { Shield } from 'lucide-react';

interface Props {
  footer: FooterSettings;
  branding: BrandingSettings;
}

export const Footer: React.FC<Props> = ({ footer, branding }) => {
  return (
    <footer className="bg-[#090d16] text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 6-Column Grid Link Farm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-14 border-b border-slate-800">
          
          {/* Brand Identity & Summary (Col 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white">
                <Shield className="w-5 h-5 fill-current" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                {branding.logo_text || 'AEGIES LEAD'}
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {footer.about_text || 'The unified operational platform for physical security guard agencies and corporate enterprise security teams.'}
            </p>

            <div className="text-xs text-slate-400 space-y-1.5 pt-2">
              <div>Security & Support: <span className="text-slate-200 font-mono font-medium">{branding.support_email}</span></div>
              <div>Direct Dispatch: <span className="text-slate-200 font-mono font-medium">{branding.support_phone}</span></div>
            </div>
          </div>

          {/* Dynamic Link Columns (Col 3-6) */}
          {footer.columns?.map((col, idx) => (
            <div key={idx} className="space-y-3.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.url}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Compliance Badges & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Compliance Badges */}
          {footer.compliance_badges && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-mono font-bold">STANDARDS:</span>
              {footer.compliance_badges.map((badge, bIdx) => (
                <span
                  key={bIdx}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px] font-bold"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Copyright */}
          <div className="text-slate-400 font-medium">
            {footer.copyright}
          </div>

        </div>

      </div>
    </footer>
  );
};
