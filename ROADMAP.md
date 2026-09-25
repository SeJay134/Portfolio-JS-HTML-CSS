# Portfolio Roadmap

## Accepted checkpoints

- [x] Phase 0.1 — Repository review and baseline
- [x] Phase 0.2 — Reproducible backend setup
- [x] Phase 1.1 — Stateless chat and strict request validation
- [x] Phase 1.2 — Error handling, rate limits, and generation limits
- [x] Phase 1.3 — Backend regression tests: 27 passed
- [x] Phase 1.4 — Safe contact flow acceptance
- [x] Phase 2.1 — Design tokens and themes acceptance
- [x] Phase 4.1 — Grounded service and atomic index infrastructure

## Current transitional frontend package

**Baseline blocker discovered by CI:** `src/components/Projects.tsx` imports
`src/data/projects.ts`, but that file is not present in the current or earlier
repository checkpoints. Production build/typecheck is therefore red. Resolve this
from reviewed project data before Phase 2.2 can receive final browser acceptance.
This is a baseline repair, not new Phase 2.2 feature scope.


- [ ] Phase 2.2 — Accessible left drawer acceptance (NEXT)
- [ ] Phase 3 — Hero, curated projects, and responsive layout acceptance
- [ ] Phase 4.2 — Chat UI acceptance
- [ ] Phase 5 — Frontend architecture and tooling acceptance
- [ ] Merge Gate A — full tests -> merge main -> deploy -> smoke -> human browser verification

Phase 5 closes the existing `wip/portfolio-ui-draft` transition package. This is a
one-time exception because that branch already contains multiple drafted frontend
areas. After Merge Gate A, new work uses one short-lived branch per subphase/change.

## Independent follow-up releases

- [ ] Phase 4.3 — Live RAG evaluation and production backend
- [ ] Phase 6 — Optional Three.js scene/effects
- [ ] Phase 7.1 — Final cross-browser, accessibility, and performance checks
- [ ] Phase 7.2 — Real-device checks and final production release hardening

## Required close-out for every future slice

Implementation -> focused tests -> required regression -> production build/preview
smoke -> merge -> deploy -> post-deploy smoke -> human browser check -> close slice.
The next feature branch starts only after the deployed release is verified.
