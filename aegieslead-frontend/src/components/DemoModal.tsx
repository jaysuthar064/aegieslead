import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { submitLeadInquiry } from '../services/cmsApi';

export type ModalMode = 'demo' | 'sales';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: ModalMode;
  defaultPersona?: string;
  sourcePage?: string;
}

export const DemoModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialMode = 'demo',
  defaultPersona = 'Enterprise',
  sourcePage = 'home'
}) => {
  const [mode, setMode] = useState<ModalMode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setIsSuccess(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await submitLeadInquiry({
        name,
        email,
        company,
        guard_count: 'Unknown',
        persona: defaultPersona,
        source: sourcePage,
      });
      if (res.success) setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white border border-black p-12 shadow-2xl animate-fade-in-up">
        <button onClick={onClose} className="absolute top-8 right-8 text-black opacity-50 hover:opacity-100">
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="text-center py-20">
            <h3 className="text-4xl font-serif mb-6">Request Received</h3>
            <p className="text-black/60 font-sans">Our enterprise team will reach out shortly.</p>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-40 block mb-4">
                {mode === 'demo' ? 'Schedule a Demo' : 'Contact Sales'}
              </span>
              <h2 className="text-3xl font-medium tracking-tight">
                {mode === 'demo' ? 'Book a Platform Tour' : 'Request Architecture Pricing'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold">Full Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border-b border-black/20 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold">Work Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border-b border-black/20 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold">Organization</label>
                <input required type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full border-b border-black/20 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent" />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-editorial-solid w-full py-5 mt-8 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-4">
                {isSubmitting ? 'Transmitting...' : 'Submit Request'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
