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
