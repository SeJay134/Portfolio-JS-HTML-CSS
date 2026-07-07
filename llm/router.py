# llm/router.py

from retriever import get_relevant_chunks
from embedder import embed_text
import numpy as np

THRESHOLD = 0.55   # set

def needs_rag(user_message: str) -> bool:
    """
    Semantic router: take a decision, use or no RAG.
    """
    # get embedding query
    query_emb = embed_text(user_message)

    # get top-1 relevant chunk
    chunks = get_relevant_chunks(user_message, top_k=1)

    if not chunks:
        return False

    # take embedding chunk
    chunk_emb = chunks[0]["embedding"]

    # how it is close
    sim = cosine_similarity(query_emb, chunk_emb)

    return sim > THRESHOLD


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
