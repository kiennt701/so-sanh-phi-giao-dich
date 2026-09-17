/**
 * VIETSEC AUTHENTICATION & GOOGLE SSO SERVICE
 * Quản lý phiên đăng nhập SSO Google và xác thực quyền Quản trị viên (Admin).
 * Tài khoản được cấp quyền chỉnh sửa dữ liệu duy nhất: Kienhpw@gmail.com
 */

export const AUTHORIZED_ADMIN_EMAIL = 'kienhpw@gmail.com';
export const ADMIN_FIXED_PASSWORD = 'Kien$396731';
const STORAGE_KEY = 'vietsec_admin_session_v1';

/**
 * Xác thực thông tin đăng nhập quản trị viên (email và mật khẩu cố định)
 * @param {string} email
 * @param {string} password
 * @returns {boolean}
 */
export function verifyAdminCredentials(email, password) {
  if (!isAuthorizedAdmin(email)) return false;
  if (!password || typeof password !== 'string') return false;
  return password.trim() === ADMIN_FIXED_PASSWORD;
}

/**
 * Lấy thông tin phiên làm việc hiện tại từ localStorage
 */
export function getCurrentUser() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    if (user && user.email && isAuthorizedAdmin(user.email)) {
      return user;
    }
    return null;
  } catch (err) {
    console.error('Lỗi đọc session auth:', err);
    return null;
  }
}

/**
 * Kiểm tra xem email có phải là quản trị viên được cấp quyền không
 */
export function isAuthorizedAdmin(email) {
  if (!email || typeof email !== 'string') return false;
  return email.trim().toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();
}

/**
 * Đăng nhập bằng Google SSO
 * @param {string} email Email Google của người dùng
 * @param {object} profile Thông tin bổ sung (tên, avatar, provider)
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export function loginWithGoogle(email, profile = {}) {
  const cleanEmail = (email || '').trim();

  if (!cleanEmail) {
    return {
      success: false,
      error: 'Vui lòng nhập hoặc chọn tài khoản Google để tiếp tục.'
    };
  }

  if (!isAuthorizedAdmin(cleanEmail)) {
    return {
      success: false,
      error: `Truy cập bị từ chối: Tài khoản "${cleanEmail}" không có quyền quản trị viên để cập nhật dữ liệu.`
    };
  }

  const user = {
    email: cleanEmail,
    name: profile.name || 'Kien Nguyen (Admin)',
    avatar: profile.avatar || null,
    provider: 'google',
    role: 'admin',
    loggedInAt: new Date().toISOString()
  };

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (err) {
      console.warn('Không thể lưu session vào localStorage:', err);
    }
  }

  return {
    success: true,
    user
  };
}

/**
 * Đăng xuất khỏi hệ thống
 */
export function logoutAdmin() {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Lỗi khi xóa session auth:', err);
    }
  }
}

/**
 * Lấy Google Client ID cấu hình
 */
export function getGoogleClientId() {
  if (typeof localStorage === 'undefined') return '';
  return (
    localStorage.getItem('vietsec_google_client_id') ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_CLIENT_ID) ||
    ''
  );
}

/**
 * Lưu hoặc xóa Google Client ID tùy chỉnh
 */
export function setGoogleClientId(id) {
  if (typeof localStorage === 'undefined') return;
  if (id && typeof id === 'string') {
    localStorage.setItem('vietsec_google_client_id', id.trim());
  } else {
    localStorage.removeItem('vietsec_google_client_id');
  }
}

/**
 * Mở cửa sổ popup đăng nhập Google SSO thực tế trên trình duyệt
 */
export function openGoogleLoginPopup() {
  if (typeof window === 'undefined') return null;
  const width = 500;
  const height = 640;
  const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
  const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);

  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || './';
  const popupUrl = baseUrl.endsWith('/') ? `${baseUrl}google-login.html` : `${baseUrl}/google-login.html`;

  return window.open(
    popupUrl,
    'VietSecGoogleAuth',
    `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=yes`
  );
}

