param(
  [Parameter(Mandatory=$false)]
  [string]$ApiUrl = "https://script.google.com/macros/s/AKfycbzvaMEaiUNv0JvWslsraGHpf2Zc53IfYvj86vab5yU-Ve4VeQCItEGl63S6xgBSue_ZXw/exec"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ApiUrl = $ApiUrl.Trim()

if ($ApiUrl -notmatch '^https://script\.google\.com/macros/s/.+/exec$') {
  Write-Host ""
  Write-Host "Invalid Apps Script URL." -ForegroundColor Red
  Write-Host "Use the deployed Web App URL ending in /exec, not /dev."
  exit 1
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$envText = @"
VITE_KATHANIKA_API_URL=$ApiUrl
VITE_SITE_BASE=/

VITE_PUBLIC_SITE_URL=https://www.kathanika.in/

# Optional: paste the Search Console HTML-tag verification token here.
VITE_GOOGLE_SITE_VERIFICATION=
"@

[System.IO.File]::WriteAllText((Join-Path $ProjectRoot ".env.production"), $envText, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $ProjectRoot ".env.github-pages"), $envText, $utf8NoBom)

Write-Host ""
Write-Host "Kathanika V70 frontend environment configured." -ForegroundColor Green
Write-Host "Production and GitHub Pages base: /"
Write-Host "Custom domain: https://www.kathanika.in/"
Write-Host ""
Write-Host "Next commands:"
Write-Host "  npm install"
Write-Host "  npm run verify"
Write-Host "  npm run preflight:pages"
