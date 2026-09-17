/**
 * THUẬT TOÁN ĐỀ XUẤT THÔNG MINH CỦA AI (AI ADVISOR MATCHING ENGINE)
 * Phân tích và chấm điểm độ phù hợp của các CTCK theo khẩu vị của từng nhà đầu tư.
 */

export const AI_PERSONAS = [
  {
    id: "day_trader",
    title: "⚡ Trader Lướt Sóng T+",
    subtitle: "Giao dịch thường xuyên, chuộng Zero-Fee & Margin T+ rẻ",
    description: "Tối ưu hóa từng đồng phí giao dịch và lãi margin ngắn hạn, cần đòn bẩy linh hoạt.",
    idealMetrics: { zeroFee: 40, lowMargin: 35, highLeverage: 15, appSpeed: 10 }
  },
  {
    id: "f0_investor",
    title: "🌱 Nhà Đầu Tư Mới (F0)",
    subtitle: "Vốn nhỏ đến vừa, cần app dễ dùng & ưu đãi mở mới",
    description: "Ưu tiên chính sách miễn phí ban đầu, thủ tục eKYC 3 phút và công cụ khuyến nghị dễ hiểu.",
    idealMetrics: { zeroFee: 35, welcomePromo: 30, easyApp: 25, lowMargin: 10 }
  },
  {
    id: "safe_wealth",
    title: "🛡️ Tích Sản An Toàn (Bank-Backed)",
    subtitle: "Coi trọng an toàn tài sản, bảo chứng ngân hàng mẹ",
    description: "Ưu tiên định chế tài chính vững mạnh (BIDV, Techcombank, VPBank), quản trị rủi ro chuẩn mực.",
    idealMetrics: { bankBacked: 45, researchQuality: 25, stability: 20, lowFee: 10 }
  },
  {
    id: "vip_growth",
    title: "💎 Khách Hàng VIP / NAV Lớn",
    subtitle: "Quy mô vốn từ 1 - 10 tỷ+, cần room margin khủng",
    description: "Ưu tiên hạn mức vay lớn, không bị cạn room mã thị trường, báo cáo vĩ mô chất lượng cao.",
    idealMetrics: { capitalScale: 40, lowMargin: 25, researchReport: 20, brokerSupport: 15 }
  }
];

/**
 * Tính điểm AI Match Score (70 - 99%) cho từng CTCK theo persona
 * @param {Object} company Thông tin CTCK
 * @param {string} personaId ID khẩu vị nhà đầu tư
 * @returns {Object} { score: number, aiReason: string, keyHighlights: string[] }
 */
