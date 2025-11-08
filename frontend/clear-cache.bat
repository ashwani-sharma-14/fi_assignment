@echo off
echo Clearing Next.js cache...
if exist .next rmdir /s /q .next
echo Cache cleared!
echo You can now run: npm run dev

