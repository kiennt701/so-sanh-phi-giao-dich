/**
 * CÔNG CỤ TÍNH TOÁN CHI PHÍ GIAO DỊCH VÀ LÃI VAY MARGIN
 */

/**
 * Định dạng số tiền sang định dạng tiền tệ Việt Nam (VNĐ)
 * @param {number} amount
 * @returns {string} ví dụ: "1.500.000 đ"
 */
export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "0 đ";
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(Math.round(amount));
}

/**
 * Định dạng số rút gọn (triệu, tỷ)
 * @param {number} amount 
 * @returns {string}
 */
export function formatCompactNumber(amount) {
  if (amount >= 1_000_000_000_000) {
    const ty = amount / 1_000_000_000;
    return `${ty.toLocaleString('vi-VN')} tỷ`;
  }
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)} tỷ`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(0)} triệu`;
  }
  return formatCurrency(amount);
}

/**
 * Chuyển đổi số tiền thành chữ đọc tiếng Việt (VD: "200 triệu đồng", "1 tỷ 500 triệu đồng", "10.000 tỷ đồng (Tối đa)")
 * Hỗ trợ người dùng kiểm tra trực quan số tiền khi gõ trực tiếp lên tới 10.000 tỷ VNĐ.
 * @param {number} amount 
 * @returns {string}
 */
export function formatVietnameseNumberWords(amount) {
  if (amount === undefined || amount === null || isNaN(amount) || amount <= 0) return '0 đồng';
  if (amount >= 10_000_000_000_000) return '10.000 tỷ đồng (Tối đa)';

  const ty = Math.floor(amount / 1_000_000_000);
  const trieu = Math.floor((amount % 1_000_000_000) / 1_000_000);
  const ngan = Math.floor((amount % 1_000_000) / 1_000);
  const dong = Math.floor(amount % 1_000);

  const parts = [];
  if (ty > 0) {
    parts.push(`${ty.toLocaleString('vi-VN')} tỷ`);
  }
  if (trieu > 0) {
    parts.push(`${trieu} triệu`);
  }
  if (ngan > 0 && ty === 0) {
    parts.push(`${ngan} nghìn`);
  }
  if (dong > 0 && ty === 0 && trieu === 0) {
    parts.push(`${dong}`);
  }

  return parts.length > 0 ? `${parts.join(' ')} đồng` : '0 đồng';
}

/**
 * Tính toán chi phí tháng và năm cho 1 CTCK cụ thể
 * @param {Object} company Thông tin CTCK
 * @param {Object} params { monthlyTradingVolume, marginLoanAmount, marginBorrowDays, isNewAccount }
 * @returns {Object}
 */
