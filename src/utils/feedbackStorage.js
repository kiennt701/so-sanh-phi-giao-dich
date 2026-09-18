/**
 * TIỆN ÍCH QUẢN LÝ HỘP THƯ Ý KIẾN ĐÓNG GÓP & GỬI EMAIL QUẢN TRỊ VIÊN
 */

export const STORAGE_KEY = 'vietsec_feedback_inbox';
export const ADMIN_FEEDBACK_EMAIL = 'kienhpw@gmail.com';

export const CATEGORY_LABELS = {
  trading_fee: 'Phí Giao Dịch',
  margin: 'Lãi Suất Margin',
  promo: 'Ưu Đãi Mở Mới',
  other: 'Góp Ý Khác'
};

/**
 * Lấy danh sách toàn bộ ý kiến đóng góp từ localStorage
 * @returns {Array} Danh sách feedback được sắp xếp mới nhất lên đầu
 */
export function getStoredFeedbacks() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (err) {
    console.error('Lỗi khi đọc hộp thư ý kiến:', err);
    return [];
  }
}

/**
 * Lưu một ý kiến đóng góp mới vào Hộp Thư Quản Trị Viên (localStorage)
 * @param {Object} feedback 
 * @returns {Object} Mục feedback vừa được tạo
 */
export function saveFeedbackToInbox(feedback) {
  const existing = getStoredFeedbacks();
  const catLabel = feedback.categoryLabel || CATEGORY_LABELS[feedback.category] || 'Góp Ý Khác';
  
  const newItem = {
    id: feedback.id || `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: feedback.createdAt || new Date().toISOString(),
    companyId: feedback.companyId || '',
    companyName: feedback.companyName || 'Chung',
    category: feedback.category || 'other',
    categoryLabel: catLabel,
    content: (feedback.content || '').trim(),
    sourceUrl: (feedback.sourceUrl || '').trim(),
    senderContact: (feedback.senderContact || '').trim(),
    status: feedback.status || 'new', // 'new' | 'read' | 'resolved'
    adminNotes: feedback.adminNotes || ''
  };

  const updated = [newItem, ...existing];
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vietsec_feedback_updated', { detail: updated }));
    }
  } catch (err) {
    console.error('Lỗi khi lưu feedback vào localStorage:', err);
  }
  return newItem;
}

/**
 * Cập nhật trạng thái hoặc ghi chú của một mục feedback
 */
export function updateFeedbackItem(id, updates) {
  const list = getStoredFeedbacks();
  const updated = list.map(item => item.id === id ? { ...item, ...updates } : item);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vietsec_feedback_updated', { detail: updated }));
    }
  } catch (err) {
    console.error('Lỗi khi cập nhật feedback:', err);
  }
  return updated;
}

/**
 * Xóa một ý kiến đóng góp theo ID
 */
export function deleteFeedbackItem(id) {
  const list = getStoredFeedbacks();
  const updated = list.filter(item => item.id !== id);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vietsec_feedback_updated', { detail: updated }));
    }
  } catch (err) {
    console.error('Lỗi khi xóa feedback:', err);
  }
  return updated;
}

/**
 * Đánh dấu toàn bộ ý kiến là đã đọc / đã xử lý
 */
export function markAllFeedbacksRead() {
  const list = getStoredFeedbacks();
  const updated = list.map(item => ({ ...item, status: 'resolved' }));
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vietsec_feedback_updated', { detail: updated }));
    }
  } catch (err) {
    console.error('Lỗi khi cập nhật trạng thái toàn bộ feedback:', err);
  }
  return updated;
}

/**
 * Xóa toàn bộ hộp thư ý kiến
 */
export function clearAllFeedbacks() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vietsec_feedback_updated', { detail: [] }));
    }
  } catch (err) {
    console.error('Lỗi khi dọn dẹp hộp thư feedback:', err);
  }
}

/**
 * Lấy số lượng ý kiến đóng góp mới chưa đọc
 */
export function getNewFeedbackCount() {
  const list = getStoredFeedbacks();
  return list.filter(item => item.status === 'new').length;
}

/**
 * Soạn nội dung text chuẩn cho email phản hồi
 */
export function formatFeedbackEmailBody({ companyName, categoryLabel, content, sourceUrl, senderContact }) {
  let body = `Xin chào ban quản trị,\n\nTôi muốn đóng góp / phản hồi thông tin sau:\n\n`;
  body += `- CTCK: ${companyName || 'Chung'}\n`;
  body += `- Mục: ${categoryLabel || 'Góp ý'}\n`;
  body += `- Chi tiết nội dung: ${content}\n`;
  if (sourceUrl) body += `- Link dẫn chứng: ${sourceUrl}\n`;
  if (senderContact) body += `- Người gửi: ${senderContact}\n`;
  body += `\nTrân trọng.`;
  return body;
}

/**
 * Tạo link mailto: gửi trực tiếp đến email quản trị viên
 */
export function buildFeedbackMailtoUrl({ companyName, categoryLabel, content, sourceUrl, senderContact }) {
  const subject = encodeURIComponent(`[Đóng Góp Dữ Liệu] Phản hồi CTCK ${companyName || 'Chung'} - ${categoryLabel || 'Góp ý'}`);
  const bodyText = formatFeedbackEmailBody({ companyName, categoryLabel, content, sourceUrl, senderContact });
  return `mailto:${ADMIN_FEEDBACK_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
}

/**
 * Tạo link compose trên Gmail Web gửi trực tiếp đến email quản trị viên
 */
export function buildFeedbackGmailUrl({ companyName, categoryLabel, content, sourceUrl, senderContact }) {
  const subject = encodeURIComponent(`[Đóng Góp Dữ Liệu] Phản hồi CTCK ${companyName || 'Chung'} - ${categoryLabel || 'Góp ý'}`);
  const bodyText = formatFeedbackEmailBody({ companyName, categoryLabel, content, sourceUrl, senderContact });
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ADMIN_FEEDBACK_EMAIL)}&su=${subject}&body=${encodeURIComponent(bodyText)}`;
}

/**
 * Gửi tự động bản sao ý kiến đóng góp tới email quản trị viên thông qua FormSubmit
 * @param {Object} feedback
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function sendFeedbackToEmailApi(feedback) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${ADMIN_FEEDBACK_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[VietSec Đóng Góp] CTCK ${feedback.companyName || 'Chung'} - ${feedback.categoryLabel || 'Góp ý'}`,
        _captcha: 'false',
        ctck: feedback.companyName || 'Chung',
        chuyen_muc: feedback.categoryLabel || 'Góp ý',
        noi_dung: feedback.content,
        link_nguon: feedback.sourceUrl || 'Không có',
        nguoi_gui: feedback.senderContact || 'Khách vãng lai / Chưa để lại email',
        thoi_gian: new Date().toLocaleString('vi-VN')
      })
    });
    const data = await res.json();
    return { 
      success: data.success === 'true' || data.success === true, 
      message: data.message || 'Đã gửi thành công'
    };
  } catch (err) {
    console.warn('Lỗi khi gửi qua FormSubmit:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Nạp dữ liệu góp ý mẫu để quản trị viên kiểm thử nhanh giao diện hộp thư
 */
export function seedSampleFeedbacks() {
  const samples = [
    {
      id: `fb_demo_1`,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      companyId: 'bsc',
      companyName: 'BSC',
      category: 'trading_fee',
      categoryLabel: 'Phí Giao Dịch',
      content: 'BSC vừa cập nhật chương trình ưu đãi phí giao dịch tiểu khoản phái sinh về 0.05% trong 3 tháng đầu.',
      sourceUrl: 'https://bsc.com.vn/bieu-phi-moi',
      senderContact: 'nha-dau-tu-hn@gmail.com',
      status: 'new',
      adminNotes: ''
    },
    {
      id: `fb_demo_2`,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      companyId: 'tcbs',
      companyName: 'TCBS',
      category: 'margin',
      categoryLabel: 'Lãi Suất Margin',
      content: 'TCBS áp dụng gói Margin ưu đãi 9.9%/năm cho danh mục Top 50 cổ phiếu thanh khoản cao.',
      sourceUrl: 'https://tcbs.com.vn/goi-margin-99',
      senderContact: '0988123456',
      status: 'new',
      adminNotes: ''
    }
  ];

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vietsec_feedback_updated', { detail: samples }));
    }
  } catch (err) {
    console.error('Lỗi khi nạp dữ liệu mẫu feedback:', err);
  }
  return samples;
}


