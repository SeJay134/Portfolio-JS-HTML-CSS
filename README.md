
Portfolio project
Sergei Patrushev

A lightweight local LLM chatbot powered by qwen2.5:7b and a minimal RAG pipeline, designed to answer questions about me and my projects.
Frontend runs on Vercel, backend runs locally or on a private server.

structure of chat bot


index.html                 # Main portfolio page + chat widget

css/
 - index.css              # Styles for portfolio sections
 - chat.css               # Styles for chat widget

js/
 - index.js               # Portfolio scripts (projects, animations)
 - chat.js                # Chat widget logic (UI + fetch to Flask)

llm/
 - app.py                 # Main LLM server (Model + RAG + router)
 - rag_pipeline.py        # Orchestrates RAG steps
 - loader.py              # Loads rag_text.txt
 - splitter.py            # Splits text into chunks
 - embedder.py            # Embeddings (sentence-transformers or Ollama)
 - vector_store.py        # FAISS vector storage
 - retriever.py           # Retrieves relevant chunks
 - formatter.py           # Builds final prompt for Phi-3
 - validator.py           # Validates user input
 - indexer.py             # Builds FAISS index
 - watcher.py             # Auto-reloads index on rag_text.txt change
 - rag_text.txt           # Your biography + project descriptions

data/
 - base             # data for embbedings
 - embeddings       # embedded data

README.md