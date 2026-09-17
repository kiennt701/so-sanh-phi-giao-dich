@echo off
title VietSec Fee Comparator - Production Server
echo ====================================================
echo   KHOI CHAY VIETSEC FEE COMPARATOR (PRODUCTION)
echo ====================================================
echo.
if not exist "dist" (
  echo Dang build ban production lan dau tien...
  call npm run build
)
echo Dang khoi dong may chu Golive tren cong 4173...
node server.mjs
pause
