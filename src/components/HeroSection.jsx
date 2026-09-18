import React from 'react';
import { Search, TrendingDown, ArrowRight, Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ searchQuery, setSearchQuery, scrollToSection }) {
  return (
    <section className="relative w-full max-w-full overflow-hidden pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pb-12 border-b border-slate-200 dark:border-slate-800/60 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-950">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-emerald-400/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1580px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300 mb-3 sm:mb-4 shadow-xs backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Chuẩn Hóa &amp; Minh Bạch Chi Phí 30 CTCK</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.25] sm:leading-tight max-w-4xl mx-auto">
            <span className="block sm:inline text-slate-900 dark:text-white">
              Tính Toán Chi Phí
            </span>{' '}
            <span className="block sm:inline bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Thực Hiện Giao Dịch
            </span>
          </h1>

          {/* Description & Regulatory Tag */}
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal px-2 sm:px-0">
            Minh bạch hóa biểu phí khớp lệnh, lãi suất vay Margin và tính toán chi phí thực tế cho từng quy mô danh mục đầu tư tại 30 CTCK hàng đầu.
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl sm:rounded-full bg-slate-100/90 dark:bg-slate-800/80 px-3 py-1.5 text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 max-w-[94vw] text-center leading-tight">
            <Shield className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Phí giao dịch đã gồm phí trả Sở (0.027% - 0.03%) &amp; chưa bao gồm thuế</span>
          </div>

          {/* Search bar in Hero */}
          <div className="mt-5 sm:mt-6 max-w-2xl mx-auto px-1 sm:px-0">
            <div className="relative flex items-center shadow-lg shadow-blue-500/5 dark:shadow-black/30 rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 sm:pl-4 text-slate-400">
                <Search className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm CTCK (BSC, VPS, TCBS, SSI...) hoặc từ khóa..."
                className="w-full rounded-2xl border-0 bg-transparent py-2.5 sm:py-3 pl-9 sm:pl-11 pr-20 sm:pr-24 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden dark:text-white"
              />
              <button
                onClick={() => scrollToSection('comparison-table')}
                className="absolute right-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold text-white shadow-xs hover:from-blue-700 hover:to-indigo-700 transition-all touch-manipulation"
              >
                Tìm Kiếm
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-400 dark:text-slate-500 mr-0.5">Gợi ý tìm nhanh:</span>
              {[
                { label: 'BSI (BSC)', val: 'BSI' },
                { label: 'TCBS', val: 'TCBS' },
                { label: 'VPS', val: 'VPS' },
                { label: 'SSI', val: 'SSI' },
                { label: 'VND', val: 'VND' },
                { label: 'Sàn HOSE', val: 'HOSE' },
                { label: 'Sàn HNX', val: 'HNX' },
                { label: 'Chưa niêm yết', val: 'Chưa niêm yết' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSearchQuery(item.val)}
                  className="rounded-lg bg-white dark:bg-slate-800 px-2 py-0.5 font-medium text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-slate-700 dark:hover:text-blue-300 transition-all shadow-2xs"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick CTA buttons */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => scrollToSection('calculator-section')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 transition-all touch-manipulation"
            >
              <span>Dự tính chi phí giao dịch của bạn</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection('comparison-table')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all touch-manipulation"
            >
              <span>Xem bảng so sánh chi tiết</span>
            </button>
          </div>

          {/* Value highlights */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 text-left shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 mb-2">
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">30 CTCK</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-tight">Top tổng tài sản lớn nhất</div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 text-left shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mb-2">
                <TrendingDown className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">Từ 0.03%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-tight">Gồm phí Sở (Zero-Fee môi giới)</div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 text-left shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 mb-2">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">Từ 5.99%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-tight">Lãi vay Margin ưu đãi/năm</div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 text-left shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 mb-2">
                <Shield className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">100% Khách quan</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-tight">Mã nguồn mở, dữ liệu minh bạch</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
