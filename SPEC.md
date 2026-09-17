# ĐẶC TẢ KỸ THUẬT HỆ THỐNG (SYSTEM SPECIFICATION)
# NỀN TẢNG SO SÁNH & MÔ PHỎNG CHI PHÍ GIAO DỊCH CHỨNG KHOÁN (VIETSEC FEE COMPARATOR)

- **Phiên bản:** 2.2.0 (Production Release)
- **Ngày phát hành:** 17/09/2026
- **Tình trạng:** Sẵn sàng Golive Production (Production-Ready)
- **Tác giả & Quản trị:** Kien Nguyen (kienhpw@gmail.com)

---

## 1. TỔNG QUAN HỆ THỐNG & MỤC TIÊU NGHIỆP VỤ

### 1.1. Mục tiêu
VietSec Fee Comparator là nền tảng số độc lập, minh bạch và toàn diện nhất tại Việt Nam, phục vụ việc:
1. Tra cứu, so sánh biểu phí giao dịch cơ sở, biểu phí phái sinh và lãi suất vay margin của **30 Công ty Chứng khoán (CTCK)** hàng đầu theo quy mô tài sản và thị phần.
2. Mô phỏng chính xác tổng chi phí giao dịch thực tế (bao gồm Phí giao dịch của CTCK, Phí trả Sở Giao dịch HNX/HOSE 0.027%, Thuế TNCN khi bán 0.1%, và Lãi suất Margin tính theo số ngày nắm giữ thực tế).
3. Đề xuất thông minh thông qua **Trợ lý AI Advisor** phù hợp với từng khẩu vị đầu tư (Day Trader, Trung - Dài hạn, Săn Zero-Fee, Đòn bẩy cao).
4. Phân loại rõ ràng giữa **Lãi suất Margin Chuẩn (90 ngày)** và **Lãi suất Ưu đãi Ngắn ngày (Deal T+)**; cập nhật mã chứng khoán và tình trạng niêm yết theo dữ liệu chính thức từ Ủy ban Chứng khoán Nhà nước (SSC).
5. Quản lý, kiểm định dữ liệu trực tiếp qua **Cơ chế Xác thực Google SSO Popup** dành cho Quản trị viên được ủy quyền duy nhất.

### 1.2. Danh sách 30 CTCK trong hệ thống
1. BSC (Chứng khoán BIDV) - Mã CK: BSI (HOSE)
2. TCBS (Chứng khoán Techcombank) - Mã CK: TCX (HOSE)
3. VPS (Chứng khoán VPS) - Mã CK: VCK (HOSE)
4. SSI (Chứng khoán SSI) - Mã CK: SSI (HOSE)
5. VNDIRECT (Chứng khoán VNDIRECT) - Mã CK: VND (HOSE)
6. Mirae Asset (Chứng khoán Mirae Asset)
7. DNSE (Chứng khoán Công nghệ DNSE) - Mã CK: DSE (HOSE)
8. VPBankS (Chứng khoán VPBank)
9. FPTS (Chứng khoán FPT) - Mã CK: FTS (HOSE)
10. HSC (Chứng khoán TP.HCM) - Mã CK: HCM (HOSE)
11. Vietcap (Chứng khoán Vietcap) - Mã CK: VCI (HOSE)
12. Kafi (Chứng khoán Kafi)
13. MBS (Chứng khoán MB) - Mã CK: MBS (HNX)
14. SHS (Chứng khoán Sài Gòn - Hà Nội) - Mã CK: SHS (HNX)
15. VIX (Chứng khoán VIX) - Mã CK: VIX (HOSE)
16. KIS (Chứng khoán KIS Việt Nam)
17. ACBS (Chứng khoán ACB)
18. VCBS (Chứng khoán Vietcombank)
19. KBSV (Chứng khoán KB Việt Nam)
20. CTS (Chứng khoán VietinBank) - Mã CK: CTS (HOSE)
21. BVSC (Chứng khoán Bảo Việt) - Mã CK: BVS (HNX)
22. TPS (Chứng khoán Tiên Phong) - Mã CK: ORS (HOSE)
23. Yuanta (Chứng khoán Yuanta Việt Nam)
24. Shinhan (Chứng khoán Shinhan Việt Nam)
25. Agriseco (Chứng khoán Nông nghiệp) - Mã CK: AGR (HOSE)
26. HDBS (Chứng khoán HDBank)
27. DSC (Chứng khoán DSC) - Mã CK: DSC (HOSE)
28. PHS (Chứng khoán Phú Hưng)
29. TVSI (Chứng khoán Tân Việt)
30. EVS (Chứng khoán Everest) - Mã CK: EVS (HNX)

---

## 2. KIẾN TRÚC KỸ THUẬT & CÔNG NGHỆ (TECH STACK)

