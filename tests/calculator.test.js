import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCompactNumber,
  calculateCompanyCost,
  rankCompaniesByCost,
  getLowestFeeCompany,
  getLowestInterestCompany,
  sortCompaniesByCriterion
} from '../src/utils/calculator.js';
import { SECURITIES_COMPANIES } from '../src/data/securitiesData.js';

describe('Calculator Utility Suite', () => {
  describe('formatCurrency()', () => {
    it('should return "0 đ" for null, undefined, or NaN', () => {
      expect(formatCurrency(null)).toBe('0 đ');
      expect(formatCurrency(undefined)).toBe('0 đ');
      expect(formatCurrency(NaN)).toBe('0 đ');
    });

    it('should correctly format 0 VND', () => {
      const result = formatCurrency(0);
      expect(result).toMatch(/0[\s\u00a0]*(₫|đ)/);
    });

    it('should format standard positive amounts with thousand separators', () => {
      const result = formatCurrency(1500000);
      expect(result).toMatch(/1\.500\.000[\s\u00a0]*(₫|đ)/);
    });

    it('should round decimal amounts to the nearest integer', () => {
      const roundDown = formatCurrency(1500000.4);
      expect(roundDown).toMatch(/1\.500\.000[\s\u00a0]*(₫|đ)/);

      const roundUp = formatCurrency(1500000.6);
      expect(roundUp).toMatch(/1\.500\.001[\s\u00a0]*(₫|đ)/);
    });

    it('should handle large amounts (billions VND)', () => {
      const result = formatCurrency(10000000000);
      expect(result).toMatch(/10\.000\.000\.000[\s\u00a0]*(₫|đ)/);
    });

    it('should format negative amounts correctly', () => {
      const result = formatCurrency(-500000);
      expect(result).toMatch(/-500\.000[\s\u00a0]*(₫|đ)/);
    });
  });

  describe('formatCompactNumber()', () => {
    it('should format amounts >= 1 billion with "tỷ" and 1 decimal place', () => {
      expect(formatCompactNumber(1_000_000_000)).toBe('1.0 tỷ');
      expect(formatCompactNumber(2_500_000_000)).toBe('2.5 tỷ');
      expect(formatCompactNumber(10_250_000_000)).toBe('10.3 tỷ');
    });

    it('should format amounts >= 1 million and < 1 billion with "triệu" without decimals', () => {
      expect(formatCompactNumber(1_000_000)).toBe('1 triệu');
      expect(formatCompactNumber(250_000_000)).toBe('250 triệu');
      expect(formatCompactNumber(999_999_999)).toBe('1000 triệu');
    });

    it('should fall back to formatCurrency for amounts < 1 million', () => {
      const result = formatCompactNumber(500_000);
      expect(result).toMatch(/500\.000[\s\u00a0]*(₫|đ)/);

      const zeroResult = formatCompactNumber(0);
      expect(zeroResult).toMatch(/0[\s\u00a0]*(₫|đ)/);
    });
  });

  describe('calculateCompanyCost()', () => {
    const mockCompanyWithZeroFee = {
      id: 'test-zero',
      shortName: 'ZeroSec',
      name: 'Chứng khoán Zero Phí',
      brandColor: '#00c389',
      accountOpeningUrl: 'https://example.com/open',
      referralCode: 'REF123',
      tradingFee: {
        onlineMin: 0.10,
        zeroFeeOffer: true
      },
      margin: {
        baseRate: 12.0,
        promoRate: 8.0,
        interestFreeDays: 0
      }
    };

    const mockCompanyWithoutZeroFee = {
      id: 'test-standard',
      shortName: 'StandardSec',
      name: 'Chứng khoán Standard',
      brandColor: '#004880',
      accountOpeningUrl: 'https://standard.com/open',
      referralCode: 'STD456',
      tradingFee: {
        onlineMin: 0.15,
        zeroFeeOffer: false
      },
      margin: {
        baseRate: 11.5,
        promoRate: 9.0,
        interestFreeDays: 0
      }
    };

    const mockCompanyWithFreeDays = {
      id: 'test-freedays',
      shortName: 'FreeDaySec',
      name: 'Chứng khoán FreeDay',
      brandColor: '#00b14f',
      accountOpeningUrl: 'https://freeday.com/open',
      referralCode: null,
      tradingFee: {
        onlineMin: 0.0,
        zeroFeeOffer: true
      },
      margin: {
        baseRate: 10.0,
        promoRate: 6.0,
        interestFreeDays: 2
      }
    };

    it('should use default parameter values when params is empty', () => {
      const res = calculateCompanyCost(mockCompanyWithZeroFee, {});
      // Defaults: monthlyTradingVolume = 200_000_000, marginLoanAmount = 100_000_000, marginBorrowDays = 20, isNewAccount = true
      expect(res.isZeroFeeApplied).toBe(true);
      expect(res.effectiveFeeRate).toBe(0);
      expect(res.monthlyTradingFee).toBe(0);
      expect(res.effectiveMarginRate).toBe(8.0); // promoRate
      // 100_000_000 * 8% / 365 * 20
      const expectedMargin = (100_000_000 * 0.08 / 365) * 20;
      expect(res.monthlyMarginInterest).toBeCloseTo(expectedMargin, 4);
      expect(res.totalMonthlyCost).toBeCloseTo(expectedMargin, 4);
      expect(res.totalAnnualCost).toBeCloseTo(expectedMargin * 12, 4);
    });

    it('should apply 0% fee when isNewAccount is true and zeroFeeOffer is true', () => {
      const res = calculateCompanyCost(mockCompanyWithZeroFee, {
        monthlyTradingVolume: 500_000_000,
        marginLoanAmount: 0,
        marginBorrowDays: 0,
        isNewAccount: true
      });
      expect(res.isZeroFeeApplied).toBe(true);
      expect(res.effectiveFeeRate).toBe(0);
      expect(res.monthlyTradingFee).toBe(0);
      expect(res.totalMonthlyCost).toBe(0);
    });

    it('should charge base fee when isNewAccount is false and company has zeroFeeOffer with onlineMin > 0', () => {
      const res = calculateCompanyCost(mockCompanyWithZeroFee, {
        monthlyTradingVolume: 500_000_000,
        marginLoanAmount: 0,
        marginBorrowDays: 0,
        isNewAccount: false
      });
      expect(res.isZeroFeeApplied).toBe(false);
      expect(res.effectiveFeeRate).toBe(0.10);
      expect(res.monthlyTradingFee).toBe(500_000_000 * 0.001); // 500,000
    });

    it('should keep 0% fee even if isNewAccount is false when onlineMin is 0 (permanent zero fee)', () => {
      const res = calculateCompanyCost(mockCompanyWithFreeDays, {
        monthlyTradingVolume: 300_000_000,
        marginLoanAmount: 0,
        marginBorrowDays: 0,
        isNewAccount: false
      });
      expect(res.isZeroFeeApplied).toBe(true);
      expect(res.effectiveFeeRate).toBe(0);
      expect(res.monthlyTradingFee).toBe(0);
    });

    it('should use baseRate when isNewAccount is false if medianRate is omitted', () => {
      const res = calculateCompanyCost(mockCompanyWithoutZeroFee, {
        monthlyTradingVolume: 100_000_000,
        marginLoanAmount: 200_000_000,
        marginBorrowDays: 15,
        isNewAccount: false
      });
      expect(res.effectiveMarginRate).toBe(11.5);
      const expectedInterest = (200_000_000 * 0.115 / 365) * 15;
      expect(res.monthlyMarginInterest).toBeCloseTo(expectedInterest, 4);
    });

    it('should use medianRate when isNewAccount is false if medianRate is defined', () => {
      const companyWithMedian = {
        ...mockCompanyWithoutZeroFee,
        margin: {
          ...mockCompanyWithoutZeroFee.margin,
          minRate: 8.0,
          maxRate: 13.0,
          medianRate: 10.5
        }
      };
      const res = calculateCompanyCost(companyWithMedian, {
        monthlyTradingVolume: 100_000_000,
        marginLoanAmount: 200_000_000,
        marginBorrowDays: 15,
        isNewAccount: false
      });
      expect(res.effectiveMarginRate).toBe(10.5);
      expect(res.marginMinRate).toBe(8.0);
      expect(res.marginMaxRate).toBe(13.0);
      expect(res.marginMedianRate).toBe(10.5);
    });

    it('should deduct interestFreeDays from marginBorrowDays', () => {
      const res = calculateCompanyCost(mockCompanyWithFreeDays, {
        monthlyTradingVolume: 100_000_000,
        marginLoanAmount: 100_000_000,
        marginBorrowDays: 10,
        isNewAccount: true
      });
      // interestFreeDays = 2, billableDays = 10 - 2 = 8
      const expectedInterest = (100_000_000 * 0.06 / 365) * 8;
      expect(res.monthlyMarginInterest).toBeCloseTo(expectedInterest, 4);
    });

    it('should handle edge case where marginBorrowDays <= interestFreeDays (0 interest)', () => {
      const res = calculateCompanyCost(mockCompanyWithFreeDays, {
        monthlyTradingVolume: 100_000_000,
        marginLoanAmount: 100_000_000,
        marginBorrowDays: 2,
        isNewAccount: true
      });
      expect(res.monthlyMarginInterest).toBe(0);

      const resLess = calculateCompanyCost(mockCompanyWithFreeDays, {
        monthlyTradingVolume: 100_000_000,
        marginLoanAmount: 100_000_000,
        marginBorrowDays: 1,
        isNewAccount: true
      });
      expect(resLess.monthlyMarginInterest).toBe(0);
    });

    it('should handle edge case: 0 loan amount, 0 borrow days, 0 volume', () => {
      const res = calculateCompanyCost(mockCompanyWithoutZeroFee, {
        monthlyTradingVolume: 0,
        marginLoanAmount: 0,
        marginBorrowDays: 0,
        isNewAccount: true
      });
      expect(res.monthlyTradingFee).toBe(0);
      expect(res.monthlyMarginInterest).toBe(0);
      expect(res.totalMonthlyCost).toBe(0);
      expect(res.totalAnnualCost).toBe(0);
    });

    it('should handle margin borrow days exceeding 30 days (e.g. 60 or 90 days)', () => {
      const res = calculateCompanyCost(mockCompanyWithoutZeroFee, {
        monthlyTradingVolume: 100_000_000,
        marginLoanAmount: 100_000_000,
        marginBorrowDays: 60,
        isNewAccount: false
      });
      const expectedInterest = (100_000_000 * 0.115 / 365) * 60;
      expect(res.monthlyMarginInterest).toBeCloseTo(expectedInterest, 4);
    });

    it('should handle high volume and large loans (tens of billions VND)', () => {
      const res = calculateCompanyCost(mockCompanyWithoutZeroFee, {
        monthlyTradingVolume: 50_000_000_000,
        marginLoanAmount: 30_000_000_000,
        marginBorrowDays: 25,
        isNewAccount: false
      });
      const expectedTradingFee = 50_000_000_000 * (0.15 / 100); // 75,000,000
      const expectedInterest = (30_000_000_000 * 0.115 / 365) * 25;
      expect(res.monthlyTradingFee).toBeCloseTo(expectedTradingFee, 2);
      expect(res.monthlyMarginInterest).toBeCloseTo(expectedInterest, 2);
      expect(res.totalMonthlyCost).toBeCloseTo(expectedTradingFee + expectedInterest, 2);
      expect(res.totalAnnualCost).toBeCloseTo((expectedTradingFee + expectedInterest) * 12, 2);
    });

    it('should return all required company metadata in output', () => {
      const res = calculateCompanyCost(mockCompanyWithZeroFee, {
        monthlyTradingVolume: 100_000_000,
        marginLoanAmount: 50_000_000,
        marginBorrowDays: 10,
        isNewAccount: true
      });
      expect(res.companyId).toBe(mockCompanyWithZeroFee.id);
      expect(res.companyName).toBe(mockCompanyWithZeroFee.shortName);
      expect(res.fullName).toBe(mockCompanyWithZeroFee.name);
      expect(res.brandColor).toBe(mockCompanyWithZeroFee.brandColor);
      expect(res.accountOpeningUrl).toBe(mockCompanyWithZeroFee.accountOpeningUrl);
      expect(res.referralCode).toBe(mockCompanyWithZeroFee.referralCode);
    });
  });

  describe('rankCompaniesByCost()', () => {
    it('should rank companies from lowest to highest total monthly cost', () => {
      const params = {
        monthlyTradingVolume: 300_000_000,
        marginLoanAmount: 150_000_000,
        marginBorrowDays: 20,
        isNewAccount: true
      };

      const ranked = rankCompaniesByCost(SECURITIES_COMPANIES, params);
      expect(ranked.length).toBe(SECURITIES_COMPANIES.length);

      for (let i = 0; i < ranked.length - 1; i++) {
        expect(ranked[i].totalMonthlyCost).toBeLessThanOrEqual(ranked[i + 1].totalMonthlyCost);
        expect(ranked[i].rank).toBe(i + 1);
      }
      expect(ranked[ranked.length - 1].rank).toBe(ranked.length);
    });

    it('should correctly calculate market benchmark and savings', () => {
      const params = {
        monthlyTradingVolume: 200_000_000,
        marginLoanAmount: 100_000_000,
        marginBorrowDays: 20,
        isNewAccount: true
      };

      // Benchmark: Fee 0.15% + Margin 12.5%/365 * 20
      const expectedBenchmarkFee = 200_000_000 * 0.0015;
      const expectedBenchmarkMargin = (100_000_000 * 0.125 / 365) * 20;
      const expectedBenchmarkTotal = expectedBenchmarkFee + expectedBenchmarkMargin;

      const ranked = rankCompaniesByCost(SECURITIES_COMPANIES, params);

      ranked.forEach((company) => {
        expect(company.benchmarkTotalMonthly).toBeCloseTo(expectedBenchmarkTotal, 4);

        if (company.totalMonthlyCost < expectedBenchmarkTotal) {
          expect(company.monthlySavings).toBeCloseTo(expectedBenchmarkTotal - company.totalMonthlyCost, 4);
          expect(company.annualSavings).toBeCloseTo((expectedBenchmarkTotal - company.totalMonthlyCost) * 12, 4);
        } else {
          expect(company.monthlySavings).toBe(0);
          expect(company.annualSavings).toBe(0);
        }
      });
    });

    it('should handle zero volume and zero margin in ranking', () => {
      const params = {
        monthlyTradingVolume: 0,
        marginLoanAmount: 0,
        marginBorrowDays: 0,
        isNewAccount: true
      };

      const ranked = rankCompaniesByCost(SECURITIES_COMPANIES, params);
      expect(ranked.length).toBe(SECURITIES_COMPANIES.length);
      ranked.forEach((item) => {
        expect(item.totalMonthlyCost).toBe(0);
        expect(item.monthlySavings).toBe(0);
        expect(item.annualSavings).toBe(0);
      });
    });
  });

  describe('Banner Selection Helpers', () => {
    const params = {
      monthlyTradingVolume: 200_000_000,
      marginLoanAmount: 100_000_000,
      marginBorrowDays: 20,
      isNewAccount: true
    };
    const ranked = rankCompaniesByCost(SECURITIES_COMPANIES, params);

    describe('getLowestFeeCompany()', () => {
      it('should return company with 0 trading fee when Zero-Fee offer is active', () => {
        const lowestFee = getLowestFeeCompany(ranked);
        expect(lowestFee).toBeDefined();
        expect(lowestFee.monthlyTradingFee).toBe(0);
        expect(lowestFee.isZeroFeeApplied).toBe(true);
      });

      it('should return null for null or empty list', () => {
        expect(getLowestFeeCompany(null)).toBeNull();
        expect(getLowestFeeCompany([])).toBeNull();
      });
    });

    describe('getLowestInterestCompany()', () => {
      it('should return company with lowest margin interest when loan > 0', () => {
        const lowestInterest = getLowestInterestCompany(ranked, 100_000_000);
        expect(lowestInterest).toBeDefined();
        expect(lowestInterest.monthlyMarginInterest).toBeLessThanOrEqual(ranked[ranked.length - 1].monthlyMarginInterest);
        // DNSE offers 5.99% promo or lowest interest
        expect(lowestInterest.effectiveMarginRate).toBeLessThanOrEqual(8.0);
      });

      it('should return company with lowest effective rate when margin loan = 0', () => {
        const lowestInterestNoLoan = getLowestInterestCompany(ranked, 0);
        expect(lowestInterestNoLoan).toBeDefined();
        // Lowest promo margin rate among companies (DNSE 5.99%, BSC 7.5%, Kafi 7.8%)
        expect(lowestInterestNoLoan.effectiveMarginRate).toBeLessThanOrEqual(8.0);
      });

      it('should return null for null or empty list', () => {
        expect(getLowestInterestCompany(null)).toBeNull();
        expect(getLowestInterestCompany([])).toBeNull();
      });
    });

    describe('sortCompaniesByCriterion()', () => {
      it('should sort by lowest_total by default', () => {
        const sorted = sortCompaniesByCriterion(ranked, 'lowest_total', 100_000_000);
        expect(sorted[0].totalMonthlyCost).toBeLessThanOrEqual(sorted[1].totalMonthlyCost);
        expect(sorted[sorted.length - 1].totalMonthlyCost).toBeGreaterThanOrEqual(sorted[0].totalMonthlyCost);
      });

      it('should sort by lowest_fee when selected', () => {
        const sorted = sortCompaniesByCriterion(ranked, 'lowest_fee', 100_000_000);
        expect(sorted[0].monthlyTradingFee).toBe(0);
        for (let i = 0; i < sorted.length - 1; i++) {
          expect(sorted[i].monthlyTradingFee).toBeLessThanOrEqual(sorted[i + 1].monthlyTradingFee);
        }
      });

      it('should sort by lowest_interest when selected', () => {
        const sorted = sortCompaniesByCriterion(ranked, 'lowest_interest', 100_000_000);
        for (let i = 0; i < sorted.length - 1; i++) {
          expect(sorted[i].monthlyMarginInterest).toBeLessThanOrEqual(sorted[i + 1].monthlyMarginInterest);
        }
      });

      it('should not mutate the original ranked array', () => {
        const originalFirst = ranked[0].companyId;
        const sortedFee = sortCompaniesByCriterion(ranked, 'lowest_fee', 100_000_000);
        expect(ranked[0].companyId).toBe(originalFirst);
        expect(Array.isArray(sortedFee)).toBe(true);
      });
    });
  });

  describe('BSC Priority Tie-Breaker Suite', () => {
    it('should prioritize BSC when trading fee is tied', () => {
      const tiedResults = [
        { companyId: 'company-x', companyName: 'Company X', monthlyTradingFee: 160000, effectiveFeeRate: 0.08, totalMonthlyCost: 500000 },
        { companyId: 'bsc', companyName: 'BSC', monthlyTradingFee: 160000, effectiveFeeRate: 0.08, totalMonthlyCost: 500000 }
      ];
      const lowest = getLowestFeeCompany(tiedResults);
      expect(lowest.companyId).toBe('bsc');

      const sorted = sortCompaniesByCriterion(tiedResults, 'lowest_fee', 0);
      expect(sorted[0].companyId).toBe('bsc');
    });

    it('should prioritize BSC when margin interest is tied', () => {
      const tiedResults = [
        { companyId: 'company-y', companyName: 'Company Y', monthlyMarginInterest: 300000, effectiveMarginRate: 10.5, totalMonthlyCost: 600000 },
        { companyId: 'bsc', companyName: 'BSC', monthlyMarginInterest: 300000, effectiveMarginRate: 10.5, totalMonthlyCost: 600000 }
      ];
      const lowest = getLowestInterestCompany(tiedResults, 100_000_000);
      expect(lowest.companyId).toBe('bsc');

      const sorted = sortCompaniesByCriterion(tiedResults, 'lowest_interest', 100_000_000);
      expect(sorted[0].companyId).toBe('bsc');
    });

    it('should prioritize BSC when total monthly cost is tied', () => {
      const tiedResults = [
        { companyId: 'company-z', companyName: 'Company Z', totalMonthlyCost: 450000 },
        { companyId: 'bsc', companyName: 'BSC', totalMonthlyCost: 450000 }
      ];
      const sorted = sortCompaniesByCriterion(tiedResults, 'lowest_total');
      expect(sorted[0].companyId).toBe('bsc');
    });
  });
});

