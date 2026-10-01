# Work-in-progress validation checkpoint

The accepted backend checkpoint is on `feat/portfolio-modernization`.
This branch preserves the previously prepared UI draft for staged review.
Nothing on this draft branch is a production release.

## Completed checks

- Backend: 27 passing pytest checks, including real FAISS index publication.
- Frontend before final edits: TypeScript build, ESLint, and 4 component/API tests passed.
- Chromium desktop/mobile: the original 12 scenarios passed after fixes; expanded
  coverage exposed focus wrapping and Stop-button resubmission defects, now fixed.
- Six targeted reruns for modal focus, cancellation, and axe checks passed.
- Local single-run Lighthouse measurements and screenshots are in this directory.
  They precede the final edits and are not final release measurements.

## Current merge policy and transition gate

The repository now uses: small scoped branch -> focused tests -> required
regression -> merge -> deploy -> smoke -> human browser check.

The existing `wip/portfolio-ui-draft` predates this rule and already contains
multiple drafted frontend areas. It is a one-time transition package closed at
**Phase 5**, after Phase 2.2, Phase 3, and Phase 4.2 are separately accepted and
the complete merge gate is green. After deployment, a human browser verification
is required before Phase 4.3 or Phase 6 begins from a fresh branch.

The next acceptance checkpoint is **Phase 3 — hero, curated projects, and
responsive layout**.

## Baseline project-data blocker resolved — September 28, 2026

The missing typed project source was reconstructed from reviewed project facts and
is now covered by content/unit tests. Frontend typecheck/build and smoke checks are
green again. The earlier blocker no longer prevents staged frontend acceptance.

## Pending acceptance

- Full Chromium/Firefox/WebKit browser regression remains reserved for PR/main and
  later cross-browser acceptance; the branch-level Chromium regression is green.
- Finish the interrupted font optimization; no local font binaries were saved.
- Firefox/WebKit: local environment launch/dependency limitations prevented acceptance.
- Live Ollama/RAG evaluation, production API URL, real phones, and deployment.
- Review one roadmap subphase at a time before marking it complete.

## Phase 3.1 verification — October 1, 2026

- Baseline `ffc1323395b7e4137c8441d29b5728511dd7f6d2` has successful GitHub
  Actions run `36416650491`; Phase 2.2 remains accepted.
- Fixed repeated selection of the active project category adding duplicate
  browser-history entries; added a component regression test.
- Moved the existing API-offline project scenario into the project regression
  suite and expanded it to cover Hero links, keyboard filters, URL preservation,
  reload, Back/Forward, invalid categories, failed preview images, and details.
- Browser verification is pending CI. Local Chromium installation failed because
  the downloaded archive was invalid; no local browser pass is claimed.
- Local ESLint, 13 frontend unit tests, TypeScript/production build and prerender
  passed. Automatic approval review blocked the GitHub push pending explicit
  user confirmation; this checkpoint is local and no new CI result is claimed.
- Phase 3.2 still requires the six-width responsive and visual review, including
  light/dark composition and content verification. Phase 3 is not accepted yet.
- No merge, production deployment, or later roadmap phase is included in this slice.

## Phase 1.4 accepted — September 25, 2026

- Whitespace-only input shows associated validation errors and focuses the field.
- Editing inputs invalidates the prepared draft immediately.
- Clipboard success is confirmed only after completion; denial exposes a selectable fallback.
- Late clipboard results cannot mark a changed draft as copied.
- Visitor input remains encoded text, never HTML or a network submission.
- Passed: 6 contact component tests and 4 Chromium desktop/mobile browser checks.
- Passed: TypeScript production build, targeted ESLint, and whitespace checks.
- This accepts the email-draft flow, not an automated email-delivery service.
- Other UI subphases remain pending; the production site has not been changed.

## Phase 2.1 accepted — September 25, 2026

- Light, dark, and system preferences persist and follow operating-system changes.
- Invalid saved preferences fall back to system; blocked storage does not prevent switching.
- Theme changes synchronize across tabs; hydration preserves the initial saved theme.
- Browser theme color tracks the active palette; no-JavaScript pages follow system colors.
- Form boundaries exceed 3:1 contrast against their adjacent surfaces in both palettes.
- Passed: 12 desktop/mobile Chromium theme checks, including axe WCAG A/AA scans.
- Passed: ESLint, TypeScript production build, and whitespace checks.
- Reviewed desktop dark and mobile light screenshots with visible validation errors.
- Firefox/WebKit and final release checks remain pending under Phase 7.1.


## Phase 2.2 accepted — September 28, 2026

- The left navigation is a native modal dialog with a full-screen overlay and an
  inner touch-friendly drawer panel.
- Escape, the close button, backdrop interaction, and section selection close the
  drawer through explicit dismiss/navigation paths.
- Keyboard focus is trapped inside the open modal. Dismissal restores focus to the
  Menu trigger without scrolling the page; section navigation transfers focus to
  the selected section.
- Section navigation preserves stable anchors and synchronizes
  `aria-current="location"` with explicit navigation and normal page scrolling.
- The active-section scroll spy is frozen while the modal is opening/open so modal
  focus behavior cannot overwrite the current page section.
- Body scroll is locked while the drawer is open and released before navigation.
- The drawer remains usable after a 390x844 resize and respects safe-area/dynamic
  viewport sizing.
- Opening the drawer closes the chat modal while preserving the visitor's chat
  draft, maintaining one modal owner at a time.
- Reduced-motion mode disables the drawer animation, and automated axe WCAG A/AA
  checks report no violations in the drawer scenario.
- Accepted implementation checkpoint:
  `f4f5ed496a2561b3c70333360a781436cd25c6a6`.
- GitHub Actions run `36416335520`: frontend passed, backend passed, smoke passed,
  and branch Chromium regression passed **10/10**. The PR/main multi-browser job
  was intentionally skipped by branch policy.
- This accepts Phase 2.2 only. The WIP branch is not ready to merge or deploy until
  Phase 3, Phase 4.2, Phase 5, and Merge Gate A are completed.
