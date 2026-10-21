```bat
@echo off
title SPI Documentation Folder Setup
color 0B

echo ==========================================
echo   SPI DOCUMENTATION FOLDER SETUP
echo ==========================================
echo.

REM Membuat folder Learning Experience
mkdir "01_Learning_Experience\Classroom_Process" 2>nul
mkdir "01_Learning_Experience\Student_Group_Photos" 2>nul

REM Membuat folder Competitions and Achievements
mkdir "02_Competitions_Achievements\Competition_Process" 2>nul
mkdir "02_Competitions_Achievements\Winners_Awards" 2>nul

REM Membuat folder School Partnerships
mkdir "03_School_Partnerships\SPI_InSchool" 2>nul
mkdir "03_School_Partnerships\ASA_School_Partners" 2>nul

REM Membuat folder Innovation and Projects
mkdir "04_Innovation_Projects\Student_Projects" 2>nul
mkdir "04_Innovation_Projects\Innovation_Festival" 2>nul

REM Membuat folder Events and Community
mkdir "05_Events_Community\Community_Fellowship" 2>nul
mkdir "05_Events_Community\Mall_Exhibitions" 2>nul
mkdir "05_Events_Community\Other_Events" 2>nul

REM Membuat folder Webinars and Online
mkdir "06_Webinars_Online\Webinars" 2>nul
mkdir "06_Webinars_Online\Online_Classes" 2>nul

REM Membuat folder Unsorted
mkdir "99_Unsorted\Belum_Diklasifikasikan" 2>nul

echo.
echo ==========================================
echo   SEMUA FOLDER BERHASIL DIBUAT!
echo ==========================================
echo.
pause
```