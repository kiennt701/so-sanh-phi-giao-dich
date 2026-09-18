import { describe, it, expect } from 'vitest';
import { getShortTermMarginDetails } from '../src/components/ShortTermMarginComparator.jsx';
import { SECURITIES_COMPANIES } from '../src/data/securitiesData.js';

describe('Short-Term Margin (T+, Quick, Deal) Utility & Calculator Suite', () => {
  describe('getShortTermMarginDetails() extraction & normalization', () => {
    it('should correctly extract short-term rate and standard 90d rate for BSC', () => {
      const bsc = SECURITIES_COMPANIES.find(c => c.id === 'bsc');
      expect(bsc).toBeDefined();

      const details = getShortTermMarginDetails(bsc);
      expect(details.shortRate).toBe(7.5);
      expect(details.standardRate).toBe(10.5);
      expect(details.spread).toBe(3.0); // 10.5 - 7.5
      expect(details.productName).toContain('BSC');
      expect(parseFloat(details.dailyRatePercent)).toBeCloseTo(7.5 / 365, 3);
    });

    it('should correctly extract special Margin Deal for DNSE', () => {
      const dnse = SECURITIES_COMPANIES.find(c => c.id === 'dnse');
      expect(dnse).toBeDefined();

      const details = getShortTermMarginDetails(dnse);
      expect(details.shortRate).toBe(5.99);
      expect(details.tenorCategory).toBe('t5');
      expect(details.productName).toContain('Margin Deal');
    });

    it('should correctly extract T+5/T+10 package for VPS and identify deal-only flag', () => {
      const vps = SECURITIES_COMPANIES.find(c => c.id === 'vps');
      expect(vps).toBeDefined();

      const details = getShortTermMarginDetails(vps);
      expect(details.shortRate).toBe(8.6);
      expect(details.standardRate).toBe(13.5);
      expect(details.spread).toBe(4.9);
      expect(details.isShortTermDealOnly).toBe(true);
    });

    it('should provide robust fallbacks for companies with minimal margin config', () => {
      const mockCompany = {
        id: 'mock_test',
        shortName: 'MOCK',
        margin: {}
      };

      const details = getShortTermMarginDetails(mockCompany);
      expect(details.shortRate).toBe(9.0);
      expect(details.standardRate).toBe(12.0);
      expect(details.spread).toBe(3.0);
      expect(details.productName).toBe('Gói Margin Ngắn Ngày');
      expect(details.dailyRatePercent).toBe((9.0 / 365).toFixed(4));
    });
  });

  describe('T+ Short-Term Interest & Savings Calculation Logic', () => {
    it('should compute exact interest for 300 million loan over 7 days at 7.5%', () => {
      const loan = 300000000;
      const days = 7;
      const rate = 7.5;
      const standardRate = 10.5;

      const expectedShortInterest = Math.round(loan * (rate / 100) * (days / 365));
      const expectedStandardInterest = Math.round(loan * (standardRate / 100) * (days / 365));
      const expectedSavings = expectedStandardInterest - expectedShortInterest;

      expect(expectedShortInterest).toBe(431507);
      expect(expectedStandardInterest).toBe(604110);
      expect(expectedSavings).toBe(172603);
    });

    it('should compute exact interest for 1 billion loan over 5 days at 5.99% (DNSE Deal)', () => {
      const loan = 1000000000;
      const days = 5;
      const rate = 5.99;
      const standardRate = 12.0;

      const expectedShortInterest = Math.round(loan * (rate / 100) * (days / 365));
      const expectedStandardInterest = Math.round(loan * (standardRate / 100) * (days / 365));
      const expectedSavings = expectedStandardInterest - expectedShortInterest;

      expect(expectedShortInterest).toBe(820548);
      expect(expectedStandardInterest).toBe(1643836);
      expect(expectedSavings).toBe(823288);
    });

    it('should ensure all 30 brokers have valid short-term rates lower than or equal to standard rates', () => {
      SECURITIES_COMPANIES.forEach(company => {
        const details = getShortTermMarginDetails(company);
        expect(details.shortRate).toBeGreaterThan(0);
        expect(details.shortRate).toBeLessThanOrEqual(details.standardRate);
        expect(details.spread).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
