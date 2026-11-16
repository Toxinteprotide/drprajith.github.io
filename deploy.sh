#!/usr/bin/env bash
# One-click deploy for macOS/Linux. Run from this folder:  bash deploy.sh
set -e
USER_NAME="drprajith"
REPO="$USER_NAME.github.io"

[ -d .git ] || git init -b main >/dev/null
git add .
git commit -m "Publish personal website" >/dev/null 2>&1 || true

if command -v gh >/dev/null 2>&1; then
  gh auth status >/dev/null 2>&1 || gh auth login
  gh repo create "$USER_NAME/$REPO" --public --source . --remote origin --push 2>/dev/null || {
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://github.com/$USER_NAME/$REPO.git"
    git push -u origin main
  }
  gh api -X POST "repos/$USER_NAME/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 || true
  echo "Done. Live in 1-2 minutes at https://$REPO"
else
  echo "One manual step: create an EMPTY public repo named '$REPO' at https://github.com/new"
  read -r -p "Press Enter once it exists "
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/$USER_NAME/$REPO.git"
  git push -u origin main
  echo "Last step: Settings > Pages > Deploy from branch > main > / (root) > Save."
  echo "Live in 1-2 minutes at https://$REPO"
fi
