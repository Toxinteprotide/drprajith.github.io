# One-click deploy for Windows PowerShell. Run from this folder:  .\deploy.ps1
$user = "drprajith"
$repo = "$user.github.io"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Git is not installed. Get it from https://git-scm.com/download/win then run this again." -ForegroundColor Yellow; exit 1
}

if (-not (Test-Path .git)) { git init -b main | Out-Null }
git add .
git commit -m "Publish personal website" 2>$null | Out-Null

if (Get-Command gh -ErrorAction SilentlyContinue) {
  gh auth status 2>$null
  if ($LASTEXITCODE -ne 0) { gh auth login }
  gh repo create "$user/$repo" --public --source . --remote origin --push 2>$null
  if ($LASTEXITCODE -ne 0) { git remote remove origin 2>$null; git remote add origin "https://github.com/$user/$repo.git"; git push -u origin main }
  gh api -X POST "repos/$user/$repo/pages" -f "source[branch]=main" -f "source[path]=/" 2>$null | Out-Null
  Write-Host "Done. Live in 1-2 minutes at https://$repo" -ForegroundColor Green
} else {
  Write-Host "`nOne manual step: create an EMPTY public repo named '$repo' at https://github.com/new" -ForegroundColor Cyan
  Read-Host "Press Enter once it exists"
  git remote remove origin 2>$null
  git remote add origin "https://github.com/$user/$repo.git"
  git push -u origin main
  Write-Host "`nLast step: Settings > Pages > Deploy from branch > main > / (root) > Save." -ForegroundColor Cyan
  Write-Host "Live in 1-2 minutes at https://$repo" -ForegroundColor Green
}
