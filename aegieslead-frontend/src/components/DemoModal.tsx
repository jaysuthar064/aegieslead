import React, { useState, useEffect } from 'react';
import { X, Shield, CheckCircle2, ArrowRight, Loader2, Calendar, DollarSign } from 'lucide-react';
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
  defaultPersona = 'Enterprise Security Leaders',
  sourcePage = 'home'
}) => {
  const [mode, setMode] = useState<ModalMode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  
  // Demo Specific Fields
  const [guardCount, setGuardCount] = useState('26-100 guards');
  const [persona, setPersona] = useState(defaultPersona);
  const [featureInterest, setFeatureInterest] = useState('GPS Patrol Radar & Checkpoints');

  // Sales / Quote Specific Fields
  const [siteCount, setSiteCount] = useState('6 - 25 Sites');
  const [timeline, setTimeline] = useState('Within 30 days (Active Procurement)');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setMode(initialMode);
    setIsSuccess(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your work email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const notesPayload = mode === 'demo'
        ? `[DEMO REQUEST] Persona: ${persona} | Feature Interest: ${featureInterest} | Notes: ${message || 'None'}`
        : `[SALES / RFP QUOTE] Site Volume: ${siteCount} | Timeline: ${timeline} | Requirements: ${message || 'None'}`;

      const res = await submitLeadInquiry({
        name,
        email,
        company,
        phone,
        guard_count: mode === 'demo' ? guardCount : `${siteCount} sites`,
        persona: mode === 'demo' ? persona : `Procurement: ${timeline}`,
        message: notesPayload,
        source: `${sourcePage} (${mode.toUpperCase()})`,
      });

      if (res.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(res.message || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setMessage('');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={handleResetAndClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl border border-slate-200">
          
          {/* Header Banner */}
          <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-700 text-white shadow-xs">
                {mode === 'demo' ? <Calendar className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-white font-sans leading-none">
                  {mode === 'demo' ? 'Schedule a 1-on-1 Product Demo' : 'Contact Enterprise Sales & Pricing'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {mode === 'demo'
                    ? 'Guided walkthrough with a security solutions architect'
                    : 'Custom volume rate cards, SLA modeling, and RFP assistance'}
                </p>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Selector Tabs */}
          {!isSuccess && (
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3">
              <button
                type="button"
                onClick={() => setMode('demo')}
                className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                  mode === 'demo'
                    ? 'border-blue-700 text-blue-700 font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Live Software Demo</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('sales')}
                className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                  mode === 'sales'
                    ? 'border-blue-700 text-blue-700 font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Sales & Custom Quote</span>
              </button>
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  {mode === 'demo' ? 'Demo Walkthrough Requested!' : 'Quote Inquiry Received!'}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{name || 'there'}</strong>. We have logged your request for <strong className="text-slate-900">{company || 'your organization'}</strong>. An enterprise security specialist will review your operational requirements and reach out within 2 hours.
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
                  >
                    <span>Return to Site</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marcus Jenkins"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@organization.com"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                      Company / Security Agency *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Vanguard Security Services"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                      Direct Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Mode 1: Demo Fields */}
                {mode === 'demo' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                          Active Guard Roster Scale
                        </label>
                        <select
                          value={guardCount}
                          onChange={(e) => setGuardCount(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                        >
                          <option value="1-25 guards">1 - 25 Active Guards</option>
                          <option value="26-100 guards">26 - 100 Active Guards</option>
                          <option value="101-500 guards">101 - 500 Active Guards</option>
                          <option value="500+ guards">500+ Enterprise Officers</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                          Primary Demo Interest
                        </label>
                        <select
                          value={featureInterest}
                          onChange={(e) => setFeatureInterest(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                        >
                          <option value="GPS Patrol Radar & Checkpoints">GPS Patrol Radar & Checkpoints</option>
                          <option value="Incident Evidence Chain-of-Custody">Incident Evidence Chain-of-Custody</option>
                          <option value="Automated Timesheet-to-Invoice">Automated Timesheet-to-Invoice</option>
                          <option value="AI Proposal Generator & RFP Bids">AI Proposal Generator & RFP Bids</option>
                          <option value="Guard Mobile Offline App">Guard Mobile Offline App</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                        Operational Persona
                      </label>
                      <select
                        value={persona}
                        onChange={(e) => setPersona(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                      >
                        <option value="Enterprise Security Leaders">Enterprise Corporate Security (In-House)</option>
                        <option value="Guarding Contractor Firms">Security Guarding Contractor Agency</option>
                        <option value="Critical Infrastructure">Critical Infrastructure & Utilities</option>
                        <option value="Healthcare Facilities">Healthcare & Hospital Campuses</option>
                      </select>
                    </div>
                  </>
                ) : (
                  /* Mode 2: Sales / Quote Fields */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                        Monitored Sites / Facilities
                      </label>
                      <select
                        value={siteCount}
                        onChange={(e) => setSiteCount(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                      >
                        <option value="1 - 5 Sites">1 - 5 Commercial Sites</option>
                        <option value="6 - 25 Sites">6 - 25 Sites / Campuses</option>
                        <option value="26 - 100 Sites">26 - 100 Regional Sites</option>
                        <option value="100+ Global Facilities">100+ Global Enterprise Facilities</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                        Procurement Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                      >
                        <option value="Within 30 days">Immediate (Within 30 Days)</option>
                        <option value="1 - 3 Months">1 - 3 Months</option>
                        <option value="Q3 / Q4 Budget Cycle">Next Budget Cycle (3-6 Months)</option>
                        <option value="Active RFP / Vendor Evaluation">Active RFP / Vendor Tender</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    {mode === 'demo' ? 'Special Requirements / Site Context' : 'Specific RFP Scope & Custom Contract Notes'}
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={mode === 'demo' ? "e.g., We have 45 hospital campus officers requiring panic alerts..." : "e.g., Requesting pricing model for 120 guards across 14 logistics terminals..."}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm transition-all shadow-md shadow-blue-700/25 cursor-pointer disabled:opacity-70 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting to Aegies Operations...</span>
                      </>
                    ) : (
                      <>
                        <span>{mode === 'demo' ? 'Schedule Live Demonstration' : 'Request Custom Quote & Scope'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-600" /> SOC 2 Type II Audited</span>
                  <span>•</span>
                  <span>Strict NDA & Security</span>
                  <span>•</span>
                  <span>Direct Specialist Call</span>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
