import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Clock, 
  TrendingDown, 
  ShieldAlert, 
  Search, 
  ArrowUpRight, 
  HelpCircle, 
  Calculator, 
  Sliders, 
  CheckCircle2, 
  Award, 
  Info, 
  ExternalLink, 
  Layers, 
  Table, 
  LayoutGrid, 
  Percent,
  Sparkles,
  DollarSign
} from 'lucide-react';

/**
 * Trích xuất và chuẩn hóa thông tin gói Margin ngắn ngày của từng CTCK
 */
export function getShortTermMarginDetails(company) {
  const m = company.margin || {};
  const shortRate = Number(m.shortTermRate || m.promoRate || m.minRate || 9.0);
  const standardRate = Number(m.standardRate90d || m.baseRate || m.medianRate || 12.0);
  const spread = Math.max(0, Number((standardRate - shortRate).toFixed(2)));
  
  // Xác định tên gói và thời hạn đặc thù (Ưu tiên giá trị Admin tùy biến)
  let productName = m.shortTermTenor || 'Gói Margin Ngắn Ngày';
  let tenorCategory = 't10'; // 't5' | 't10' | 't30'

  if (m.shortTermTenor && m.shortTermTenor !== 'Gói Margin Ngắn Ngày') {
    productName = m.shortTermTenor;
    const lower = m.shortTermTenor.toLowerCase();
    if (lower.includes('t+5') || lower.includes('5 ngày') || lower.includes('t5') || lower.includes('deal')) {
      tenorCategory = 't5';
    } else if (lower.includes('30 ngày') || lower.includes('t30') || lower.includes('tháng')) {
      tenorCategory = 't30';
    } else {
      tenorCategory = 't10';
    }
  } else if (company.id === 'dnse') {
    productName = 'Margin Deal Theo Lệnh (T+5 / T+10)';
    tenorCategory = 't5';
  } else if (company.id === 'vps') {
    productName = 'Gói T+5 / T+10 / Miễn Lãi T+2';
    tenorCategory = 't5';
  } else if (company.id === 'bsc') {
    productName = 'Gói Margin T+ BSC (Big4 BIDV)';
    tenorCategory = 't10';
  } else if (company.id === 'tcbs') {
    productName = 'Margin Deal Linh Hoạt Theo Mã';
    tenorCategory = 't10';
  } else if (company.id === 'kafi') {
    productName = 'Gói Lướt Sóng T+ Linh Hoạt';
    tenorCategory = 't10';
  } else if (company.id === 'mbs') {
    productName = 'Gói M-Margin Quick Ngắn Ngày';
    tenorCategory = 't10';
  } else if (company.id === 'vndirect') {
    productName = 'Gói D-Margin Ưu Đãi 30 Ngày';
    tenorCategory = 't30';
  } else if (company.id === 'shinhan') {
    productName = 'Gói SOL Margin 30 Ngày';
    tenorCategory = 't30';
  } else if (company.id === 'ssi') {
    productName = 'Gói T+ Ngắn Hạn SSI';
    tenorCategory = 't10';
  } else if (m.notes && (m.notes.includes('T+5') || m.notes.includes('5 ngày'))) {
    tenorCategory = 't5';
  } else if (m.notes && (m.notes.includes('30 ngày') || m.notes.includes('60 ngày'))) {
    tenorCategory = 't30';
  }

  const dailyRatePercent = (shortRate / 365);

  return {
    shortRate,
    standardRate,
    spread,
    productName,
    tenorCategory,
    shortTermDisplay: m.shortTermDisplay || `${shortRate.toFixed(2)}%/năm`,
    standardRateDisplay: m.standardRateDisplay || `${standardRate.toFixed(1)}%/năm`,
    dailyRatePercent: dailyRatePercent.toFixed(4),
    isShortTermDealOnly: Boolean(m.isShortTermDealOnly),
    notes: m.notes || '',
    maxLeverage: m.maxLeverage || '1:1'
  };
}

