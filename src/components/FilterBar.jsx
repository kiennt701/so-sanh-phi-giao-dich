import React from 'react';
import { FILTER_CATEGORIES } from '../data/securitiesData';
import { LayoutGrid, Table, ArrowRightLeft, X, Sparkles, TrendingDown, Landmark, Gift, Zap } from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  TrendingDown: TrendingDown,
  Landmark: Landmark,
  Gift: Gift,
  Zap: Zap,
};

export default function FilterBar({
  comparisonTab = 'existing',
  setComparisonTab,
  activeFilter,
  setActiveFilter,
  viewMode,
  setViewMode,
  selectedForCompare = [],
  openCompareModal,
  clearCompare,
  filteredCount
}) {
  return (
    <div className="space-y-2.5 sm:space-y-3">
      {/* Primary Mode Switcher: Existing Client Standard Rates vs Short-term Margin vs Welcome Promo */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-2 bg-slate-100 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-1.5 flex-1">
          {/* Tab 1: Existing Clients */}
          <button
            type="button"
            onClick={() => setComparisonTab && setComparisonTab('existing')}
            className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-extrabold transition-all text-center ${
              comparisonTab === 'existing'
                ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-900 dark:text-blue-300 dark:ring-slate-700'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            <Table className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="hidden sm:inline">Khách Hiện Hữu (Phí Chuẩn)</span>
            <span className="sm:hidden text-xs">Phí Chuẩn 90 Ngày</span>
          </button>

          {/* Tab 2: Short-Term Margin (T+, Quick, Deal) */}
          <button
            type="button"
            onClick={() => setComparisonTab && setComparisonTab('short_term_margin')}
            className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-extrabold transition-all text-center ${
              comparisonTab === 'short_term_margin'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            <Zap className={`h-4 w-4 shrink-0 ${comparisonTab === 'short_term_margin' ? 'text-amber-300 fill-amber-300' : 'text-amber-500'}`} />
            <span className="hidden sm:inline">Margin Ngắn Ngày (T+, Quick, Deal)</span>
            <span className="sm:hidden text-xs">Margin T+ / Quick</span>
            <span className="rounded-full bg-amber-400 text-amber-950 text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 shrink-0">
              ⚡ T+
            </span>
          </button>

          {/* Tab 3: Welcome Promos */}
          <button
            type="button"
            onClick={() => setComparisonTab && setComparisonTab('welcome_promo')}
            className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-extrabold transition-all text-center ${
              comparisonTab === 'welcome_promo'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-orange-500/25'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            <Gift className="h-4 w-4 text-amber-300 shrink-0" />
            <span className="hidden sm:inline">Ưu Đãi Mở Mới (eKYC)</span>
            <span className="sm:hidden text-xs">Ưu Đãi Mở Mới</span>
            <span className="rounded-full bg-red-500 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 shrink-0">
              HOT
            </span>
          </button>
        </div>

        <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-300 px-2 text-center xl:text-right font-medium shrink-0">
          {comparisonTab === 'existing' ? (
            <span>Biểu phí & margin chuẩn <strong className="text-slate-700 dark:text-white font-bold">dài hạn 90 ngày</strong></span>
          ) : comparisonTab === 'short_term_margin' ? (
            <span>Các gói lướt sóng <strong className="text-blue-600 dark:text-blue-400 font-bold">T+3, T+5, T+10 chỉ từ 5.99%</strong></span>
          ) : (
            <span>Tổng hợp các gói <strong className="text-slate-700 dark:text-white font-bold">miễn phí & quà tặng eKYC</strong></span>
          )}
        </div>
      </div>

      {/* Existing Customer Category Filters & View Toggle */}
      {comparisonTab === 'existing' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-0.5">
          {/* Pills with Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0 sm:flex-wrap -mx-1 px-1">
            {FILTER_CATEGORIES.map((cat) => {
              const Icon = cat.icon ? iconMap[cat.icon] : null;
              const isActive = activeFilter === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all shrink-0 shadow-xs ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-blue-500/25 ring-2 ring-blue-600 dark:ring-blue-500'
                      : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700'
                  }`}
                >
                  {Icon && <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle & Result count */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-1 sm:pt-0">
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-300">
              Hiển thị <strong className="text-slate-900 dark:text-white">{filteredCount}</strong> CTCK
            </span>

            <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800 shadow-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1 transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                    : 'text-slate-400 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white'
                }`}
                title="Dạng thẻ lưới trực quan (khuyên dùng trên điện thoại)"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="text-[11px]">Thẻ</span>
              </button>

              <button
                onClick={() => setViewMode('table')}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1 transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                    : 'text-slate-400 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white'
                }`}
                title="Dạng bảng chi tiết"
              >
                <Table className="h-3.5 w-3.5" />
                <span className="text-[11px]">Bảng</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating or Inline Comparison Bar */}
      {comparisonTab === 'existing' && selectedForCompare.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-2.5 sm:px-3.5 sm:py-2.5 dark:border-blue-900/60 dark:from-blue-950/40 dark:to-indigo-950/40 shadow-xs animate-fade-in">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] sm:text-xs font-semibold text-blue-900 dark:text-blue-200">
              Đã chọn ({selectedForCompare.length}/3):
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              {selectedForCompare.map((company) => (
                <span
                  key={company.id}
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-0.5 text-[11px] font-bold text-slate-800 shadow-xs border border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800"
                >
                  <span
                    className="h-2 w-2 rounded-full inline-block"
                    style={{ backgroundColor: company.brandColor }}
                  />
                  {company.shortName}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-blue-100 dark:border-blue-900/40">
            <button
              onClick={clearCompare}
              className="text-[11px] text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 p-1 font-medium"
              title="Bỏ chọn tất cả"
            >
              Bỏ chọn
            </button>

            <button
              onClick={openCompareModal}
              disabled={selectedForCompare.length < 2}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold shadow-sm transition-all ${
                selectedForCompare.length >= 2
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-blue-500/25'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600'
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>So Sánh Đối Đầu ({selectedForCompare.length})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
