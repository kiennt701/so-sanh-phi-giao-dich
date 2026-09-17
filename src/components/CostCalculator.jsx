import React, { useState, useMemo } from 'react';
import { SECURITIES_COMPANIES } from '../data/securitiesData';
import { 
  rankCompaniesByCost, 
  formatCurrency, 
  getLowestFeeCompany, 
  getLowestInterestCompany, 
  sortCompaniesByCriterion 
} from '../utils/calculator';
import { 
  Calculator, 
  Sparkles, 
  ArrowUpRight, 
  SlidersHorizontal,
  Info,
  Award,
  Percent,
  TrendingDown
} from 'lucide-react';

export default function CostCalculator({ onSelectDetail, onSwitchToPromoTab }) {
  // Simulator input state - Default to standard existing client rates
  const [tradingVolume, setTradingVolume] = useState(200_000_000); // 200 triệu
  const [marginLoan, setMarginLoan] = useState(100_000_000); // 100 triệu
  const [borrowDays, setBorrowDays] = useState(20); // 20 ngày / tháng
  const [isNewAccount, setIsNewAccount] = useState(false); // Default to false (Khách hàng hiện hữu)
  const [displayCount, setDisplayCount] = useState(10); // Hiển thị 10 công ty mặc định

  // Quick preset buttons for trading volume
  const volumePresets = [
    { label: '50 tr', value: 50_000_000 },
    { label: '200 tr', value: 200_000_000 },
    { label: '500 tr', value: 500_000_000 },
    { label: '1 tỷ', value: 1_000_000_000 },
    { label: '3 tỷ', value: 3_000_000_000 },
  ];

  // Quick presets for margin loan
  const marginPresets = [
    { label: '0 đ (Không vay)', value: 0 },
    { label: '50 tr', value: 50_000_000 },
    { label: '200 tr', value: 200_000_000 },
    { label: '500 tr', value: 500_000_000 },
    { label: '1 tỷ', value: 1_000_000_000 },
  ];

  // Active banner tab: 'lowest_total' (Tiết kiệm nhất) | 'lowest_fee' (Phí thấp nhất) | 'lowest_interest' (Lãi thấp nhất)
  const [activeCriterion, setActiveCriterion] = useState('lowest_total');

  // Margin Package Type: 'standard_90d' (Tiêu chuẩn 90 ngày) | 'short_term' (Gói deal ngắn hạn T+)
  const [marginPackageType, setMarginPackageType] = useState('standard_90d');

  // Calculate results based on user inputs
  const rankedResults = useMemo(() => {
    return rankCompaniesByCost(SECURITIES_COMPANIES, {
      monthlyTradingVolume: tradingVolume,
      marginLoanAmount: marginLoan,
      marginBorrowDays: borrowDays,
      isNewAccount: isNewAccount,
      marginPackageType: marginPackageType,
    });
  }, [tradingVolume, marginLoan, borrowDays, isNewAccount, marginPackageType]);

  // 1. Best overall (lowest total monthly cost)
  const bestOverall = rankedResults[0];

  // 2. Lowest trading fee option
  const lowestFeeOption = useMemo(() => {
    return getLowestFeeCompany(rankedResults);
  }, [rankedResults]);

  // 3. Lowest margin interest option
  const lowestInterestOption = useMemo(() => {
    return getLowestInterestCompany(rankedResults, marginLoan);
  }, [rankedResults, marginLoan]);

  // Sorted list based on active criterion
  const sortedResults = useMemo(() => {
    return sortCompaniesByCriterion(rankedResults, activeCriterion, marginLoan);
  }, [rankedResults, activeCriterion, marginLoan]);

  // Sliced for table display
  const displayedResults = useMemo(() => {
    return sortedResults.slice(0, displayCount);
  }, [sortedResults, displayCount]);

  // Active banner configuration
  const currentBannerConfig = useMemo(() => {
    switch (activeCriterion) {
      case 'lowest_fee':
        return {
          id: 'lowest_fee',
          badge: '💎 Lựa chọn phí thấp nhất',
          company: lowestFeeOption,
          gradient: 'from-blue-600 to-cyan-600 shadow-blue-500/15',
          btnText: 'text-blue-700 hover:bg-blue-50',
          metricMain: lowestFeeOption?.isZeroFeeApplied
            ? '0 đ (Miễn phí 0%)'
            : `${formatCurrency(lowestFeeOption?.monthlyTradingFee)}/tháng`,
          metricSub: `Phí GD: ${lowestFeeOption?.effectiveFeeRate}% • Tổng: ${formatCurrency(lowestFeeOption?.totalMonthlyCost)}/tháng`,
          description: lowestFeeOption?.isZeroFeeApplied
            ? 'Chính sách Zero-Fee miễn 100% phí giao dịch chứng khoán cơ sở'
            : `Mức phí giao dịch trực tuyến cạnh tranh nhất thị trường (${lowestFeeOption?.effectiveFeeRate}%)`,
        };
      case 'lowest_interest':
        return {
          id: 'lowest_interest',
          badge: '📉 Lựa chọn lãi thấp nhất',
          company: lowestInterestOption,
          gradient: 'from-indigo-600 to-purple-600 shadow-indigo-500/15',
          btnText: 'text-indigo-700 hover:bg-indigo-50',
          metricMain: `${lowestInterestOption?.effectiveMarginRate}%/năm`,
          metricSub: marginLoan > 0
            ? `Tiền lãi: ${formatCurrency(lowestInterestOption?.monthlyMarginInterest)}/tháng (${marginPackageType === 'standard_90d' ? 'Chuẩn 90 ngày' : 'Gói Deal T+'})`
            : `Lãi suất: ${lowestInterestOption?.effectiveMarginRate}%/năm (${marginPackageType === 'standard_90d' ? 'Chuẩn 90 ngày' : 'Gói Deal T+'})`,
          description: marginPackageType === 'standard_90d'
            ? `Lãi suất ký quỹ tiêu chuẩn 90 ngày tối ưu nhất (${lowestInterestOption?.effectiveMarginRate}%/năm)`
            : `Gói lãi suất deal ngắn hạn T+ cạnh tranh nhất (${lowestInterestOption?.effectiveMarginRate}%/năm)`,
        };
      case 'lowest_total':
      default:
        return {
          id: 'lowest_total',
          badge: '🏆 Lựa chọn tiết kiệm nhất',
          company: bestOverall,
          gradient: 'from-emerald-600 to-teal-600 shadow-emerald-500/15',
          btnText: 'text-emerald-700 hover:bg-emerald-50',
          metricMain: `${formatCurrency(bestOverall?.totalMonthlyCost)}/tháng`,
          metricSub: bestOverall?.annualSavings > 0
            ? `Tiết kiệm đến ${formatCurrency(bestOverall?.annualSavings)}/năm so với thị trường`
            : `Phí GD: ${formatCurrency(bestOverall?.monthlyTradingFee)} • Lãi vay: ${formatCurrency(bestOverall?.monthlyMarginInterest)}`,
          description: 'Tổng chi phí giao dịch và lãi vay margin tối ưu nhất',
        };
    }
  }, [activeCriterion, bestOverall, lowestFeeOption, lowestInterestOption, marginLoan]);

  // Handle clicking company row/name to view detail
  const handleCompanyClick = (companyId) => {
    if (!onSelectDetail) return;
    const fullCompany = SECURITIES_COMPANIES.find((c) => c.id === companyId);
    if (fullCompany) {
      onSelectDetail(fullCompany);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3.5 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 mb-1.5">
            <Calculator className="h-3.5 w-3.5" />
            <span>Mô Phỏng Chi Phí Thực Tế</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Công Cụ Tính Toán & So Sánh Chi Phí
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-normal">
            Nhập giá trị giao dịch và số tiền vay Margin của bạn để tính toán chi phí thực hiện giao dịch thực tế trong 30 CTCK hàng đầu. <span className="font-semibold text-slate-700 dark:text-slate-300">* Thông tin về mức phí giao dịch đã bao gồm phí trả sở và chưa bao gồm thuế.</span>
          </p>
        </div>

        {/* Existing Client vs Welcome Promo Toggle & Quick Link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setIsNewAccount(false)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                !isNewAccount
                  ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              📋 Khách hiện hữu (Chuẩn)
            </button>
            <button
              onClick={() => setIsNewAccount(true)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                isNewAccount
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              🎁 Thử ưu đãi mở mới
            </button>
          </div>

          {onSwitchToPromoTab && (
            <button
              onClick={onSwitchToPromoTab}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline px-1 py-0.5"
            >
              <span>Xem 30 deal mở mới</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Simulator Inputs & Result Grid */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Left column: Input controls (5 cols) */}
        <div className="lg:col-span-5 space-y-3 sm:space-y-3.5">
          {/* Input 1: Monthly Trading Volume */}
          <div className="space-y-1.5 bg-slate-50/80 dark:bg-slate-850/60 p-3 sm:p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Giá trị giao dịch cổ phiếu / tháng
              </label>
              <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                {formatCurrency(tradingVolume)}
              </span>
            </div>

            <input
              type="range"
              min={10_000_000}
              max={5_000_000_000}
              step={10_000_000}
              value={tradingVolume}
              onChange={(e) => setTradingVolume(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:bg-slate-700"
            />

            <div className="flex flex-wrap gap-1 pt-0.5">
              {volumePresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setTradingVolume(preset.value)}
                  className={`rounded-lg px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                    tradingVolume === preset.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input 2: Margin Loan Balance */}
          <div className="space-y-1.5 bg-slate-50/80 dark:bg-slate-850/60 p-3 sm:p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Dư nợ vay Margin bình quân
              </label>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(marginLoan)}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={2_000_000_000}
              step={10_000_000}
              value={marginLoan}
              onChange={(e) => setMarginLoan(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:bg-slate-700"
            />

            <div className="flex flex-wrap gap-1 pt-0.5">
              {marginPresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setMarginLoan(preset.value)}
                  className={`rounded-lg px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                    marginLoan === preset.value
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Margin Package Type Selector: Standard 90-day vs Short-term Deal */}
          <div className="bg-slate-50/80 dark:bg-slate-850/60 p-3 sm:p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Gói Lãi Suất Ký Quỹ Áp Dụng
              </label>
              <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400">
                {marginPackageType === 'standard_90d' ? 'Chuẩn 90 ngày' : 'Deal T+ ngắn hạn'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setMarginPackageType('standard_90d')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
                  marginPackageType === 'standard_90d'
                    ? 'bg-white text-indigo-700 dark:bg-slate-700 dark:text-indigo-300 shadow-xs ring-1 ring-black/5'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <span>📅 Tiêu Chuẩn 90 Ngày</span>
                <span className="text-[9px] font-normal text-slate-500 dark:text-slate-400">Duy trì sóng trung hạn</span>
              </button>
              <button
                type="button"
                onClick={() => setMarginPackageType('short_term')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
                  marginPackageType === 'short_term'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <span>⚡ Ngắn Hạn Deal (T+)</span>
                <span className={`text-[9px] font-normal ${marginPackageType === 'short_term' ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>Lướt sóng 5–10 ngày</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
              {marginPackageType === 'standard_90d' 
                ? 'ℹ️ Gói tiêu chuẩn 90 ngày phản ánh chi phí duy trì thực tế: BSC (10.0% - 12.0%), DNSE (11.5% - 12.5%), VPS (13.5% - 14.0%).' 
                : '⚡ Lãi thấp tại DNSE (5.99%), VPS (8.6%) chỉ áp dụng cho Deal nắm giữ ngắn (5–10 ngày). Quá hạn sẽ chuyển về lãi chuẩn.'}
            </p>
          </div>

          {/* Input 3: Days Borrowed */}
          <div className="space-y-1.5 bg-slate-50/80 dark:bg-slate-850/60 p-3 sm:p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Số ngày vay Margin trong tháng
              </label>
              <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                {borrowDays} ngày
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={borrowDays}
              onChange={(e) => setBorrowDays(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600 dark:bg-slate-700"
            />

            <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
              <span>Lướt T+ ngắn (5 ngày)</span>
              <span>Nửa tháng (15 ngày)</span>
              <span>Trọn tháng (30 ngày)</span>
            </div>
          </div>

          {/* Strategy Hint */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 p-3 border border-blue-100 dark:from-blue-950/30 dark:to-indigo-950/20 dark:border-blue-900/40">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-300">
              <Sparkles className="h-3.5 w-3.5 text-blue-500 shrink-0" />
              <span>Gợi ý chiến lược tối ưu:</span>
            </div>
            <p className="mt-1 text-[11px] text-blue-800/85 dark:text-blue-300/85 leading-relaxed">
              Nếu bạn có giá trị giao dịch lớn và nắm giữ margin ngắn ngày (T+), việc chọn các công ty có chính sách <strong>Zero-Fee</strong> (như TCBS, DNSE) hoặc <strong>Lãi Margin ưu đãi theo deal T+</strong> (như BSC, Kafi, VPS) sẽ giúp tiết kiệm từ vài triệu đến hàng chục triệu đồng mỗi tháng.
            </p>
          </div>

          {/* Strategic BSC Fee & Margin Optimization Spotlight Card */}
          <div className="rounded-2xl border-2 border-blue-500/80 bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white dark:from-blue-950/50 dark:via-slate-900 dark:to-slate-900 p-3.5 shadow-md">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-2 py-0.5 text-[11px] font-black text-white shadow-xs">
                <Sparkles className="h-3 w-3 text-amber-300" />
                ⭐ Đề Xuất Toàn Diện: BSC (BIDV)
              </span>
              <span className="text-[10px] font-extrabold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                Hana Securities
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Sự kết hợp hoàn hảo giữa <strong>an toàn Big4 ngân hàng</strong> và <strong>tối ưu kép cả phí giao dịch lẫn lãi Margin</strong>:
            </p>

            <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-white/80 dark:bg-slate-800/80 p-2 border border-blue-100 dark:border-blue-900/40">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Phí GD Online</div>
                <div className="text-xs font-black text-blue-700 dark:text-blue-300">0.10% – 0.13%</div>
                <div className="text-[9px] text-slate-400 mt-0.5">Tiết kiệm 30-50% vs Top 1</div>
              </div>

              <div className="rounded-xl bg-white/80 dark:bg-slate-800/80 p-2 border border-blue-100 dark:border-blue-900/40">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Lãi Vay Margin T+</div>
                <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">Từ 7.5% – 8.5%/năm</div>
                <div className="text-[9px] text-slate-400 mt-0.5">Trung vị 10.0%/năm</div>
              </div>
            </div>

            <a
              href="https://dangky.bsc.com.vn/moi-gioi?online=false&cif=4768"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-2 text-xs font-extrabold text-white shadow-md transition-all"
            >
              <span>Mở Tài Khoản BSC Nhận Ưu Đãi Phí & Lãi</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Right column: Results & Ranking (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* 3 Interactive Banner Criterion Switcher Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Button 1: Tiết kiệm nhất */}
            <button
              type="button"
              onClick={() => setActiveCriterion('lowest_total')}
              className={`group relative flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border text-left transition-all ${
                activeCriterion === 'lowest_total'
                  ? 'bg-emerald-50/90 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20 dark:bg-emerald-950/40 dark:border-emerald-500'
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 dark:bg-slate-850 dark:border-slate-800 dark:hover:bg-slate-800'
              }`}
            >
              <div className="min-w-0 pr-1.5">
                <div className="flex items-center gap-1 text-[11px] font-black text-emerald-700 dark:text-emerald-400">
                  <Award className="h-3 w-3 shrink-0" />
                  <span className="truncate">🏆 Tiết kiệm nhất</span>
                </div>
                <div className="mt-0.5 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                  {bestOverall?.companyName}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  Tổng: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{formatCurrency(bestOverall?.totalMonthlyCost)}</strong>
                </div>
              </div>
              <div className={`shrink-0 w-2 h-2 rounded-full transition-colors ${activeCriterion === 'lowest_total' ? 'bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-900/50' : 'bg-slate-200 dark:bg-slate-700'}`} />
            </button>

            {/* Button 2: Phí thấp nhất */}
            <button
              type="button"
              onClick={() => setActiveCriterion('lowest_fee')}
              className={`group relative flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border text-left transition-all ${
                activeCriterion === 'lowest_fee'
                  ? 'bg-blue-50/90 border-blue-500 shadow-xs ring-2 ring-blue-500/20 dark:bg-blue-950/40 dark:border-blue-500'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/80 dark:bg-slate-850 dark:border-slate-800 dark:hover:bg-slate-800'
              }`}
            >
              <div className="min-w-0 pr-1.5">
                <div className="flex items-center gap-1 text-[11px] font-black text-blue-700 dark:text-blue-400">
                  <Percent className="h-3 w-3 shrink-0" />
                  <span className="truncate">💎 Phí thấp nhất</span>
                </div>
                <div className="mt-0.5 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                  {lowestFeeOption?.companyName}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  Phí: <strong className="text-blue-600 dark:text-blue-400 font-bold">{lowestFeeOption?.isZeroFeeApplied ? '0 đ (0%)' : `${lowestFeeOption?.effectiveFeeRate}%`}</strong>
                </div>
              </div>
              <div className={`shrink-0 w-2 h-2 rounded-full transition-colors ${activeCriterion === 'lowest_fee' ? 'bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/50' : 'bg-slate-200 dark:bg-slate-700'}`} />
            </button>

            {/* Button 3: Lãi thấp nhất */}
            <button
              type="button"
              onClick={() => setActiveCriterion('lowest_interest')}
              className={`group relative flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border text-left transition-all ${
                activeCriterion === 'lowest_interest'
                  ? 'bg-indigo-50/90 border-indigo-500 shadow-xs ring-2 ring-indigo-500/20 dark:bg-indigo-950/40 dark:border-indigo-500'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50/80 dark:bg-slate-850 dark:border-slate-800 dark:hover:bg-slate-800'
              }`}
            >
              <div className="min-w-0 pr-1.5">
                <div className="flex items-center gap-1 text-[11px] font-black text-indigo-700 dark:text-indigo-400">
                  <TrendingDown className="h-3 w-3 shrink-0" />
                  <span className="truncate">📉 Lãi thấp nhất</span>
                </div>
                <div className="mt-0.5 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                  {lowestInterestOption?.companyName}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  Lãi: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{lowestInterestOption?.effectiveMarginRate}%</strong>/năm
                </div>
              </div>
              <div className={`shrink-0 w-2 h-2 rounded-full transition-colors ${activeCriterion === 'lowest_interest' ? 'bg-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-900/50' : 'bg-slate-200 dark:bg-slate-700'}`} />
            </button>
          </div>

          {/* Active Recommendation Showcase Banner */}
          {currentBannerConfig.company && (
            <div className={`rounded-2xl bg-gradient-to-r ${currentBannerConfig.gradient} p-3.5 sm:p-4 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 transition-all duration-300`}>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {currentBannerConfig.badge}
                  </span>
                  <span className="text-[11px] text-white/80 hidden sm:inline">
                    • {currentBannerConfig.description}
                  </span>
                </div>
                <h3 className="mt-1 text-base sm:text-lg font-black flex items-center gap-2">
                  <span>{currentBannerConfig.company.companyName}</span>
                  <span className="text-white/80 font-normal text-xs truncate max-w-[180px] sm:max-w-none">
                    — {currentBannerConfig.company.fullName}
                  </span>
                </h3>
                <div className="text-xs text-white/90 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span>Tiêu điểm: <strong className="text-white text-xs sm:text-sm font-black">{currentBannerConfig.metricMain}</strong></span>
                  <span className="text-white/60 hidden sm:inline">|</span>
                  <span className="text-white/80 text-[10px] sm:text-[11px]">{currentBannerConfig.metricSub}</span>
                </div>
              </div>

              <a
                href={currentBannerConfig.company.accountOpeningUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-extrabold ${currentBannerConfig.btnText} shadow hover:shadow-md transition-all`}
              >
                <span>Mở Tài Khoản</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          {/* Company Display Count Control with Range Slider */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 dark:bg-slate-800/70 px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Hiển thị:
              </span>
              <span className="inline-flex items-center rounded-lg bg-blue-600 px-2 py-0.5 text-xs font-black text-white shadow-xs">
                Top {displayCount} CTCK
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                / {rankedResults.length} công ty
              </span>
            </div>

            {/* Slider & Quick Presets */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={displayCount}
                onChange={(e) => setDisplayCount(Number(e.target.value))}
                aria-label="Số lượng công ty hiển thị"
                className="w-24 sm:w-28 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex gap-1">
                {[5, 10, 20, 30].map((count) => (
                  <button
                    key={count}
                    onClick={() => setDisplayCount(count)}
                    className={`rounded-lg px-2 py-0.5 text-[10px] font-bold transition-all ${
                      displayCount === count
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {count === 30 ? 'Tất cả' : `${count}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Ranking Table with Frozen Header & Frozen Columns */}
          <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
            {/* Mobile View: Cards for small screens (<640px) */}
            <div className="block sm:hidden divide-y divide-slate-100 dark:divide-slate-800 p-2 space-y-2 max-h-[440px] overflow-y-auto">
              {displayedResults.map((item, idx) => {
                const rowRank = idx + 1;
                const isBsc = item.companyId === 'bsc' || item.isRecommended;

                return (
                  <div 
                    key={item.companyId}
                    className={`p-3 rounded-2xl border transition-all ${
                      isBsc 
                        ? 'border-blue-300 bg-blue-50/70 dark:border-blue-800 dark:bg-blue-950/40 ring-1 ring-blue-500/30 shadow-xs' 
                        : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-850'
                    }`}
                  >
                    {/* Top bar: Rank, Logo, Name & Tag */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                          rowRank === 1 ? 'bg-amber-400 text-amber-950 shadow-xs' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                        }`}>
                          {rowRank}
                        </span>
                        <span 
                          className="h-2.5 w-2.5 rounded-full shrink-0 shadow-xs" 
                          style={{ backgroundColor: item.brandColor }}
                        />
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {item.companyName}
                        </span>
                        {item.isListed && item.stockCode && (
                          <span className="rounded bg-blue-100 dark:bg-blue-950 px-1 py-0.2 text-[8px] font-black text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                            {item.stockCode}
                          </span>
                        )}
                        {isBsc && (
                          <span className="rounded bg-amber-500 px-1 py-0.2 text-[8px] font-black text-white shrink-0">
                            BIDV
                          </span>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Tổng chi phí</span>
                        <span className="font-black text-xs text-blue-600 dark:text-blue-400">
                          {formatCurrency(item.totalMonthlyCost)}
                        </span>
                      </div>
                    </div>

                    {/* Breakdown: Fee & Margin */}
                    <div className="mt-2 grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Phí GD ({item.effectiveFeeRate}%)</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                          {item.isZeroFeeApplied ? '0 đ (Zero-Fee)' : formatCurrency(item.monthlyTradingFee)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">
                          Lãi Margin ({marginPackageType === 'standard_90d' ? `${item.standardRate90d}%` : `${item.shortTermRate}%`})
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                          {formatCurrency(item.monthlyMarginInterest)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-2 flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => handleCompanyClick(item.companyId)}
                        className="flex-1 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 text-center touch-manipulation"
                      >
                        Chi Tiết
                      </button>
                      <a
                        href={item.accountOpeningUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 py-1.5 rounded-xl text-xs font-black text-white text-center flex items-center justify-center gap-1 touch-manipulation shadow-xs ${
                          isBsc ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        <span>{isBsc ? 'Mở TK BSC' : 'Mở TK'}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scrollable container with fixed max height on desktop */}
            <div className="hidden sm:block overflow-x-auto overflow-y-auto max-h-[380px] sm:max-h-[410px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {/* Fixed Rank Header (Top-Left 1) */}
                    <th className="sticky top-0 left-0 z-30 bg-slate-100 dark:bg-slate-800 w-12 min-w-[48px] max-w-[48px] text-center py-2.5 px-1.5 border-b border-slate-200 dark:border-slate-700 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
                      Hạng
                    </th>

                    {/* Fixed Company Header (Top-Left 2) */}
                    <th className="sticky top-0 left-[48px] z-30 bg-slate-100 dark:bg-slate-800 min-w-[125px] sm:min-w-[145px] py-2.5 px-2.5 border-b border-slate-200 dark:border-slate-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.12)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)]">
                      CTCK
                    </th>

                    {/* Action Header moved next to Company */}
                    <th className="sticky top-0 z-20 bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm py-2.5 px-2 text-center min-w-[110px] sm:min-w-[125px] border-b border-slate-200 dark:border-slate-700">
                      Hành Động
                    </th>

                    {/* Total Cost Header (Positioned right after Action) */}
                    <th 
                      onClick={() => setActiveCriterion('lowest_total')}
                      className={`sticky top-0 z-20 backdrop-blur-sm py-2.5 px-2.5 border-b border-slate-200 dark:border-slate-700 min-w-[110px] sm:min-w-[125px] cursor-pointer transition-colors ${
                        activeCriterion === 'lowest_total'
                          ? 'bg-emerald-100/90 text-emerald-950 dark:bg-emerald-950/80 dark:text-emerald-200 font-black ring-1 ring-emerald-400/30'
                          : 'bg-slate-100/95 dark:bg-slate-800/95 hover:bg-slate-200/80 dark:hover:bg-slate-700 font-black text-slate-900 dark:text-white'
                      }`}
                      title="Nhấp để lọc CTCK có tổng chi phí tiết kiệm nhất"
                    >
                      <div className="flex items-center gap-1">
                        <span>Tổng Chi Phí</span>
                        {activeCriterion === 'lowest_total' && <span className="text-emerald-600 dark:text-emerald-400">▼</span>}
                      </div>
                      <div className="text-[9px] font-normal normal-case text-slate-500 dark:text-slate-400">
                        (/ tháng)
                      </div>
                    </th>

                    {/* Trading Fee Header */}
                    <th 
                      onClick={() => setActiveCriterion('lowest_fee')}
                      className={`sticky top-0 z-20 backdrop-blur-sm py-2.5 px-2.5 border-b border-slate-200 dark:border-slate-700 min-w-[90px] sm:min-w-[105px] cursor-pointer transition-colors ${
                        activeCriterion === 'lowest_fee'
                          ? 'bg-blue-100/90 text-blue-900 dark:bg-blue-950/80 dark:text-blue-200 font-black ring-1 ring-blue-400/30'
                          : 'bg-slate-100/95 dark:bg-slate-800/95 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                      }`}
                      title="Nhấp để lọc CTCK có phí GD thấp nhất"
                    >
                      <div className="flex items-center gap-1">
                        <span>Phí GD</span>
                        {activeCriterion === 'lowest_fee' && <span className="text-blue-600 dark:text-blue-400">▼</span>}
                      </div>
                      <div className="text-[9px] font-normal normal-case text-slate-500 dark:text-slate-400">
                        (Online/tháng)
                      </div>
                    </th>

                    {/* Margin Interest Header */}
                    <th 
                      onClick={() => setActiveCriterion('lowest_interest')}
                      className={`sticky top-0 z-20 backdrop-blur-sm py-2 px-2.5 border-b border-slate-200 dark:border-slate-700 min-w-[125px] sm:min-w-[145px] cursor-pointer transition-colors ${
                        activeCriterion === 'lowest_interest'
                          ? 'bg-indigo-100/90 text-indigo-900 dark:bg-indigo-950/80 dark:text-indigo-200 font-black ring-1 ring-indigo-400/30'
                          : 'bg-slate-100/95 dark:bg-slate-800/95 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                      }`}
                      title="Nhấp để lọc CTCK có lãi vay margin thấp nhất"
                    >
                      <div className="flex items-center gap-1">
                        <span>Lãi Margin</span>
                        {activeCriterion === 'lowest_interest' && <span className="text-indigo-600 dark:text-indigo-400">▼</span>}
                      </div>
                      <div className="text-[9px] font-bold normal-case text-indigo-600 dark:text-indigo-400">
                        {marginPackageType === 'standard_90d' ? '(Chuẩn 90 ngày)' : '(Gói Deal T+)'}
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {displayedResults.map((item, idx) => {
                    const rowRank = idx + 1;
                    const isBsc = item.companyId === 'bsc' || item.isRecommended;

                    return (
                      <tr
                        key={item.companyId}
                        className={`group transition-colors ${
                          isBsc
                            ? 'bg-blue-50/70 dark:bg-blue-950/40 ring-1 ring-blue-500/40'
                            : 'hover:bg-blue-50/40 dark:hover:bg-blue-950/20'
                        }`}
                      >
                        {/* Fixed Rank Column */}
                        <td className={`sticky left-0 z-10 w-12 min-w-[48px] max-w-[48px] text-center py-2 px-1.5 border-r border-slate-100 dark:border-slate-800 transition-colors ${
                          isBsc
                            ? 'bg-blue-50/90 dark:bg-blue-950/90'
                            : 'bg-white dark:bg-slate-900 group-hover:bg-blue-50/50 dark:group-hover:bg-slate-850'
                        }`}>
                          <span
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-black ${
                              rowRank === 1
                                ? 'bg-amber-400 text-amber-950 shadow-xs ring-1 ring-amber-300/60'
                                : rowRank === 2
                                ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100 ring-1 ring-slate-300/60 dark:ring-slate-600'
                                : rowRank === 3
                                ? 'bg-amber-700/20 text-amber-800 dark:text-amber-300 ring-1 ring-amber-700/30'
                                : isBsc
                                ? 'bg-blue-600 text-white font-extrabold'
                                : 'text-slate-500 dark:text-slate-400 font-bold'
                            }`}
                          >
                            {rowRank}
                          </span>
                        </td>

                        {/* Fixed Company Name Column */}
                        <td
                          onClick={() => handleCompanyClick(item.companyId)}
                          className={`sticky left-[48px] z-10 min-w-[125px] sm:min-w-[145px] py-2 px-2.5 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)] cursor-pointer transition-colors ${
                            isBsc
                              ? 'bg-blue-50/90 dark:bg-blue-950/90'
                              : 'bg-white dark:bg-slate-900 group-hover:bg-blue-50/50 dark:group-hover:bg-slate-850'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full shrink-0 shadow-xs ring-1 ring-black/10"
                              style={{ backgroundColor: item.brandColor }}
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1 flex-wrap">
                                <span className="font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                  {item.companyName}
                                </span>
                                {item.isListed && item.stockCode ? (
                                  <span 
                                    className="rounded bg-blue-100 dark:bg-blue-950/80 px-1 py-0.2 text-[8px] font-black text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80"
                                    title={`Mã chứng khoán: ${item.stockCode} (${item.listingExchange})`}
                                  >
                                    {item.stockCode}
                                  </span>
                                ) : (
                                  <span 
                                    className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.2 text-[8px] font-semibold text-slate-500 dark:text-slate-400"
                                    title={item.listingStatus}
                                  >
                                    {item.parentStockCode ? `Chưa NY (${item.parentStockCode})` : 'Chưa NY'}
                                  </span>
                                )}
                                {isBsc && (
                                  <span className="rounded bg-amber-500 px-1 py-0.2 text-[8px] font-black text-white uppercase tracking-wider">
                                    Top 1
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[110px]">
                                {item.fullName}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Action link & Detail button (Position 3 next to Company) */}
                        <td className="py-2 px-2 whitespace-nowrap text-center">
                          <div className="flex flex-col gap-1 items-stretch max-w-[105px] sm:max-w-[115px] mx-auto">
                            <a
                              href={item.accountOpeningUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-[11px] font-extrabold transition-all shadow-xs ${
                                isBsc
                                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white ring-1 ring-amber-400/50 shadow-orange-500/20'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              <span>{isBsc ? 'Mở TK BSC' : 'eKYC'}</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleCompanyClick(item.companyId)}
                              className="rounded-md border border-slate-200 bg-white py-0.5 px-1.5 text-[10px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                              title="Xem chi tiết biểu phí và phân tích"
                            >
                              Chi Tiết
                            </button>
                          </div>
                        </td>

                        {/* Total Monthly (Position 4 right after Action) */}
                        <td className={`py-2 px-2.5 whitespace-nowrap ${
                          activeCriterion === 'lowest_total' ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : ''
                        }`}>
                          <span className="font-black text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                            {formatCurrency(item.totalMonthlyCost)}
                          </span>
                        </td>

                        {/* Trading fee amount */}
                        <td className={`py-2 px-2.5 whitespace-nowrap ${
                          activeCriterion === 'lowest_fee' ? 'bg-blue-50/50 dark:bg-blue-950/20 font-bold' : 'text-slate-600 dark:text-slate-300'
                        }`}>
                          {item.isZeroFeeApplied ? (
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                              0 đ (0%)
                            </span>
                          ) : (
                            <div>
                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {formatCurrency(item.monthlyTradingFee)}
                              </span>
                              <div className="text-[10px] text-slate-400 dark:text-slate-500">
                                Phí: {item.effectiveFeeRate}%
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Margin Interest amount with standard 90d vs short-term breakdown */}
                        <td className={`py-2 px-2.5 whitespace-nowrap ${
                          activeCriterion === 'lowest_interest' ? 'bg-indigo-50/50 dark:bg-indigo-950/20 font-bold' : 'text-slate-600 dark:text-slate-300'
                        }`}>
                          {marginLoan === 0 ? (
                            <div>
                              <span className="text-slate-400 text-xs">0 đ</span>
                              <div className="text-[10px] text-slate-400 dark:text-slate-500">
                                {marginPackageType === 'standard_90d' ? (
                                  <div>
                                    <span>Chuẩn 90d: <strong className="text-slate-700 dark:text-slate-300 font-bold">{item.standardRate90d}%</strong></span>
                                    <span className="text-[9px] text-slate-400 block">T+ từ {item.shortTermRate}%</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>T+: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{item.shortTermRate}%</strong></span>
                                    <span className="text-[9px] text-slate-400 block">Chuẩn 90d: {item.standardRate90d}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {formatCurrency(item.monthlyMarginInterest)}
                              </span>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                {marginPackageType === 'standard_90d' ? (
                                  <div>
                                    <div>
                                      Chuẩn 90d: <strong className="text-slate-800 dark:text-slate-200 font-bold">{item.standardRate90d}%</strong>/năm
                                    </div>
                                    {item.isShortTermDealOnly ? (
                                      <span className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold block">
                                        (Gói deal {item.shortTermRate}% chỉ 5–10 ngày)
                                      </span>
                                    ) : (
                                      <span className="text-[9px] text-slate-400 dark:text-slate-500 block">
                                        T+ ngắn hạn: từ {item.shortTermRate}%
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    <div>
                                      Gói T+: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{item.shortTermRate}%</strong>/năm
                                    </div>
                                    <span className="text-[9px] text-slate-400 dark:text-slate-500 block truncate max-w-[125px]">
                                      {item.shortTermTenor}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom guide footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-4 py-2.5 bg-slate-50/90 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>
                  Đang hiển thị <strong>Top {displayedResults.length} / {rankedResults.length}</strong> CTCK theo tiêu chí: <strong className="text-slate-800 dark:text-slate-200 font-bold">{
                    activeCriterion === 'lowest_fee'
                      ? 'Phí giao dịch thấp nhất'
                      : activeCriterion === 'lowest_interest'
                      ? 'Lãi suất Margin thấp nhất'
                      : 'Tổng chi phí tiết kiệm nhất'
                  }</strong>.
                </span>
              </div>
              <span className="text-slate-500 dark:text-slate-400">
                * Phí GD đã bao gồm phí trả sở và chưa bao gồm thuế
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
