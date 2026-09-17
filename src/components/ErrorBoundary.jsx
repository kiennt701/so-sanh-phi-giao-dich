import React from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetCache = () => {
    try {
      localStorage.removeItem('vietsec_custom_data');
      localStorage.removeItem('theme');
    } catch (e) {}
    window.location.href = window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-800 dark:text-slate-100">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Đã Xảy Ra Lỗi Hiển Thị
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Trình duyệt gặp sự cố khi hiển thị giao diện. Bạn có thể nhấn Tải lại trang hoặc khôi phục dữ liệu gốc.
            </p>

            {this.state.error && (
              <div className="mt-4 rounded-xl bg-slate-100 dark:bg-slate-800 p-3 text-left font-mono text-[11px] text-slate-600 dark:text-slate-300 overflow-x-auto max-h-32">
                <div className="font-bold text-red-600 dark:text-red-400">
                  {this.state.error.name}: {this.state.error.message}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Tải Lại Trang</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetCache}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-xs transition-all cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                <span>Khôi Phục Dữ Liệu Gốc</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
