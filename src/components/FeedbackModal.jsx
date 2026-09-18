import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  MessageSquarePlus, 
  CheckCircle2,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Inbox
} from 'lucide-react';
import { SECURITIES_COMPANIES } from '../data/securitiesData';
import { 
  saveFeedbackToInbox, 
  buildFeedbackMailtoUrl, 
  buildFeedbackGmailUrl, 
  formatFeedbackEmailBody,
  ADMIN_FEEDBACK_EMAIL,
  CATEGORY_LABELS
} from '../utils/feedbackStorage';

export default function FeedbackModal({ isOpen, onClose, companies = SECURITIES_COMPANIES, onFeedbackSubmitted }) {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [category, setCategory] = useState('trading_fee');
  const [content, setContent] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedItem, setSavedItem] = useState(null);

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

  const targetCompany = companies.find(c => c.id === selectedCompany);
  const companyName = selectedCompany 
    ? (targetCompany?.shortName || selectedCompany) 
    : 'Chung';
  const categoryLabel = CATEGORY_LABELS[category] || 'Góp Ý Khác';

  const mailtoUrl = buildFeedbackMailtoUrl({
    companyName,
    categoryLabel,
    content,
    sourceUrl,
    senderContact
  });

  const gmailUrl = buildFeedbackGmailUrl({
    companyName,
    categoryLabel,
    content,
    sourceUrl,
    senderContact
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Lưu phản hồi vào Hộp Thư Quản Trị Viên (localStorage)
    const item = saveFeedbackToInbox({
      companyId: selectedCompany,
      companyName,
      category,
      categoryLabel,
      content,
      sourceUrl,
      senderContact
    });
    setSavedItem(item);

    if (onFeedbackSubmitted) {
      onFeedbackSubmitted(item);
    }

    // 2. Chuyển sang trạng thái đã gửi
    setIsSubmitted(true);

    // 3. Tự động kích hoạt mailto mở trình gửi thư của người dùng
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback nếu trình duyệt chặn
    }
  };

  const handleCopyEmail = () => {
    const bodyText = formatFeedbackEmailBody({
      companyName,
      categoryLabel,
      content,
      sourceUrl,
      senderContact
    });
    const fullText = `Tới: ${ADMIN_FEEDBACK_EMAIL}\nTiêu đề: [Đóng Góp Dữ Liệu] Phản hồi CTCK ${companyName} - ${categoryLabel}\n\n${bodyText}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setContent('');
    setSourceUrl('');
    setSenderContact('');
    setSavedItem(null);
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
                Gửi ý kiến vào Hộp Thư Quản Trị Viên & Email ban quản trị
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
          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Ý kiến của bạn sẽ được <strong>lưu trực tiếp vào Hộp Thư Quản Trị Viên</strong> trên hệ thống và chuyển tiếp tới email quản trị viên: <strong className="text-blue-600 dark:text-blue-400">{ADMIN_FEEDBACK_EMAIL}</strong>.
          </div>
        </div>

        {isSubmitted ? (
          /* Success State with Direct Email Options */
          <div className="mt-5 py-2 text-center space-y-3.5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                Đã Lưu Vào Hộp Thư Quản Trị Viên!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                Ý kiến đóng góp của bạn đã được ghi nhận vào hệ thống. Bạn cũng có thể bấm nút dưới đây để gửi trực tiếp bản sao qua Email tới Ban Quản Trị.
              </p>
            </div>

            {/* Email Actions Panel */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-3.5 text-left space-y-2.5">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Gửi bản sao qua Email tới {ADMIN_FEEDBACK_EMAIL}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={mailtoUrl}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Mở Ứng Dụng Email</span>
                </a>

                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Gửi Qua Gmail Web</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Đã sao chép nội dung email!' : 'Sao chép nội dung & Tiêu đề email'}</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-all shadow-sm"
              >
                Đã Xong & Đóng Cửa Sổ
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
                {companies.map((company) => (
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

            {/* Helper notice & direct email link */}
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between gap-2 border border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>Hoặc gửi trực tiếp tới: <strong className="text-slate-700 dark:text-slate-200">{ADMIN_FEEDBACK_EMAIL}</strong></span>
              </span>
              <a
                href={mailtoUrl}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 shrink-0"
              >
                <span>Gửi qua Email</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Submit buttons */}
            <div className="pt-1 flex items-center justify-end gap-2">
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
                <span>Gửi Vào Hộp Thư Admin</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
