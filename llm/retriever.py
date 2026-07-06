# llm/retriever.py

import numpy as np
from llm.vector_store import load_index
from llm.embedder import model

def retrieve(query, top_k=3):
    index, chunks = load_index()  # load fresh index
    q_emb = model.encode([query], convert_to_numpy=True)
    distances, ids = index.search(q_emb, top_k)

    results = []
    for i, dist in zip(ids[0], distances[0]):
        results.append({
            "id": chunks[i]["id"],
            "doc_id": chunks[i]["doc_id"],
            "text": chunks[i]["text"],
            "score": float(dist),
        })

    return results