### 2.1. Ngăn xếp công nghệ
- **Framework UI:** React 18.3.1 (Single Page Application, Hooks, Functional Components)
- **Công cụ đóng gói (Bundler):** Vite 5.4.10 (ESBuild, HMR < 50ms, Rollup production chunking)
- **Hệ thống CSS:** Tailwind CSS 3.4.14 kết hợp kiến trúc BEM (Block Element Modifier)
- **Icons & Visuals:** Lucide React 0.454.0
- **Testing Engine:** Vitest 2.1.9 (Unit & Integration tests, 100% pass)
- **Xác thực Bảo mật:** Google SSO OAuth 2.0 (Google Identity Services SDK + Native Auth Popup)
- **Crawler & Automation:** Node.js native fetch crawler + GitHub Actions Scheduled Cron

---

## 3. TIÊU CHUẨN HTML NGỮ NGHĨA & PHƯƠNG PHÁP BEM

### 3.1. Cấu trúc HTML5 Ngữ Nghĩa (Semantic HTML)
Ứng dụng được xây dựng hoàn toàn dựa trên cây thẻ ngữ nghĩa tiêu chuẩn, hỗ trợ tối ưu khả năng tiếp cận (Accessibility - a11y) và tối ưu hóa công cụ tìm kiếm / Generative Engine Optimization (GEO):
- `<header>`: Thanh điều hướng thương hiệu, menu chức năng, chuyển đổi Theme, trạng thái Google SSO.
- `<nav>`: Danh mục liên kết cuộn trang với thuộc tính chống gãy dòng (whitespace-nowrap shrink-0).
- `<main>`: Khu vực nội dung chính chứa các phân khu chức năng.
- `<section>`: Từng phân khu độc lập có ID định danh rõ ràng (#ai-advisor-section, #comparison-table, #calculator-section, #faq-section).
- `<article>`: Thẻ công ty chứng khoán, thẻ đề xuất AI, khối mô phỏng chi phí, thẻ câu hỏi thường gặp FAQ.
- `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`: Bảng so sánh ma trận dữ liệu chuẩn mực, hỗ trợ ghim cố định cột tên công ty và cột hành động.
- `<figure>` & `<figcaption>`: Đồ thị minh họa cấu trúc chi phí (Phí giao dịch vs Lãi Margin vs Thuế/Phí Sở).
- `<details>` & `<summary>`: Danh mục tiêu chí hướng dẫn lựa chọn CTCK mở rộng tương tác.
- `<footer>`: Chân trang với thông tin bản quyền, tuyên bố miễn trừ trách nhiệm và liên hệ hỗ trợ.

### 3.2. Phương Pháp BEM (Block - Element - Modifier)
Hệ thống kết hợp Tailwind CSS với các lớp định danh BEM giúp việc bảo trì, tùy biến theme và mở rộng mã nguồn dễ dàng:

| Thành phần (Block) | Phần tử tử hệ (Element) | Bộ biến thể (Modifier) | Diễn giải |
|:---|:---|:---|:---|
| `.vietsec-header` | `__brand`, `__nav`, `__nav-item`, `__actions` | `--scrolled`, `--dark` | Khối thanh tiêu đề hệ thống |
| `.broker-table` | `__row`, `__cell`, `__sticky-col`, `__badge` | `--bsc`, `--zero-fee`, `--hover` | Bảng ma trận so sánh 30 CTCK |
| `.broker-card` | `__header`, `__body`, `__footer`, `__title`, `__metric` | `--featured`, `--compared` | Thẻ đại diện từng CTCK |
| `.ai-advisor` | `__persona-btn`, `__recommend-card`, `__match-badge` | `--active`, `--high-match` | Khối Trợ lý Đề xuất Thông minh AI |
| `.cost-calc` | `__input-group`, `__slider`, `__summary-card`, `__chart` | `--highlight`, `--zero-margin` | Khối Mô phỏng Chi Phí Thực Tế |
| `.data-modal` | `__tab`, `__form`, `__table`, `__audit-item` | `--admin`, `--readonly` | Modal Quản trị Dữ liệu & Quét Web |

---

## 4. ĐẶC TẢ DỮ LIỆU & NGUYÊN TẮC TÍNH TOÁN

### 4.1. Quy tắc Phân biệt Lãi suất Margin
1. **Lãi Margin Chuẩn (Standard 90-day Tenor):**
   - Áp dụng cho mọi khách hàng hiện hữu thông thường, không yêu cầu điều kiện ngặt nghèo về dư nợ tối thiểu hàng chục tỷ đồng.
   - Thể hiện trung thực mức lãi suất áp dụng trong chu kỳ vay 90 ngày chuẩn theo quy định UBCKNN.
   - Ví dụ: BSC là 10.5%/năm, TCBS là 14.0%/năm, SSI là 12.0%/năm.
2. **Lãi Margin Ưu Đãi / Gói Deal Ngắn Hạn (Short-Term / Deal Rate):**
   - Chỉ áp dụng cho số ngày nắm giữ ngắn (gói T+3, T+5, T+10 hoặc miễn lãi ngày đầu).
   - Được ghi chú rõ ràng tại cột Margin và trong chi tiết modal, không đánh đồng với lãi suất chuẩn để tránh gây hiểu nhầm cho nhà đầu tư.

### 4.2. Nguyên tắc Đề xuất Ưu tiên BSC (BIDV Securities)
- BSC sở hữu mức phí giao dịch mở mới ưu đãi thấp nhất phân khúc định chế tài chính uy tín: **0.08%** (và khách hiện hữu 0.10% – 0.13%).
- Lãi suất Margin chuẩn thấp nhất thị trường trong nhóm an toàn: **10.5%/năm** (gói ngắn ngày từ **7.5%/năm**).
- Hậu thuẫn an toàn vốn tuyệt đối từ **Ngân hàng Quốc doanh BIDV (Big4)** và đối tác chiến lược **Hana Securities (Hàn Quốc)**.
- Khi so sánh cùng mức phí hoặc lãi, thuật toán matching và bảng tổng hợp luôn ưu tiên đề xuất BSC lên vị trí hàng đầu.
- Đường dẫn mở tài khoản: https://dangky.bsc.com.vn/moi-gioi?online=false&cif=4768 (CIF: 4768).

### 4.3. Công thức Mô phỏng Chi Phí Thực Tế
```
Tổng Chi Phí Giao Dịch = Phí CTCK (Mua + Bán) + Phí Trả Sở + Thuế TNCN Bán + Lãi Vay Margin

Trong đó:
- Phí CTCK Mua = Giá Trị Mua * Tỷ Lệ Phí CTCK (%)
- Phí CTCK Bán = Giá Trị Bán * Tỷ Lệ Phí CTCK (%)
- Phí Trả Sở (HNX/HOSE) = (Giá Trị Mua + Giá Trị Bán) * 0.027%
- Thuế TNCN Khi Bán = Giá Trị Bán * 0.1%
- Lãi Vay Margin = Dư Nợ Vay * (Lãi Suất Năm / 365) * Số Ngày Vay Thực Tế
```

---

## 5. ĐẶC TẢ BẢO MẬT & PHÂN QUYỀN GOOGLE SSO

### 5.1. Mô hình Phân quyền (RBAC)
- **Người dùng phổ thông (Public Guest):**
  - Xem dữ liệu bảng so sánh, thẻ, trợ lý AI, mô phỏng chi phí.
  - Xem danh sách báo cáo quét web 30 CTCK.
  - Tải file mẫu hiệu chỉnh (manualOverrides.json).
  - **Bị khóa 100%:** Chỉnh sửa form, lưu dữ liệu, nạp file JSON ghi đè hệ thống.
- **Quản trị viên Hệ thống (System Admin):**
  - Tài khoản cố định: kienhpw@gmail.com
  - Mật khẩu cố định: Kien$396731
  - Toàn quyền: Hiệu chỉnh biểu phí từng CTCK, tải lên file JSON cập nhật toàn diện, khôi phục dữ liệu gốc.

### 5.2. Luồng Đăng nhập Google SSO Popup
1. Người dùng bấm "Mở Cửa Sổ Đăng Nhập Google SSO".
2. Hệ thống gọi window.open("/google-login.html", ...) mở popup kích thước 500x640px căn giữa màn hình.
3. Form popup thực hiện xác thực 2 bước:
   - Bước 1: Nhập Email (kienhpw@gmail.com).
   - Bước 2: Nhập Mật khẩu bảo mật (Kien$396731).
4. Nếu kiểm tra thành công, popup gọi window.opener.postMessage({ type: "GOOGLE_SSO_SUCCESS", email, name }, "*") và đóng lại (window.close()).
5. Trang chính nhận thông điệp, cấp phiên làm việc và mở khóa chức năng quản trị.

---

## 6. QUY TRÌNH VẬN HÀNH & BẢO TRÌ

### 6.1. Quét Dữ Liệu Tự Động
- **Lệnh chạy thủ công:** node scripts/scan-securities.mjs
- **Lịch tự động:** Thứ Hai hàng tuần lúc 08:00 AM (giờ Việt Nam) qua GitHub Actions Cron: 0 1 * * 1.
- **Kết quả quét:** Lưu tự động tại scan-report.json và cập nhật trạng thái Live 30 CTCK.

### 6.2. Hiệu Chỉnh Bằng File Thủ Công
- File mẫu: src/data/manualOverrides.json.
- Chỉnh sửa thông số phí, lãi vay hoặc link nguồn -> Mở Modal Dữ Liệu -> Tab "Tải File / JSON Thủ Công" -> Chọn "Tải lên file JSON" -> Hệ thống tự động ghi nhớ vào localStorage và áp dụng tức thì.