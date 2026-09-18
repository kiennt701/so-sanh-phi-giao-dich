/**
 * CƠ SỞ DỮ LIỆU CÔNG KHAI CÁC CÔNG TY CHỨNG KHOÁN VIỆT NAM
 * Cập nhật: Tháng 09/2026
 * 
 * Lưu ý: Biểu phí giao dịch dưới đây chưa bao gồm phí trả Sở GDCK (0.027%) và thuế TNCN (0.1% khi bán) theo quy định Nhà nước.
 * Dữ liệu được tổng hợp từ biểu phí công bố công khai trên website chính thức của từng CTCK.
 */

export const SECURITIES_COMPANIES = [
  {
    "id": "bsc",
    "isRecommended": true,
    "name": "Công ty Cổ phần Chứng khoán BIDV",
    "shortName": "BSC",
    "brandColor": "#004880",
    "stockCode": "BSI",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": "BID",
    "bankBacked": "BIDV",
    "establishedYear": 1999,
    "marketShareRank": "Top 7 HNX (3.58%)",
    "tradingFee": {
      "onlineMin": 0.08,
      "onlineMax": 0.13,
      "brokerMin": 0.1,
      "brokerMax": 0.15,
      "zeroFeeOffer": false,
      "displaySummary": "0.08% - 0.13% (Trực tuyến ưu đãi)",
      "notes": "Mức phí giao dịch thấp nhất là 0.08% (áp dụng ưu đãi mở mới và Inactive, khách hàng phổ thông hiện hữu từ 0.08% - 0.13%). Có chuyên gia tư vấn từ 0.10% - 0.15%."
    },
    "margin": {
      "minRate": 7.5,
      "maxRate": 12.0,
      "medianRate": 10.5,
      "baseRate": 10.5,
      "promoRate": 7.5,
      "promoDuration": "Gói ưu đãi T+ / Khách hàng mới",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Lãi suất margin thấp nhất là 10.5%/năm cho kỳ hạn tiêu chuẩn 90 ngày (phổ thông 10.5% - 12.0%/năm, không yêu cầu điều kiện dư nợ tối thiểu), nguồn vốn Big4 BIDV & Hana Securities dồi dào, an toàn vốn tuyệt đối qua mọi chu kỳ. Gói deal ngắn hạn T+ chỉ từ 7.5%/năm.",
      "shortTermRate": 7.5,
      "shortTermTenor": "Gói Margin T+ BSC (Big4 BIDV)",
      "shortTermDisplay": "7.5% - 8.5%/năm (Gói Margin T+ BSC)",
      "standardRate90d": 10.5,
      "standardRateDisplay": "10.5% - 12.0%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "Biểu phí từ 500đ - 3.000đ/HĐ tùy sản lượng khớp lệnh trong ngày (chưa gồm phí Sở)"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Phí Ưu Đãi 0.08%",
      "feeOffer": "0.08% phí giao dịch cổ phiếu mở mới & Inactive",
      "marginOffer": "Gói Margin T+ siêu cạnh tranh lãi suất từ 7.5%/năm",
      "duration": "Gói T+ / Khách hàng mới",
      "giftBonus": "Báo cáo phân tích chuyên sâu SmartX AI & BIDV Research",
      "note": "Định chế tài chính vững mạnh từ Ngân hàng BIDV & Hana Securities."
    },
    "promotions": [
      "Ưu đãi phí giao dịch cổ phiếu chỉ 0.08% cho tài khoản mở mới & Inactive",
      "Gói Margin T+ siêu cạnh tranh lãi suất chỉ từ 7.5%/năm",
      "Tích hợp hệ sinh thái ngân hàng BIDV SmartBanking & Hana Securities",
      "Báo cáo phân tích chuyên sâu & công cụ khuyến nghị SmartX AI miễn phí"
    ],
    "accountOpeningUrl": "https://dangky.bsc.com.vn/moi-gioi?online=false&cif=4768",
    "referralCode": "4768",
    "pros": [
      "Hệ sinh thái định chế tài chính vững mạnh từ Ngân hàng BIDV và cổ đông chiến lược Hana Securities (Hàn Quốc)",
      "Nguồn vốn dồi dào, hạn mức margin lớn, hiếm khi bị cạn room mã thị trường",
      "Trung tâm phân tích độc lập với chất lượng báo cáo vĩ mô và cổ phiếu hàng đầu",
      "Hệ thống SmartX Mobile & Web Trading ổn định, bảo mật chuẩn ngân hàng"
    ],
    "cons": [
      "Tuân thủ chuẩn mực an toàn vốn UBCKNN, không có sản phẩm đòn bẩy vượt khung (như 3:7)"
    ],
    "suitableFor": "Nhà đầu tư chú trọng sự an toàn, bảo chứng uy tín từ ngân hàng quốc doanh lớn, chuộng báo cáo phân tích sâu và nguồn vốn margin dồi dào.",
    "platforms": [
      "SmartX App (iOS/Android)",
      "SmartX Web Trading",
      "Bảng giá BSC Pro"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://www.bsc.com.vn/phi-giao-dich-qua-san/"
  },
  {
    "id": "tcbs",
    "name": "Công ty Cổ phần Chứng khoán Kỹ Thương",
    "shortName": "TCBS",
    "brandColor": "#ea1c24",
    "stockCode": "TCX",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": "TCB",
    "bankBacked": "Techcombank",
    "establishedYear": 2008,
    "marketShareRank": "Top 3 HOSE (9.36%) / Top 2 HNX (9.00%)",
    "tradingFee": {
      "onlineMin": 0.03,
      "onlineMax": 0.03,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": true,
      "displaySummary": "0.03% (Đã gồm phí trả Sở)",
      "notes": "Chính sách Zero-Fee của TCBS miễn 100% phí môi giới trọn đời; phí giao dịch thực tế bao gồm phí trả Sở là 0.03%."
    },
    "margin": {
      "minRate": 7.99,
      "maxRate": 14.0,
      "medianRate": 14.0,
      "baseRate": 14.0,
      "promoRate": 7.99,
      "promoDuration": "Gói vay deal mã có điều kiện",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Lãi suất vay margin phổ thông cho khách hàng hiện hữu là 14.0%/năm (không yêu cầu điều kiện dư nợ tối thiểu). Các mức 7.99% - 10.5% chỉ áp dụng theo danh mục deal hạn chế hoặc có điều kiện dư nợ lớn/kỳ hạn ngắn hạn.",
      "shortTermRate": 7.99,
      "shortTermTenor": "Gói deal mã có điều kiện (từ 7.99%)",
      "shortTermDisplay": "7.99% - 10.5%/năm (Gói deal có điều kiện)",
      "standardRate90d": 14.0,
      "standardRateDisplay": "14.0%/năm (Phổ thông hiện hữu)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 0,
      "notes": "0đ/HĐ giao dịch phái sinh (chưa gồm phí Sở)"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Zero-Fee Trọn Đời",
      "feeOffer": "Miễn phí 100% giao dịch cổ phiếu & phái sinh vĩnh viễn",
      "marginOffer": "Lãi suất Margin linh hoạt từ 7.99%/năm",
      "duration": "Trọn đời",
      "giftBonus": "Tích lũy điểm thưởng iXu đổi tiền mặt/quà tặng",
      "note": "Tiên phong miễn phí giao dịch chứng khoán tại Việt Nam."
    },
    "promotions": [
      "Zero-Fee trọn đời cho giao dịch cổ phiếu và phái sinh",
      "Hệ thống tích luỹ điểm thưởng iXu đổi tiền mặt/quà",
      "Công cụ sao chép đầu tư iCopy và quỹ mở Techcom Capital"
    ],
    "accountOpeningUrl": "https://tcinvest.tcbs.com.vn/",
    "referralCode": "105C999999",
    "pros": [
      "Chi phí giao dịch bằng 0 (Zero-Fee) giúp tiết kiệm tối đa cho nhà đầu tư tự giao dịch",
      "Nền tảng công nghệ tài chính số TCInvest mạnh mẽ, nhiều tính năng phân tích chuyên sâu",
      "Hệ sinh thái tài chính Techcombank: Trái phiếu iBond, quỹ iFund, tiền gửi linh hoạt iSave"
    ],
    "cons": [
      "Mô hình hoàn toàn thuần số (Digital First), không có môi giới riêng chăm sóc 1-1",
      "Lãi suất vay margin phổ thông cho khách hiện hữu ở mức 14.0%/năm",
      "Hệ thống thỉnh thoảng có độ trễ vào các phiên giao dịch biến động cực lớn"
    ],
    "suitableFor": "Nhà đầu tư tự giao dịch độc lập (Self-directed), trader lướt sóng muốn tối ưu 100% phí giao dịch, người đầu tư tài sản số và trái phiếu.",
    "platforms": [
      "TCInvest App",
      "TCInvest Web",
      "iCopy"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://www.tcbs.com.vn/bieu-phi"
  },
  {
    "id": "vps",
    "name": "Công ty Cổ phần Chứng khoán VPS",
    "shortName": "VPS",
    "brandColor": "#ec1c24",
    "stockCode": "VCK",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2006,
    "marketShareRank": "Top 1 HOSE (12.61%) & HNX (17.71%)",
    "tradingFee": {
      "onlineMin": 0.13,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.25,
      "zeroFeeOffer": false,
      "displaySummary": "0.13% - 0.15% (Chuẩn thường)",
      "notes": "Miễn phí giao dịch 6 tháng đầu cho tài khoản mở mới (tiểu khoản đuôi 1 và 6). Sau ưu đãi áp dụng 0.13% - 0.15%."
    },
    "margin": {
      "minRate": 8.6,
      "maxRate": 14.0,
      "medianRate": 13.5,
      "baseRate": 13.5,
      "promoRate": 7.5,
      "promoDuration": "Ưu đãi gói M9.8 / Khách hàng mới",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK) / Gói HTKD tới 3:7",
      "interestFreeDays": 0,
      "notes": "LƯU Ý: Lãi suất thấp 8.6% - 9.8% chỉ áp dụng cho giao dịch lướt sóng ngắn hạn (gói T+5, T+10 hoặc miễn lãi T+2). Lãi suất vay tiêu chuẩn 90 ngày lên tới 13.5% - 14.0%/năm (thuộc nhóm cao nhất thị trường).",
      "shortTermRate": 8.6,
      "shortTermTenor": "Gói T+5 / T+10 ngắn hạn (hoặc miễn lãi T+2)",
      "shortTermDisplay": "8.6% - 9.8%/năm (Gói T+5/T+10 ngắn ngày)",
      "standardRate90d": 13.5,
      "standardRateDisplay": "13.5% - 14.0%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": true
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "Áp dụng biểu phí bậc thang từ 1.000đ - 2.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Miễn Phí 6 Tháng",
      "feeOffer": "Miễn phí 100% giao dịch cổ phiếu trong 6 tháng đầu",
      "marginOffer": "Gói lãi suất ưu đãi M9.8 từ 7.5%/năm",
      "duration": "6 tháng đầu",
      "giftBonus": "Tư vấn 1-1 phòng giao dịch & công cụ SmartOne Pro",
      "note": "Thị phần số 1 sàn HOSE & HNX, đội ngũ broker đông đảo."
    },
    "promotions": [
      "Miễn phí 6 tháng giao dịch cổ phiếu cho tài khoản mở mới",
      "Gói lãi suất Margin ưu đãi từ 7.5% - 9.8%/năm",
      "Đội ngũ môi giới (Broker) đông đảo, hỗ trợ tư vấn 1-1 nhiệt tình"
    ],
    "accountOpeningUrl": "https://openaccount.vps.com.vn/",
    "referralCode": "VPS_VIP",
    "pros": [
      "Thị phần môi giới số 1 thị trường Việt Nam nhiều năm liên tiếp trên cả HOSE và HNX",
      "Chính sách đòn bẩy margin và hợp tác đầu tư linh hoạt, danh mục margin phong phú",
      "Đội ngũ môi giới phủ sóng rộng khắp, tư vấn room lệnh sát sao",
      "App VPS SmartOne thân thiện, giao dịch mượt mà và tiện ích"
    ],
    "cons": [
      "Mức lãi suất margin bậc chuẩn khá cao sau khi hết thời gian ưu đãi (khoảng 13% - 13.5%/năm)",
      "Chất lượng môi giới không đồng đều giữa các đội ngũ"
    ],
    "suitableFor": "Nhà đầu tư thích sử dụng đòn bẩy cao, nhà đầu tư mới cần có môi giới hỗ trợ tư vấn room chat hàng ngày.",
    "platforms": [
      "VPS SmartOne App",
      "VPS SmartPro (Phái sinh)",
      "Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://vps.com.vn/bieu-phi"
  },
  {
    "id": "ssi",
    "name": "Công ty Cổ phần Chứng khoán SSI",
    "shortName": "SSI",
    "brandColor": "#00478f",
    "stockCode": "SSI",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 1999,
    "marketShareRank": "Top 2 HOSE (11.17%) / Top 4 HNX (6.58%)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.25,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15% (Chính sách linh hoạt)",
      "notes": "Phí giao dịch theo bậc thang giá trị tài sản và gói dịch vụ. Chương trình ưu đãi phí cho nhà đầu tư chủ động."
    },
    "margin": {
      "minRate": 9,
      "maxRate": 13.5,
      "medianRate": 11.25,
      "baseRate": 11.25,
      "promoRate": 9,
      "promoDuration": "Gói T+ và chương trình kích cầu định kỳ",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Ưu đãi gói T+ ngắn hạn từ 9.0%/năm. Kỳ hạn vay tiêu chuẩn 90 ngày áp dụng mức lãi 11.5% - 13.0%/năm.",
      "shortTermRate": 9,
      "shortTermTenor": "Gói T+ kích cầu ngắn hạn",
      "shortTermDisplay": "9.0% - 10.5%/năm (Gói T+ ngắn hạn)",
      "standardRate90d": 12,
      "standardRateDisplay": "11.5% - 13.0%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ - 2.500đ/HĐ tùy hạn mức giao dịch"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Uy Tín Số 1",
      "feeOffer": "Gói phí ưu đãi bậc thang từ 0.10% cho NĐT chủ động",
      "marginOffer": "Lãi suất Margin ưu đãi kích cầu định kỳ từ 9.0%/năm",
      "duration": "Theo chương trình từng quý",
      "giftBonus": "Báo cáo phân tích chuyên sâu SSI Research & iBoard",
      "note": "Định chế chứng khoán lớn nhất và uy tín bậc nhất thị trường."
    },
    "promotions": [
      "Chương trình quay số trúng thưởng và tặng quà giá trị cho tài khoản mới",
      "Hạn mức vay margin siêu lớn cho khách hàng NAV cao",
      "Hệ thống phân tích SSI Research uy tín hàng đầu khu vực"
    ],
    "accountOpeningUrl": "https://www.ssi.com.vn/khach-hang-ca-nhan/mo-tai-khoan",
    "referralCode": "SSI_PARTNER",
    "pros": [
      "Thương hiệu chứng khoán uy tín lâu đời nhất Việt Nam, tiềm lực vốn chủ sở hữu lớn",
      "Đội ngũ phân tích SSI Research chất lượng quốc tế, dữ liệu bài bản",
      "Hạn mức cho vay cực lớn, ổn định, phục vụ tốt các tổ chức và cá nhân NAV lớn",
      "Hệ thống giao dịch đa nền tảng iBoard mượt mà, nhiều thông tin tài chính"
    ],
    "cons": [
      "Không theo đuổi cuộc đua Zero-Fee đại trà, chi phí tổng thể cao hơn các công ty fintech"
    ],
    "suitableFor": "Nhà đầu tư chuyên nghiệp, nhà đầu tư giá trị, khách hàng có quy mô vốn lớn (High Net Worth) coi trọng sự uy tín và ổn định lâu dài.",
    "platforms": [
      "SSI iBoard Mobile",
      "SSI iBoard Web",
      "ProTrading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://www.ssi.com.vn/bieu-phi"
  },
  {
    "id": "vndirect",
    "name": "Công ty Cổ phần Chứng khoán VNDIRECT",
    "shortName": "VNDIRECT",
    "brandColor": "#f7941d",
    "stockCode": "VND",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2006,
    "marketShareRank": "Top 7 HOSE (3.96%) / Top 5 HNX (5.88%)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15% (Linh hoạt theo tài sản)",
      "notes": "Chính sách biểu phí D-Stock linh hoạt theo quy mô tài sản và hạn mức giao dịch."
    },
    "margin": {
      "minRate": 9.5,
      "maxRate": 13.5,
      "medianRate": 11.5,
      "baseRate": 11.5,
      "promoRate": 8.9,
      "promoDuration": "Gói D-Margin ưu đãi 30 ngày đầu",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Gói D-Margin ưu đãi lãi suất 9.5% trong 30 ngày đầu. Kỳ hạn tiêu chuẩn 90 ngày áp dụng lãi suất 12.0% - 13.5%/năm.",
      "shortTermRate": 9.5,
      "shortTermTenor": "Gói D-Margin ưu đãi 30 ngày đầu",
      "shortTermDisplay": "9.5% - 10.5%/năm (Ưu đãi 30 ngày đầu)",
      "standardRate90d": 12.5,
      "standardRateDisplay": "12.0% - 13.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ - 2.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Sinh Thái D-Wealth",
      "feeOffer": "Ưu đãi phí giao dịch D-Stock từ 0.10%",
      "marginOffer": "Gói D-Margin ưu đãi 30 ngày đầu từ 8.9%/năm",
      "duration": "30 ngày đầu",
      "giftBonus": "Khoá học D-Academy toàn diện cho F0 & tư vấn D-Wealth",
      "note": "Hệ sinh thái tài chính quản trị gia sản đa dạng."
    },
    "promotions": [
      "Ưu đãi lãi suất margin cho khách hàng mới",
      "Nền tảng đào tạo kiến thức D-Academy toàn diện cho F0",
      "Hệ sinh thái tài chính quản lý gia sản D-Wealth"
    ],
    "accountOpeningUrl": "https://accounts.vndirect.com.vn/",
    "referralCode": "VND_VIP",
    "pros": [
      "Hệ sinh thái sản phẩm tài chính toàn diện: Cổ phiếu, Trái phiếu, Chứng chỉ quỹ, Tiền gửi",
      "Giao diện DStock thân thiện, cộng đồng nhà đầu tư đông đảo",
      "Nhiều tài liệu đào tạo và khóa học chuẩn hóa cho nhà đầu tư mới"
    ],
    "cons": [
      "Phí giao dịch không thuộc nhóm rẻ nhất thị trường",
      "Chính sách margin tập trung vào nhóm cổ phiếu cơ bản"
    ],
    "suitableFor": "Nhà đầu tư muốn quản lý tài chính toàn diện đa tài sản, nhà đầu tư theo phương pháp tích sản dài hạn.",
    "platforms": [
      "DStock App",
      "Bảng giá VNDIRECT",
      "DWealth"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://www.vndirect.com.vn/bieu-phi"
  },
  {
    "id": "mirae-asset",
    "name": "Công ty Cổ phần Chứng khoán Mirae Asset (Việt Nam)",
    "shortName": "Mirae Asset",
    "brandColor": "#0c3b82",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết (FDI Hàn Quốc)",
    "isListed": false,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2007,
    "marketShareRank": "Top 10 HOSE (2.94%)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15% (Cạnh tranh)",
      "notes": "Biểu phí minh bạch, ổn định, cạnh tranh so với các công ty có vốn nước ngoài."
    },
    "margin": {
      "minRate": 9,
      "maxRate": 12.5,
      "medianRate": 10.75,
      "baseRate": 10.75,
      "promoRate": 7.99,
      "promoDuration": "Ưu đãi khách hàng mở mới 60 ngày",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Ưu đãi ngắn hạn 60 ngày đầu mở tài khoản từ 9.0%/năm. Dư nợ tiêu chuẩn 90 ngày áp dụng 11.0% - 12.5%/năm.",
      "shortTermRate": 9,
      "shortTermTenor": "Ưu đãi ngắn hạn 60 ngày đầu",
      "shortTermDisplay": "9.0% - 10.5%/năm (Ưu đãi 60 ngày)",
      "standardRate90d": 11.5,
      "standardRateDisplay": "11.0% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Margin Rẻ 7.99%",
      "feeOffer": "Phí giao dịch ưu đãi chỉ 0.10% cho tài khoản mới",
      "marginOffer": "Lãi suất Margin chỉ 7.99%/năm (chuẩn 9.9%)",
      "duration": "60 ngày đầu",
      "giftBonus": "Miễn phí ứng trước tiền bán trong chương trình",
      "note": "Tiềm lực vốn ngoại dồi dào từ Tập đoàn Tài chính Mirae Asset."
    },
    "promotions": [
      "Lãi suất vay Margin siêu ưu đãi từ 7.99%/năm",
      "Chính sách miễn phí ứng trước tiền bán trong chương trình khuyến mãi",
      "Hỗ trợ mở tài khoản eKYC nhận ngay ưu đãi phí"
    ],
    "accountOpeningUrl": "https://masvn.com/register",
    "referralCode": "MAS_PRO",
    "pros": [
      "Lãi suất vay Margin bình quân cạnh tranh bậc nhất thị trường Việt Nam",
      "Tiềm lực tài chính khổng lồ từ Tập đoàn Tài chính Mirae Asset Hàn Quốc",
      "Chính sách cho vay ổn định, minh bạch, ít tăng lãi suất đột ngột"
    ],
    "cons": [
      "Ứng dụng giao dịch di động giao diện theo phong cách truyền thống",
      "Độ nhận diện thương hiệu với nhà đầu tư cá nhân F0 chưa bằng các công ty nội địa"
    ],
    "suitableFor": "Nhà đầu tư thường xuyên sử dụng đòn bẩy Margin, nhà đầu tư chuộng lãi suất vay thấp và nguồn tiền bền vững.",
    "platforms": [
      "MAS Mobile",
      "W-TS Web Trading",
      "Bảng giá MAS"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://masvn.com/bieu-phi"
  },
  {
    "id": "dnse",
    "name": "Công ty Cổ phần Chứng khoán DNSE",
    "shortName": "DNSE",
    "brandColor": "#00c389",
    "stockCode": "DSE",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2007,
    "marketShareRank": "Top 8 HNX (2.88%) / FinTech tiên phong",
    "tradingFee": {
      "onlineMin": 0.045,
      "onlineMax": 0.045,
      "brokerMin": 0.1,
      "brokerMax": 0.15,
      "zeroFeeOffer": true,
      "displaySummary": "0.045% (Đã gồm phí trả Sở)",
      "notes": "Chính sách Zero-Fee của DNSE miễn 100% phí môi giới; phí giao dịch thực tế bao gồm phí trả Sở là 0.045%."
    },
    "margin": {
      "minRate": 5.99,
      "maxRate": 12.5,
      "medianRate": 12.5,
      "baseRate": 12.5,
      "promoRate": 5.99,
      "promoDuration": "Gói Margin Deal linh hoạt / T+0 miễn lãi",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK) / Margin Deal linh hoạt",
      "interestFreeDays": 1,
      "notes": "LƯU Ý ĐẶC BIỆT: Mức lãi 5.99% tại DNSE là sản phẩm Margin Deal chỉ áp dụng cho thời gian nắm giữ siêu ngắn (5 ngày). Gói 10 ngày áp dụng 8.99%/năm. Dư nợ tiêu chuẩn kỳ hạn 90 ngày áp dụng lãi suất 12.5%/năm.",
      "shortTermRate": 5.99,
      "shortTermTenor": "Gói Margin Deal ngắn hạn 5–10 ngày",
      "shortTermDisplay": "5.99% - 8.99%/năm (Gói Deal 5–10 ngày)",
      "standardRate90d": 12.5,
      "standardRateDisplay": "12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": true
    },
    "derivativesFee": {
      "feePerContract": 0,
      "notes": "Miễn phí giao dịch phái sinh (0đ/HĐ)"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Lãi Deal 5.99%",
      "feeOffer": "Miễn phí 100% giao dịch trọn đời (Gói Ensa)",
      "marginOffer": "Margin Deal chỉ từ 5.99%/năm, miễn lãi T+0",
      "duration": "Trọn đời phí GD / Deal margin linh hoạt",
      "giftBonus": "Tặng cổ phiếu trải nghiệm & trợ lý ảo Ensa AI",
      "note": "Nền tảng chứng khoán số thế hệ mới, tiên phong công nghệ."
    },
    "promotions": [
      "Miễn phí giao dịch cổ phiếu & phái sinh trọn đời",
      "Gói Margin Deal lãi suất chỉ từ 5.99%/năm",
      "Trợ lý ảo trí tuệ nhân tạo Ensa AI phân tích cổ phiếu miễn phí"
    ],
    "accountOpeningUrl": "https://www.dnse.com.vn/mo-tai-khoan",
    "referralCode": "DNSE_TECH",
    "pros": [
      "Công nghệ FinTech tiên phong, giao diện hiện đại, tối giản, mượt mà",
      "Mô hình Margin Deal cho phép chọn lãi suất và tỷ lệ vay riêng cho từng mã cổ phiếu",
      "Zero-Fee trọn đời, chi phí giao dịch cực kỳ tiết kiệm"
    ],
    "cons": [
      "Mới phát triển mạnh mảng bán lẻ vài năm gần đây, hệ thống chi nhánh vật lý ít",
      "Phù hợp người dùng thạo công nghệ hơn là nhà đầu tư truyền thống"
    ],
    "suitableFor": "Gen Z, dân công nghệ, nhà đầu tư trẻ thích tự ra quyết định, trader thích lướt sóng Margin Deal theo từng mã.",
    "platforms": [
      "Entrade X App",
      "Entrade X Web",
      "Ensa AI"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://www.dnse.com.vn/bieu-phi"
  },
  {
    "id": "vpbanks",
    "name": "Công ty Cổ phần Chứng khoán VPBank",
    "shortName": "VPBankS",
    "brandColor": "#00b14f",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết (Thuộc VPBank)",
    "isListed": false,
    "parentStockCode": "VPB",
    "bankBacked": "VPBank",
    "establishedYear": 2009,
    "marketShareRank": "Top 8 HOSE (3.57%) / Top 3 HNX (6.71%)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15% (Chuẩn thường)",
      "notes": "Chính sách miễn phí giao dịch trong thời gian đầu mở tài khoản, sau đó áp dụng mức phí cạnh tranh."
    },
    "margin": {
      "minRate": 9.5,
      "maxRate": 12.5,
      "medianRate": 11,
      "baseRate": 11,
      "promoRate": 8.6,
      "promoDuration": "Ưu đãi khách hàng mở mới / Hạn mức lớn",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Gói ưu đãi mở mới từ 9.5%/năm. Lãi suất tiêu chuẩn 90 ngày khoảng 11.5% - 12.5%/năm.",
      "shortTermRate": 9.5,
      "shortTermTenor": "Gói ưu đãi mở mới / Hạn mức lớn",
      "shortTermDisplay": "9.5% - 10.5%/năm (Ưu đãi mở mới)",
      "standardRate90d": 11.8,
      "standardRateDisplay": "11.5% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 500,
      "notes": "Ưu đãi theo chương trình 500đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Hệ Sinh Thái VPBank",
      "feeOffer": "Ưu đãi phí giao dịch chỉ 0.10% cho tài khoản mới",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.6%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Liên kết tài khoản VPBank NEO & hoàn tiền giao dịch",
      "note": "Tiềm lực vốn lớn từ ngân hàng mẹ VPBank."
    },
    "promotions": [
      "Miễn phí giao dịch cổ phiếu cho khách hàng mở tài khoản eKYC",
      "Lãi suất vay Margin kích cầu từ 8.6%/năm",
      "Tích hợp luồng tiền linh hoạt với tài khoản VPBank NEO"
    ],
    "accountOpeningUrl": "https://www.vpbanks.com.vn/mo-tai-khoan",
    "referralCode": "VPB_PRO",
    "pros": [
      "Vốn điều lệ nằm trong nhóm cao nhất thị trường chứng khoán Việt Nam",
      "Hệ sinh thái liên kết chặt chẽ với ngân hàng mẹ VPBank (nạp rút tiền siêu tốc)",
      "Ứng dụng NEO Invest hiện đại, nhiều tính năng phân tích và tin tức"
    ],
    "cons": [
      "Chính sách phí sau thời gian khuyến mãi có thể thay đổi theo chính sách ngân hàng"
    ],
    "suitableFor": "Khách hàng đã có tài khoản ngân hàng VPBank, nhà đầu tư cần hạn mức margin vốn lớn và nạp rút tiền tức thời.",
    "platforms": [
      "NEO Invest App",
      "VPBankS Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://www.vpbanks.com.vn/bieu-phi"
  },
  {
    "id": "fpts",
    "name": "Công ty Cổ phần Chứng khoán FPT",
    "shortName": "FPTS",
    "brandColor": "#f37023",
    "stockCode": "FTS",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": "FPT",
    "bankBacked": null,
    "establishedYear": 2007,
    "marketShareRank": "Top 11-12 HOSE (~2.7%)",
    "tradingFee": {
      "onlineMin": 0.08,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.08% - 0.15% (Biểu phí bậc thang)",
      "notes": "Biểu phí bậc thang tính theo tổng giá trị khớp lệnh trong ngày. Giao dịch càng nhiều, phí càng rẻ (tối thiểu 0.08%)."
    },
    "margin": {
      "minRate": 10.5,
      "maxRate": 13.5,
      "medianRate": 12,
      "baseRate": 12,
      "promoRate": 9.5,
      "promoDuration": "Chính sách ưu đãi định kỳ",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Ưu đãi hạn mức từ 10.5%/năm. Kỳ hạn chuẩn 90 ngày áp dụng 12.0% - 13.5%/năm, quản trị rủi ro chặt chẽ.",
      "shortTermRate": 10.5,
      "shortTermTenor": "Gói kích cầu định kỳ",
      "shortTermDisplay": "10.5% - 11.5%/năm",
      "standardRate90d": 12.5,
      "standardRateDisplay": "12.0% - 13.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ - 1.500đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Phí Bậc Thang Thấp",
      "feeOffer": "Phí giao dịch bậc thang giảm dần chỉ từ 0.08%",
      "marginOffer": "Lãi suất Margin ưu đãi kích cầu từ 9.5%/năm",
      "duration": "Theo chính sách hạn mức",
      "giftBonus": "Hệ thống EzTrade & báo cáo FPTS Research",
      "note": "Uy tín từ cổ đông chiến lược SBI Holdings Nhật Bản."
    },
    "promotions": [
      "Giảm phí giao dịch bậc thang xuống chỉ 0.08% cho ngày giao dịch lớn",
      "Hệ thống EzTrade và EzMobile ổn định, bảo mật công nghệ FPT",
      "Báo cáo phân tích ngành sâu sắc từ đội ngũ phân tích chuyên sâu"
    ],
    "accountOpeningUrl": "https://ezopen.fpts.com.vn/",
    "referralCode": "FPT_INVEST",
    "pros": [
      "Hệ thống công nghệ phần mềm do chính Tập đoàn FPT phát triển, bảo mật và ổn định",
      "Tính minh bạch cao, chính sách biểu phí bậc thang rõ ràng cho trader giao dịch lớn",
      "Đội ngũ chăm sóc khách hàng chuẩn mực, phản hồi nhanh"
    ],
    "cons": [
      "Giao diện mang phong cách cổ điển, ít tính năng xã hội hoặc gamification",
      "Không miễn phí hoàn toàn giao dịch"
    ],
    "suitableFor": "Nhà đầu tư ưa chuộng sự ổn định công nghệ, tính bảo mật cao và biểu phí bậc thang minh bạch.",
    "platforms": [
      "EzMobile App",
      "EzTrade Web",
      "EzSearch"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://www.fpts.com.vn/bieu-phi"
  },
  {
    "id": "hsc",
    "name": "Công ty Cổ phần Chứng khoán TP.Hồ Chí Minh",
    "shortName": "HSC",
    "brandColor": "#006838",
    "stockCode": "HCM",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2003,
    "marketShareRank": "Top 5 HOSE (6.80%)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.25,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15% (Chuyên nghiệp)",
      "notes": "Chính sách phân tầng dịch vụ rõ rệt: Tự giao dịch và Tư vấn chuyên gia cao cấp."
    },
    "margin": {
      "minRate": 9.5,
      "maxRate": 13.5,
      "medianRate": 11.5,
      "baseRate": 11.5,
      "promoRate": 9,
      "promoDuration": "Gói kích cầu tài khoản mở mới",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Chính sách ưu đãi kích cầu ngắn hạn từ 9.5%/năm. Kỳ hạn tiêu chuẩn 90 ngày từ 11.5% - 13.0%/năm.",
      "shortTermRate": 9.5,
      "shortTermTenor": "Gói kích cầu mở mới ngắn hạn",
      "shortTermDisplay": "9.5% - 10.5%/năm (Ngắn hạn)",
      "standardRate90d": 12,
      "standardRateDisplay": "11.5% - 13.0%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ - 2.500đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Chuẩn Quốc Tế",
      "feeOffer": "Gói phí ưu đãi linh hoạt từ 0.10% cho khách hàng mới",
      "marginOffer": "Lãi suất Margin kích cầu chọn lọc từ 9.0%/năm",
      "duration": "Theo chương trình từng quý",
      "giftBonus": "Khuyến nghị HSC ONE & trung tâm phân tích hàng đầu",
      "note": "Định chế quản lý tài sản và môi giới định chế hàng đầu."
    },
    "promotions": [
      "Gói ưu đãi phí và lãi suất margin cho tài khoản mở mới",
      "Nền tảng đào tạo HSC Edu và phân tích chuyên sâu myhsc"
    ],
    "accountOpeningUrl": "https://register.hsc.com.vn/",
    "referralCode": "HSC_SELECT",
    "pros": [
      "Uy tín thương hiệu vững chắc, thị phần lớn ở khối khách hàng tổ chức và nước ngoài",
      "Đội ngũ phân tích và tư vấn đầu tư chuyên môn sâu sắc bậc nhất",
      "Ứng dụng myhsc được nâng cấp mạnh mẽ, tốc độ đặt lệnh nhanh"
    ],
    "cons": [
      "Chi phí dịch vụ tư vấn môi giới ở mức cao, không cạnh tranh về giá rẻ đại trà"
    ],
    "suitableFor": "Nhà đầu tư chuyên nghiệp, khách hàng tổ chức, nhà đầu tư cá nhân có NAV lớn cần tư vấn chiến lược bài bản.",
    "platforms": [
      "myhsc App",
      "myhsc Web",
      "HSC iTrade"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://www.hsc.com.vn/bieu-phi"
  },
  {
    "id": "vietcap",
    "name": "Công ty Cổ phần Chứng khoán Vietcap",
    "shortName": "Vietcap",
    "brandColor": "#d9232a",
    "stockCode": "VCI",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2007,
    "marketShareRank": "Top 4 HOSE (7.00%) / Top 9 HNX (2.86%)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.25,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15% (Chuẩn định chế)",
      "notes": "Tập trung vào chất lượng dịch vụ và tư vấn chuyên sâu."
    },
    "margin": {
      "minRate": 9,
      "maxRate": 13,
      "medianRate": 11,
      "baseRate": 11,
      "promoRate": 9,
      "promoDuration": "Chính sách ưu đãi theo hạn mức",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Ưu đãi cho khách hàng VIP và hạn mức lớn từ 9.0%/năm. Kỳ hạn chuẩn 90 ngày từ 11.0% - 12.5%/năm.",
      "shortTermRate": 9,
      "shortTermTenor": "Gói ưu đãi hạn mức VIP",
      "shortTermDisplay": "9.0% - 10.5%/năm (Hạn mức lớn)",
      "standardRate90d": 11.5,
      "standardRateDisplay": "11.0% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ - 2.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Vietcap Trading",
      "feeOffer": "Ưu đãi phí giao dịch trực tuyến từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi theo gói từ 9.0%/năm",
      "duration": "Theo hạn mức tài khoản",
      "giftBonus": "Báo cáo phân tích doanh nghiệp chuyên sâu Vietcap Research",
      "note": "Thế mạnh tư vấn IB và thị phần môi giới tổ chức hàng đầu."
    },
    "promotions": [
      "Báo cáo phân tích doanh nghiệp và chiến lược độc quyền",
      "Hệ thống Vietcap Mobile giao dịch mượt mà"
    ],
    "accountOpeningUrl": "https://www.vietcap.com.vn/mo-tai-khoan",
    "referralCode": "VIETCAP_VIP",
    "pros": [
      "Đơn vị dẫn đầu thị trường về mảng Ngân hàng Đầu tư (IB) và tư vấn thương vụ M&A",
      "Báo cáo phân tích doanh nghiệp được giới đầu tư chuyên nghiệp đánh giá rất cao",
      "Khách hàng VIP nhận được sự chăm sóc từ các chuyên gia hàng đầu"
    ],
    "cons": [
      "Không hướng tới khách hàng thích phí 0 đồng hoặc đòn bẩy quá cao"
    ],
    "suitableFor": "Nhà đầu tư theo trường phái đầu tư giá trị, mua cổ phiếu cơ bản, theo dõi các thương vụ lớn.",
    "platforms": [
      "Vietcap Mobile",
      "VCI Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://www.vietcap.com.vn/bieu-phi"
  },
  {
    "id": "kafi",
    "name": "Công ty Cổ phần Chứng khoán Kafi",
    "shortName": "Kafi",
    "brandColor": "#0066cc",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết",
    "isListed": false,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2006,
    "marketShareRank": "CTCK tăng trưởng nhanh",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.12,
      "brokerMax": 0.18,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15% (Chuẩn thường)",
      "notes": "Chính sách miễn phí giao dịch mở mới, gói phí cực thấp sau ưu đãi."
    },
    "margin": {
      "minRate": 7.8,
      "maxRate": 11.8,
      "medianRate": 9.8,
      "baseRate": 9.8,
      "promoRate": 7.8,
      "promoDuration": "Ưu đãi khách hàng mới & Gói linh hoạt",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK) / Gói Hợp tác đầu tư",
      "interestFreeDays": 0,
      "notes": "Chính sách linh hoạt cho gói lướt ngắn hạn từ 7.8%/năm. Dư nợ tiêu chuẩn 90 ngày áp dụng 10.5% - 11.8%/năm.",
      "shortTermRate": 7.8,
      "shortTermTenor": "Gói lướt sóng ngắn hạn T+",
      "shortTermDisplay": "7.8% - 9.0%/năm (Gói lướt T+)",
      "standardRate90d": 11,
      "standardRateDisplay": "10.5% - 11.8%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 500,
      "notes": "500đ - 1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Zero-Fee & 7.8%",
      "feeOffer": "Miễn phí giao dịch cổ phiếu cho tài khoản mở mới",
      "marginOffer": "Lãi suất Margin ưu đãi cạnh tranh chỉ 7.8%/năm",
      "duration": "90 ngày đầu kể từ ngày mở",
      "giftBonus": "Voucher ưu đãi lãi suất & gói phân tích Kafi Wealth",
      "note": "Nguồn vốn dồi dào, tăng trưởng ấn tượng trong nhóm fintech."
    },
    "promotions": [
      "Miễn phí giao dịch cho khách hàng mở tài khoản mới",
      "Lãi suất margin ưu đãi kích cầu chỉ từ 7.8%/năm",
      "Ứng dụng Kafi Wealth tích hợp quản lý tài sản linh hoạt"
    ],
    "accountOpeningUrl": "https://kafi.vn/mo-tai-khoan",
    "referralCode": "KAFI_COMMUNITY",
    "pros": [
      "Chính sách biểu phí và lãi margin cực kỳ cạnh tranh, nhiều ưu đãi hấp dẫn",
      "Tốc độ phát triển công nghệ nhanh, ứng dụng Kafi Wealth trẻ trung, trực quan",
      "Chăm sóc khách hàng năng động, thủ tục eKYC nhanh gọn"
    ],
    "cons": [
      "Quy mô mạng lưới chi nhánh còn đang trong giai đoạn mở rộng"
    ],
    "suitableFor": "Nhà đầu tư trẻ tìm kiếm mức lãi suất margin rẻ và nền tảng công nghệ mới mẻ.",
    "platforms": [
      "Kafi Wealth App",
      "Kafi Trade Web"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://kafi.vn/bieu-phi"
  },
  {
    "id": "mbs",
    "name": "Công ty Cổ phần Chứng khoán MB",
    "shortName": "MBS",
    "brandColor": "#002b66",
    "stockCode": "MBS",
    "listingExchange": "HNX",
    "listingStatus": "Niêm yết HNX",
    "isListed": true,
    "parentStockCode": "MBB",
    "bankBacked": "MBBank",
    "establishedYear": 2000,
    "marketShareRank": "Top 6 HOSE (4.79%) / Top 6 HNX (5.34%)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15% (Ưu đãi eKYC)",
      "notes": "Biểu phí cạnh tranh cho khách hàng mở tài khoản eKYC trực tuyến, tích hợp toàn diện hệ sinh thái MB."
    },
    "margin": {
      "minRate": 8.5,
      "maxRate": 12.5,
      "medianRate": 10.5,
      "baseRate": 10.5,
      "promoRate": 8.5,
      "promoDuration": "Gói M-Margin ưu đãi khách hàng mới",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Gói M-Margin ưu đãi 30 ngày đầu từ 8.5%/năm. Kỳ hạn chuẩn 90 ngày từ 11.0% - 12.5%/năm, nguồn vốn ngân hàng MBBank.",
      "shortTermRate": 8.5,
      "shortTermTenor": "Gói M-Margin ưu đãi 30 ngày",
      "shortTermDisplay": "8.5% - 9.9%/năm (Gói 30 ngày)",
      "standardRate90d": 11.8,
      "standardRateDisplay": "11.0% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ - 2.000đ/HĐ tùy hạn mức giao dịch"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Sinh Thái MBBank",
      "feeOffer": "Ưu đãi phí giao dịch trực tuyến chỉ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.5%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Tài khoản số đẹp MBBank & trợ lý ảo Dolphin AI",
      "note": "Hậu thuẫn từ Ngân hàng Quân Đội MB, hệ thống ổn định."
    },
    "promotions": [
      "Lãi suất vay Margin ưu đãi chỉ từ 8.5%/năm",
      "Miễn phí nộp rút tiền tức thời liên kết tài khoản MBBank",
      "Trợ lý ảo Dolphin AI phân tích cổ phiếu và khuyến nghị thông minh"
    ],
    "accountOpeningUrl": "https://mbs.com.vn/mo-tai-khoan/",
    "referralCode": "MBS_COMMUNITY",
    "pros": [
      "Hậu thuẫn định chế tài chính vững vàng từ Tập đoàn Quân đội MBBank",
      "Nền tảng MBS Mobile mượt mà, tính năng trợ lý Dolphin AI hỗ trợ đắc lực",
      "Trung tâm nghiên cứu phân tích chuyên sâu các ngành trọng điểm"
    ],
    "cons": [
      "Không áp dụng chính sách miễn phí giao dịch 0đ trọn đời"
    ],
    "suitableFor": "Khách hàng sử dụng tài khoản MBBank, nhà đầu tư tìm kiếm sự ổn định về nguồn vốn margin và báo cáo phân tích uy tín.",
    "platforms": [
      "MBS Mobile App",
      "MBS Web Trading",
      "Bảng giá MB"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://mbs.com.vn/bieu-phi/"
  },
  {
    "id": "shs",
    "name": "Công ty Cổ phần Chứng khoán Sài Gòn - Hà Nội",
    "shortName": "SHS",
    "brandColor": "#f37024",
    "stockCode": "SHS",
    "listingExchange": "HNX",
    "listingStatus": "Niêm yết HNX",
    "isListed": true,
    "parentStockCode": "SHB",
    "bankBacked": "SHB",
    "establishedYear": 2007,
    "marketShareRank": "Top 10-15 HNX & HOSE",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Phí giao dịch trực tuyến cạnh tranh qua ứng dụng SHS Mobile."
    },
    "margin": {
      "minRate": 9.9,
      "maxRate": 13.5,
      "medianRate": 11.7,
      "baseRate": 11.7,
      "promoRate": 8.9,
      "promoDuration": "Chương trình ưu đãi theo quý",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Ưu đãi theo quý từ 9.9%/năm. Kỳ hạn tiêu chuẩn 90 ngày áp dụng 12.0% - 13.5%/năm.",
      "shortTermRate": 9.9,
      "shortTermTenor": "Gói ưu đãi theo quý",
      "shortTermDisplay": "9.9% - 11.0%/năm",
      "standardRate90d": 12.5,
      "standardRateDisplay": "12.0% - 13.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ - 2.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "SHB Sinh Thái",
      "feeOffer": "Ưu đãi phí giao dịch từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.9%/năm",
      "duration": "Theo chương trình mở mới",
      "giftBonus": "Tích hợp dịch vụ ngân hàng SHB & tư vấn thị trường",
      "note": "Thương hiệu lâu đời, mạng lưới chi nhánh rộng."
    },
    "promotions": [
      "Ưu đãi lãi suất margin cho tài khoản mở mới",
      "Tích hợp luồng tiền nạp rút siêu tốc với ngân hàng SHB",
      "Báo cáo chiến lược tuần và danh mục cổ phiếu khuyến nghị độc quyền"
    ],
    "accountOpeningUrl": "https://openaccount.shs.com.vn/",
    "referralCode": "SHS_INVEST",
    "pros": [
      "Quy mô vốn tự có lớn trong nhóm dẫn đầu thị trường",
      "Liên kết chặt chẽ với ngân hàng SHB",
      "Đội ngũ môi giới và chuyên gia am hiểu thị trường miền Bắc"
    ],
    "cons": [
      "Giao diện ứng dụng di động còn truyền thống"
    ],
    "suitableFor": "Nhà đầu tư chuộng nhóm cổ phiếu tài chính, khách hàng thân thiết ngân hàng SHB.",
    "platforms": [
      "SHS Mobile",
      "SHS Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://www.shs.com.vn/bieu-phi"
  },
  {
    "id": "vix",
    "name": "Công ty Cổ phần Chứng khoán VIX",
    "shortName": "VIX",
    "brandColor": "#e60000",
    "stockCode": "VIX",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2007,
    "marketShareRank": "Top 10 HNX (2.66%) / Top tự doanh",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Biểu phí giao dịch cạnh tranh dành cho nhà đầu tư chủ động."
    },
    "margin": {
      "minRate": 10,
      "maxRate": 13.5,
      "medianRate": 11.75,
      "baseRate": 11.75,
      "promoRate": 8.8,
      "promoDuration": "Ưu đãi giao dịch thường xuyên",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Chính sách ưu đãi giao dịch ngắn hạn từ 10.0%/năm. Kỳ hạn chuẩn 90 ngày từ 12.0% - 13.5%/năm.",
      "shortTermRate": 10,
      "shortTermTenor": "Ưu đãi giao dịch thường xuyên",
      "shortTermDisplay": "10.0% - 11.5%/năm",
      "standardRate90d": 12.5,
      "standardRateDisplay": "12.0% - 13.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Lãi Suất Thấp 8.8%",
      "feeOffer": "Phí giao dịch trực tuyến cạnh tranh 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.8%/năm (chuẩn 10.9% - 11.5%)",
      "duration": "90 ngày đầu",
      "giftBonus": "Tư vấn room lệnh & hỗ trợ đòn bẩy linh hoạt",
      "note": "Nguồn vốn dồi dào, thanh khoản thị trường năng động."
    },
    "promotions": [
      "Hạn mức cho vay margin lớn cho trader năng động",
      "Nâng cấp hệ thống VIX Trading với tốc độ khớp lệnh siêu tốc"
    ],
    "accountOpeningUrl": "https://vixs.vn/mo-tai-khoan",
    "referralCode": "VIX_PRO",
    "pros": [
      "Tốc độ xử lý lệnh cực nhanh trong các phiên biến động lớn",
      "Hạn mức tự doanh và margin lớn",
      "Quy trình mở tài khoản eKYC kích hoạt nhanh chóng"
    ],
    "cons": [
      "Tập trung vào mảng tự doanh, ít dịch vụ tư vấn 1-1 chuyên sâu cho người mới"
    ],
    "suitableFor": "Trader lướt sóng chuyên nghiệp, nhà đầu tư cá nhân tự giao dịch quan tâm đến tốc độ lệnh.",
    "platforms": [
      "VIX Mobile",
      "VIX Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://vixs.vn/bieu-phi"
  },
  {
    "id": "kis",
    "name": "Công ty Cổ phần Chứng khoán KIS Việt Nam",
    "shortName": "KIS",
    "brandColor": "#003399",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết (FDI Hàn Quốc)",
    "isListed": false,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2010,
    "marketShareRank": "Top 9 HOSE (2.99%) / Top vốn ngoại",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.25,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Biểu phí ổn định theo tiêu chuẩn kiểm toán quốc tế Hàn Quốc."
    },
    "margin": {
      "minRate": 9.5,
      "maxRate": 12.5,
      "medianRate": 11,
      "baseRate": 11,
      "promoRate": 7.99,
      "promoDuration": "Ưu đãi 90 ngày tài khoản mới",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Nguồn vốn FDI Hàn Quốc, ưu đãi mở mới từ 9.5%/năm. Kỳ hạn tiêu chuẩn 90 ngày áp dụng 11.5% - 12.5%/năm.",
      "shortTermRate": 9.5,
      "shortTermTenor": "Ưu đãi mở mới 90 ngày đầu",
      "shortTermDisplay": "9.5% - 10.5%/năm (Ưu đãi đầu)",
      "standardRate90d": 11.8,
      "standardRateDisplay": "11.5% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Vốn Hàn Quốc 7.99%",
      "feeOffer": "Ưu đãi phí giao dịch trực tuyến từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi chỉ 7.99%/năm",
      "duration": "60 ngày đầu",
      "giftBonus": "Báo cáo phân tích KIS Research & phái sinh",
      "note": "Tiềm lực tài chính từ Tập đoàn Korea Investment & Securities."
    },
    "promotions": [
      "Lãi suất vay margin ưu đãi từ 7.99%/năm",
      "Nhà phát hành chứng quyền có bảo đảm (CW) quy mô lớn nhất thị trường"
    ],
    "accountOpeningUrl": "https://kisvn.vn/mo-tai-khoan",
    "referralCode": "KIS_VIP",
    "pros": [
      "Tổ chức phát hành và tạo lập thị trường chứng quyền (CW) hàng đầu",
      "Lãi suất margin cạnh tranh nhờ tiềm lực tài chính quốc tế",
      "Hệ thống quản trị rủi ro nghiêm ngặt chuẩn quốc tế"
    ],
    "cons": [
      "Giao diện phần mềm mang phong cách truyền thống"
    ],
    "suitableFor": "Nhà đầu tư giao dịch chứng quyền (CW) và nhà đầu tư cần mức lãi suất vay margin thấp.",
    "platforms": [
      "KIS MTS Mobile",
      "KIS WTS Web"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://kisvn.vn/bieu-phi"
  },
  {
    "id": "acbs",
    "name": "Công ty TNHH Chứng khoán ACB",
    "shortName": "ACBS",
    "brandColor": "#005baa",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết (Thuộc ACB)",
    "isListed": false,
    "parentStockCode": "ACB",
    "bankBacked": "ACB",
    "establishedYear": 2000,
    "marketShareRank": "Top 10-15 HOSE (Hệ sinh thái ACB)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Biểu phí minh bạch, chuẩn định chế tài chính ngân hàng Á Châu (ACB)."
    },
    "margin": {
      "minRate": 9.5,
      "maxRate": 12.5,
      "medianRate": 11,
      "baseRate": 11,
      "promoRate": 8.5,
      "promoDuration": "Gói ưu đãi khách hàng ưu tiên ACB",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Ưu đãi khách hàng liên kết ACB từ 9.5%/năm. Kỳ hạn chuẩn 90 ngày áp dụng 11.5% - 12.5%/năm.",
      "shortTermRate": 9.5,
      "shortTermTenor": "Gói ưu đãi khách hàng ACB",
      "shortTermDisplay": "9.5% - 10.5%/năm (Khách ACB)",
      "standardRate90d": 11.8,
      "standardRateDisplay": "11.5% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Ngân Hàng ACB",
      "feeOffer": "Ưu đãi phí giao dịch từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.5%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Liên kết tài khoản ACB ONE & tư vấn chuyên nghiệp",
      "note": "Bảo chứng từ Ngân hàng TMCP Á Châu (ACB)."
    },
    "promotions": [
      "Tích hợp nạp rút tức thời với tài khoản số ACB ONE",
      "Gói vay Margin lãi suất ưu đãi cho khách hàng ACB Privilege"
    ],
    "accountOpeningUrl": "https://acbs.com.vn/mo-tai-khoan",
    "referralCode": "ACB_INVEST",
    "pros": [
      "Thương hiệu ngân hàng ACB uy tín hàng đầu, quản trị rủi ro mẫu mực",
      "Hệ thống thanh toán nạp rút tiền an toàn tuyệt đối",
      "Đội ngũ môi giới và tư vấn đào tạo bài bản"
    ],
    "cons": [
      "Danh mục margin tập trung chủ yếu vào cổ phiếu rổ an toàn, không có gói đòn bẩy vượt khung (3:7)"
    ],
    "suitableFor": "Khách hàng ngân hàng ACB, nhà đầu tư đề cao tính bền vững và sự an toàn vốn tài khoản.",
    "platforms": [
      "ACBS Mobile",
      "ACBS Trade Web"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://acbs.com.vn/bieu-phi"
  },
  {
    "id": "vcbs",
    "name": "Công ty TNHH Chứng khoán Vietcombank",
    "shortName": "VCBS",
    "brandColor": "#005c30",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết (Thuộc Vietcombank)",
    "isListed": false,
    "parentStockCode": "VCB",
    "bankBacked": "Vietcombank",
    "establishedYear": 2002,
    "marketShareRank": "Top 15 HOSE / Hệ sinh thái Vietcombank",
    "tradingFee": {
      "onlineMin": 0.12,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.12% - 0.15%",
      "notes": "Biểu phí ổn định, bảo chứng uy tín tuyệt đối từ Ngân hàng Ngoại thương Việt Nam."
    },
    "margin": {
      "minRate": 10,
      "maxRate": 12.5,
      "medianRate": 11.25,
      "baseRate": 11.25,
      "promoRate": 8.5,
      "promoDuration": "Chính sách lãi suất bậc thang theo dư nợ",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Chính sách bậc thang Vietcombank từ 10.0%/năm cho hạn mức lớn. Kỳ hạn chuẩn 90 ngày 11.0% - 12.5%/năm.",
      "shortTermRate": 10,
      "shortTermTenor": "Ưu đãi hạn mức lớn Vietcombank",
      "shortTermDisplay": "10.0% - 11.0%/năm (Hạn mức lớn)",
      "standardRate90d": 11.5,
      "standardRateDisplay": "11.0% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Vietcombank Uy Tín",
      "feeOffer": "Phí giao dịch ưu đãi từ 0.12%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.5%/năm",
      "duration": "Gói khách hàng mới",
      "giftBonus": "Tích hợp VCB Digibank & uy tín định chế hàng đầu",
      "note": "Trực thuộc Ngân hàng Vietcombank, an toàn vốn tuyệt đối."
    },
    "promotions": [
      "Liên kết trực tiếp nạp rút tức thì với VCB Digibank",
      "Gói ưu đãi đặc quyền cho khách hàng Vietcombank Priority"
    ],
    "accountOpeningUrl": "https://vcbs.com.vn/mo-tai-khoan",
    "referralCode": "VCB_COMMUNITY",
    "pros": [
      "Bảo chứng an toàn cao nhất toàn ngành từ Ngân hàng Vietcombank",
      "Hệ thống bảo mật giao dịch cấp độ định chế ngân hàng",
      "Báo cáo phân tích kinh tế vĩ mô và thị trường trái phiếu hàng đầu"
    ],
    "cons": [
      "Quy trình thẩm định tín dụng khắt khe, không cung cấp các gói đòn bẩy vượt khung an toàn"
    ],
    "suitableFor": "Khách hàng sử dụng Vietcombank, nhà đầu tư tổ chức và cá nhân NAV lớn cần sự bảo đảm vốn an toàn nhất.",
    "platforms": [
      "VCBS Mobile",
      "VCBS Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://vcbs.com.vn/bieu-phi"
  },
  {
    "id": "kbsv",
    "name": "Công ty Cổ phần Chứng khoán KB Việt Nam",
    "shortName": "KBSV",
    "brandColor": "#ffbc00",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết (FDI Hàn Quốc)",
    "isListed": false,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2008,
    "marketShareRank": "Top 15 HOSE (Vốn Hàn Quốc)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Phí giao dịch cạnh tranh, tư vấn đầu tư chuyên nghiệp."
    },
    "margin": {
      "minRate": 9,
      "maxRate": 12.5,
      "medianRate": 10.75,
      "baseRate": 10.75,
      "promoRate": 7.9,
      "promoDuration": "Ưu đãi KB-Margin cho khách hàng mới",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Vốn tập đoàn KB Hàn Quốc, gói ngắn hạn từ 9.0%/năm. Dư nợ tiêu chuẩn 90 ngày từ 11.5% - 12.5%/năm.",
      "shortTermRate": 9,
      "shortTermTenor": "Gói KB-Margin ngắn hạn",
      "shortTermDisplay": "9.0% - 10.5%/năm (Gói KB-Margin)",
      "standardRate90d": 11.8,
      "standardRateDisplay": "11.5% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "KB Financial 7.9%",
      "feeOffer": "Phí giao dịch trực tuyến ưu đãi chỉ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi hấp dẫn chỉ từ 7.9%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Ứng dụng KB Buddy cho F0 & báo cáo chuyên sâu",
      "note": "Cổ đông tài chính hàng đầu Hàn Quốc KB Financial Group."
    },
    "promotions": [
      "Lãi suất vay Margin cạnh tranh chỉ từ 7.9%/năm",
      "Nền tảng KB Buddy tích hợp mạng xã hội đầu tư và kiến thức trực quan"
    ],
    "accountOpeningUrl": "https://kbsec.com.vn/mo-tai-khoan",
    "referralCode": "KB_INVEST",
    "pros": [
      "Hậu thuẫn vốn quy mô lớn từ KB Financial Group",
      "Lãi suất cho vay margin thuộc nhóm rẻ nhất thị trường",
      "Ứng dụng KB Buddy hiện đại, sinh động, dễ tiếp cận cho người mới"
    ],
    "cons": [
      "Thị phần môi giới cần thời gian mở rộng ngoài các thành phố lớn"
    ],
    "suitableFor": "Nhà đầu tư cá nhân tìm kiếm lãi suất margin rẻ và ứng dụng đầu tư thân thiện, hiện đại.",
    "platforms": [
      "KB Buddy App",
      "KB-Trade Web"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://kbsec.com.vn/bieu-phi"
  },
  {
    "id": "cts",
    "name": "Công ty Cổ phần Chứng khoán Ngân hàng Công Thương Việt Nam",
    "shortName": "VietinBank Sec",
    "brandColor": "#003b70",
    "stockCode": "CTS",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": "CTG",
    "bankBacked": "VietinBank",
    "establishedYear": 2000,
    "marketShareRank": "Top 15-20 HOSE & HNX (VietinBank)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Biểu phí cạnh tranh theo quy chuẩn định chế ngân hàng VietinBank."
    },
    "margin": {
      "minRate": 10,
      "maxRate": 13,
      "medianRate": 11.5,
      "baseRate": 11.5,
      "promoRate": 8.5,
      "promoDuration": "Gói ưu đãi tài khoản mở mới",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Nguồn vốn ổn định VietinBank, ưu đãi từ 10.0%/năm. Kỳ hạn chuẩn 90 ngày từ 11.5% - 13.0%/năm.",
      "shortTermRate": 10,
      "shortTermTenor": "Gói ưu đãi tài khoản mở mới",
      "shortTermDisplay": "10.0% - 11.5%/năm (Ưu đãi)",
      "standardRate90d": 12,
      "standardRateDisplay": "11.5% - 13.0%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "VietinBank Uy Tín",
      "feeOffer": "Phí giao dịch ưu đãi từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.5%/năm",
      "duration": "Gói ưu đãi mở mới",
      "giftBonus": "Tích hợp ngân hàng VietinBank iPay & tư vấn tài chính",
      "note": "Nguồn vốn ngân hàng quốc doanh VietinBank dồi dào."
    },
    "promotions": [
      "Ưu đãi kết nối luồng tiền với VietinBank iPay",
      "Gói lãi suất Margin kích cầu chỉ từ 8.5%/năm"
    ],
    "accountOpeningUrl": "https://cts.vn/mo-tai-khoan",
    "referralCode": "CTS_COMMUNITY",
    "pros": [
      "Bảo chứng uy tín từ một trong 4 ngân hàng quốc doanh lớn nhất Việt Nam",
      "Kinh nghiệm tư vấn niêm yết và bảo lãnh phát hành lâu năm",
      "Hệ thống vận hành an toàn và kiểm soát rủi ro bài bản"
    ],
    "cons": [
      "Tốc độ ra mắt tính năng số mới cần đẩy mạnh hơn nữa"
    ],
    "suitableFor": "Khách hàng của VietinBank, nhà đầu tư chuộng sự chuẩn mực của định chế quốc doanh.",
    "platforms": [
      "CTS Mobile",
      "CTS Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://cts.vn/bieu-phi"
  },
  {
    "id": "bvsc",
    "name": "Công ty Cổ phần Chứng khoán Bảo Việt",
    "shortName": "BVSC",
    "brandColor": "#004899",
    "stockCode": "BVS",
    "listingExchange": "HNX",
    "listingStatus": "Niêm yết HNX",
    "isListed": true,
    "parentStockCode": "BVH",
    "bankBacked": null,
    "establishedYear": 1999,
    "marketShareRank": "Top 15-20 HOSE (Bảo Việt)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Biểu phí ổn định, dịch vụ tư vấn nghiên cứu uy tín từ 1999."
    },
    "margin": {
      "minRate": 10,
      "maxRate": 13,
      "medianRate": 11.5,
      "baseRate": 11.5,
      "promoRate": 8.8,
      "promoDuration": "Chính sách ưu đãi định kỳ",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Bảo trợ từ Tập đoàn Bảo Việt, ưu đãi từ 10.0%/năm. Kỳ hạn chuẩn 90 ngày từ 11.5% - 13.0%/năm.",
      "shortTermRate": 10,
      "shortTermTenor": "Chính sách ưu đãi định kỳ",
      "shortTermDisplay": "10.0% - 11.5%/năm",
      "standardRate90d": 12,
      "standardRateDisplay": "11.5% - 13.0%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Tập Đoàn Bảo Việt",
      "feeOffer": "Phí giao dịch trực tuyến ưu đãi từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.8%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Hệ sinh thái tài chính - bảo hiểm Bảo Việt",
      "note": "Thương hiệu chứng khoán lâu đời nhất Việt Nam (thành lập 1999)."
    },
    "promotions": [
      "Gói dịch vụ tài chính kết hợp giải pháp bảo hiểm tích sản Bảo Việt",
      "Hội thảo trực tuyến và báo cáo chiến lược doanh nghiệp độc quyền"
    ],
    "accountOpeningUrl": "https://bvsc.com.vn/mo-tai-khoan",
    "referralCode": "BVSC_PARTNER",
    "pros": [
      "Công ty chứng khoán đầu tiên thành lập tại Việt Nam, bề dày lịch sử và kinh nghiệm",
      "Đội ngũ phân tích kinh tế vĩ mô có chất lượng dự báo uy tín cao",
      "Dịch vụ tư vấn khách hàng cá nhân giàu kinh nghiệm"
    ],
    "cons": [
      "Không theo đuổi chiến lược cạnh tranh giá rẻ 0đ"
    ],
    "suitableFor": "Nhà đầu tư theo trường phái đầu tư giá trị, khách hàng trung niên ưa chuộng sự ổn định bền vững.",
    "platforms": [
      "BVSC Mobile",
      "B-Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://bvsc.com.vn/bieu-phi"
  },
  {
    "id": "tps",
    "name": "Công ty Cổ phần Chứng khoán Tiên Phong",
    "shortName": "TPS",
    "brandColor": "#572b84",
    "stockCode": "ORS",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": "TPB",
    "bankBacked": "TPBank",
    "establishedYear": 2006,
    "marketShareRank": "Top 20 HOSE (Tiên Phong / TPBank)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Biểu phí cạnh tranh, liên kết chặt chẽ ngân hàng số TPBank."
    },
    "margin": {
      "minRate": 9.5,
      "maxRate": 12.5,
      "medianRate": 11,
      "baseRate": 11,
      "promoRate": 8.6,
      "promoDuration": "Ưu đãi mở mới theo gói",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Liên kết TPBank, ưu đãi mở mới từ 9.5%/năm. Kỳ hạn chuẩn 90 ngày từ 11.5% - 12.5%/năm.",
      "shortTermRate": 9.5,
      "shortTermTenor": "Gói ưu đãi số TPBank",
      "shortTermDisplay": "9.5% - 10.5%/năm",
      "standardRate90d": 11.8,
      "standardRateDisplay": "11.5% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Tiên Phong TPBank",
      "feeOffer": "Phí giao dịch ưu đãi từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.6%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Liên kết TPBank & trợ lý đầu tư công nghệ số",
      "note": "Hệ sinh thái công nghệ tài chính năng động từ TPBank."
    },
    "promotions": [
      "Miễn phí chuyển nộp tiền tức thời qua App TPBank",
      "Lãi suất Margin ưu đãi kích cầu chỉ từ 8.6%/năm"
    ],
    "accountOpeningUrl": "https://tpbs.com.vn/mo-tai-khoan",
    "referralCode": "TPS_DIGITAL",
    "pros": [
      "Công nghệ số hiện đại kết nối trực tiếp với ứng dụng ngân hàng TPBank",
      "Thế mạnh lớn về tư vấn trái phiếu và dịch vụ thị trường nợ",
      "Thủ tục mở tài khoản eKYC chỉ trong 1 phút"
    ],
    "cons": [
      "Danh mục tự doanh có tính biến động theo thị trường trái phiếu doanh nghiệp"
    ],
    "suitableFor": "Nhà đầu tư trẻ chuộng công nghệ số, người dùng hệ sinh thái ngân hàng số TPBank.",
    "platforms": [
      "TPS Mobile",
      "TPS Trade Web"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://tpbs.com.vn/bieu-phi"
  },
  {
    "id": "yuanta",
    "name": "Công ty TNHH Chứng khoán Yuanta Việt Nam",
    "shortName": "Yuanta",
    "brandColor": "#0066b3",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết (FDI Đài Loan)",
    "isListed": false,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2007,
    "marketShareRank": "Top 20 HOSE (Tập đoàn Yuanta Đài Loan)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Biểu phí ổn định, cung cấp công cụ phân tích YSRadar độc quyền."
    },
    "margin": {
      "minRate": 8.8,
      "maxRate": 12,
      "medianRate": 10.4,
      "baseRate": 10.4,
      "promoRate": 7.99,
      "promoDuration": "Gói ưu đãi 90 ngày tài khoản mới",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Vốn từ Yuanta Đài Loan, ưu đãi ban đầu từ 8.8%/năm. Dư nợ chuẩn 90 ngày sau ưu đãi từ 11.0% - 12.0%/năm.",
      "shortTermRate": 8.8,
      "shortTermTenor": "Gói ưu đãi 90 ngày đầu",
      "shortTermDisplay": "8.8% - 10.0%/năm (Ưu đãi đầu)",
      "standardRate90d": 11.2,
      "standardRateDisplay": "11.0% - 12.0%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Vốn Đài Loan 7.99%",
      "feeOffer": "Phí giao dịch ưu đãi từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi chỉ 7.99%/năm",
      "duration": "60 ngày đầu",
      "giftBonus": "Bộ công cụ chọn cổ phiếu YSuri & báo cáo Yuanta",
      "note": "Tập đoàn tài chính Yuanta hàng đầu khu vực Châu Á."
    },
    "promotions": [
      "Lãi suất vay margin ưu đãi chỉ từ 7.99%/năm",
      "Miễn phí sử dụng công cụ chấm điểm và cảnh báo cổ phiếu YSRadar"
    ],
    "accountOpeningUrl": "https://yuanta.com.vn/mo-tai-khoan",
    "referralCode": "YUANTA_VIP",
    "pros": [
      "Công cụ chọn lọc cổ phiếu YSRadar và YSwealth trực quan, hiệu quả",
      "Lãi suất margin cạnh tranh top đầu thị trường",
      "Nguồn lực tài chính quốc tế vững chắc"
    ],
    "cons": [
      "Mạng lưới phòng giao dịch chủ yếu ở các đô thị lớn"
    ],
    "suitableFor": "Trader sử dụng phân tích kỹ thuật, nhà đầu tư cần công cụ lọc sóng cổ phiếu và margin giá rẻ.",
    "platforms": [
      "YSflex Mobile",
      "Yuanta Web Trading",
      "YSRadar"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://yuanta.com.vn/bieu-phi"
  },
  {
    "id": "shinhan",
    "name": "Công ty TNHH Chứng khoán Shinhan Việt Nam",
    "shortName": "Shinhan Sec",
    "brandColor": "#0046ff",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết (FDI Hàn Quốc)",
    "isListed": false,
    "parentStockCode": null,
    "bankBacked": "Shinhan Bank",
    "establishedYear": 2016,
    "marketShareRank": "Top 20 HOSE (Shinhan Hàn Quốc)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Phí dịch vụ minh bạch chuẩn Hàn Quốc."
    },
    "margin": {
      "minRate": 8.5,
      "maxRate": 12,
      "medianRate": 10.25,
      "baseRate": 10.25,
      "promoRate": 8,
      "promoDuration": "Ưu đãi khách hàng Shinhan SOL",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Vốn từ Shinhan Financial Group, ưu đãi qua app SOL từ 8.5%/năm. Dư nợ tiêu chuẩn 90 ngày từ 11.0% - 12.0%/năm.",
      "shortTermRate": 8.5,
      "shortTermTenor": "Ưu đãi khách hàng Shinhan SOL",
      "shortTermDisplay": "8.5% - 9.8%/năm (Gói SOL)",
      "standardRate90d": 11.2,
      "standardRateDisplay": "11.0% - 12.0%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Shinhan Bank 8.0%",
      "feeOffer": "Phí giao dịch trực tuyến từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.0%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Liên kết tài khoản Shinhan Bank & ứng dụng Shinhan Alpha",
      "note": "Tiềm lực tài chính từ Tập đoàn Tài chính Shinhan Hàn Quốc."
    },
    "promotions": [
      "Tích hợp tài khoản thanh toán Shinhan Bank",
      "Lãi suất vay margin cạnh tranh chỉ từ 8.0%/năm"
    ],
    "accountOpeningUrl": "https://shinhansec.com.vn/mo-tai-khoan",
    "referralCode": "SHINHAN_SOL",
    "pros": [
      "Tiềm lực tài chính từ Tập đoàn Shinhan hàng đầu Hàn Quốc",
      "Liên kết thanh toán tiện lợi với Shinhan Bank",
      "Chính sách tín dụng ổn định"
    ],
    "cons": [
      "Ứng dụng giao dịch đang trong quá trình hoàn thiện thêm tiện ích"
    ],
    "suitableFor": "Khách hàng cá nhân và doanh nghiệp có quan hệ với Shinhan Bank, nhà đầu tư chuộng vốn ngoại.",
    "platforms": [
      "Shinhan Alpha VN",
      "Shinhan Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://shinhansec.com.vn/bieu-phi"
  },
  {
    "id": "agriseco",
    "name": "Công ty Cổ phần Chứng khoán Agribank",
    "shortName": "Agriseco",
    "brandColor": "#8b181b",
    "stockCode": "AGR",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": "Agribank",
    "establishedYear": 2000,
    "marketShareRank": "Mạng lưới ngân hàng rộng nhất VN",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Biểu phí ổn định, độ an toàn cao."
    },
    "margin": {
      "minRate": 10.5,
      "maxRate": 13,
      "medianRate": 11.75,
      "baseRate": 11.75,
      "promoRate": 8.8,
      "promoDuration": "Chính sách ưu đãi tài khoản mở mới",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Bảo chứng Ngân hàng Nông nghiệp Agribank, ưu đãi từ 10.5%/năm. Kỳ hạn chuẩn 90 ngày từ 12.0% - 13.0%/năm.",
      "shortTermRate": 10.5,
      "shortTermTenor": "Chính sách ưu đãi mở mới",
      "shortTermDisplay": "10.5% - 11.5%/năm",
      "standardRate90d": 12.5,
      "standardRateDisplay": "12.0% - 13.0%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Agribank Nông Nghiệp",
      "feeOffer": "Phí giao dịch trực tuyến từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.8%/năm",
      "duration": "Theo chương trình từng quý",
      "giftBonus": "Mạng lưới ngân hàng Agribank phủ khắp cả nước",
      "note": "Trực thuộc Ngân hàng Nông nghiệp & PT Nông thôn Việt Nam (Agribank)."
    },
    "promotions": [
      "Ưu đãi nộp rút tiền tức thời qua hệ thống ngân hàng Agribank",
      "Báo cáo phân tích ngành nông nghiệp và hàng hóa chuyên sâu"
    ],
    "accountOpeningUrl": "https://agriseco.com.vn/mo-tai-khoan",
    "referralCode": "AGR_COMMUNITY",
    "pros": [
      "Mạng lưới chi nhánh hỗ trợ rộng khắp 63 tỉnh thành qua hệ thống Agribank",
      "Độ an toàn vốn tuyệt đối, quản trị rủi ro nghiêm ngặt",
      "Chi phí minh bạch"
    ],
    "cons": [
      "Ứng dụng công nghệ giao dịch mang phong cách truyền thống"
    ],
    "suitableFor": "Nhà đầu tư cá nhân trên toàn quốc chuộng uy tín từ ngân hàng Agribank, nhà đầu tư trung và dài hạn.",
    "platforms": [
      "Agriseco Mobile",
      "Agriseco Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://agriseco.com.vn/bieu-phi"
  },
  {
    "id": "hdbs",
    "name": "Công ty Cổ phần Chứng khoán HD",
    "shortName": "HDBS",
    "brandColor": "#c8102e",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết (Thuộc HDBank)",
    "isListed": false,
    "parentStockCode": "HDB",
    "bankBacked": "HDBank",
    "establishedYear": 2006,
    "marketShareRank": "Hệ sinh thái Sovico & HDBank",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Phí dịch vụ cạnh tranh trong hệ sinh thái Sovico."
    },
    "margin": {
      "minRate": 9.5,
      "maxRate": 12.5,
      "medianRate": 11,
      "baseRate": 11,
      "promoRate": 8.5,
      "promoDuration": "Ưu đãi khách hàng mở mới",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Hỗ trợ từ HDBank, ưu đãi ban đầu từ 9.5%/năm. Kỳ hạn tiêu chuẩn 90 ngày từ 11.5% - 12.5%/năm.",
      "shortTermRate": 9.5,
      "shortTermTenor": "Gói ưu đãi khách hàng mở mới",
      "shortTermDisplay": "9.5% - 10.5%/năm",
      "standardRate90d": 11.8,
      "standardRateDisplay": "11.5% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "HDBank Sinh Thái",
      "feeOffer": "Phí giao dịch ưu đãi từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.5%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Hệ sinh thái HDBank, Sovico & hoàn phí giao dịch",
      "note": "Hậu thuẫn tài chính từ Ngân hàng HDBank."
    },
    "promotions": [
      "Tích hợp điểm thưởng và tài khoản ngân hàng HDBank",
      "Lãi suất margin ưu đãi 8.5%/năm"
    ],
    "accountOpeningUrl": "https://hdbs.com.vn/mo-tai-khoan",
    "referralCode": "HDBS_PRO",
    "pros": [
      "Hệ sinh thái tài chính và tiêu dùng đa dạng cùng HDBank, Vietjet",
      "Nguồn vốn ổn định, chi phí giao dịch hợp lý",
      "Thủ tục eKYC tiện lợi"
    ],
    "cons": [
      "Mới tập trung mở rộng phân khúc bán lẻ trong thời gian gần đây"
    ],
    "suitableFor": "Khách hàng sử dụng dịch vụ tài chính HDBank, nhà đầu tư quan tâm đến cổ phiếu nhóm tiêu dùng và hạ tầng.",
    "platforms": [
      "HDBS Mobile",
      "HDBS Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://hdbs.vn/bieu-phi"
  },
  {
    "id": "dsc",
    "name": "Công ty Cổ phần Chứng khoán DSC",
    "shortName": "DSC",
    "brandColor": "#004b99",
    "stockCode": "DSC",
    "listingExchange": "HOSE",
    "listingStatus": "Niêm yết HOSE",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2006,
    "marketShareRank": "Tập đoàn Thành Công (TC Group)",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Biểu phí minh bạch, ứng dụng công nghệ mới."
    },
    "margin": {
      "minRate": 9,
      "maxRate": 12.5,
      "medianRate": 10.75,
      "baseRate": 10.75,
      "promoRate": 8.8,
      "promoDuration": "Gói ưu đãi kích cầu",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Bảo trợ Thành Công Group, ưu đãi từ 9.0%/năm. Dư nợ chuẩn 90 ngày từ 11.5% - 12.5%/năm.",
      "shortTermRate": 9,
      "shortTermTenor": "Gói ưu đãi kích cầu",
      "shortTermDisplay": "9.0% - 10.5%/năm",
      "standardRate90d": 11.8,
      "standardRateDisplay": "11.5% - 12.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Thành Công Group",
      "feeOffer": "Phí giao dịch trực tuyến từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.8%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Hệ thống giao dịch DSC Pro & tư vấn danh mục",
      "note": "Đầu tư mạnh mẽ vào nền tảng công nghệ số từ TC Group."
    },
    "promotions": [
      "Ứng dụng DSC Trading thế hệ mới",
      "Gói tư vấn đầu tư chuyên sâu cùng chuyên gia DSC"
    ],
    "accountOpeningUrl": "https://dsc.com.vn/mo-tai-khoan",
    "referralCode": "DSC_SMART",
    "pros": [
      "Được đầu tư bài bản về công nghệ từ Tập đoàn Thành Công",
      "Giao diện phần mềm hiện đại, nhiều chỉ báo phân tích",
      "Chăm sóc khách hàng năng động"
    ],
    "cons": [
      "Thị phần môi giới đang trong giai đoạn xây dựng"
    ],
    "suitableFor": "Nhà đầu tư cá nhân yêu thích giao diện hiện đại và dịch vụ tư vấn nhiệt tình.",
    "platforms": [
      "DSC Trading Mobile",
      "DSC Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://dsc.com.vn/bieu-phi"
  },
  {
    "id": "phs",
    "name": "Công ty Cổ phần Chứng khoán Phú Hưng",
    "shortName": "PHS",
    "brandColor": "#00833e",
    "stockCode": "PHS",
    "listingExchange": "UPCoM",
    "listingStatus": "Đăng ký GD UPCoM",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2006,
    "marketShareRank": "CTCK vốn ngoại Đài Loan",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Phí giao dịch ổn định cho khách hàng cá nhân và tổ chức."
    },
    "margin": {
      "minRate": 9.9,
      "maxRate": 13,
      "medianRate": 11.45,
      "baseRate": 11.45,
      "promoRate": 8.9,
      "promoDuration": "Ưu đãi khách hàng giao dịch thường xuyên",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Ưu đãi giao dịch định kỳ từ 9.9%/năm. Kỳ hạn chuẩn 90 ngày từ 12.0% - 13.0%/năm.",
      "shortTermRate": 9.9,
      "shortTermTenor": "Ưu đãi giao dịch thường xuyên",
      "shortTermDisplay": "9.9% - 11.0%/năm",
      "standardRate90d": 12.2,
      "standardRateDisplay": "12.0% - 13.0%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Phú Hưng Vốn Ngoại",
      "feeOffer": "Phí giao dịch ưu đãi từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.9%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Hệ thống PHS Mobile & tư vấn cổ phiếu",
      "note": "Cổ đông chiến lược nước ngoài Đài Loan, tài chính ổn định."
    },
    "promotions": [
      "Báo cáo chiến lược đầu tư hàng quý chất lượng cao",
      "Hỗ trợ dịch vụ giao dịch trực tuyến đa nền tảng"
    ],
    "accountOpeningUrl": "https://phs.vn/mo-tai-khoan",
    "referralCode": "PHS_INVEST",
    "pros": [
      "Kinh nghiệm lâu năm phục vụ nhà đầu tư nước ngoài và tổ chức",
      "Báo cáo phân tích doanh nghiệp chi tiết",
      "Hệ thống vận hành an toàn"
    ],
    "cons": [
      "Ứng dụng di động cần thêm tính năng cá nhân hóa"
    ],
    "suitableFor": "Nhà đầu tư chú trọng trường phái đầu tư cơ bản và phân tích dòng tiền khối ngoại.",
    "platforms": [
      "PHS Mobile",
      "PHS Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://phs.vn/bieu-phi"
  },
  {
    "id": "tvsi",
    "name": "Công ty Cổ phần Chứng khoán Tân Việt",
    "shortName": "TVSI",
    "brandColor": "#c41230",
    "stockCode": null,
    "listingExchange": null,
    "listingStatus": "Chưa niêm yết",
    "isListed": false,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2006,
    "marketShareRank": "Quy mô vốn lâu năm",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Biểu phí giao dịch trực tuyến tiêu chuẩn."
    },
    "margin": {
      "minRate": 10.5,
      "maxRate": 13.5,
      "medianRate": 12,
      "baseRate": 12,
      "promoRate": 9,
      "promoDuration": "Chính sách margin theo danh mục",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Ưu đãi theo mã danh mục từ 10.5%/năm. Kỳ hạn tiêu chuẩn 90 ngày áp dụng 12.5% - 13.5%/năm.",
      "shortTermRate": 10.5,
      "shortTermTenor": "Ưu đãi theo danh mục",
      "shortTermDisplay": "10.5% - 11.5%/năm",
      "standardRate90d": 13,
      "standardRateDisplay": "12.5% - 13.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Tân Việt Ưu Đãi",
      "feeOffer": "Phí giao dịch trực tuyến từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 9.0%/năm",
      "duration": "Theo chính sách mở mới",
      "giftBonus": "Hệ thống i-Trade & hỗ trợ khách hàng",
      "note": "Tập trung tái cơ cấu và phục vụ khách hàng giao dịch cổ phiếu."
    },
    "promotions": [
      "Hỗ trợ dịch vụ giao dịch trực tuyến i-Trade Home",
      "Báo cáo nhận định thị trường hàng ngày"
    ],
    "accountOpeningUrl": "https://tvsi.com.vn/mo-tai-khoan",
    "referralCode": "TVSI_PRO",
    "pros": [
      "Hệ thống đặt lệnh i-Trade ổn định",
      "Nhiều năm hoạt động trên thị trường chứng khoán Việt Nam",
      "Dịch vụ khách hàng tận tâm"
    ],
    "cons": [
      "Hạn mức tín dụng và sản phẩm mới cần thời gian mở rộng"
    ],
    "suitableFor": "Nhà đầu tư cá nhân có tài khoản giao dịch truyền thống lâu năm.",
    "platforms": [
      "TVSI Mobile",
      "i-Trade Web"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://tvsi.com.vn/bieu-phi"
  },
  {
    "id": "evs",
    "name": "Công ty Cổ phần Chứng khoán Everest",
    "shortName": "EVS",
    "brandColor": "#0072ce",
    "stockCode": "EVS",
    "listingExchange": "HNX",
    "listingStatus": "Niêm yết HNX",
    "isListed": true,
    "parentStockCode": null,
    "bankBacked": null,
    "establishedYear": 2006,
    "marketShareRank": "Top CTCK vốn tầm trung",
    "tradingFee": {
      "onlineMin": 0.1,
      "onlineMax": 0.15,
      "brokerMin": 0.15,
      "brokerMax": 0.2,
      "zeroFeeOffer": false,
      "displaySummary": "0.10% - 0.15%",
      "notes": "Phí giao dịch cạnh tranh."
    },
    "margin": {
      "minRate": 10,
      "maxRate": 13.5,
      "medianRate": 11.75,
      "baseRate": 11.75,
      "promoRate": 8.9,
      "promoDuration": "Gói ưu đãi theo quý",
      "maxLeverage": "1:1 (Ký quỹ 50% chuẩn UBCK)",
      "interestFreeDays": 0,
      "notes": "Gói ưu đãi định kỳ từ 10.0%/năm. Kỳ hạn tiêu chuẩn 90 ngày áp dụng 12.0% - 13.5%/năm.",
      "shortTermRate": 10,
      "shortTermTenor": "Gói ưu đãi theo quý",
      "shortTermDisplay": "10.0% - 11.5%/năm",
      "standardRate90d": 12.5,
      "standardRateDisplay": "12.0% - 13.5%/năm (Chuẩn 90 ngày)",
      "isShortTermDealOnly": false
    },
    "derivativesFee": {
      "feePerContract": 1000,
      "notes": "1.000đ/HĐ"
    },
    "welcomePromo": {
      "hasPromo": true,
      "badge": "Everest Securities",
      "feeOffer": "Phí giao dịch trực tuyến từ 0.10%",
      "marginOffer": "Lãi suất Margin ưu đãi từ 8.9%/năm",
      "duration": "90 ngày đầu",
      "giftBonus": "Tư vấn đầu tư & báo cáo phân tích ngành",
      "note": "Chính sách linh hoạt, tập trung khách hàng cá nhân năng động."
    },
    "promotions": [
      "Ưu đãi lãi suất margin tài khoản mới",
      "Ứng dụng EVS Trading cải tiến giao diện mượt mà"
    ],
    "accountOpeningUrl": "https://eves.com.vn/mo-tai-khoan",
    "referralCode": "EVS_VIP",
    "pros": [
      "Tập trung phục vụ khách hàng cá nhân chuyên biệt",
      "Đội ngũ môi giới bám sát thị trường",
      "Hệ thống đặt lệnh nhanh"
    ],
    "cons": [
      "Mạng lưới chi nhánh chưa trải rộng toàn quốc"
    ],
    "suitableFor": "Nhà đầu tư cá nhân thích sự linh hoạt và hỗ trợ trực tiếp từ môi giới.",
    "platforms": [
      "EVS Trading Mobile",
      "EVS Web Trading"
    ],
    "lastUpdated": "2026-09-01",
    "sourceUrl": "https://eves.com.vn/bieu-phi"
  }
];

export const FILTER_CATEGORIES = [
  {
    "id": "all",
    "label": "Tất cả CTCK",
    "count": 30
  },
  {
    "id": "zero_fee",
    "label": "🔥 Zero-Fee (TCBS, DNSE)",
    "icon": "Sparkles"
  },
  {
    "id": "low_margin",
    "label": "📉 Lãi Margin chuẩn thấp (≤11%/năm)",
    "icon": "TrendingDown"
  },
  {
    "id": "bank_backed",
    "label": "🏛️ Thuộc Ngân hàng lớn",
    "icon": "Landmark"
  },
  {
    "id": "high_leverage",
    "label": "⚡ Đòn bẩy cao / Hợp tác đầu tư",
    "icon": "Zap"
  }
];
