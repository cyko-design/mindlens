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
