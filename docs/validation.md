# Validation report

## Passed automated checks

`npm test`: 9 tests pass.

- All four deterministic classifications and minimum/maximum scores.
- Shared traits cannot independently produce AuDHD classification.
- Unrounded threshold boundaries at 40 and 70.
- Seven-area question isolation and denominator mapping.
- Invalid, sparse, non-integer and incomplete answers rejected.
- Corrupt or incoherently completed sessions restart safely.
- Editing invalidates completion; retake clears assessment state.
- Central locale key parity; 22 questions, 7×3 interpretations and four summaries in each locale.
- 15 assessment-provider records with approved destinations.
- SHA-256 identity checks for both immutable supplied production assets.

`npm run build`: successful static production build. Approximate initial JavaScript gzip size 98 kB; QR generation is a separate lazy-loaded chunk around 10 kB gzip. Supplied screen references are absent from production assets. No external font, QR, AI or analytics requests are made by the application.

## Browser observations completed

- Desktop bilingual handoff rendered centred, with bottom artwork and no right-side decorative circles or assessment controls.
- QR image rendered from the current origin.
- Copy link initially exposed the fallback message on the non-secure preview origin. A clipboard fallback was subsequently implemented; that repair has not been rechecked in the browser.
- Home visually inspected at 390×844 in a responsive iframe: shared header, circles, trust content, controls; no Home overflow cue.
- Start disabled initially and with adult confirmation alone; enabled after both checkboxes selected.
- Terms opened with complete supplied English copy; its overflow cue was present.
- Chinese Terms displayed the language-precedence clause; toggle returned to English.
- Q1: Next and Previous appropriately disabled; selecting a response enabled Next.
- Previous returned to the selected answer; editing the response worked.
- Support Me opened during the questionnaire; Back restored Question 2.
- Donation anchor exactly matched the approved destination.

## Incomplete browser QA

Automatic approval review stopped further browser access because of a usage limit. This was an automatic review failure, not a reported application error and not a manual user rejection. No alternative browser surface was used to bypass it.

The entire 22-question browser journey, Building timing, Results tabs, accordions, all support-selector combinations, mobile retake, reload persistence, clipboard repair, multiple viewport widths/heights, keyboard/contrast audit and real reduced-motion/device-safe-area checks have **not** completed browser acceptance testing. The code and pure calculations exist and build, but this report does not label those UI paths as browser-verified.

A language-retention check inspected an HTML `checked` attribute instead of the live input property, so that assertion was inconclusive. The subsequent Previous check confirmed the retained live selected response. Recheck language switching with the live property during acceptance testing.

The private deployment is for owner review; it is not a declaration that public-launch gates or all requested QA have passed. See TODO.md for remaining content and review items.

## Consolidated revision verification, 13 September 2026

The current build implements the user's 21-item consolidated feedback. The following supersedes corresponding incomplete UI checks above:

- Home inspected at 390×844. At 390×667, the Accuracy block begins at y=649.6, within the initial viewport. All three trust descriptions measured three lines at 390px frame width. Home rendered no below-fold cue. Hardware safe-area insets were not simulated.
- Header Home link successfully returned from Support Me to Home. Question heading computed as 20px / weight 600; reassurance computed at 14px text with 14px line height.
- Completed all 22 questionnaire answers through the UI with automatic advance. Previous restored the live selected answer; retained Next moved forward. Final Complete Assessment button remained present. The final answer led automatically to Results without clicking the Building completion CTA. The brief Building heading assertion missed its transient state; exact status timing remains code-verified at 2.4 seconds, not separately stopwatch-verified.
- Score tab opened and displayed 97% for the test responses (Q1 Agree, all remaining responses Strongly agree), matching the deterministic formula.
- Explore initially showed all seven collapsed. Opening the second after the first left only the second aria-expanded=true.
- Support GIF display measured 190×91px after transparent-margin clipping. GitHub mark rendered. Overflow-cue background computed rgba(238,232,254,0.65).
- Footer SVG lettering and revised waves were visually inspected against the supplied references. Footer advice line is absent. Original GIF and Buy Me a Coffee SVG integrity tests still pass.
- Automated suite: 9 tests pass.

Automatic approval review again blocked browser access due to a usage limit during the smaller-width checks. No browser workaround was attempted. The 375px/320px follow-up measurements, non-overflowing-page cue absence, animation under device Reduced Motion, and real-device safe-area checks remain unverified. The source uses runtime overflow measurements, a Home-only exemption and a questionnaire-scoped reduced-motion override.

## Wave animation repair and direct verification

The prior revision had a desktop stacking defect: `.desktop > .waves` used z-index -1 and was painted behind the opaque body background. CSS animation was running but the artwork itself was invisible. The repair places artwork at layer 0 and handoff/copyright content at layer 1.

The former 16/18/20-second alternate animations required 32/36/40 seconds for a full cycle and produced overly faint movement. Shared wave layers now complete full cycles in 16/18/20 seconds, start at offset phases, and combine 6% horizontal travel with anchored vertical scaling. Questionnaire-only Reduced Motion handling is unchanged.

Direct browser verification after the fix:

- Home footer: compared screenshots four seconds apart. Back-wave transform changed from matrix(1.04, 0, 0, 1.07838, 14.4735, 0) to matrix(1.04, 0, 0, 1.09637, 28.6409, 0). Visible wave contours moved while footer lettering and legal text stayed fixed.
- Desktop handoff: full screenshot confirmed visible waves at the bottom. Four-second comparison changed the back-wave transform from matrix(1.04, 0, 0, 1.06212, 1.67196, 0) to matrix(1.04, 0, 0, 1.0999, 31.4202, 0). Both screenshots showed the expected changing contours.
- Building uses the same animated component, but its transient 2.4-second flow was not independently replayed during this narrowly scoped repair.

## Latest typography, Home and profile refinements

- Question text is 20px / weight 500; computed weight verified in browser. Home trait graphic occupies approximately half its previous area. Infinity strokes remain inside the SVG bounds.
- Home trust descriptions match the latest requested text; checkbox containers have a 36px minimum height.
- Building Profile uses distinct crossing-wave paths with a soft lower fade, sharing the footer motion classes. Visual inspection and differing computed transforms confirmed movement.
- Sequence duration is now 1,200ms total, with three 400ms status intervals. A fresh browser run answered all 22 questions and reached Results automatically, then verified the expected 75% score for all Agree answers. Exact timing is code-verified.
- GitHub Pages launch remains deferred until bugs are resolved and the owner makes the repository public.
