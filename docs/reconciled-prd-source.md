Here is the result of "fetch" for the Page with URL https://app.notion.com/p/3d74185f4e658132be6dcba27ec8f91b as of 2026-09-15T06:07:48.607Z:
<page url="https://app.notion.com/p/3d74185f4e658132be6dcba27ec8f91b">
<ancestor-path></ancestor-path>
<properties>
{"title":"MindLens - Product Requirements Document"}
</properties>
<iconMetadata>null</iconMetadata>
<content>
## Product status
**Working source of truth for MindLens.** Update this document as product, content and scoring decisions are approved.
**Reconciliation status:** Post-audit requirements reconciled 15 September 2026. Section 18 records the latest approved implementation requirements and supersedes any unreconciled older conflicting statement elsewhere in this document. Implementation instructions must be generated from this reconciled PRD, not from memory or an older exported copy.
**Current phase:** Production MVP implementation - post-audit correction pass. Core content, 22-question assessment, current scoring/classification, visual source-of-truth rules, result copy, Professional Support structure and production provider destinations are defined. Only the explicitly listed external production values and pre-launch review items remain unresolved.
## 1. Product overview
MindLens is a mobile-only, research-informed self-assessment for **adults aged 18+** that helps users explore traits associated with ADHD, Autism Spectrum Disorder (ASD), and overlapping ADHD + ASD traits commonly referred to as AuDHD.
MindLens is for **self-reflection only**. It is not a medical or clinical diagnosis.
### Core principles
- Mobile assessment experience only.
- No account required.
- No name, email or phone number required.
- No permanent result storage.
- Results are available only during the current session.
- No paywall, paid report or subscription.
- Complete assessment and results remain free.
- Optional donations are separate from assessment access and results.
- Reduce decision load and navigation depth wherever possible.
- One obvious primary action at each stage.
## 2. Platform and responsive behaviour
### MVP technical architecture - approved
- Keep the assessment content, question data, scoring logic and result-classification logic in the **front end** for MVP.
- Questions/content may be structured in JavaScript/JSON modules, with scoring and classification logic separated into maintainable front-end modules.
- Keep in-progress responses and calculated results in browser memory and **sessionStorage** only. Do not use localStorage or permanent application storage.
- No backend API or database is required to calculate assessment results for MVP.
- Production JavaScript should be minified as standard. Obfuscation may be considered later, but must not be treated as secure encryption.
- JavaScript delivered to the browser cannot be securely hidden from a determined user. If the scoring methodology later needs meaningful confidentiality or IP protection, move scoring/classification to a server-side API while leaving the questionnaire interface in the front end.
### Mobile
The assessment and all result experiences are designed for mobile browsers. Do not specify or enforce a fixed device aspect ratio. Layouts must resize fluidly across supported mobile screens.
### Desktop and laptop handoff
Do not adapt the assessment itself to desktop. The desktop handoff is the deliberate exception to the mobile one-language-at-a-time behaviour: **show English and Simplified Chinese together on the same handoff screen**. Do not add the mobile Support Me control, language toggle, dropdown or browser-language switching to desktop.
Show a dedicated handoff screen containing:
- MindLens branding - the MindLens logo/wordmark remains untranslated.
- **MindLens is designed for mobile.**
- **MindLens 专为移动设备设计。**
- **Scan the QR code with your phone to continue.**
- **请使用手机扫描二维码继续。**
- Generate the QR code from the application's **current deployed origin/canonical URL at runtime or build time**. Do not hard-code an as-yet-unknown production domain into the PRD and do not depend on an external QR-code API/service. A small local QR-generation package is acceptable if the project stack requires one.
- Copy-link action presented bilingually: **Copy link / 复制链接**. It must use the **same current deployed origin/canonical URL** as the QR code so the two destinations cannot drift apart. During development/preview they may use the current preview/development origin; once deployed to production they must resolve to the production origin automatically.
- Optional plain-text URL.
- **Desktop composition - approved:** centre the complete handoff content group on the page rather than aligning it to a left-side column.
- Do **not** add large overlapping decorative circles on the right side. Keep the desktop visual language consistent with the established MindLens screens rather than introducing a new desktop-only hero graphic.
- Retain the established abstract pastel shapes/waves along the bottom of the screen. These lower abstract shapes use the same **very subtle ambient motion as the mobile Home screen**, approximately a **12-20 second cycle**, with gentle independent drift and/or morphing only.
- Respect `prefers-reduced-motion`; the lower artwork becomes static when reduced motion is requested.
Do not expose assessment questions or results on desktop.
## 3. Global mobile UI requirements
### Conditional below-fold navigation cue - approved, strict implementation rule
- **Home is the only exception.** Do not apply this rule to the Home screen.
- On **every other mobile screen**, the circular downward-arrow cue is **required whenever meaningful page content extends beyond the first fold / initial viewport**.
- Determine this from the actual rendered viewport at runtime, not from whether the approved reference image happens to show the arrow.
- If meaningful content extends below the initial viewport, **render the arrow**. Do not omit it because scrolling may otherwise seem obvious.
- If all meaningful content fits within the first fold, **do not render the arrow**.
- This applies to all non-Home mobile screens, including Terms of Use, How accurate is this assessment?, Questionnaire where applicable, Results, Explore Your Results, Putting It All Together, Professional Support, and any other secondary mobile screen.
- The cue must never be added merely because it appears in a master/reference image; viewport overflow is the deciding condition.
- When shown, place it as the established bottom navigation cue pointing downward to indicate additional content. It must not bounce or pulse.
- Once the user has scrolled sufficiently for the below-fold content to become discoverable, the cue may disappear.
- **PRD rule overrides reference imagery:** if an approved visual template omits the arrow but its implemented page extends beyond the first fold, Work must add the arrow.
### Header and safe area - non-negotiable
Every mobile screen must reserve a **blank top safe-area region** for iPhone Dynamic Island, notch or sensor housing.
- Use device safe-area insets such as `env(safe-area-inset-top)` rather than a fixed crop.
- Nothing visible may be placed inside the top safe-area.
- MindLens logo, wordmark and language selector sit below the safe-area at a consistent vertical position.
- Tagline below logo: **UNDERSTAND · REFLECT · MOVE FORWARD**.
- The mobile header uses a **direct two-language toggle**, not a dropdown, menu, modal or bottom sheet. When English is active, display **中文** as the language action; tapping it immediately switches the current page to Simplified Chinese. When Simplified Chinese is active, display **EN**; tapping it immediately switches the current page to English.
- Header utility text therefore displays **Support Me \| 中文** in English mode and **支持我 \| EN** in Simplified Chinese mode.
- The **Support Me / 支持我** and language-toggle text must use the established dark navy/black header text colour, **not blue**, and use **regular/normal font weight - not bold or semibold**. The separator is visual only and is not part of either tap target. Interactive hover/focus states may use accessible treatment, but the default resting state is dark navy/black.
- Language selection persists for the browser session. A manual selection overrides browser-language detection for the remainder of that session.
- Browser-language detection may choose Simplified Chinese only when the browser preference is Chinese. English remains the fallback/default for English and every unsupported language. Do not use IP/location-based language switching.
- Visual header reference filename: **MindLens_Header_Template.png**. It contains both English and Simplified Chinese header states and is not an English-only template.
- No hamburger menu.
- Secondary screens place the shared **Back** control below the persistent header.
- **Back-navigation behaviour - global rule:** on every secondary mobile screen, including **Support Me**, Back returns the user to the exact page/state they came from rather than routing to a hard-coded destination such as Home. Preserve the originating page state and scroll position where technically possible. Use the same shared Back component and behaviour consistently across the product.
- Never render design annotations, guide labels, safe-area labels, arrows, specification notes or mockup instructions in the production UI.
## 4. Visual system
### Design source of truth - approved
- **Figma is the current visual source of truth.** Use the approved MindLens Figma layouts for visual proportions, hierarchy, relative spacing, alignment, component relationships, colours, graphics, tabs, cards, wave artwork and page composition.
- The Figma mobile frames were created at larger-than-normal mobile dimensions. **Do not map raw Figma pixel measurements 1:1 to production CSS pixels.** Translate the approved visual relationships responsively for supported mobile viewports.
- The **PRD is the functional and content source of truth** for approved copy, scoring, behaviour, localisation, navigation, data, accessibility and product requirements.
- Explicit production requirements in the PRD override a raw Figma measurement where the two differ. Approved production typography includes shared mobile page/header titles at **20px, font-weight 500** unless a specifically approved component is intentionally different.
- Existing build/CSS values are implementation to be corrected and are not authoritative where they conflict with Figma or the PRD.
- Where an approved image contains a known imperfection that is explicitly overridden in this PRD, **the PRD override takes precedence over the image**.
- Work must recreate the interface using real responsive HTML/CSS/components rather than slicing or embedding the reference screens as the production UI.
- Reference images establish visual intent; implementation remains fluid across supported viewport sizes rather than reproducing a fixed image size.
- Minimal, calm, airy and low-density.
- Default light interface.
- Navy/dark-blue body text.
- Subtle borders and shadows.
- Rounded cards and pill/rounded controls.
- ADHD visual identity: soft teal.
- ASD visual identity: soft violet/lavender.
- AuDHD visual identity: the natural visual mixture/overlap of teal and violet, not an arbitrary third colour.
- Primary CTAs use content-driven width with comfortable horizontal padding rather than automatically stretching full width.
- Shared mobile page titles use **20px, font-weight 500**. Equivalent page titles must come from one shared production rule/component rather than scattered page-specific `h1` overrides.
- Repeated visual treatments must be consolidated into shared tokens/components where appropriate. Do not resolve audit findings by stacking new late CSS overrides over conflicting obsolete rules.
### Shared component and asset reuse - strict implementation rule
- Build the interface from a **single reusable component system**. Do not independently recreate the same UI element for each page.
- Reuse the same production components wherever the same element appears, including the MindLens header, original two-circle logo/wordmark, language control, Back control, buttons/CTAs, cards, form controls, progress elements, accordion rows, provider cards, footer artwork and conditional below-fold arrow cue.
- Shared components must use the same design tokens for typography, spacing, radii, borders, shadows and colours so visual treatment cannot drift between screens.
- Page-specific variations must be implemented as explicit component variants or content/state changes, not as newly generated duplicate components.
- Reuse the same optimised asset files for repeated logos, icons and decorative artwork. **Do not generate, export, embed or download a separate duplicate asset for each page.**
- **Supplied branded production assets are immutable.** Work must use the supplied files exactly as supplied. Do not regenerate, redraw, restyle, recolour, retype, approximate, reinterpret or replace their internal design based on a mockup/reference-screen appearance.
- This immutable-asset rule specifically includes **`bmc-button.svg`** (the supplied official Buy Me a Coffee CTA asset) and **`purple_thanks.gif`** (the supplied final purple animated artwork). Reference screens determine placement and sizing only; they are not permission to recreate or alter the artwork inside those assets.
- **`bmc-button.svg`** is a required production asset for the **Support Me** page. Use it exactly as supplied for the external Buy Me a Coffee action. Do not redraw, restyle, recolour, retype, recreate or substitute it.
- **`purple_thanks.gif`** is a required production asset for the **Support Me** page. Place it in the approved **centre position that replaces the former dual-circle centre graphic**, and nowhere else. Use the supplied GIF binary unchanged. Do not regenerate, edit, recolour, restyle or substitute it. Its excessive transparent vertical canvas may be visually constrained with a non-destructive CSS/container crop or positioning treatment so the visible artwork matches Figma; do not modify the GIF file itself.
- If either required production asset is unavailable during implementation, **do not fabricate a replacement and do not stop unaffected implementation**. Flag the missing asset clearly and continue all work that does not depend on it.
- Load shared assets once where technically practical and allow browser caching/reuse. Avoid unnecessary duplicate image requests and oversized raster assets.
- Prefer lightweight HTML/CSS/SVG for interface elements and simple abstract artwork where it can accurately reproduce the approved visual source. Do not use full-screen reference images as production page backgrounds.
- Optimise raster assets for their actual rendered size and modern web delivery. Avoid loading high-resolution source/reference images directly when a smaller production asset is sufficient.
- Reuse and lazy-load non-critical below-fold imagery/assets where appropriate, while ensuring essential first-fold UI appears immediately.
- These requirements are both **visual-consistency and performance requirements**. Work must not trade component reuse for page-by-page visual approximation.
## 5. Motion
Motion is implemented **in code** in the final product. **Figma defines the approved static artwork, geometry and composition; code defines motion behaviour.** No separate animation prototype or video is required. Legacy high-resolution images are secondary references only. **Exception:** the Support Me page uses the supplied production asset **`purple_thanks.gif`** exactly as supplied. This GIF is approved content artwork, not an animation prototype or visual reference.
Ambient motion is permitted on only three screen contexts:
1. **Home** - animate only the existing abstract pastel base artwork/waves/blobs. Preserve the supplied artwork and visual composition. Use very subtle, slow independent drift and/or gentle morphing on an approximately **12-20 second cycle**. Do not introduce new decorative elements, bouncing, pulsing or attention-seeking motion.
2. **Building your trait profile** - use the approved Figma screen as the visual source of truth. Animate the existing teal/lavender centre-wave artwork with subtle independent movement while preserving its approved organic geometry throughout. The centre artwork must not flatten unnaturally at the base and must not be replaced by the bottom-wave shapes. Motion behaviour may reuse suitable bottom-wave animation logic, but the artwork remains distinct. Sequence the approved status copy: **Processing your answers → Analysing key traits → Identifying patterns**. The complete transition lasts approximately **1.2 seconds**, then automatically opens Results. Do not introduce spinners, percentage counters, pulsing loaders, fake AI-processing effects or additional animation elements.
3. **Desktop/laptop handoff** - animate only the established abstract pastel shapes/waves along the bottom, using the same subtle ambient motion language as Home on approximately a **12-20 second cycle**. Do not add or animate large decorative circles or other desktop-only hero artwork.
All other screens are static to support concentration, **except for playback of the approved supplied ****`purple_thanks.gif`**** on Support Me**. Do not introduce any additional Support Me ambient motion. Respect `prefers-reduced-motion` for code-driven decorative motion and non-essential transitions; the supplied GIF itself must not be regenerated or altered to create a substitute reduced-motion asset unless the user later supplies/approves one.
## 5A. Building your trait profile - approved
Use the approved **Figma Building Trait Profile screen as the visual source of truth** rather than redesigning the screen.
- Preserve the **original MindLens overlapping-circle logo** exactly in concept and colour treatment: left circle soft cyan/teal, right circle soft lavender, translucent circles with a natural blue-violet overlap. Do not replace it with pink circles, a leaf motif or another symbol.
- Preserve the existing header composition and tagline **UNDERSTAND · REFLECT · MOVE FORWARD**, existing typography, spacing, brain icon, large overlapping ambient waves, bottom branding elements and established muted purple CTA treatment.
- Heading: **Building your trait profile**.
- Supporting copy: **Looking across your responses for patterns associated with ADHD, ASD and overlapping traits.**
- Status sequence: **Processing your answers → Analysing key traits → Identifying patterns**.
- Supporting status line: **This only takes a moment...**
- The sequence automatically opens Results when complete; do not require a manual completion action.
- Target transition duration is approximately **1.2 seconds**. The screen provides brief closure after the questionnaire rather than simulating lengthy processing.
- Do not show a fake percentage, spinner or fake AI-processing language.
- Keep the existing waves as this screen's primary ambient visual. Do not replace them with large overlapping circles. Any motion remains very subtle and must respect `prefers-reduced-motion`.
## 5B. Explore Your Results - approved
- Open from **Explore your results →** on the Assessment Results screen.
- Use a **single mobile page with expandable accordion sections**. Do not create separate trait-detail pages.
- Intro: **See which areas of your responses contributed most to your overall result.**
- Show seven sections, collapsed initially: **Attention & executive function**, **Impulsivity & activity regulation**, **Social & communication**, **Sensory processing**, **Routine & predictability**, **Focus & self-regulation**, and **Cross-trait interaction**.
- Each collapsed section shows its **Lower / Moderate / Higher** level.
- Opening a section reveals a concise explanation of what MindLens noticed in the user's responses and what that trait area means.
- Allow **only one accordion to remain open at a time**. Opening another section automatically closes the previously open section.
- Do not add filters for MVP. Seven sections are sufficiently scannable without additional controls.
- Bottom primary CTA: **Putting it all together →**.
### Accordion content hierarchy - approved
Use the same compact hierarchy for all seven accordion sections:
1. **Trait area**
2. **Lower / Moderate / Higher** level
3. A short personalised interpretation of what MindLens noticed in the user's response pattern
4. **What this can look like** with 2-3 concise examples
Interpretation copy must change appropriately by level. A Higher result must not receive the same wording as a Lower or Moderate result.
Do not repeat the user's individual questionnaire answers. Summarise the response pattern instead so the content is easier to process and more useful.
This screen explains **what the result means**. Do not add recommendations or advice within these accordions; those come later in the flow.
Example structure:
**Attention & executive function**
**Higher**
Your responses suggest that staying focused, getting started, recovering from interruptions and organising everyday priorities may often require additional effort.
**What this can look like**
- Difficulty starting tasks even when they matter
- Losing track after interruptions
- More effort needed to organise priorities or deadlines
## 5C. Putting It All Together - approved
- Purpose: translate the detailed trait breakdown into a short, useful summary without repeating the Explore Your Results screen.
- Title: **Putting it all together**.
- Intro: **Here’s a simple summary of how your ADHD and ASD traits may interact - and what you can do next.**
- Content adapts to the user's overall result. Do not show AuDHD-specific interpretation to every user.
- For an **AuDHD-associated** result, use three concise summary cards:
	- **Big ideas, different focus** - You may experience periods of intense focus alongside difficulty directing your attention towards tasks that feel less engaging.
	- **Sensory patterns matter** - Sensitivity to your environment may affect concentration, energy and how easily you become overwhelmed.
	- **Strengths and challenges can coexist** - The same traits can be helpful in some situations and difficult in others. Context often makes a significant difference.
