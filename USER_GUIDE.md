# HƯỚNG DẪN SỬ DỤNG & VẬN HÀNH HỆ THỐNG
# NỀN TẢNG SO SÁNH CHI PHÍ GIAO DỊCH CHỨNG KHOÁN (VIETSEC FEE COMPARATOR)

---

## 1. THÔNG TIN TRUY CẬP HỆ THỐNG (GOLIVE)

- **Địa chỉ máy chủ cục bộ (Localhost):** http://localhost:4173/ (Production Preview) hoặc http://localhost:5173/ (Dev)
- **Tài khoản Quản trị viên cố định:**
  - **Email:** kienhpw@gmail.com
  - **Mật khẩu:** Kien$396731
- **Quyền hạn Admin:** Toàn quyền chỉnh sửa biểu phí, lãi margin, link eKYC của 30 CTCK và nạp file JSON ghi đè hệ thống.

---

## 2. HƯỚNG DẪN DÀNH CHO NHÀ ĐẦU TƯ

### 2.1. Tra Cứu & Lọc Biểu Phí 30 CTCK
1. **Tìm kiếm tức thì:** Nhập tên công ty, mã chứng khoán (ví dụ: BSI, SSI, TCBS, VND) vào thanh tìm kiếm. Từ khóa sẽ được đánh dấu nổi bật (highlight).
2. **Bộ lọc nhanh theo nhu cầu:**
   - **Tất cả (30):** Hiển thị toàn bộ 30 CTCK lớn nhất Việt Nam.
   - **Miễn phí GD (Zero-Fee):** Lọc các công ty có chính sách 0% phí giao dịch trực tuyến.
   - **Lãi Margin Thấp (<= 11.5%):** Lọc các CTCK có lãi suất vay margin chuẩn cạnh tranh nhất.
   - **Ngân hàng bảo trợ (Bank-backed):** Lọc các CTCK thuộc các tập đoàn ngân hàng lớn (BIDV, Vietcombank, MB, VPBank...).
   - **Đòn bẩy cao / Deal:** Lọc các đơn vị hỗ trợ tỷ lệ ký quỹ linh hoạt và các gói hợp tác đầu tư.
3. **Chuyển đổi giao diện Bảng / Thẻ:** Bấm nút chuyển đổi ở góc phải thanh bộ lọc để xem dạng Bảng ma trận chi tiết hoặc dạng Thẻ thông tin trực quan.

### 2.2. Sử Dụng Trợ Lý Đề Xuất Thông Minh AI
1. Nhấp vào các khẩu vị đầu tư tại khối **Trợ Lý Đề Xuất Thông Minh AI**:
   - **Nhà đầu tư lướt sóng (Day Trader):** Tối ưu phí giao dịch và lãi margin ngắn ngày T+.
   - **Nhà đầu tư trung & dài hạn:** Ưu tiên định chế tài chính an toàn vốn vững chắc (Big4), hệ sinh thái mạnh.
   - **Săn ưu đãi 0đ (Zero-Fee):** Tối đa hóa lợi nhuận bằng cách triệt tiêu phí giao dịch cổ phiếu.
   - **Sử dụng Margin tối đa:** Đòn bẩy cao, room cho vay dồi dào, danh mục cổ phiếu cho vay đa dạng.
2. AI sẽ tính toán điểm tương thích (% Match) và đề xuất **Top 3 CTCK tối ưu nhất** kèm lời giải thích chi tiết.
3. Bấm nút **"Lọc bảng theo Top đề xuất AI"** để tự động lọc danh sách bảng theo các công ty được AI khuyên dùng.

### 2.3. Mô Phỏng Chi Phí Thực Tế & Số Tiền Tiết Kiệm
1. Cuộn đến khối **Mô Phỏng Chi Phí Thực Tế**.
2. Điều chỉnh các thông số đầu vào:
   - **Giá trị mua / bán cổ phiếu:** (ví dụ: 100.000.000 đ)
   - **Dư nợ vay Margin:** (ví dụ: 50.000.000 đ)
   - **Số ngày nắm giữ thực tế:** (ví dụ: 30 ngày)
