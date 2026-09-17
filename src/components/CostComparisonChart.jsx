<<<<<<< HEAD
import React, { useState } from 'react';
import { formatCurrency } from '../utils/calculator';
import { TrendingUp } from 'lucide-react';

export default function CostComparisonChart({ 
  rankedResults = [], 
  tradingVolume = 200_000_000, 
  marginLoan = 100_000_000,
  onSelectCompany 
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Take top 5 companies for the chart
  const chartData = rankedResults.slice(0, 5);

  if (!chartData.length) return null;

  // Find max cost for scaling the Y-axis
  const maxCost = Math.max(...chartData.map(c => c.totalMonthlyCost || 1), 100_000);
  // Round up max to nice step (supports up to 10,000 tỷ)
  const yAxisMax = maxCost >= 1_000_000_000_000
    ? Math.ceil(maxCost / 100_000_000_000) * 100_000_000_000
    : maxCost >= 1_000_000_000
    ? Math.ceil(maxCost / 500_000_000) * 500_000_000
    : Math.ceil(maxCost / 200_000) * 200_000 || 800_000;
  const gridSteps = [yAxisMax, yAxisMax * 0.75, yAxisMax * 0.5, yAxisMax * 0.25, 0];

  // SVG dimensions
  const chartHeight = 220;
  const chartWidth = 570; // viewBox width
  const barWidth = 44;
  const leftPadding = 75;
  const rightPadding = 20;
  const topPadding = 25;
  const bottomPadding = 45;
  const availableWidth = chartWidth - leftPadding - rightPadding;
  const availableHeight = chartHeight - topPadding - bottomPadding;

  // Calculate break-even % of trading volume
  const getBreakEvenRatio = (cost) => {
    if (!tradingVolume || tradingVolume <= 0) return '0.00%';
    return ((cost / tradingVolume) * 100).toFixed(3) + '%';
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-850 dark:to-slate-900/90 p-3.5 sm:p-4 shadow-sm">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">
              Biểu Đồ So Sánh Chi Phí Top 5 CTCK
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Trực quan hóa tỷ trọng Phí giao dịch và Lãi vay Margin thực tế
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-500 shadow-xs" />
            <span>Phí GD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500 shadow-xs" />
            <span>Lãi Margin</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-amber-500 inline-block border-b border-dashed border-amber-500" />
            <span className="text-amber-600 dark:text-amber-400">Điểm hòa vốn</span>
          </div>
        </div>
      </div>

      {/* SVG Stacked Bar Chart */}
      <div className="relative mt-3 w-full overflow-x-auto pb-1">
        <div className="min-w-[420px] sm:min-w-full">
          <svg 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-auto max-h-[260px] select-none"
          >
          <defs>
            {/* Gradients */}
            <linearGradient id="tradingFeeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="marginInterestGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="bscHighlightGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Grid lines & Y-axis labels */}
          {gridSteps.map((val, idx) => {
            const y = topPadding + (idx / (gridSteps.length - 1)) * availableHeight;
            return (
              <g key={idx} className="transition-all">
                <line
                  x1={leftPadding - 8}
                  y1={y}
                  x2={chartWidth - rightPadding}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray={idx === gridSteps.length - 1 ? '0' : '3 3'}
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="1"
                />
                <text
                  x={leftPadding - 12}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] font-semibold fill-slate-400 dark:fill-slate-400"
                >
                  {val === 0
                    ? '0 đ'
                    : val >= 1_000_000_000_000
                    ? `${(val / 1_000_000_000).toLocaleString('vi-VN')} tỷ`
                    : val >= 1_000_000_000
                    ? `${(val / 1_000_000_000).toFixed(1)} tỷ`
                    : val >= 1_000_000
                    ? `${(val / 1_000_000).toFixed(1)} tr`
                    : `${Math.round(val / 1_000)} k`}
                </text>
              </g>
            );
          })}

          {/* Horizontal Break-Even Reference Line */}
          {(() => {
            const top1Cost = chartData[0]?.totalMonthlyCost || 0;
            const refLineY = topPadding + availableHeight - (top1Cost / yAxisMax) * availableHeight;
            return (
              <g className="transition-all duration-300">
                <line
                  x1={leftPadding - 8}
                  y1={refLineY}
                  x2={chartWidth - rightPadding - 92}
                  y2={refLineY}
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  opacity="0.9"
                />
                <g transform={`translate(${chartWidth - rightPadding - 88}, ${refLineY - 9})`}>
                  <rect
                    x="0"
                    y="0"
                    width="88"
                    height="18"
                    rx="9"
                    fill="#064e3b"
                    stroke="#10b981"
                    strokeWidth="1"
                  />
                  <text
                    x="44"
                    y="12"
                    textAnchor="middle"
                    className="text-[9px] font-black fill-emerald-300"
                  >
                    Hòa vốn {getBreakEvenRatio(top1Cost)}
                  </text>
                </g>
              </g>
            );
          })()}

          {/* Bars */}
          {chartData.map((item, idx) => {
            const colSpacing = availableWidth / chartData.length;
            const x = leftPadding + idx * colSpacing + (colSpacing - barWidth) / 2;

            const fee = item.monthlyTradingFee || 0;
            const interest = item.monthlyMarginInterest || 0;
            const total = item.totalMonthlyCost || 1;

            const totalBarHeight = (total / yAxisMax) * availableHeight;
            const feeHeight = (fee / total) * totalBarHeight;
            const interestHeight = (interest / total) * totalBarHeight;

            const barY = topPadding + availableHeight - totalBarHeight;
            const feeY = barY + interestHeight;
            const interestY = barY;

            const isHovered = hoveredIndex === idx;
            const isBsc = item.companyId === 'bsc' || item.isRecommended;

            return (
              <g 
                key={item.companyId}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectCompany && onSelectCompany(item.companyId)}
                className="cursor-pointer transition-all duration-200 group"
              >
                {/* Background column hover highlight */}
                <rect
                  x={leftPadding + idx * colSpacing}
                  y={topPadding - 5}
                  width={colSpacing}
                  height={availableHeight + 10}
                  fill="currentColor"
                  className={`transition-colors ${
                    isHovered 
                      ? 'text-blue-500/10 dark:text-blue-400/10' 
                      : 'text-transparent'
                  }`}
                  rx="8"
                />

                {/* Stack 1: Trading Fee (bottom part) */}
                <rect
                  x={x}
                  y={feeY}
                  width={barWidth}
                  height={Math.max(feeHeight, 0)}
                  fill="url(#tradingFeeGrad)"
                  opacity={isHovered ? '1' : '0.9'}
                  rx={interestHeight <= 1 ? 5 : 0}
                  filter="url(#glow)"
                />

                {/* Stack 2: Margin Loan Interest (top part) */}
                {interestHeight > 0 && (
                  <rect
                    x={x}
                    y={interestY}
                    width={barWidth}
                    height={Math.max(interestHeight, 0)}
                    fill="url(#marginInterestGrad)"
                    opacity={isHovered ? '1' : '0.9'}
                    rx="5"
                    filter="url(#glow)"
                  />
                )}

                {/* Total Cost on top of Bar */}
                <text
                  x={x + barWidth / 2}
                  y={barY - 6}
                  textAnchor="middle"
                  className={`text-[10px] font-black transition-all ${
                    isHovered
                      ? 'fill-blue-600 dark:fill-blue-400 font-extrabold text-[11px]'
                      : 'fill-slate-700 dark:fill-slate-300'
                  }`}
                >
                  {total >= 1_000_000 
                    ? `${(total / 1_000_000).toFixed(2)} tr` 
                    : `${Math.round(total / 1_000)} k`}
                </text>

                {/* Company Label under Bar */}
                <text
                  x={x + barWidth / 2}
                  y={topPadding + availableHeight + 16}
                  textAnchor="middle"
                  className={`text-[11px] font-black transition-colors ${
                    isBsc 
                      ? 'fill-amber-500 dark:fill-amber-400' 
                      : isHovered 
                      ? 'fill-blue-600 dark:fill-blue-400' 
                      : 'fill-slate-800 dark:fill-slate-200'
                  }`}
                >
                  {item.companyName}
                </text>

                {/* Break-even point badge under Company */}
                <text
                  x={x + barWidth / 2}
                  y={topPadding + availableHeight + 28}
                  textAnchor="middle"
                  className="text-[9px] font-bold fill-emerald-600 dark:fill-emerald-400"
                >
                  +{getBreakEvenRatio(total)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Interactive Floating Tooltip on Hover */}
        {hoveredIndex !== null && chartData[hoveredIndex] && (
          <div 
            className="absolute top-2 right-2 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs z-10 animate-fade-in pointer-events-none min-w-[190px]"
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5">
              <span className="font-extrabold text-white text-xs">
                {chartData[hoveredIndex].companyName}
              </span>
              <span className="text-[10px] text-slate-400">
                Top {hoveredIndex + 1}
              </span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-xs bg-blue-500" />
                  Phí GD:
                </span>
                <span className="font-bold text-white">
                  {chartData[hoveredIndex].isZeroFeeApplied ? '0 đ (Zero-Fee)' : formatCurrency(chartData[hoveredIndex].monthlyTradingFee)}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-xs bg-emerald-500" />
                  Lãi Margin:
                </span>
                <span className="font-bold text-white">
                  {formatCurrency(chartData[hoveredIndex].monthlyMarginInterest)}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300 pt-1 border-t border-slate-800">
                <span className="font-bold text-slate-200">Tổng chi phí:</span>
                <span className="font-black text-emerald-400">
                  {formatCurrency(chartData[hoveredIndex].totalMonthlyCost)}/tháng
                </span>
              </div>

              <div className="flex justify-between items-center text-amber-300 pt-0.5">
                <span className="font-semibold text-[10px]">Cần lãi bù chi phí:</span>
                <span className="font-black text-[11px]">
                  ≥ +{getBreakEvenRatio(chartData[hoveredIndex].totalMonthlyCost)}
                </span>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Footer Benchmark Callout */}
      <div className="mt-2.5 flex items-center justify-between bg-blue-50/70 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl text-[11px] text-slate-600 dark:text-slate-300 border border-blue-100/80 dark:border-slate-700/60">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            Điểm hòa vốn bình quân: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">+{getBreakEvenRatio(chartData[0]?.totalMonthlyCost)}</strong> của giá trị lệnh.
          </span>
        </div>
        <span className="text-[10px] text-slate-400 hidden sm:inline">
          Nhấp cột để xem chi tiết
        </span>
      </div>
    </div>
  );
}
=======
import React, { useState } from 'react';
import { formatCurrency } from '../utils/calculator';
import { TrendingUp } from 'lucide-react';

export default function CostComparisonChart({ 
  rankedResults = [], 
  tradingVolume = 200_000_000, 
  marginLoan = 100_000_000,
  onSelectCompany 
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Take top 5 companies for the chart
  const chartData = rankedResults.slice(0, 5);

  if (!chartData.length) return null;

  // Find max cost for scaling the Y-axis
  const maxCost = Math.max(...chartData.map(c => c.totalMonthlyCost || 1), 100_000);
  // Round up max to nice step
  const yAxisMax = Math.ceil(maxCost / 200_000) * 200_000 || 800_000;
  const gridSteps = [yAxisMax, yAxisMax * 0.75, yAxisMax * 0.5, yAxisMax * 0.25, 0];

  // SVG dimensions
  const chartHeight = 220;
  const chartWidth = 560; // viewBox width
  const barWidth = 44;
  const leftPadding = 70;
  const rightPadding = 20;
  const topPadding = 25;
  const bottomPadding = 45;
  const availableWidth = chartWidth - leftPadding - rightPadding;
  const availableHeight = chartHeight - topPadding - bottomPadding;

  // Calculate break-even % of trading volume
  const getBreakEvenRatio = (cost) => {
    if (!tradingVolume || tradingVolume <= 0) return '0.00%';
    return ((cost / tradingVolume) * 100).toFixed(3) + '%';
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-850 dark:to-slate-900/90 p-3.5 sm:p-4 shadow-sm">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">
              Biểu Đồ So Sánh Chi Phí Top 5 CTCK
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Trực quan hóa tỷ trọng Phí giao dịch và Lãi vay Margin thực tế
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-500 shadow-xs" />
            <span>Phí GD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500 shadow-xs" />
            <span>Lãi Margin</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-amber-500 inline-block border-b border-dashed border-amber-500" />
            <span className="text-amber-600 dark:text-amber-400">Điểm hòa vốn</span>
          </div>
        </div>
      </div>

      {/* SVG Stacked Bar Chart */}
      <div className="relative mt-3 w-full overflow-x-auto pb-1">
        <div className="min-w-[420px] sm:min-w-full">
          <svg 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-auto max-h-[260px] select-none"
          >
          <defs>
            {/* Gradients */}
            <linearGradient id="tradingFeeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="marginInterestGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="bscHighlightGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Grid lines & Y-axis labels */}
          {gridSteps.map((val, idx) => {
            const y = topPadding + (idx / (gridSteps.length - 1)) * availableHeight;
            return (
              <g key={idx} className="transition-all">
                <line
                  x1={leftPadding - 8}
                  y1={y}
                  x2={chartWidth - rightPadding}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray={idx === gridSteps.length - 1 ? '0' : '3 3'}
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="1"
                />
                <text
                  x={leftPadding - 12}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] font-semibold fill-slate-400 dark:fill-slate-400"
                >
                  {val === 0 ? '0 đ' : val >= 1_000_000 ? `${(val / 1_000_000).toFixed(1)} tr` : `${Math.round(val / 1_000)} k`}
                </text>
              </g>
            );
          })}

          {/* Horizontal Break-Even Reference Line */}
          {(() => {
            const top1Cost = chartData[0]?.totalMonthlyCost || 0;
            const refLineY = topPadding + availableHeight - (top1Cost / yAxisMax) * availableHeight;
            return (
              <g className="transition-all duration-300">
                <line
                  x1={leftPadding - 8}
                  y1={refLineY}
                  x2={chartWidth - rightPadding - 92}
                  y2={refLineY}
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  opacity="0.9"
                />
                <g transform={`translate(${chartWidth - rightPadding - 88}, ${refLineY - 9})`}>
                  <rect
                    x="0"
                    y="0"
                    width="88"
                    height="18"
                    rx="9"
                    fill="#064e3b"
                    stroke="#10b981"
                    strokeWidth="1"
                  />
                  <text
                    x="44"
                    y="12"
                    textAnchor="middle"
                    className="text-[9px] font-black fill-emerald-300"
                  >
                    Hòa vốn {getBreakEvenRatio(top1Cost)}
                  </text>
                </g>
              </g>
            );
          })()}

          {/* Bars */}
          {chartData.map((item, idx) => {
            const colSpacing = availableWidth / chartData.length;
            const x = leftPadding + idx * colSpacing + (colSpacing - barWidth) / 2;

            const fee = item.monthlyTradingFee || 0;
            const interest = item.monthlyMarginInterest || 0;
            const total = item.totalMonthlyCost || 1;

            const totalBarHeight = (total / yAxisMax) * availableHeight;
            const feeHeight = (fee / total) * totalBarHeight;
            const interestHeight = (interest / total) * totalBarHeight;

            const barY = topPadding + availableHeight - totalBarHeight;
            const feeY = barY + interestHeight;
            const interestY = barY;

            const isHovered = hoveredIndex === idx;
            const isBsc = item.companyId === 'bsc' || item.isRecommended;

            return (
              <g 
                key={item.companyId}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectCompany && onSelectCompany(item.companyId)}
                className="cursor-pointer transition-all duration-200 group"
              >
                {/* Background column hover highlight */}
                <rect
                  x={leftPadding + idx * colSpacing}
                  y={topPadding - 5}
                  width={colSpacing}
                  height={availableHeight + 10}
                  fill="currentColor"
                  className={`transition-colors ${
                    isHovered 
                      ? 'text-blue-500/10 dark:text-blue-400/10' 
                      : 'text-transparent'
                  }`}
                  rx="8"
                />

                {/* Stack 1: Trading Fee (bottom part) */}
                <rect
                  x={x}
                  y={feeY}
                  width={barWidth}
                  height={Math.max(feeHeight, 0)}
                  fill="url(#tradingFeeGrad)"
                  opacity={isHovered ? '1' : '0.9'}
                  rx={interestHeight <= 1 ? 5 : 0}
                  filter="url(#glow)"
                />

                {/* Stack 2: Margin Loan Interest (top part) */}
                {interestHeight > 0 && (
                  <rect
                    x={x}
                    y={interestY}
                    width={barWidth}
                    height={Math.max(interestHeight, 0)}
                    fill="url(#marginInterestGrad)"
                    opacity={isHovered ? '1' : '0.9'}
                    rx="5"
                    filter="url(#glow)"
                  />
                )}

                {/* Total Cost on top of Bar */}
                <text
                  x={x + barWidth / 2}
                  y={barY - 6}
                  textAnchor="middle"
                  className={`text-[10px] font-black transition-all ${
                    isHovered
                      ? 'fill-blue-600 dark:fill-blue-400 font-extrabold text-[11px]'
                      : 'fill-slate-700 dark:fill-slate-300'
                  }`}
                >
                  {total >= 1_000_000 
                    ? `${(total / 1_000_000).toFixed(2)} tr` 
                    : `${Math.round(total / 1_000)} k`}
                </text>

                {/* Company Label under Bar */}
                <text
                  x={x + barWidth / 2}
                  y={topPadding + availableHeight + 16}
                  textAnchor="middle"
                  className={`text-[11px] font-black transition-colors ${
                    isBsc 
                      ? 'fill-amber-500 dark:fill-amber-400' 
                      : isHovered 
                      ? 'fill-blue-600 dark:fill-blue-400' 
                      : 'fill-slate-800 dark:fill-slate-200'
                  }`}
                >
                  {item.companyName}
                </text>

                {/* Break-even point badge under Company */}
                <text
                  x={x + barWidth / 2}
                  y={topPadding + availableHeight + 28}
                  textAnchor="middle"
                  className="text-[9px] font-bold fill-emerald-600 dark:fill-emerald-400"
                >
                  +{getBreakEvenRatio(total)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Interactive Floating Tooltip on Hover */}
        {hoveredIndex !== null && chartData[hoveredIndex] && (
          <div 
            className="absolute top-2 right-2 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs z-10 animate-fade-in pointer-events-none min-w-[190px]"
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5">
              <span className="font-extrabold text-white text-xs">
                {chartData[hoveredIndex].companyName}
              </span>
              <span className="text-[10px] text-slate-400">
                Top {hoveredIndex + 1}
              </span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-xs bg-blue-500" />
                  Phí GD:
                </span>
                <span className="font-bold text-white">
                  {chartData[hoveredIndex].isZeroFeeApplied ? '0 đ (Zero-Fee)' : formatCurrency(chartData[hoveredIndex].monthlyTradingFee)}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-xs bg-emerald-500" />
                  Lãi Margin:
                </span>
                <span className="font-bold text-white">
                  {formatCurrency(chartData[hoveredIndex].monthlyMarginInterest)}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300 pt-1 border-t border-slate-800">
                <span className="font-bold text-slate-200">Tổng chi phí:</span>
                <span className="font-black text-emerald-400">
                  {formatCurrency(chartData[hoveredIndex].totalMonthlyCost)}/tháng
                </span>
              </div>

              <div className="flex justify-between items-center text-amber-300 pt-0.5">
                <span className="font-semibold text-[10px]">Cần lãi bù chi phí:</span>
                <span className="font-black text-[11px]">
                  ≥ +{getBreakEvenRatio(chartData[hoveredIndex].totalMonthlyCost)}
                </span>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Footer Benchmark Callout */}
      <div className="mt-2.5 flex items-center justify-between bg-blue-50/70 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl text-[11px] text-slate-600 dark:text-slate-300 border border-blue-100/80 dark:border-slate-700/60">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            Điểm hòa vốn bình quân: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">+{getBreakEvenRatio(chartData[0]?.totalMonthlyCost)}</strong> của giá trị lệnh.
          </span>
        </div>
        <span className="text-[10px] text-slate-400 hidden sm:inline">
          Nhấp cột để xem chi tiết
        </span>
      </div>
    </div>
  );
}
>>>>>>> 849a418be89d51e24cfb514989e2cb7a96c63b3d
