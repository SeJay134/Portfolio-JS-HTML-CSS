# Portfolio Roadmap

## Accepted checkpoints

- [x] Phase 0.1 — Repository review and baseline
- [x] Phase 0.2 — Reproducible backend setup
- [x] Phase 1.1 — Stateless chat and strict request validation
- [x] Phase 1.2 — Error handling, rate limits, and generation limits
- [x] Phase 1.3 — Backend regression tests: 27 passed
- [x] Phase 1.4 — Safe contact flow acceptance
- [x] Phase 2.1 — Design tokens and themes acceptance
- [x] Phase 2.2 — Accessible left drawer acceptance
- [x] Phase 4.1 — Grounded service and atomic index infrastructure

## Current transitional frontend package

The earlier project-data baseline blocker is resolved: the reviewed typed project
source and its content tests are present, and the Phase 2.2 branch gate is green.

- [ ] Phase 3 — Hero, curated projects, and responsive layout acceptance
  - [x] Phase 3.1 — Hero links and project filter/navigation contracts
  - [x] Phase 3.2 — Responsive composition, content review, and visual acceptance
    - Accepted at `77ade3e65e11343e4ca39745c4d1cd133c65da71`
    - CI: https://github.com/SeJay134/Portfolio-JS-HTML-CSS-AI/actions/runs/36924237503
  - [x] Phase 3.3 — Live GitHub project metrics deferred for this release
    - Curated local project data remains the source of truth.
    - Stars/updatedAt can be revisited later if they add useful visitor context.
  - [x] Phase 3.4 — Project preview asset acceptance
    - Accepted at `b3104242a24524ba195af49869a760ae533b9d73`
    - Push CI: https://github.com/SeJay134/Portfolio-JS-HTML-CSS-AI/actions/runs/37002056738
    - Full PR browser regression: https://github.com/SeJay134/Portfolio-JS-HTML-CSS-AI/actions/runs/37002059708
    - Controlled 16:10 previews use local WebP assets, lazy loading,
      meaningful alt text, and a graceful fallback when an image cannot load.
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
