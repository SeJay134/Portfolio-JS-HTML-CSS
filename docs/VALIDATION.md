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

The next acceptance checkpoint is **Phase 2.2 — accessible left drawer**.

## CI baseline blocker discovered — September 25, 2026

After centralizing the test architecture, branch CI exposed a pre-existing
frontend build break: `src/components/Projects.tsx` imports
`../data/projects`, but `src/data/projects.ts` is absent from the current WIP
branch and earlier checked repository checkpoints.

Observed on GitHub Actions:
- backend unit/integration job: passed;
- npm install and ESLint: passed;
- frontend typecheck/build: failed on missing `src/data/projects.ts`;
- smoke could not run because the production build failed;
- full browser regression is intentionally reserved for PR/main by the new policy.

Do not invent project records merely to make CI green. Reconstruct the typed
project source from reviewed repository/public project facts, add its unit/content
coverage, then rerun the full Phase 2.2 prerequisite gate. No merge/deploy is
allowed while this blocker remains.

## Pending acceptance

- Rebuild and rerun the complete expanded browser suite on this exact checkpoint.
- Finish the interrupted font optimization; no local font binaries were saved.
- Firefox/WebKit: local environment launch/dependency limitations prevented acceptance.
- Live Ollama/RAG evaluation, production API URL, real phones, and deployment.
- Review one roadmap subphase at a time before marking it complete.

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
