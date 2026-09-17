import { describe, it, expect } from 'vitest';
import { SECURITIES_COMPANIES, FILTER_CATEGORIES } from '../src/data/securitiesData.js';

describe('Securities Data Integrity & Anti-Hallucination Suite', () => {
  it('should contain exactly 30 securities companies', () => {
    expect(Array.isArray(SECURITIES_COMPANIES)).toBe(true);
    expect(SECURITIES_COMPANIES).toHaveLength(30);
  });

  it('should have unique and valid IDs for all companies', () => {
    const ids = SECURITIES_COMPANIES.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(SECURITIES_COMPANIES.length);

    SECURITIES_COMPANIES.forEach(company => {
      expect(typeof company.id).toBe('string');
      expect(company.id.trim()).not.toBe('');
      expect(company.id).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it('should have valid basic identity fields (name, shortName, brandColor)', () => {
    SECURITIES_COMPANIES.forEach(company => {
      expect(typeof company.name).toBe('string');
      expect(company.name.trim().length).toBeGreaterThan(0);

      expect(typeof company.shortName).toBe('string');
      expect(company.shortName.trim().length).toBeGreaterThan(0);

      // Valid HEX color code
      expect(company.brandColor).toMatch(/^#[0-9a-fA-F]{6}$/);

      expect(typeof company.establishedYear).toBe('number');
      expect(company.establishedYear).toBeGreaterThanOrEqual(1990);
      expect(company.establishedYear).toBeLessThanOrEqual(2026);
    });
  });

  it('should have complete and valid trading fee structure', () => {
    SECURITIES_COMPANIES.forEach(company => {
      const { tradingFee } = company;
      expect(tradingFee).toBeDefined();

      expect(typeof tradingFee.onlineMin).toBe('number');
      expect(tradingFee.onlineMin).toBeGreaterThanOrEqual(0);
      expect(tradingFee.onlineMin).toBeLessThanOrEqual(0.5);

      expect(typeof tradingFee.onlineMax).toBe('number');
      expect(tradingFee.onlineMax).toBeGreaterThanOrEqual(tradingFee.onlineMin);
      expect(tradingFee.onlineMax).toBeLessThanOrEqual(0.5);

      expect(typeof tradingFee.brokerMin).toBe('number');
      expect(tradingFee.brokerMin).toBeGreaterThanOrEqual(0);

      expect(typeof tradingFee.brokerMax).toBe('number');
      expect(tradingFee.brokerMax).toBeGreaterThanOrEqual(tradingFee.brokerMin);

      expect(typeof tradingFee.zeroFeeOffer).toBe('boolean');

      expect(typeof tradingFee.displaySummary).toBe('string');
      expect(tradingFee.displaySummary.trim().length).toBeGreaterThan(0);

      expect(typeof tradingFee.notes).toBe('string');
      expect(tradingFee.notes.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have complete and valid margin lending structure', () => {
    SECURITIES_COMPANIES.forEach(company => {
      const { margin } = company;
      expect(margin).toBeDefined();

      expect(typeof margin.baseRate).toBe('number');
      expect(margin.baseRate).toBeGreaterThan(0);
      expect(margin.baseRate).toBeLessThanOrEqual(20);

      expect(typeof margin.promoRate).toBe('number');
      expect(margin.promoRate).toBeGreaterThan(0);
      expect(margin.promoRate).toBeLessThanOrEqual(margin.baseRate);

      expect(typeof margin.promoDuration).toBe('string');
      expect(margin.promoDuration.trim().length).toBeGreaterThan(0);

      expect(typeof margin.maxLeverage).toBe('string');
      expect(margin.maxLeverage.trim().length).toBeGreaterThan(0);

      expect(typeof margin.interestFreeDays).toBe('number');
      expect(margin.interestFreeDays).toBeGreaterThanOrEqual(0);

      expect(typeof margin.notes).toBe('string');
      expect(margin.notes.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have complete and valid minRate, maxRate, and medianRate for margin lending', () => {
    SECURITIES_COMPANIES.forEach(company => {
      const { margin } = company;
      expect(typeof margin.minRate).toBe('number');
      expect(typeof margin.maxRate).toBe('number');
      expect(typeof margin.medianRate).toBe('number');

      expect(margin.minRate).toBeGreaterThan(0);
      expect(margin.maxRate).toBeGreaterThanOrEqual(margin.minRate);
      expect(margin.medianRate).toBeGreaterThanOrEqual(margin.minRate);
      expect(margin.medianRate).toBeLessThanOrEqual(margin.maxRate);
    });
  });

  it('should clearly distinguish standard 90-day rate and short-term rate for all companies', () => {
    SECURITIES_COMPANIES.forEach(company => {
      const { margin } = company;
      expect(typeof margin.shortTermRate).toBe('number');
      expect(margin.shortTermRate).toBeGreaterThan(0);
      expect(typeof margin.shortTermTenor).toBe('string');
      expect(margin.shortTermTenor.trim().length).toBeGreaterThan(0);

      expect(typeof margin.standardRate90d).toBe('number');
      expect(margin.standardRate90d).toBeGreaterThanOrEqual(margin.shortTermRate);

      expect(typeof margin.standardRateDisplay).toBe('string');
      expect(margin.standardRateDisplay.trim().length).toBeGreaterThan(0);
    });

    // Special validation for DNSE and VPS holding constraints
    const dnse = SECURITIES_COMPANIES.find(c => c.id === 'dnse');
    expect(dnse.margin.shortTermRate).toBe(5.99);
    expect(dnse.margin.standardRate90d).toBe(12.5);
    expect(dnse.margin.isShortTermDealOnly).toBe(true);
    expect(dnse.margin.notes).toContain('5 ngày');

    const vps = SECURITIES_COMPANIES.find(c => c.id === 'vps');
    expect(vps.margin.shortTermRate).toBe(8.6);
    expect(vps.margin.standardRate90d).toBe(13.5);
    expect(vps.margin.isShortTermDealOnly).toBe(true);

    const bsc = SECURITIES_COMPANIES.find(c => c.id === 'bsc');
    expect(bsc.margin.shortTermRate).toBe(7.5);
    expect(bsc.margin.standardRate90d).toBe(10.5);
  });

  it('should configure BSC with recommended flag and valid margin rates', () => {
    const bsc = SECURITIES_COMPANIES.find(c => c.id === 'bsc');
    expect(bsc).toBeDefined();
    expect(bsc.isRecommended).toBe(true);
    expect(bsc.margin.minRate).toBe(7.5);
    expect(bsc.margin.maxRate).toBe(12.0);
    expect(bsc.margin.medianRate).toBe(10.5);
  });

  it('should have valid derivatives fee structure', () => {
    SECURITIES_COMPANIES.forEach(company => {
      const { derivativesFee } = company;
      expect(derivativesFee).toBeDefined();
      expect(typeof derivativesFee.feePerContract).toBe('number');
      expect(derivativesFee.feePerContract).toBeGreaterThanOrEqual(0);
      expect(typeof derivativesFee.notes).toBe('string');
      expect(derivativesFee.notes.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have valid qualitative content (pros, cons, promotions, platforms, suitableFor)', () => {
    SECURITIES_COMPANIES.forEach(company => {
      expect(Array.isArray(company.pros)).toBe(true);
      expect(company.pros.length).toBeGreaterThanOrEqual(1);
      company.pros.forEach(p => expect(p.trim().length).toBeGreaterThan(0));

      expect(Array.isArray(company.cons)).toBe(true);
      expect(company.cons.length).toBeGreaterThanOrEqual(1);
      company.cons.forEach(c => expect(c.trim().length).toBeGreaterThan(0));

      expect(Array.isArray(company.promotions)).toBe(true);
      expect(company.promotions.length).toBeGreaterThanOrEqual(1);
      company.promotions.forEach(pr => expect(pr.trim().length).toBeGreaterThan(0));

      expect(Array.isArray(company.platforms)).toBe(true);
      expect(company.platforms.length).toBeGreaterThanOrEqual(1);
      company.platforms.forEach(pl => expect(pl.trim().length).toBeGreaterThan(0));

      expect(typeof company.suitableFor).toBe('string');
      expect(company.suitableFor.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have valid HTTPS accountOpeningUrl for all companies without empty values', () => {
    SECURITIES_COMPANIES.forEach(company => {
      expect(typeof company.accountOpeningUrl).toBe('string');
      expect(company.accountOpeningUrl.trim()).not.toBe('');
      expect(company.accountOpeningUrl.startsWith('https://')).toBe(true);

      expect(() => new URL(company.accountOpeningUrl)).not.toThrow();
      const parsedUrl = new URL(company.accountOpeningUrl);
      expect(parsedUrl.protocol).toBe('https:');
      expect(parsedUrl.hostname.length).toBeGreaterThan(3);
    });
  });

  it('should have valid HTTPS sourceUrl for anti-hallucination verification', () => {
    SECURITIES_COMPANIES.forEach(company => {
      expect(typeof company.sourceUrl).toBe('string');
      expect(company.sourceUrl.trim()).not.toBe('');
      expect(company.sourceUrl.startsWith('https://')).toBe(true);

      expect(() => new URL(company.sourceUrl)).not.toThrow();
      const parsedUrl = new URL(company.sourceUrl);
      expect(parsedUrl.protocol).toBe('https:');
      expect(parsedUrl.hostname.length).toBeGreaterThan(3);
    });
  });

  it('should have valid lastUpdated ISO date format', () => {
    SECURITIES_COMPANIES.forEach(company => {
      expect(typeof company.lastUpdated).toBe('string');
      expect(company.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const parsedDate = new Date(company.lastUpdated);
      expect(isNaN(parsedDate.getTime())).toBe(false);
    });
  });

  it('should have valid FILTER_CATEGORIES consistent with company count', () => {
    expect(Array.isArray(FILTER_CATEGORIES)).toBe(true);
    expect(FILTER_CATEGORIES.length).toBeGreaterThan(0);

    const allFilter = FILTER_CATEGORIES.find(f => f.id === 'all');
    expect(allFilter).toBeDefined();
    expect(allFilter.count).toBe(SECURITIES_COMPANIES.length);

    FILTER_CATEGORIES.forEach(filter => {
      expect(typeof filter.id).toBe('string');
      expect(typeof filter.label).toBe('string');
    });
  });

  it('should have complete and valid welcomePromo structure for all companies', () => {
    SECURITIES_COMPANIES.forEach(company => {
      expect(company.welcomePromo).toBeDefined();
      expect(typeof company.welcomePromo.hasPromo).toBe('boolean');
      expect(company.welcomePromo.hasPromo).toBe(true);

      expect(typeof company.welcomePromo.badge).toBe('string');
      expect(company.welcomePromo.badge.trim().length).toBeGreaterThan(0);

      expect(typeof company.welcomePromo.feeOffer).toBe('string');
      expect(company.welcomePromo.feeOffer.trim().length).toBeGreaterThan(0);

      expect(typeof company.welcomePromo.marginOffer).toBe('string');
      expect(company.welcomePromo.marginOffer.trim().length).toBeGreaterThan(0);

      expect(typeof company.welcomePromo.duration).toBe('string');
      expect(company.welcomePromo.duration.trim().length).toBeGreaterThan(0);

      expect(typeof company.welcomePromo.giftBonus).toBe('string');
      expect(company.welcomePromo.giftBonus.trim().length).toBeGreaterThan(0);

      expect(typeof company.welcomePromo.note).toBe('string');
      expect(company.welcomePromo.note.trim().length).toBeGreaterThan(0);
    });
  });

  it('should only mark genuine permanent zero-fee for existing customers (TCBS & DNSE)', () => {
    const zeroFeeCompanies = SECURITIES_COMPANIES.filter(c => c.tradingFee.zeroFeeOffer);
    expect(zeroFeeCompanies.map(c => c.id).sort()).toEqual(['dnse', 'tcbs'].sort());

    zeroFeeCompanies.forEach(company => {
      expect(company.tradingFee.onlineMin).toBe(0);
      expect(company.tradingFee.onlineMax).toBe(0);
    });
  });

  it('should use the designated broker referral link for BSC account opening', () => {
    const bsc = SECURITIES_COMPANIES.find(c => c.id === 'bsc');
    expect(bsc).toBeDefined();
    expect(bsc.accountOpeningUrl).toBe('https://dangky.bsc.com.vn/moi-gioi?online=false&cif=4768');
  });

  it('should have complete and valid stockCode, listingExchange, and listingStatus', () => {
    SECURITIES_COMPANIES.forEach(company => {
      expect(typeof company.isListed).toBe('boolean');
      expect(typeof company.listingStatus).toBe('string');
      expect(company.listingStatus.trim().length).toBeGreaterThan(0);

      if (company.isListed) {
        expect(typeof company.stockCode).toBe('string');
        expect(company.stockCode).toMatch(/^[A-Z]{3}$/);
        expect(['HOSE', 'HNX', 'UPCoM']).toContain(company.listingExchange);
      } else {
        expect(company.stockCode).toBeNull();
        expect(company.listingExchange).toBeNull();
        expect(company.listingStatus.includes('Chưa niêm yết')).toBe(true);
      }

      if (company.parentStockCode) {
        expect(typeof company.parentStockCode).toBe('string');
      }
    });

    const bsc = SECURITIES_COMPANIES.find(c => c.id === 'bsc');
    expect(bsc.stockCode).toBe('BSI');
    expect(bsc.listingExchange).toBe('HOSE');
    expect(bsc.isListed).toBe(true);
    expect(bsc.parentStockCode).toBe('BID');
    expect(bsc.tradingFee.onlineMin).toBe(0.08);
    expect(bsc.margin.standardRate90d).toBe(10.5);

    const tcbs = SECURITIES_COMPANIES.find(c => c.id === 'tcbs');
    expect(tcbs.stockCode).toBe('TCX');
    expect(tcbs.listingExchange).toBe('HOSE');
    expect(tcbs.isListed).toBe(true);
    expect(tcbs.margin.standardRate90d).toBe(14.0);

    const vps = SECURITIES_COMPANIES.find(c => c.id === 'vps');
    expect(vps.stockCode).toBe('VCK');
    expect(vps.listingExchange).toBe('HOSE');
    expect(vps.isListed).toBe(true);
  });

  it('should validate scan-report.json covers all 30 brokers with source links and status', async () => {
    const scanReport = (await import('../scan-report.json')).default;
    expect(scanReport).toBeDefined();
    expect(scanReport.summary.total).toBe(30);
    expect(scanReport.brokers).toHaveLength(30);

    const brokerIds = scanReport.brokers.map(b => b.id);
    SECURITIES_COMPANIES.forEach(c => {
      expect(brokerIds).toContain(c.id);
    });

    scanReport.brokers.forEach(b => {
      expect(typeof b.id).toBe('string');
      expect(typeof b.name).toBe('string');
      expect(typeof b.url).toBe('string');
      expect(b.url).toMatch(/^https?:\/\//);
      expect(typeof b.isAccessible).toBe('boolean');

      if (!b.isAccessible) {
        expect(typeof b.unscannableReason).toBe('string');
        expect(b.unscannableReason.length).toBeGreaterThan(10);
        expect(typeof b.officialSource).toBe('string');
        expect(b.officialSource).toMatch(/^https?:\/\//);
      }
    });
  });

  it('should validate manualOverrides.json covers all 30 brokers with editable fields and audit notes', async () => {
    const manualOverrides = (await import('../src/data/manualOverrides.json')).default;
    expect(manualOverrides).toBeDefined();
    expect(manualOverrides.metadata.totalBrokers).toBe(30);
    expect(Object.keys(manualOverrides.overrides)).toHaveLength(30);
    expect(manualOverrides.auditBrokers).toHaveLength(30);

    SECURITIES_COMPANIES.forEach(c => {
      expect(manualOverrides.overrides[c.id]).toBeDefined();
      const override = manualOverrides.overrides[c.id];
      expect(override.tradingFee).toBeDefined();
      expect(typeof override.tradingFee.onlineMin).toBe('number');
      expect(override.margin).toBeDefined();
      expect(typeof override.margin.standardRate90d).toBe('number');
      expect(override.sourceUrl).toMatch(/^https?:\/\//);
    });
  });
});