3. Bảng kết quả sẽ tự động tính toán chi tiết:
   - Cột **Hành động** (Xem chi tiết / Mở tài khoản).
   - Cột **Tổng Chi Phí Thực Tế** (tổng hợp đầy đủ mọi khoản phí).
   - Chi tiết **Phí CTCK**, **Lãi Vay Margin**, **Thuế TNCN** và **Phí Trả Sở HNX/HOSE**.
   - Số tiền tiết kiệm được so với mức phí trung bình toàn thị trường.

---

## 3. HƯỚNG DẪN DÀNH CHO QUẢN TRỊ VIÊN (ADMIN)

### 3.1. Đăng Nhập Google SSO Quản Trị
1. Nhấp vào nút **"Dữ Liệu"** trên thanh tiêu đề Header hoặc nút **"Đăng nhập Google SSO"**.
2. Bấm nút **"[G] Mở Cửa Sổ Đăng Nhập Google SSO"**.
3. Cửa sổ popup chuẩn Google Accounts sẽ xuất hiện:
   - Nhập email: kienhpw@gmail.com -> Bấm "Tiếp theo".
   - Nhập mật khẩu: Kien$396731 -> Bấm "Xác Thực & Đăng Nhập".
4. Cửa sổ popup tự động đóng lại và hệ thống sẽ hiển thị huy hiệu xanh **"Admin: kienhpw@gmail.com"**.

### 3.2. Hiệu Chỉnh Biểu Phí Từng CTCK
1. Tại Modal Quản lý Dữ liệu, chọn thẻ **"Hiệu chỉnh từng CTCK"**.
2. Chọn công ty cần chỉnh sửa từ danh sách thả xuống (Dropdown 30 CTCK).
3. Chỉnh sửa các trường thông tin:
   - Phí GD Online Tối thiểu (%) / Tối đa (%)
   - Checkbox chính sách Miễn phí (Zero-Fee)
   - Lãi suất Margin Chuẩn (%/năm)
   - Lãi suất Margin Ưu đãi / Ngắn hạn (%/năm)
   - Đòn bẩy tối đa
   - Đường dẫn mở tài khoản eKYC
4. Bấm **"Lưu & Áp Dụng Thay Đổi"** để cập nhật ngay vào hệ thống.

### 3.3. Tải File Cấu Hình / JSON Ghi Đè Hàng Loạt
1. Chuyển sang thẻ **"Tải File / JSON Thủ Công"**.
2. Bấm **"Tải Mẫu 30 CTCK (manualOverrides.json)"** để tải file mẫu về máy tính.
3. Mở file chỉnh sửa các thông số phí hoặc link đối chiếu.
4. Bấm **"Tải lên file JSON"** để nạp file đã chỉnh sửa. Hệ thống sẽ tự động cập nhật đồng bộ toàn bộ 30 CTCK.

### 3.4. Quét Dữ Liệu Thực Tế Từ Web CTCK
1. Chuyển sang thẻ **"Quét Web & Lịch Định Kỳ"**.
2. Xem trạng thái truy cập live của 30 CTCK (26 CTCK HTTP 200 OK, 4 CTCK có Cloudflare WAF cần đối chiếu).
3. Nhấp trực tiếp vào link nguồn chính thức để đối chiếu biểu phí.
4. Chạy quét cập nhật bằng dòng lệnh khi cần:
   node scripts/scan-securities.mjs

---

## 4. QUY TRÌNH KHỞI CHẠY & BẢO TRÌ HỆ THỐNG

### 4.1. Khởi chạy 1-Click trên Windows
- **Chế độ Production (Golive):** Nhấp đúp chuột vào file start-production.bat (chạy trên cổng 4173).
- **Chế độ Phát triển (Development):** Nhấp đúp chuột vào file start-dev.bat (chạy trên cổng 5173).

### 4.2. Chạy Kiểm Thử Tự Động
npm test
Đảm bảo toàn bộ 71/71 tests đều vượt qua (100% PASS).

### 4.3. Đóng Gói Lại Bản Build Production
npm run build
Bundle production tối ưu sẽ được sinh ra tại thư mục dist/.