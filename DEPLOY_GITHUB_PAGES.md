# Hướng Dẫn Đưa Website Lên GitHub Pages Với Link: https://kienhpw.github.io/so-sanh-phi-giao-dich/

Để website của bạn có chính xác địa chỉ:
🌐 **https://kienhpw.github.io/so-sanh-phi-giao-dich/**

Theo quy tắc đặt tên của GitHub Pages: **Tên repository trên GitHub bắt buộc phải là `so-sanh-phi-giao-dich`**.

Dưới đây là hướng dẫn từng bước chính xác nhất:

---

## BƯỚC 1: TẠO REPOSITORY TRÊN GITHUB

1. Truy cập [https://github.com/new](https://github.com/new) (đăng nhập tài khoản **kienhpw**).
2. Điền chính xác thông tin:
   - **Repository name**: `so-sanh-phi-giao-dich` *(Bắt buộc đúng tên này để có link như mong muốn)*
   - **Description**: `Hệ thống So sánh Phí giao dịch và Lãi suất Margin 30 CTCK Việt Nam`
   - **Visibility**: Chọn **Public** (để mọi người có thể truy cập miễn phí).
   - ⚠️ **LƯU Ý:** **KHÔNG** tích chọn bất kỳ ô nào: *Add a README file*, *Add .gitignore*, hoặc *Choose a license*.
3. Bấm **Create repository**.

---

## BƯỚC 2: TẢI MÃ NGUỒN LÊN GITHUB

Bạn có thể chọn 1 trong các cách sau:

### 👉 Cách 1: Dùng GitHub Desktop (Dễ nhất, trực quan)
1. Tải và cài đặt [GitHub Desktop](https://desktop.github.com/).
2. Đăng nhập tài khoản GitHub **kienhpw**.
3. Chọn menu **File** -> **Add local repository...** (phím tắt `Ctrl + O`).
4. Bấm **Browse...** và chọn thư mục:
   `e:\OneDrive\AI-Agent\vietsec-fee-comparator`
5. Nếu hiện thông báo *"This directory does not appear to be a Git repository"*, bấm **create a repository** (Đặt tên là `so-sanh-phi-giao-dich`).
6. Nhập ô Summary: `Golive website so-sanh-phi-giao-dich`.
7. Bấm **Commit to main**.
8. Bấm **Publish repository** ở góc trên cùng:
   - Name: `so-sanh-phi-giao-dich`
   - **Bỏ tích** ô *"Keep this code private"*
   - Bấm **Publish repository**.

---

### 👉 Cách 2: Dùng dòng lệnh Git CLI (Nếu máy có Git)
Mở **PowerShell** hoặc **Command Prompt** tại thư mục dự án và chạy:

```bash
cd e:\OneDrive\AI-Agent\vietsec-fee-comparator

# Khởi tạo git
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "feat: golive so-sanh-phi-giao-dich"

# Đổi nhánh chính sang main
git branch -M main

# Liên kết với repository của bạn trên GitHub
git remote add origin https://github.com/kienhpw/so-sanh-phi-giao-dich.git

# Đẩy code lên GitHub
git push -u origin main
```

---

## BƯỚC 3: BẬT GITHUB PAGES (CHẾ ĐỘ TỰ ĐỘNG GITHUB ACTIONS)

Dự án đã có sẵn file tự động hoá `.github/workflows/deploy.yml`. Khi bạn đẩy code lên:

1. Vào repository của bạn tại: [https://github.com/kienhpw/so-sanh-phi-giao-dich](https://github.com/kienhpw/so-sanh-phi-giao-dich).
2. Bấm vào tab **Settings** (biểu tượng bánh răng).
3. Ở cột danh mục bên trái, bấm vào **Pages** (trong mục *Code and automation*).
4. Tại phần **Build and deployment**:
   - Ở mục **Source**, nhấp chọn:
     👉 **GitHub Actions**
5. Chờ khoảng 1 - 2 phút, GitHub sẽ tự động:
   - Kiểm tra 71 tests tự động (Vitest)
   - Đóng gói mã nguồn thành bản build production tối ưu
   - Xuất bản trực tiếp lên Internet.

---

## BƯỚC 4: HOÀN TẤT & TRUY CẬP

Sau khi Actions hoàn thành (hiện dấu tích xanh ✅), trang web của bạn chính thức hoạt động tại:

🎉 **https://kienhpw.github.io/so-sanh-phi-giao-dich/**

Tất cả tính năng (so sánh 30 CTCK, mô phỏng chi phí, đề xuất BSC CIF 4768, và popup đăng nhập quản trị kienhpw@gmail.com) đều hoạt động hoàn hảo trên link này!
