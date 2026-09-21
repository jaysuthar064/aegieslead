import { useState, useEffect, useCallback } from 'react';
import type { GlobalSettings, PageData } from './types/cms';
import {
  fetchGlobalSettings,
  fetchPageContent,
  FALLBACK_GLOBAL_SETTINGS,
  FALLBACK_HOME_PAGE
} from './services/cmsApi';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DynamicSectionRenderer } from './components/DynamicSectionRenderer';
import { DemoModal, type ModalMode } from './components/DemoModal';
import { SeoHead } from './components/SeoHead';

function getInitialPageFromUrl(): { slug: string; anchor?: string } {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash.replace(/^#/, '');

  if (path === 'platform' || hash === 'platform') return { slug: 'platform', anchor: hash };
  if (path === 'who-we-serve' || path === 'solutions' || hash === 'who-we-serve') return { slug: 'who-we-serve', anchor: hash };
  if (path === 'workforce' || path === 'mobile' || hash === 'workforce') return { slug: 'workforce', anchor: hash };
  if (path === 'pricing' || hash === 'pricing') return { slug: 'pricing', anchor: hash };
  if (path === 'company' || path === 'security' || hash === 'company') return { slug: 'company', anchor: hash };

  return { slug: 'home', anchor: hash };
}

function App() {
  const initial = getInitialPageFromUrl();
  const [currentPage, setCurrentPage] = useState<string>(initial.slug);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(FALLBACK_GLOBAL_SETTINGS);
  const [pageData, setPageData] = useState<PageData>(FALLBACK_HOME_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Interactive Modal State (Demo vs Sales/Quote Mode)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>('demo');
  const [selectedPersona, setSelectedPersona] = useState<string>('Enterprise Security Leaders');

  const loadCmsData = useCallback(async (slug: string) => {
    try {
      const [globalRes, pageRes] = await Promise.all([
        fetchGlobalSettings(),
        fetchPageContent(slug),
      ]);

      setGlobalSettings(globalRes.data);
      setPageData(pageRes.data);
    } catch (err) {
      console.error('[Aegies CMS] Failed to load CMS data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load and on page change
  useEffect(() => {
    loadCmsData(currentPage);
  }, [currentPage, loadCmsData]);

  // Browser History & PopState Support (Back/Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const { slug, anchor } = getInitialPageFromUrl();
      setCurrentPage(slug);
      if (anchor) {
        setTimeout(() => {
          const el = document.getElementById(anchor) || document.querySelector(`[id*="${anchor}"]`);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Automatic Background Revalidation (polls every 10s or when window gains focus)
  useEffect(() => {
    const handleFocus = () => {
      loadCmsData(currentPage);
    };

    window.addEventListener('focus', handleFocus);
    const interval = setInterval(() => {
      loadCmsData(currentPage);
    }, 10000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [currentPage, loadCmsData]);

  const handleSelectPage = (slug: string, anchor?: string) => {
    setCurrentPage(slug);

    // Update browser URL cleanly without page reload
    const targetUrl = slug === 'home' ? (anchor ? `/#${anchor}` : '/') : `/${slug}${anchor ? `#${anchor}` : ''}`;
    window.history.pushState({ slug, anchor }, '', targetUrl);

    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor) || document.querySelector(`[id*="${anchor}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenDemoModal = (personaOrRole?: string, mode: ModalMode = 'demo') => {
    if (personaOrRole === 'sales' || personaOrRole === 'quote') {
      setModalMode('sales');
    } else {
      setModalMode(mode);
      if (personaOrRole) {
        setSelectedPersona(personaOrRole);
      }
    }
    setIsDemoModalOpen(true);
  };

  const handleCloseDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-slate-900 space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-600 font-mono font-medium">Loading Aegies Lead...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Dynamic SEO Meta Ingestion */}
      <SeoHead
        meta={pageData.meta}
        branding={globalSettings.branding}
        slug={currentPage}
      />

      {/* Production Header Navbar with Mega-Menu */}
      <Navbar
        settings={globalSettings}
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        onRequestDemo={handleOpenDemoModal}
      />

      {/* Main Content Area: Dynamic Section Dispatcher */}
      <main className="flex-grow pt-20">
        <DynamicSectionRenderer
          sections={pageData.sections}
          onRequestDemo={handleOpenDemoModal}
        />
      </main>

      {/* Production Global Footer */}
      <Footer
        footer={globalSettings.footer}
        branding={globalSettings.branding}
        onNavigate={handleSelectPage}
        onRequestDemo={handleOpenDemoModal}
      />

      {/* Interactive Request a Demo / Sales Quote Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemoModal}
        initialMode={modalMode}
        defaultPersona={selectedPersona}
        sourcePage={currentPage}
      />
    </div>
  );
}

export default App;