export function calculateCompanyCost(company, params) {
  const {
    monthlyTradingVolume = 200_000_000,
    marginLoanAmount = 100_000_000,
    marginBorrowDays = 20,
    isNewAccount = true
  } = params;

  // 1. Tính phí giao dịch:
  // DNSE và TCBS áp dụng chính sách miễn phí môi giới nhưng thu phí thực tế gồm phí trả Sở (DNSE: 0.045%, TCBS: 0.03%).
  const isExchangeFeeFixed = ['dnse', 'tcbs'].includes(company.id) || company.tradingFee?.includesExchangeFee;
  let feeRatePercent = company.tradingFee.onlineMin;
  let isZeroFeeApplied = false;

  if (isExchangeFeeFixed) {
    feeRatePercent = company.tradingFee.onlineMin;
    isZeroFeeApplied = false;
  } else if (isNewAccount && company.tradingFee.zeroFeeOffer) {
    feeRatePercent = 0;
    isZeroFeeApplied = true;
  } else if (company.tradingFee.onlineMin === 0) {
    feeRatePercent = 0;
    isZeroFeeApplied = true;
  }

  const monthlyTradingFee = Math.round(monthlyTradingVolume * (feeRatePercent / 100));

  // 2. Tính lãi vay Margin:
  // Phân biệt rõ lãi suất tiêu chuẩn (kỳ hạn 90 ngày) và gói lãi suất giao dịch ngắn hạn (T+ / Deal ngắn hạn)
  const standard90dRate = company.margin.standardRate90d ?? company.margin.medianRate ?? company.margin.baseRate ?? 10.5;
  const shortDealRate = company.margin.shortTermRate || company.margin.promoRate || company.margin.minRate || standard90dRate;

  let effectiveMarginRate = standard90dRate;
  
  if (params.marginPackageType === 'short_term') {
    effectiveMarginRate = shortDealRate;
  } else if (params.marginPackageType === 'standard_90d') {
    effectiveMarginRate = standard90dRate;
  } else if (isNewAccount && company.margin.promoRate) {
    effectiveMarginRate = company.margin.promoRate;
  } else {
    // Mặc định: ưu tiên lãi suất tiêu chuẩn 90 ngày, tiếp đến medianRate
    effectiveMarginRate = standard90dRate;
  }

  // Trừ số ngày miễn lãi nếu có (ví dụ DNSE miễn lãi T+0)
  const billableDays = Math.max(0, marginBorrowDays - (company.margin.interestFreeDays || 0));
  
  // Công thức chuẩn lãi margin tại CTCK Việt Nam: Tiền vay * Lãi suất năm / 365 * Số ngày vay
  const monthlyMarginInterest = (marginLoanAmount * (effectiveMarginRate / 100) / 365) * billableDays;

  // 3. Tổng chi phí
  const totalMonthlyCost = monthlyTradingFee + monthlyMarginInterest;
  const totalAnnualCost = totalMonthlyCost * 12;

  return {
    companyId: company.id,
    companyName: company.shortName,
    fullName: company.name,
    brandColor: company.brandColor,
    isZeroFeeApplied,
    isRecommended: Boolean(company.isRecommended),
    effectiveFeeRate: feeRatePercent,
    effectiveMarginRate,
    marginPackageType: params.marginPackageType || 'standard_90d',
    shortTermRate: shortDealRate,
    shortTermTenor: company.margin.shortTermTenor || 'Gói ngắn hạn T+',
    shortTermDisplay: (company.margin.shortTermRate || company.margin.promoRate) 
      ? `Từ ${company.margin.shortTermRate || company.margin.promoRate}%/năm` 
      : `${standard90dRate}%/năm`,
    standardRate90d: standard90dRate,
    standardRateDisplay: company.margin.standardRateDisplay || `${standard90dRate}%/năm (Chuẩn 90 ngày)`,
    isShortTermDealOnly: Boolean(company.margin.isShortTermDealOnly),
    marginMinRate: company.margin.minRate || effectiveMarginRate,
    marginMaxRate: company.margin.maxRate || effectiveMarginRate,
    marginMedianRate: company.margin.medianRate ?? standard90dRate,
    marginNotes: company.margin.notes,
    monthlyTradingFee,
    monthlyMarginInterest,
    totalMonthlyCost,
    totalAnnualCost,
    stockCode: company.stockCode,
    listingExchange: company.listingExchange,
    listingStatus: company.listingStatus,
    isListed: company.isListed,
    parentStockCode: company.parentStockCode,
    accountOpeningUrl: company.accountOpeningUrl,
    referralCode: company.referralCode
  };
}

/**
 * Tính toán và xếp hạng toàn bộ các CTCK theo thứ tự tiết kiệm chi phí nhất
 * @param {Array} companies Danh sách CTCK
 * @param {Object} params Tham số đầu vào
 * @returns {Array} Danh sách đã sắp xếp từ chi phí thấp nhất đến cao nhất
 */
export function rankCompaniesByCost(companies, params) {
  const results = companies.map(company => calculateCompanyCost(company, params));
  
  // Mức chi phí chuẩn trung bình thị trường giả định (phí 0.15%, margin 12.5%/năm)
  const benchmarkTradingFee = params.monthlyTradingVolume * (0.15 / 100);
  const benchmarkMarginInterest = (params.marginLoanAmount * (12.5 / 100) / 365) * params.marginBorrowDays;
  const benchmarkTotalMonthly = benchmarkTradingFee + benchmarkMarginInterest;

  // Sắp xếp theo tổng chi phí tăng dần (cùng mức chi phí: ưu tiên đề xuất BSC)
  results.sort((a, b) => {
    const costDiff = a.totalMonthlyCost - b.totalMonthlyCost;
    if (Math.abs(costDiff) > 0.01) {
      return costDiff;
    }
    // Cùng tổng chi phí: Ưu tiên đề xuất BSC
    if (a.companyId === 'bsc') return -1;
    if (b.companyId === 'bsc') return 1;
    return 0;
  });

  return results.map((item, index) => {
    const monthlySavings = Math.max(0, benchmarkTotalMonthly - item.totalMonthlyCost);
    const annualSavings = monthlySavings * 12;
    return {
      ...item,
      rank: index + 1,
      benchmarkTotalMonthly,
      monthlySavings,
      annualSavings
    };
  });
}

