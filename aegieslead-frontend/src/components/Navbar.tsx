import React, { useState } from 'react';
import type { GlobalSettings } from '../types/cms';
import {
  Shield,
  Menu,
  X,
  ChevronDown,
  Layers,
  MapPin,
  Users,
  AlertTriangle,
  FileText,
  DollarSign,
  Briefcase,
  Building2,
  CheckCircle,
  Activity
} from 'lucide-react';

interface Props {
  settings: GlobalSettings;
  currentPage: string;
  onSelectPage: (slug: string) => void;
  onRequestDemo?: (persona?: string) => void;
}

export const Navbar: React.FC<Props> = ({
  settings,
  onSelectPage,
  onRequestDemo
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const branding = settings.branding;
  const nav = settings.header_nav;

  const getMenuIcon = (iconName?: string) => {
    switch (iconName) {
      case 'map-pin':
        return <MapPin className="w-5 h-5 text-blue-700 shrink-0" />;
      case 'users':
        return <Users className="w-5 h-5 text-blue-700 shrink-0" />;
      case 'shield-alert':
        return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
      case 'file-text':
        return <FileText className="w-5 h-5 text-blue-700 shrink-0" />;
      case 'dollar-sign':
        return <DollarSign className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'briefcase':
        return <Briefcase className="w-5 h-5 text-blue-700 shrink-0" />;
      case 'building-2':
        return <Building2 className="w-5 h-5 text-blue-700 shrink-0" />;
      case 'user-check':
        return <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-rose-600 shrink-0" />;
      default:
        return <Layers className="w-5 h-5 text-blue-700 shrink-0" />;
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, id: string) => {
    if (id === 'menu_platform') {
      e.preventDefault();
      onSelectPage('platform');
      setActiveMegaMenu(null);
      setMobileOpen(false);
    } else if (id === 'menu_solutions') {
      e.preventDefault();
      onSelectPage('who-we-serve');
      setActiveMegaMenu(null);
      setMobileOpen(false);
    } else if (id === 'menu_pricing') {
      e.preventDefault();
      onSelectPage('pricing');
      setActiveMegaMenu(null);
      setMobileOpen(false);
    } else if (id === 'menu_company') {
      e.preventDefault();
      onSelectPage('company');
      setActiveMegaMenu(null);
      setMobileOpen(false);
    } else if (url.startsWith('#')) {
      const el = document.querySelector(url);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveMegaMenu(null);
        setMobileOpen(false);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onSelectPage('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-700/20 group-hover:bg-blue-800 transition-colors">
              <Shield className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 block leading-none font-sans">
                {branding.logo_text || 'AEGIES LEAD'}
              </span>
              <span className="text-[10px] tracking-widest text-blue-700 font-bold uppercase font-mono block mt-1">
                SECURITY OPERATIONS PLATFORM
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links & Mega Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {nav.menu_items?.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.has_columns && setActiveMegaMenu(item.id)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <a
                  href={item.url}
                  onClick={(e) => handleNavClick(e, item.url, item.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                      {item.badge}
                    </span>
                  )}
                  {item.has_columns && (
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        activeMegaMenu === item.id ? 'rotate-180 text-blue-700' : ''
                      }`}
                    />
                  )}
                </a>

                {/* Mega Menu Dropdown */}
                {item.has_columns && activeMegaMenu === item.id && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[740px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 pt-5 grid grid-cols-12 gap-6 mt-2 z-50">
                    
                    {/* Product Columns */}
                    <div className="col-span-8 grid grid-cols-2 gap-6">
                      {item.columns?.map((col, cIdx) => (
                        <div key={cIdx} className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                            {col.title}
                          </h4>
                          <div className="space-y-1">
                            {col.links.map((link, lIdx) => (
                              <a
                                key={lIdx}
                                href={link.url}
                                onClick={(e) => {
                                  if (link.url.startsWith('#')) {
                                    const el = document.querySelector(link.url);
                                    if (el) {
                                      e.preventDefault();
                                      el.scrollIntoView({ behavior: 'smooth' });
                                      setActiveMegaMenu(null);
                                    }
                                  }
                                }}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                              >
                                <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                  {getMenuIcon(link.icon)}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                                    {link.label}
                                  </div>
                                  {link.desc && (
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                                      {link.desc}
                                    </p>
                                  )}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Featured Report Card */}
                    {item.featured_card && (
                      <div className="col-span-4 rounded-xl bg-slate-900 text-white p-5 flex flex-col justify-between shadow-md">
                        <div>
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">
                            INDUSTRY REPORT
                          </span>
                          <h5 className="text-sm font-bold text-white mt-1.5 leading-snug">
                            {item.featured_card.title}
                          </h5>
                          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                            {item.featured_card.desc}
                          </p>
                        </div>
                        <a
                          href={item.featured_card.cta_url}
                          onClick={(e) => {
                            if (item.featured_card?.cta_url.startsWith('#')) {
                              e.preventDefault();
                              document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' });
                              setActiveMegaMenu(null);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 mt-4 pt-3 border-t border-slate-800 cursor-pointer"
                        >
                          {item.featured_card.cta_text}
                        </a>
                      </div>
                    )}

                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons (Ghost & Solid Cobalt Blue) */}
          <div className="hidden lg:flex items-center gap-3">
            {nav.action_buttons?.map((btn, idx) => {
              if (btn.variant === 'primary' || btn.label.toLowerCase().includes('demo')) {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onRequestDemo ? onRequestDemo() : (location.hash = '#demo')}
                    className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20 cursor-pointer"
                  >
                    {btn.label}
                  </button>
                );
              }
              return (
                <a
                  key={idx}
                  href={btn.url}
                  className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all bg-white hover:bg-slate-50 text-slate-700 border border-slate-300"
                >
                  {btn.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4 shadow-xl">
          <div className="space-y-1">
            {nav.menu_items?.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => handleNavClick(e, item.url, item.id)}
                className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-blue-700"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            {nav.action_buttons?.map((btn, idx) => {
              if (btn.variant === 'primary' || btn.label.toLowerCase().includes('demo')) {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      if (onRequestDemo) onRequestDemo();
                    }}
                    className="w-full text-center px-4 py-3 rounded-lg text-sm font-bold bg-blue-700 text-white shadow-sm cursor-pointer"
                  >
                    {btn.label}
                  </button>
                );
              }
              return (
                <a
                  key={idx}
                  href={btn.url}
                  className="w-full text-center px-4 py-3 rounded-lg text-sm font-bold bg-white text-slate-800 border border-slate-300"
                >
                  {btn.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
