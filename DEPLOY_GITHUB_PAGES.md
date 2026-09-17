# Hướng Dẫn Hoàn Tất Đưa Website Lên: https://kiennt701.github.io/so-sanh-phi-giao-dich/

Repository của bạn đã được tạo sẵn tại:
👉 **https://github.com/kiennt701/so-sanh-phi-giao-dich**

Khi kích hoạt xong GitHub Pages, website cộng đồng sẽ hoạt động vĩnh viễn và miễn phí tại địa chỉ:
🌐 **https://kiennt701.github.io/so-sanh-phi-giao-dich/**

---

## CÁCH 1: TẢI LÊN TRỰC TIẾP QUA TRÌNH DUYỆT (NHANH NHẤT - KHÔNG CẦN CÀI GÌ)

1. Truy cập trực tiếp trang upload của repository:
   👉 **https://github.com/kiennt701/so-sanh-phi-giao-dich/upload/main**
2. Mở cửa sổ **File Explorer** của Windows đến thư mục:
   `e:\OneDrive\AI-Agent\vietsec-fee-comparator`
3. Chọn tất cả các file và thư mục (nhấn `Ctrl + A`, lưu ý bỏ qua thư mục `node_modules` nếu có) rồi kéo thả vào vùng upload trên trình duyệt.
4. Ở ô bên dưới, nhập: `Golive website so-sanh-phi-giao-dich`.
5. Bấm nút màu xanh **Commit changes**.

---

## CÁCH 2: SỬ DỤNG GITHUB DESKTOP (GIAO DIỆN TRỰC QUAN)

1. Tải và cài đặt miễn phí: [GitHub Desktop](https://desktop.github.com/).
2. Đăng nhập tài khoản GitHub **kiennt701**.
3. Chọn **File** -> **Add local repository...** (phím tắt `Ctrl + O`).
4. Bấm **Browse...** và chọn thư mục:
   `e:\OneDrive\AI-Agent\vietsec-fee-comparator`
5. Bấm **create a repository** nếu được hỏi.
6. Bấm **Commit to main**.
7. Bấm **Publish repository** -> Chọn repository `so-sanh-phi-giao-dich` trên tài khoản `kiennt701` -> Bỏ tích *"Keep this code private"* -> Bấm **Publish repository**.

---

## CÁCH 3: DÙNG DÒNG LỆNH GIT (NẾU ĐÃ CÀI GIT)

```bash
cd e:\OneDrive\AI-Agent\vietsec-fee-comparator
git init
git add .
git commit -m "feat: golive so-sanh-phi-giao-dich"
git branch -M main
git remote add origin https://github.com/kiennt701/so-sanh-phi-giao-dich.git
git push -u origin main
```

---

## BƯỚC CUỐI CÙNG: BẬT GITHUB PAGES (TỰ ĐỘNG XUẤT BẢN)

Sau khi mã nguồn đã được tải lên:

1. Vào mục Cài đặt repository:
   👉 **https://github.com/kiennt701/so-sanh-phi-giao-dich/settings/pages**
2. Tại phần **Build and deployment**:
   - Ở ô **Source**, nhấp chọn:
     👉 **GitHub Actions**
3. Hệ thống GitHub sẽ tự động nhận file `.github/workflows/deploy.yml` đã được tạo sẵn trong dự án:
   - Tự động chạy 71 bài kiểm thử
   - Tự động build bản production tối ưu
   - Xuất bản trực tiếp lên Internet sau 1 - 2 phút.

🎉 **Website cộng đồng của bạn chính thức online tại:**
👉 **https://kiennt701.github.io/so-sanh-phi-giao-dich/**