/**
 * Tìm công ty có phí giao dịch thấp nhất
 * @param {Array} rankedResults Danh sách kết quả đã tính toán chi phí
 * @returns {Object|null}
 */
export function getLowestFeeCompany(rankedResults) {
  if (!rankedResults || rankedResults.length === 0) return null;
  return [...rankedResults].sort((a, b) => {
    const feeDiff = a.monthlyTradingFee - b.monthlyTradingFee;
    if (Math.abs(feeDiff) > 0.01) {
      return feeDiff;
    }
    const rateDiff = a.effectiveFeeRate - b.effectiveFeeRate;
    if (Math.abs(rateDiff) > 0.0001) {
      return rateDiff;
    }
    // Cùng mức phí giao dịch: Ưu tiên đề xuất BSC
    if (a.companyId === 'bsc') return -1;
    if (b.companyId === 'bsc') return 1;

    return a.totalMonthlyCost - b.totalMonthlyCost;
  })[0];
}

/**
 * Tìm công ty có lãi suất margin thấp nhất
 * @param {Array} rankedResults Danh sách kết quả đã tính toán chi phí
 * @param {number} marginLoanAmount Số tiền vay margin
 * @returns {Object|null}
 */
export function getLowestInterestCompany(rankedResults, marginLoanAmount = 0) {
  if (!rankedResults || rankedResults.length === 0) return null;
  return [...rankedResults].sort((a, b) => {
    if (marginLoanAmount > 0) {
      const intDiff = a.monthlyMarginInterest - b.monthlyMarginInterest;
      if (Math.abs(intDiff) > 0.01) {
        return intDiff;
      }
    }
    const rateDiff = a.effectiveMarginRate - b.effectiveMarginRate;
    if (Math.abs(rateDiff) > 0.0001) {
      return rateDiff;
    }
    // Cùng mức lãi suất margin: Ưu tiên đề xuất BSC
    if (a.companyId === 'bsc') return -1;
    if (b.companyId === 'bsc') return 1;

    return a.totalMonthlyCost - b.totalMonthlyCost;
  })[0];
}

/**
 * Sắp xếp danh sách CTCK theo tiêu chí người dùng chọn
 * @param {Array} rankedResults 
 * @param {'lowest_total' | 'lowest_fee' | 'lowest_interest'} criterion 
 * @param {number} marginLoanAmount 
 * @returns {Array} Danh sách đã sắp xếp mới (không làm thay đổi mảng gốc)
 */
export function sortCompaniesByCriterion(rankedResults, criterion = 'lowest_total', marginLoanAmount = 0) {
  if (!rankedResults || rankedResults.length === 0) return [];
  const list = [...rankedResults];

  if (criterion === 'lowest_fee') {
    list.sort((a, b) => {
      const feeDiff = a.monthlyTradingFee - b.monthlyTradingFee;
      if (Math.abs(feeDiff) > 0.01) {
        return feeDiff;
      }
      const rateDiff = a.effectiveFeeRate - b.effectiveFeeRate;
      if (Math.abs(rateDiff) > 0.0001) {
        return rateDiff;
      }
      // Cùng mức phí giao dịch: Ưu tiên đề xuất BSC
      if (a.companyId === 'bsc') return -1;
      if (b.companyId === 'bsc') return 1;

      return a.totalMonthlyCost - b.totalMonthlyCost;
    });
  } else if (criterion === 'lowest_interest') {
    list.sort((a, b) => {
      if (marginLoanAmount > 0) {
        const intDiff = a.monthlyMarginInterest - b.monthlyMarginInterest;
        if (Math.abs(intDiff) > 0.01) {
          return intDiff;
        }
      }
      const rateDiff = a.effectiveMarginRate - b.effectiveMarginRate;
      if (Math.abs(rateDiff) > 0.0001) {
        return rateDiff;
      }
      // Cùng mức lãi suất margin: Ưu tiên đề xuất BSC
      if (a.companyId === 'bsc') return -1;
      if (b.companyId === 'bsc') return 1;

      return a.totalMonthlyCost - b.totalMonthlyCost;
    });
  } else {
    // lowest_total
    list.sort((a, b) => {
      const costDiff = a.totalMonthlyCost - b.totalMonthlyCost;
      if (Math.abs(costDiff) > 0.01) {
        return costDiff;
      }
      // Cùng tổng chi phí: Ưu tiên đề xuất BSC
      if (a.companyId === 'bsc') return -1;
      if (b.companyId === 'bsc') return 1;

      return 0;
    });
  }

  return list;
}

