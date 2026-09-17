# 📈 Nền Tảng So Sánh Chi Phí Giao Dịch Chứng Khoán: Tính Toán Chi Phí Thực Hiện Giao Dịch

> **Dự án mã nguồn mở, vận hành hoàn toàn miễn phí (0đ chi phí máy chủ)**, cung cấp công cụ so sánh trực quan, minh bạch và toàn diện về **phí giao dịch cơ sở, lãi suất vay Margin, tỷ lệ đòn bẩy và tính toán chi phí thực hiện giao dịch thực tế** tại 30 Công ty Chứng khoán (CTCK) hàng đầu trên thị trường Việt Nam (BSC, TCBS, VPS, SSI, VNDIRECT, Mirae Asset, DNSE, VPBankS, FPTS, HSC, Vietcap, Kafi...). *Thông tin về mức phí giao dịch đã bao gồm phí trả sở và chưa bao gồm thuế.*

---

## 🌟 Điểm Nổi Bật

- 🔍 **Tra cứu & Bộ lọc thông minh:** Lọc nhanh CTCK theo tiêu chí *Miễn phí giao dịch (Zero-Fee)*, *Lãi Margin siêu rẻ (<9%/năm)*, *Thuộc Ngân hàng lớn (BIDV, Techcombank, VPBank...)*, *Ưu đãi mở mới*, hoặc *Đòn bẩy cao (3:7)*.
- 📊 **Bảng Ma trận So sánh Đa tiêu chí:** Bảng đối chiếu biểu phí online, phí qua môi giới, lãi suất margin cơ sở & ưu đãi T+, đòn bẩy tối đa và phí phái sinh.
- 🧮 **Công cụ Mô phỏng Chi phí Thực tế (Cost & Savings Simulator):** Nhập giá trị giao dịch tháng và số tiền vay margin dự kiến -> Hệ thống tự động tính toán tổng chi phí (Phí GD + Tiền lãi margin) và xếp hạng CTCK giúp bạn tiết kiệm nhất (tiết kiệm hàng chục triệu đồng mỗi năm).
- ⚖️ **So sánh Đối đầu 1-1 (Head-to-Head):** Chọn 2 đến 3 công ty bất kỳ để đặt lên bàn cân so sánh chi tiết từng ưu - nhược điểm, độ ổn định hệ thống và đối tượng phù hợp.
- 🚀 **Nút Hành động Mở tài khoản (eKYC CTA):** Nút eKYC mở tài khoản trực tuyến 3 phút có kèm sẵn mã giới thiệu hoặc link tiếp thị liên kết (Affiliate/Referral).
- 📱 **Thiết kế Hiện đại & Responsive 100%:** Hỗ trợ đầy đủ chế độ Sáng / Tối (Dark/Light mode), giao diện tối ưu cho cả điện thoại di động và máy tính để bàn.
- 🌐 **Triển khai Miễn phí 100%:** Mã nguồn xuất ra dạng Static Web, có thể chạy trọn đời trên **GitHub Pages, Vercel, Cloudflare Pages** với chi phí 0đ.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React 18 + Vite 5 (Siêu nhanh, gọn nhẹ)
- **Styling:** Tailwind CSS + Custom FinTech Design System
- **Icons:** Lucide React
- **Hosting:** Tĩnh 100% (GitHub Pages / Vercel / Netlify / Cloudflare Pages)
- **CI/CD:** GitHub Actions tự động build và deploy khi có commit mới

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Trên Máy Cá Nhân

