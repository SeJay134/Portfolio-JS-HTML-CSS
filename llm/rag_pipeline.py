# llm/rag_pipeline.py

from llm.retriever import retrieve
from llm.formatter import build_context
from llm.app import chat

def run_rag(query):
    chunks = retrieve(query)
    context = build_context(chunks)

    if not chunks:
        return chat(f"No context found. Answer directly.\n\nQuestion: {query}")
    
    system = (
    "You are a helpful assistant. "
    "Use ONLY the provided context. "
    "If the answer is not in the context, say 'Not found in base'."
)
    prompt = f"{system}\n\n---\n\n{context}\n\nQuestion: {query}"

    return chat(prompt)
