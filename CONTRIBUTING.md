# Hướng Dẫn Đóng Góp Dữ Liệu (Contributing Guide)

Chào mừng bạn đến với dự án mã nguồn mở **VietSec Comparator**! Chúng tôi trân trọng mọi đóng góp từ cộng đồng nhằm duy trì tính chính xác, minh bạch và cập nhật nhất của dữ liệu biểu phí chứng khoán Việt Nam.

---

## 1. Cách Cập Nhật Biểu Phí hoặc Thêm Công Ty Chứng Khoán Mới

Toàn bộ dữ liệu của dự án được lưu trữ tập trung tại file duy nhất:
👉 [`src/data/securitiesData.js`](src/data/securitiesData.js)

Bạn **không cần biết lập trình chuyên sâu**, chỉ cần làm theo các bước sau:

### Bước 1: Fork Kho Chứa (Repository)
- Nhấn nút **Fork** ở góc trên bên phải trang GitHub của dự án.
- Clone repository đã fork về máy tính hoặc chỉnh sửa trực tiếp trên trình duyệt bằng cách nhấn phím `.` (GitHub Dev Web Editor).

### Bước 2: Cập Nhật Dữ Liệu
Mở file `src/data/securitiesData.js` và cập nhật các thông số tương ứng theo cấu trúc mẫu:

```javascript
{
  id: "ten-viet-tat",           // id viết thường, không dấu
  name: "Công ty Cổ phần Chứng khoán ...",
  shortName: "Tên Viết Tắt",     // BSC, TCBS, VPS...
  brandColor: "#004880",        // Mã màu HEX nhận diện
  stockCode: "MÃ",              // Mã niêm yết hoặc ghi chú
  bankBacked: "Ngân hàng",      // Tên ngân hàng mẹ nếu có
  establishedYear: 2000,
  marketShareRank: "Top X HOSE",
  tradingFee: {
    onlineMin: 0.10,            // % Phí online tối thiểu
    onlineMax: 0.15,            // % Phí online tối đa
    brokerMin: 0.15,            // % Phí qua môi giới
    brokerMax: 0.25,
    zeroFeeOffer: false,        // true nếu có chương trình 0% phí GD
    displaySummary: "Mô tả ngắn",
    notes: "Ghi chú điều kiện áp dụng"
  },
  margin: {
    baseRate: 12.0,             // Lãi suất chuẩn (%/năm)
    promoRate: 8.5,             // Lãi suất ưu đãi (%/năm)
    promoDuration: "Thời hạn ưu đãi",
    maxLeverage: "3:7 (Ký quỹ 30%)",
    interestFreeDays: 0,        // Số ngày miễn lãi nếu có
    notes: "Ghi chú chính sách vay"
  },
  derivativesFee: {
    feePerContract: 1000,       // VNĐ/HĐ
    notes: "Ghi chú phái sinh"
  },
  promotions: [
    "Ưu đãi 1...",
    "Ưu đãi 2..."
  ],
  accountOpeningUrl: "https://link-mo-tai-khoan-ekyc/",
  referralCode: "MA_GIOI_THIEU",
  pros: [
    "Ưu điểm 1",
    "Ưu điểm 2"
  ],
  cons: [
    "Điểm cần lưu ý"
  ],
  suitableFor: "Phù hợp với nhóm nhà đầu tư nào...",
  platforms: ["Mobile App", "Web Trading"],
  lastUpdated: "2026-09-01",
  sourceUrl: "https://link-bieu-phi-chinh-thuc"
}
```

### Bước 3: Kiểm Tra Tính Xác Thực
- **Tuyệt đối không bịa đặt số liệu**: Mọi thay đổi về lãi suất, phí giao dịch, chương trình ưu đãi **bắt buộc phải có đường dẫn link nguồn (`sourceUrl`)** dẫn đến thông báo hoặc biểu phí chính thức trên website của CTCK.

### Bước 4: Tạo Pull Request (PR)
- Commit thay đổi: `git commit -m "feat: Cập nhật lãi margin mới cho CTCK XYZ"`
- Đẩy lên nhánh của bạn: `git push origin your-branch`
- Tạo **Pull Request** về nhánh `main` của dự án.
- BQT sẽ review và merge trong vòng 24 - 48 giờ.

---

## 2. Tiêu Chuẩn Ứng Xử
- Tôn trọng tính khách quan, công bằng giữa các CTCK.
- Không đưa nội dung quảng cáo sai sự thật hoặc link lừa đảo/phishing. Mọi URL mở tài khoản phải là domain chính thức của CTCK.
