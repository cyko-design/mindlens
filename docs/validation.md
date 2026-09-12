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
