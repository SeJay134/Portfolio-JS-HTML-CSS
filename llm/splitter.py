# llm/splitter.py

def split_text(docs, chunk_size=30, overlap=10):
    chunks = []

    for doc in docs:
        doc_id = doc["id"]
        text = doc["text"]

        start = 0
        text_length = len(text)

        while start < text_length:
            end = start + chunk_size
            chunk_text = text[start:end]

            chunks.append({
                "id": f"{doc_id}_chunk_{start}",
                "doc_id": doc_id,
                "text": chunk_text.strip(),
            })

            start = end - overlap

    return chunks