# Dr. Prajith Venkatasubramanian | Personal Website

## Quick start (3 steps)

1. Unzip, open the folder in a terminal.
2. Run **`.\deploy.ps1`** (Windows PowerShell) or **`bash deploy.sh`** (Mac/Linux). It commits, creates the `drprajith.github.io` repo, pushes, and turns on Pages. If you don't use the GitHub CLI (`gh`), it pauses once so you can create the empty repo at https://github.com/new, then finishes the push.
3. Open https://drprajith.github.io in 1-2 minutes.

Optional later: replace the placeholder email `prajith@example.com` (in `index.html` and `script.js`) and the `[Add ...]` placeholder blocks. Everything below is reference detail.

Static, responsive portfolio built with HTML5, CSS3 and vanilla JavaScript. No build step, no backend, no paid libraries. Designed for GitHub Pages at **https://drprajith.github.io**.

## Structure

```
drprajith.github.io/
├── index.html
├── style.css
├── script.js
├── favicon.svg
├── favicon.ico            (generated, optional fallback)
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── images/            (og-image.png, headshot, etc.)
    ├── icons/
    └── documents/         (CV PDF, posters)
```

## Before you publish: edit these

1. **Email**: replace `prajith@example.com` in `index.html` (contact section) and in `script.js` (`TO` constant). The source site only exposed a placeholder address.
2. **Placeholders**: career dates, conference presentations, awards, and testimonials are marked `[Add ...]` / "Placeholder". The source site did not contain this information, so nothing was invented. Fill in or delete those blocks.
3. **Skill percentages** in the Technical Skills section are indicative. Adjust them.
4. **Social image**: add a 1200x630 `assets/images/og-image.png` (a generated one may already be included).
5. **Headshot** (optional): add `assets/images/headshot.jpg` and place an `<img loading="lazy" ...>` in the hero.
6. **sameAs links** in the JSON-LD block: add LinkedIn, ORCID and Google Scholar URLs.
7. **CV**: drop a PDF in `assets/documents/` and link it from the hero.

## Deploy to GitHub Pages

A user site must live in a repository named exactly `drprajith.github.io` under the GitHub account `drprajith`.

1. Create a **public** repository named `drprajith.github.io` (no template files).
2. In this folder run:

```bash
git init
git add .
git commit -m "Initial commit: personal website"
git branch -M main
git remote add origin https://github.com/drprajith/drprajith.github.io.git
git push -u origin main
```

3. In the repository go to **Settings > Pages**. Under **Build and deployment** choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. Wait 1-2 minutes. The site will be live at https://drprajith.github.io.
5. Update later with:

```bash
git add . && git commit -m "Update content" && git push
```

## Submit to search engines

- Add the site in Google Search Console and submit `https://drprajith.github.io/sitemap.xml`.
- Verify the social preview with the LinkedIn Post Inspector and a Twitter/X card preview.

## Custom domain later (drprajith.com)

1. Buy the domain and, at your DNS provider, add four `A` records for the apex (`@`) pointing to GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   Add a `CNAME` record for `www` pointing to `drprajith.github.io`.
2. In **Settings > Pages > Custom domain** enter `drprajith.com` and save (this creates a `CNAME` file in the repo). Enable **Enforce HTTPS** once the certificate is issued.
3. Search and replace `https://drprajith.github.io` with `https://drprajith.com` in `index.html`, `robots.txt` and `sitemap.xml`.
4. Re-submit the sitemap in Search Console.

## Performance and accessibility notes

- No framework or Bootstrap payload. The layout uses CSS grid, so the only external request is Google Fonts (with `preconnect`).
- Semantic landmarks, skip link, visible focus states, ARIA labels on controls, and `prefers-reduced-motion` support.
- Light and dark themes (saved in `localStorage`, defaults to system preference).
- Contact form uses `mailto:` so no server is needed. For a hosted form, swap in Formspree or Netlify Forms.
- Run Lighthouse in Chrome DevTools after deploying to confirm scores.

## License

Content (c) Dr. Prajith Venkatasubramanian. Code may be reused with attribution.
