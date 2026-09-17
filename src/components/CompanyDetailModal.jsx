import React, { useState } from 'react';
import { 
  X, 
  ArrowUpRight, 
  Check, 
  AlertCircle, 
  Building2, 
  Award, 
  Sparkles, 
  CheckCircle2,
  DollarSign,
  TrendingDown,
  ShieldCheck, 
  Layers,
  ExternalLink
} from 'lucide-react';

export default function CompanyDetailModal({ company, onClose }) {
  if (!company) return null;

  const [activeTab, setActiveTab] = useState('fee_margin');
  const isBsc = company.id === 'bsc' || company.isRecommended;

  const tabs = [
    { id: 'fee_margin', label: 'Biểu Phí & Margin', icon: DollarSign },
    { id: 'promotions', label: 'Ưu Đãi Hiện Hành', icon: Sparkles },
    { id: 'analysis', label: 'Đánh Giá & Phù Hợp', icon: CheckCircle2 },
    { id: 'open_account', label: 'Hướng Dẫn Mở TK', icon: ArrowUpRight },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-t-3xl sm:rounded-3xl bg-white p-4 sm:p-7 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800 max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors z-10"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Company Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-start sm:items-center gap-3.5 min-w-0 pr-8 sm:pr-0">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white font-extrabold text-xl shadow-md"
              style={{ backgroundColor: company.brandColor }}
            >
              {(company.shortName || '').slice(0, 3)}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {company.shortName}
                </h2>
                {company.isListed && company.stockCode ? (
                  <span className="rounded-md bg-blue-100 dark:bg-blue-950 px-2 py-0.5 text-xs font-black text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Mã: {company.stockCode} ({company.listingExchange})
                  </span>
                ) : (
                  <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-bold text-slate-600 dark:text-slate-400">
                    {company.listingStatus || 'Chưa niêm yết'}
                  </span>
                )}
                <a
                  href="https://congbothongtin.ssc.gov.vn/faces/CompanyProfilesSearch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                  title="Kiểm tra thông tin công ty niêm yết & công ty đại chúng tại Cổng thông tin UBCKNN (SSC)"
                >
                  <span>Hồ sơ UBCKNN</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
                {isBsc && (
                  <span className="rounded bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[10px] font-black text-white uppercase tracking-wider shadow-xs">
                    ⭐ Lựa Chọn Tối Ưu
                  </span>
                )}
                {company.bankBacked && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    <Building2 className="h-3 w-3" />
                    Trực thuộc {company.bankBacked}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium truncate mt-0.5">
                {company.name}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Award className="h-3 w-3" />
                  {company.marketShareRank}
                </span>
                <span>•</span>
                <span>Năm TL: {company.establishedYear}</span>
                <span>•</span>
                <span>Cập nhật: {company.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Quick CTA Button on Header */}
          <div className="shrink-0 flex items-center gap-2 self-start sm:self-center">
            <a
              href={company.accountOpeningUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black shadow-xs transition-all ${
                isBsc
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-orange-500/20 ring-1 ring-amber-400/60'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <span>{isBsc ? 'Mở TK BSC' : 'Mở Tài Khoản'}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 mt-3 overflow-x-auto shrink-0 pb-1 scrollbar-none">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 ring-1 ring-blue-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents Container (Scrollable) */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1 space-y-4">
          {/* TAB 1: BIỂU PHÍ & MARGIN */}
          {activeTab === 'fee_margin' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Trading Fee Box */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Phí Giao Dịch Cổ Phiếu
                    </span>
                    {company.tradingFee.onlineMin === 0 && (
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Zero-Fee
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    {company.tradingFee.onlineMin === 0 ? (
                      <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="h-5 w-5" />
                        <span>0% Miễn Phí Trực Tuyến</span>
                      </div>
                    ) : (
                      <div className="text-xl font-black text-slate-900 dark:text-white">
                        {company.tradingFee.onlineMin}% – {company.tradingFee.onlineMax}%
                      </div>
                    )}
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {company.tradingFee.notes}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Qua nhân viên môi giới:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {company.tradingFee.brokerMin}% – {company.tradingFee.brokerMax}%
                    </span>
                  </div>
                </div>

                {/* Margin Loan Box with explicit distinction between 90-day standard vs short-term deal */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Lãi Suất Ký Quỹ Margin
                    </span>
                    <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-full">
                      Phân biệt Chuẩn 90 ngày vs Ngắn hạn
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Block A: Standard 90-day package */}
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          📅 Gói Tiêu Chuẩn (90 Ngày)
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold">Chuẩn UBCK</span>
                      </div>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                          {company.margin.standardRateDisplay || `${company.margin.standardRate90d || company.margin.baseRate}%/năm`}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                        Kỳ hạn chuẩn 90 ngày (gia hạn tối đa thêm 90 ngày). Áp dụng cho danh mục nắm giữ trung - dài hạn.
                      </p>
                    </div>

                    {/* Block B: Short-term deal package */}
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400">
                          ⚡ Gói Ngắn Hạn (Deal / T+)
                        </span>
                        {company.margin.isShortTermDealOnly && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-1 py-0.2 rounded font-bold">
                            Deal 5–10 ngày
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                          {company.margin.shortTermDisplay || `Từ ${company.margin.shortTermRate || company.margin.minRate}%/năm`}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                        {company.margin.shortTermTenor || 'Gói lướt sóng ngắn hạn T+'}. {company.margin.interestFreeDays > 0 ? `Miễn lãi T+${company.margin.interestFreeDays - 1}.` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Notes & Regulatory limits */}
                  <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300">
                    <p className="text-[11px] leading-relaxed">
                      💡 <strong>Quy định & Chú thích:</strong> {company.margin.notes}
                    </p>
                    <div className="mt-2 flex justify-between items-center text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Đòn bẩy tối đa:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {company.margin.maxLeverage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Derivatives & Fee Breakdown Details */}
              <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/40 dark:border-slate-700 dark:bg-slate-800/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-blue-500" />
                  <span>Phí Giao Dịch Phái Sinh & Dịch Vụ</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Phí giao dịch HĐTL:</span>
                    <span className="font-black text-slate-900 dark:text-white">
                      {company.derivativesFee.feePerContract === 0 ? '0 đ' : `${company.derivativesFee.feePerContract.toLocaleString('vi-VN')} đ/HĐ`}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Quy định tỷ lệ ký quỹ:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Tuân thủ chuẩn UBCK & VSDC</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  {company.derivativesFee.notes}
                </p>
              </div>

              {/* Disclaimer Notice */}
              <div className="rounded-xl bg-blue-50/60 p-3 text-xs text-blue-900 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold">Lưu ý biểu phí & thuế: </span>
                  <span>Thông tin về mức phí giao dịch đã bao gồm phí trả sở và chưa bao gồm thuế TNCN (0.1% khi bán) theo quy định của Bộ Tài chính.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ƯU ĐÃI & KHUYẾN MÃI */}
          {activeTab === 'promotions' && (
            <div className="space-y-4">
              {company.welcomePromo && (
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30 p-4 border border-blue-200 dark:border-blue-800/60">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[11px] font-black text-white uppercase tracking-wider">
                      {company.welcomePromo.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Dành riêng cho khách hàng mở tài khoản mới
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-3">
                    <div className="rounded-xl bg-white dark:bg-slate-800 p-3 border border-slate-100 dark:border-slate-700">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Ưu đãi phí:</span>
                      <strong className="text-slate-900 dark:text-white text-xs mt-0.5 block">{company.welcomePromo.feeOffer}</strong>
                    </div>
                    <div className="rounded-xl bg-white dark:bg-slate-800 p-3 border border-slate-100 dark:border-slate-700">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Ưu đãi Margin:</span>
                      <strong className="text-slate-900 dark:text-white text-xs mt-0.5 block">{company.welcomePromo.marginOffer}</strong>
                    </div>
                  </div>
                  {company.welcomePromo.giftBonus && (
                    <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                      <span><strong>Quà tặng đi kèm:</strong> {company.welcomePromo.giftBonus}</span>
                    </div>
                  )}
                  {company.welcomePromo.note && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic">
                      * {company.welcomePromo.note}
                    </p>
                  )}
                </div>
              )}

              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  <span>Chương Trình Ưu Đãi Đang Áp Dụng</span>
                </h3>
                <ul className="space-y-2">
                  {(company.promotions || []).map((promo, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60"
                    >
                      <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <span className="font-medium leading-relaxed">{promo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: ĐÁNH GIÁ & PHÙ HỢP */}
          {activeTab === 'analysis' && (
            <div className="space-y-4">
              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pros */}
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                  <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Ưu Điểm Nổi Bật</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {(company.pros || []).map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-emerald-500 font-bold shrink-0">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="rounded-2xl border border-amber-100 bg-amber-50/30 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                  <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span>Điểm Cần Lưu Ý</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {(company.cons || []).map((con, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-amber-500 font-bold shrink-0">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suitable For */}
              <div className="rounded-2xl bg-blue-50/60 p-4 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 text-xs">
                <span className="font-extrabold text-slate-900 dark:text-white block mb-1">Khuyến nghị nhà đầu tư phù hợp:</span>
                <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{company.suitableFor}</span>
              </div>

              {/* Company Background Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Thị phần</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 block">{company.marketShareRank}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Thành lập</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 block">Năm {company.establishedYear}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Bảo chứng</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 block">{company.bankBacked || 'Độc lập'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Tình trạng niêm yết</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 block truncate" title={company.listingStatus}>
                    {company.isListed ? `${company.stockCode} (${company.listingExchange})` : company.listingStatus}
                  </span>
                </div>
              </div>

              {/* Official SSC Verification Portal Callout */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/80 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start sm:items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
                  <span>
                    Thông tin công ty niêm yết & hồ sơ công ty đại chúng được quản lý và công bố chính thức tại <strong>Cổng thông tin UBCKNN (SSC)</strong>.
                  </span>
                </div>
                <a
                  href="https://congbothongtin.ssc.gov.vn/faces/CompanyProfilesSearch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-slate-200 dark:border-slate-700 shadow-xs transition-all"
                >
                  <span>Tra cứu hồ sơ SSC</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: HƯỚNG DẪN MỞ TÀI KHOẢN */}
          {activeTab === 'open_account' && (
            <div className="space-y-4">
              <div className={`rounded-2xl p-5 text-white ${
                isBsc
                  ? 'bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 ring-2 ring-blue-400/80 shadow-lg'
                  : 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      {isBsc ? '⭐ Đề Xuất An Toàn Big4 BIDV' : 'Mở tài khoản 100% Trực Tuyến'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black mt-2">Mở Tài Khoản {company.shortName} Trong 3 Phút</h3>
                    <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                      {isBsc
                        ? 'Đăng ký qua liên kết chuyên gia BIDV/BSC để kích hoạt mức phí ưu đãi 0.08% - 0.10% và gói Margin từ 7.5%/năm.'
                        : 'Chuẩn bị CCCD gắn chip và điện thoại thông minh để hoàn tất định danh eKYC tức thì.'}
                    </p>
                  </div>

                  <a
                    href={company.accountOpeningUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-black shadow-md hover:scale-105 transition-transform shrink-0 ${
                      isBsc 
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black ring-2 ring-amber-300' 
                        : 'bg-white text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    <span>{isBsc ? 'Mở TK BSC Nhận Ưu Đãi' : 'Vào Cổng eKYC Ngay'}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-center text-xs text-blue-100">
                  <div className="rounded-lg bg-white/10 p-2">
                    <span className="font-black text-white block">Bước 1</span>
                    <span className="text-[11px]">Điền SĐT & CCCD</span>
                  </div>
                  <div className="rounded-lg bg-white/10 p-2">
                    <span className="font-black text-white block">Bước 2</span>
                    <span className="text-[11px]">Xác thực khuôn mặt</span>
                  </div>
                  <div className="rounded-lg bg-white/10 p-2">
                    <span className="font-black text-white block">Bước 3</span>
                    <span className="text-[11px]">Ký hợp đồng online</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/90 text-xs text-slate-700 dark:text-slate-200 space-y-1.5 font-medium">
                <span className="font-bold text-slate-800 dark:text-white block">Lưu ý khi mở tài khoản eKYC:</span>
                <p>• Sử dụng CCCD gắn chip chính chủ còn hạn sử dụng, chụp ở nơi đủ ánh sáng và không bị lóa.</p>
                <p>• Sau khi hoàn tất eKYC, tài khoản sẽ được kích hoạt giao dịch ngay trong ngày làm việc.</p>
                {isBsc && (
                  <p className="text-blue-700 dark:text-amber-300 font-bold">• Mã giới thiệu CIF BSC: <code className="bg-blue-100 dark:bg-blue-900/80 px-1.5 py-0.5 rounded text-blue-900 dark:text-blue-100">4768</code> được tích hợp sẵn qua liên kết mở tài khoản.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Sticky Bottom Action Bar */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex sm:hidden items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Đóng
          </button>
          <a
            href={company.accountOpeningUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 py-2 rounded-xl text-xs font-black text-white text-center flex items-center justify-center gap-1 shadow-sm ${
              isBsc
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-blue-600 text-white'
            }`}
          >
            <span>{isBsc ? 'Mở TK BSC (CIF 4768)' : 'Mở Tài Khoản'}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
