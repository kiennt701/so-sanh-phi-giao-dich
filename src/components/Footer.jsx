import React from 'react';
import { ShieldCheck, Github, Heart, Sparkles, ExternalLink, HelpCircle, Mail, MessageSquarePlus } from 'lucide-react';

export default function Footer({ scrollToSection, onOpenFeedback }) {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="mx-auto max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1580px] px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
        {/* Top section: Disclaimer callout */}
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 dark:border-amber-900/40 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed mb-10">
          <div className="flex items-center gap-2 font-bold mb-1.5 text-amber-800 dark:text-amber-300 text-sm">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Tuyên bố miễn trừ trách nhiệm (Legal Disclaimer)</span>
          </div>
          <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
            Đây là nền tảng mã nguồn mở độc lập, phi lợi nhuận nhằm mục đích minh bạch hóa thông tin và tính toán chi phí thực hiện giao dịch trên thị trường chứng khoán Việt Nam. Toàn bộ số liệu về biểu phí, lãi suất vay margin và chương trình khuyến mãi được tổng hợp từ các thông báo công khai trên website chính thức của 30 Công ty Chứng khoán (CTCK) hàng đầu. <strong>Thông tin về mức phí giao dịch đã bao gồm phí trả sở và chưa bao gồm thuế</strong> (thuế TNCN 0.1% khi chuyển nhượng cổ phiếu theo quy định của Pháp luật Việt Nam). Tình trạng niêm yết và hồ sơ pháp lý có thể đối soát trực tiếp tại <a href="https://congbothongtin.ssc.gov.vn/faces/CompanyProfilesSearch" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-amber-950 dark:hover:text-amber-100 inline-flex items-center gap-0.5">Cổng thông tin UBCKNN (SSC) <ExternalLink className="h-3 w-3 inline" /></a>. Mức phí và lãi suất thực tế có thể thay đổi theo quyết định ban hành nội bộ của từng CTCK theo từng thời kỳ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                So Sánh Chi Phí <span className="text-blue-600 dark:text-blue-400">Giao Dịch Chứng Khoán</span>
              </span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                v2.2
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Nền tảng So sánh chi phí giao dịch chứng khoán: tính toán chi phí thực hiện giao dịch minh bạch và chuẩn xác nhất dành cho cộng đồng nhà đầu tư Việt Nam.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>Mã nguồn trên GitHub (MIT License)</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Điều Hướng Nhanh
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => scrollToSection('comparison-table')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Bảng ma trận so sánh
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('calculator-section')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Công cụ mô phỏng chi phí
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq-section')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Tiêu chí chọn CTCK phù hợp
                </button>
              </li>
              <li>
                <a
                  href="https://congbothongtin.ssc.gov.vn/faces/CompanyProfilesSearch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Cổng CBTT UBCKNN (SSC)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contribution */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Đóng Góp Dữ Liệu
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Bạn phát hiện biểu phí hoặc lãi Margin mới thay đổi? Hãy đóng góp để cùng nhau cập nhật dữ liệu chính xác cho cộng đồng!
            </p>

            {/* Quick Action Button to open feedback popup */}
            <button
              type="button"
              onClick={onOpenFeedback}
              className="w-full mb-3 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all shadow-blue-500/20"
            >
              <MessageSquarePlus className="h-4 w-4" />
              <span>Gửi Phản Hồi / Cập Nhật</span>
            </button>

            {/* Community Contribution & Verification Note */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-2.5 space-y-1">
              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Kiểm duyệt & Cập nhật:</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-snug font-medium">
                Dữ liệu đóng góp được đối soát trực tiếp với biểu phí niêm yết của CTCK trước khi xuất bản lên hệ thống.
              </p>
            </div>

            <div className="mt-2.5">
              <a
                href="https://github.com/kiennt701/so-sanh-phi-giao-dich"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors"
              >
                <span>Hướng dẫn mã nguồn & Đóng góp dữ liệu</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Nền tảng So sánh chi phí giao dịch chứng khoán. Dự án phát triển vì cộng đồng nhà đầu tư Việt Nam.</p>
          <div className="flex items-center gap-1">
            <span>Phát triển với tinh thần</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" />
            <span>Mã nguồn mở miễn phí</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
