# MindLens

A free, research-informed self-reflection tool for adults exploring ADHD, ASD and AuDHD traits. Available in English and Simplified Chinese. MindLens is not a diagnostic instrument.

**[Open MindLens](https://cyko-design.github.io/mindlens/)**

Use a mobile browser for the assessment. Desktop visitors receive a QR code and copy-link handoff.

<a href="https://buymeacoffee.com/cyuen"><img src="public/assets/bmc-button.svg" alt="Buy me a coffee" width="180"></a>

## Privacy

No account, personal details, analytics or result database. Assessment state stays in browser memory/sessionStorage. The complete assessment and results are free.

## Run locally

Node.js 22.12+ and npm are required.

```sh
npm ci
npm run dev
npm run build
```

`npm test` runs the existing tests. `npm run preview` serves the production build.

## Project structure

- `src/components`: reusable interface components.
- `src/locales`: approved English and Simplified Chinese content.
- `src/domain`: deterministic scoring and session lifecycle.
- `src/data`: professional-support data and configuration.
- `public/assets`: production SVGs, supplied donation assets and licensed fonts.

## Deployment

GitHub Actions builds `dist/` and deploys it to GitHub Pages on pushes to `main`. The workflow uses the Pages base path so application assets and the shared QR/copy destination resolve to MindLens correctly.

This repository is the continuing codebase. Keep changes scoped and preserve the approved assessment content and scoring.
