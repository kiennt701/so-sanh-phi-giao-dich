import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  MessageSquarePlus, 
  CheckCircle2
} from 'lucide-react';
import { SECURITIES_COMPANIES } from '../data/securitiesData';

export default function FeedbackModal({ isOpen, onClose }) {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [category, setCategory] = useState('trading_fee');
  const [content, setContent] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const contactEmail = 'kienhpw@gmail.com';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare mailto link with pre-filled content
    const companyName = selectedCompany 
      ? SECURITIES_COMPANIES.find(c => c.id === selectedCompany)?.shortName || selectedCompany 
      : 'Chung';

    const categoryLabels = {
      trading_fee: 'Biểu phí giao dịch',
      margin: 'Lãi suất Margin',
      promo: 'Ưu đãi mở tài khoản mới',
      other: 'Góp ý khác'
    };

    const subject = encodeURIComponent(`[Đóng Góp Dữ Liệu] Phản hồi CTCK ${companyName} - ${categoryLabels[category] || category}`);
    
    let bodyText = `Xin chào ban quản trị,\n\nTôi muốn đóng góp / phản hồi thông tin sau:\n\n`;
    bodyText += `- CTCK: ${companyName}\n`;
    bodyText += `- Mục: ${categoryLabels[category] || category}\n`;
    bodyText += `- Chi tiết nội dung: ${content}\n`;
    if (sourceUrl) bodyText += `- Link dẫn chứng: ${sourceUrl}\n`;
    if (senderContact) bodyText += `- Người gửi: ${senderContact}\n`;
    bodyText += `\nTrân trọng.`;

    const mailtoUrl = `mailto:${contactEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

    // Open user's email client
    window.location.href = mailtoUrl;

    // Show success state
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setContent('');
    setSourceUrl('');
    setSenderContact('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 shrink-0">
              <MessageSquarePlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Đóng Góp Dữ Liệu & Phản Hồi
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cùng xây dựng cơ sở dữ liệu phí chứng khoán chính xác nhất
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            title="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Verification Info Banner */}
        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5 dark:border-blue-900/40 dark:bg-blue-950/30 flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Ý kiến đóng góp và đề xuất cập nhật biểu phí của bạn sẽ được gửi trực tiếp đến Ban Quản Trị để đối chiếu xác thực với biểu phí niêm yết chính thức.
          </p>
        </div>

        {isSubmitted ? (
          /* Success State */
          <div className="mt-6 py-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
              Cảm Ơn Bạn Đã Đóng Góp!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              Trình gửi thư của bạn đã được kích hoạt. Chúng tôi sẽ kiểm tra và cập nhật biểu phí mới nhất lên hệ thống trong thời gian sớm nhất.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-all shadow-sm"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        ) : (
          /* Feedback Form */
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            {/* CTCK selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Công ty Chứng khoán cần cập nhật
              </label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="">-- Chọn công ty chứng khoán (hoặc góp ý chung) --</option>
                {SECURITIES_COMPANIES.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.shortName} — {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Mục thông tin thay đổi
              </label>
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {[
                  { id: 'trading_fee', label: 'Phí Giao Dịch' },
                  { id: 'margin', label: 'Lãi Suất Margin' },
                  { id: 'promo', label: 'Ưu Đãi Mở Mới' },
                  { id: 'other', label: 'Góp Ý Khác' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`rounded-lg py-1.5 px-2 text-[11px] font-bold text-center border transition-all ${
                      category === item.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Content */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Nội dung chi tiết <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ví dụ: Phí giao dịch online của công ty X vừa giảm xuống 0.08%, hoặc gói margin T+ mới áp dụng lãi 7.5%/năm..."
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Source link */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Link nguồn tham khảo / Dẫn chứng (nếu có)
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Sender Name / Contact */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Email hoặc Tên của bạn (Tùy chọn để liên hệ lại)
              </label>
              <input
                type="text"
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                placeholder="Nguyễn Văn A / a@gmail.com"
                className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Submit buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white py-2 px-4 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Hủy Bỏ
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2 px-5 text-xs font-extrabold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Gửi Phản Hồi Ngay</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
