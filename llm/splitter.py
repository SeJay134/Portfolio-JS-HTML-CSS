# llm/splitter.py

def split_text(docs, chunk_size=500, overlap=50):
    chunks = []
    for doc in docs:
        doc_id = doc["id"]
        words = doc["text"].split()

        for i in range(0, len(words), chunk_size - overlap):
            chunk_text = " ".join(words[i:i + chunk_size])
            chunks.append({
                "id": f"{doc_id}_chunk_{i}",
                "doc_id": doc_id,
                "text": chunk_text,
            })

    return chunks