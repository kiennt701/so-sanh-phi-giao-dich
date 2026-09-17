import { describe, it, expect, beforeEach } from 'vitest';
import { 
  AUTHORIZED_ADMIN_EMAIL, 
  ADMIN_FIXED_PASSWORD,
  isAuthorizedAdmin, 
  verifyAdminCredentials,
  loginWithGoogle, 
  getCurrentUser, 
  logoutAdmin 
} from '../src/utils/auth';

describe('Google SSO & Admin Authorization Suite', () => {
  let store = {};

  beforeEach(() => {
    store = {};
    globalThis.localStorage = {
      getItem: (key) => store[key] || null,
      setItem: (key, val) => { store[key] = String(val); },
      removeItem: (key) => { delete store[key]; },
      clear: () => { store = {}; }
    };
  });

  it('should have AUTHORIZED_ADMIN_EMAIL set to kienhpw@gmail.com', () => {
    expect(AUTHORIZED_ADMIN_EMAIL.toLowerCase()).toBe('kienhpw@gmail.com');
  });

  it('should validate authorized admin email case-insensitively', () => {
    expect(isAuthorizedAdmin('Kienhpw@gmail.com')).toBe(true);
    expect(isAuthorizedAdmin('kienhpw@gmail.com')).toBe(true);
    expect(isAuthorizedAdmin('  KIENHPW@GMAIL.COM  ')).toBe(true);

    expect(isAuthorizedAdmin('kien@gmail.com')).toBe(false);
    expect(isAuthorizedAdmin('user@gmail.com')).toBe(false);
    expect(isAuthorizedAdmin('')).toBe(false);
    expect(isAuthorizedAdmin(null)).toBe(false);
    expect(isAuthorizedAdmin(undefined)).toBe(false);
  });

  it('should permit login for authorized Google email and store session', () => {
    const res = loginWithGoogle('Kienhpw@gmail.com', { name: 'Kien Nguyen' });
    expect(res.success).toBe(true);
    expect(res.user).toBeDefined();
    expect(res.user.email).toBe('Kienhpw@gmail.com');
    expect(res.user.role).toBe('admin');
    expect(res.user.provider).toBe('google');

    // Verify persisted session in localStorage
    const current = getCurrentUser();
    expect(current).not.toBeNull();
    expect(current.email).toBe('Kienhpw@gmail.com');
    expect(current.role).toBe('admin');
  });

  it('should reject login for unauthorized Google email with access denied error', () => {
    const res = loginWithGoogle('attacker@gmail.com');
    expect(res.success).toBe(false);
    expect(res.user).toBeUndefined();
    expect(res.error).toContain('Truy cập bị từ chối');
    expect(res.error).toContain('không có quyền quản trị viên');
    expect(res.error.toLowerCase()).not.toContain('kienhpw@gmail.com');

    // Ensure no session stored
    expect(getCurrentUser()).toBeNull();
  });

  it('should reject empty or whitespace email', () => {
    const res = loginWithGoogle('   ');
    expect(res.success).toBe(false);
    expect(res.error).toContain('Vui lòng nhập hoặc chọn tài khoản Google');
  });

  it('should clear session upon logout', () => {
    loginWithGoogle('Kienhpw@gmail.com');
    expect(getCurrentUser()).not.toBeNull();

    logoutAdmin();
    expect(getCurrentUser()).toBeNull();
  });

  it('should get and set custom Google Client ID in localStorage', async () => {
    const { getGoogleClientId, setGoogleClientId } = await import('../src/utils/auth');
    expect(getGoogleClientId()).toBe('');

    setGoogleClientId('test-client-id.apps.googleusercontent.com');
    expect(getGoogleClientId()).toBe('test-client-id.apps.googleusercontent.com');

    setGoogleClientId('');
    expect(getGoogleClientId()).toBe('');
  });

  it('should authenticate fixed admin credentials (kienhpw@gmail.com / Kien$396731)', () => {
    expect(ADMIN_FIXED_PASSWORD).toBe('Kien$396731');

    // Valid credentials
    expect(verifyAdminCredentials('kienhpw@gmail.com', 'Kien$396731')).toBe(true);
    expect(verifyAdminCredentials('Kienhpw@gmail.com', 'Kien$396731')).toBe(true);
    expect(verifyAdminCredentials('  KIENHPW@GMAIL.COM  ', 'Kien$396731')).toBe(true);

    // Invalid password
    expect(verifyAdminCredentials('kienhpw@gmail.com', 'wrongpassword')).toBe(false);
    expect(verifyAdminCredentials('kienhpw@gmail.com', '')).toBe(false);
    expect(verifyAdminCredentials('kienhpw@gmail.com', null)).toBe(false);

    // Invalid email with correct password
    expect(verifyAdminCredentials('other@gmail.com', 'Kien$396731')).toBe(false);
  });
});
