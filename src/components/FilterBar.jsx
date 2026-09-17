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
    <div className="space-y-3">
      {/* Primary Mode Switcher: Existing Client Standard Rates vs Welcome Promo Comparator */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-slate-100 dark:bg-slate-850 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-1.5 flex-1">
          <button
            type="button"
            onClick={() => setComparisonTab && setComparisonTab('existing')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-extrabold transition-all ${
              comparisonTab === 'existing'
                ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-800 dark:text-blue-400 dark:ring-slate-700'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Table className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Khách Hàng Hiện Hữu (Biểu Phí Chuẩn)</span>
          </button>

          <button
            type="button"
            onClick={() => setComparisonTab && setComparisonTab('welcome_promo')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-extrabold transition-all ${
              comparisonTab === 'welcome_promo'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-orange-500/25'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Gift className="h-4 w-4 text-amber-500 group-hover:text-amber-600" />
            <span>Ưu Đãi Mở Tài Khoản Mới (eKYC)</span>
            <span className="rounded-full bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5">
              HOT
            </span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 px-2 sm:text-right">
          {comparisonTab === 'existing' ? (
            <span>Biểu phí & margin chuẩn <strong>dài hạn</strong> (loại trừ khuyến mãi tạm thời)</span>
          ) : (
            <span>Tổng hợp các gói <strong>miễn phí 3-6 tháng & quà tặng eKYC</strong></span>
          )}
        </div>
      </div>

      {/* Existing Customer Category Filters & View Toggle (Only shown when in 'existing' mode) */}
      {comparisonTab === 'existing' && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
          {/* Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {FILTER_CATEGORIES.map((cat) => {
              const Icon = cat.icon ? iconMap[cat.icon] : null;
              const isActive = activeFilter === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all shadow-xs ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-blue-500/25 ring-2 ring-blue-600 dark:ring-blue-500'
                      : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800'
                  }`}
                >
                  {Icon && <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle & Result count */}
          <div className="flex items-center justify-between md:justify-end gap-2.5">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Hiển thị <strong className="text-slate-900 dark:text-white">{filteredCount}</strong> CTCK
            </span>

            <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <button
                onClick={() => setViewMode('table')}
                className={`rounded-lg p-1.5 transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Dạng bảng chi tiết"
              >
                <Table className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`rounded-lg p-1.5 transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Dạng thẻ lưới"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating or Inline Comparison Bar when companies are selected */}
      {comparisonTab === 'existing' && selectedForCompare.length > 0 && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-3.5 py-2.5 dark:border-blue-900/60 dark:from-blue-950/40 dark:to-indigo-950/40 shadow-xs animate-fade-in">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">
              Đã chọn so sánh ({selectedForCompare.length}/3):
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedForCompare.map((company) => (
                <span
                  key={company.id}
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-0.5 text-xs font-bold text-slate-800 shadow-xs border border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800"
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

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1"
              title="Bỏ chọn tất cả"
            >
              <X className="h-4 w-4" />
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
              <span>So Sánh Đối Đầu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
