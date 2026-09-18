import React from 'react';
import { Check, Plus, ArrowUpRight, Sparkles, TrendingDown, ArrowRightLeft } from 'lucide-react';

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

export default function SecuritiesTable({
  companies,
  selectedForCompare,
  toggleCompare,
  onSelectDetail,
  searchQuery = ''
}) {
  return (
    <div className="space-y-2.5 sm:space-y-3">
      {/* Strategic BSC Spotlight Banner to drive account openings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-3 sm:p-3.5 text-white shadow-md">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black text-xs sm:text-sm shadow-sm">
            BSC
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-300">
                <Sparkles className="h-3 w-3 text-amber-300" />
                Top Đề Xuất Phí & Lãi
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-white">Chứng khoán BIDV (BSC)</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-200 leading-normal mt-0.5 sm:mt-1">
              Phí online từ <strong className="text-amber-300">0.08%</strong> • Lãi Margin chuẩn 90 ngày <strong className="text-amber-300 font-extrabold">10.5%</strong> • Định chế tài chính quốc doanh từ <strong className="text-white">BIDV & Hana Securities</strong>.
            </p>
          </div>
        </div>

        <a
          href="https://dangky.bsc.com.vn/moi-gioi?online=false&cif=4768"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-black text-slate-950 shadow-md hover:from-amber-300 hover:to-orange-300 transition-all self-start sm:self-auto touch-manipulation"
        >
          <span>Mở Tài Khoản BSC</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Mobile Swipe Hint Badge */}
      <div className="flex sm:hidden items-center justify-between text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/40 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900/60">
        <span className="flex items-center gap-1.5">
          <span>👉 Vuốt ngang bảng để xem đầy đủ chi tiết</span>
        </span>
        <span className="text-[10px] text-slate-500 dark:text-slate-400">30 CTCK</span>
      </div>

      {/* Main Table Container with Sticky Column & Smooth Touch Scrolling */}
      <div className="w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="w-full max-w-full overflow-x-auto overflow-y-auto max-h-[72vh] relative scroll-smooth overscroll-x-contain touch-scroll">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] sm:text-[11px] font-black text-slate-700 dark:border-slate-800 dark:text-slate-200 uppercase tracking-wider">
                {/* 1. Công Ty Chứng Khoán (Sticky Left) */}
                <th className="sticky left-0 top-0 z-30 bg-slate-100 dark:bg-slate-800 py-3 px-3 sm:px-4 w-[24%] min-w-[200px] lg:min-w-[250px] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  Công Ty Chứng Khoán
                </th>

                {/* 2. Cột Hành Động */}
                <th className="sticky top-0 z-20 bg-slate-100 dark:bg-slate-800 py-3 px-2 sm:px-2.5 w-[125px] min-w-[125px] text-center border-r border-slate-200 dark:border-slate-700">
                  Hành Động
                </th>

                {/* 3. Phí GD Cơ Sở (Online) */}
                <th className="sticky top-0 z-20 bg-slate-100 dark:bg-slate-800 py-3 px-3 w-[145px] min-w-[145px]">
                  <div>Phí GD Online</div>
                  <div className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 normal-case">Đã gồm sở, chưa thuế</div>
                </th>

                {/* 4. Lãi Margin */}
                <th className="sticky top-0 z-20 bg-slate-100 dark:bg-slate-800 py-3 px-3 w-[185px] min-w-[185px]">
                  <div>Lãi Ký Quỹ Margin</div>
                  <div className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 normal-case">Chuẩn 90 ngày vs Gói Deal</div>
                </th>

                {/* 5. Key Points */}
                <th className="sticky top-0 z-20 bg-slate-100 dark:bg-slate-800 py-3 px-4 min-w-[340px] lg:min-w-[420px] w-full">
                  <div>Key Points Nổi Bật</div>
                  <div className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 normal-case">Lợi thế cạnh tranh & dịch vụ</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {companies.map((company) => {
                const isCompared = selectedForCompare.some((c) => c.id === company.id);
                const isBsc = company.id === 'bsc' || company.isRecommended;

                return (
                  <tr
                    key={company.id}
                    className={`group transition-colors ${
                      isBsc ? 'bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50/60 dark:hover:bg-blue-950/40' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {/* Sticky Column 1: Company Logo & Name */}
                    <td className={`sticky left-0 z-10 py-2.5 sm:py-3 px-3 sm:px-4 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.08)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.4)] transition-colors ${
                      isBsc ? 'bg-blue-50 dark:bg-blue-950 group-hover:bg-blue-100 dark:group-hover:bg-blue-900' : 'bg-white dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl text-white font-extrabold text-xs shadow-xs"
                          style={{ backgroundColor: company.brandColor }}
                        >
                          {(company.shortName || '').slice(0, 3)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                              <HighlightText text={company.shortName} query={searchQuery} />
                            </span>
                            {company.isListed && company.stockCode ? (
                              <span className="rounded bg-blue-100 dark:bg-blue-950 px-1.5 py-0.5 text-[9px] font-black text-blue-800 dark:text-blue-300">
                                {company.stockCode}
                              </span>
                            ) : null}
                            {isBsc ? (
                              <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[9px] font-black text-white uppercase tracking-wider">
                                Top 1
                              </span>
                            ) : null}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-300 truncate max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] mt-0.5 font-medium">
                            {company.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Actions */}
                    <td className="py-2.5 px-2 sm:px-2.5 text-center border-r border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onSelectDetail(company)}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 touch-manipulation"
                        >
                          Chi Tiết
                        </button>
                        <button
                          type="button"
                          onClick={() => (toggleCompare || onToggleCompare)(company)}
                          className={`rounded-lg border px-2 py-1 text-[11px] font-bold transition-colors touch-manipulation ${
                            isCompared
                              ? 'border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {isCompared ? 'Đã chọn' : 'So Sánh'}
                        </button>
                        <a
                          href={company.accountOpeningUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-blue-600 p-1 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 touch-manipulation inline-flex items-center justify-center"
                          title={`Mở tài khoản tại ${company.shortName}`}
                          aria-label="Mở tài khoản"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </td>

                    {/* Column 3: Trading Fee */}
                    <td className="py-2.5 px-3">
                      {company.id === 'tcbs' ? (
                        <div>
                          <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs sm:text-sm">
                            {company.tradingFee.onlineMin}% (Gồm phí Sở)
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">
                            Miễn phí môi giới trọn đời
                          </div>
                        </div>
                      ) : company.id === 'dnse' ? (
                        <div>
                          <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs sm:text-sm">
                            {company.tradingFee.onlineMin}% (Gồm phí Sở)
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">
                            Miễn phí môi giới
                          </div>
                        </div>
                      ) : company.tradingFee.onlineMin === 0 || company.tradingFee.zeroFeeOffer ? (
                        <div>
                          <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs sm:text-sm">
                            0.00% (Zero-Fee)
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">
                            Chưa gồm phí trả Sở
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {company.tradingFee.onlineMin}%
                            {company.tradingFee.onlineMin !== company.tradingFee.onlineMax && ` - ${company.tradingFee.onlineMax}%`}
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">
                            Đã gồm phí trả Sở
                          </div>
                        </div>
                      )}
                      {company.tradingFee?.brokerMin > 0 && company.tradingFee.brokerMin !== company.tradingFee.onlineMin && (
                        <div className="text-[9.5px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Môi giới: {company.tradingFee.brokerMin}%{company.tradingFee.brokerMax !== company.tradingFee.brokerMin ? ` - ${company.tradingFee.brokerMax}%` : ''}
                        </div>
                      )}
                    </td>

                    {/* Column 4: Margin */}
                    <td className="py-2.5 px-3">
                      <div className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {company.margin.baseRate ?? company.margin.standardRate90d}%/năm
                        <span className="ml-1 text-[10px] font-normal text-slate-400 dark:text-slate-300">(90 ngày)</span>
                      </div>
                      {(company.margin.shortTermRate || company.margin.promoRate) && (
                        <div className="text-[10px] text-indigo-600 dark:text-indigo-300 font-bold flex items-center gap-1 mt-0.5">
                          <TrendingDown className="h-3 w-3 shrink-0" />
                          <span>Gói Deal từ {company.margin.shortTermRate || company.margin.promoRate}%</span>
                        </div>
                      )}
                      {company.margin?.maxLeverage && (
                        <div className="text-[9.5px] text-slate-400 dark:text-slate-400 mt-0.5 truncate max-w-[170px]" title={company.margin.maxLeverage}>
                          Đòn bẩy: {company.margin.maxLeverage.split(' ')[0]}
                        </div>
                      )}
                    </td>

                    {/* Column 5: Key Points */}
                    <td className="py-2.5 px-3 sm:px-4">
                      <div className="flex flex-col gap-1.5">
                        {(company.keyHighlights || company.pros || []).slice(0, 2).map((hl, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-start gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/90 px-2 py-1 text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700/70 leading-snug"
                          >
                            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
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
