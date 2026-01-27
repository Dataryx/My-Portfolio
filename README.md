
# Portfolio — Run & Deploy

This repository contains a Vite + React portfolio application that uses Tailwind CSS (via PostCSS) and a small AI helper service. The README below explains how to run, build, and deploy the project, and how to troubleshoot common issues you may encounter while developing locally.

## Table of Contents
- Project overview
- Prerequisites
- Quick start (dev)
- Build & preview
- Environment variables
- Tailwind/PostCSS notes
- Troubleshooting
- Deployment
- Contributing
- License

## Project overview

This is a single-page portfolio built with React + Vite. Styling is handled with Tailwind CSS (compiled with PostCSS).

## Prerequisites
- Node.js 16+ (Node 18+ recommended)
- npm (bundled with Node) or yarn

## Quick start (development)

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

Open the URL printed by Vite (default: http://localhost or port 3000 if configured).

## Build & Preview (production-like)

```bash
npm run build
npm run preview
```

`npm run build` creates an optimized static bundle in `dist/`. `npm run preview` serves the production build locally so you can verify the output.

## Tailwind / PostCSS notes

This project uses Tailwind via PostCSS (not the CDN). Key files:

- `tailwind.config.cjs` — Tailwind configuration and `content` paths
- `postcss.config.cjs` — PostCSS config that loads `@tailwindcss/postcss` and `autoprefixer`
- `src/index.css` — Tailwind entry (`@tailwind base; @tailwind components; @tailwind utilities;`)

If you previously saw a warning about `cdn.tailwindcss.com` the fix is to remove the CDN script from `index.html` and ensure `src/index.css` is imported from your Vite entry (`index.tsx`). The repository already uses the local build pipeline.

If PostCSS complains about missing plugins, install them as dev-dependencies:

```bash
npm install -D postcss autoprefixer @tailwindcss/postcss tailwindcss
```

## Troubleshooting

- Blank page after starting dev server:
   - Confirm `index.html` contains `<script type="module" src="/index.tsx"></script>` so Vite loads the app bundle.
   - Remove any `<script type="importmap">` blocks that map `react`/`react-dom` to external CDNs — Vite resolves node_modules automatically.
   - Open the browser devtools console and paste any runtime errors here.

- PostCSS / Tailwind errors:
   - Ensure `postcss.config.cjs` references `@tailwindcss/postcss` (or uses the plugin name) and you have `autoprefixer` installed.

- Searching for text in the project (PowerShell):

```powershell
Select-String -Path .\\* -Pattern "I am a Data Engineer" -SimpleMatch -List -Recurse
```

## Deployment

This project can be deployed as static files produced by `npm run build`. Common hosting options:

- Vercel: connect the repo and set the build command to `npm run build` and output directory to `dist`.
- Netlify: configure the build command and publish directory similarly.
- Static S3/CloudFront or other static hosts: upload `dist/` contents.

## Contributing

Contributions are welcome. Open an issue or a pull request. Keep changes focused and include a short description of why the change is needed.

## License

If you want to include a license, add a `LICENSE` file. Otherwise, indicate the intended license here.

---

If you run into issues I can help diagnose logs or browser console errors — paste them here and I'll assist.

