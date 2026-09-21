import React from 'react';
import type { MetricsSettings } from '../../types/cms';

interface Props {
  settings: MetricsSettings;
}

export const MetricsSection: React.FC<Props> = ({ settings }) => {
  const items = settings.items || [];

  return (
    <section className="py-20 bg-blue-50/70 text-slate-900 relative border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        {(settings.headline || settings.description) && (
          <div className="text-center max-w-2xl mx-auto mb-16">
            {settings.headline && (
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight font-sans">
                {settings.headline}
              </h2>
            )}
            {settings.description && (
              <p className="text-slate-600 text-base">
                {settings.description}
              </p>
            )}
          </div>
        )}

        {/* 4-Column Stat Grid (Clean White Stat Cards with Royal Blue Numbers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-blue-200/80 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-4xl sm:text-5xl font-black text-blue-700 font-mono mb-2">
                {item.value}
              </div>
              <div className="text-base font-extrabold text-slate-900 mb-1">
                {item.label}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {item.subtext}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
