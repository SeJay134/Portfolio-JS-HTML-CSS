# llm/router.py

from llm.retriever import retrieve
from llm.embedder import model
import numpy as np

def needs_rag(user_message: str) -> bool:
    text = user_message.lower()

    # 1. Keyword trigger
    keywords = [
        "sergei", "portfolio", "project", "experience",
        "skills", "background", "courses", "python",
        "javascript", "mentor", "code the dream",
        "it technician", "qc technician"
    ]
    if any(k in text for k in keywords):
        return True

    # 2. Length trigger
    if len(text.split()) >= 4:
        return True

    # 3. Embedding similarity trigger
    query_emb = model.encode([user_message], convert_to_numpy=True)[0]
    chunks = retrieve(user_message, top_k=1)

    if not chunks:
        return False

    chunk_emb = model.encode([chunks[0]["text"]], convert_to_numpy=True)[0]
    sim = cosine_similarity(query_emb, chunk_emb)

    print("SIM:", sim)

    return sim > 0.35

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
