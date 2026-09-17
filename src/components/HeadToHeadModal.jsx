import React from 'react';
import { X, Check, ArrowUpRight, Award, Building2, Sparkles, AlertCircle } from 'lucide-react';

export default function HeadToHeadModal({
  isOpen,
  onClose,
  companies,
  onRemoveCompany
}) {
  if (!isOpen || companies.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Đối chiếu trực diện
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              So Sánh Đối Đầu ({companies.length} CTCK)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Comparison Grid Table */}
        <div className="mt-6 overflow-x-auto max-h-[65vh] overflow-y-auto relative scroll-smooth rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="sticky top-0 z-20">
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="sticky left-0 top-0 z-30 py-4 px-4 w-44 font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  Tiêu Chí So Sánh
                </th>
                {companies.map((company) => (
                  <th
                    key={company.id}
                    className="sticky top-0 z-20 py-4 px-4 min-w-[240px] text-center bg-slate-50/95 dark:bg-slate-850/95 backdrop-blur-sm shadow-sm"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative mb-2">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white font-extrabold text-base shadow-md"
                          style={{ backgroundColor: company.brandColor }}
                        >
                          {(company.shortName || '').slice(0, 3)}
                        </div>
                        {companies.length > 2 && (
                          <button
                            onClick={() => onRemoveCompany(company.id)}
                            className="absolute -top-1 -right-1 rounded-full bg-slate-200 p-0.5 text-slate-600 hover:bg-red-500 hover:text-white dark:bg-slate-700 dark:text-slate-300"
                            title="Bỏ công ty này"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                        {company.shortName}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {company.marketShareRank}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Row 1: Cổ phiếu & Ngân hàng */}
              <tr>
                <td className="sticky left-0 z-10 py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  Hệ sinh thái & Mã CK
                </td>
                {companies.map((c) => (
                  <td key={c.id} className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      {c.isListed && c.stockCode ? (
                        <span className="rounded bg-blue-100 dark:bg-blue-950 px-2 py-0.5 text-xs font-black text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {c.stockCode} ({c.listingExchange})
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {c.listingStatus || 'Chưa niêm yết'}
                        </span>
                      )}
                      {c.bankBacked && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          <Building2 className="h-3 w-3" />
                          {c.bankBacked}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 2: Phí GD Online */}
              <tr>
                <td className="sticky left-0 z-10 py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  Phí GD Tự giao dịch
                </td>
                {companies.map((c) => (
                  <td key={c.id} className="py-3 px-4 text-center">
                    {c.tradingFee.onlineMin === 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        0% Zero-Fee
                      </span>
                    ) : (
                      <span className="font-bold text-slate-900 dark:text-white">
                        {c.tradingFee.onlineMin}% - {c.tradingFee.onlineMax}%
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row 3a: Lãi Suất Tiêu Chuẩn 90 Ngày */}
              <tr>
                <td className="sticky left-0 z-10 py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  <div>Lãi Chuẩn (90 Ngày)</div>
                  <div className="text-[10px] font-normal text-slate-400">Kỳ hạn cơ bản UBCK</div>
                </td>
                {companies.map((c) => (
                  <td key={c.id} className="py-3 px-4 text-center">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">
                      {c.margin.standardRateDisplay || `${c.margin.standardRate90d || c.margin.baseRate}%/năm`}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Trung vị: {c.margin.medianRate || c.margin.baseRate}%/năm
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 3b: Gói Lãi Ngắn Hạn Deal T+ */}
              <tr>
                <td className="sticky left-0 z-10 py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  <div>Gói Ngắn Hạn (Deal / T+)</div>
                  <div className="text-[10px] font-normal text-slate-400">Lướt sóng ngắn ngày</div>
                </td>
                {companies.map((c) => (
                  <td key={c.id} className="py-3 px-4 text-center">
                    <div className="text-sm font-black text-blue-600 dark:text-blue-400">
                      {c.margin.shortTermDisplay || `Từ ${c.margin.shortTermRate || c.margin.minRate}%/năm`}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {c.margin.shortTermTenor || 'Gói T+'}
                    </div>
                    {c.margin.isShortTermDealOnly && (
                      <span className="mt-1 inline-block rounded bg-amber-100 dark:bg-amber-950 px-1.5 py-0.2 text-[9px] font-extrabold text-amber-800 dark:text-amber-300">
                        Deal 5–10 ngày
                      </span>
                    )}
                    {c.margin.interestFreeDays > 0 && (
                      <div className="mt-0.5 text-[10px] font-bold text-emerald-600">
                        Miễn lãi T+{c.margin.interestFreeDays - 1}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row 4: Đòn bẩy tối đa */}
              <tr>
                <td className="sticky left-0 z-10 py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  Đòn bẩy & Tỷ lệ vay
                </td>
                {companies.map((c) => (
                  <td key={c.id} className="py-3 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                    {c.margin.maxLeverage}
                  </td>
                ))}
              </tr>

              {/* Row 5: Phí phái sinh */}
              <tr>
                <td className="sticky left-0 z-10 py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  Phí giao dịch Phái sinh
                </td>
                {companies.map((c) => (
                  <td key={c.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300 font-medium">
                    {c.derivativesFee.feePerContract === 0
                      ? '0 đ/HĐ'
                      : `${c.derivativesFee.feePerContract.toLocaleString('vi-VN')} đ/HĐ`}
                  </td>
                ))}
              </tr>

              {/* Row 6: Ưu điểm nổi bật */}
              <tr>
                <td className="sticky left-0 z-10 py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)] align-top">
                  Điểm mạnh nổi bật
                </td>
                {companies.map((c) => (
                  <td key={c.id} className="py-3 px-4 align-top">
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {(c.pros || []).slice(0, 3).map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row 7: Điểm lưu ý */}
              <tr>
                <td className="sticky left-0 z-10 py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)] align-top">
                  Điểm cần lưu ý
                </td>
                {companies.map((c) => (
                  <td key={c.id} className="py-3 px-4 align-top">
                    <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      {(c.cons || []).map((con, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row 8: Đối tượng phù hợp */}
              <tr>
                <td className="sticky left-0 z-10 py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  Phù hợp nhất với
                </td>
                {companies.map((c) => (
                  <td key={c.id} className="py-3 px-4 text-center text-xs text-slate-600 dark:text-slate-300">
                    {c.suitableFor}
                  </td>
                ))}
              </tr>

              {/* Row 9: Link mở tài khoản CTA */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="sticky left-0 z-10 py-4 px-4 font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 rounded-bl-xl shadow-[2px_0_6px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.5)]">
                  Mở tài khoản eKYC
                </td>
                {companies.map((c) => {
                  const isBsc = c.id === 'bsc' || c.isRecommended;
                  return (
                    <td key={c.id} className="py-4 px-4 text-center">
                      <a
                        href={c.accountOpeningUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm transition-all ${
                          isBsc
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-extrabold shadow-blue-500/25 ring-2 ring-blue-400/40'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/15'
                        }`}
                      >
                        <span>{isBsc ? 'Mở TK BSC (Ưu Đãi)' : `Mở TK ${c.shortName}`}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
