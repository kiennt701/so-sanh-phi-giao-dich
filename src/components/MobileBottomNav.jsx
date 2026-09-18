import React from 'react';
import { 
  Home, 
  BarChart3, 
  Calculator, 
  Sparkles, 
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Moon,
  Sun,
  Database,
  Lock,
  MessageSquare,
  UserCheck,
  LogOut
} from 'lucide-react';

export default function MobileBottomNav({
  scrollToSection,
  isMenuOpen,
  setIsMenuOpen,
  darkMode,
  setDarkMode,
  onOpenFeedback,
  onOpenDataManager,
  currentUser,
  onLogoutAdmin,
  selectedForCompare = [],
  openCompareModal,
  unreadFeedbackCount = 0
}) {
  return (
    <>
      {/* 1. Backdrop overlay when Mobile Menu Drawer is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 2. Slide-up Mobile Drawer Menu */}
      <div 
        className={`fixed inset-x-0 bottom-16 z-40 max-h-[80vh] overflow-y-auto rounded-t-3xl border-t border-slate-200 bg-white p-5 shadow-2xl transition-all duration-300 ease-out dark:border-slate-800 dark:bg-slate-900 md:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Menu & Tiện Ích
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              VietSec Fee Comparator • 30 CTCK Việt Nam
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Menu Actions */}
        <div className="mt-4 space-y-2 text-sm">
          {/* Compare Modal Trigger if items selected */}
          {selectedForCompare.length >= 2 && (
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                openCompareModal();
              }}
              className="flex w-full items-center justify-between rounded-xl bg-blue-600 p-3 font-bold text-white shadow-md shadow-blue-500/25"
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="h-4 w-4" />
                <span>So Sánh Đối Đầu ({selectedForCompare.length}/3)</span>
              </div>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          )}

          {/* Data Manager (Admin) */}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              onOpenDataManager();
            }}
            className={`flex w-full items-center justify-between rounded-xl p-3 font-bold transition-all border ${
              currentUser
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {currentUser ? (
                <Database className="h-4 w-4 text-emerald-600" />
              ) : (
                <Lock className="h-4 w-4 text-amber-500" />
              )}
              <span>{currentUser ? 'Quản Trị Dữ Liệu 30 CTCK (Admin)' : 'Đăng Nhập Quản Trị Dữ Liệu'}</span>
            </div>
            {currentUser && (
              <div className="flex items-center gap-1.5">
                {unreadFeedbackCount > 0 && (
                  <span className="rounded-full bg-rose-500 text-white px-2 py-0.5 text-[10px] font-black animate-pulse">
                    {unreadFeedbackCount} ý kiến
                  </span>
                )}
                <span className="rounded-md bg-emerald-200/60 px-1.5 py-0.5 text-[10px] font-black text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200">
                  Đã Đăng Nhập
                </span>
              </div>
            )}
          </button>

          {/* Criteria Guide */}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              scrollToSection('faq-section');
            }}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
              <span>Tiêu Chí Lựa Chọn CTCK Phù Hợp</span>
            </div>
          </button>

          {/* User Feedback */}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              onOpenFeedback();
            }}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <span>Góp Ý & Báo Cáo Biểu Phí Mới</span>
            </div>
          </button>

          {/* Dark Mode Toggle in Menu */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200"
          >
            <div className="flex items-center gap-2.5">
              {darkMode ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
              <span>Giao Diện: {darkMode ? 'Chế Độ Tối (Dark)' : 'Chế Độ Sáng (Light)'}</span>
            </div>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
              {darkMode ? 'Bật Sáng' : 'Bật Tối'}
            </span>
          </button>

          {/* Admin Logout button if logged in */}
          {currentUser && (
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onLogoutAdmin();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-2.5 font-bold text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng Xuất Quyền Quản Trị</span>
            </button>
          )}
        </div>

        {/* BSC Fast Promotion Banner */}
        <div className="mt-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-3 text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-amber-300">
              ⭐ Đề Xuất Số 1: BSC BIDV
            </span>
            <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
              Ưu Đãi Đặc Biệt
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-200 leading-tight">
            Phí chỉ từ 0.08% • Margin chuẩn 10.5% • Trực thuộc Big4 BIDV.
          </p>
          <a
            href="https://dangky.bsc.com.vn/moi-gioi?online=false&cif=4768"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 py-2 text-xs font-black text-slate-950 shadow-sm"
          >
            <span>Mở Tài Khoản BSC Ngay</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* 3. Primary Sticky Bottom Navigation Bar */}
      <nav 
        aria-label="Thanh điều hướng nhanh trên di động"
        className="fixed bottom-0 inset-x-0 z-40 flex h-16 items-center justify-around border-t border-slate-200/90 bg-white/95 px-2 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 md:hidden safe-area-pb shadow-lg"
      >
        {/* Item 1: Home */}
        <button
          type="button"
          onClick={() => {
            setIsMenuOpen(false);
            scrollToSection('top');
          }}
          className="flex flex-1 flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-bold">Trang Chủ</span>
        </button>

        {/* Item 2: Compare Matrix */}
        <button
          type="button"
          onClick={() => {
            setIsMenuOpen(false);
            scrollToSection('comparison-table');
          }}
          className="relative flex flex-1 flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <BarChart3 className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-bold">So Sánh</span>
          {selectedForCompare.length > 0 && (
            <span className="absolute top-0 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white shadow-xs">
              {selectedForCompare.length}
            </span>
          )}
        </button>

        {/* Item 3: Center Highlighted Cost Calculator */}
        <button
          type="button"
          onClick={() => {
            setIsMenuOpen(false);
            scrollToSection('calculator-section');
          }}
          className="flex flex-1 flex-col items-center justify-center -mt-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-600/30">
            <Calculator className="h-5 w-5" />
          </div>
          <span className="mt-1 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400">
            Tính Phí
          </span>
        </button>

        {/* Item 4: AI Advisor */}
        <button
          type="button"
          onClick={() => {
            setIsMenuOpen(false);
            scrollToSection('ai-advisor-section');
          }}
          className="flex flex-1 flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <Sparkles className="h-5 w-5 text-amber-500" />
          <span className="mt-0.5 text-[10px] font-bold">Gợi Ý AI</span>
        </button>

        {/* Item 5: Menu Drawer Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex flex-1 flex-col items-center justify-center py-1 transition-colors ${
            isMenuOpen 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400'
          }`}
        >
          <Menu className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-bold">Menu</span>
        </button>
      </nav>
    </>
  );
}
