import React, { useState, useMemo } from 'react';
import { 
  Gift, 
  Sparkles, 
  TrendingDown, 
  ArrowUpRight, 
  Search, 
  Clock, 
  Award
} from 'lucide-react';

export default function WelcomePromoComparator({ companies, onSelectDetail }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'zero_fee' | 'low_margin' | 'gift'

  // Filter list of companies
  const filteredList = useMemo(() => {
    return companies.filter((c) => {
      const promo = c.welcomePromo;
      if (!promo || !promo.hasPromo) return false;

      // Text search
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        c.shortName.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        (promo.badge && promo.badge.toLowerCase().includes(q)) ||
        (promo.feeOffer && promo.feeOffer.toLowerCase().includes(q)) ||
        (promo.marginOffer && promo.marginOffer.toLowerCase().includes(q));

      if (!matchSearch) return false;

      // Filter category
      if (filterType === 'zero_fee') {
        return promo.feeOffer.includes('0%') || promo.feeOffer.includes('Miễn phí') || promo.badge.includes('Zero-Fee');
      }
      if (filterType === 'low_margin') {
        return c.margin.promoRate <= 8.0;
      }
      if (filterType === 'gift') {
        return promo.giftBonus && !promo.giftBonus.includes('Không');
      }

      return true;
    });
  }, [companies, search, filterType]);

  return (
    <div className="w-full max-w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors space-y-4">
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3.5 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300 mb-1">
            <Gift className="h-3.5 w-3.5" />
            <span>Phân Hệ So Sánh Riêng Biệt</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Bảng Đối Chiếu Ưu Đãi Mở Tài Khoản Mới (eKYC)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dành riêng cho nhà đầu tư chuẩn bị mở tài khoản chứng khoán mới hoặc tài khoản Inactive quay trở lại thị trường.
          </p>
        </div>

        {/* Quick Search & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Lọc tên CTCK, ưu đãi..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'zero_fee', label: 'Miễn phí GD' },
              { id: 'low_margin', label: 'Lãi ≤8%' },
              { id: 'gift', label: 'Có quà eKYC' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                  filterType === f.id
                    ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-700 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Featured Welcome Deals Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Card 1: Zero-Fee Champion */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900/60 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
              <Sparkles className="h-3 w-3" />
              <span>Zero-Fee Trọn Đời</span>
            </span>
            <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400">TCBS & DNSE</span>
          </div>
          <div className="mt-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
            Miễn phí 100% trọn đời giao dịch cổ phiếu
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Không giới hạn thời gian khuyến mãi, tiết kiệm hàng chục triệu đồng tiền phí.
          </div>
        </div>

        {/* Card 2: 6 Months Free Champion */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900/60 dark:bg-blue-950/20">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-black text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              <Award className="h-3 w-3" />
              <span>Miễn Phí 6 Tháng</span>
            </span>
            <span className="text-[11px] font-extrabold text-blue-700 dark:text-blue-400">VPS SmartOne</span>
          </div>
          <div className="mt-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
            Miễn phí 6 tháng đầu cho tài khoản mở mới
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Thị phần số 1 HOSE & HNX, đội ngũ broker tư vấn room lệnh sát sao.
          </div>
        </div>

        {/* Card 3: Lowest Margin Rate Champion */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 dark:border-indigo-900/60 dark:bg-indigo-950/20">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-black text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
              <TrendingDown className="h-3 w-3" />
              <span>Lãi Margin Từ 5.99%</span>
            </span>
            <span className="text-[11px] font-extrabold text-indigo-700 dark:text-indigo-400">DNSE • BSC • Kafi</span>
          </div>
          <div className="mt-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
            Lãi suất vay Margin deal ưu đãi từ 5.99% - 7.5%
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Cạnh tranh vượt trội so với mức lãi suất cơ sở thị trường (11.5% - 13.5%).
          </div>
        </div>
      </div>

      {/* Mobile Cards View (<sm screens): 100% width, zero overflow, touch-optimized */}
      <div className="block sm:hidden space-y-3">
        {filteredList.map((company) => {
          const promo = company.welcomePromo;
          const isBsc = company.id === 'bsc';

          return (
            <div
              key={company.id}
              className={`rounded-2xl border p-3.5 space-y-3 transition-all ${
                isBsc
                  ? 'border-amber-400/80 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-900 shadow-sm'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs'
              }`}
            >
              {/* Card Top: Logo, Company Name, Badge & Market Rank */}
              <div className="flex items-start justify-between gap-2">
                <div 
                  className="flex items-center gap-2.5 cursor-pointer min-w-0"
                  onClick={() => onSelectDetail && onSelectDetail(company)}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white font-black text-xs shadow-xs"
                    style={{ backgroundColor: company.brandColor }}
                  >
                    {(company.shortName || '').slice(0, 3)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                        {company.shortName}
                      </span>
                      {promo.badge && (
                        <span className="inline-flex rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-black text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          {promo.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block truncate">
                      {company.name} • {company.marketShareRank}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectDetail && onSelectDetail(company)}
                  className="shrink-0 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline py-1 px-1.5"
                >
                  Chi tiết
                </button>
              </div>

              {/* Offer Summary Pills (2 Columns) */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/70 p-2.5 border border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                    Phí Giao Dịch
                  </div>
                  <div className="font-black text-slate-900 dark:text-slate-100 mt-0.5 line-clamp-2">
                    {promo.feeOffer}
                  </div>
                </div>

                <div className="rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 p-2.5 border border-emerald-100 dark:border-emerald-900/40">
                  <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Lãi Vay Margin
                  </div>
                  <div className="font-black text-emerald-700 dark:text-emerald-300 mt-0.5 line-clamp-2">
                    {promo.marginOffer}
                  </div>
                  <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Chuẩn: {company.margin.baseRate}%
                  </div>
                </div>
              </div>

              {/* Promo Duration & Gift Info */}
              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span><strong>Thời hạn:</strong> {promo.duration}</span>
                </div>
                {promo.giftBonus && promo.giftBonus !== 'Không' && (
                  <div className="flex items-start gap-1.5 text-[11px]">
                    <Gift className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2"><strong>Quà eKYC:</strong> {promo.giftBonus}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <a
                  href={company.accountOpeningUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 px-3 text-xs font-black text-white shadow-sm transition-all"
                >
                  <span>Mở Tài Khoản Nhận Ưu Đãi {company.shortName}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Comparison Table (Hidden on mobile <sm, visible sm+) */}
      <div className="hidden sm:block relative w-full max-w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="w-full max-w-full overflow-x-auto overflow-y-auto max-h-[500px] touch-scroll">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="sticky top-0 left-0 z-30 bg-slate-100 dark:bg-slate-800 py-2.5 px-3 min-w-[160px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  Công Ty Chứng Khoán
                </th>
                <th className="sticky top-0 z-20 bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm py-2.5 px-3 min-w-[170px]">
                  Ưu Đãi Phí Giao Dịch
                </th>
                <th className="sticky top-0 z-20 bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm py-2.5 px-3 min-w-[170px]">
                  Ưu Đãi Lãi Margin
                </th>
                <th className="sticky top-0 z-20 bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm py-2.5 px-3 min-w-[120px]">
                  Thời Hạn Ưu Đãi
                </th>
                <th className="sticky top-0 z-20 bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm py-2.5 px-3 min-w-[180px]">
                  Quà Tặng / Dịch Vụ eKYC
                </th>
                <th className="sticky top-0 z-20 bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm py-2.5 px-3 text-right min-w-[110px]">
                  Hành Động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredList.map((company) => {
                const promo = company.welcomePromo;

                return (
                  <tr
                    key={company.id}
                    className="group hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Sticky CTCK column */}
                    <td
                      onClick={() => onSelectDetail && onSelectDetail(company)}
                      className="sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-850 transition-colors py-2.5 px-3 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: company.brandColor }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {company.shortName}
                            </span>
                            {promo.badge && (
                              <span className="inline-flex rounded-md bg-amber-100 px-1.5 py-0.2 text-[9px] font-black text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                {promo.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[130px]">
                            {company.marketShareRank}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Fee Promo */}
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {promo.feeOffer}
                      </div>
                    </td>

                    {/* Margin Promo */}
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        {promo.marginOffer}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Lãi cơ sở chuẩn: {company.margin.baseRate}%/năm
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span>{promo.duration}</span>
                      </div>
                    </td>

                    {/* Gift & Services */}
                    <td className="py-2.5 px-3">
                      <div className="text-slate-600 dark:text-slate-300 line-clamp-2">
                        {promo.giftBonus}
                      </div>
                    </td>

                    {/* Action button */}
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <a
                        href={company.accountOpeningUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-700 px-2.5 py-1 text-xs font-bold text-white shadow-xs transition-colors"
                      >
                        <span>Nhận Ưu Đãi</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
