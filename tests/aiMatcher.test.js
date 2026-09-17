import { describe, it, expect } from 'vitest';
import { AI_PERSONAS, calculateAIMatch, getTopAIRecommendations } from '../src/utils/aiMatcher';
import { SECURITIES_COMPANIES } from '../src/data/securitiesData';

describe('AI Advisor Matching Algorithm (aiMatcher.js)', () => {
  it('định nghĩa đầy đủ 4 personas với thông tin chuẩn hóa', () => {
    expect(AI_PERSONAS).toHaveLength(4);
    const personaIds = AI_PERSONAS.map(p => p.id);
    expect(personaIds).toContain('day_trader');
    expect(personaIds).toContain('f0_investor');
    expect(personaIds).toContain('safe_wealth');
    expect(personaIds).toContain('vip_growth');

    AI_PERSONAS.forEach(p => {
      expect(p.title).toBeTruthy();
      expect(p.subtitle).toBeTruthy();
      expect(p.description).toBeTruthy();
    });
  });

  it('calculateAIMatch trả về điểm số từ 70 đến 99 và câu nhận định hợp lý', () => {
    const bsc = SECURITIES_COMPANIES.find(c => c.id === 'bsc');
    expect(bsc).toBeDefined();

    const match = calculateAIMatch(bsc, 'safe_wealth');
    expect(match.score).toBeGreaterThanOrEqual(70);
    expect(match.score).toBeLessThanOrEqual(99);
    expect(typeof match.aiReason).toBe('string');
    expect(match.aiReason.length).toBeGreaterThan(10);
    expect(Array.isArray(match.keyHighlights)).toBe(true);
  });

  it('đánh giá điểm cao cho các CTCK Zero-Fee đối với persona day_trader', () => {
    const tcbs = SECURITIES_COMPANIES.find(c => c.id === 'tcbs');
    const dnse = SECURITIES_COMPANIES.find(c => c.id === 'dnse');
    expect(tcbs).toBeDefined();
    expect(dnse).toBeDefined();

    const matchTcbs = calculateAIMatch(tcbs, 'day_trader');
    const matchDnse = calculateAIMatch(dnse, 'day_trader');

    expect(matchTcbs.score).toBeGreaterThanOrEqual(90);
    expect(matchDnse.score).toBeGreaterThanOrEqual(88);
    expect(matchTcbs.aiReason).toContain('phí giao dịch');
  });

  it('đánh giá điểm cao nhất cho BSC đối với persona safe_wealth (ngân hàng mẹ BIDV)', () => {
    const bsc = SECURITIES_COMPANIES.find(c => c.id === 'bsc');
    const match = calculateAIMatch(bsc, 'safe_wealth');

    expect(match.score).toBeGreaterThanOrEqual(92);
    expect(match.keyHighlights).toContain('Trực thuộc BIDV');
  });

  it('đánh giá điểm cao cho SSI và BSC đối với persona vip_growth', () => {
    const bsc = SECURITIES_COMPANIES.find(c => c.id === 'bsc');
    const ssi = SECURITIES_COMPANIES.find(c => c.id === 'ssi');

    const matchBsc = calculateAIMatch(bsc, 'vip_growth');
    const matchSsi = calculateAIMatch(ssi, 'vip_growth');

    expect(matchBsc.score).toBeGreaterThanOrEqual(88);
    expect(matchSsi.score).toBeGreaterThanOrEqual(85);
  });

  it('getTopAIRecommendations trả về danh sách được sắp xếp giảm dần theo điểm match', () => {
    const top3 = getTopAIRecommendations(SECURITIES_COMPANIES, 'day_trader', 3);
    expect(top3).toHaveLength(3);

    expect(top3[0].aiMatchScore).toBeGreaterThanOrEqual(top3[1].aiMatchScore);
    expect(top3[1].aiMatchScore).toBeGreaterThanOrEqual(top3[2].aiMatchScore);

    top3.forEach(c => {
      expect(c.aiMatchScore).toBeGreaterThanOrEqual(70);
      expect(c.aiReason).toBeTruthy();
      expect(Array.isArray(c.keyHighlights)).toBe(true);
    });
  });

  it('ưu tiên đề xuất BSC lên trước khi các công ty có cùng điểm AI Match', () => {
    const mockCompaniesWithTie = [
      { id: 'other-broker', shortName: 'OtherSec', tradingFee: { onlineMin: 0.1, onlineMax: 0.15 }, margin: { promoRate: 9, maxLeverage: '1:1' } },
      { id: 'bsc', shortName: 'BSC', tradingFee: { onlineMin: 0.08, onlineMax: 0.13 }, margin: { promoRate: 7.5, maxLeverage: '1:1' }, bankBacked: 'BIDV' }
    ];
    const top = getTopAIRecommendations(mockCompaniesWithTie, 'safe_wealth', 2);
    expect(top[0].id).toBe('bsc');
  });
});
