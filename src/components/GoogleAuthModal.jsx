import React, { useState } from 'react';
import { X, Lock, ShieldAlert, CheckCircle2, ShieldCheck, KeyRound, Mail } from 'lucide-react';
import { loginAdmin } from '../utils/auth';

export default function GoogleAuthModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const result = loginAdmin(email, password);
    setIsLoading(false);

    if (result.success) {
      setSuccessMsg('Xác thực thành công! Đang đăng nhập quyền Quản trị viên...');
      setTimeout(() => {
        onSuccess(result.user);
        onClose();
      }, 700);
    } else {
      setErrorMsg(result.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          title="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header with Shield/Lock Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 mb-3">
            <Lock className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Đăng Nhập Quản Trị Viên
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
            Nhập email và mật khẩu quản trị để mở khóa quyền hiệu chỉnh và cập nhật dữ liệu biểu phí.
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-4 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-3 dark:border-blue-900/50 dark:bg-blue-950/40 text-xs">
          <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Khu vực dành riêng cho Quản trị viên:</span>
          </div>
          <p className="text-[11px] text-blue-800/80 dark:text-blue-300/80 mt-1 leading-relaxed">
            Hệ thống xác thực nội bộ kiểm tra email và mật khẩu được ủy quyền để bảo vệ tính toàn vẹn của dữ liệu.
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

        {/* Direct Login Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Email Quản Trị Viên
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email quản trị viên..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Mật Khẩu Xác Thực
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu quản trị viên..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 px-4 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer disabled:opacity-50 mt-4"
          >
            <Lock className="h-4 w-4" />
            <span>{isLoading ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}</span>
          </button>
        </form>

        {/* Security Footer */}
        <div className="mt-5 text-center text-[11px] text-slate-400">
          Chính sách bảo mật dữ liệu VietSec • Phân quyền nội bộ
        </div>
      </div>
    </div>
  );
}