export function calculateAIMatch(company, personaId = "day_trader") {
  let score = 75; // Điểm nền tảng
  let reasons = [];
  let keyHighlights = [];

  const isZeroFee = company.tradingFee.onlineMin === 0 || company.tradingFee.zeroFeeOffer;
  const isLowMargin = company.margin.promoRate <= 8.5;
  const isBankBacked = Boolean(company.bankBacked);
  const isHighLeverage = company.margin.maxLeverage.includes("3:7");

  switch (personaId) {
    case "day_trader":
      if (company.tradingFee.onlineMin === 0) {
        score += 12;
        reasons.push("Miễn 100% phí giao dịch trọn đời, tối đa hóa lợi nhuận vòng quay lệnh.");
        keyHighlights.push("0% Phí GD");
      } else if (company.tradingFee.onlineMin <= 0.08) {
        score += 11;
        reasons.push(`Phí giao dịch siêu ưu đãi chỉ ${company.tradingFee.onlineMin}%, rẻ nhất trong nhóm CTCK lớn có tư vấn.`);
        keyHighlights.push(`Phí ${company.tradingFee.onlineMin}%`);
      } else if (company.tradingFee.zeroFeeOffer) {
        score += 7;
        reasons.push("Có chương trình Zero-Fee mở mới giúp tiết kiệm chi phí ban đầu.");
      }

      if (company.margin.promoRate <= 7.5 || (company.margin.shortTermRate && company.margin.shortTermRate <= 7.5)) {
        score += 9;
        reasons.push(`Gói Margin T+ chỉ từ ${company.margin.shortTermRate || company.margin.promoRate}%/năm, tối ưu chi phí lướt sóng.`);
        keyHighlights.push(`Margin ${company.margin.shortTermRate || company.margin.promoRate}%`);
      } else if (isLowMargin) {
        score += 8;
        reasons.push(`Lãi Margin ưu đãi chỉ ${company.margin.promoRate}%/năm, rất rẻ cho các lệnh lướt sóng T+.`);
        keyHighlights.push(`Margin ${company.margin.promoRate}%`);
      }

      if (isHighLeverage) {
        score += 4;
        reasons.push("Hỗ trợ đòn bẩy 3:7 gia tăng sức mua linh hoạt.");
        keyHighlights.push("Đòn bẩy 3:7");
      }
      break;

    case "f0_investor":
      if (isZeroFee) {
        score += 10;
        reasons.push("Chính sách phí 0 đồng giúp bạn làm quen thị trường mà không sợ mất phí.");
        keyHighlights.push("Zero-Fee F0");
      } else if (company.tradingFee.onlineMin <= 0.08) {
        score += 9;
        reasons.push(`Phí ưu đãi mở mới chỉ ${company.tradingFee.onlineMin}%, kèm tư vấn 1-1 từ chuyên gia phân tích.`);
        keyHighlights.push(`Phí ${company.tradingFee.onlineMin}%`);
      }
      if (company.promotions && company.promotions.length >= 3) {
        score += 8;
        reasons.push("Nhiều chương trình khuyến mãi mở mới hấp dẫn và quà tặng.");
        keyHighlights.push("Nhiều Ưu Đãi");
      }
      if (company.id === "bsc" || company.id === "tcbs" || company.id === "vps") {
        score += 5;
        reasons.push("Ứng dụng di động thân thiện, luồng eKYC 3 phút cực kỳ tiện lợi.");
        keyHighlights.push("eKYC 3 Phút");
      }
      break;

    case "safe_wealth":
      if (isBankBacked) {
        score += 15;
        reasons.push(`Bảo chứng uy tín vững chắc từ Ngân hàng ${company.bankBacked}, an toàn định chế hàng đầu.`);
        keyHighlights.push(`Trực thuộc ${company.bankBacked}`);
      }
      if (company.id === "bsc") {
        score += 6;
        reasons.push("Cổ đông chiến lược Hana Securities (Hàn Quốc) gia tăng năng lực bảo mật và quản trị rủi ro.");
        keyHighlights.push("Chuẩn Quốc Tế");
      }
      if (company.establishedYear <= 2005) {
        score += 3;
        reasons.push(`Bề dày kinh nghiệm hoạt động trên thị trường từ năm ${company.establishedYear}.`);
      }
      break;

    case "vip_growth":
      if (isBankBacked || company.id === "ssi" || company.id === "bsc" || company.id === "hsc") {
        score += 12;
        reasons.push("Tiềm lực vốn chủ sở hữu lớn, hạn mức room margin dồi dào không lo bị nghẽn lệnh.");
        keyHighlights.push("Room Vốn Lớn");
      }
      if (company.margin.promoRate <= 9.0 || (company.margin.standardRate90d && company.margin.standardRate90d <= 10.5)) {
        score += 7;
        reasons.push(`Lãi suất vay ưu đãi hạn mức cao chỉ từ ${company.margin.shortTermRate || company.margin.promoRate}%/năm (chuẩn 90 ngày ${company.margin.standardRate90d}%/năm).`);
        keyHighlights.push(`Lãi VIP ${company.margin.promoRate}%`);
      }
      if (company.id === "bsc" || company.id === "ssi" || company.id === "vietcap") {
        score += 5;
        reasons.push("Khối phân tích vĩ mô và doanh nghiệp thuộc top đầu thị trường chứng khoán.");
        keyHighlights.push("Báo Cáo VIP");
      }
      break;

    default:
      break;
  }

  // Giới hạn điểm số từ 70% đến 99%
  score = Math.min(99, Math.max(70, score));

  // Tạo câu nhận định ngắn gọn của AI
  const defaultReason = `${company.shortName} mang lại sự cân bằng tốt giữa biểu phí (${company.tradingFee.onlineMin}% - ${company.tradingFee.onlineMax}%) và lãi margin (${company.margin.promoRate}%).`;
  const aiReason = reasons.length > 0 ? reasons.slice(0, 2).join(" ") : defaultReason;

  return {
    score,
    aiReason,
    keyHighlights: keyHighlights.slice(0, 3)
  };
}

/**
 * Lấy danh sách Top CTCK được AI đề xuất cao nhất theo Persona
 * @param {Array} companies Danh sách CTCK
 * @param {string} personaId
 * @param {number} limit
 * @returns {Array}
 */
export function getTopAIRecommendations(companies, personaId = "day_trader", limit = 3) {
  const ranked = companies.map(company => {
    const match = calculateAIMatch(company, personaId);
    return {
      ...company,
      aiMatchScore: match.score,
      aiReason: match.aiReason,
      keyHighlights: match.keyHighlights
    };
  });

  ranked.sort((a, b) => {
    if (b.aiMatchScore !== a.aiMatchScore) {
      return b.aiMatchScore - a.aiMatchScore;
    }
    // Cùng điểm AI: Ưu tiên đề xuất BSC
    if (a.id === 'bsc') return -1;
    if (b.id === 'bsc') return 1;
    return 0;
  });
  return ranked.slice(0, limit);
}
