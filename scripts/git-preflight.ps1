$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

Write-Host "Kathanika V30 - Git/Pages Preflight" -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw "Git is not installed or not on PATH." }
if (-not (Test-Path ".github/workflows/deploy-pages.yml")) { throw "GitHub Pages workflow is missing." }
if (-not (Test-Path ".env.github-pages")) { throw ".env.github-pages is missing." }

$envText = Get-Content ".env.github-pages" -Raw
$configuredBaseMatch = [regex]::Match($envText, '(?m)^VITE_SITE_BASE=(.+)$')
if (-not $configuredBaseMatch.Success) { throw "VITE_SITE_BASE is missing from .env.github-pages." }
$configuredBase = $configuredBaseMatch.Groups[1].Value.Trim()

$remoteUrl = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0 -and $remoteUrl) {
  $cleanRemote = $remoteUrl.Trim().TrimEnd('/')
  $repoLeaf = ($cleanRemote -split '[/\\:]')[-1]
  $repoName = [System.IO.Path]::GetFileNameWithoutExtension($repoLeaf)
  $expectedBase = "/$repoName/"
  if ($configuredBase -cne $expectedBase) {
    throw "GitHub Pages base case mismatch. Repository '$repoName' requires VITE_SITE_BASE=$expectedBase but .env.github-pages contains $configuredBase."
  }
}

if ($envText -match 'REPLACE_WITH_DEPLOYMENT_ID') { throw "Apps Script URL is still a placeholder." }

Write-Host "Running Pages preflight..." -ForegroundColor Yellow
npm run preflight:pages
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Git/Pages preflight passed." -ForegroundColor Green
Write-Host "You can now git add, commit, and push main."
