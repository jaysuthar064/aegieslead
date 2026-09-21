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

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(FALLBACK_GLOBAL_SETTINGS);
  const [pageData, setPageData] = useState<PageData>(FALLBACK_HOME_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadCmsData = useCallback(async (slug: string) => {
    try {
      const [globalRes, pageRes] = await Promise.all([
        fetchGlobalSettings(),
        fetchPageContent(slug),
      ]);

      setGlobalSettings(globalRes.data);
      setPageData(pageRes.data);

      // Dynamically update document title from CMS metadata
      if (pageRes.data.meta?.title) {
        document.title = pageRes.data.meta.title;
      }
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

  const handleSelectPage = (slug: string) => {
    setCurrentPage(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* Production Header Navbar with Mega-Menu */}
      <Navbar
        settings={globalSettings}
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
      />

      {/* Main Content Area: Dynamic Section Dispatcher */}
      <main className="flex-grow pt-20">
        <DynamicSectionRenderer sections={pageData.sections} />
      </main>

      {/* Production Global Footer */}
      <Footer
        footer={globalSettings.footer}
        branding={globalSettings.branding}
      />
    </div>
  );
}

export default App;
