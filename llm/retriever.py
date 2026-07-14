# llm/retriever.py

# import numpy as np
# from llm.vector_store import load_index
# from llm.embedder import model

# def retrieve(query, top_k=3):
#     index, chunks = load_index()  # load fresh index
#     q_emb = model.encode([query], convert_to_numpy=True)
#     distances, ids = index.search(q_emb, top_k)

#     results = []
#     for i, dist in zip(ids[0], distances[0]):
#         results.append({
#             "id": chunks[i]["id"],
#             "doc_id": chunks[i]["doc_id"],
#             "text": chunks[i]["text"],
#             "score": float(dist),
#         })

#     return results


# llm/retriever.py
import numpy as np
from llm.vector_store import load_index
from llm.embedder import model
class Retriever:
    def __init__(self):
        self.index, self.chunks = load_index()

    def retrieve(self, query, top_k=1):
        q_emb = model.encode([query], convert_to_numpy=True) # Кодирует запрос
        distances, ids = self.index.search(q_emb, top_k) # Ищет похожие embeddings

        results = []
        for i, dist in zip(ids[0], distances[0]):
            chunk = self.chunks[i] # Собирает результаты
            results.append({
                "id": chunk["id"],
                "doc_id": chunk["doc_id"],
                "text": chunk["text"],
                "score": float(dist),
        })

        return results # возвращает список:
# [
#     {"text": "...", "score": 0.78},
#     ...
# ]

