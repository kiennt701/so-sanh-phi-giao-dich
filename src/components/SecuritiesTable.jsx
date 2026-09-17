import React from 'react';
import { ExternalLink, Check, Plus, Info, ArrowUpRight, Shield, Award, Sparkles, Building2, Zap, TrendingDown } from 'lucide-react';

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
    <div className="space-y-3">
      {/* Strategic BSC Spotlight Banner to drive account openings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-3 sm:p-3.5 text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black text-sm shadow-sm">
            BSC
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
                <Sparkles className="h-3 w-3 text-amber-300" />
                Top Đề Xuất An Toàn & Tối Ưu Phí
              </span>
              <span className="text-xs font-extrabold text-white">Chứng khoán BIDV (BSC)</span>
            </div>
            <p className="text-xs text-slate-200 leading-normal mt-1">
              Phí online chỉ từ <strong className="text-amber-300">0.08% – 0.13%</strong> (thấp nhất <strong className="text-emerald-300">0.08%</strong>) • Lãi Margin chuẩn 90 ngày <strong className="text-amber-300 font-extrabold">10.5%</strong> (gói T+ từ 7.5%) • Định chế tài chính quốc doanh uy tín từ <strong className="text-white">BIDV & Hana Securities</strong>.
            </p>
          </div>
        </div>

        <a
          href="https://dangky.bsc.com.vn/moi-gioi?online=false&cif=4768"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2 text-xs font-black text-slate-950 shadow-md hover:from-amber-300 hover:to-orange-300 transition-all self-start sm:self-auto"
        >
          <span>Mở Tài Khoản BSC (CIF 4768)</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Main Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="overflow-x-auto overflow-y-auto max-h-[72vh] relative scroll-smooth">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-black text-slate-700 dark:border-slate-800 dark:text-slate-200 uppercase tracking-wider">
                {/* 1. Công Ty Chứng Khoán (Sticky Left) */}
                <th className="sticky left-0 top-0 z-30 bg-slate-100 dark:bg-slate-800 py-2.5 px-3 min-w-[165px] sm:min-w-[185px] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  Công Ty Chứng Khoán
                </th>

                {/* 2. Cột Hành Động đưa ra ngay cạnh Cột Tên Công Ty */}
                <th className="sticky top-0 z-20 bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm py-2.5 px-2.5 min-w-[130px] sm:min-w-[140px] text-center border-r border-slate-200 dark:border-slate-700">
                  Hành Động
                </th>

                {/* 3. Phí GD Cơ Sở (Online) */}
                <th className="sticky top-0 z-20 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-sm py-2.5 px-3 min-w-[130px] sm:min-w-[150px]">
                  <div>Phí GD Online</div>
                  <div className="text-[9px] font-semibold text-slate-400 normal-case">Đã gồm sở, chưa thuế</div>
                </th>

                {/* 4. Lãi Margin: Chuẩn 90 ngày vs Gói Deal ngắn hạn */}
                <th className="sticky top-0 z-20 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-sm py-2.5 px-3 min-w-[155px] sm:min-w-[185px]">
                  <div>Lãi Ký Quỹ Margin</div>
                  <div className="text-[9px] font-semibold text-slate-400 normal-case">Chuẩn 90 ngày vs Ngắn hạn Deal</div>
                </th>

                {/* 5. Key Points & Điểm Nổi Bật */}
                <th className="sticky top-0 z-20 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-sm py-2.5 px-3 min-w-[170px]">
                  <div>Key Points Nổi Bật</div>
                  <div className="text-[9px] font-semibold text-slate-400 normal-case">Huy hiệu điểm mạnh</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {companies.map((company) => {
                const isCompared = selectedForCompare.some((c) => c.id === company.id);
                const isBsc = company.id === 'bsc';
                const isZeroFee = company.tradingFee.onlineMin === 0 || company.tradingFee.zeroFeeOffer;
                const isLowMargin = (company.margin.shortTermRate || company.margin.promoRate) <= 8.5;

                return (
                  <tr
                    key={company.id}
                    className={`transition-colors group ${
                      isBsc
                        ? 'bg-blue-50/60 dark:bg-blue-950/40 ring-1 ring-blue-500/40'
                        : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {/* 1. Company info (Sticky column) */}
                    <td className={`sticky left-0 z-10 ${
                      isBsc
                        ? 'bg-blue-50/95 dark:bg-slate-850'
                        : 'bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800/90'
                    } transition-colors py-2 px-3 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]`}>
                      <div className="flex items-center gap-2">
                        {/* Avatar / Logo badge */}
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white font-black text-xs shadow-xs"
                          style={{ backgroundColor: company.brandColor }}
                        >
                          {company.shortName.slice(0, 3)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1 flex-wrap">
                            <button
                              onClick={() => onSelectDetail(company)}
                              className="font-extrabold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left truncate max-w-[95px]"
                              title="Bấm để xem chi tiết"
                            >
                              <HighlightText text={company.shortName} query={searchQuery} />
                            </button>
                            {isBsc && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-1.5 py-0.2 text-[8px] font-black shadow-xs">
                                Top Đề Xuất
                              </span>
                            )}
                            {company.isListed && company.stockCode ? (
                              <span 
                                className="rounded bg-blue-100 dark:bg-blue-950/80 px-1 py-0.2 text-[8px] font-black text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80"
                                title={`Mã chứng khoán: ${company.stockCode} - Niêm yết sàn ${company.listingExchange}`}
                              >
                                <HighlightText text={`${company.stockCode} : ${company.listingExchange}`} query={searchQuery} />
                              </span>
                            ) : (
                              <span 
                                className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.2 text-[8px] font-semibold text-slate-500 dark:text-slate-400"
                                title={company.listingStatus}
                              >
                                <HighlightText text={company.parentStockCode ? `Chưa NY (${company.parentStockCode})` : 'Chưa niêm yết'} query={searchQuery} />
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{company.marketShareRank}</span>
                            {company.bankBacked && (
                              <span className="truncate max-w-[85px]">| <HighlightText text={company.bankBacked} query={searchQuery} /></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Cột Hành Động: Đặt ngay cạnh Cột Tên Công Ty */}
                    <td className="py-2 px-2.5 border-r border-slate-100 dark:border-slate-800/80">
                      <div className="flex flex-col gap-1 min-w-[125px]">
                        {/* Open account CTA */}
                        <a
                          href={company.accountOpeningUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-[11px] font-extrabold shadow-xs transition-all ${
                            isBsc
                              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white hover:from-amber-600 hover:to-orange-600 ring-1 ring-amber-400/50 shadow-orange-500/20'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <span>{isBsc ? 'Mở TK BSC' : 'Mở Tài Khoản'}</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>

                        <div className="flex items-center gap-1 w-full">
                          {/* Detail button */}
                          <button
                            onClick={() => onSelectDetail(company)}
                            className="flex-1 rounded-md border border-slate-200 bg-white py-0.5 text-[10px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                            title="Xem chi tiết biểu phí, đòn bẩy và phân tích"
                          >
                            Chi Tiết
                          </button>

                          {/* Compare button */}
                          <button
                            onClick={() => toggleCompare(company)}
                            className={`rounded-md p-1 text-[10px] font-semibold transition-colors ${
                              isCompared
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                            title={isCompared ? 'Bỏ chọn so sánh' : 'Chọn so sánh đối đầu'}
                          >
                            {isCompared ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* 3. Phí GD Cơ Sở (Key Point) */}
                    <td className="py-2 px-3 whitespace-nowrap">
                      <div>
                        {company.tradingFee.onlineMin === 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-black text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/30">
                            <Sparkles className="h-3 w-3" />
                            <span>0% Zero-Fee</span>
                          </span>
                        ) : (
                          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                            {company.tradingFee.onlineMin}% – {company.tradingFee.onlineMax}%
                          </div>
                        )}
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                          Môi giới: {company.tradingFee.brokerMin}% – {company.tradingFee.brokerMax}%
                        </div>
                      </div>
                    </td>

                    {/* 4. Margin Rate: Phân biệt rõ Chuẩn 90 ngày vs Ngắn hạn Deal */}
                    <td className="py-2 px-3 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Chuẩn 90d:</span>
                          <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                            {company.margin.standardRate90d ? `${company.margin.standardRate90d}%/năm` : `${company.margin.baseRate}%/năm`}
                          </span>
                        </div>

                        <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-0.5 flex items-center gap-1">
                          <span>Ngắn hạn:</span>
                          <span className="font-extrabold">{company.margin.shortTermRate || company.margin.minRate}%</span>
                          <span className="text-slate-400 text-[9px]">({company.margin.shortTermTenor || 'Gói T+'})</span>
                        </div>

                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          {company.margin.isShortTermDealOnly && (
                            <span className="rounded bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.2 text-[9px] font-extrabold text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80" title="Mức lãi thấp chỉ áp dụng cho Deal 5–10 ngày, không áp dụng dài hạn">
                              Deal 5–10 ngày
                            </span>
                          )}
                          {company.margin.interestFreeDays > 0 && (
                            <span className="rounded bg-emerald-50 dark:bg-emerald-950/80 px-1.5 py-0.2 text-[9px] font-bold text-emerald-700 dark:text-emerald-300">
                              Miễn lãi T+{company.margin.interestFreeDays - 1}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 5. Key Points Nổi Bật Badges */}
                    <td className="py-2 px-3">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {isZeroFee && (
                          <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <Sparkles className="h-2.5 w-2.5" />
                            Zero-Fee
                          </span>
                        )}
                        {isLowMargin && (
                          <span className="inline-flex items-center gap-0.5 rounded-md bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            <TrendingDown className="h-2.5 w-2.5" />
                            Margin Rẻ
                          </span>
                        )}
                        {company.bankBacked && (
                          <span className="inline-flex items-center gap-0.5 rounded-md bg-indigo-50 px-1.5 py-0.5 text-[9px] font-bold text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                            <Shield className="h-2.5 w-2.5" />
                            Bank-Backed
                          </span>
                        )}
                        {company.margin.maxLeverage.includes('3:7') && (
                          <span className="inline-flex items-center gap-0.5 rounded-md bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            <Zap className="h-2.5 w-2.5" />
                            Đòn bẩy 3:7
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Bottom Note */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between gap-2 flex-wrap">
          <span>* <strong>Ghi chú:</strong> Phí giao dịch đã bao gồm phí Sở (0.027%) và chưa gồm thuế TNCN. <strong>Lãi suất tiêu chuẩn</strong> áp dụng cho kỳ hạn vay 90 ngày (QĐ 87/QĐ-UBCK); các mức lãi thấp (như DNSE 5.99%, VPS 8.6%) là sản phẩm Deal ngắn hạn (5–10 ngày). Xem thêm trong <strong>"Chi Tiết"</strong>.</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">Bấm "Chi Tiết" để xem đầy đủ biểu phí</span>
        </div>
      </div>
    </div>
  );
}
