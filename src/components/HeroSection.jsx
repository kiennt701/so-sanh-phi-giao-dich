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
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300 mb-3 shadow-xs backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            <span>Nền tảng So sánh chi phí giao dịch chứng khoán: tính toán chi phí thực hiện giao dịch</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white leading-tight">
            So Sánh Chi Phí Giao Dịch Chứng Khoán:{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Tính Toán Chi Phí Thực Hiện Giao Dịch
            </span>
          </h1>

          <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Minh bạch hóa biểu phí, lãi suất vay Margin và tính toán chi phí thực hiện giao dịch tại 30 CTCK hàng đầu. <em>Thông tin về mức phí giao dịch đã bao gồm phí trả sở và chưa bao gồm thuế.</em>
          </p>

          {/* Search bar in Hero */}
          <div className="mt-5 max-w-xl mx-auto">
            <div className="relative flex items-center shadow-md shadow-slate-200/50 dark:shadow-black/30 rounded-2xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Search className="h-4.5 w-4.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm CTCK (BSC, VPS, TCBS, SSI...) hoặc từ khóa..."
                className="w-full rounded-2xl border-0 bg-white py-3 pl-11 pr-24 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-slate-900 dark:text-white dark:ring-slate-800 dark:focus:ring-blue-500"
              />
              <button
                onClick={() => scrollToSection('comparison-table')}
                className="absolute right-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
              >
                Tìm Kiếm
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-300">
              <span>Gợi ý tìm nhanh:</span>
              {[
                { label: 'BSI (BSC)', val: 'BSI' },
                { label: 'SSI', val: 'SSI' },
                { label: 'VND', val: 'VND' },
                { label: 'Sàn HOSE', val: 'HOSE' },
                { label: 'Sàn HNX', val: 'HNX' },
                { label: 'Chưa niêm yết', val: 'Chưa niêm yết' },
                { label: 'TCBS', val: 'TCBS' },
                { label: 'VPS', val: 'VPS' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSearchQuery(item.val)}
                  className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium hover:bg-blue-100 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-blue-300 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Value highlights */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-3 text-left shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 mb-1.5">
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">30 CTCK</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-300 mt-0.5 font-medium">Top tổng tài sản lớn nhất</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/70 p-3 text-left shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mb-1.5">
                <TrendingDown className="h-4 w-4" />
              </div>
<<<<<<< HEAD
              <div className="text-xl font-bold text-slate-900 dark:text-white">Từ 0.03%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-300 mt-0.5 font-medium">Gồm phí Sở (Zero-Fee môi giới)</div>
=======
              <div className="text-xl font-bold text-slate-900 dark:text-white">Từ 0.00%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-300 mt-0.5 font-medium">Chính sách Zero-Fee & ưu đãi</div>
>>>>>>> 849a418be89d51e24cfb514989e2cb7a96c63b3d
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/70 p-3 text-left shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 mb-1.5">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">Từ 5.99%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-300 mt-0.5 font-medium">Lãi vay Margin ưu đãi/năm</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/70 p-3 text-left shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 mb-1.5">
                <Shield className="h-4 w-4" />
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">100% Khách quan</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-300 mt-0.5 font-medium">Mã nguồn mở, dữ liệu minh bạch</div>
            </div>
          </div>

          {/* Quick CTA button */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => scrollToSection('calculator-section')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow hover:bg-emerald-700 transition-all"
            >
              <span>Dự tính chi phí giao dịch của bạn</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection('comparison-table')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              <span>Xem bảng so sánh chi tiết</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
