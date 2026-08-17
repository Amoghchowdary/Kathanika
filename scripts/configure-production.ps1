param(
  [Parameter(Mandatory=$false)]
  [string]$ApiUrl,
  [Parameter(Mandatory=$false)]
  [string]$RepositoryName = "kathanika"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot

if ([string]::IsNullOrWhiteSpace($ApiUrl)) {
  $ApiUrl = Read-Host "Paste the deployed Google Apps Script Web App URL ending in /exec"
}

$ApiUrl = $ApiUrl.Trim()
if ($ApiUrl -notmatch '^https://script\.google\.com/macros/s/.+/exec$') {
  Write-Host ""
  Write-Host "Invalid Apps Script URL." -ForegroundColor Red
  Write-Host "Use the deployed Web App URL ending in /exec, not /dev."
  exit 1
}

$repo = $RepositoryName.Trim().Trim('/')
if ([string]::IsNullOrWhiteSpace($repo)) { $repo = "kathanika" }
$pagesBase = "/$repo/"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$rootEnv = "VITE_KATHANIKA_API_URL=$ApiUrl`nVITE_SITE_BASE=/`n"
$pagesEnv = "VITE_KATHANIKA_API_URL=$ApiUrl`nVITE_SITE_BASE=$pagesBase`n"

[System.IO.File]::WriteAllText((Join-Path $ProjectRoot ".env.production"), $rootEnv, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $ProjectRoot ".env.local"), $rootEnv, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $ProjectRoot ".env.github-pages"), $pagesEnv, $utf8NoBom)

Write-Host ""
Write-Host "Kathanika V30 environment configured." -ForegroundColor Green
Write-Host "Root/custom-domain base: /"
Write-Host "GitHub Pages base: $pagesBase"
Write-Host ""
Write-Host "Next commands:"
Write-Host "  npm install"
Write-Host "  npm run verify"
Write-Host "  npm run preflight:pages"
