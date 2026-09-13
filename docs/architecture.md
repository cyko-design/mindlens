# MindLens architecture

Authority: MindLens_PRD_Production_MVP_FRESH_MASTER.docx, 12 September 2026; latest supplied screen set and immutable assets. Later explicit PRD overrides win.

React + Vite static client application. No server, account, result database, analytics or external assessment API. QR generation is local. React and QR generation are the runtime dependencies.

- `locales`: matching English/Chinese structured content, extracted from approved PRD. No translations embedded in screen components.
- `data`: neutral question mappings, approved provider destinations and geography.
- `domain`: pure response validation, scoring, classification and session validation. Central provisional 40/70 thresholds and 80/20 weighting. Classify unrounded scores; round only displayed percentages.
- `components`: one Logo, Header, Back, Button, Card, Footer, OverflowCue, RadioGroup, Tabs, Accordion, ProviderCard and InformationPage.
- `hooks`: session reducer, navigation history with per-entry scroll restoration, media queries and runtime overflow detection.
- `pages`: content/state composition using shared components.

Assessment answers, consent, position, completion and view state live in memory and sessionStorage. Scores are derived again from validated answers rather than trusting stored scores. Editing an answer invalidates completion. Retake clears answers, completion and result view state. Language remains session-only.

Routes: Home, Terms, Accuracy, Questionnaire, Building, Results, Explore, Together, Professional Support, Support Me. Secondary Back uses browser history within the app, with a safe Home fallback for a direct entry. Desktop mounts only the bilingual handoff. Mobile layouts use content sizing and safe-area insets.

Quality gates: deterministic score/boundary/invalid-state tests; locale key parity and approved data checks; end-to-end UI tests across mobile widths/heights, language, navigation, consent, retake and desktop; production build.

## Motion policy clarification

The user clarified that Reduced Motion applies only to questionnaire screens. Its CSS override is scoped to `.questionnaire`. Home, Building Profile and desktop handoff retain approved artwork motion; Support Me always displays the unchanged supplied GIF. Other screens remain static.

## Consolidated design review, 13 September 2026

The user's 21-item revision list supersedes earlier interaction/copy decisions. Answers auto-advance after a 180ms selection acknowledgement; Next remains available and pending advance is cancelled on navigation. The final answer completes the assessment, and Building opens Results automatically after 2.4 seconds. Explore maintains one open area, including restored sessions. Header branding links to Home.

The extra safe-top token is zero; device safe-area padding remains separate. Header/page/body share white background. Header-to-Back gap is halved. Question text is 20px/600 and reassurance line height is 1.0. Home uses the exact shortened English trust and consent copy with corresponding central Chinese translations, smaller trait circles and compact spacing.

Overflow measures the actual meaningful main and footer text against the visual viewport. Home alone is exempt. The circular cue uses 65% background opacity and hides after scrolling.

Footer waves use a shared SVG component following the approved Home composition, with layered cyan/lavender washes and fine white curves. The lettering asset contains vector contours of the lettering in the approved desktop reference, not a raster screenshot or substituted font. Support GIF display clips the original frame's transparent y=0..115 and y=346..479 margins; original bytes remain unchanged. The GitHub mark comes from GitHub's official Primer Octicons repository (see asset-sources.md).
