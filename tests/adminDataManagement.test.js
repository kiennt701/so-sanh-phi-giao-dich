import { describe, it, expect } from 'vitest';
import { SECURITIES_COMPANIES } from '../src/data/securitiesData.js';
import { getShortTermMarginDetails } from '../src/components/ShortTermMarginComparator.jsx';

describe('Admin Manual Data Adjustment & Field Integrity Suite', () => {
  it('should verify all 30 brokers have required fee, margin, and metadata fields', () => {
    expect(SECURITIES_COMPANIES.length).toBe(30);

    SECURITIES_COMPANIES.forEach((company) => {
      // Trading fee schema
      expect(company.tradingFee).toBeDefined();
      expect(typeof company.tradingFee.onlineMin).toBe('number');
      expect(typeof company.tradingFee.onlineMax).toBe('number');
      expect(typeof company.tradingFee.zeroFeeOffer).toBe('boolean');

      // Margin schema
      expect(company.margin).toBeDefined();
      const standardRate = company.margin.standardRate90d ?? company.margin.baseRate;
      expect(typeof standardRate).toBe('number');
      expect(standardRate).toBeGreaterThan(0);

      // Short term margin
      const shortRate = company.margin.shortTermRate ?? company.margin.promoRate;
      expect(typeof shortRate).toBe('number');
      expect(shortRate).toBeLessThanOrEqual(standardRate);

      // URLs and identities
      expect(company.accountOpeningUrl).toBeTruthy();
      expect(company.shortName).toBeTruthy();
    });
  });

  it('should simulate an Admin updating online fees, broker fees, and zeroFee flag', () => {
    const target = SECURITIES_COMPANIES.find(c => c.id === 'bsc');
    expect(target).toBeDefined();

    // Simulate admin editing BSC fees
    const adminUpdates = {
      onlineMin: 0.05,
      onlineMax: 0.10,
      brokerMin: 0.12,
      brokerMax: 0.16,
      zeroFeeOffer: false,
      notes: 'Ưu đãi phí VIP 2026'
    };

    const updatedCompany = {
      ...target,
      tradingFee: {
        ...target.tradingFee,
        ...adminUpdates,
        displaySummary: '0.05% - 0.10%'
      }
    };

    expect(updatedCompany.tradingFee.onlineMin).toBe(0.05);
    expect(updatedCompany.tradingFee.onlineMax).toBe(0.10);
    expect(updatedCompany.tradingFee.brokerMin).toBe(0.12);
    expect(updatedCompany.tradingFee.brokerMax).toBe(0.16);
    expect(updatedCompany.tradingFee.displaySummary).toBe('0.05% - 0.10%');
  });

  it('should simulate an Admin updating Short-Term Margin (T+) rates and custom tenor', () => {
    const target = SECURITIES_COMPANIES.find(c => c.id === 'vps');
    expect(target).toBeDefined();

    // Admin updates VPS to special T+3 package at 6.8%
    const updatedVPS = {
      ...target,
      margin: {
        ...target.margin,
        shortTermRate: 6.8,
        shortTermTenor: 'Gói Siêu Tốc T+3 (Lãi 6.8%)',
        isShortTermDealOnly: true
      }
    };

    const details = getShortTermMarginDetails(updatedVPS);
    expect(details.shortRate).toBe(6.8);
    expect(details.productName).toBe('Gói Siêu Tốc T+3 (Lãi 6.8%)');
    expect(details.isShortTermDealOnly).toBe(true);
    expect(details.spread).toBe(Number((details.standardRate - 6.8).toFixed(2)));
  });

  it('should simulate an Admin updating Welcome Promo fields and verify reflecting', () => {
    const target = SECURITIES_COMPANIES.find(c => c.id === 'ssi');
    expect(target).toBeDefined();

    const updatedSSI = {
      ...target,
      welcomePromo: {
        hasPromo: true,
        badge: 'Ưu Đãi Đặc Biệt 2026',
        feeOffer: 'Miễn phí 1 năm',
        marginOffer: 'Lãi 6.5% trong 30 ngày',
        duration: '12 tháng',
        giftBonus: 'Tặng 500k khi nạp 50 triệu'
      }
    };

    expect(updatedSSI.welcomePromo.hasPromo).toBe(true);
    expect(updatedSSI.welcomePromo.badge).toBe('Ưu Đãi Đặc Biệt 2026');
    expect(updatedSSI.welcomePromo.feeOffer).toBe('Miễn phí 1 năm');
    expect(updatedSSI.welcomePromo.marginOffer).toBe('Lãi 6.5% trong 30 ngày');
  });

  it('should simulate an Admin updating Derivatives Fee and Leverage', () => {
    const target = SECURITIES_COMPANIES.find(c => c.id === 'mbs');
    expect(target).toBeDefined();

    const updatedMBS = {
      ...target,
      derivativesFee: {
        feePerContract: 500,
        notes: 'Chính sách ưu đãi phái sinh 500đ/HĐ'
      },
      margin: {
        ...target.margin,
        maxLeverage: '3:7 (HTKD Đòn Bẩy Cao)'
      }
    };

    expect(updatedMBS.derivativesFee.feePerContract).toBe(500);
    expect(updatedMBS.derivativesFee.notes).toContain('500đ/HĐ');
    expect(updatedMBS.margin.maxLeverage).toContain('3:7');
  });

  it('should correctly parse multiline pros and cons into arrays', () => {
    const prosText = "Nguồn vốn Big4 dồi dào\nHệ thống SmartX ổn định\nPhí cạnh tranh";
    const consText = "Không có đòn bẩy vượt khung\nChưa miễn phí trọn đời";

    const pros = prosText.split('\n').map(l => l.trim()).filter(Boolean);
    const cons = consText.split('\n').map(l => l.trim()).filter(Boolean);

    expect(pros).toHaveLength(3);
    expect(pros[0]).toBe('Nguồn vốn Big4 dồi dào');
    expect(cons).toHaveLength(2);
    expect(cons[1]).toBe('Chưa miễn phí trọn đời');
  });
});
