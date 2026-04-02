@echo off
cd /d "%~dp0"
set "PATH=d:\SCALOVA\node-v24.14.0-win-x64;%PATH%"
color 0A
echo.
echo ==============================================
echo    Uruchamianie strony internetowej SCALOVA
echo ==============================================
echo.

node -v >nul 2>&1
if errorlevel 1 goto missing_node

echo [OK] Node.js dziala (znaleziono). 
echo.

if not exist "node_modules\vite\" goto missing_modules

:start_server
echo [INFO] Uruchamiam lokalny serwer developerski...
echo [OK] Strona za moment otworzy sie automatycznie w Twojej przegladarce! (w adresie localhost)
echo.
call npm run dev -- --open
pause
exit /b

:missing_modules
echo [INFO] Brak wymaganych plików (np. pakietu vite).
echo Trwa pobieranie wymaganych plikow do uruchomienia strony...
echo Moze to chwile potrwac, prosze czekac...
call npm install
echo.
goto start_server

:missing_node
color 0C
echo [BLAD] Node.js nie jest zainstalowane na Twoim komputerze!
echo Aby uruchomic te strone, musisz najpierw pobrac i zainstalowac Node.js.
echo.
echo KROKI DO WYKONANIA:
echo 1. Wejdz na strone: https://nodejs.org/
echo 2. Pobierz wersje oznaczona jako "LTS" - Rekomendowana.
echo 3. Zainstaluj ten program na komputerze.
echo 4. Otworz powyzszy plik 'uruchom.bat' ponownie!
echo.
pause
exit /b
