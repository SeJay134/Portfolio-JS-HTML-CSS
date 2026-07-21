

# from llm.retriever import retrieve
# from llm.embedder import model
# import numpy as np

# def needs_rag(user_message: str) -> bool:
#     text = user_message.lower()

#     # 1. Keyword trigger
#     keywords = [
#     "sergei",
#     "resume",
#     "cv",
#     "portfolio",
#     "experience",
#     "project",
#     "projects",
#     "skills",
#     "education",
#     "work history",
#     "employment",
#     "code the dream",
#     "javascript",
#     "react",
#     ]
#     if any(k in text for k in keywords):
#         return True

#     # 2. Length trigger
#     if len(text.split()) >= 4:
#         return True

#     # 3. Embedding similarity trigger
#     query_emb = model.encode([user_message], convert_to_numpy=True)[0]
#     chunks = retrieve(user_message, top_k=1)

#     if not chunks:
#         return False

#     chunk_emb = model.encode([chunks[0]["text"]], convert_to_numpy=True)[0]
#     sim = cosine_similarity(query_emb, chunk_emb)

#     print("SIM:", sim)

#     return sim > 0.65

# def cosine_similarity(a, b):
#     return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


# llm/router.py
import logging
from llm.dec_logging import logger

class Router:

    def __init__(self, retriever):
        self.keywords = [
            "sergei", "resume", "cv", "portfolio", "experience", "project", "projects", "skills", "education",
            "work history", "employment", "code the dream", "javascript", "react",
        ]
        self.threshold = 0.55
        self.retriever = retriever
    @logger
    def needs_rag(self, message):
        text = message.lower().strip()

        # 1. Ключевые слова → RAG
        if any(k in text for k in self.keywords):
            logging.info("Router: keyword match -> RAG")
            return True
        
        # 2. Retriever score → RAG
        chunks = self.retriever.retrieve(message, top_k=1)

        if not chunks:
            return False
        
        score = chunks[0]["score"]

        logging.info(
            "Router score=%s threshold=%s",
            score,
            self.threshold
        )

        return score < self.threshold

