@echo off
echo ========================================
echo   DineNow - Deployment Preparation
echo ========================================
echo.

echo Step 1: Checking Git status...
git status
echo.

echo Step 2: Adding all changes...
git add .
echo.

echo Step 3: Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Prepare for deployment

git commit -m "%commit_msg%"
echo.

echo Step 4: Pushing to GitHub...
git push origin main
echo.

echo ========================================
echo   ✅ Code pushed to GitHub!
echo ========================================
echo.
echo Next Steps:
echo 1. Deploy Backend on Render: https://render.com
echo 2. Deploy Frontend on Vercel: https://vercel.com
echo 3. Follow QUICK_DEPLOY.md for detailed steps
echo.
echo ========================================
pause