export default function ShortTermMarginComparator({ companies = [], onSelectDetail }) {
  // Simulator input states
  const [loanAmount, setLoanAmount] = useState(300000000); // 300 triệu mặc định
  const [holdingDays, setHoldingDays] = useState(7); // 7 ngày lướt sóng mặc định

  // Search, Filter & Sort states
  const [search, setSearch] = useState('');
  const [tenorFilter, setTenorFilter] = useState('all'); // 'all' | 't5' | 't10' | 't30' | 'sub_8'
  const [sortBy, setSortBy] = useState('rate_asc'); // 'rate_asc' | 'savings_desc' | 'name_asc'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Pre-defined quick amounts
  const quickAmounts = [
    { label: '100 Tr', value: 100000000 },
    { label: '300 Tr', value: 300000000 },
    { label: '500 Tr', value: 500000000 },
    { label: '1 Tỷ', value: 1000000000 },
    { label: '2 Tỷ', value: 2000000000 },
  ];

  // Pre-defined quick holding days
  const quickDays = [
    { label: '3 ngày', value: 3 },
    { label: '5 ngày (T+5)', value: 5 },
    { label: '7 ngày', value: 7 },
    { label: '10 ngày (T+10)', value: 10 },
    { label: '15 ngày', value: 15 },
    { label: '30 ngày', value: 30 },
  ];

  // Processed companies with calculations
  const processedCompanies = useMemo(() => {
    return companies.map((c) => {
      const details = getShortTermMarginDetails(c);

      // Tính tiền lãi ngắn ngày theo số ngày & số tiền chọn
      const shortTermInterest = Math.round(loanAmount * (details.shortRate / 100) * (holdingDays / 365));
      // Tính tiền lãi theo mức lãi chuẩn 90 ngày nếu không có gói ngắn hạn
      const standardInterest = Math.round(loanAmount * (details.standardRate / 100) * (holdingDays / 365));
      // Tiền tiết kiệm được
      const savings = Math.max(0, standardInterest - shortTermInterest);

      return {
        ...c,
        marginDetails: details,
        calc: {
          shortTermInterest,
          standardInterest,
          savings
        }
      };
    });
  }, [companies, loanAmount, holdingDays]);

  // Filter and sort companies
  const filteredAndSorted = useMemo(() => {
    return processedCompanies.filter((c) => {
      const details = c.marginDetails;

      // Text search
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matchName = c.shortName.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
        const matchStock = (c.stockCode || '').toLowerCase().includes(q);
        const matchProduct = details.productName.toLowerCase().includes(q);
        const matchNotes = details.notes.toLowerCase().includes(q);
        if (!matchName && !matchStock && !matchProduct && !matchNotes) return false;
      }

      // Filter by tenor
      if (tenorFilter === 't5') {
        return details.tenorCategory === 't5';
      }
      if (tenorFilter === 't10') {
        return details.tenorCategory === 't10' || details.tenorCategory === 't5';
      }
      if (tenorFilter === 't30') {
        return details.tenorCategory === 't30';
      }
      if (tenorFilter === 'sub_8') {
        return details.shortRate <= 8.0;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rate_asc') {
        return a.marginDetails.shortRate - b.marginDetails.shortRate;
      }
      if (sortBy === 'savings_desc') {
        return b.calc.savings - a.calc.savings;
      }
      if (sortBy === 'name_asc') {
        return a.shortName.localeCompare(b.shortName);
      }
      return 0;
    });
  }, [processedCompanies, search, tenorFilter, sortBy]);

  // Format currency VNĐ
  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <div className="w-full max-w-full min-w-0 rounded-3xl border border-slate-200 bg-white p-3.5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors space-y-5">
      {/* 1. Header & Educational Callout */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>Phân Hệ So Sánh Chuyên Biệt Lướt Sóng</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Bảng Đối Chiếu Margin Ngắn Ngày (Quick, T+, Margin Deal)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Dành riêng cho nhà đầu tư lướt sóng ngắn hạn (swing trading, T+3 đến T+15). So sánh các gói lãi suất ưu đãi siêu thấp (chỉ từ <strong>5.99% - 8.5%/năm</strong>) và cảnh báo mức lãi sau khi hết kỳ hạn T+.
          </p>
        </div>

        {/* Quick Market Benchmark Stats */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start lg:self-center">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900/60 p-3 text-center min-w-[110px]">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Thấp Nhất T+
            </span>
            <span className="text-lg font-black text-blue-700 dark:text-blue-300">
              5.99%<span className="text-xs font-semibold">/năm</span>
            </span>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-100 dark:border-emerald-900/60 p-3 text-center min-w-[110px]">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              Phổ Biến T+
            </span>
            <span className="text-lg font-black text-emerald-700 dark:text-emerald-300">
              7.5% - 8.8%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive T+ Margin Cost Estimator (Bộ Tính Tiền Lãi Vay T+) */}
      <div className="rounded-2xl border border-blue-100 dark:border-blue-900/60 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-slate-900/40 p-4 sm:p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs shrink-0">
              <Calculator className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Mô Phỏng Chi Phí Tiền Lãi Thực Trả Theo Khoản Vay
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Nhập số tiền và ngày lướt sóng để hệ thống tự động tính ra tiền lãi VNĐ cho 30 CTCK
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-white/80 dark:bg-slate-800/80 px-3 py-1 rounded-xl border border-blue-200 dark:border-blue-800 self-start sm:self-auto">
            Lãi ngày quy đổi: ~0.016% - 0.024%/ngày
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Amount selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Số tiền vay Margin:</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold text-sm sm:text-base">
                {formatVND(loanAmount)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {quickAmounts.map((q) => (
                <button
                  key={q.value}
                  type="button"
                  onClick={() => setLoanAmount(q.value)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                    loanAmount === q.value
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Holding Days selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Số ngày nắm giữ vị thế:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-sm sm:text-base">
                {holdingDays} Ngày
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {quickDays.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setHoldingDays(d.value)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                    holdingDays === d.value
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search, Tenor Filters & Sorting Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-1">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên CTCK, tên gói (T+, Deal, Quick...)"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Tenor category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
          {[
            { id: 'all', label: 'Tất cả CTCK' },
            { id: 'sub_8', label: 'Lãi T+ ≤ 8.0%' },
            { id: 't5', label: 'Kỳ hạn T+5' },
            { id: 't10', label: 'Kỳ hạn T+10' },
            { id: 't30', label: 'Kỳ hạn 30 ngày' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setTenorFilter(f.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                tenorFilter === f.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort & View Mode */}
        <div className="flex items-center justify-between lg:justify-end gap-2 shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white py-1.5 px-3 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="rate_asc">Lãi ngắn ngày: Thấp nhất</option>
            <option value="savings_desc">Tiết kiệm nhiều nhất</option>
            <option value="name_asc">Tên CTCK A-Z</option>
          </select>

          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-800 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1 transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                  : 'text-slate-400 hover:text-slate-700 dark:text-slate-300'
              }`}
              title="Xem dạng bảng đầy đủ"
            >
              <Table className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-[11px]">Bảng</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1 transition-colors ${
                viewMode === 'cards'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                  : 'text-slate-400 hover:text-slate-700 dark:text-slate-300'
              }`}
              title="Xem dạng thẻ (phù hợp mobile)"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-[11px]">Thẻ</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Important Trader Risk Warning Notice */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/30 p-3.5 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Lưu ý cốt lõi khi dùng Margin T+:</strong> Mức lãi suất ưu đãi ngắn ngày (5.99% - 9.0%) chỉ áp dụng đúng trong số ngày quy định của gói (thường từ 5 đến 15 ngày). Nếu nhà đầu tư giữ vị thế <strong>quá thời hạn gói T+</strong>, lãi suất sẽ tự động nhảy lên mức <strong>Lãi Suất Chuẩn 90 Ngày</strong> (từ 10.5% - 14.0%/năm tùy CTCK). Luôn đối chiếu cột Lãi Chuẩn để quản trị rủi ro chi phí!
        </div>
      </div>

      {/* 5. Results count summary */}
      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
        Hiển thị <strong className="text-slate-900 dark:text-white font-bold">{filteredAndSorted.length}</strong> / {companies.length} công ty chứng khoán có chính sách Margin ngắn ngày
      </div>

      {/* 6. Display Content: Table View or Cards View */}
      {filteredAndSorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center space-y-2">
          <Zap className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <h5 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Không tìm thấy CTCK nào phù hợp với bộ lọc
          </h5>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Thử xóa từ khóa tìm kiếm hoặc bấm nút "Tất cả CTCK" để xem đầy đủ danh sách.
          </p>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <table className="w-full min-w-[850px] text-left text-xs">
            <thead className="bg-slate-100/90 dark:bg-slate-800/90 text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-3 w-12 text-center">Hạng</th>
                <th className="py-3 px-3 min-w-[170px]">CTCK & Sản Phẩm</th>
                <th className="py-3 px-3 text-right">Lãi Suất T+</th>
                <th className="py-3 px-3 text-right">Tiền Lãi ({holdingDays}d)</th>
                <th className="py-3 px-3 text-right">Lãi Chuẩn 90D</th>
                <th className="py-3 px-3 text-right">Tiết Kiệm</th>
                <th className="py-3 px-3 min-w-[180px]">Kỳ Hạn & Đặc Điểm</th>
                <th className="py-3 px-3 text-center w-28">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredAndSorted.map((c, idx) => {
                const details = c.marginDetails;
                const isTop1 = idx === 0;

                return (
                  <tr 
                    key={c.id} 
                    className={`hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors ${
                      isTop1 ? 'bg-amber-50/20 dark:bg-amber-950/10' : ''
                    }`}
                  >
                    {/* Rank Badge */}
                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${
                        idx === 0 
                          ? 'bg-amber-400 text-amber-950 shadow-xs' 
                          : idx === 1 
                          ? 'bg-slate-300 text-slate-900' 
                          : idx === 2 
                          ? 'bg-amber-600/30 text-amber-900 dark:text-amber-200' 
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                    </td>

                    {/* Company Info & Product Name */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-black text-white text-xs shadow-xs"
                          style={{ backgroundColor: c.brandColor || '#2563eb' }}
                        >
                          {c.shortName.substring(0, 3)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                              {c.shortName}
                            </span>
                            {c.stockCode && (
                              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded">
                                {c.stockCode}
                              </span>
                            )}
                            {c.bankBacked && (
                              <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1 py-0.2 rounded">
                                {c.bankBacked}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 truncate max-w-[210px] mt-0.5">
                            {details.productName}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Short Term Rate */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                        {details.shortRate}%<span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">/năm</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~{details.dailyRatePercent}%/ngày
                      </div>
                    </td>

                    {/* Actual Interest Cost in VNĐ */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="text-xs font-black text-slate-900 dark:text-white">
                        {formatVND(c.calc.shortTermInterest)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        gốc {formatVND(loanAmount)} ({holdingDays}d)
                      </div>
                    </td>

                    {/* Standard Rate 90d */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {details.standardRate}%<span className="text-[10px] text-slate-400">/năm</span>
                      </div>
                      <div className="text-[10px] text-rose-500 font-semibold">
                        {formatVND(c.calc.standardInterest)}
                      </div>
                    </td>

                    {/* Savings (Spread) */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="inline-flex items-center gap-0.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <TrendingDown className="h-3 w-3" />
                        <span>{formatVND(c.calc.savings)}</span>
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                        Lãi rẻ hơn {details.spread}%/năm
                      </div>
                    </td>

                    {/* Product notes & Terms */}
                    <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                      <div className="line-clamp-2" title={details.notes}>
                        {details.notes}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                        <span>Đòn bẩy: <strong className="text-slate-700 dark:text-slate-200">{details.maxLeverage}</strong></span>
                        {details.isShortTermDealOnly && (
                          <span className="text-amber-600 dark:text-amber-400 font-bold">• Chỉ áp dụng gói Deal</span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <a
                          href={c.accountOpeningUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1 rounded-xl bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-blue-700 transition-colors shadow-xs"
                        >
                          <span>Mở TK</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>

                        <button
                          type="button"
                          onClick={() => onSelectDetail && onSelectDetail(c)}
                          className="text-[10px] font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                        >
                          Chi tiết
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* CARDS VIEW (OPTIMIZED FOR MOBILE) */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {filteredAndSorted.map((c, idx) => {
            const details = c.marginDetails;

            return (
              <div
                key={c.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between space-y-3"
              >
                {/* Header Card */}
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                        idx === 0 
                          ? 'bg-amber-400 text-amber-950' 
                          : idx === 1 
                          ? 'bg-slate-200 text-slate-800' 
                          : idx === 2 
                          ? 'bg-amber-600/30 text-amber-900 dark:text-amber-200' 
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                      }`}>
                        #{idx + 1}
                      </span>
                      <div 
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-black text-white text-[11px]"
                        style={{ backgroundColor: c.brandColor || '#2563eb' }}
                      >
                        {c.shortName.substring(0, 3)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-slate-900 dark:text-white text-sm truncate">
                          {c.shortName}
                        </h4>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {c.name}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                        {details.shortRate}%/năm
                      </span>
                      <span className="text-[9px] text-slate-400 block">
                        ~{details.dailyRatePercent}%/ngày
                      </span>
                    </div>
                  </div>

                  {/* Product name & badges */}
                  <div className="mt-2.5">
                    <div className="text-xs font-bold text-blue-700 dark:text-blue-300">
                      ⚡ {details.productName}
                    </div>
                    {c.bankBacked && (
                      <span className="mt-1 inline-block text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
                        Bảo trợ: {c.bankBacked}
                      </span>
                    )}
                  </div>

                  {/* Cost comparison box */}
                  <div className="mt-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 border border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Tiền lãi ({holdingDays}d):</span>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {formatVND(c.calc.shortTermInterest)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Tiết kiệm được:</span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400">
                        {formatVND(c.calc.savings)}
                      </span>
                    </div>
                  </div>

                  {/* Standard rate warning */}
                  <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Lãi chuẩn sau hạn:</span>
                    <span className="font-bold text-rose-500">{details.standardRate}%/năm</span>
                  </div>

                  <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {details.notes}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectDetail && onSelectDetail(c)}
                    className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-1.5 px-2"
                  >
                    Xem Chi Tiết
                  </button>

                  <a
                    href={c.accountOpeningUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-extrabold text-white transition-colors shadow-xs"
                  >
                    <span>Mở Tài Khoản</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 7. Footer Guidelines on T+ Margin Trading */}
      <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 text-xs text-slate-600 dark:text-slate-400 space-y-1.5 border border-slate-200 dark:border-slate-800 leading-relaxed">
        <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Info className="h-4 w-4 text-blue-500" />
          <span>Bí Quyết Tối Ưu Chi Phí Khi Sử Dụng Margin Ngắn Ngày (Quick / T+)</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-[11px]">
          <li><strong>Đặt lệnh theo chu kỳ:</strong> Chỉ kích hoạt vay khi thị trường xuất hiện điểm mua kỹ thuật chuẩn (Breakout, Retest hỗ trợ) và dự kiến chốt lời trong vòng 3 đến 10 phiên giao dịch.</li>
          <li><strong>Tuyệt đối không gồng lỗ quá hạn T+:</strong> Nếu vị thế không như kỳ vọng, cần chủ động cơ cấu trước khi thời hạn ưu đãi kết thúc để tránh bị tính lãi chuẩn 90 ngày (lên tới 13.5% - 14.0%/năm).</li>
          <li><strong>Kiểm tra danh mục mã được cấp margin:</strong> Một số gói như Margin Deal (DNSE, TCBS) có biểu lãi khác nhau theo từng cổ phiếu. Cần xem kỹ mã chứng khoán bạn định mua có thuộc nhóm được hưởng mức lãi thấp nhất không.</li>
        </ul>
      </div>
    </div>
  );
}