- **Recommended next steps:** try practical strategies that match the areas the user finds most difficult; learn more from trusted ADHD, autism and AuDHD resources; consider professional assessment if greater certainty is wanted.
- Reassurance: **You do not need to act on everything at once. Start with what feels most helpful.**
- Primary CTA: **Find professional support →** using a narrow/content-driven treatment.
- Include only a **subtle route to broader mental-health and urgent support** at this stage. The Professional Support interaction, listings, geographic grouping and production destinations are defined later in this PRD and are implementation-ready for MVP.
- Do **not** add an in-page Support Me CTA here. **Support Me / 支持我** is available globally from the persistent mobile header; keep **Find professional support →** as this screen's primary CTA.
## 6. Screen inventory
1. Desktop handoff.
2. Home.
3. Terms of Use.
4. How accurate is this assessment?
5. Questionnaire.
6. Building your trait profile.
7. Assessment Results.
	- **Score tab visualisation - approved:** use the compact **donut/ring indication chart** from the approved original Results layout, not a solid pie chart. Keep the percentage centred inside the ring, followed by the indication label and short interpretation. Use the final muted/pastel MindLens lavender/blue-violet treatment rather than saturated purple.
	- Preserve the original compact webpage hierarchy: **Combined indication score → donut with percentage → indication label → short interpretation → About this score → continuation actions**.
	- Do **not** add the Lower/Moderate/High horizontal range scale to the Score tab. The indication label already communicates the band and the extra scale makes the screen unnecessarily infographic-like.
	- The **Combined indication score and donut** remain open and unframed on the page background - do not wrap the primary score presentation in a large enclosing result card. The separate **About this score** treatment follows the current approved Figma composition.
	- Do not show separate ADHD and ASD percentages on the Score tab.
	- **Score-tab production interpretation copy:** select by the calculated combined indication band. **Lower:** “Your combined score shows a lower level of overlapping ADHD- and ASD-associated traits in this assessment. Individual trait areas may still stand out in your detailed results.” **Moderate:** “Your combined score shows a moderate level of overlapping ADHD- and ASD-associated traits in this assessment. Some shared or interacting patterns may be meaningful in your everyday experience.” **High:** “Your combined score shows a higher level of overlapping ADHD- and ASD-associated traits in this assessment, with stronger evidence of patterns occurring across both trait dimensions.” Follow with the existing non-diagnostic explanation under **About this score**. Do not describe the percentage as diagnostic probability or clinical certainty.
8. Explore Your Results - expandable accordion sections, **no separate trait-detail pages**.
9. Putting It All Together.
10. Find Professional Support.
11. Mental Health & Urgent Support - integrated into the **Find Professional Support** screen rather than a separate screen.
12. **Support Me** - standalone informational donation page.
### Primary mobile flow
**Home → Questionnaire → Building your trait profile → Assessment Results → Explore Your Results → Putting It All Together → Find Professional Support**
Supporting branches:
- Home → Terms of Use.
- Home → How accurate is this assessment?
- Home → Find Professional Support.
- Persistent mobile header → **Support Me** standalone page from any mobile screen.
- Support Me → external **Buy Me a Coffee** action.
- Results/final guidance → subtle access to broader support beyond neurodevelopmental assessment, including **mental health support** and **urgent/crisis support**. Keep these routes distinct from ADHD/ASD/AuDHD assessment services.
### Professional Support entry structure - approved
Keep all support types on the existing **Find Professional Support** screen. Do not add a separate support-type screen.
- Selector: **I’m looking for:**
	- Assessment support
	- Mental health support
	- Urgent support
- Assessment support and Mental health support use the existing **City** selector and show the approved institutional listings below. MindLens does not claim independent verification of every provider's current service configuration; where service details are unclear, use the approved information annotation.
- Selecting **Urgent support** must surface useful crisis/emergency resources immediately rather than requiring the user to complete additional filtering or select a city first.
- **Result card format is fixed** and must not be redesigned when support types are added.
- For MVP, do **not display direct telephone numbers for immediate/urgent help**. Keep urgent support within the same established listing/link model initially. Revisit direct-call numbers later if user testing or safety review indicates they are needed.
- **Geographic filtering - approved:** Assessment support and Mental health support require a **City** selection before listings appear. Urgent support uses a **Country** selector instead, because appropriate crisis resources are commonly national rather than city-specific.
- Keep the same overall selector/listing component structure across all three support types. Only the geographic selector changes from City to Country for Urgent support.
### Professional Support listing verification - approved
- **Assessment support:** prioritise official or established institutional centres with relevant ADHD and/or autism services. MindLens does not need to independently verify the exact current adult assessment pathway before listing a centre. Where published information is incomplete or unclear, show the approved information/annotation icon and advise the user to contact the centre directly for current assessment availability, eligibility and service information.
- **Mental health support:** verified institutional psychiatry, clinical psychology or professional counselling services may be included. ADHD/autism specialisation is not required.
- **Urgent support:** include only official government, hospital, national crisis or established institutional mental-health services.
- Use **official/authoritative sources** for verification wherever possible.
- Exclude commercial directories, aggregators, wellness listings and unverified independent practitioners.
- Do not rank providers or use star ratings, **recommended**, **best** or other endorsement language.
- MindLens presents qualifying entries as relevant institutional services, not endorsements.
- **Service-information status - approved:** an official/established institutional centre with relevant ADHD/autism services may be listed even when published information does not confirm the exact current adult assessment pathway. MindLens is a free informational app and is not responsible for exhaustively validating each provider's current service configuration.
- Mark these uncertain entries with a small **information/annotation icon** on the existing fixed result card. Do not redesign the card.
- Annotation copy must stay **very short and mobile-friendly**. Standard pattern: **Service details may vary. Contact the centre for current adult assessment information.**
- Entries where adult ADHD/autism assessment is explicitly confirmed do not need this annotation.
- Do not present an uncertain entry as confirmed adult assessment provision. The annotation should simply explain what is known and direct the user to contact the centre for current information.
- For MVP urgent support, use the established card/link model and official support pages rather than displaying direct telephone numbers.
- Exact provider listings are defined separately during Professional Support review.
### Japan - Tokyo assessment provider - approved
- **The University of Tokyo Hospital - Department of Neuropsychiatry**
- Address: **7-3-1 Hongo, Bunkyo-ku, Tokyo 113-8655, Japan**.
- Use the provider's **official website** as the result-card destination.
- Approved as a verified adult assessment listing because the official adult neurodevelopmental assessment programme explicitly covers **ASD and ADHD** and describes formal assessment using clinical interviews and psychological assessment tools.
- No adult-service uncertainty annotation is required for this listing.
### Singapore assessment provider - approved
- **Changi General Hospital - Clinical Psychology**
- Address: **2 Simei Street 3, Singapore 529889**.
- Use the provider's **official website** as the result-card destination.
- Approved as a verified adult assessment listing because the official Clinical Psychology service explicitly states that its psychologists assess neurodevelopmental conditions including **Autism and ADHD in youths and adults**.
- No adult-service uncertainty annotation is required for this listing.
### Japan assessment providers - approved
- **The University of Tokyo Hospital - Department of Neuropsychiatry**
- Address: **7-3-1 Hongo, Bunkyo-ku, Tokyo 113-8655, Japan**.
- Use the provider's **official website** as the result-card destination.
- Approved without uncertainty annotation because its official adult neurodevelopmental assessment programme covers **ASD and ADHD** and describes formal clinical and psychological assessment.
- **Wakeno Hospital - Adult Developmental Disorder Specialist Clinic**
- Address: **5-3-33 Higashinodamachi, Miyakojima-ku, Osaka 534-0024, Japan**.
- Use the provider's **official website** as the result-card destination.
- Approved without uncertainty annotation because its official clinic information states that it accepts **adults aged 20+** and provides testing, diagnosis and treatment for **ASD and ADHD**.
### South Korea - Seoul assessment provider - approved
- **Asan Medical Center - Department of Psychiatry**
- Address: **88, Olympic-ro 43-gil, Songpa-gu, Seoul 05505, South Korea**.
- Use the provider's **official website** as the result-card destination.
- Official hospital information confirms adult psychiatry care and lists a psychiatrist whose clinical areas include **Autism Spectrum Disorder and ADHD**, but published information does not clearly confirm a dedicated adult diagnostic-assessment pathway.
- Show the approved **information/annotation icon**. When opened, explain what MindLens can verify and advise the user to contact the hospital directly for current adult assessment availability, eligibility and service information.
### Hong Kong assessment provider - approved
- **Queen Mary Hospital - Department of Psychiatry**
- Address: **102 Pok Fu Lam Road, Hong Kong**.
- Use the provider's **official website** as the result-card destination.
- The official Hospital Authority information confirms an **Adult ADHD / ASD Clinic**, but does not clearly confirm diagnostic assessment availability.
- Show the approved information/annotation icon. On tap/click, explain what MindLens can verify, state what remains unconfirmed, and advise the user that they may still contact the centre directly for current assessment/service information and eligibility.
### Vietnam assessment providers - approved
- **Vinmec Times City International Hospital - Integrated Mental Healthcare Center**
- Address: **458 Minh Khai Street, Vinh Tuy Ward, Hanoi, Vietnam**.
- Use the provider's **official website** as the result-card destination.
- Approved without an uncertainty annotation because published Vinmec information confirms comprehensive ADHD and ASD assessment for adolescents and adults.
- **Vinmec Central Park International Hospital**
- Address: **720A Dien Bien Phu Street, Thanh My Tay Ward, Ho Chi Minh City, Vietnam**.
- Use the provider's **official website** as the result-card destination.
- Show the approved information/annotation icon because exact current adult ADHD/ASD assessment availability at this location is not confirmed.
- Annotation copy: **Service details may vary. Contact the centre for current adult assessment information.**
### Taiwan assessment provider - approved
- **National Taiwan University Hospital - Department of Psychiatry**
- Address: **No. 7, Zhongshan South Road, Zhongzheng District, Taipei City 100, Taiwan**.
- Use the provider's **official website** as the result-card destination.
- Approved without an uncertainty annotation because official NTUH psychiatry information explicitly lists **adult ADHD** and **adult autism** within adult psychiatry services for patients aged 18+.
### Hong Kong assessment provider - approved
- **Queen Mary Hospital - Department of Psychiatry**
- Address: **102 Pok Fu Lam Road, Hong Kong**.
- Use the provider's **official website** as the result-card destination.
- The official Hospital Authority information confirms an **Adult ADHD / ASD Clinic**, but published information does not clearly confirm diagnostic-assessment availability.
- Show the approved **information/annotation icon** on this listing. When opened, the annotation should state what MindLens can verify about the adult ADHD/ASD service and advise the user to **contact the centre directly for current assessment availability, eligibility and service information**.
- Apply this same annotation pattern to any future provider where the institution/relevant service is verified but adult diagnostic-assessment availability is not confirmed.
### Mainland China assessment providers - approved
- Include all four locked MVP cities: **Beijing, Shanghai, Shenzhen and Guangzhou**.
- **Beijing:** Peking University Sixth Hospital.
- **Shanghai:** Shanghai Mental Health Center.
- **Shenzhen:** Shenzhen Kangning Hospital / Shenzhen Mental Health Center.
- **Guangzhou:** The Affiliated Brain Hospital of Guangzhou Medical University.
- Use each provider's **official website** as the result-card destination.
- Where published information clearly confirms the relevant adult assessment/service pathway, no annotation is required.
- Where the exact current adult assessment pathway is not confirmed, show the approved **information/annotation icon**. The annotation should explain what MindLens knows and advise the user to **contact the centre directly for current assessment availability, eligibility, appointments and service information**.
- Do not hold back an otherwise legitimate institutional centre solely because MindLens cannot independently verify every current service detail.
### Professional Support geographic coverage - approved and locked
- Investigate MVP support coverage across **Malaysia, Singapore, Thailand, Vietnam, Indonesia, Hong Kong, Taiwan, Mainland China, Japan and South Korea**.
- For Mainland China, begin with **Shanghai, Beijing, Shenzhen and Guangzhou** as candidate cities.
- **MVP geographic list is approved and locked:** use the reviewed 10-market / 15-selection geographic coverage for Professional Support. Provider/service verification remains subject to the approved listing-verification rules above.
- Treat **Singapore** as a country-wide geographic selection rather than requiring a separate city level.
- For Malaysia, the user-facing **Kuala Lumpur** selection may represent the wider **Klang Valley** for service discovery, including qualifying services in places such as Shah Alam. Provider cards must still display the service's actual full address.
- **NASOM national-coverage annotation - approved:** NASOM may be listed under Kuala Lumpur/Klang Valley using its relevant local centre/address, but add an information/annotation icon explaining that NASOM is a national organisation. Users elsewhere in Malaysia should be encouraged to contact NASOM for information about assessment/support services available in their own state or area. This annotation is informational and is separate from the adult-service-verification annotation.
- **Malaysia provider listing - approved:** For **Kuala Lumpur / Klang Valley**, show **National Autism Society of Malaysia (NASOM) - Setia Alam One-Stop-Centre (OSC)** as the first provider card.
	- Address: **25A-5, Setia Avenue, Jalan Setia Prima S U13/S, Section 13, Setia Alam, 40170 Shah Alam, Selangor Darul Ehsan**.
	- Action: **Visit official website ↗**.
	- NASOM is approved because its official information explicitly confirms assessment/diagnosis services and states that assessment and diagnosis are provided for children, adolescents and adults.
	- Keep the **Services across Malaysia** annotation on the card.
	- For the initial Malaysia card set, do not add additional hospitals or centres unless their official information is verified to the same standard or they use the approved uncertainty annotation where appropriate.
