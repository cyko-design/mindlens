# MindLens

Mobile-only, bilingual English/Simplified Chinese research-informed self-reflection MVP. It is not a diagnostic instrument. Desktop renders only a bilingual QR/copy-link handoff.

## Run

Requires Node.js 22.12+ (Node 24 supported) and npm.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

`npm run build` creates static production files in `dist/`. Deploy that directory to a static host. All navigation uses hash routes, so no server-side route rewrite is needed. The QR and Copy link use the current origin automatically. No server environment variables, API key or database are required.

## Continuing development

This repository is the continuing code source of truth. Modify the existing shared components and central data rather than regenerating screens. Keep `main` buildable; use a feature branch for substantial changes and run tests/build before merging.

- `src/components/shared.jsx`: shared production UI and artwork.
- `src/styles.css`: design tokens and responsive styles.
- `src/locales/en.json`, `zh-CN.json`: central content.
- `src/domain/scoring.js`: deterministic scoring and provisional thresholds.
- `src/domain/session.js`: validation/reset behaviour.
- `src/data`: exact approved provider links and geography.
- `public/assets`: immutable supplied BMC SVG and purple GIF.
- `docs/architecture.md`: application boundaries and decisions.
- `docs/TODO.md`: genuine remaining content and launch items.
- `docs/validation.md`: verification evidence and limitations.

## Privacy and safety

Responses and view state use memory/sessionStorage only. No localStorage, accounts, result database, analytics, telemetry or AI scoring. A refresh retains the active session where browser storage is available. Browser restore behaviour varies; no cryptographic-deletion promise is made. Scores are recalculated from validated answers; invalid sessions offer a restart. Retake clears assessment state and consent while retaining the session language.

External provider and donation links open a separate context with `noopener noreferrer`. They receive no assessment answers or result parameters. QR generation runs locally, without a third-party QR service.

The original high-resolution screen references are not served as UI. The application uses semantic HTML, native form controls and reusable SVG/CSS elements. Supplied immutable assets have SHA-256 integrity tests.

## Hosting

The optional `.openai/hosting.json` associates a private Sites deployment. GitHub remains the application code source of truth; Sites receives a deployment copy of the same application. Preserve both repository identity and deployment project identity in later edits.

## Future GitHub Pages launch

The intended eventual production host is GitHub Pages. Do not enable Pages or make the repository public until the owner confirms the bugs are resolved and explicitly authorises public release. The current Sites deployment remains a private review environment. Before that move, configure and verify Vite's base path and asset/canonical links for the chosen Pages URL.
