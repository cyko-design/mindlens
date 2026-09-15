# MindLens post-audit correction report

2026-09-15. Correction branch: `fix/post-audit-stabilisation`.

Implementation is ready for review, with six verification limits below. This report is not production-launch approval. The deployed site and `main` have not been updated.

## Shared architecture and CSS

Consolidated recurring colours, gutters, spacing, card/control treatments and backgrounds. Equivalent mobile titles use one PageTitle rule:20px/500. Header, safe-area treatment, Back navigation, Page shell, tabs, buttons, information pages and footer remain shared. Results now uses one ResultsShell for both tabs and an isolated TraitCard component.

Removed the accumulated Results-only selector chain, root-token mutation through `:root:has(.results-your)`, competing tab/title/background definitions, generic Card mutations made solely for Results, percentage CTA widths and compensating minimum-width patches. Removed the assurance heading min-height at its source. No `!important` layer was added. No framework migration or new runtime dependency was introduced.

## Assessment lifecycle

Back to the questionnaire now means review: preserve answers/position, invalidate completed/derived presentation, show progress for the active question, and permit an already-selected answer to advance. Edited completion runs Building and recalculates from the full current answer set.

Retake clears all22 answers, position, completion, Building timestamp and result/accordion view state. Scores remain purely derived, never stored as a second result authority. Language, consent/eligibility and unrelated support preferences remain intact. Retake and Back are deliberately different reducer actions.

Scoring formulas, thresholds, answer values, question order and provider datasets are unchanged. The current PRD retains explicit Complete Assessment onQ22; auto-advance applies toQ1–Q21.

## Screen corrections

- Home: compact assurance structure/current copy, Figma-exported circle colours/geometry, unclipped icons, styled semantic consent controls with36px minimum rows, retained gating and no arrow.
- Questionnaire:20px/500 shared title, reassurance line-height1, selected-state persistence, auto-advance/Previous/Next and review flow.
- Building: exact distinct organic centre wave and brain exports; subtle transform-only motion, three statuses over approximately1.2seconds, automatic Results.
- Results: shared title/tabs/background/gutters/actions across both tabs; unchanged approved ResultGraphic; side-by-side balanced trait cards; intrinsic CTAs; compact115–125px donut.
- Explore: seven shared accordion rows with single-open behaviour, original personalised copy.
- Synthesis/support/information screens: shared typography, background, cards, gutters and runtime overflow cue. Provider selection/geography/URLs preserved.
- Support Me: original BMC SVG and GIF preserved, non-destructive GIF container crop, official existing GitHub mark retained.
- Footer/desktop: exact exported wave/script artwork reused. Desktop SVG viewport fills the approved wide composition. No desktop assessment or mobile utility header appears.

The obsolete replacement slogan asset was removed; it is recoverable in Git history. No supplied immutable asset was deleted or modified.

## English/Simplified Chinese

Reviewed locale structures and current PRD copy across questions, answers, reassurance, four results, three Score bands, seven trait areas, personalised synthesis, support and legal/information content. Updated Chinese Home headings and restored three missing Chinese Score interpretations verbatim from the PRD. Added assertions against empty interpretation strings.

PRD-prescribed brand names/acronyms, the English clinical term in approved Chinese legal copy and immutable artwork text are intentional exceptions, not fallback translations. No legal copy was rewritten.

## QA results

| Check                                        | Result                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| Automated tests                              | 15 passed,0 failed                                                               |
| Production build                             | Passed                                                                           |
| `git diff --check`                           | Passed                                                                           |
| Initial22-question journey                   | Passed in browser                                                                |
| Review/same-answer/changed-answer/Previous   | Passed; edited score100%→96%                                                     |
| Classification change from one edited answer | Passed threshold-boundary unit test                                              |
| Chinese full Retake                          | Passed; old AuDHD100% replaced by fresh neutral0%                                |
| Building duration                            | Initial1210ms, review1210ms, Retake1212ms                                        |
| Four graphic/title classifications           | Passed in EN/ZH                                                                  |
| Three Chinese Score interpretations          | Rendered and checked                                                             |
| Narrow/larger mobile matrices                | 320x640 and430x932; no horizontal overflow observed                              |
| Additional viewport checks                   | 360x740,390px and alternate heights                                              |
| Arrow                                        | Meaningful overflow, Home exemption, footer-only exclusion and scrolling checked |
| Keyboard answer selection                    | ArrowDown/auto-advance/Previous restoration passed                               |
| Original BMC/GIF integrity                   | Hash tests passed                                                                |
| Desktop                                      | Centred bilingual handoff and full-width artwork rendered                        |

Evidence: `qa-progress.md`, `responsive-qa.json`, test files and `traceability.json`. Figma comparisons use proportional production relationships and the explicit20px/500 title override, not1:1 frame pixels. No claim of pixel-perfect identity or physical-device accessibility certification is made.

## Traceability

229 applicable requirements:223 VERIFIED,6 BLOCKED,0 NOT APPLICABLE. No item remains NOT STARTED or IMPLEMENTED - NOT VERIFIED. BLOCKED means implementation exists but the required independent verification was unavailable, not that it was silently omitted.

| ID          | Unverified requirement                        | Exact limit                                                                                                                            |
| ----------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| HEADER-01   | Physical device safe area                     | Preview has no notched-device safe-area emulation; CSS is retained but hardware rendering unverified.                                  |
| QUESTION-12 | Questionnaire under reduced-motion preference | Normal pointer/keyboard interaction passed; OS preference emulation unavailable.                                                       |
| BUILDING-13 | Building reduced motion                       | CSS/test verified, actual OS preference unavailable.                                                                                   |
| DESKTOP-04  | Independent QR scan destination               | QR renders from current origin; independent decoder/camera scan unavailable.                                                           |
| DESKTOP-05  | Independent clipboard delivery                | Same destination used; success UI shown, but preview clipboard read returned empty. Secure-browser copy acceptance remains unverified. |
| DESKTOP-10  | Desktop reduced motion                        | CSS/test verified, actual OS preference unavailable.                                                                                   |

## Remaining visual/source differences

The existing production ResultGraphic is intentionally preserved as explicitly instructed. Its translucent treatment is not replaced by the outlined treatment visible in the four Figma state specimens. Geometry and classification-controlled emphasis remain unchanged. Production typography and content-driven legal/questionnaire lengths intentionally differ from oversized Figma raw dimensions. Physical safe-area and reduced-motion appearance remain unverified as listed above.

No other material layout regression was observed in the checked browser views. This does not replace final owner acceptance on the intended mobile browsers.

## Materially changed files

- `src/styles.css`, `src/components/shared.jsx`, `src/pages/flow.jsx`
- `src/domain/session.js`, `src/hooks/runtime.jsx`
- `src/locales/en.json`, `src/locales/zh-CN.json`
- `tests/content.test.js`, `tests/lifecycle.test.js`, `tests/style-contract.test.js`, `tests/result-graphic.test.js`, `tests/scoring.test.js`
- Figma exports in `public/assets`: Home circles, footer waves/script, profile waves/brain; local Inter fonts and licence
- `README.md`, `vite.config.js`, development QA entrypoints, traceability/source/verification documentation

## Release boundary

No production deployment, GitHub Pages activation, repository-publication or permissions change was performed. Main remains unchanged. The six verification limits need closure before unconditional launch acceptance. The PRD's separate pre-public-launch legal review remains an owner launch decision; no legal approval is claimed here.
