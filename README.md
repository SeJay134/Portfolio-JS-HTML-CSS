# Sergei Patrushev — Portfolio

Portfolio modernization is being completed in separately reviewed stages.
Progress: [ROADMAP.md](ROADMAP.md). Proposal: [improvements.txt](improvements.txt).

The current frontend in this backend checkpoint remains the original static site.
The React redesign is a separate work-in-progress checkpoint, not a production release.

## Backend checkpoint

Flask now uses independent chat requests instead of shared visitor history.
Requests have strict JSON/type/size validation, JSON errors, request identifiers,
rate limits, and a per-process generation concurrency limit. Importing the API
never loads the model or index. `/health` works before the model is configured.

Use Python 3.11 or 3.12:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements-rag.txt
cp .env.example .env
ollama pull qwen2.5:7b
python -m llm.indexer
python -m llm.app
```

On Windows, activate with `.venv\Scripts\activate`. Ollama must be running.
The API listens at `http://127.0.0.1:5002`. Development tunneling uses
`ngrok http 5002`. The legacy frontend can use `python -m http.server 5001`;
its existing `js/config.js` controls its API URL until the frontend migration.

`content/knowledge.json` is the versioned evidence source. Indexing downloads
all-MiniLM-L6-v2 on first use and writes a versioned FAISS index plus JSON metadata
into `data/embeddings`. After editing evidence, rebuild the index and restart
workers. A manifest atomically publishes the complete pair. Previous generations
remain available to existing readers; remove them during planned maintenance.

## API

- `GET /health`: liveness without model loading.
- `GET /ready`: index/model readiness; unavailable returns 503.
- `POST /chat`: JSON `{ "message": "What projects has Sergei built?" }`.
- Success: `reply`, `sources`, and `request_id`.
- Errors: JSON `error` and `request_id`, with 400/413/429/503 status.
- Limit: 300 Unicode code points after trimming, 16 KiB request body.
- No server-side conversation history or visitor sessions are stored.
- Browser cancellation does not guarantee cancellation of model computation.

Configure origins with `FRONTEND_URLS`, model timeout with `MODEL_TIMEOUT`, and
concurrent generations with `MAX_GENERATIONS`. The generation gate is per worker.
Use Redis via `RATELIMIT_STORAGE_URI` for production/shared rate limits. Keep
Ollama private and configure trusted proxy/client-IP handling at the hosting layer.
The inherited RAG distance threshold is provisional until live evaluation.

## Validation

```bash
pip install -r requirements-dev.txt
python -m pytest -q
```

27 tests passed on September 25, 2026: input validation, independent visitors,
request IDs, model failures, generation concurrency, rate limiting, CORS, retrieval
sentinels, grounded model requests, and real FAISS index publication/validation.
Model calls are mocked; these tests do not certify live answer quality or latency.

The live evaluation set contains 35 English/Russian questions. With the configured
backend running:

```bash
python scripts/evaluate_chat.py --base-url http://127.0.0.1:5002 --output /tmp/rag-evaluation.json
```

The runner respects the default rate limit and records answers for manual review.
Live Ollama evaluation, production configuration, and rollout remain pending.
