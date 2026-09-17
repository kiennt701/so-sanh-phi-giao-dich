import React from 'react';
import { ArrowUpRight, Award, Building2, Check, Plus, Sparkles, TrendingDown, Zap } from 'lucide-react';

function HighlightText({ text, query }) {
  if (!query || !text) return <span>{text}</span>;
  const trimmed = query.trim();
  if (!trimmed) return <span>{text}</span>;
  const parts = String(text).split(new RegExp(`(${trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
          <mark key={i} className="bg-amber-200 dark:bg-amber-900/90 text-slate-950 dark:text-amber-200 px-0.5 rounded font-black shadow-xs">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function SecuritiesCards({
  companies,
  selectedForCompare,
  toggleCompare,
  onSelectDetail,
  searchQuery = ''
}) {
  return (
    <section className="broker-cards-grid grid grid-cols-1 gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => {
        const isCompared = selectedForCompare.some((c) => c.id === company.id);
        const isBsc = company.id === 'bsc' || company.isRecommended;
        const isZeroFee = company.tradingFee.onlineMin === 0 || company.tradingFee.zeroFeeOffer;

        return (
          <article
            key={company.id}
            className={`broker-card flex flex-col justify-between rounded-2xl p-3.5 sm:p-4 transition-all group ${
              isBsc
                ? 'broker-card--featured border-2 border-blue-500/80 bg-gradient-to-b from-blue-50/50 via-white to-white shadow-md ring-2 ring-blue-500/20 dark:border-blue-500/80 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-900'
                : 'border border-slate-200 bg-white shadow-xs hover:shadow-md dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            {/* Top header: Logo, Name, Rank */}
            <header className="broker-card__header">
              {/* BSC Top Recommendation Pill */}
              {isBsc && (
                <div className="mb-2.5 -mt-1 flex items-center justify-between rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-black text-white shadow-xs">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-300 shrink-0" />
                    <span>Top Đề Xuất: Phí & Lãi Tối Ưu</span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">
                    BIDV Big4
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl text-white font-extrabold text-sm shadow-xs shrink-0"
                    style={{ backgroundColor: company.brandColor }}
                  >
                    {(company.shortName || '').slice(0, 3)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                        <HighlightText text={company.shortName} query={searchQuery} />
                      </h3>
                      {company.isListed && company.stockCode ? (
                        <span className="rounded bg-blue-100 dark:bg-blue-950/80 px-1.5 py-0.5 text-[9px] font-black text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80">
                          <HighlightText text={`${company.stockCode} : ${company.listingExchange}`} query={searchQuery} />
                        </span>
                      ) : (
                        <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500 dark:text-slate-400">
                          <HighlightText text={company.parentStockCode ? `Chưa NY (${company.parentStockCode})` : 'Chưa niêm yết'} query={searchQuery} />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-normal">
                      <HighlightText text={company.name} query={searchQuery} />
                    </p>
                  </div>
                </div>

                {/* Compare button with touch-friendly size */}
                <button
                  onClick={() => toggleCompare(company)}
                  className={`h-9 w-9 sm:h-8 sm:w-8 flex items-center justify-center rounded-xl text-xs font-semibold transition-colors shrink-0 touch-manipulation ${
                    isCompared
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                  title={isCompared ? 'Bỏ chọn so sánh' : 'Thêm vào so sánh đối đầu'}
                  aria-label="So sánh công ty này"
                >
                  {isCompared ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </button>
              </div>
            </header>

            {/* Card Body */}
            <div className="broker-card__body">
              {/* Tags / Badges */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Award className="h-2.5 w-2.5" />
                  {company.marketShareRank}
                </span>

                {company.bankBacked && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    <Building2 className="h-2.5 w-2.5" />
                    {company.bankBacked}
                  </span>
                )}
              </div>

              {/* Metrics Grid */}
              <div className="mt-2.5 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2 sm:p-2.5 dark:bg-slate-800/60 leading-normal">
                {/* Trading fee metric */}
                <div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Phí GD Online
                  </div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
                    {isZeroFee ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-0.5">
                        <Zap className="h-3 w-3" />
                        0.00%
                      </span>
                    ) : (
                      <span>
                        {company.tradingFee.onlineMin}%
                        {company.tradingFee.onlineMin !== company.tradingFee.onlineMax && ` - ${company.tradingFee.onlineMax}%`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Margin rate metric */}
                <div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Lãi Margin Chuẩn
                  </div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
                    <span className={company.margin.baseRate <= 11.5 ? 'text-amber-600 dark:text-amber-400' : ''}>
                      {company.margin.baseRate}%
                    </span>
                    <span className="text-[10px] font-normal text-slate-400">/năm</span>
                  </div>
                </div>
              </div>

              {/* Short-term / Deal margin note if available */}
              {(company.margin.shortTermRate || company.margin.promoRate) && (
                <div className="mt-2 flex items-center justify-between rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 px-2 py-1 text-[10px] font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    Deal ngắn T+:
                  </span>
                  <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
                    từ {company.margin.shortTermRate || company.margin.promoRate}%/năm
                  </span>
                </div>
              )}

              {/* Highlights pill list */}
              <div className="mt-2.5 flex flex-col gap-1.5">
                {(company.keyHighlights || company.pros || []).slice(0, 2).map((hl, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-start gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 px-2 py-1 text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800/60 leading-snug"
                  >
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Promotion snippet */}
              <div className="mt-2.5 rounded-lg border-l-2 border-amber-400 bg-amber-50/40 p-2 dark:bg-amber-950/20 text-[11px]">
                <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 text-[10px] sm:text-[11px]">
                  <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                  Ưu đãi:
                </div>
                <p className="line-clamp-2 text-slate-500 dark:text-slate-400 pl-2 leading-relaxed text-[10px] sm:text-[11px] mt-0.5">
                  {company.promotions?.[0] || company.pros?.[0] || ''}
                </p>
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <footer className="broker-card__footer mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectDetail(company)}
                className="flex-1 rounded-xl border border-slate-200 bg-white py-2 sm:py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors touch-manipulation text-center"
              >
                Chi Tiết
              </button>

              <a
                href={company.accountOpeningUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 inline-flex items-center justify-center gap-1 rounded-xl py-2 sm:py-2 text-xs font-extrabold shadow-sm transition-all touch-manipulation text-center ${
                  isBsc
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/20'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span>{isBsc ? 'Mở TK BSC' : 'Mở Tài Khoản'}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </footer>
          </article>
        );
      })}
    </section>
  );
}
