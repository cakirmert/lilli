# Lilli Schröder · Portfolio

<a href="https://lillischroeder.com/">
  <img src="public/illustrations/logo-name.webp" alt="Lilli Schröder" width="480" />
</a>

**[Visit the portfolio ↗](https://lillischroeder.com/)** · [Contributing](CONTRIBUTING.md)

[![Deploy to GitHub Pages](https://github.com/cakirmert/lilli/actions/workflows/deploy.yml/badge.svg)](https://github.com/cakirmert/lilli/actions/workflows/deploy.yml)

A portfolio for Hamburg-based graphic designer and illustrator Lilli Schröder. The site brings together selected design projects, layered illustration galleries, an introduction, and contact details.

Built with **Next.js**, **React**, **TypeScript**, and **GSAP**. It exports to static HTML, CSS, and JavaScript and deploys to GitHub Pages.

## Getting started

Use Node.js 24 or newer and npm. Run all commands from the repository root.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No environment variables or external services are required for local development.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run typecheck` | Check TypeScript without emitting files. |
| `npm run build` | Generate the production site in `out/`. |
| `npm run generate:projects` | Rebuild project data from the project folders. |

The production output is a static site; serve `out/` with a static web host. `next start` does not serve this export.

## Repository structure

```text
.
├── .github/workflows/     # Pull request checks and GitHub Pages deployment
├── public/
│   ├── illustrations/    # Illustration gallery artwork and branding
│   └── projects/         # Archived project images and project.json metadata
├── scripts/              # Project data generator
├── src/
│   ├── app/              # Main page, legal pages, global styles, and metadata
│   ├── components/       # Navigation and portfolio sections
│   ├── data/             # Illustration gallery layout and archived project data
│   └── lib/              # Shared asset path helper
├── CONTRIBUTING.md       # Editing and verification guide
├── next.config.ts        # Static export and deployment path configuration
└── package.json          # Dependencies and project commands
```

## Editing content

- **Page sections:** edit the corresponding file in `src/components/`.
- **Live portfolio gallery:** edit `src/data/illustrations.ts` and artwork under `public/illustrations/`. The data file defines layer positions, image dimensions, and crops.
- **Archived project catalog:** edit images and `project.json` files under `public/projects/`, then run `npm run generate:projects`. Commit the updated `src/data/projects.ts` with the source assets. This catalog is retained for future use and is not currently rendered by the site.
- **Site title and description:** edit `src/app/layout.tsx`.
- **Global styling:** edit `src/app/globals.css`.
- **Legal pages:** edit `src/app/impressum/page.tsx` and `src/app/datenschutz/page.tsx`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the project metadata format and checks to run before submitting changes.

## Deployment

The [deployment workflow](.github/workflows/deploy.yml) builds and publishes the site when changes reach `main`, or when started manually. In the repository's **Settings → Pages**, select **GitHub Actions** as the publishing source.

The workflow obtains the base path from GitHub Pages automatically. For a manual production build, `NEXT_PUBLIC_BASE_PATH` controls the URL prefix. The default is `/lilli`; set it to an empty string for a domain root, or to a path such as `/portfolio` for a subdirectory. This value is applied at build time, so rebuild after changing it.

For example, in PowerShell, to build for a domain root:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = ''
npm run build
```

In a POSIX shell:

```sh
NEXT_PUBLIC_BASE_PATH='' npm run build
```

Pull requests run TypeScript checks and a production build through the [checks workflow](.github/workflows/ci.yml).

## Artwork and reuse

This repository contains portfolio artwork, photography, and branding. Public availability does not grant permission to reuse those materials. No open-source license is currently included; obtain permission from the relevant rights holder before reuse.
