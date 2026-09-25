# Sergei Patrushev — Portfolio

A React/TypeScript portfolio with a left navigation drawer, curated projects,
light/dark themes, an optional Three.js scene, and a separate Flask/Ollama RAG API.
Public portfolio content is prerendered at build time. Chat and 3D are lazy-loaded.

Progress: [ROADMAP.md](ROADMAP.md). Full proposal: [improvements.txt](improvements.txt).
Validation and outstanding release gates: [docs/VALIDATION.md](docs/VALIDATION.md).

## Frontend

Use Node 22.12+ (Node 24 is also supported).

```bash
npm ci
cp .env.example .env
npm run dev
```

Open `http://localhost:5001`. Vite proxies `/api` to Flask at `127.0.0.1:5002`.
Both localhost and 127.0.0.1 work. Do not use `python -m http.server` for the React
source tree. For a production build:

```bash
npm run build
npm run preview
```

The preview runs on port 4173 and does not include the development API proxy.
Set `VITE_API_BASE_URL` before building to connect preview/production chat to a
backend. Without a configured production backend, portfolio content and contact
still work and chat displays an unavailable state. `VITE_*` values are public.

## Backend

Use Python 3.11 or 3.12. The application can start without model dependencies or
an index; `/health` remains available and `/ready` reports unavailable until the
model and evidence index are configured.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements-rag.txt
ollama pull qwen2.5:7b
python -m llm.indexer
python -m llm.app
```

On Windows activate with `.venv\Scripts\activate`. Ollama must be running.
Indexing downloads the embedding model on first use. The generated FAISS index
and JSON metadata live in `data/embeddings`, outside the frontend public tree.
`content/knowledge.json` is the versioned knowledge source. After editing it,
rebuild the index and restart backend workers to load the new version. Publication
uses a manifest pointing to a complete index/metadata pair. Old generations are
retained so active readers are not broken; clean them during maintenance after
workers have restarted. The indexer returns a nonzero exit code on failure.

Development tunneling, when needed:

```bash
ngrok http 5002
```

Set `VITE_API_BASE_URL` to the tunnel's HTTPS base URL, without `/chat`, and rebuild.
Use `FRONTEND_URLS` for the actual frontend origins. A tunnel is not production
hosting. The Flask development server listens on loopback by default.

## API contract

- `GET /health`: process liveness; no model loading.
- `GET /ready`: model/index availability; short cached Ollama check.
- `POST /chat`: `{ "message": "What projects has Sergei built?" }`.
- Success: `{ "reply": "...", "sources": [], "request_id": "..." }`.
- Failure: JSON `error` and `request_id`, with 400/413/429/503 status.
- Maximum message: 300 Unicode code points after trimming. Maximum body: 16 KiB.
- Every request is independent. No history, visitor session, or transcript is
  stored by the server. UI history exists only in the current page's memory.
- Stop cancels the browser request, not necessarily backend generation. The
  backend timeout/concurrency limit bounds remaining work.
- The assistant always uses the same grounding policy. The inherited retrieval
  distance threshold is provisional until the live evaluation set is reviewed.

## Contact and content

Contact prepares a `mailto:` draft. It never claims a message has been delivered.
The visitor opens their email app and sends it themselves; a Copy draft fallback
is available. No visitor messages are displayed publicly or posted to this server.
A direct email-delivery service is a future integration requiring provider setup.

Project content: `src/data/projects.ts`. Project screenshots are local assets
from the linked repositories; the portrait is from this repository. Do not invent
outcome metrics or skills. Keep `content/knowledge.json` consistent with public
content. No resume is linked until a reviewed resume file exists.

## Tests

```bash
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install --with-deps chromium firefox webkit
npm run test:e2e
pip install -r requirements-dev.txt
python -m pytest -q
```

Browser tests cover desktop Chromium/Firefox/WebKit and an emulated iPhone,
including drawer focus, themes, contact, chat errors/retries, responsive overflow,
and automated axe checks. Emulation is not a physical-device certification.
API tests inject a fake model; they do not download or execute Ollama.

Optional real-index tests require `faiss-cpu` and NumPy. Live RAG evaluation:

```bash
python scripts/evaluate_chat.py --base-url http://127.0.0.1:5002 --output /tmp/rag-evaluation.json
```

The runner waits between questions to respect the default rate limit and records
latency/answers for manual factual review. It does not automatically certify
accuracy. Inspect the evidence record IDs and expected behaviors in the dataset.

## Deployment and rollback

Vercel uses `vercel.json`, `npm run build`, and `dist`. Configure the stable HTTPS
`VITE_API_BASE_URL` in the deployment environment. The frontend does not host
Ollama or proxy production traffic by default.

On a trusted backend host, set production origins and Redis rate-limit storage:

```bash
export RATELIMIT_STORAGE_URI=redis://localhost:6379/0
export FRONTEND_URLS=https://sergei-luna.vercel.app
.venv/bin/gunicorn --workers 1 --threads 4 --timeout 90 --bind 127.0.0.1:5002 llm.app:app
```

Terminate HTTPS at a reverse proxy and keep Ollama private. The generation gate
is per worker; start with one worker to cap local model concurrency. Redis shares
rate limits, not the generation gate. Configure trusted proxy/IP handling at the
hosting layer; do not blindly trust forwarded headers from public clients.
Readiness verifies an index and installed model, not successful inference on every
request. Cold embedding initialization can take longer than warm inference.

Deploy a preview and run smoke checks before merging to the production branch.
The earlier site is preserved in git at `bcc8afbc1c4e2ecbe4bacde8084beeba981bc172`.
Roll back by restoring the prior deployment; keep API compatibility during a
frontend transition. This implementation intentionally does not publish production.
