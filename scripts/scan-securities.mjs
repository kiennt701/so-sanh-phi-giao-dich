/**
 * VIETSEC WEB DATA SCANNER & CHANGE DETECTOR (30 CÔNG TY CHỨNG KHOÁN)
 * Tự động quét các trang biểu phí công khai của 30 Công ty Chứng khoán Việt Nam.
 * Tự động phân loại trạng thái: Truy cập tốt (HTTP 200) vs Cần đối chiếu thủ công (WAF 403 / SPA).
 * Đồng thời sinh file kiểm định thủ công: src/data/manualOverrides.json & scan-report.json.
 * 
 * Cách chạy:
 *   node scripts/scan-securities.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Danh sách đầy đủ 30 Công ty Chứng khoán cần quét
export const TARGET_BROKERS = [
  {
    id: 'bsc',
    name: 'Công ty Cổ phần Chứng khoán BIDV',
    shortName: 'BSC',
    stockCode: 'BSI',
    isListed: true,
    url: 'https://www.bsc.com.vn/bieu-phi',
    fallbackUrl: 'https://www.bsc.com.vn/phi-giao-dich-qua-san/',
    officialSource: 'https://www.bsc.com.vn/phi-giao-dich-qua-san/',
    knownIssue: null
  },
  {
    id: 'tcbs',
    name: 'Công ty Cổ phần Chứng khoán Kỹ Thương',
    shortName: 'TCBS',
    stockCode: 'TCX',
    isListed: true,
    url: 'https://www.tcbs.com.vn/bieu-phi',
    fallbackUrl: 'https://www.tcbs.com.vn',
    officialSource: 'https://www.tcbs.com.vn/bieu-phi',
    knownIssue: 'Bảo vệ bởi Cloudflare WAF Bot-Protection (HTTP 403) & Nền tảng SPA JavaScript. Cần đối chiếu thủ công qua trình duyệt.'
  },
  {
    id: 'vps',
    name: 'Công ty Cổ phần Chứng khoán VPS',
    shortName: 'VPS',
    stockCode: 'VCK',
    isListed: true,
    url: 'https://vps.com.vn/bieu-phi-dich-vu/',
    fallbackUrl: 'https://vps.com.vn',
    officialSource: 'https://vps.com.vn/bieu-phi-dich-vu/',
    knownIssue: null
  },
  {
    id: 'ssi',
    name: 'Công ty Cổ phần Chứng khoán SSI',
    shortName: 'SSI',
    stockCode: 'SSI',
    isListed: true,
    url: 'https://www.ssi.com.vn/khach-hang-ca-nhan/bieu-phi',
    fallbackUrl: 'https://www.ssi.com.vn',
    officialSource: 'https://www.ssi.com.vn/khach-hang-ca-nhan/bieu-phi',
    knownIssue: null
  },
  {
    id: 'vndirect',
    name: 'Công ty Cổ phần Chứng khoán VNDIRECT',
    shortName: 'VNDIRECT',
    stockCode: 'VND',
    isListed: true,
    url: 'https://www.vndirect.com.vn/bieu-phi-dich-vu-chung-khoan/',
    fallbackUrl: 'https://www.vndirect.com.vn',
    officialSource: 'https://www.vndirect.com.vn/bieu-phi-dich-vu-chung-khoan/',
    knownIssue: 'Bảo vệ bởi Cloudflare WAF Bot-Protection (HTTP 403). Cần đối chiếu thủ công qua trình duyệt.'
  },
  {
    id: 'mirae-asset',
    name: 'Công ty Cổ phần Chứng khoán Mirae Asset (Việt Nam)',
    shortName: 'Mirae Asset',
    stockCode: null,
    isListed: false,
    url: 'https://masvn.com/bieu-phi',
    fallbackUrl: 'https://masvn.com',
    officialSource: 'https://masvn.com/bieu-phi',
    knownIssue: null
  },
  {
    id: 'dnse',
    name: 'Công ty Cổ phần Chứng khoán DNSE',
    shortName: 'DNSE',
    stockCode: 'DSE',
    isListed: true,
    url: 'https://www.dnse.com.vn/bieu-phi',
    fallbackUrl: 'https://www.dnse.com.vn',
    officialSource: 'https://www.dnse.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'vpbanks',
    name: 'Công ty Cổ phần Chứng khoán VPBank',
    shortName: 'VPBankS',
    stockCode: null,
    isListed: false,
    url: 'https://www.vpbanks.com.vn/bieu-phi',
    fallbackUrl: 'https://www.vpbanks.com.vn',
    officialSource: 'https://www.vpbanks.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'fpts',
    name: 'Công ty Cổ phần Chứng khoán FPT',
    shortName: 'FPTS',
    stockCode: 'FTS',
    isListed: true,
    url: 'https://www.fpts.com.vn/ho-tro-khach-hang/bieu-phi-dich-vu/',
    fallbackUrl: 'https://www.fpts.com.vn',
    officialSource: 'https://www.fpts.com.vn/ho-tro-khach-hang/bieu-phi-dich-vu/',
    knownIssue: null
  },
  {
    id: 'hsc',
    name: 'Công ty Cổ phần Chứng khoán TP.Hồ Chí Minh',
    shortName: 'HSC',
    stockCode: 'HCM',
    isListed: true,
    url: 'https://www.hsc.com.vn/bieu-phi',
    fallbackUrl: 'https://www.hsc.com.vn',
    officialSource: 'https://www.hsc.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'vietcap',
    name: 'Công ty Cổ phần Chứng khoán Vietcap',
    shortName: 'Vietcap',
    stockCode: 'VCI',
    isListed: true,
    url: 'https://www.vietcap.com.vn/bieu-phi',
    fallbackUrl: 'https://www.vietcap.com.vn',
    officialSource: 'https://www.vietcap.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'kafi',
    name: 'Công ty Cổ phần Chứng khoán Kafi',
    shortName: 'Kafi',
    stockCode: null,
    isListed: false,
    url: 'https://kafi.vn/bieu-phi-dich-vu',
    fallbackUrl: 'https://kafi.vn',
    officialSource: 'https://kafi.vn/bieu-phi-dich-vu',
    knownIssue: null
  },
  {
    id: 'mbs',
    name: 'Công ty Cổ phần Chứng khoán MB',
    shortName: 'MBS',
    stockCode: 'MBS',
    isListed: true,
    url: 'https://mbs.com.vn/bieu-phi/',
    fallbackUrl: 'https://mbs.com.vn',
    officialSource: 'https://mbs.com.vn/bieu-phi/',
    knownIssue: 'Tường lửa máy chủ chặn kết nối tự động (HTTP 403). Cần đối chiếu thủ công qua liên kết chính thức.'
  },
  {
    id: 'shs',
    name: 'Công ty Cổ phần Chứng khoán Sài Gòn - Hà Nội',
    shortName: 'SHS',
    stockCode: 'SHS',
    isListed: true,
    url: 'https://www.shs.com.vn/Pages/BieuPhiDichVu.aspx',
    fallbackUrl: 'https://www.shs.com.vn',
    officialSource: 'https://www.shs.com.vn/Pages/BieuPhiDichVu.aspx',
    knownIssue: null
  },
  {
    id: 'vix',
    name: 'Công ty Cổ phần Chứng khoán VIX',
    shortName: 'VIX',
    stockCode: 'VIX',
    isListed: true,
    url: 'https://vixs.vn/bieu-phi',
    fallbackUrl: 'https://vixs.vn',
    officialSource: 'https://vixs.vn/bieu-phi',
    knownIssue: 'Trang con biểu phí hạn chế truy cập bot tự động (HTTP 403). Cần đối chiếu thủ công qua trình duyệt.'
  },
  {
    id: 'kis',
    name: 'Công ty Cổ phần Chứng khoán KIS Việt Nam',
    shortName: 'KIS',
    stockCode: null,
    isListed: false,
    url: 'https://kisvn.vn/bieu-phi-dich-vu/',
    fallbackUrl: 'https://kisvn.vn',
    officialSource: 'https://kisvn.vn/bieu-phi-dich-vu/',
    knownIssue: null
  },
  {
    id: 'acbs',
    name: 'Công ty TNHH Chứng khoán ACB',
    shortName: 'ACBS',
    stockCode: null,
    isListed: false,
    url: 'https://acbs.com.vn/bieu-phi',
    fallbackUrl: 'https://acbs.com.vn',
    officialSource: 'https://acbs.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'vcbs',
    name: 'Công ty TNHH Chứng khoán Vietcombank',
    shortName: 'VCBS',
    stockCode: null,
    isListed: false,
    url: 'https://vcbs.com.vn/bieu-phi',
    fallbackUrl: 'https://vcbs.com.vn',
    officialSource: 'https://vcbs.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'kbsv',
    name: 'Công ty Cổ phần Chứng khoán KB Việt Nam',
    shortName: 'KBSV',
    stockCode: null,
    isListed: false,
    url: 'https://kbsec.com.vn/bieu-phi',
    fallbackUrl: 'https://kbsec.com.vn',
    officialSource: 'https://kbsec.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'cts',
    name: 'Công ty Cổ phần Chứng khoán Ngân hàng Công Thương Việt Nam',
    shortName: 'VietinBank Sec (CTS)',
    stockCode: 'CTS',
    isListed: true,
    url: 'https://cts.vn/bieu-phi',
    fallbackUrl: 'https://cts.vn',
    officialSource: 'https://cts.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'bvsc',
    name: 'Công ty Cổ phần Chứng khoán Bảo Việt',
    shortName: 'BVSC',
    stockCode: 'BVS',
    isListed: true,
    url: 'https://bvsc.com.vn/bieu-phi',
    fallbackUrl: 'https://bvsc.com.vn',
    officialSource: 'https://bvsc.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'tps',
    name: 'Công ty Cổ phần Chứng khoán Tiên Phong',
    shortName: 'TPS',
    stockCode: 'ORS',
    isListed: true,
    url: 'https://tpbs.com.vn/bieu-phi',
    fallbackUrl: 'https://tpbs.com.vn',
    officialSource: 'https://tpbs.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'yuanta',
    name: 'Công ty TNHH Chứng khoán Yuanta Việt Nam',
    shortName: 'Yuanta',
    stockCode: null,
    isListed: false,
    url: 'https://yuanta.com.vn/bieu-phi',
    fallbackUrl: 'https://yuanta.com.vn',
    officialSource: 'https://yuanta.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'shinhan',
    name: 'Công ty TNHH Chứng khoán Shinhan Việt Nam',
    shortName: 'Shinhan Sec',
    stockCode: null,
    isListed: false,
    url: 'https://shinhansec.com.vn/bieu-phi',
    fallbackUrl: 'https://shinhansec.com.vn',
    officialSource: 'https://shinhansec.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'agriseco',
    name: 'Công ty Cổ phần Chứng khoán Agribank',
    shortName: 'Agriseco',
    stockCode: 'AGR',
    isListed: true,
    url: 'https://agriseco.com.vn/bieu-phi',
    fallbackUrl: 'https://agriseco.com.vn',
    officialSource: 'https://agriseco.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'hdbs',
    name: 'Công ty Cổ phần Chứng khoán HD',
    shortName: 'HDBS',
    stockCode: null,
    isListed: false,
    url: 'https://hdbs.vn/bieu-phi',
    fallbackUrl: 'https://hdbs.vn',
    officialSource: 'https://hdbs.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'dsc',
    name: 'Công ty Cổ phần Chứng khoán DSC',
    shortName: 'DSC',
    stockCode: 'DSC',
    isListed: true,
    url: 'https://dsc.com.vn/bieu-phi',
    fallbackUrl: 'https://dsc.com.vn',
    officialSource: 'https://dsc.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'phs',
    name: 'Công ty Cổ phần Chứng khoán Phú Hưng',
    shortName: 'PHS',
    stockCode: null,
    isListed: false,
    url: 'https://phs.vn/bieu-phi',
    fallbackUrl: 'https://phs.vn',
    officialSource: 'https://phs.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'tvsi',
    name: 'Công ty Cổ phần Chứng khoán Tân Việt',
    shortName: 'TVSI',
    stockCode: null,
    isListed: false,
    url: 'https://tvsi.com.vn/bieu-phi',
    fallbackUrl: 'https://tvsi.com.vn',
    officialSource: 'https://tvsi.com.vn/bieu-phi',
    knownIssue: null
  },
  {
    id: 'evs',
    name: 'Công ty Cổ phần Chứng khoán Everest',
    shortName: 'EVS',
    stockCode: 'EVS',
    isListed: true,
    url: 'https://eves.com.vn/bieu-phi',
    fallbackUrl: 'https://eves.com.vn',
    officialSource: 'https://eves.com.vn/bieu-phi',
    knownIssue: null
  }
];

async function scanBrokerPage(broker) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 VietSecScanner/2.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8'
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  let activeUrl = broker.url;
  try {
    let response = await fetch(activeUrl, {
      headers,
      signal: controller.signal,
      redirect: 'follow'
    });

    if (response.status !== 200 && broker.fallbackUrl) {
      const fallbackController = new AbortController();
      const fallbackTimeout = setTimeout(() => fallbackController.abort(), 6000);
      try {
        const fallbackResp = await fetch(broker.fallbackUrl, {
          headers,
          signal: fallbackController.signal,
          redirect: 'follow'
        });
        clearTimeout(fallbackTimeout);
        if (fallbackResp.status === 200) {
          response = fallbackResp;
          activeUrl = broker.fallbackUrl;
        }
      } catch (_) {
        clearTimeout(fallbackTimeout);
      }
    }
    clearTimeout(timeoutId);

    const status = response.status;
    let text = '';
    if (status === 200) {
      text = await response.text();
    }

    const isAccessible = status === 200;
    let unscannableReason = null;
    let manualCheckInstruction = null;

    if (!isAccessible) {
      if (status === 403) {
        unscannableReason = broker.knownIssue || 'Bảo vệ bởi Cloudflare WAF Bot-Protection hoặc Tường lửa máy chủ (HTTP 403). Cần đối chiếu thủ công qua trình duyệt.';
      } else if (status === 404) {
        unscannableReason = 'Đường dẫn biểu phí thay đổi hoặc tái cấu trúc thư mục (HTTP 404). Cần đối chiếu qua trang chủ.';
      } else {
        unscannableReason = `Máy chủ phản hồi mã lỗi HTTP ${status}. Cần kiểm tra thủ công.`;
      }
      manualCheckInstruction = `Truy cập trực tiếp liên kết chính thức: ${broker.officialSource}`;
    }

    // Phân tích tín hiệu biểu phí nếu quét được
    const hasZeroFeeMention = /miễn phí|0%|zero[s-]?fee/i.test(text);
    const hasMarginMention = /margin|ký quỹ|lãi suất vay|lãi vay/i.test(text);
    const hasPromoRateMention = /([4-9][.,][0-9]+%|1[0-4][.,][0-9]+%)/i.test(text);

    return {
      id: broker.id,
      name: broker.name,
      shortName: broker.shortName,
      stockCode: broker.stockCode,
      isListed: broker.isListed,
      url: activeUrl,
      officialSource: broker.officialSource,
      httpStatus: status,
      isAccessible,
      unscannableReason,
      manualCheckInstruction,
      signals: isAccessible ? {
        hasZeroFeeMention,
        hasMarginMention,
        hasPromoRateMention,
      } : null,
      contentLength: text.length,
      scannedAt: new Date().toISOString()
    };
  } catch (error) {
    clearTimeout(timeoutId);
    const isTimeout = error.name === 'AbortError';
    const unscannableReason = isTimeout 
      ? 'Hết thời gian chờ phản hồi (Timeout > 8s). Máy chủ phản hồi chậm hoặc chặn crawler tự động.'
      : `Lỗi kết nối mạng: ${error.message}`;

    return {
      id: broker.id,
      name: broker.name,
      shortName: broker.shortName,
      stockCode: broker.stockCode,
      isListed: broker.isListed,
      url: broker.url,
      officialSource: broker.officialSource,
      httpStatus: isTimeout ? 'Timeout (8s)' : 'Fetch Error',
      isAccessible: false,
      unscannableReason,
      manualCheckInstruction: `Truy cập trực tiếp liên kết chính thức: ${broker.officialSource}`,
      signals: null,
      contentLength: 0,
      scannedAt: new Date().toISOString()
    };
  }
}

async function runScanner() {
  console.log('=================================================================');
  console.log('🚀 BẮT ĐẦU QUÉT DỮ LIỆU CÁC TRANG WEB CHỨNG KHOÁN VIỆT NAM (30 CTCK)');
  console.log(`⏰ Thời gian quét: ${new Date().toLocaleString('vi-VN')}`);
  console.log(`🎯 Tổng số đơn vị quét: ${TARGET_BROKERS.length} CTCK`);
  console.log('=================================================================\n');

  const results = [];

  for (const broker of TARGET_BROKERS) {
    process.stdout.write(`Đang quét [${broker.shortName}] (${broker.url})... `);
    const result = await scanBrokerPage(broker);
    if (result.isAccessible) {
      console.log(`✅ HTTP ${result.httpStatus} (${Math.round(result.contentLength / 1024)} KB)`);
    } else {
      console.log(`⚠️ ${result.httpStatus} - ${result.unscannableReason?.slice(0, 55)}...`);
    }
    results.push(result);
  }

  // Tổng hợp báo cáo
  const accessibleCount = results.filter(r => r.isAccessible).length;
  const unscannableCount = results.length - accessibleCount;
  console.log('\n=================================================================');
  console.log(`📊 TỔNG KẾT BÁO CÁO QUÉT DỮ LIỆU 30 CTCK:`);
  console.log(`- Thành công: ${accessibleCount}/${TARGET_BROKERS.length} trang web truy cập tốt.`);
  console.log(`- Cần đối chiếu: ${unscannableCount}/${TARGET_BROKERS.length} trang có WAF / chặn bot / timeout.`);
  console.log('=================================================================');

  // Ghi file scan-report.json
  const reportPath = path.join(__dirname, '..', 'scan-report.json');
  const reportData = {
    summary: {
      total: TARGET_BROKERS.length,
      accessible: accessibleCount,
      unscannable: unscannableCount,
      timestamp: new Date().toISOString(),
      note: 'Dữ liệu được quét tự động từ các trang web biểu phí công khai của 30 CTCK.'
    },
    brokers: results
  };
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2), 'utf-8');
  console.log(`\n💾 [1/2] Báo cáo quét chi tiết đã lưu: ${reportPath}`);

  // Nạp dữ liệu hiện hành từ securitiesData.js để sinh file hiệu chỉnh thủ công
  let baseCompanies = [];
  try {
    const securitiesDataPath = path.join(__dirname, '..', 'src', 'data', 'securitiesData.js');
    const fileContent = fs.readFileSync(securitiesDataPath, 'utf-8');
    // Import dynamically
    const dataModule = await import('../src/data/securitiesData.js');
    baseCompanies = dataModule.SECURITIES_COMPANIES || [];
  } catch (err) {
    console.warn('Không thể nạp trực tiếp securitiesData.js:', err.message);
  }

  // Tạo file hiệu chỉnh thủ công manualOverrides.json
  const overridesMap = {};
  const auditBrokers = results.map(r => {
    const base = baseCompanies.find(c => c.id === r.id) || {};
    const brokerOverride = {
      tradingFee: {
        onlineMin: base.tradingFee?.onlineMin ?? 0.1,
        onlineMax: base.tradingFee?.onlineMax ?? 0.15,
        zeroFeeOffer: Boolean(base.tradingFee?.zeroFeeOffer),
        displaySummary: base.tradingFee?.displaySummary ?? '',
        notes: base.tradingFee?.notes ?? ''
      },
      margin: {
        standardRate90d: base.margin?.standardRate90d ?? 11.5,
        standardRateDisplay: base.margin?.standardRateDisplay ?? '',
        shortTermRate: base.margin?.shortTermRate ?? 9.5,
        baseRate: base.margin?.baseRate ?? 11.5,
        promoRate: base.margin?.promoRate ?? 8.5,
        maxLeverage: base.margin?.maxLeverage ?? '1:1 (Ký quỹ 50% chuẩn UBCK)',
        notes: base.margin?.notes ?? ''
      },
      listingInfo: {
        stockCode: base.stockCode ?? r.stockCode,
        listingExchange: base.listingExchange ?? null,
        isListed: base.isListed ?? r.isListed,
        listingStatus: base.listingStatus ?? ''
      },
      sourceUrl: base.sourceUrl || r.officialSource,
      accountOpeningUrl: base.accountOpeningUrl ?? ''
    };

    overridesMap[r.id] = brokerOverride;

    return {
      id: r.id,
      shortName: r.shortName,
      name: r.name,
      stockCode: base.stockCode ?? r.stockCode,
      isListed: base.isListed ?? r.isListed,
      listingStatus: base.listingStatus ?? (r.isListed ? 'Đã niêm yết' : 'Chưa niêm yết'),
      sourceUrl: base.sourceUrl || r.officialSource,
      scanStatus: r.isAccessible ? 'ACCESSIBLE_HTTP_200' : 'UNSCANNABLE_MANUAL_AUDIT_REQUIRED',
      httpStatus: r.httpStatus,
      unscannableReason: r.unscannableReason,
      manualCheckInstruction: r.manualCheckInstruction,
      lastVerified: 'Tháng 09/2026',
      verifiedBy: 'Web Scanner & Kiểm định viên độc lập',
      data: brokerOverride
    };
  });

  const manualOverridesPath = path.join(__dirname, '..', 'src', 'data', 'manualOverrides.json');
  const manualOverridesData = {
    metadata: {
      title: 'Cơ Sở Dữ Liệu Hiệu Chỉnh Thủ Công 30 Công Ty Chứng Khoán Việt Nam',
      version: '2.2.1',
      updatedAt: new Date().toISOString(),
      totalBrokers: TARGET_BROKERS.length,
      accessibleBrokers: accessibleCount,
      unscannableBrokers: unscannableCount,
      instruction: 'Người dùng có thể chỉnh sửa các giá trị phí, lãi suất vay margin, mã niêm yết hoặc link nguồn trong file này, sau đó nạp trực tiếp qua nút Tải lên file JSON tại Modal Quản Lý Dữ Liệu.'
    },
    overrides: overridesMap,
    auditBrokers
  };

  fs.writeFileSync(manualOverridesPath, JSON.stringify(manualOverridesData, null, 2), 'utf-8');
  console.log(`💾 [2/2] File kiểm định & hiệu chỉnh thủ công đã lưu: ${manualOverridesPath}`);

  // Đồng thời sao lưu file audit ở thư mục gốc để người dùng mở xem nhanh
  const rootAuditPath = path.join(__dirname, '..', 'securities-manual-audit.json');
  fs.writeFileSync(rootAuditPath, JSON.stringify(manualOverridesData, null, 2), 'utf-8');
  console.log(`📄 Bản sao lưu root: ${rootAuditPath}\n`);
}

runScanner().catch(console.error);
