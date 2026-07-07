# llm/router.py

from llm.retriever import retrieve
from llm.embedder import model
import numpy as np

THRESHOLD = 0.55   # set

def needs_rag(user_message: str) -> bool:
    """
    Semantic router: take a decision, use or no RAG.
    """
    # get embedding query
    query_emb = model.encode([user_message], convert_to_numpy=True)[0]

    # get top-1 relevant chunk
    chunks = retrieve(user_message, top_k=1)

    if not chunks:
        return False
    
    chunk_emb = model.encode([chunks[0]["text"]], convert_to_numpy=True)[0]

    
    

    # how it is close
    sim = cosine_similarity(query_emb, chunk_emb)

    return sim > THRESHOLD


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
