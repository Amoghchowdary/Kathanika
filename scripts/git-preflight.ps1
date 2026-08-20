$ErrorActionPreference = "Stop"
Write-Host "Kathanika V51 - Custom Domain Git/Pages Preflight" -ForegroundColor Cyan
npm run preflight:pages
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "`nGit/Pages preflight passed." -ForegroundColor Green
Write-Host "Safe to stage, commit and push main after reviewing git status." -ForegroundColor Green
