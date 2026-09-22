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
  Activity,
  ArrowRight
} from 'lucide-react';

interface Props {
  settings: GlobalSettings;
  currentPage: string;
  onSelectPage: (slug: string, anchor?: string) => void;
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
}

export const Navbar: React.FC<Props> = ({
  settings,
  currentPage,
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

  const handleTopNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveMegaMenu(null);
    setMobileOpen(false);

    if (id === 'menu_platform') {
      onSelectPage('platform');
    } else if (id === 'menu_solutions') {
      onSelectPage('who-we-serve');
    } else if (id === 'menu_workforce') {
      onSelectPage('workforce');
    } else if (id === 'menu_pricing') {
      onSelectPage('pricing');
    } else if (id === 'menu_company') {
      onSelectPage('company');
    } else {
      onSelectPage('home');
    }
  };

  const handleSubLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    setActiveMegaMenu(null);
    setMobileOpen(false);

    if (url.startsWith('#')) {
      const anchor = url.replace('#', '');
      if (currentPage === 'home') {
        const el = document.getElementById(anchor) || document.querySelector(url);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          onSelectPage('home', anchor);
        }
      } else {
        onSelectPage('home', anchor);
      }
    } else if (url.startsWith('/')) {
      const pageSlug = url.replace('/', '');
      onSelectPage(pageSlug || 'home');
    }
  };

  const isNavActive = (id: string) => {
    if (id === 'menu_platform' && currentPage === 'platform') return true;
    if (id === 'menu_solutions' && currentPage === 'who-we-serve') return true;
    if (id === 'menu_workforce' && currentPage === 'workforce') return true;
    if (id === 'menu_pricing' && currentPage === 'pricing') return true;
    if (id === 'menu_company' && currentPage === 'company') return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Left: Brand Logo & Shield */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
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

          {/* 2. Center: Desktop Navigation Links & Mega Menu */}
          <nav className="hidden xl:flex items-center space-x-1">
            {nav.menu_items?.map((item) => {
              const active = isNavActive(item.id);

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.has_columns && setActiveMegaMenu(item.id)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <a
                    href={item.url}
                    onClick={(e) => handleTopNavClick(e, item.id)}
                    className={`flex items-center whitespace-nowrap gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer shrink-0 ${
                      active
                        ? 'text-blue-700 bg-blue-50/90 font-extrabold shadow-2xs'
                        : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                        {item.badge}
                      </span>
                    )}
                    {item.has_columns && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 shrink-0 text-slate-400 transition-transform ${
                          activeMegaMenu === item.id ? 'rotate-180 text-blue-700' : ''
                        }`}
                      />
                    )}
                  </a>

                  {/* Mega Menu Dropdown */}
                  {item.has_columns && activeMegaMenu === item.id && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[740px] bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 pt-5 grid grid-cols-12 gap-6 mt-2 z-50 animate-fade-in-up">
                      
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
                                  onClick={(e) => handleSubLinkClick(e, link.url)}
                                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer"
                                >
                                  <div className="p-2 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
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
                        <div className="col-span-4 rounded-2xl bg-slate-900 text-white p-5 flex flex-col justify-between shadow-md">
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
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMegaMenu(null);
                              if (onRequestDemo) onRequestDemo('Enterprise Security Leaders', 'demo');
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 mt-4 pt-3 border-t border-slate-800 cursor-pointer text-left group"
                          >
                            <span>{item.featured_card.cta_text}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* 3. Right: Action Area (Contact Sales & Request a Demo) */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onRequestDemo ? onRequestDemo('Enterprise Security Leaders', 'sales') : (location.hash = '#contact')}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-all cursor-pointer active:scale-[0.98]"
            >
              Contact Sales
            </button>

            <button
              type="button"
              onClick={() => onRequestDemo ? onRequestDemo('Enterprise Security Leaders', 'demo') : (location.hash = '#demo')}
              className="px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20 active:scale-[0.98] cursor-pointer button-shimmer flex items-center gap-2"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-5 py-6 space-y-4 shadow-xl animate-fade-in-up">
          <div className="space-y-1">
            {nav.menu_items?.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => handleTopNavClick(e, item.id)}
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  isNavActive(item.id)
                    ? 'text-blue-700 bg-blue-50 font-extrabold'
                    : 'text-slate-800 hover:bg-slate-50 hover:text-blue-700'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                if (onRequestDemo) onRequestDemo('Enterprise Security Leaders', 'sales');
              }}
              className="w-full text-center py-3 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
            >
              Contact Sales
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                if (onRequestDemo) onRequestDemo('Enterprise Security Leaders', 'demo');
              }}
              className="w-full text-center py-3 rounded-xl text-sm font-extrabold bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/25 cursor-pointer"
            >
              Request a Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
