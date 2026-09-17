import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Edit3, 
  Settings, 
  Globe, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Filter,
  ArrowRight,
  Lock,
  UserCheck
} from 'lucide-react';
import scanReport from '../../scan-report.json';
import manualOverridesTemplate from '../data/manualOverrides.json';

export default function DataManagementModal({
  isOpen,
  onClose,
  companies,
  onApplyOverrides,
  onResetToDefault,
  currentUser,
  onOpenLoginModal,
  onLogoutAdmin
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('quick_edit'); // 'quick_edit' | 'json_mode' | 'scan_status'
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || 'bsc');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [scanFilter, setScanFilter] = useState('all'); // 'all' | 'accessible' | 'unscannable'

  // Switch to quick edit and select company
  const handleQuickEditFromScan = (companyId) => {
    handleSelectCompany(companyId);
    setActiveTab('quick_edit');
  };

  // Download comprehensive manual overrides template with 30 companies
  const handleDownloadOverridesTemplate = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(manualOverridesTemplate, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `vietsec-manualOverrides-30-brokers.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSuccessMsg('Đã tải xuống file mẫu hiệu chỉnh 30 CTCK (vietsec-manualOverrides-30-brokers.json)!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Find currently selected company
  const currentCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  // Quick edit form state
  const [editForm, setEditForm] = useState({
    onlineMin: currentCompany.tradingFee.onlineMin,
    onlineMax: currentCompany.tradingFee.onlineMax,
    zeroFeeOffer: currentCompany.tradingFee.zeroFeeOffer,
    marginBaseRate: currentCompany.margin.baseRate ?? currentCompany.margin.standardRate90d ?? 10.5,
    marginPromoRate: currentCompany.margin.promoRate ?? currentCompany.margin.shortTermRate ?? 7.5,
    maxLeverage: currentCompany.margin.maxLeverage,
    accountOpeningUrl: currentCompany.accountOpeningUrl
  });

  // When switching company in dropdown
  const handleSelectCompany = (id) => {
    setSelectedCompanyId(id);
    const target = companies.find(c => c.id === id);
    if (target) {
      setEditForm({
        onlineMin: target.tradingFee.onlineMin,
        onlineMax: target.tradingFee.onlineMax,
        zeroFeeOffer: target.tradingFee.zeroFeeOffer,
        marginBaseRate: target.margin.baseRate ?? target.margin.standardRate90d ?? 10.5,
        marginPromoRate: target.margin.promoRate ?? target.margin.shortTermRate ?? 7.5,
        maxLeverage: target.margin.maxLeverage,
        accountOpeningUrl: target.accountOpeningUrl
      });
    }
    setSuccessMsg('');
    setErrorMsg('');
  };

  // Synchronize editForm & rawJson whenever companies or selectedCompanyId updates
  useEffect(() => {
    const target = companies.find(c => c.id === selectedCompanyId) || companies[0];
    if (target) {
      setEditForm({
        onlineMin: target.tradingFee.onlineMin,
        onlineMax: target.tradingFee.onlineMax,
        zeroFeeOffer: target.tradingFee.zeroFeeOffer,
        marginBaseRate: target.margin.baseRate ?? target.margin.standardRate90d ?? 10.5,
        marginPromoRate: target.margin.promoRate ?? target.margin.shortTermRate ?? 7.5,
        maxLeverage: target.margin.maxLeverage,
        accountOpeningUrl: target.accountOpeningUrl
      });
    }
    setRawJson(JSON.stringify(companies, null, 2));
  }, [companies, selectedCompanyId]);

  // JSON editor state
  const [rawJson, setRawJson] = useState(() => JSON.stringify(companies, null, 2));

  // Handle Save Quick Edit
  const handleSaveQuickEdit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setErrorMsg('Bạn cần đăng nhập bằng tài khoản Quản trị viên để lưu thay đổi.');
      onOpenLoginModal();
      return;
    }
    try {
      const minFee = Number(editForm.onlineMin);
      const maxFee = Number(editForm.onlineMax);
      const zeroFee = Boolean(editForm.zeroFeeOffer);
      const baseRateNum = Number(editForm.marginBaseRate);
      const promoRateNum = Number(editForm.marginPromoRate);

      const feeSummary = zeroFee 
        ? '0.00% (Zero-Fee)' 
        : (minFee === maxFee ? `${minFee}%` : `${minFee}% - ${maxFee}%`);

      const updatedCompanies = companies.map(c => {
        if (c.id === selectedCompanyId) {
          return {
            ...c,
            tradingFee: {
              ...c.tradingFee,
              onlineMin: minFee,
              onlineMax: maxFee,
              zeroFeeOffer: zeroFee,
              displaySummary: feeSummary
            },
            margin: {
              ...c.margin,
              baseRate: baseRateNum,
              standardRate90d: baseRateNum,
              standardRateDisplay: `${baseRateNum}%/năm (Chuẩn 90 ngày)`,
              medianRate: baseRateNum,
              promoRate: promoRateNum,
              shortTermRate: promoRateNum,
              shortTermDisplay: promoRateNum > 0 ? `Từ ${promoRateNum}%/năm (Gói T+)` : c.margin.shortTermDisplay,
              maxLeverage: editForm.maxLeverage
            },
            accountOpeningUrl: editForm.accountOpeningUrl,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      });

      onApplyOverrides(updatedCompanies);
      setRawJson(JSON.stringify(updatedCompanies, null, 2));
      setSuccessMsg(`Đã cập nhật dữ liệu thành công cho ${currentCompany.shortName}!`);
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (err) {
      setErrorMsg('Lỗi khi lưu dữ liệu: ' + err.message);
    }
  };

  // Handle Save Raw JSON
  const handleSaveRawJson = () => {
    if (!currentUser) {
      setErrorMsg('Bạn cần đăng nhập bằng tài khoản Quản trị viên để áp dụng cấu hình JSON.');
      onOpenLoginModal();
      return;
    }
    try {
      const parsed = JSON.parse(rawJson);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Dữ liệu JSON phải là một mảng danh sách các CTCK hợp lệ.');
      }
      onApplyOverrides(parsed);
      setSuccessMsg('Đã cập nhật toàn bộ cơ sở dữ liệu từ file JSON!');
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (err) {
      setErrorMsg('Dữ liệu JSON không hợp lệ: ' + err.message);
    }
  };

  // Export JSON file to user's computer
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(companies, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `vietsec-securities-data-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Upload JSON file from user's computer (supports both full array and overrides format)
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!currentUser) {
      setErrorMsg('Bạn cần đăng nhập bằng tài khoản Quản trị viên để tải lên file cấu hình.');
      event.target.value = '';
      onOpenLoginModal();
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onApplyOverrides(parsed);
          setRawJson(JSON.stringify(parsed, null, 2));
          setSuccessMsg(`Đã tải lên và áp dụng thành công ${parsed.length} CTCK từ file ${file.name}!`);
        } else if (parsed && parsed.overrides) {
          const updated = companies.map(c => {
            const over = parsed.overrides[c.id];
            if (!over) return c;
            return {
              ...c,
              ...over,
              tradingFee: over.tradingFee ? { ...c.tradingFee, ...over.tradingFee } : c.tradingFee,
              margin: over.margin ? { ...c.margin, ...over.margin } : c.margin,
            };
          });
          onApplyOverrides(updated);
          setRawJson(JSON.stringify(updated, null, 2));
          setSuccessMsg(`Đã nạp và hợp nhất thành công file hiệu chỉnh ${file.name}!`);
        } else {
          throw new Error('Định dạng JSON không hợp lệ (cần là danh sách CTCK hoặc cấu trúc overrides).');
        }
        setTimeout(() => setSuccessMsg(''), 4000);
      } catch (err) {
        setErrorMsg('Lỗi đọc file: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Settings className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Quản Lý Dữ Liệu & Hiệu Chỉnh
                </h2>
                {currentUser ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    <ShieldCheck className="h-3 w-3" />
                    Admin: {currentUser.email}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    <Lock className="h-3 w-3" />
                    Chỉ Đọc (Yêu cầu Admin)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {currentUser 
                  ? 'Bạn có toàn quyền quản trị, hiệu chỉnh phí & nạp file cho 30 CTCK.'
                  : 'Chế độ xem công khai. Cần đăng nhập Quản trị viên để chỉnh sửa.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!currentUser ? (
              <button
                type="button"
                onClick={onOpenLoginModal}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 transition-colors shadow-xs"
              >
                <Lock className="h-3.5 w-3.5 text-blue-600" />
                <span>Đăng nhập Quản trị</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onLogoutAdmin}
                className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-colors"
                title="Đăng xuất quyền quản trị"
              >
                <span>Đăng xuất</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-bold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab selection */}
        <div className="mt-5 flex border-b border-slate-200 dark:border-slate-800 gap-4 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveTab('quick_edit')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'quick_edit'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Edit3 className="h-4 w-4" />
            <span>Hiệu chỉnh từng CTCK</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('json_mode');
              setRawJson(JSON.stringify(companies, null, 2));
            }}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'json_mode'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Tải File / JSON Thủ Công</span>
          </button>

          <button
            onClick={() => setActiveTab('scan_status')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'scan_status'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>Quét Web & Lịch Định Kỳ</span>
          </button>
        </div>

        {/* Content: Quick Edit Mode */}
        {activeTab === 'quick_edit' && (
          <form onSubmit={handleSaveQuickEdit} className="mt-5 space-y-4">
            {/* Permission warning banner if not admin */}
            {!currentUser && (
              <div className="rounded-2xl border border-amber-200/90 bg-amber-50/80 p-3.5 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200 flex items-center justify-between gap-3 flex-wrap shadow-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Lock className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>
                    Chế độ xem công khai (Chỉ đọc). Tính năng chỉnh sửa bị khóa và chỉ dành riêng cho tài khoản Quản trị viên được ủy quyền.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenLoginModal}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs transition-colors shrink-0"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Đăng nhập Quản trị</span>
                </button>
              </div>
            )}

            {/* Select company */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Chọn Công Ty Chứng Khoán để hiệu chỉnh:
              </label>
              <select
                value={selectedCompanyId}
                onChange={(e) => handleSelectCompany(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {companies.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.shortName} — {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Trading fee fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Phí GD Online Tối thiểu (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  disabled={!currentUser}
                  value={editForm.onlineMin}
                  onChange={(e) => setEditForm({ ...editForm, onlineMin: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Phí GD Online Tối đa (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  disabled={!currentUser}
                  value={editForm.onlineMax}
                  onChange={(e) => setEditForm({ ...editForm, onlineMax: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-slate-500"
                />
              </div>
            </div>

            {/* Zero fee checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="zeroFeeOffer"
                disabled={!currentUser}
                checked={editForm.zeroFeeOffer}
                onChange={(e) => setEditForm({ ...editForm, zeroFeeOffer: e.target.checked })}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <label htmlFor="zeroFeeOffer" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                Đang có chính sách / ưu đãi miễn phí giao dịch (Zero-Fee)
              </label>
            </div>

            {/* Margin fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Lãi Margin Chuẩn (%/năm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="25"
                  disabled={!currentUser}
                  value={editForm.marginBaseRate}
                  onChange={(e) => setEditForm({ ...editForm, marginBaseRate: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Lãi Margin Ưu đãi (%/năm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="25"
                  disabled={!currentUser}
                  value={editForm.marginPromoRate}
                  onChange={(e) => setEditForm({ ...editForm, marginPromoRate: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400 disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Đòn bẩy tối đa
                </label>
                <input
                  type="text"
                  disabled={!currentUser}
                  value={editForm.maxLeverage}
                  onChange={(e) => setEditForm({ ...editForm, maxLeverage: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-slate-500"
                />
              </div>
            </div>

            {/* URL field */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Đường dẫn mở tài khoản eKYC
              </label>
              <input
                type="url"
                disabled={!currentUser}
                value={editForm.accountOpeningUrl}
                onChange={(e) => setEditForm({ ...editForm, accountOpeningUrl: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-slate-500"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={currentUser ? onResetToDefault : onOpenLoginModal}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Khôi phục dữ liệu gốc</span>
              </button>

              <button
                type={currentUser ? "submit" : "button"}
                onClick={!currentUser ? onOpenLoginModal : undefined}
                className={`inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-md transition-colors ${
                  currentUser 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-slate-800 hover:bg-slate-900'
                }`}
              >
                {currentUser ? <Save className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                <span>{currentUser ? 'Lưu & Áp Dụng Thay Đổi' : 'Đăng nhập Quản trị để lưu'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Content: JSON Mode */}
        {activeTab === 'json_mode' && (
          <div className="mt-5 space-y-4">
            {/* Permission warning banner if not admin */}
            {!currentUser && (
              <div className="rounded-2xl border border-amber-200/90 bg-amber-50/80 p-3.5 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200 flex items-center justify-between gap-3 flex-wrap shadow-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Lock className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>
                    Chế độ xem công khai (Chỉ đọc). Để tải lên file JSON ghi đè hệ thống, vui lòng đăng nhập tài khoản Quản trị viên.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenLoginModal}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs transition-colors shrink-0"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Đăng nhập Quản trị</span>
                </button>
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Dán cấu hình JSON toàn bộ 30 CTCK tại đây hoặc tải file mẫu hiệu chỉnh thủ công (<code>manualOverrides.json</code>) về máy tính để chỉnh sửa phí, lãi vay và link nguồn offline.
              </p>
            </div>

            <textarea
              rows={11}
              value={rawJson}
              disabled={!currentUser}
              onChange={(e) => setRawJson(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 font-mono text-xs leading-relaxed dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 disabled:bg-slate-100 dark:disabled:bg-slate-900/80 disabled:cursor-not-allowed disabled:text-slate-500"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadOverridesTemplate}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-300 bg-indigo-50/80 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 transition-colors shadow-xs"
                  title="Tải file mẫu hiệu chỉnh 30 CTCK có ghi chú link nguồn và lý do WAF"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Tải Mẫu 30 CTCK (manualOverrides.json)</span>
                </button>

                {currentUser ? (
                  <label className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300 bg-blue-50/80 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300 cursor-pointer transition-colors shadow-xs">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Tải lên file JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenLoginModal}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 transition-colors shadow-xs"
                    title="Yêu cầu đăng nhập Quản trị viên để tải lên file JSON"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>Tải lên file JSON (Cần Admin)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Xuất file hiện hành</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={currentUser ? onResetToDefault : onOpenLoginModal}
                  className="rounded-lg px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 font-semibold"
                >
                  Khôi phục gốc
                </button>

                <button
                  type="button"
                  onClick={currentUser ? handleSaveRawJson : onOpenLoginModal}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm ${
                    currentUser 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-slate-800 hover:bg-slate-900'
                  }`}
                >
                  {currentUser ? <Save className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                  <span>{currentUser ? 'Áp Dụng JSON' : 'Đăng nhập Quản trị'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content: Web Scanner & Schedules Tab */}
        {activeTab === 'scan_status' && (
          <div className="mt-5 space-y-4">
            {/* Summary banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-blue-200/80 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
                <div className="flex items-center gap-2 text-xs font-extrabold text-blue-900 dark:text-blue-200">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Lịch Quét Tự Động Định Kỳ</span>
                </div>
                <p className="text-xs text-blue-800/90 dark:text-blue-300 mt-1.5 leading-relaxed">
                  Tự động kích hoạt lúc <strong>08:00 AM (giờ VN) thứ Hai hàng tuần</strong> (Cron <code>0 1 * * 1</code>) qua GitHub Actions để tự động quét kiểm tra sự thay đổi của 30 trang web biểu phí CTCK.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-900 dark:text-emerald-200">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Báo Cáo Quét Dữ Liệu 30 CTCK</span>
                </div>
                <p className="text-xs text-emerald-800/90 dark:text-emerald-300 mt-1.5 leading-relaxed">
                  Thành công: <strong>{scanReport?.summary?.accessible || 26}/{scanReport?.summary?.total || 30} CTCK</strong> ({Math.round(((scanReport?.summary?.accessible || 26) / (scanReport?.summary?.total || 30)) * 100)}%).
                  <br />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Thời gian: {scanReport?.summary?.timestamp ? new Date(scanReport.summary.timestamp).toLocaleString('vi-VN') : '17/09/2026'} • <strong>{scanReport?.summary?.unscannable || 4} CTCK</strong> cần đối chiếu thủ công.
                  </span>
                </p>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Lọc kết quả quét:</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setScanFilter('all')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
                    scanFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  Tất cả ({(scanReport?.brokers || []).length || 30})
                </button>
                <button
                  type="button"
                  onClick={() => setScanFilter('accessible')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
                    scanFilter === 'accessible'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300'
                  }`}
                >
                  Truy cập tốt ({scanReport?.summary?.accessible || 26})
                </button>
                <button
                  type="button"
                  onClick={() => setScanFilter('unscannable')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
                    scanFilter === 'unscannable'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  Cần đối chiếu thủ công ({scanReport?.summary?.unscannable || 4})
                </button>
              </div>
            </div>

            {/* List of scanned brokers */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Danh Sách 30 CTCK & Trạng Thái Truy Cập Live</span>
                <span className="text-[11px] text-slate-500 font-normal">Native Fetch Crawler</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto text-xs">
                {(scanReport?.brokers || [])
                  .filter((b) => {
                    if (scanFilter === 'accessible') return b.isAccessible;
                    if (scanFilter === 'unscannable') return !b.isAccessible;
                    return true;
                  })
                  .map((broker) => (
                    <div 
                      key={broker.id} 
                      className={`p-3.5 transition-colors ${
                        broker.isAccessible 
                          ? 'hover:bg-slate-50 dark:hover:bg-slate-800' 
                          : 'bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-50/70 dark:hover:bg-amber-950/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {broker.shortName || broker.name}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              {broker.name}
                            </span>
                            {broker.stockCode && (
                              <span className="rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.2 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                                {broker.stockCode}
                              </span>
                            )}
                            {broker.isAccessible ? (
                              <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.2 text-[10px] font-bold">
                                HTTP 200 OK
                              </span>
                            ) : (
                              <span className="rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.2 text-[10px] font-bold flex items-center gap-1">
                                <AlertTriangle className="h-2.5 w-2.5" />
                                {broker.httpStatus} • Cần đối chiếu
                              </span>
                            )}
                          </div>

                          {/* Link to source */}
                          <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                            <a 
                              href={broker.officialSource || broker.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                              title="Mở link nguồn chính thức của CTCK"
                            >
                              <span className="truncate max-w-xs sm:max-w-md">{broker.officialSource || broker.url}</span>
                              <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                            </a>
                          </div>

                          {/* Unscannable note if blocked */}
                          {!broker.isAccessible && broker.unscannableReason && (
                            <div className="mt-2 rounded-lg bg-amber-100/70 dark:bg-amber-900/40 p-2 text-[11px] text-amber-900 dark:text-amber-200 border border-amber-200/60 dark:border-amber-800/60 leading-relaxed">
                              <strong>Lý do không quét tự động được:</strong> {broker.unscannableReason}
                              {broker.manualCheckInstruction && (
                                <div className="mt-0.5 text-[10px] text-amber-800 dark:text-amber-300 font-semibold">
                                  👉 {broker.manualCheckInstruction}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Signals & Actions */}
                        <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                          <div className="flex items-center gap-1">
                            {broker.signals?.hasZeroFeeMention && (
                              <span className="rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-1.5 py-0.5 text-[9px] font-bold">
                                Zero-Fee
                              </span>
                            )}
                            {broker.signals?.hasMarginMention && (
                              <span className="rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 px-1.5 py-0.5 text-[9px] font-bold">
                                Margin
                              </span>
                            )}
                            {broker.contentLength > 0 && (
                              <span className="text-[10px] text-slate-400">
                                {Math.round(broker.contentLength / 1024)} KB
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (!currentUser) {
                                onOpenLoginModal();
                              } else {
                                handleQuickEditFromScan(broker.id);
                              }
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                            title={currentUser ? "Hiệu chỉnh CTCK này" : "Đăng nhập Quản trị viên để hiệu chỉnh"}
                          >
                            <span>Hiệu chỉnh</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Instruction tip */}
            <div className="rounded-xl bg-slate-100 dark:bg-slate-800/70 p-3 text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Chạy quét tức thì từ dòng lệnh: <code>node scripts/scan-securities.mjs</code></span>
              </div>
              <button
                type="button"
                onClick={handleDownloadOverridesTemplate}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Tải file kiểm định 30 CTCK</span>
                <Download className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
