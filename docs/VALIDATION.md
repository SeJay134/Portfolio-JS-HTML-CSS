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
