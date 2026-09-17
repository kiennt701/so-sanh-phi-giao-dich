import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldAlert, CheckCircle2, ShieldCheck, ExternalLink, Settings, Sparkles } from 'lucide-react';
import { loginWithGoogle, openGoogleLoginPopup, getGoogleClientId, setGoogleClientId } from '../utils/auth';

export default function GoogleAuthModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [customClientId, setCustomClientId] = useState(() => getGoogleClientId());

  // Listen for message from Google SSO popup window
  useEffect(() => {
    const handleAuthMessage = (event) => {
      if (!event.data || event.data.type !== 'GOOGLE_SSO_SUCCESS') return;

      const { email, name, avatar } = event.data;
      setIsLoading(true);
      setErrorMsg('');

      const result = loginWithGoogle(email, { name, avatar });
      setIsLoading(false);

      if (result.success) {
        setSuccessMsg(`Xác thực Google SSO thành công với quyền Quản trị viên!`);
        setTimeout(() => {
          onSuccess(result.user);
          onClose();
        }, 800);
      } else {
        setErrorMsg(result.error);
      }
    };

    window.addEventListener('message', handleAuthMessage);
    return () => window.removeEventListener('message', handleAuthMessage);
  }, [onSuccess, onClose]);

  // Handle clicking "Đăng nhập bằng Google SSO" - Opens real popup window
  const handleTriggerGoogleAuth = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const clientId = getGoogleClientId();

    // 1. If Google Identity Services is available with a configured Client ID
    if (clientId && window.google?.accounts?.oauth2) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'email profile openid',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              setIsLoading(false);
              setErrorMsg('Lỗi Google OAuth: ' + tokenResponse.error);
              return;
            }
            if (tokenResponse.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const profile = await res.json();
                const result = loginWithGoogle(profile.email, {
                  name: profile.name,
                  avatar: profile.picture
                });

                setIsLoading(false);
                if (result.success) {
                  setSuccessMsg(`Google OAuth 2.0 xác thực thành công!`);
                  setTimeout(() => {
                    onSuccess(result.user);
                    onClose();
                  }, 800);
                } else {
                  setErrorMsg(result.error);
                }
              } catch (err) {
                setIsLoading(false);
                setErrorMsg('Không thể lấy thông tin từ Google API: ' + err.message);
              }
            }
          }
        });

        tokenClient.requestAccessToken({ prompt: 'select_account' });
        setIsLoading(false);
        return;
      } catch (err) {
        console.warn('Google Identity Services client error, falling back to popup window:', err);
      }
    }

    // 2. Open dedicated Google SSO popup window
    const popup = openGoogleLoginPopup();
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      setIsLoading(false);
      setErrorMsg('Trình duyệt đã chặn cửa sổ popup. Vui lòng bật "Cho phép popup" trên thanh địa chỉ trình duyệt và thử lại.');
      return;
    }

    setIsLoading(false);
  };

  const handleSaveClientId = (e) => {
    e.preventDefault();
    setGoogleClientId(customClientId);
    setSuccessMsg('Đã lưu Google Cloud Client ID thành công!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Lock header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 mb-3">
            <Lock className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Xác Thực Quản Trị Viên
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
            Tính năng cập nhật dữ liệu được bảo vệ và chỉ cho phép chỉnh sửa qua tài khoản Google SSO được phân quyền.
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-5 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-3.5 dark:border-blue-900/50 dark:bg-blue-950/40 text-xs">
          <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Cửa sổ đăng nhập Google SSO an toàn:</span>
          </div>
          <p className="text-[11px] text-blue-800/80 dark:text-blue-300/80 mt-1 leading-relaxed">
            Nhấp nút bên dưới để mở cửa sổ đăng nhập Google chính thức. Hệ thống sẽ đối chiếu và cấp quyền quản trị nếu tài khoản hợp lệ.
          </p>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Primary Action: Open Google Login Popup */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleTriggerGoogleAuth}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white py-3.5 px-4 text-sm font-bold text-slate-800 shadow-sm hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-750 transition-all cursor-pointer"
          >
            {/* Official Google G Logo SVG */}
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {isLoading ? 'Đang mở cửa sổ đăng nhập...' : 'Mở Cửa Sổ Đăng Nhập Google SSO'}
            </span>
            <ExternalLink className="h-4 w-4 text-slate-400" />
          </button>

          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
            Cửa sổ popup Google sẽ mở lên để bạn xác thực tài khoản và mật khẩu bảo mật.
          </p>

          {/* Optional: Configure Google Cloud OAuth 2.0 Client ID */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1.5 py-1 transition-colors"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Thiết lập Google Cloud Client ID (OAuth 2.0)</span>
            </button>

            {showConfig && (
              <form onSubmit={handleSaveClientId} className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2 animate-fade-in">
                <label className="block font-bold text-slate-700 dark:text-slate-300">
                  Google Client ID (từ Google Cloud Console):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customClientId}
                    onChange={(e) => setCustomClientId(e.target.value)}
                    placeholder="xxxx.apps.googleusercontent.com"
                    className="flex-1 rounded-lg border border-slate-300 px-2.5 py-1.5 font-mono text-[11px] dark:border-slate-600 dark:bg-slate-750 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-3 py-1.5 font-bold text-white hover:bg-blue-700 transition-colors shrink-0"
                  >
                    Lưu
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                  Cấu hình này cho phép bạn kích hoạt trực tiếp giao thức Google Identity Services của chính Google trên tên miền này.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-5 text-center text-[11px] text-slate-400">
          Chính sách bảo mật dữ liệu VietSec • Phân quyền SSO Google Workspace
        </div>
      </div>
    </div>
  );
}

