import React, { useState } from 'react';
import type { GlobalSettings } from '../types/cms';
import { Menu, X, ArrowRight } from 'lucide-react';

interface Props {
  settings: GlobalSettings;
  currentPage: string;
  onSelectPage: (slug: string, anchor?: string) => void;
  onRequestDemo?: (persona?: string, mode?: 'demo' | 'sales') => void;
}

export const Navbar: React.FC<Props> = ({
  currentPage,
  onSelectPage,
  onRequestDemo
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onSelectPage(slug);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-black/5">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo (Stark Editorial) */}
          <div
            className="cursor-pointer group flex items-baseline gap-2 shrink-0"
            onClick={() => onSelectPage('home')}
          >
            <span className="font-serif italic text-3xl tracking-tight text-[#111] leading-none">
              Aegies.
            </span>
            <span className="text-[10px] tracking-widest text-black/50 font-bold uppercase font-mono hidden sm:inline-block">
              Operations Platform
            </span>
          </div>

          {/* Center: Minimal Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <a href="/platform" onClick={(e) => handleNavClick(e, 'platform')} className={`text-sm font-medium tracking-wide uppercase ${currentPage === 'platform' ? 'text-black' : 'text-black/50 hover:text-black'} hover-line-grow`}>Platform</a>
            <a href="/who-we-serve" onClick={(e) => handleNavClick(e, 'who-we-serve')} className={`text-sm font-medium tracking-wide uppercase ${currentPage === 'who-we-serve' ? 'text-black' : 'text-black/50 hover:text-black'} hover-line-grow`}>Solutions</a>
            <a href="/pricing" onClick={(e) => handleNavClick(e, 'pricing')} className={`text-sm font-medium tracking-wide uppercase ${currentPage === 'pricing' ? 'text-black' : 'text-black/50 hover:text-black'} hover-line-grow`}>Pricing</a>
            <a href="/company" onClick={(e) => handleNavClick(e, 'company')} className={`text-sm font-medium tracking-wide uppercase ${currentPage === 'company' ? 'text-black' : 'text-black/50 hover:text-black'} hover-line-grow`}>Company</a>
          </nav>

          {/* Right: Editorial Buttons */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <button
              onClick={() => onRequestDemo?.('Enterprise Security Leaders', 'sales')}
              className="text-xs font-bold uppercase tracking-wider text-black/60 hover:text-black transition-colors"
            >
              Contact Sales
            </button>
            <button
              onClick={() => onRequestDemo?.('Enterprise Security Leaders', 'demo')}
              className="px-6 py-3 bg-[#111] text-white text-xs font-bold uppercase tracking-wider btn-editorial-solid flex items-center gap-2"
            >
              Request Demo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu */}
          <button className="lg:hidden text-[#111]" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b-2 border-black/5 p-6 flex flex-col gap-6">
          <a href="/platform" onClick={(e) => handleNavClick(e, 'platform')} className="text-xl font-serif text-black">Platform</a>
          <a href="/who-we-serve" onClick={(e) => handleNavClick(e, 'who-we-serve')} className="text-xl font-serif text-black">Solutions</a>
          <a href="/pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-xl font-serif text-black">Pricing</a>
          <a href="/company" onClick={(e) => handleNavClick(e, 'company')} className="text-xl font-serif text-black">Company</a>
          <button onClick={() => { setMobileOpen(false); onRequestDemo?.('Enterprise', 'demo'); }} className="w-full text-left text-xs font-bold uppercase tracking-widest text-[#f43f5e]">
            Request Demo →
          </button>
        </div>
      )}
    </header>
  );
};
