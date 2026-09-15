# Post-audit QA progress

Status: chronological working evidence. The final status and remaining verification limits are in `implementation-report.md` and `traceability.json`. This is not a launch approval.
Date: 2026-09-15. Branch: `fix/post-audit-stabilisation`.

## Sources and scope

Current reconciled Notion PRD is captured in `reconciled-prd-source.md`.
Figma file `3GYRJPOy9eSF5JqUM0Y1hz`, section `45:1025`, supplies visual relationships, not scoring/content. See `correction-plan.md` for precedence decisions. Scoring and provider data are unchanged in the diff. No deployment, GitHub Pages, visibility, or permissions changes were made.

## Automated evidence

`npm test`: 13 passing tests, including classification boundaries, invalid answers/session restoration, all four graphic/title mappings, review and Retake lifecycle, localisation structure, provider records and original donation asset hashes.

`npm run build`: successful Vite production build. Development QA entrypoints are not production build inputs. The latest Chinese Score content addition also adds nonempty interpretation assertions; final rerun remains required.

## Browser evidence

Checks use the production components in a local development iframe with real CSS viewports, not scaled screenshots. Desktop handoff is tested separately. Metrics are DOM-derived and may briefly lag a language/viewport change by one animation frame; settled observations are used below.

- Home 360x740: initial gating disabled; one checkbox insufficient; both enabled; starts Q1. Home has no cue. Accuracy block begins near the first fold.
- Initial assessment: all 22 answers completed. Q22 retains explicit Complete Assessment as required by current PRD. Three Building statuses recorded at 59497, 59898, 60298ms, then Results at60707ms: 1210ms total.
- Review: Back from Results restores Q22 at95%, with previous selection visible. Previous reaches Q21; tapping the same selected answer advances. Editing Q22 then completing reruns Building at76879/77280/77680ms, Results78089ms:1210ms. Combined score changes100% to96%.
- Chinese Retake: starts Q1 at0%, zero selected radios, language retained. All22 questions traversed and answered anew. Building statuses247984/248386/248786ms, Results249196ms:1212ms. Neutral classification and0% score replace previous AuDHD/100% result. Unit tests additionally verify the40% classification boundary can change with one edited answer and preserve unrelated preferences.
- Four Results classifications rendered in both languages at430x932: matching graphic classification0/1/2/3 and approved title, all title sizes20px/500. Equal trait cards175x68. No horizontal overflow. All use one preserved ResultGraphic and ResultsShell; geometry verified by existing component test.
- Chinese Results320x640: equal side-by-side126x68 cards, no horizontal overflow. Chinese Score ring115x115; shared title20px/500 and cue when meaningful content overflows. Restored approved Chinese High and Lower interpretation strings render correctly. Moderate string still needs rendered verification.
- Support Me from Score and Back restores Score tab. Logo returns Home. Chinese Support, Terms, Accuracy, Professional, Explore, Together inspected at320px, with no reported horizontal overflow. Main titles20px/500.
- Professional Support: Assessment, Mental health, Urgent switch in place. City and country controls switch correctly. China urgent grouping exposes Mainland China/Hong Kong/Taipei. Provider destinations remain original data.
- Explore: seven sections rendered. Opening second closes first, one expanded button in English and Chinese. Scrolling hides the cue. Expanded Chinese content remains readable at320px.
- Building visual fixture: approved distinct organic centre SVG and brain render correctly, no flat base. Both approved animated wave instances compute animation-name `drift`; footer-only overflow does not create a cue.
- Desktop1280x900: only centred bilingual handoff, no mobile header controls or assessment. QR rendered from current origin. Copy reports bilingual success, but external clipboard read returned empty in this preview, so clipboard delivery is not yet independently verified. SVG viewport correction removes letterboxing and preserves exported paths. Screenshot confirms full-width bottom artwork after reload.

## Corrections caught during QA

1. Chinese Score interpretation array contained three empty strings despite PRD-approved translations. Restored all three exact translations; added nonempty-score-copy regression assertions.
2. Desktop footer SVG retained default aspect-ratio letterboxing inside the wide approved container. Set SVG viewport preservation to `none` for this shared footer artwork; path geometry unchanged. Centre profile artwork remains separate and unchanged.

## Outstanding at the earlier checkpoint

Finish all-screen/state Figma comparison, settled EN/ZH viewport matrix, moderate Chinese Score rendering, physical safe-area/reduced-motion verification where available, keyboard/accessibility checks, independent QR/copy verification, final cascade/dead-asset inspection and tests/build rerun. Complete per-requirement evidence in `traceability.json`; no unverified item is a completion claim. No public launch is authorised.

## Final pass additions

- Moderate Chinese Score rendered at50% with approved interpretation; all three bands now checked.
- Narrow English ten-screen matrix and Chinese320x640/430x932 plus English430x932 matrices show no horizontal overflow. Thirty observations are stored in `responsive-qa.json`; the narrow English matrix is recorded in the browser tool log. Metrics capture initial layout and may list deferred images before they load; screenshots and subsequent reads were used for artwork checks.
- Keyboard ArrowDown selects Agree and auto-advances; Previous restores Agree visibly selected.
- Final Home comparison replaced obsolete CSS circle fills with Figma-exported paths/colours, preserved HTML labels, and corrected consent checkbox borders/checked appearance. Checked gating and first-fold layout rechecked.
- Removed unused `different-minds.svg`; Git history retains it. Supplied BMC SVG/GIF are unchanged.
- Final15 tests, build and whitespace diff check pass. Secret-pattern scan found no credentials in changed source/assets/docs/tests.
- Remaining six verification blocks are explicit in the traceability checklist. No deployment or main-branch update occurred.
