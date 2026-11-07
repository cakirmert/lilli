# Contributing

Keep changes focused and describe their visible effect. For layout or animation changes, include screenshots or a short recording in the pull request.

## Local workflow

1. Install the locked dependencies with `npm ci`.
2. Start the site with `npm run dev`.
3. Make your changes and check the affected sections at desktop and mobile widths.
4. Run `npm run typecheck` and `npm run build` before opening a pull request.

For visual changes, also check keyboard navigation, project interactions, and links to the legal pages. Keep local settings, credentials, dependencies, and build output out of commits.

## Updating the live gallery

The visible portfolio uses `src/data/illustrations.ts`, with artwork in `public/illustrations/`. Each entry includes its gallery position and image layers. Preserve the layer geometry when replacing artwork, and check the result at desktop and mobile widths.

## Adding to the archived project catalog

The separate catalog in `src/data/projects.ts` is retained for future use; the current site does not render it. To update this catalog:

Create a folder under `public/projects/` using a lowercase, hyphenated slug, for example `new-project`. Add a `project.json` file:

```json
{
  "title": "Project title",
  "category": "Design",
  "description": "A short description of the project."
}
```

The supported categories are `Design` and `Illustration`. Add `.jpg`, `.jpeg`, `.png`, or `.webp` images alongside the metadata. Image filenames determine their alphabetical display order; use prefixes such as `01-cover.jpg` and `02-detail.jpg`.

Run:

```sh
npm run generate:projects
```

The generator reads project folders alphabetically and rewrites `src/data/projects.ts`. Commit that file together with your metadata and images. Edit the source metadata rather than the generated data file.

## Static hosting

Keep changes compatible with the static export configured in `next.config.ts`. Use the shared `asset()` helper in `src/lib/basePath.ts` for public asset URLs that must work under the GitHub Pages prefix. Check both development and a production build when changing paths.

## Artwork

Only add images and other materials that you have permission to publish. Include any required attribution with the relevant project content.
