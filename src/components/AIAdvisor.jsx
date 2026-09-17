import React, { useState } from 'react';
import { AI_PERSONAS, getTopAIRecommendations } from '../utils/aiMatcher';
import { Bot, Sparkles, ArrowUpRight, CheckCircle2, Award, Zap, ShieldCheck } from 'lucide-react';

export default function AIAdvisor({
  companies,
  onSelectDetail,
  onFilterByAIRecommended
}) {
  const [activePersonaId, setActivePersonaId] = useState('day_trader');

  const topPicks = getTopAIRecommendations(companies, activePersonaId, 3);
  const activePersona = AI_PERSONAS.find(p => p.id === activePersonaId);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white p-6 sm:p-8 dark:border-blue-900/50 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 shadow-sm transition-all">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-100 pb-5 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Trợ Lý Đề Xuất Thông Minh AI
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
                <Sparkles className="h-3 w-3" />
                AI Smart Match
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Chọn khẩu vị đầu tư của bạn để AI phân tích và đề xuất CTCK có biểu phí & sản phẩm tối ưu nhất.
            </p>
          </div>
        </div>

        {/* Quick action: Filter table by AI recommendation */}
        {onFilterByAIRecommended && (
          <button
            onClick={() => onFilterByAIRecommended(topPicks.map(c => c.id))}
            className="self-start md:self-auto inline-flex items-center gap-1.5 rounded-xl border border-blue-300 bg-white/80 px-3.5 py-2 text-xs font-bold text-blue-700 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-slate-700 shadow-sm transition-all"
          >
            <span>Lọc bảng theo Top {topPicks.length} đề xuất AI</span>
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          </button>
        )}
      </div>

      {/* Persona Selection Pills */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {AI_PERSONAS.map((persona) => {
          const isSelected = persona.id === activePersonaId;
          return (
            <button
              key={persona.id}
              onClick={() => setActivePersonaId(persona.id)}
              className={`flex flex-col justify-between text-left p-3.5 rounded-2xl transition-all border min-h-[84px] ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 ring-2 ring-blue-600/30 dark:border-blue-500'
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white hover:border-blue-300 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700/60 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-1.5 w-full">
                <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {persona.title}
                </span>
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-white shrink-0 shadow-xs" />
                )}
              </div>
              <p className={`text-[11px] mt-1.5 leading-snug break-words ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                {persona.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Top AI Recommended Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {topPicks.map((company, index) => (
          <div
            key={company.id}
            className="flex flex-col justify-between rounded-2xl border border-blue-100 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-800/90 relative group"
          >
            {/* Top Match Rank Badge */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-extrabold text-sm shadow-md"
                  style={{ backgroundColor: company.brandColor }}
                >
                  {(company.shortName || '').slice(0, 3)}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                    {company.shortName}
                    {company.stockCode && (
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        {company.stockCode}
                      </span>
                    )}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {company.marketShareRank}
                  </span>
                </div>
              </div>

              {/* Match Score Badge */}
              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/30 shadow-sm">
                <Sparkles className="h-3 w-3" />
                <span>{company.aiMatchScore}% Match</span>
              </div>
            </div>

            {/* AI Insights Explanation Box */}
            <div className="rounded-xl bg-blue-50/60 p-3 text-xs text-blue-950 dark:bg-blue-950/40 dark:text-blue-200 border border-blue-100/80 dark:border-blue-900/40 mb-3">
              <div className="font-bold text-[11px] uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1">
                <Bot className="h-3.5 w-3.5" />
                <span>Đánh giá từ AI:</span>
              </div>
              <p className="leading-relaxed">{company.aiReason}</p>
            </div>

            {/* Highlight Keypoints */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(company.keyHighlights || company.pros || []).map((hl, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                >
                  ✓ {hl}
                </span>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2">
              <button
                onClick={() => onSelectDetail(company)}
                className="flex-1 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Chi Tiết
              </button>

              <a
                href={company.accountOpeningUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-blue-600 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                <span>Mở TK eKYC</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