## 7. Home
### Hero
**ADHD, ASD or Both?**
A research-informed assessment to help you explore your unique trait profile.
Use an overlapping-circle visual: ADHD teal, ASD lavender, and their natural mixed overlap representing AuDHD.
### Trust information
- Research-informed.
- For self-reflection only.
- No personal data required.
Do not use **Private & secure** as a claim.
### Adult eligibility, consent and Start Assessment
MindLens is an **adult-only (18+) self-assessment**. It does not provide child or adolescent assessment.
Do not ask for or collect the user's exact age.
Before starting, require an explicit eligibility confirmation:
**I am 18 years old or older.**
Start Assessment is disabled by default. User must actively confirm they are 18+ and select the consent checkbox before the CTA becomes available.
**Consent copy:**
I have read and agree to the Terms of Use. I understand that MindLens is a research-informed self-assessment, not a diagnosis, and that I use the results at my own discretion.
**Terms of Use** is linked.
Supporting information: **Takes about 10-15 minutes.**
### Accuracy entry point
**How accurate is this assessment?**
Learn about the research, limitations and what your results can - and cannot - tell you.
### Professional support entry point
**Find professional assessment support →**
## 8. Terms of Use - approved
### Purpose of MindLens
MindLens is a research-informed self-assessment designed to help you reflect on traits associated with ADHD, Autism Spectrum Disorder (ASD) and overlapping ADHD and ASD traits commonly referred to as AuDHD.
### Not a diagnosis or medical advice
MindLens is not a diagnostic instrument and does not replace assessment, diagnosis, treatment or advice from a qualified healthcare professional.
### Accuracy and limitations
Your results are based on your responses and research-informed screening concepts. They cannot establish whether you have ADHD, ASD, AuDHD or another condition. Other conditions, circumstances and life experiences may produce similar traits.
### Your results and decisions
MindLens results are provided for information and self-reflection. Any decisions you make after viewing your results remain your responsibility.
### Emergency situations
MindLens is not an emergency, crisis or medical service. If you require urgent help, contact the appropriate emergency or crisis service in your location.
### Professional support listings
Professional support listings are provided to help you locate institutional assessment services. Provider information may change. Always check the provider's website for current information.
### Personal information and assessment responses
MindLens does not require an account, name, email address or phone number to complete the assessment.
Your assessment results are not permanently stored by MindLens and are intended to remain available only during your current browser session. Standard hosting infrastructure may process technical information required to deliver the website.
### Limitation of liability
By using MindLens, you acknowledge that the assessment is provided for informational and self-reflection purposes only and is not a medical or clinical diagnosis.
To the fullest extent permitted by applicable law, MindLens, its creators, contributors and technical providers will not be liable for any loss, harm, distress, decision, action or consequence arising from your use of, or reliance on, the assessment, its results, recommendations, external links or listed support services.
You agree that you use MindLens voluntarily and at your own discretion and accept responsibility for any decisions you make based on the information provided.
Nothing in these Terms excludes or limits any rights or liabilities that cannot legally be excluded.
### Changes to MindLens
MindLens may change its assessment, content, functionality or these Terms as the product develops.
**Internal launch requirement - not user-facing:** Terms should receive professional legal review before public launch. Governing-law language is intentionally omitted until operating jurisdiction is confirmed.
## 9. How accurate is this assessment? - approved
MindLens is a **research-informed self-assessment** designed to help you explore traits associated with ADHD, Autism Spectrum Disorder (ASD) and AuDHD.
### What can the results tell me?
Your responses can highlight patterns commonly associated with ADHD, ASD or both, including areas such as attention, executive function, sensory processing, social communication and other overlapping traits.
The results can help you identify areas you may want to understand or explore further.
### What can't the results tell me?
MindLens cannot determine with certainty whether you have ADHD, ASD, AuDHD or another condition.
There is currently insufficient evidence to establish the diagnostic accuracy of a combined assessment like MindLens. Different conditions, circumstances and life experiences can also produce similar traits.
**Your result is a guide for self-reflection, not a diagnosis.**
### Research-informed, not diagnostic
MindLens draws on published research and established screening approaches for ADHD and autism.
Screening tools can help identify traits that may warrant further assessment, but they are not sufficient on their own to make a diagnosis. Professional assessment considers additional factors such as developmental history, everyday functioning, symptoms across different settings and alternative explanations.
### No paywall. No paid results.
MindLens is free to use. Your complete assessment and results are available without payment.
Optional donations help support hosting and maintenance. **Do not add an in-page Support Me CTA here; Support Me / 支持我 is available globally from the persistent mobile header.**
### Your results are temporary
No account is required.
**Your results are not saved by MindLens and are only available during your current session.**
### Want greater certainty?
If your results raise questions or you would like greater clarity, consider discussing them with a qualified professional.
**Find professional support →**
**Read the Terms of Use →**
## 10. Questionnaire interface - approved
- **22 questions** is the approved assessment structure.
- Show **Question X of 22**, percentage complete and a horizontal progress indicator.
- Show a section label such as **ATTENTION & FOCUS**.
- Present one question at a time.
- Optional helper text appears only where a question could reasonably be misunderstood, not on every question.
- Responses use large single-select tap targets. Only one answer can be selected.
- Selected answer uses a clear lavender/radio state.
- **Next** remains disabled until an answer is selected, preventing unanswered questions without requiring validation warnings. Once an answer is selected, it becomes available even though normal forward progression auto-advances.
- **Previous** and **Next** controls remain available. After a user selects an answer, preserve the selected state briefly and **automatically advance to the next question**. Keep **Next** as an explicit fallback/control. On the final question, selection does not bypass the approved **Complete Assessment** action.
- On the final question, **Next** changes to **Complete Assessment**.
- Answers remain editable while moving backwards and forwards. Returning to a previous question shows the previously selected response.
- No ambient animation. Only the progress indicator updates between questions.
### Progress reassurance - approved
Place a short reassurance message directly below the progress bar in smaller neutral grey text. It should be visually secondary to the question, with no card, icon, animation or coloured background.
Rotate the message at progress-based intervals rather than on every question:
- **0-20%:** Each question helps build a clearer picture of your traits.
- **20-40%:** Some questions may feel similar, but they explore different aspects of your experience.
- **40-60%:** Your responses are helping us understand how different traits may overlap.
- **60-80%:** You're making good progress. The remaining questions help complete your trait profile.
- **80-100%:** Nearly there. These final responses help complete the overall picture.
Avoid wording that claims or implies diagnostic accuracy, precision or reliability.
### Questionnaire production presentation - latest approved
- Question text: **20px, font-weight 500**.
- Reassurance copy directly below the progress bar uses **line-height 1.0** and remains visually secondary.
- Auto-advance after answer selection is the current approved behaviour; keep Previous and Next available as described above.
### Questionnaire framing - approved
Before Question 1, show:
**Think about your usual experiences as an adult, across different parts of your life. Choose the answer that best reflects you overall.**
Supporting text:
**There are no right or wrong answers. Try to answer based on what is generally true for you, rather than an unusual good or difficult day.**
Do not add a separate impairment score or repeated work/home/context questions. MindLens measures a research-informed trait profile rather than attempting to reproduce a clinical diagnostic assessment.
### Response scale
- Strongly agree.
- Agree.
- Neither agree nor disagree.
- Disagree.
- Strongly disagree.
**All question wording is approved. Scoring methodology below is approved provisionally for testing and may be optimised after hands-on assessment testing.**
### Response scoring - provisionally approved
Use the same transparent 0-4 score for every question:
- **Strongly disagree:** 0
- **Disagree:** 1
- **Neither agree nor disagree:** 2
- **Agree:** 3
- **Strongly agree:** 4
No questions are reverse-scored. Do not introduce clinically styled item weighting without supporting evidence. This scoring approach is a MindLens methodology and does not reproduce the scoring algorithm of an external screening instrument.
**Testing note:** Treat this as the initial implementation for hands-on testing. Question scoring, aggregation and thresholds may be optimised later based on testing. For the current MVP build, use the provisionally approved Lower / Moderate / Higher thresholds defined below: **Lower 0-39, Moderate 40-69, Higher 70-100**. These are implementation-ready MindLens testing bands, not clinical cut-offs, and may be tuned after hands-on testing.
### Score aggregation - provisionally approved
- Calculate separate **ADHD-associated** and **ASD-associated** primary trait scores.
- Normalise both primary scores internally to a common **0-100 scale** so they remain comparable despite different numbers of relevant questions.
- Use **Q21-Q22** together with the relationship between the ADHD-associated and ASD-associated scores as an **overlap indicator**. Do not create an independent AuDHD diagnostic score.
- Calculate the separate normalised ADHD-associated and ASD-associated primary trait scores **internally** for classification and combined-indication logic. Do **not** display separate ADHD and ASD percentages on the Score tab.
- The user-facing Score tab displays the approved **Combined indication score** only, as a percentage with its **Lower / Moderate / High** indication and approved interpretation copy.
- No displayed percentage may be described as a diagnostic probability, likelihood of having ADHD/ASD, or clinical certainty.
- **Primary score interpretation thresholds - provisionally approved:** **Lower: 0-39**, **Moderate: 40-69**, and **Higher: 70-100**.
- These are MindLens interpretation bands, not clinical cut-offs.
- The boundaries are provisionally approved for hands-on testing, with particular attention to the **39/40** and **69/70** boundary cases, and may be tuned before finalisation.
#### Q18-Q22 explanatory logic - approved
Q18-Q22 modify the explanation of an existing overlapping ADHD + ASD classification. They do not change the classification itself.
For users classified as **Overlapping ADHD + ASD traits**:
- **Shared-trait Lower:** **Your responses show traits associated with both ADHD and autism, although the shared and interacting traits explored in this assessment were less prominent.**
- **Shared-trait Moderate:** **Your responses suggest that some ADHD and autistic traits may interact in your everyday experiences.**
- **Shared-trait Higher:** **Your responses suggest a stronger interaction between ADHD and autistic traits, particularly around focus, self-regulation, structure and novelty.**
For **No strong pattern**, **ADHD-associated**, or **ASD-associated** results, do not display a separate Q18-Q22 level. These responses may inform the detailed trait breakdown but must not complicate or override the primary result.
### Question-to-score mapping - provisionally approved
Keep the primary ADHD-associated and ASD-associated scores distinct rather than feeding shared questions into both scores.
- **Q1-Q7:** ADHD-associated primary score.
- **Q8-Q17:** ASD-associated primary score.
- **Q18-Q20:** Shared focus/self-regulation signals used only in overlap/context interpretation.
- **Q21-Q22:** Cross-trait signals used only in overlap/context interpretation.
**Primary score formulas:**
- ADHD-associated raw maximum = **28** points. `ADHD score = (Q1-Q7 total ÷ 28) × 100`.
- ASD-associated raw maximum = **40** points. `ASD score = (Q8-Q17 total ÷ 40) × 100`.
Q18-Q22 do not increase either primary score. This avoids counting the same shared responses in both primary scores and keeps the two primary dimensions easier to interpret and test. Q18-Q22 form a secondary interpretation layer describing how ADHD-associated and ASD-associated patterns may overlap or interact.
This mapping is provisionally approved for hands-on testing and may be optimised later without changing the approved question wording.
### Result classification and overlap interpretation - provisionally approved
#### Results screen interaction and naming - approved
- Use two switchable result views/tabs on mobile: **Your result** as the default summary and **Score** as the optional quantitative view.
- The default **Your result** view prioritises one overall classification and its indication strength rather than leading with separate ADHD and ASD percentages.
- For an overlapping ADHD + ASD classification, the user-facing result name is **AuDHD-associated traits**. Keep the underlying interpretation as overlapping ADHD + ASD traits. Supporting copy should explain that the user's responses show a pattern associated with both ADHD and autism and that this combination is commonly referred to as **AuDHD**.
- User-facing result names are: **No strong trait pattern identified**, **ADHD-associated traits**, **ASD-associated traits**, and **AuDHD-associated traits**.
- Do not place **High indication** or **Strong indication** inside rounded pills/cards that could be mistaken for buttons. Present indication strength as ordinary result typography.
- The **Score** tab may present one combined **indication score** rather than two competing primary trait scores. This is an optional quantitative layer and must not be described as a clinically validated diagnostic probability. Use the provisionally approved combined indication formula defined below for the current MVP implementation. Centralise the formula so it can be tuned after hands-on testing without restructuring the UI.
- Detailed ADHD-associated and ASD-associated scores may be available deeper in the result experience rather than competing with the primary result.
- Primary result CTAs retain the established muted Home-screen button treatment and must not use a dark diagnosis/status colour.
- When meaningful Results content remains below the viewport, show a **semi-transparent circular downward-arrow control** floating at the bottom centre above the safe area. It does not reserve layout space. Tapping it moves to the next meaningful content section. Hide it once the remaining relevant content/CTA is discoverable; show it again if the user returns towards the top and content is again below the viewport. Determine this from actual viewport/content visibility, not a fixed fold height. Apply independently to both result tabs. No bouncing/pulsing animation. Respect `prefers-reduced-motion` for scrolling behaviour.
#### Combined indication score - provisionally approved
For the optional **Score** result view, calculate a single combined indication score for an **AuDHD-associated** result using the weaker of the two primary trait scores as the foundation, with Q18-Q22 providing supporting evidence of shared/cross-trait interaction.
`Combined indication = (0.80 × min(ADHD score, ASD score)) + (0.20 × Q18-Q22 shared-trait score)`
- **Q18-Q22 shared-trait score** is an internal scoring term only. Do not require the user to understand or interpret it.
- The weaker primary score is deliberately used so that one very high ADHD or ASD score cannot compensate for a weak score on the other dimension.
- Q18-Q22 strengthen or weaken the indication based on traits that can occur across both conditions or describe how the two patterns may interact.
- The combined indication is a **MindLens indication score**, not a clinically validated diagnostic probability.
- The **80/20 weighting is provisionally approved for hands-on testing** and may be optimised before finalisation.
#### Combined indication levels - provisionally approved
For the optional **Score** view, interpret the combined indication score using the same three-band structure as the primary trait scores:
- **0-39%:** Lower indication
- **40-69%:** Moderate indication
- **70-100%:** High indication
Show the combined score as a percentage with its indication label, for example **82% - High indication**. This remains a **MindLens indication score**, not a clinically validated diagnostic probability. These boundaries are provisional for hands-on testing and may be optimised before finalisation.
#### Result-screen header simplification - approved
- Preserve the original **MindLens overlapping-circle logo**. The two circles are meaningful to the product identity and must not be replaced with a leaf or unrelated symbol.
- Do not show a hamburger/list/menu icon in the questionnaire or Results header. Reducing unnecessary controls is intentional to lower visual and cognitive load.
#### Results visual language - approved
- Overall result header/status colours have one fixed semantic meaning: **Green = No strong pattern**, **Orange = ADHD-associated**, **Blue = ASD-associated**, **Purple = overlapping ADHD + ASD / AuDHD-associated**.
- Trait-level progress bars must **not** reuse or mix the overall result colours. They represent trait intensity only, not which condition the user leans towards.
- Use one separate, consistent progress-bar colour treatment across ADHD-associated and ASD-associated dimensions. A restrained single-colour intensity treatment or subtle same-hue gradient is acceptable; do not use rainbow or multi-trait gradients.
- Keep the progress track neutral and visually secondary.
- Always display the text labels **Lower / Moderate / Higher** so colour and bar length are not the sole indicators.
- Semantic rule: **header colour = overall pattern identified; progress bar = strength of the individual trait dimension.**
- Primary result CTA should use a **muted colour treatment consistent with buttons elsewhere in MindLens**, rather than inheriting the result-status colour. It must still read clearly as enabled and actionable, not disabled. Exact CTA and broader UI colours will be revisited during later visual-system refinement.
#### Result presentation logic - approved
Present the internal classification using concise, non-diagnostic user-facing language:
- **ADHD Lower + ASD Lower:** Heading **No strong trait pattern identified**. Supporting message: **Your responses did not show a strong overall pattern associated with ADHD or ASD.**
- **ADHD Moderate/Higher + ASD Lower:** Heading **ADHD-associated traits**. Supporting message: **Your responses show a stronger pattern of traits commonly associated with ADHD.**
- **ADHD Lower + ASD Moderate/Higher:** Heading **ASD-associated traits**. Supporting message: **Your responses show a stronger pattern of traits commonly associated with autism.**
- **ADHD Moderate/Higher + ASD Moderate/Higher:** Heading **AuDHD-associated traits**. Supporting message: **Your responses show meaningful patterns associated with both ADHD and autism. This combination is commonly referred to as AuDHD.**
Below the overall result, always show both dimensions independently using the approved compact trait-card labels:
- **ADHD traits:** Lower / Moderate / Higher plus the approved visual intensity treatment.
- **ASD traits:** Lower / Moderate / Higher plus the approved visual intensity treatment.
For overlapping results, Q18-Q22 may modify the explanatory copy describing how the two patterns may interact. Do **not** add a separate AuDHD score, percentage or third AuDHD progress bar. Internal numerical scores remain hidden from the user.
#### Overall result classification - approved
Use the ADHD-associated and ASD-associated interpretation levels to determine the overall result:
- **ADHD Lower + ASD Lower:** No strong indication.
- **ADHD Moderate/Higher + ASD Lower:** ADHD-associated traits.
- **ADHD Lower + ASD Moderate/Higher:** ASD-associated traits.
- **ADHD Moderate/Higher + ASD Moderate/Higher:** ADHD + ASD overlapping traits. User-facing explanation may state that this combination is commonly referred to as **AuDHD** without presenting AuDHD as a separate diagnostic score.
Use Q18-Q22 as a secondary shared-trait interpretation layer:
- `Shared-trait score = (Q18-Q22 total ÷ 20) × 100`.
- Apply the same provisional internal bands: **Lower 0-39**, **Moderate 40-69**, **Higher 70-100**.
- If both primary scores are Moderate/Higher and the shared-trait score is Lower, classify as **ADHD + ASD overlapping traits**.
- If both primary scores are Moderate/Higher and the shared-trait score is Moderate/Higher, classify as **ADHD + ASD overlapping traits, with stronger evidence of interaction between the two trait patterns**.
- The shared-trait score cannot independently produce an overlap/AuDHD result. If either primary score is Lower, Q18-Q22 do not override that primary classification.
- Do not present the shared-trait score to users as an AuDHD percentage or independent diagnostic score.
- This is the initial MindLens classification and overlap model for testing, not a clinical diagnostic rule, and may be optimised after testing.
### Approved assessment questions
#### Attention & Executive Function - approved
- **Q1:** I find it difficult to stay focused on tasks that do not hold my interest.
- **Q2:** I often intend to do something but struggle to get started, even when it is important.
- **Q3:** I frequently lose track of what I was doing when my attention is interrupted.
- **Q4:** Organising everyday tasks, priorities or deadlines takes considerable effort for me.
#### Impulsivity & Activity Regulation - approved
- **Q5:** I sometimes act or speak before I have had time to think through the consequences.
- **Q6:** I find it uncomfortable to remain inactive when I feel the need to be doing something.
- **Q7:** I am easily drawn towards something new or interesting, even when I should be concentrating on something else.
#### Social & Communication - approved
- **Q8:** I sometimes have difficulty working out what another person expects from me when they do not say it directly.
- **Q9:** Social situations often require conscious effort rather than feeling automatic.
- **Q10:** I sometimes realise afterwards that I misunderstood another person's tone, intention or reaction.
- **Q11:** I find conversations involving unspoken social rules harder to navigate than conversations with a clear purpose.
#### Sensory Processing - approved
- **Q12:** Certain sounds, lights, textures, smells or other sensations affect me more strongly than they seem to affect other people.
- **Q13:** Busy environments with many things happening at once can become overwhelming for me.
- **Q14:** I sometimes avoid places, clothing, foods or activities because of how they feel to my senses.
#### Routine & Predictability - approved
- **Q15:** Unexpected changes to plans can unsettle me more than I would like.
- **Q16:** I feel more comfortable when I know what to expect and can prepare for it.
- **Q17:** Once I have settled into a particular way of doing something, changing that approach can be difficult.
#### Focus & Self-regulation - approved
- **Q18:** When something strongly interests me, I can become so absorbed that I lose awareness of time or other things I need to do.
- **Q19:** Repetitive movements, sounds or familiar activities can help me regulate myself when I am stressed, restless or overwhelmed.
- **Q20:** Switching my attention away from something I am deeply engaged in can be difficult, even when I know I need to stop.
#### Cross-trait Interaction - approved
- **Q21:** I can strongly prefer predictability while also becoming restless or drawn towards novelty.
- **Q22:** I sometimes feel pulled between needing structure to function well and resisting that same structure when it feels restrictive.
**All 22 MindLens assessment questions are approved.** Cross-trait items contribute to interpretation of ADHD/ASD overlap and do not create a separate AuDHD diagnostic score.
## 11. Building your trait profile - approved
### Copy
**Building your trait profile**
Looking across your responses for patterns associated with ADHD, ASD and overlapping traits.
Statuses appear one at a time:
- Processing your answers.
- Analysing key traits.
- Identifying patterns.
### Behaviour
- Result calculation itself should be immediate.
- Use a short perceived-processing transition of approximately **1.2 seconds total**.
- No spinner.
- No fake percentage.
- No fake technical progress bar.
- Automatically continue to Results when the sequence completes. Do not require a manual completion CTA.
## 12. Assessment Results - approved
### Result model
MindLens must support at least:
- Predominantly ADHD-associated trait profile.
- Predominantly ASD-associated trait profile.
- Meaningful presence of both ADHD and ASD traits / AuDHD-associated profile.
- Low or no strong indication.
Do not force every user into ADHD, ASD or AuDHD.
Do not present fake diagnostic probabilities such as **82% AuDHD**.
### Example AuDHD result
**Signs of AuDHD traits detected**
Your responses suggest a strong presence of both ADHD and ASD traits, with overlapping characteristics.
### Context card
These results indicate traits associated with both ADHD and ASD. This is sometimes referred to as AuDHD. Everyone's profile is unique, and these results are a guide - not a diagnosis.
### Trait overview
Use qualitative levels such as Higher, Moderate and Lower rather than diagnostic percentages. Example dimensions:
- Attention & Executive Function - Higher.
- Social & Communication - Moderate.
- Sensory Processing - Higher.
### Actions
Primary: **Explore Your Results →**
Secondary: **Retake Assessment**
On the **Your result** tab, retain the approved compact overlapping-circle/Venn-style result visual using soft cyan/teal and soft lavender with a natural muted blue-violet overlap. Do not use a Venn diagram on the **Score** tab; that tab uses the approved compact donut/ring chart.
## 13. Explore Your Results
Keep detailed trait information on this page using **accordion blocks**. Do not create separate trait-detail pages.
Use exactly these seven approved accordion sections:
- **Attention & executive function**
- **Impulsivity & activity regulation**
- **Social & communication**
- **Sensory processing**
- **Routine & predictability**
- **Focus & self-regulation**
- **Cross-trait interaction**
Each expanded accordion uses the approved hierarchy: trait area → Lower / Moderate / Higher → short personalised interpretation → **What this can look like** with 2-3 concise examples. Do not repeat individual answers. Do not add recommendations or advice here.
**No category filters for MVP.**
## 14. Putting It All Together
**Putting it all together**
Here's a simple summary of how your ADHD and ASD traits may interact - and what you can do next.
### A unique combination
Provide a concise personalised synthesis of the user's assessment pattern.
### What this may mean for you
Show directly visible, non-clickable summary cards such as:
- **Big ideas, different focus**
- **Sensory patterns matter**
- **Strengths and challenges can coexist**
Do not use chevrons or additional detail navigation for these cards.
### Recommended next steps
Use one consolidated card:
- Try practical strategies for focus, organisation and sensory support.
- Learn more about ADHD, ASD and AuDHD from trusted resources.
- Consider a professional assessment if you want more clarity or support.
**You do not need to act on everything at once. Start with what feels most helpful.**
Primary CTA: **Find professional support**
Use a content-driven button width, not full-width.
## 15. Find Professional Support
Scope is **Asia only**.
**Find professional support**
Discover assessment services in major Asian cities.
### Interaction
- One city selector.
- Default: **Select a city**.
- Major Asian cities only.
- No additional filters unless a genuine user need is established.
### Provider inclusion criteria
Use institutional services only, such as:
- Government or Ministry of Health services.
- Public hospitals.
- University hospitals.
- Government-recognised specialist centres.
- Official national ADHD/autism assessment services.
- Other clearly institutional clinical services.
Do not source private directories, aggregators, generic wellness providers or unverified independent providers. Do not label providers **official** in the user interface - this is an internal verification criterion.
### Provider card
Show only:
- Centre name.
- Full address.
- Official website link.
Do not display phone numbers, opening hours or copied contact information. Users should consult the provider's official website for current information.
If no qualifying provider is found:
**No verified assessment service was found for this city.**
Optional note:
**Details may change. Check the provider's website for the latest information.**
## 16. Results storage and privacy implementation
- No account.
- No database record for assessment responses/results.
- Do not use `localStorage` for assessment results.
- Use session-only browser storage such as `sessionStorage` so accidental refreshes do not necessarily destroy the assessment while the active tab/session remains open.
- Do not promise cryptographic or immediate deletion when a browser closes because browser session restoration behaviour varies.
Approved user-facing wording:
**Your results are not saved by MindLens and are only available during your current session.**
## 17. Donation integration
Use **Buy Me a Coffee** with the existing creator account.
### Product rules
- MindLens remains free to use.
- No paywall.
- No paid results or paid report.
- No subscription requirement.
- Donation never changes the assessment, result or available content.
- Donation is optional and clearly separate from assessment access.
### CTA and placement - final
- **Support Me / 支持我** is available globally from the persistent mobile header on every mobile page. Do not add duplicate in-page donation CTAs to Accuracy, Putting It All Together, Results or other content screens.
- Selecting **Support Me / 支持我** opens the internal MindLens **Support Me** page first. It does not link directly to Buy Me a Coffee from the header.
- The Support Me page uses the supplied immutable **`bmc-button.svg`** as the only external donation transaction CTA.
- External destination: [**https://buymeacoffee.com/cyuen**](https://buymeacoffee.com/cyuen), stored once as a central configuration value.
- Do not embed Buy Me a Coffee payment collection, banners or widgets inside MindLens.
- Donation remains optional and never changes assessment access, results or support information.
## 18. Accessibility
- WCAG-conscious colour contrast.
- Comfortable mobile tap targets.
- Semantic heading structure.
- Native/accessible form controls and radio groups where appropriate.
- Visible keyboard focus states.
- Do not communicate meaning by colour alone.
- Respect `prefers-reduced-motion`.
- Provide screen-reader labels.
- Communicate assessment progress in text as well as visually.
- Avoid unnecessarily dense copy.
## 19. Assessment methodology - approved direction
There is no single established diagnostic AuDHD questionnaire that MindLens should claim to reproduce. The intended methodology is to combine research-informed ADHD and autism screening constructs while preserving ADHD and ASD scoring dimensions separately before interpreting overlap.
Important rules:
- MindLens is a screener/self-reflection tool, not a diagnostic instrument.
- Do not claim a single accuracy percentage for MindLens.
- Do not diagnose ADHD, ASD or AuDHD.
- Do not rely on one score alone.
- The **22 questionnaire items are approved and locked** for MVP. The current scoring thresholds, combined-score weighting and overlap interpretation are **provisionally approved and implementation-ready for MVP testing** as defined in this PRD. They may be tuned after hands-on testing but are not TBD for the current build.
## 20. Decision-load and navigation rules
- Prefer one obvious next action.
- At most one secondary escape/back action where necessary.
- Avoid multiple equal-weight CTAs.
- Avoid redundant result destinations.
- Avoid unnecessary confirmation dialogs.
- Avoid artificial processing controls.
- Avoid navigating to another page when information can be clearly revealed in place.
- Use accordion blocks for Explore Your Results rather than separate trait pages.
## 21. Open items
- [x] Finalise all production UI copy.
- [x] Research and define questionnaire items.
- [x] Define scoring dimensions, weighting and thresholds for MVP testing.
- [x] Define ADHD/ASD overlap interpretation for AuDHD-associated results.
- [x] Define low/no-strong-indication result behaviour.
- [x] Finalise accordion content for Explore Your Results.
- [x] Finalise MVP geographic coverage for Professional Support.
- [x] Define and verify MVP institutional professional-support provider set using approved primary-source rules.
- [x] Add existing Buy Me a Coffee creator URL - [**https://buymeacoffee.com/cyuen**](https://buymeacoffee.com/cyuen).
- [x] MVP languages locked to English and Simplified Chinese with direct header toggle.
- [ ] Legal review before public launch.
- [x] Production MVP implementation specification and Work handoff defined in this PRD.
### Thailand - Bangkok assessment provider - approved
- **Bangkok Hospital - Psychiatry Clinic**
- Address: **2 Soi Soonvijai 7, New Petchburi Road, Huai Khwang, Bangkok 10310, Thailand**.
- Use the provider's **official website** as the result-card destination.
- Include the approved **information/annotation icon** because published information does not clearly confirm the exact adult ADHD/autism assessment pathway.
- Annotation copy: **Service details may vary. Contact the centre for current adult assessment information.**
### Indonesia - Jakarta assessment provider - approved
- **Dr. Cipto Mangunkusumo National General Hospital - Psychiatry Polyclinic**
- Address: **Jl. Pangeran Diponegoro No. 71, Central Jakarta, Indonesia**.
- Use the provider's **official website** as the result-card destination.
- Include the approved **information/annotation icon** because published information does not clearly confirm the exact adult ADHD/autism assessment pathway.
- Annotation copy: **Service details may vary. Contact the centre for current adult assessment information.**
### Geographic naming and grouping - approved
- For MindLens geographic navigation and provider listings, group **Mainland China, Hong Kong and Taiwan under China** rather than presenting Hong Kong and Taiwan as separate countries/markets.
- Within **China**, retain the individual location selections needed to find services: **Beijing, Shanghai, Guangzhou, Shenzhen, Hong Kong and Taipei**.
- Provider names and postal addresses should retain their official/local wording where necessary for practical service-finding.
- Apply this grouping consistently across **Assessment support, Mental health support and Urgent support** geographic selectors and related content.
### Urgent support behaviour - approved
- Keep **Urgent support** within the existing Find Professional Support screen.
- Selecting Urgent support changes the geographic selector from **City** to **Country / region**.
- Top-level options: **Malaysia, Singapore, Thailand, Vietnam, Indonesia, China, Japan, South Korea**.
- Within the China grouping, surface the appropriate Mainland China, Hong Kong or Taiwan urgent-support resource as needed rather than presenting Hong Kong or Taiwan as separate countries.
- Urgent support should not require an additional city selection before useful resources appear. Preselect the user's detected or previously selected country/region when available, while allowing it to be changed.
- Use the existing fixed provider-card/listing treatment. Eligible resources are official government, national crisis, hospital or established institutional mental-health services.
- For MVP, do not display direct telephone numbers. Link to the official support/service page using **Visit official website ↗**.
### Urgent support official source set - approved
Use the approved urgent-support behaviour and existing fixed listing card. Do not describe a destination as a crisis service unless its official page explicitly provides crisis/emergency support. Otherwise use neutral wording such as **Official mental health support and urgent-care information**.
- **Malaysia:** Ministry of Health Mental Health Portal - [https://www.moh.gov.my/?mid=5](https://www.moh.gov.my/?mid=5)
- **Singapore:** MOH Mental Health Services Guide - [https://www.moh.gov.sg/seeking-healthcare/find-a-facility-or-service/mental-health-services/for-the-public/](https://www.moh.gov.sg/seeking-healthcare/find-a-facility-or-service/mental-health-services/for-the-public/) ; Institute of Mental Health (IMH) - [https://www.imh.com.sg/](https://www.imh.com.sg/)
- **Thailand:** Department of Mental Health - [https://dmh.go.th/](https://dmh.go.th/)
- **Vietnam:** Ho Chi Minh City Mental Health Hospital - [https://bvtamthanh.org.vn/](https://bvtamthanh.org.vn/)
- **Indonesia:** RS Marzoeki Mahdi (National Mental Health Center) - [https://rsmmbogor.com](https://rsmmbogor.com)
- **Japan:** National Center of Neurology and Psychiatry (NCNP) - [https://www.ncnp.go.jp/nimh/chiiki/en/overview.html](https://www.ncnp.go.jp/nimh/chiiki/en/overview.html) ; Kokoro no Joho - [https://kokoro.ncnp.go.jp/](https://kokoro.ncnp.go.jp/)
- **South Korea:** National Mental Health Information Portal - [https://www.mentalhealth.go.kr/](https://www.mentalhealth.go.kr/) ; National Center for Mental Health - [http://www.ncmh.go.kr/](http://www.ncmh.go.kr/)
- **China - Mainland:** National Center for Mental Health - [https://ncmhc.org.cn/](https://ncmhc.org.cn/)
- **China - Beijing:** Peking University Sixth Hospital - [http://www.pkuh6.cn](http://www.pkuh6.cn) ; Beijing Anding Hospital - [http://www.bjad.com.cn](http://www.bjad.com.cn)
- **China - Shanghai:** Shanghai Mental Health Center - [http://www.smhc.org.cn](http://www.smhc.org.cn)
- **China - Guangzhou:** Guangzhou Medical University Affiliated Brain Hospital / Guangzhou Mental Health Center - [http://www.gzbrain.cn](http://www.gzbrain.cn)
- **China - Shenzhen:** Shenzhen Mental Health Center / Shenzhen Kangning Hospital - [http://www.szknyy.com](http://www.szknyy.com)
- **China - Hong Kong:** Shall We Talk - [https://shallwetalk.hk/en/resources/related-links/](https://shallwetalk.hk/en/resources/related-links/)
- **China - Taipei:** Department of Mental Health, MOHW - [https://dep.mohw.gov.tw/DOMHAOH/](https://dep.mohw.gov.tw/DOMHAOH/) ; Taipei City Community Mental Health Center - [https://mental-health.gov.taipei/](https://mental-health.gov.taipei/)
## 24. Professional Support production URLs - approved
These URLs are part of the production data for **Visit official website ↗** actions. Work must use these exact official destinations unless a later PRD update replaces them. Do not substitute search-result pages, directories or invented URLs.
### Assessment support
- **Malaysia - NASOM Setia Alam One-Stop-Centre (OSC):** [https://www.nasom.org.my/centre/nasom-setia-alam/](https://www.nasom.org.my/centre/nasom-setia-alam/)
- **Singapore - Changi General Hospital, Clinical Psychology:** [https://www.cgh.com.sg/our-specialties/clinical-psychology](https://www.cgh.com.sg/our-specialties/clinical-psychology)
- **China - Hong Kong - Queen Mary Hospital, Department of Psychiatry:** [https://www8.ha.org.hk/qmh/services/clinical_department/department/psy/psy.aspx](https://www8.ha.org.hk/qmh/services/clinical_department/department/psy/psy.aspx)
- **China - Taipei - National Taiwan University Hospital, Department of Psychiatry:** [https://www.ntuh.gov.tw/PSY/Fpage.action?fid=4962&muid=](https://www.ntuh.gov.tw/PSY/Fpage.action?fid=4962&muid=)
- **Japan - Tokyo - The University of Tokyo Hospital, Neuropsychiatry:** [https://www.h.u-tokyo.ac.jp/english/centers-services/clinical-divisions/neuropsychiatry/index.html](https://www.h.u-tokyo.ac.jp/english/centers-services/clinical-divisions/neuropsychiatry/index.html)
- **Japan - Osaka - Wakeno Hospital:** [https://www.wakeno-clinic.com/](https://www.wakeno-clinic.com/)
- **South Korea - Seoul - Asan Medical Center, Department of Psychiatry:** [https://psy.amc.seoul.kr/asan/depts/psy/K/content.do?menuId=864](https://psy.amc.seoul.kr/asan/depts/psy/K/content.do?menuId=864)
- **China - Beijing - Peking University Sixth Hospital:** [https://www.pkuh6.cn/](https://www.pkuh6.cn/)
- **China - Shanghai - Shanghai Mental Health Center, Psychology Consultation Outpatient Department:** [https://www.smhc.org.cn/lczl/tsks/xlzxmz.htm](https://www.smhc.org.cn/lczl/tsks/xlzxmz.htm)
- **China - Shenzhen - Shenzhen Kangning Hospital / Shenzhen Mental Health Center:** [https://www.szknyy.com/](https://www.szknyy.com/)
- **China - Guangzhou - The Affiliated Brain Hospital of Guangzhou Medical University:** [https://www.gzbrain.cn/](https://www.gzbrain.cn/)
- **Vietnam - Hanoi - Vinmec Integrated Mental Healthcare Center:** [https://www.vinmec.com/eng/hospital/integrated-mental-healthcare-center](https://www.vinmec.com/eng/hospital/integrated-mental-healthcare-center)
- **Vietnam - Ho Chi Minh City - Vinmec Central Park International Hospital:** [https://www.vinmec.com/eng/hospital/vinmec-central-park-international-hospital-1](https://www.vinmec.com/eng/hospital/vinmec-central-park-international-hospital-1)
- **Thailand - Bangkok - Bangkok Hospital, Special Clinic (Psychiatry):** [https://www.bangkokhospital.com/en/bangkok/center-clinic/brain/special-clinic-psychiatry/overview](https://www.bangkokhospital.com/en/bangkok/center-clinic/brain/special-clinic-psychiatry/overview)
- **Indonesia - Jakarta - Dr. Cipto Mangunkusumo National General Hospital, Adult Psychiatry Clinic:** [https://rscm.co.id/en/services/outpatients/adult-psychiatry-clinic/staff](https://rscm.co.id/en/services/outpatients/adult-psychiatry-clinic/staff)
### Mental health support official destinations
- **Malaysia:** [https://www.moh.gov.my/?mid=5](https://www.moh.gov.my/?mid=5)
- **Singapore:** [https://www.moh.gov.sg/seeking-healthcare/find-a-facility-or-service/mental-health-services/for-the-public/](https://www.moh.gov.sg/seeking-healthcare/find-a-facility-or-service/mental-health-services/for-the-public/)
- **Singapore - Institute of Mental Health:** [https://www.imh.com.sg/](https://www.imh.com.sg/)
- **Thailand:** [https://dmh.go.th/](https://dmh.go.th/)
- **Vietnam - Ho Chi Minh City Mental Health Hospital:** [https://bvtamthanh.org.vn/](https://bvtamthanh.org.vn/)
- **Indonesia - Marzoeki Mahdi Hospital:** [https://rsmmbogor.com](https://rsmmbogor.com)
- **Japan - National Center of Neurology and Psychiatry:** [https://www.ncnp.go.jp/nimh/chiiki/en/overview.html](https://www.ncnp.go.jp/nimh/chiiki/en/overview.html)
- **Japan - Kokoro:** [https://kokoro.ncnp.go.jp/](https://kokoro.ncnp.go.jp/)
- **South Korea - National Mental Health Portal:** [https://www.mentalhealth.go.kr/](https://www.mentalhealth.go.kr/)
- **South Korea - National Center for Mental Health:** [http://www.ncmh.go.kr/](http://www.ncmh.go.kr/)
- **China - Mainland - National Center for Mental Health:** [https://ncmhc.org.cn/](https://ncmhc.org.cn/)
- **China - Taipei - Ministry of Health and Welfare:** [https://dep.mohw.gov.tw/DOMHAOH/](https://dep.mohw.gov.tw/DOMHAOH/)
- **China - Taipei - Community Mental Health Center:** [https://mental-health.gov.taipei/](https://mental-health.gov.taipei/)
- **China - Beijing - Peking University Sixth Hospital:** [http://www.pkuh6.cn](http://www.pkuh6.cn)
- **China - Beijing - Beijing Anding Hospital:** [http://www.bjad.com.cn](http://www.bjad.com.cn)
- **China - Shanghai - Shanghai Mental Health Center:** [http://www.smhc.org.cn](http://www.smhc.org.cn)
- **China - Guangzhou - The Affiliated Brain Hospital of Guangzhou Medical University:** [http://www.gzbrain.cn](http://www.gzbrain.cn)
- **China - Shenzhen - Shenzhen Kangning Hospital:** [http://www.szknyy.com](http://www.szknyy.com)
- **China - Hong Kong - Shall We Talk:** [https://shallwetalk.hk/en/resources/related-links/](https://shallwetalk.hk/en/resources/related-links/)
### URL handling rule
- These destinations are production content, not implementation placeholders.
- Open external links safely in a new browser context where appropriate.
- If an official provider later changes a URL, update the central provider data source rather than hard-coding a replacement inside an individual component.
- If a destination is temporarily unavailable, do not silently substitute a different provider or a search-engine query.
## 25. Complete personalised result copy - approved for MVP
This section closes the implementation gap for personalised result wording. Work must use this approved copy rather than inventing result-specific interpretations. Copy is selected deterministically from the calculated classification and Lower / Moderate / Higher trait levels.
### Assessment Results - What this means
**No strong trait pattern identified**
Your responses did not show a strong overall pattern of ADHD-associated or ASD-associated traits in this assessment. You may still recognise individual traits in your results, but they were not prominent enough here to form a stronger overall pattern.
**ADHD-associated traits**
Your responses show a stronger pattern of traits commonly associated with ADHD, particularly in areas such as attention, executive function, impulsivity or activity regulation. This result is for self-reflection and does not establish an ADHD diagnosis.
**ASD-associated traits**
Your responses show a stronger pattern of traits commonly associated with autism, particularly in areas such as social communication, sensory processing, routine or predictability. This result is for self-reflection and does not establish an autism diagnosis.
**AuDHD-associated traits**
Your responses show a pattern of traits associated with both ADHD and autism. This combination is commonly referred to as **AuDHD**. This result is for self-reflection and does not establish an ADHD, autism or AuDHD diagnosis.
### Explore Your Results - complete 7 × 3 interpretation matrix
#### Attention & executive function
**Lower**
Your responses suggest that attention, task initiation, recovering from interruptions and organising everyday priorities are not prominent areas of difficulty for you overall.
**What this can look like**
- Usually being able to start necessary tasks
- Regaining focus after interruptions without major difficulty
- Managing everyday priorities or deadlines with a workable level of effort
**Moderate**
Your responses suggest that attention and executive-function demands can sometimes require extra effort, particularly when tasks are less engaging or when several priorities compete for attention.
**What this can look like**
- Delaying the start of some important tasks
- Occasionally losing track after interruptions
- Needing extra structure for priorities or deadlines
**Higher**
Your responses suggest that staying focused, getting started, recovering from interruptions and organising everyday priorities may often require additional effort.
**What this can look like**
- Difficulty starting tasks even when they matter
- Losing track after interruptions
- More effort needed to organise priorities or deadlines
#### Impulsivity & activity regulation
**Lower**
Your responses suggest that acting before thinking, restlessness and being pulled towards new stimulation are not prominent patterns for you overall.
**What this can look like**
- Usually having time to consider a response before acting
- Being reasonably comfortable during periods of lower activity
- Staying with a current task despite other interesting possibilities
**Moderate**
Your responses suggest that impulsivity or restlessness may appear in some situations, especially when you are under-stimulated, excited or presented with something more interesting.
**What this can look like**
- Occasionally speaking or acting before fully thinking it through
- Feeling restless during periods of inactivity
- Sometimes shifting towards something new before finishing the current task
**Higher**
Your responses suggest that impulsivity, restlessness and attraction to new stimulation may frequently influence how you respond or direct your attention.
**What this can look like**
- Acting or speaking before considering the consequences
- Finding inactivity particularly uncomfortable
- Being strongly drawn towards something new even when another task needs attention
#### Social & communication
**Lower**
Your responses suggest that interpreting social expectations, tone and unspoken conversational rules is not a prominent area of difficulty for you overall.
**What this can look like**
- Usually understanding what others expect without needing it stated directly
- Social interactions often feeling relatively intuitive
- Generally recognising tone or intention during conversation
**Moderate**
Your responses suggest that some social situations require conscious interpretation, particularly when expectations, tone or conversational rules are indirect.
**What this can look like**
- Sometimes needing clearer communication from other people
- Putting conscious effort into unfamiliar social situations
- Occasionally recognising a misunderstanding only afterwards
**Higher**
Your responses suggest that navigating indirect expectations, tone and unspoken social rules may often require conscious effort.
**What this can look like**
- Difficulty knowing what someone expects when they do not say it directly
- Social situations feeling effortful rather than automatic
- Misunderstanding tone, intention or unspoken conversational rules
#### Sensory processing
**Lower**
Your responses suggest that sensory input is not a prominent source of discomfort or overwhelm for you overall.
**What this can look like**
- Usually tolerating everyday sounds, lights, textures or smells
- Busy environments being manageable most of the time
- Rarely needing to avoid activities because of sensory qualities
**Moderate**
Your responses suggest that certain sensory environments can sometimes become distracting, uncomfortable or overwhelming.
**What this can look like**
- Being particularly affected by some sounds, lights, textures or smells
- Becoming tired or overloaded in busy environments
- Occasionally avoiding something because of how it feels to your senses
**Higher**
Your responses suggest that sensory input may frequently affect your comfort, concentration or ability to remain in certain environments.
**What this can look like**
- Strong reactions to particular sounds, lights, textures or smells
- Busy environments becoming overwhelming
- Avoiding places, clothing, foods or activities because of sensory discomfort
#### Routine & predictability
**Lower**
Your responses suggest that unexpected change and departures from familiar routines are generally manageable for you.
**What this can look like**
- Adapting to changed plans without substantial disruption
- Being comfortable with a reasonable amount of uncertainty
- Changing an established approach when circumstances require it
**Moderate**
Your responses suggest that predictability and preparation can be helpful, while changes to plans or established approaches may sometimes take additional adjustment.
**What this can look like**
- Preferring advance notice of changes
- Feeling more comfortable when expectations are clear
- Needing some time to adjust an established way of doing something
**Higher**
Your responses suggest that predictability, preparation and familiar ways of doing things may play an important role in helping you feel settled and organised.
**What this can look like**
- Unexpected changes feeling particularly unsettling
- Strongly preferring to know what to expect in advance
- Finding it difficult to change an established approach once it is familiar
#### Focus & self-regulation
**Lower**
Your responses suggest that intense absorption, difficulty disengaging and repetitive or familiar self-regulation behaviours are not prominent patterns for you overall.
**What this can look like**
- Usually noticing time and other responsibilities while engaged in an interest
- Switching away from an engaging activity without major difficulty
- Not strongly relying on repetitive or familiar activities to regulate yourself
**Moderate**
Your responses suggest that strong interests and familiar regulating behaviours can sometimes shape your attention or help you manage stress and restlessness.
**What this can look like**
- Occasionally losing track of time while deeply engaged
- Needing extra effort to switch away from an absorbing activity
- Using familiar movements, sounds or activities to settle yourself in some situations
**Higher**
Your responses suggest that intense focus and self-regulation patterns may frequently influence how you manage attention, transitions, stress or overwhelm.
**What this can look like**
- Becoming deeply absorbed and losing awareness of time
- Finding it difficult to disengage from something highly engaging
- Relying on repetitive movements, sounds or familiar activities to regulate yourself
#### Cross-trait interaction
**Lower**
Your responses suggest that tension between predictability and novelty, or between needing structure and resisting it, is not a prominent pattern for you overall.
**What this can look like**
- Structure and flexibility usually coexisting without strong conflict
- Novelty not regularly disrupting your preference for predictability
- Being able to use routines without frequently feeling constrained by them
**Moderate**
Your responses suggest that you may sometimes experience competing needs for structure and novelty, depending on the situation or your level of energy and interest.
**What this can look like**
- Wanting predictable plans but occasionally craving a change
- Finding structure useful at some times and restrictive at others
- Moving between routine-seeking and novelty-seeking in different contexts
**Higher**
Your responses suggest a stronger tension between needing predictability and being drawn towards novelty, or between relying on structure and resisting it when it feels restrictive.
**What this can look like**
- Strongly wanting predictability while also becoming restless with sameness
- Depending on structure to function while sometimes resisting that structure
- Feeling pulled between competing needs for routine and stimulation
### Putting It All Together - classification-specific summary copy
The screen must adapt to the calculated overall result. Do not show AuDHD-specific synthesis to every user.
#### No strong trait pattern identified
**Your pattern looks relatively balanced**
Your responses did not show a strong overall ADHD-associated or ASD-associated pattern. You may still recognise individual traits in some areas, and those can still be useful for understanding what helps or challenges you.
**Notice the areas that stand out**
Your detailed results may show particular Lower, Moderate or Higher areas even without a strong overall classification. Those individual patterns can be more useful than the overall label alone.
**Use what is useful**
If a particular difficulty affects your daily life, you can still explore practical strategies or discuss it with a qualified professional regardless of this result.
#### ADHD-associated traits
**Attention may depend on interest and demand**
Your responses suggest that directing attention, starting tasks or organising priorities may require more effort, particularly when something is repetitive or less engaging.
**Regulation can vary by situation**
Restlessness, impulsive responses or attraction to something more interesting may become more noticeable in some environments than others.
**Strengths and challenges can coexist**
The same patterns that make some tasks difficult may also accompany curiosity, energy or strong engagement when something captures your attention. Context matters.
#### ASD-associated traits
**Predictability can reduce effort**
Your responses suggest that clear expectations, preparation or familiar ways of doing things may make some situations easier to navigate.
**Sensory and social demands can matter**
Your environment and the amount of interpretation required in social situations may affect your concentration, comfort or energy.
**Strengths and challenges can coexist**
The same traits can be useful in some settings and demanding in others. Understanding the environments that work well for you can be valuable.
#### AuDHD-associated traits
**Big ideas, different focus**
You may experience periods of intense focus alongside difficulty directing your attention towards tasks that feel less engaging.
**Sensory patterns matter**
Sensitivity to your environment may affect concentration, energy and how easily you become overwhelmed.
**Strengths and challenges can coexist**
The same traits can be helpful in some situations and difficult in others. Context often makes a significant difference.
### Shared next-step content for Putting It All Together
**Recommended next steps**
- Try practical strategies that match the areas you find most difficult.
- Learn more from trusted ADHD, autism and AuDHD resources where relevant to your result.
- Consider professional assessment if you would like greater certainty.
**Reassurance**
You do not need to act on everything at once. Start with what feels most helpful.
Primary CTA: **Find professional support →**
## 26. Build-readiness and unresolved production values
The following are the only intentionally unresolved external production values at this stage. They must not block implementation of the rest of the MVP and must not be invented by Work.
- **Canonical production MindLens URL:** required for the desktop QR code and Copy link. Keep as a central configuration value until deployment URL/domain is confirmed.
- **Buy Me a Coffee creator URL - resolved:** use [**https://buymeacoffee.com/cyuen**](https://buymeacoffee.com/cyuen) for every approved **Support Me** CTA. Store this once as a central configuration value and reuse it; do not hard-code different donation destinations per screen.
- **Scoring thresholds and 80/20 combined-score weighting:** provisionally approved and implementation-ready for MVP testing. They are not unresolved for the build; implement the current values exactly and centralise them for later tuning.
- **Professional legal review:** required before public launch, but does not block implementation/testing of the MVP.
No other missing copy, provider destination or result-state wording should be silently invented. If Work identifies another genuine specification gap, isolate it as a clearly labelled TODO without stopping unaffected implementation.
## 27. Support Me standalone page - approved
Do **not** use the Buy Me a Coffee banner, embed or third-party widget as the MindLens donation interface. **Support Me** is a standalone internal MindLens page that explains the purpose of optional support before linking externally to Buy Me a Coffee.
### Purpose
- Explain that MindLens is a free independent project and that optional donations help fund hosting, maintenance and continued development.
- Make clear that donating is completely optional and never changes access to the assessment, results or support information.
- Explain the longer-term intention to release the MindLens Git repository publicly so others can inspect, learn from and reuse the project. This is a future intention, not a claim that the repository is already public.
### Approved production copy
# Support Me
MindLens is a free independent project created to make research-informed ADHD, ASD and AuDHD self-reflection more accessible.
Keeping MindLens free still has costs, including hosting, maintenance and continued development. If you find the project useful and would like to support it, an optional contribution helps me keep improving MindLens while keeping the assessment and results free for everyone.
There is no paid version, subscription or locked result. Supporting MindLens does not change what you can access.
## Open for others in the future
I also intend to make the MindLens Git repository publicly available in the future so others can inspect the project, learn from it and reuse the work.
**Primary external CTA:** **Support on Buy Me a Coffee ↗**
Destination: [**https://buymeacoffee.com/cyuen**](https://buymeacoffee.com/cyuen)
**Secondary action:** **Back** using the established shared Back control.
### Visual and implementation rules
- Reuse the established MindLens information/content-page visual system, header, spacing, typography, shared CTA component, footer artwork and conditional below-fold arrow.
- Do not create a donation-specific visual system.
- No Buy Me a Coffee banner, embed or third-party widget in the MindLens interface.
- The external Buy Me a Coffee action is the only donation transaction route.
- Open the external destination safely in a new browser context where appropriate.
- This page is static apart from standard interaction and playback of the approved supplied **`purple_thanks.gif`** in the centre position. Do not add any other ambient animation.
### Entry placement - required
- **Support Me / 支持我 is a persistent mobile-header entry on all mobile pages.**
- Do not add duplicate in-page Support Me CTAs to Accuracy, Putting It All Together, Results or other mobile content screens.
- Selecting the header entry opens the internal **Support Me** page first. It does not link directly to Buy Me a Coffee.
- The desktop handoff is the deliberate exception and does not show the mobile Support Me control.
**Entry-point rule:** Support Me / 支持我 is provided through the persistent mobile header. Do not add a duplicate in-page Support Me CTA merely because an older reference image or earlier requirement showed one.
## 26. Simplified Chinese production copy - approved for MVP
This is the production `zh-CN` locale. Work must implement English and Simplified Chinese from a **central locale/string data source** (for example `en.json` and `zh-CN.json`) using identical keys. Do not translate strings ad hoc inside page components. `MindLens`, `ADHD`, `ASD`, `AuDHD`, official provider names and external brand names remain unchanged unless an approved official Chinese provider name is supplied. Switching language updates the current page in place and persists for the browser session.
### Global UI / header
- Support Me → **支持我**
- When English is active, the language action is **中文**.
- When Simplified Chinese is active, the language action is **EN**.
- Chinese header utility state: **支持我 \| EN**.
- The toggle switches language immediately on the current page. Do not add a language dropdown, modal, menu or separate selection screen.
- Back → **返回**
- Previous → **上一题**
- Next → **下一题**
- Retake assessment → **重新评估**
- Explore your results → **深入了解你的结果**
- Putting it all together → **综合解读**
- Find professional support → **寻找专业支持**
- Visit official website → **访问官方网站 ↗**
- Header utility text **支持我 \| 中文** uses dark navy/black in its default state, never blue.
### Home
**ADHD、ASD，还是两者都有？**
一项基于研究的自我评估，帮助你了解自己独特的特质组合。
**ADHD · ASD · AuDHD**
**基于研究**
参考既有的 ADHD 与 ASD 研究。
**仅用于自我了解**
帮助你认识自己的特质，而不是作出诊断。
**无需提供个人资料**
完成评估无需账户或个人信息。
☐ **我已年满 18 岁。**
☐ **我已阅读并同意《使用条款》。我理解 MindLens 是一项基于研究的自我评估，并非诊断工具，我将自行判断如何理解和使用评估结果。**
**开始评估**
大约需要 10-15 分钟。
**这项评估有多准确？**
了解其研究依据、局限，以及结果能够和不能够告诉你的内容。
**寻找专业评估支持 →**
### Questionnaire framing and response scale
**请根据你成年后的通常体验，以及生活中不同情境下的整体情况作答。选择最符合你一般情况的答案。**
**答案没有对错。请尽量根据通常的自己作答，而不是某个特别顺利或特别困难的日子。**
Response scale:
- Strongly disagree → **非常不同意**
- Disagree → **不同意**
- Neither → **既不同意也不赞同**
- Agree → **同意**
- Strongly agree → **非常同意**
Progress:
- Question \{n\} of 22 → **第 \{n\} 题，共 22 题**
- \{n\}% complete → **已完成 \{n\}%**
Reassurance:
- 0-20% → **每一道题都在帮助我们更清楚地了解你的特质。**
- 20-40% → **有些问题可能看起来相似，但它们关注的是你体验中的不同方面。**
- 40-60% → **你的回答正在帮助我们了解不同特质可能如何重叠。**
- 60-80% → **你已经完成了大部分。剩下的问题将帮助补全你的特质画像。**
- 80-100% → **快完成了。最后这些回答将帮助形成更完整的整体图景。**
### All 22 questions
1. **对于无法引起我兴趣的任务，我很难持续保持专注。**
2. **即使一件事很重要，我也常常明明打算去做，却很难真正开始。**
3. **当注意力被打断后，我经常会忘记自己刚才在做什么。**
4. **安排日常任务、优先顺序或截止时间对我来说需要相当大的精力。**
5. **我有时会在还没来得及充分考虑后果之前就行动或说话。**
6. **当我觉得自己需要做点什么时，保持不动会让我感到不舒服。**
7. **即使我本应专注于另一件事，我也很容易被新鲜或有趣的事物吸引。**
8. **当别人没有直接说出来时，我有时很难判断对方希望我怎么做。**
9. **社交场合往往需要我有意识地努力，而不是自然而然地应对。**
10. **我有时会在事后才意识到自己误解了别人的语气、意图或反应。**
11. **相比目的明确的对话，我更难应对包含不成文社交规则的谈话。**
12. **某些声音、光线、触感、气味或其他感官刺激对我的影响似乎比对其他人更强。**
13. **在同时发生很多事情的繁忙环境中，我可能会感到不堪重负。**
14. **我有时会因为某些地方、衣物、食物或活动带来的感官体验而避开它们。**
15. **计划突然改变时，我受到的影响可能比自己希望的更大。**
16. **当我知道接下来会发生什么并能提前准备时，我会感觉更自在。**
17. **一旦我习惯了某种做事方式，要改变这种方式可能会很困难。**
18. **当某件事强烈吸引我时，我可能会投入到忘记时间或其他需要处理的事情。**
19. **当我感到压力、坐立不安或不堪重负时，重复性的动作、声音或熟悉的活动可以帮助我调节自己。**
20. **当我深度投入某件事时，即使知道自己应该停下来，把注意力转移开也可能很困难。**
21. **我可能一方面非常偏好可预测性，另一方面又容易感到坐立不安或被新鲜事物吸引。**
22. **我有时会在“需要结构才能更好地运作”和“当结构让我觉得受限制时又想抗拒它”之间拉扯。**
### Building your trait profile
**正在建立你的特质画像**
正在综合你的回答，寻找与 ADHD、ASD 以及两者重叠特质相关的模式。
Status sequence:
1. **正在处理你的回答**
2. **正在分析关键特质**
3. **正在识别模式**
**只需要一点时间……**
**立即查看我的结果 →**
### Assessment Results - core UI
- Assessment Results → **评估结果**
- Your result → **你的结果**
- Score → **分数**
- What this means → **这意味着什么**
- Combined indication score → **综合倾向分数**
- About this score → **关于这个分数**
- Lower indication → **较低倾向**
- Moderate indication → **中等倾向**
- High indication → **较高倾向**
- **你的结果仅用于自我了解，并非诊断。**
Overall classification copy:
**未发现明显的特质模式**
你的回答在本次评估中没有显示出明显的 ADHD 相关或 ASD 相关整体模式。你仍可能在部分结果中认出某些特质，但它们在这里并没有突出到形成更强的整体模式。
**ADHD 相关特质**
你的回答显示出较明显的 ADHD 常见相关特质模式，尤其是在注意力、执行功能、冲动或活动调节方面。此结果仅用于自我了解，并不能确定 ADHD 诊断。
**ASD 相关特质**
你的回答显示出较明显的 ASD 常见相关特质模式，尤其是在社交沟通、感官处理、日常规律或可预测性方面。此结果仅用于自我了解，并不能确定 ASD 诊断。
**AuDHD 相关特质**
你的回答同时显示出与 ADHD 和 ASD 相关的特质模式。这种组合通常被称为 **AuDHD**。此结果仅用于自我了解，并不能确定 ADHD、ASD 或 AuDHD 诊断。
Score-tab interpretation:
- **较低倾向:** 你的综合分数显示，本次评估中 ADHD 与 ASD 重叠相关特质处于较低水平。你的详细结果中仍可能有个别特质领域较为突出。
- **中等倾向:** 你的综合分数显示，本次评估中 ADHD 与 ASD 重叠相关特质处于中等水平。一些共同或相互作用的模式可能与你的日常体验有关。
- **较高倾向:** 你的综合分数显示，本次评估中 ADHD 与 ASD 重叠相关特质处于较高水平，并显示出较强的模式同时出现在两个特质维度中。
### Explore Your Results
**深入了解你的结果**
看看你的回答中哪些领域对整体结果影响较大。
#### 注意力与执行功能
**较低** - 你的回答显示，注意力、开始任务、从中断中恢复以及安排日常优先事项总体上并不是你明显感到困难的领域。
**可能的表现**
- 通常能够开始必须完成的任务
- 被打断后通常能重新集中注意力
- 日常优先事项和截止时间大多可以管理
**中等** - 你的回答显示，在注意力、开始任务、从中断中恢复或安排优先事项方面，你有时可能需要额外努力。
**可能的表现**
- 对不感兴趣的任务较难开始或保持专注
- 被打断后有时需要时间重新进入状态
- 在任务较多时需要更主动地安排优先顺序
**较高** - 你的回答显示，保持专注、开始任务、从中断中恢复以及安排日常优先事项可能经常需要额外努力。
**可能的表现**
- 即使任务很重要，也很难开始
- 被打断后容易忘记原本在做什么
- 安排优先事项或截止时间需要更多精力
#### 冲动与活动调节
**较低** - 你的回答显示，冲动行事、坐立不安以及被新刺激吸引总体上并不是明显模式。
**可能的表现**
- 通常有时间在行动前考虑
- 在活动较少时通常也能保持自在
- 新鲜事物通常不会明显打断当前任务
**中等** - 你的回答显示，冲动、坐立不安或对新刺激的吸引有时会影响你的反应或注意力方向。
**可能的表现**
- 偶尔会在充分思考前行动或说话
- 有时难以长时间保持不动
- 新鲜有趣的事物有时会把注意力从当前任务带走
**较高** - 你的回答显示，冲动、坐立不安以及对新刺激的吸引可能经常影响你的反应方式或注意力方向。
**可能的表现**
- 在考虑后果前行动或说话
- 对不活动的状态特别不舒服
- 即使另有任务，也很容易被新鲜事物强烈吸引
#### 社交与沟通
**较低** - 你的回答显示，理解社交期待、语气和不成文的交流规则总体上并不是明显困难。
**可能的表现**
- 通常能理解别人没有直接说出的期待
- 社交互动往往比较自然
- 通常能理解语气和意图
**中等** - 你的回答显示，在某些情况下，理解间接期待、语气或不成文的社交规则可能需要有意识地努力。
**可能的表现**
- 有时希望别人把期待说得更明确
- 某些社交情境需要更多思考
- 偶尔会在事后才意识到误解了语气或意图
**较高** - 你的回答显示，应对间接期待、语气和不成文的社交规则可能经常需要有意识地努力。
**可能的表现**
- 当别人不直接说明时，很难判断其期待
- 社交场合感觉需要刻意努力
- 容易误解语气、意图或不成文规则
#### 感官处理
**较低** - 你的回答显示，感官刺激总体上并不是明显的不适或压力来源。
**可能的表现**
- 通常能够适应日常声音、光线、触感或气味
- 大多数时候能应对繁忙环境
- 很少因感官不适而避开活动
**中等** - 你的回答显示，某些感官刺激或繁忙环境有时会影响你的舒适度、专注力或精力。
**可能的表现**
- 对某些声音、光线、触感或气味比较敏感
- 繁忙环境有时令人疲惫或难以专注
- 偶尔因感官体验而避开某些地方或物品
**较高** - 你的回答显示，感官刺激可能经常影响你的舒适度、专注力或留在某些环境中的能力。
**可能的表现**
- 对特定声音、光线、触感或气味反应强烈
- 繁忙环境容易让你不堪重负
- 因感官不适而避开某些地方、衣物、食物或活动
#### 日常规律与可预测性
**较低** - 你的回答显示，计划变化和偏离熟悉规律通常是可以应对的。
**可能的表现**
- 计划改变时通常能适应
- 对一定程度的不确定性较为自在
- 改变熟悉的做法通常不会造成很大困难
**中等** - 你的回答显示，可预测性、提前准备和熟悉的做法有时会帮助你感觉更稳定。
**可能的表现**
- 突然改变计划有时会让你不安
- 提前知道会发生什么会更轻松
- 改变熟悉的做法可能需要一些调整
**较高** - 你的回答显示，可预测性、提前准备和熟悉的做法可能在帮助你保持稳定和有条理方面发挥重要作用。
**可能的表现**
- 意外变化会让你明显不安
- 强烈希望提前知道接下来会发生什么
- 一旦习惯某种方式，就很难改变
#### 专注与自我调节
**较低** - 你的回答显示，过度投入、难以抽离以及通过重复或熟悉行为进行自我调节总体上并不是明显模式。
**可能的表现**
- 投入兴趣时通常仍能注意时间和其他责任
- 通常能从有吸引力的活动中切换出来
- 不太依赖重复行为来调节压力
**中等** - 你的回答显示，深度投入、切换注意力或使用熟悉行为调节自己有时会影响你如何管理时间、压力或转场。
**可能的表现**
- 对强烈兴趣有时会投入到忘记时间
- 从高度投入的活动切换出来需要额外努力
- 熟悉或重复的活动有时能帮助你稳定下来
**较高** - 你的回答显示，深度投入和自我调节模式可能经常影响你管理注意力、转场、压力或过度刺激的方式。
**可能的表现**
- 深度投入到忘记时间
- 很难从高度投入的事情中抽离
- 依靠重复动作、声音或熟悉活动来帮助自己调节
#### 跨特质相互作用
**较低** - 你的回答显示，对可预测性的需要与对新鲜感的吸引之间，或需要结构与抗拒结构之间的拉扯，总体上并不是明显模式。
**可能的表现**
- 结构与灵活性通常能够共存
- 新鲜感通常不会明显干扰你对可预测性的偏好
- 日常结构很少产生明显的内在冲突
**中等** - 你的回答显示，你有时会在需要可预测性与被新鲜事物吸引之间，或在依赖结构与抗拒限制之间感到拉扯。
**可能的表现**
- 喜欢有计划，但有时又会对固定安排感到厌倦
- 结构有帮助，但有时也让你觉得受限制
- 对规律和刺激的需求会因情境而变化
**较高** - 你的回答显示，你可能经常在需要可预测性与被新鲜事物吸引之间，或在依赖结构与抗拒限制之间感到明显拉扯。
**可能的表现**
- 强烈希望可预测，同时又容易对一成不变感到坐立不安
- 依靠结构来维持运作，却有时会抗拒这种结构
- 经常在规律与刺激这两种需求之间拉扯
### Putting It All Together
**综合解读**
以下是你的 ADHD 与 ASD 相关特质可能如何呈现或相互作用的简要总结，以及你接下来可以考虑的方向。
**未发现明显的特质模式**
**你的整体模式相对均衡** - 你的回答没有显示出明显的 ADHD 相关或 ASD 相关整体模式。你仍可能在某些领域认出个别特质，这些信息仍可帮助你了解什么会让你更轻松或更困难。
**留意较突出的领域** - 即使没有明显的整体分类，你的详细结果中仍可能出现较低、中等或较高的个别领域。这些具体模式有时比整体标签更有用。
**使用对你有帮助的信息** - 如果某项困难影响日常生活，无论本次结果如何，你仍可以尝试实用策略或与合资格的专业人士讨论。
**ADHD 相关特质**
**注意力可能取决于兴趣和任务要求** - 你的回答显示，在重复、吸引力较低的任务中，调动注意力、开始任务或安排优先事项可能需要更多努力。
**调节会因情境而变化** - 在某些环境中，坐立不安、冲动反应或被更有趣的事物吸引可能更明显。
**优势与挑战可以同时存在** - 某些让任务变困难的模式，也可能伴随好奇心、活力，或在真正感兴趣时高度投入。情境很重要。
**ASD 相关特质**
**可预测性可以减少负担** - 你的回答显示，清晰的期待、提前准备或熟悉的做法可能让某些情境更容易应对。
**感官和社交要求可能很重要** - 环境以及社交中需要解读的信息量可能影响你的专注、舒适度或精力。
**优势与挑战可以同时存在** - 同样的特质在某些环境中可能有帮助，在另一些环境中则可能带来负担。了解适合自己的环境很有价值。
**AuDHD 相关特质**
**想法很多，专注方式不同** - 你可能会经历高度专注的阶段，同时也很难把注意力放在吸引力较低的任务上。
**感官模式很重要** - 对环境的敏感可能影响专注、精力，以及你有多容易感到不堪重负。
**优势与挑战可以同时存在** - 同样的特质在某些情境中可能有帮助，在另一些情境中则可能带来困难。情境往往会产生明显影响。
**建议的下一步**
- 尝试与你最困难领域相匹配的实用策略。
- 从可信的 ADHD、ASD 和 AuDHD 资源进一步了解相关内容。
- 如果你希望获得更明确的判断，可以考虑专业评估。
**你不需要一次处理所有事情。从对你最有帮助的地方开始。**
**寻找专业支持 →**
### Professional Support
**寻找专业支持**
**我正在寻找：**
- Assessment support → **评估支持**
- Mental health support → **心理健康支持**
- Urgent support → **紧急支持**
- City → **城市**
- Country / region → **国家 / 地区**
- **服务详情可能会有变化。请联系该机构确认目前的成人评估信息。**
- Neutral urgent-support description → **官方心理健康支持与紧急照护信息**
Provider names, addresses and official URLs use the approved central provider dataset. Do not machine-translate official institution names unless an approved official Chinese name is present in that dataset.
### Support Me
**支持我**
MindLens 是一个免费的独立项目，旨在让基于研究的 ADHD、ASD 和 AuDHD 自我了解变得更容易获得。
维持 MindLens 免费运行仍会产生费用，包括托管、维护和持续开发。如果你觉得 MindLens 对你有帮助，并愿意支持这个项目，你的自愿支持将帮助我继续改进它，同时让评估和结果继续对所有人免费开放。
这里没有付费版本、订阅或锁定结果。支持 MindLens 不会改变你可以访问的任何内容。
**未来也希望开放给其他人**
我也计划在未来公开 MindLens 的 Git 代码库，让其他人可以查看项目、从中学习，并在此基础上继续使用这些工作。
**通过 Buy Me a Coffee 支持 ↗**
感谢你参与这段旅程。
你的支持帮助 MindLens 保持免费并让更多人能够使用。
### Terms of Use
# 使用条款
**MindLens 的用途**
MindLens 是一项基于研究的自我评估，旨在帮助你了解与 ADHD、Autism Spectrum Disorder（ASD）以及 ADHD 与 ASD 重叠特质相关的体验，这种重叠通常称为 AuDHD。
**并非诊断或医疗建议**
MindLens 不是诊断工具，也不能替代合资格医疗专业人士提供的评估、诊断、治疗或建议。
**准确性与局限**
你的结果基于你的回答以及基于研究的筛查概念。它不能确定你是否患有 ADHD、ASD、AuDHD 或其他状况。其他状况、环境因素和生活经历也可能产生类似特质。
**你的结果与决定**
MindLens 的结果仅供信息参考和自我了解。你在查看结果后作出的任何决定仍由你自行负责。
**紧急情况**
MindLens 不是紧急、危机或医疗服务。如果你需要紧急帮助，请联系你所在地区适当的紧急或危机服务。
**专业支持列表**
专业支持列表旨在帮助你寻找机构性的评估服务。服务提供者的信息可能发生变化。请始终查看其官方网站以获取最新信息。
**个人信息与评估回答**
完成评估无需 MindLens 账户、姓名、电子邮件地址或电话号码。
你的评估结果不会由 MindLens 永久保存，并且仅计划在当前浏览器会话期间可用。标准托管基础设施可能会处理提供网站所需的技术信息。
**责任限制**
使用 MindLens 即表示你确认本评估仅用于信息参考和自我了解，并非医疗或临床诊断。
在适用法律允许的最大范围内，MindLens、其创建者、贡献者及技术服务提供者不对因你使用或依赖本评估、其结果、建议、外部链接或所列支持服务而产生的任何损失、伤害、困扰、决定、行动或后果承担责任。
你同意自愿并自行判断使用 MindLens，并对你根据所提供信息作出的任何决定负责。
本条款中的任何内容均不排除或限制法律上不能排除的权利或责任。
**MindLens 的变更**
随着产品发展，MindLens 可能会更改其评估、内容、功能或本条款。
**语言说明**
简体中文版本用于方便阅读。**如中英文版本存在任何差异，以英文版本为准。** English is the governing/authoritative Terms version for the MVP.
### How accurate is this assessment?
# 这项评估有多准确？
MindLens 是一项**基于研究的自我评估**，旨在帮助你了解与 ADHD、Autism Spectrum Disorder（ASD）和 AuDHD 相关的特质。
**结果能告诉我什么？**
你的回答可以显示一些常见于 ADHD、ASD 或两者兼有的模式，包括注意力、执行功能、感官处理、社交沟通以及其他重叠特质。结果可以帮助你识别可能希望进一步了解或探索的领域。
**结果不能告诉我什么？**
MindLens 无法确定你是否患有 ADHD、ASD、AuDHD 或其他状况。目前没有足够证据能够确定像 MindLens 这样的综合评估具有怎样的诊断准确性。不同的状况、环境和生活经历也可能产生类似特质。
**你的结果仅用于自我了解，并非诊断。**
**基于研究，而非诊断工具**
MindLens 参考已发表研究以及既有的 ADHD 与 ASD 筛查方法。筛查工具可以帮助识别可能值得进一步评估的特质，但仅凭筛查不足以作出诊断。专业评估还会考虑成长经历、日常功能、不同情境中的表现以及其他可能解释。
**没有付费墙，也没有付费结果。**
MindLens 可免费使用。无需付费即可完成完整评估并查看结果。自愿支持用于帮助承担托管和维护费用。
**支持 MindLens →**
**你的结果是临时的**
无需账户。
**你的结果不会由 MindLens 保存，并且仅在当前会话期间可用。**
**希望获得更明确的判断？**
如果结果让你产生疑问，或你希望获得更清晰的判断，可以考虑与合资格的专业人士讨论。
**寻找专业支持 →**
**阅读使用条款 →**
### Footer
- For self-reflection only → **仅供自我反思**
- Not a medical diagnosis → **并非医学诊断**
- All rights reserved. → **保留所有权利。**
- Do not include **Seek professional advice / 请寻求专业建议** in the footer.
- Display the approved footer copyright exactly as **© 2026 MindLens** / **保留所有权利。** Do not substitute a runtime/current-year value for MVP.
### Localisation QA - strict
Before implementation is considered complete, Work must verify:
1. Every production string key present in English has a `zh-CN` value unless explicitly designated language-neutral.
2. No English fallback text appears in the Chinese UI except approved language-neutral names/brands/official provider names.
3. Question meaning and response direction remain equivalent between locales; language switching must never change scoring values.
4. ADHD / ASD / AuDHD terminology remains consistent throughout.
5. Dynamic values such as question number, percentage and provider data interpolate correctly in Chinese.
6. Long Chinese strings wrap without clipping, overlap or horizontal scrolling on supported mobile widths.
7. The Terms language-precedence clause is present in Chinese.
8. In Simplified Chinese mode, the header state is **支持我 \| EN** in dark navy/black, not blue; in English mode it is **Support Me \| 中文**.
9. Both locale files use the same central keys; components must not contain duplicated hard-coded translations.
10. Supplied branded assets, including the Buy Me a Coffee CTA and purple animated GIF, remain unchanged when switching language unless a separate approved supplied Chinese asset exists.
## Production handoff file manifest - approved
Work will receive the following files together with this PRD. These filenames are **exact identifiers** and must be used to match each supplied visual/asset to its implementation role.
### Legacy high-resolution visual references
The files below remain useful implementation/handoff references and asset-identification aids, but they are **no longer the primary visual source of truth**. The approved Figma file/node defined in the Visual system section supersedes them for current layout, proportions, hierarchy, spacing, colours, graphics and component composition. Explicit PRD production overrides still take precedence where stated.
- `01_Home.png` - legacy Home reference.
- `02_Questionnaire.png` - legacy Questionnaire reference.
- `03_Building_Profile.png` - legacy Building your trait profile reference.
- `04_Results_Your_Result.png` - legacy Results / Your result reference.
- `05_Results_Score.png` - legacy Results / Score reference.
- `06_Explore_Results.png` - legacy Explore Your Results reference.
- `07_Putting_It_Together.png` - legacy Putting It All Together reference.
- `08_Professional_Support.png` - legacy Professional Support reference.
- `09_Desktop_Handoff.png` - legacy desktop/laptop handoff reference.
- `10_Information_Content.png` - legacy shared information/content-page reference.
- `11_Support_Me.png` - legacy Support Me reference; immutable production assets remain authoritative for their own internal appearance.
- `MindLens_Header_Template.png` - legacy mobile-header reference.
### Required immutable production assets
- `bmc-button.svg` - official Buy Me a Coffee CTA used on Support Me. Use exactly as supplied. Do not regenerate, redraw, restyle, recolour, retype, crop, approximate or substitute it.
- `purple_thanks.gif` - approved animated Support Me centre artwork. It replaces the former dual-circle centre graphic in the approved centre position and must appear nowhere else. Keep the supplied GIF binary unchanged. Do not regenerate, edit, recolour, restyle, approximate or substitute it. Non-destructive CSS/container clipping or positioning is permitted solely to remove excess transparent canvas from the visible layout and match Figma.
### Handoff precedence and missing-file behaviour
1. **Figma** = current visual source of truth, interpreted proportionally rather than as 1:1 production CSS pixels.
2. **PRD** = functional, behavioural and content source of truth and explicit production overrides.
3. **`bmc-button.svg`**** and ****`purple_thanks.gif`** = immutable production assets whose internal appearance must never be inferred from or recreated from a reference image.
4. **GitHub ****`mindlens`**** repository** = code source of truth for the existing implementation being corrected.
5. Legacy PNG references remain secondary aids only. Where they conflict with current Figma or an explicit PRD production rule, they do not control implementation.
6. If a listed handoff file is missing or unreadable, Work must **flag the exact missing filename and continue all unaffected implementation**. Do not silently substitute, regenerate or reinterpret a missing required asset/reference, and do not stop the entire build unless the missing file genuinely blocks all remaining work.
### Final Support Me entry-point override - strict
This rule supersedes any older navigation-map or page-specific wording elsewhere in this PRD that says Accuracy or Putting It All Together contains a dedicated Support Me CTA.
- **Support Me / 支持我 is available from the persistent mobile header on all mobile pages.**
- Do **not** add duplicate in-page Support Me CTAs to Accuracy, Putting It All Together, Results or other content screens.
- Selecting the header entry opens the internal **Support Me** page.
- The Support Me page uses the global history-aware shared **Back** behaviour to return to the exact originating page/state, preserving scroll position where technically possible.
- The only external donation action is the approved **`bmc-button.svg`** on the Support Me page, linking to the centrally configured Buy Me a Coffee destination.
### Provider-logo sourcing rule - approved
- Work may obtain a provider logo only from that provider's **official website/domain** when a suitable official asset is readily available.
- Do not use Google Images, third-party directories, logo databases or recreated/approximated logos.
- If no suitable official logo can be reliably obtained, render the provider card cleanly **without a logo**.
- Missing provider logos must not block the build.
### Desktop QR / Copy-link URL derivation - final implementation rule
- No manual production URL value is required before build.
- Derive the desktop QR-code destination, **Copy link / 复制链接** destination and any optional displayed URL from the application's current deployed origin/canonical URL.
- Do not use an external QR-code API/service. A small local QR-generation package is acceptable if needed by the project stack.
- Development/preview may use the current preview/development origin. Once deployed to the final production domain, the QR code and Copy link must resolve to that production origin automatically.
- This rule supersedes any older wording that treats the canonical production URL as a missing value that must be supplied manually before implementation.
## Final build clarifications - strict
These rules close the implementation questions raised during the final Work handoff review and supersede any older ambiguous wording.
### Simplified Chinese production copy - completeness and authority
- The approved Simplified Chinese production copy in this PRD must be implemented from the central `zh-CN` locale alongside the English locale using matching string keys.
- Terms of Use, How accurate is this assessment?, Score-tab explanations, all seven Explore Your Results areas at Lower / Moderate / Higher levels, all classification-specific Putting It All Together summaries, Support Me, footer and shared UI copy are production content and must exist in Simplified Chinese.
- Do not omit a Chinese string because an older exported DOCX or reference image lacks it. The current canonical PRD is authoritative.
- For Terms of Use, **English is the governing/authoritative version for the MVP**. The required Chinese precedence clause is: **如中英文版本存在任何差异，以英文版本为准。**
- Work should use the approved Chinese copy supplied in this PRD. If a genuinely missing user-facing English string is discovered after this audit, flag the exact string rather than silently inventing or materially rewriting content.
### Seven-area scoring - final implementation rule
Calculate each Explore Your Results area directly from its mapped questionnaire items using the same 0-4 item values already defined in this PRD:
- **Attention & executive function:** Q1-Q4. Maximum raw score 16.
- **Impulsivity & activity regulation:** Q5-Q7. Maximum raw score 12.
- **Social & communication:** Q8-Q11. Maximum raw score 16.
- **Sensory processing:** Q12-Q14. Maximum raw score 12.
- **Routine & predictability:** Q15-Q17. Maximum raw score 12.
- **Focus & self-regulation:** Q18-Q20. Maximum raw score 12.
- **Cross-trait interaction:** Q21-Q22. Maximum raw score 8.
For each area: `area percentage = (sum of mapped item scores ÷ maximum possible raw score for that area) × 100`.
Apply the same approved interpretation bands to each area: **0-39 = Lower, 40-69 = Moderate, 70-100 = Higher**. This area-level calculation is for the seven detailed trait interpretations only and does not alter the approved primary ADHD score, primary ASD score, overlap classification or combined indication formula.
### Urgent-support national/online listing display - final implementation rule
- The approved national mental-health portals may be used for **Urgent support** with the prescribed neutral description when the destination is not explicitly a crisis service.
- For a national or online-only portal where a street address is not meaningful, do **not** invent or force a physical address. Display a concise coverage label such as **National coverage / Nationwide** (and the approved Simplified Chinese equivalent) in the location/address position of the established card.
- Physical hospitals, clinics and institutional centres continue to display their approved street address.
- This is a content-display exception only; retain the established Professional Support card structure and **Visit official website ↗** action.
## Pre-launch GitHub repository protection - approved release requirement
- Keep the `mindlens` repository private throughout development, testing and revisions.
- When the repository is intentionally made public for release, public visibility must **not** imply public write access to the canonical repository. Unauthorised users may view, clone and fork the public repository, but changes to their forks must not overwrite the canonical MindLens codebase.
- **Before public launch, protect the ****`main`**** branch.** Configure repository rules/branch protection so production changes are made through pull requests and review rather than casual direct pushes to `main`, including by authorised contributors where the selected GitHub rules support this workflow.
- Review collaborator permissions before launch and retain write access only for explicitly authorised contributors.
- Treat this as a **pre-launch/repository-governance requirement**, not an application UI requirement.
## Post-audit implementation corrections - approved
These requirements reconcile the September 2026 visual/implementation audit with the current Figma and PRD. They are implementation requirements, not permission to redesign the product.
### Shared architecture and CSS
- Correct shared architecture before page-specific styling. Remove or consolidate obsolete, duplicated and conflicting CSS rather than appending new overrides.
- Use one shared **PageTitle** production rule/component for equivalent mobile page titles at **20px / 500**.
- Use one invariant **ResultsShell** for both **Your result** and **Score**. Switching tabs must not change the outer Results background, title system, tabs, shared spacing or common actions.
- Shared tabs, cards, buttons, Back, header, footer artwork and conditional below-fold cue must use shared component contracts/tokens where the visual treatment is the same.
- Preserve existing components that are already structurally correct; refactor only where necessary to eliminate drift or satisfy the approved Figma/PRD.
### Figma artwork and motion
- Approved Figma vector artwork is authoritative for the bottom/footer waves and the distinct Building Trait Profile centre-wave artwork. Do not approximate these with unrelated hand-authored paths or generic CSS shapes.
- Keep **artwork geometry** separate from **motion behaviour**. Shared motion logic may be reused, but different approved artwork must retain its own paths, layering, colours and proportions.
- Building must retain the approved brain artwork plus its distinct organic centre waves. Motion must not flatten or materially alter the approved silhouette.
### Home implementation correction
- Remove the obsolete Home assurance-title minimum-height/negative-margin compensation that creates artificial vertical gaps. Implement the compact Figma rhythm structurally rather than with compensating offsets.
- The two Home eligibility/consent checkbox controls retain a **36px minimum tap/control height**.
- The Home infinity graphic must remain fully visible and unclipped.
- Home remains the only mobile screen exempt from the conditional below-fold arrow.
### Results implementation correction
- Use one classification-driven **ResultGraphic** with the four approved states: **No Strong Trait Pattern**, **ADHD Traits**, **ASD Traits**, **AuDHD Traits**. Geometry, footprint, icon positions and label positions remain consistent across states; only state emphasis changes.
- Match the approved Figma result-circle geometry rather than reusing logo-circle geometry.
- The two individual result cards are labelled **ADHD traits** and **ASD traits** and remain side by side where the supported viewport permits the approved composition. Their dynamic levels remain Lower / Moderate / Higher.
- Score donut sizing must be recalibrated responsively to the current Figma proportions. The audit's approximately **115-125px at a 390px-wide production viewport** is an implementation reference, not a universal fixed size and not a raw Figma-pixel mapping.
### Conditional below-fold cue
- Overflow detection must be based on **meaningful page content**, not merely the legal/footer region extending beyond the viewport. Footer-only overflow must not create a false cue.
### Professional Support
- Provider cards follow the current Figma horizontal composition where possible: official logo area plus provider details and official website action.
- Provider logos may be sourced only from the provider's official website/domain. If no suitable official logo is reliably available, render the card cleanly without a logo. Missing logos do not block the build.
- Existing approved provider data and production URLs must be preserved during visual/component refactoring.
### Localisation QA
- Every post-audit visual and behavioural correction applies to both English and Simplified Chinese unless explicitly language-neutral.
- After shared-component refactoring, verify Chinese wrapping and responsive behaviour for header utilities, tabs, titles, buttons, result cards, accordions, provider cards, Terms and Accuracy content.
- Do not hard-code English-fit dimensions that clip or overlap approved Chinese copy.
### Footer
- Footer contains **For self-reflection only** and **Not a medical diagnosis** plus the approved copyright/legal content. **Seek professional advice / 请寻求专业建议 is removed from the footer.**
- Copyright remains **© 2026 MindLens** for the MVP; do not replace it with a runtime year.
### Implementation validation
- After corrections, compare every approved Figma screen/state against the rendered build in both English and Simplified Chinese and test realistic smaller and larger mobile viewports.
- Regression-test assessment gating, 22-question progress, answer selection/auto-advance, Previous/Next, completion, Building transition, classification, Results tabs/states, single-open Explore accordion behaviour, navigation/Back restoration, language switching/session persistence, provider links, Support Me, Retake, conditional down-arrow and desktop QR/copy-link behaviour.
- Do not describe a discrepancy as fixed unless it has been verified in the rendered build.
### Result revalidation and retake state - latest approved
- If the user returns from Results to the questionnaire and changes any answer, the existing result is no longer treated as current. Forward completion must run **Building your trait profile** again before showing Results so the trait profile/classification is recalculated from the changed answers.
- Questionnaire progress must reflect the user's current questionnaire position/state when revisiting rather than remaining visually stuck at the completed 100% state.
- **Retake assessment** starts a genuinely new assessment: clear/reset the prior questionnaire answers and calculated result state required for the assessment flow, return to the start of the questionnaire, and reset the progress indicator/percentage to **0%**. Do not carry the previous 100% progress state into the retake.
## 18. Post-audit implementation reconciliation - approved 15 September 2026
This section records the latest approved implementation requirements identified during the completed Figma/build/code audit. Where an older statement elsewhere in this PRD conflicts with this section, **this section supersedes the older statement and the older statement must be reconciled before implementation instructions are issued.**
### Audit and implementation discipline
- The completed audit is a defect baseline, not a new product specification by itself. Audit recommendations must be checked against this PRD and approved Figma before implementation.
- Correct shared architecture before adding page-specific patches. Remove or consolidate obsolete/conflicting CSS rather than layering additional overrides.
- Do not change scoring, approved content, provider destinations, session-storage architecture or product behaviour merely because the audit suggests a visual/technical refactor.
### Shared visual system
- **Figma is the visual source of truth; this PRD is the functional/content source of truth.** Existing implementation is not authoritative when it conflicts with either.
- Figma mobile frames are oversized references. Preserve visual proportions and relationships rather than mapping raw Figma pixels 1:1 to CSS.
- Equivalent mobile page titles use a shared production treatment of **20px, font-weight 500** unless a specifically approved component intentionally differs.
- Establish an invariant shared Results shell for **Your Result** and **Score** so background, title/tabs, spacing, actions and colours do not change merely because the active tab changes.
- Use one reusable `ResultGraphic` with the four approved states: **No Strong Trait Pattern, ADHD Traits, ASD Traits, AuDHD Traits**. Geometry and layout remain constant; only state/emphasis changes.
- The two individual Results trait cards remain side by side and are labelled **ADHD traits** and **ASD traits**, with dynamic Lower / Moderate / Higher levels. Overall classifications retain the separate wording ADHD-associated traits / ASD-associated traits / AuDHD-associated traits.
- Score uses the compact Figma donut composition. Do not expose separate ADHD/ASD percentages or diagnostic probability.
- Exact approved Figma vector artwork is the source for shared footer waves and the distinct Building centre-wave artwork. Artwork geometry and motion behaviour must be separated in implementation. Reuse motion behaviour where appropriate, but do not substitute one artwork shape for another.
### Questionnaire and result revalidation
- Assessment contains **22 questions**. Do not use any obsolete 30-question requirement.
- Questionnaire question typography is **20px, font-weight 500**. Reassurance line-height is **1.0**.
- Selecting an answer records the selected state and auto-advances after the brief selected-state feedback; retain Previous and Next controls.
- If a user navigates back from completed Results and changes **any** answer, the previously completed result is immediately invalidated. The user must proceed through the remaining questionnaire flow and **Building your trait profile must run again** before revised Results are shown. A changed answer must never leave the previous result/profile treated as valid.
- A full **Retake Assessment** starts a genuinely new assessment: answers, completion state, Building state, Results tab/state, Explore state and questionnaire progress must reset. Questionnaire position returns to Question 1 and displayed progress returns to **0%**. Eligibility/Terms behaviour follows the approved Home/retake flow and must not preserve a stale 100% progress state.
- Do not change the progress calculation merely because the audit noted that answered-count progress can remain high when revisiting an earlier answered question. That audit item requires a separate product decision unless the revalidation/reset rules above directly apply.
### Building Trait Profile
- Complete transition lasts approximately **1.2 seconds**, then automatically opens Results.
- Preserve the approved status sequence and distinct organic centre-wave artwork, including the brain artwork shown in Figma.
- Do not require a manual completion CTA before Results.
### Explore Results
- Only **one accordion may remain open at a time**. Opening another closes the previously open section.
### Conditional below-fold cue
- Home remains exempt.
- On other mobile screens, show the shared circular downward cue only when **meaningful page content** extends beyond the initial viewport.
- Footer/legal content by itself must not cause the cue to appear. Overflow measurement must be based on the meaningful page-content region, not footer-only overflow.
- The cue uses the approved semi-transparent circular treatment and does not bounce or pulse.
### Professional Support and localisation
- Preserve all approved production provider destinations and provider data during visual refactoring. Provider cards must support the approved Figma composition, including provider logo where specified by the approved design/data.
- Every approved production copy or behaviour change must be checked in both **English and Simplified Chinese**. Shared layouts must accommodate Chinese wrapping rather than relying on English-fit fixed dimensions.
### Support Me and footer
- Preserve supplied `bmc-button.svg` and `purple_thanks.gif` as immutable production assets. Layout/container treatment may control the GIF's visible footprint without destructively editing the source asset.
- Footer does not include **Seek professional advice** or its Chinese equivalent.
- Copyright remains **© 2026 MindLens**.
### Pre-public repository governance
- Keep the repository private during revision/testing unless explicitly approved otherwise.
- Before making the repository public, protect `main` and review collaborator permissions. Public users may view, clone and fork, but production write access remains limited to authorised collaborators. Prefer reviewed pull requests for production changes.
### Post-correction QA
- After implementation, compare every approved Figma screen/state against the corrected build in both English and Simplified Chinese and at realistic mobile widths.
- Regression-test assessment gating, 22-question progress, selection/auto-advance, Previous/Next, completion, Building revalidation, Results classifications/tabs, all ResultGraphic states, single-open Explore accordion behaviour, Back/state restoration, logo-to-Home, language persistence, provider links, Support Me, Retake reset, conditional down-arrow behaviour and desktop handoff.
- Do not describe a discrepancy as fixed until it has been verified in the rendered build.
### Audit clarifications resolved before implementation
- **Score - About this score:** follow the approved Figma Score composition. The About this score content uses the Figma panel/card treatment rather than an older plain/unframed presentation.
- **Typeface:** the audit correctly identified that the current Arial/Helvetica fallback changes wrapping and perceived weight. Production typography should match the approved Figma typeface/system where the required font is available for legitimate web use. Do not invent or substitute a new brand typeface merely to satisfy the audit; if the exact approved font cannot be used, report the constraint before choosing a replacement.
- **ResultGraphic sizing:** preserve the approved Figma proportions responsively rather than treating either the current 184px cap or raw 852px-frame measurements as authoritative.
- **Score donut sizing:** use the approved Figma proportion responsively; the audit's approximately 115-125px range at a normal 390px viewport is a calibration guide, not a universal fixed size.
### Canonical reconciliation gate
Before any future implementation prompt is issued, use this order: **current canonical PRD → latest explicitly approved decisions → current Figma visual source → current implementation/audit evidence → resolve conflicts → update and verify PRD → generate implementation instruction**. Do not generate implementation requirements directly from remembered specifications or from an audit recommendation that has not been reconciled with the PRD.
### Chinese parity gate
- Any English copy, label, legal text, provider annotation or behaviour-affecting UI text changed during correction must be checked against the Simplified Chinese locale in the same implementation pass.
- Do not assume an existing Chinese string remains correct merely because its English key exists. Verify semantic parity after approved English changes and preserve the established non-translated terms/brand names.
- Final QA must test both locale content and layout, including Results tabs/cards, Questionnaire progress, Building status, Explore accordions, Professional Support, Terms, Accuracy, Support Me and footer.
### Current pre-launch visual acceptance criterion
Production implementation must be validated against the **approved Figma visual source** for MVP. Any older pre-launch wording referring to approved high-resolution screen images as the current visual authority is superseded.
### Retake and changed-answer state integrity - strict
- Changing an answer after a completed assessment must clear the completed-result validity immediately and clear any prior Building completion timestamp/state before recalculation.
- Returning through the questionnaire after such a change must not display the old Results as current. Once the revised questionnaire is complete, start a fresh Building sequence and only then show recalculated Results.
- A Retake must initialise a new 22-question assessment state with questionnaire position 0, zero answered questions and displayed progress 0%. It must not carry a previous 100% progress indicator into the new assessment.
### Implementation audit disposition
The 14 September 2026 visual/implementation audit is accepted as engineering evidence for the identified implementation defects, subject to the PRD/Figma hierarchy above. Confirmed correction areas include: shared `PageTitle`; invariant `ResultsShell`; exact Figma wave artwork separated from motion; complete Building artwork; responsive Score donut; corrected ResultGraphic geometry; provider-card logo support; removal/consolidation of conflicting background/title/tab rules; Home assurance min-height/root-cause cleanup; Chinese responsive handling; and meaningful-content-only overflow cue measurement. Preserve audit-identified sound foundations such as Header, logo-to-Home, Back, RadioGroup, Accordion structure, InformationPage structure, classification-driven ResultGraphic logic, reduced-motion handling where already correct, and proportionate React/QRCode dependencies. Audit observations that would change product behaviour are not automatically approved unless explicitly recorded elsewhere in this reconciled section.
### Work implementation sequencing - approved
Apply corrections in dependency order rather than screen-by-screen patch order: shared typography/background/layout tokens → invariant Results shell → Score/ResultGraphic corrections → exact Figma footer and Building artwork with separate motion → complete Building composition → provider-card composition → Home assurance root-cause cleanup → consolidate shared title/card/tab/panel variants → English/Simplified Chinese responsive QA → targeted visual regression and functional regression. Do not add late page-specific overrides when a shared contract is the correct fix.
### Superseded implementation references
For the current production correction pass, ignore older implementation references that conflict with Section 18, including: Figma being excluded from the workflow; approved high-resolution images being the current visual authority; Building lasting 2-3 seconds; a manual Building completion CTA; multiple Explore accordions remaining open; any 30-question reference; footer-only overflow triggering the down cue; and any instruction to preserve stale Results after an answer changes.
### Results visual-state naming
The reusable Results graphic state names are **No Strong Trait Pattern**, **ADHD Traits**, **ASD Traits**, and **AuDHD Traits**. This visual-state naming does not replace the approved user-facing overall classification copy **No strong trait pattern identified**, **ADHD-associated traits**, **ASD-associated traits**, and **AuDHD-associated traits**.
### Reduced motion scope
Preserve the approved questionnaire reduced-motion behaviour and the existing global accessibility requirement for non-essential code-driven decorative motion. Do not use a broad reduced-motion refactor as a reason to alter unrelated static screens or the supplied immutable Support Me GIF asset.
### Home current approved content
Trust blocks remain:
- **Research-informed** - Based on established research
- **Self-reflection only** - Helps you understand your traits
- **No personal data** - No account or personal details needed.
The two Home eligibility/consent controls retain a minimum height of **36px**. The Terms consent copy is: **I have read and agree to the Terms of Use. I understand MindLens is for self-reflection, not diagnosis.** Home is the only screen exempt from the conditional below-fold arrow. The first-fold composition should naturally reveal the beginning of **How accurate is this assessment?** in accordance with Figma.
### Header and footer current corrections
- Mobile logo links Home on every mobile screen.
- Use actual device safe-area inset; the additional fixed `safe-top` spacing is **0px** and the safe-area background matches the page/header background.
- Preserve the direct 中文 / EN language toggle and session persistence.
- Footer removes **Seek professional advice** and its Chinese equivalent.
- Support Me's **Open for others in future** treatment uses the GitHub logo as approved.
### Results current approved content hierarchy
**Your Result** retains the approved hierarchy: Assessment Results → overall result → Results tabs → What this means → self-reflection disclaimer → Explore your results → Retake Assessment. Do not add donation or Professional Support CTAs to this screen.
**Score** shows the combined indication only with compact donut/percentage, indication and approved explanatory copy plus the Figma About this score panel. Do not show separate ADHD/ASD percentages, diagnostic probability or a horizontal score scale.
### Professional Support current approved structure
Keep one Professional Support screen with tabs **Assessment / Mental health / Urgent**. Assessment and Mental health use City; Urgent uses Country/region. Provider presentation follows the approved Figma composition with provider logo where available/approved, provider name, address or national coverage, and official website destination. Do not add ratings, rankings, phone numbers, booking controls or private-provider listings. Preserve the canonical production provider URLs and official provider names.
### Data/storage current approved rule
MindLens remains account-free with no backend database for MVP. Keep assessment state/results in browser memory and `sessionStorage` only, not `localStorage`. User-facing claim remains: **Your results are not saved by MindLens and are only available during your current session.**
### Scoring integrity
The post-audit visual/architecture correction pass must not modify the approved scoring model or thresholds. Primary ADHD score remains Q1-Q7 / 28 × 100; primary ASD score remains Q8-Q17 / 40 × 100; shared score remains Q18-Q22 / 20 × 100; Lower 0-39, Moderate 40-69, Higher 70-100; combined indication remains `0.80 × min(ADHD, ASD) + 0.20 × shared`. Overall classification continues to derive from the approved ADHD/ASD primary-band combination. No reverse scoring.
### Desktop Handoff current rule
Desktop/laptop remains a handoff only, not a responsive desktop assessment. Show English and Simplified Chinese together, centre the handoff group, generate QR and Copy link from the same current deployed origin/canonical URL, and preserve the approved bottom-wave visual language. Do not expose questionnaire/results on desktop.
### Pre-implementation status
**Do not begin the correction implementation from any prompt generated before this reconciliation.** The next Work instruction must be regenerated after this PRD is fetched and verified.
### Audit evidence not promoted to product requirement
The following audit observations remain engineering considerations rather than automatic product changes: eager locale imports, QRCode bundling location, icon-map construction, exact breakpoint strategy and the questionnaire answered-count progress observation when revisiting already answered questions. Work may optimise these only if behaviour remains identical and the change is justified; do not use them to alter approved UX without a separate decision.
### Visual regression baseline
Use the approved Figma states as the visual regression baseline: Master Template; Home checkbox off/on; Questionnaire unselected/selected; Building Trait Profile; Results Your Result; Results Score; Explore collapsed/expanded; Putting It All Together; Professional Support; Support Me; Terms of Use; How Accurate; Desktop Handoff; and all four Results Graphic states.
### Source-of-truth conflict rule
When implementing from this PRD: Figma controls visual appearance; PRD controls content/behaviour; explicit production values in this PRD override raw Figma measurements; and the audit/build only describe current implementation defects. If a new conflict is discovered that cannot be resolved by this hierarchy, stop that specific change and report the conflict rather than guessing.
### PRD export rule
Any future downloadable PRD must be generated fresh from the current canonical Notion PRD after reconciliation. Do not patch or reuse an older exported DOCX as the source of truth.
### Reconciliation completed
This post-audit reconciliation was completed against the current canonical PRD, the 14 September 2026 complete visual/implementation audit, the current main-branch implementation evidence reviewed during the audit process, and the latest explicitly approved project corrections available before implementation. The pre-reconciliation Work prompt is superseded and must not be used.
### Implementation prompt readiness
A new implementation prompt may now be generated only from the verified post-audit PRD. It must explicitly supersede the earlier pre-reconciliation prompt and must not reintroduce obsolete specifications.
### Verification checklist - 15 September 2026
Verified as current for the correction pass: 22 questions; Figma visual authority; PRD functional/content authority; 20px/500 shared page titles; 1.2-second automatic Building transition; single-open Explore accordion; Results shell shared across tabs; four reusable Results graphic states; side-by-side ADHD traits/ASD traits cards; compact combined-score donut; changed-answer revalidation through Building; Retake progress reset to 0%; meaningful-content-only down cue; English/Simplified Chinese parity check; immutable Support Me assets; footer copy correction; sessionStorage-only storage; approved scoring preserved; desktop handoff only; repository remains private until separately approved.
### Audit cross-check note
The audit's core architectural diagnosis is consistent with the current source evidence: the current Results route conditionally applies `results-your`; Questionnaire progress is based on answered-count; Building already uses a 1200ms completion threshold in current code; Explore currently stores at most one open area; session answer changes invalidate `completed` and clear `buildingStarted`; Retake returns the session to the initial 22-answer state. The correction pass must preserve correct existing behaviour while fixing the remaining visual/state defects rather than rewriting working logic unnecessarily.
### Known implementation-state distinction
Some latest approved behaviours are already present in current code and should be **preserved**, not reimplemented blindly: 22-question data/session shape, \~180ms answer selected-state before auto-advance, 1200ms Building threshold with automatic Results navigation, single-open Explore state, answer-change invalidation of completed/building state, and Retake initialisation. The post-audit task should verify these behaviours in the rendered build and correct only defects that remain.
### Progress-state bug acceptance criterion
The reported stale-progress defects are not acceptable even where underlying session reset logic appears correct in source. After Retake, the rendered questionnaire progress bar and percentage must visibly start at 0%. After changing an answer from a previously completed assessment, the UI must not continue presenting the old completed-result/progress state as valid; the revised flow must visibly re-enter Building before revised Results.
### No-memory implementation rule
For this correction pass and subsequent MindLens implementation work, do not use remembered historical specifications as authority when the canonical PRD can be read. Memory may help locate a topic, but the current PRD and approved Figma must be checked before issuing concrete implementation values or behaviour requirements.
### Correction-pass stop condition
If Work discovers a material conflict between current Figma, this reconciled PRD and implementation evidence that is not explicitly resolved by the source-of-truth hierarchy, Work must leave that specific item unchanged and report it. Do not infer a new requirement.
### Correction-pass non-goals
Do not make the repository public, publish GitHub Pages, change repository permissions, add accounts/backend/database, add new assessment features, change scoring methodology, introduce new provider listings, or redesign approved screens during this correction pass.
### Final implementation-report requirement
When Work completes the correction pass, require a concise report of shared architecture changes, CSS conflicts removed, components consolidated, screen-specific corrections, responsive corrections, English/Chinese QA, functional regression results, remaining Figma discrepancies, blocked requirements with reasons, and materially changed files. A claimed fix must be backed by rendered-build verification.
### PRD reconciliation state
**READY FOR A NEW POST-AUDIT WORK PROMPT.** The earlier prompt produced before this reconciliation is invalidated.
### Reconciliation provenance
Reconciliation used the canonical Notion PRD plus the completed **MindLens - Visual and Implementation Audit, 14 September 2026** and direct checks of current main-branch implementation areas relevant to disputed behaviour/state. Audit recommendations were not automatically promoted where they would change product behaviour.
### Provider-data protection
Visual/provider-card refactoring must not drop existing official URLs, addresses/coverage data, locale-specific annotations or approved provider names. Provider content is data, not decorative placeholder copy.
### Chinese content protection
Do not rewrite the Simplified Chinese locale wholesale during the visual correction pass. Compare affected keys against their approved English meaning and update only where an approved English/content change has made the existing translation stale or inconsistent. Preserve already-correct Chinese copy.
### Questionnaire progress clarification
The standard in-progress percentage may continue to derive from the number of answered questions for this correction pass. Do not redesign the progress model solely because navigating back can show an earlier question number alongside a high answered percentage. The mandatory fixes are stale state after Retake and stale completed Results after an answer change.
### Architecture-preservation rule
Do not replace working shared components merely because the audit names a possible new component. Introduce/refactor a shared contract only where it removes confirmed duplication/drift or is necessary to reproduce the approved Figma system. Preserve correct existing foundations.
### Figma measurement rule - strict
The approved Figma mobile reference frame is **852 × 1846**. Treat its measurements as design-space proportions. Do not assume 852-frame pixel values are CSS pixels. Use explicit production anchors such as the 20px/500 page-title rule and responsive proportional translation for other dimensions.
### Artwork implementation rule - strict
Approved Figma vector geometry must be retained for the footer/Home waves, Desktop Handoff bottom artwork and distinct Building centre artwork. Motion is applied to approved artwork; motion must not become a substitute for the artwork. Do not approximate these approved shapes with newly invented generic paths when the Figma vectors are available.
### Results shell acceptance criterion
Switching between **Your Result** and **Score** must not change the outer Results page's background, title/header treatment, tab geometry, shared spacing or common action styling. Only tab-specific content changes.
### Home assurance acceptance criterion
Remove the structural min-height/margin cause of excessive assurance spacing rather than compensating with negative margins. Do not preserve height-dependent Home patches that cause the approved Figma composition to drift across device heights.
### CSS correction criterion
Where multiple near-identical literals/selectors represent the same approved visual decision, consolidate them. Page-specific variants remain valid only where Figma intentionally differs. Do not use broad generic teal/violet selectors in ways that couple unrelated components.
### Responsive acceptance criterion
Validate at realistic mobile widths including below 360px. Prevent horizontal overflow, cropped icons/infinity artwork, broken gutters, trait-card overflow, oversized graphics/donut, unintended title wrapping and Chinese tab/control breakage. Do not solve small-screen problems by globally shrinking the approved visual hierarchy.
### Final source rule
For the correction pass, **Section 18 is the canonical reconciliation layer** over older PRD history. After the correction pass is complete and verified, obsolete conflicting historical statements should be cleaned from the PRD in a dedicated documentation consolidation pass so the document no longer needs a supersession layer.
### Current correction-pass authority date
The reconciled implementation requirements in Section 18 are current as of **15 September 2026**.
### Pre-Work gate result
**PASS.** Canonical PRD has been reconciled for the post-audit correction pass. Generate a fresh Work prompt from the verified PRD; do not reuse the earlier draft.
### Documentation hygiene after implementation
After Work's correction report and final QA are accepted, perform a dedicated PRD consolidation that removes superseded historical contradictions from earlier sections while preserving the approved current requirements. Until then, Section 18 explicitly controls conflicts.
### No silent reconciliation
Neither Work nor the assistant may silently choose between conflicting implementation requirements. Apply the documented hierarchy or report the unresolved conflict before changing that item.
### Implementation handoff rule
The Work correction prompt must instruct Work to read the current PRD and approved Figma before editing, use the audit as defect evidence, preserve already-correct logic, implement shared/systemic corrections before local ones, then run rendered visual and functional QA before reporting completion.
### Correction prompt generation status
The new prompt should be materially shorter and safer than the invalidated draft where the PRD already defines behaviour. It should reference the reconciled PRD rather than duplicating large amounts of product copy that could drift again.
### Audit document role
The audit document remains evidence of current implementation defects and likely root causes. It does not replace this PRD and should not be treated as a second competing requirements document.
### Implementation preservation examples
Examples of behaviour to preserve because current code already reflects the approved requirement include: 22-item session shape; answer-change invalidation of `completed`/`buildingStarted`; 1200ms Building threshold and automatic Results navigation; one-open Explore state; Retake initial-session reset; direct locale persistence; and history-based Back restoration. Verify these in the build rather than replacing them merely because they appear in the correction brief.
### Implementation defect examples requiring correction
Examples confirmed by the audit include: Results shell styling tied to `results-your`; scattered/oversized page-title rules; approximate rather than approved wave geometry; incomplete Building artwork; oversized Score donut; incorrect Results graphic overlap geometry; provider-card contract lacking the approved logo composition; excessive Home assurance min-height; footer-influenced overflow cue; and English-fit responsive assumptions affecting Chinese.
### Completion definition
The correction pass is complete only when the architecture cleanup and screen corrections are implemented, the rendered build is compared with every approved Figma state, both locales are checked, the reported progress/revalidation bugs are regression-tested, and remaining discrepancies are explicitly reported.
### Work change-control
Work may modify code/assets required for the approved correction pass but must not modify Figma, alter the PRD, change repository visibility/permissions or introduce unrelated product changes. Any blocked requirement must be reported rather than substituted.
### Repository release note
Public release remains a later explicit decision. Before that step, protect `main`, review collaborator permissions and prefer pull-request review for production changes. Public visibility does not grant public write access to the canonical repository.
### End of post-audit reconciliation
All implementation instructions issued after this point must use the reconciled state above.
</content>
</page>