### Yêu Cầu Môi Trường:
- [Node.js](https://nodejs.org/) phiên bản 18 trở lên (Dự án đã kiểm thử trên Node v20 & v24).
- Trình quản lý gói `npm` (đi kèm sẵn với Node.js).

### Các Bước Thực Hiện:

```bash
# 1. Di chuyển vào thư mục dự án
cd vietsec-fee-comparator

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Khởi động môi trường phát triển (Dev Server)
npm run dev
```

Mở trình duyệt và truy cập: `http://localhost:5173` để trải nghiệm ứng dụng ngay tức thì!

---

## 📦 Hướng Dẫn Build & Triển Khai Lên Web Miễn Phí

### 1. Build mã nguồn tĩnh:

```bash
npm run build
```
Toàn bộ mã nguồn sẵn sàng chạy sẽ được xuất vào thư mục `dist/`.

### 2. Triển khai miễn phí lên GitHub Pages:
1. Tạo một repository mới trên GitHub (ví dụ: `vietsec-fee-comparator`).
2. Push toàn bộ mã nguồn lên repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: VietSec Fee Comparator"
   git remote add origin https://github.com/your-username/vietsec-fee-comparator.git
   git branch -M main
   git push -u origin main
   ```
3. Vào **Settings** > **Pages** trên GitHub repo:
   - Tại mục **Build and deployment** > **Source**, chọn **GitHub Actions**.
   - File workflow tại `.github/workflows/deploy.yml` sẽ tự động kích hoạt, build và xuất bản website của bạn tại:
     `https://your-username.github.io/vietsec-fee-comparator/`

### 3. Triển khai 1-click lên Vercel / Cloudflare Pages:
- Kết nối GitHub repository với [Vercel](https://vercel.com) hoặc [Cloudflare Pages](https://pages.cloudflare.com).
- Framework preset chọn **Vite**.
- Build command: `npm run build`, Output directory: `dist`.
- Nhấn **Deploy** là website hoạt động trên toàn cầu với chứng chỉ SSL HTTPS miễn phí.

---

## 📂 Cấu Trúc Thư Mục

```
vietsec-fee-comparator/
├── .github/workflows/deploy.yml   # Workflow GitHub Actions tự động deploy lên GitHub Pages
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Thanh điều hướng, Dark/Light mode, Logo
│   │   ├── HeroSection.jsx        # Banner giới thiệu, thống kê thị trường, tìm kiếm nhanh
│   │   ├── FilterBar.jsx          # Bộ lọc đa chiều, chuyển đổi bảng/thẻ, thanh so sánh
│   │   ├── SecuritiesTable.jsx    # Bảng ma trận so sánh chi tiết
│   │   ├── SecuritiesCards.jsx    # Giao diện dạng thẻ tối ưu cho Mobile
│   │   ├── CostCalculator.jsx     # Công cụ mô phỏng chi phí & lãi vay Margin
│   │   ├── HeadToHeadModal.jsx    # Modal so sánh đối đầu 2-3 CTCK
│   │   ├── CompanyDetailModal.jsx # Modal xem chi tiết từng CTCK & hướng dẫn eKYC
│   │   ├── CriteriaGuide.jsx      # Cẩm nang lựa chọn CTCK theo chân dung nhà đầu tư
│   │   └── Footer.jsx             # Chân trang, miễn trừ trách nhiệm, liên kết GitHub
│   ├── data/
│   │   └── securitiesData.js      # Cơ sở dữ liệu mở về 12+ CTCK Việt Nam
│   ├── utils/
│   │   └── calculator.js          # Logic toán học tính phí giao dịch & lãi margin
│   ├── App.jsx                    # Ứng dụng chính kết nối các component
│   ├── main.jsx                   # Entry point React
│   └── index.css                  # Tailwind CSS & custom styles
├── index.html                     # HTML template chuẩn SEO & font Inter
├── package.json                   # Cấu hình dự án & thư viện phụ thuộc
├── tailwind.config.js             # Cấu hình Tailwind CSS
├── vite.config.js                 # Cấu hình Vite với base path tương đối
├── CONTRIBUTING.md                # Hướng dẫn đóng góp dữ liệu CTCK mới
└── LICENSE                        # Giấy phép mã nguồn mở MIT
```

---

## 🤝 Đóng Góp & Quản Trị Dữ Liệu

Dữ liệu biểu phí và chính sách margin được cập nhật liên tục bởi cộng đồng nhà đầu tư. Để bổ sung thông tin hoặc cập nhật chính sách mới của CTCK, vui lòng xem chi tiết tại [CONTRIBUTING.md](CONTRIBUTING.md).

---

## ⚖️ Giấy Phép & Miễn Trừ Trách Nhiệm

- Dự án phát hành theo giấy phép mã nguồn mở [MIT License](LICENSE).
- Thông tin trên website được tổng hợp từ biểu phí công khai của 30 CTCK nhằm mục đích hỗ trợ tra cứu tham khảo và tính toán chi phí thực hiện giao dịch. **Thông tin về mức phí giao dịch đã bao gồm phí trả sở và chưa bao gồm thuế** (thuế TNCN 0.1% khi chuyển nhượng cổ phiếu). Phí giao dịch và lãi suất Margin thực tế có thể thay đổi theo chính sách từng thời kỳ của từng công ty.
