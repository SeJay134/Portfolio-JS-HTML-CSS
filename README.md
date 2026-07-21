
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
 - formatter.py           # Builds final prompt for model
 - validator.py           # Validates user input
 - indexer.py             # Builds FAISS index
 - watcher.py             # Auto-reloads index on rag_text.txt change
 - rag_text.txt           # Your biography + project descriptions
 - dec_logging.py         # decorator for logging

data/
 - base             # data for embbedings
 - embeddings       # embedded data

README.md



workflow without RAG
- user
- app.py            # get request
- validator.py      # checking user's message
- router.py         # RAG or Chat, desiscion
- app.py            # run_chat_model
- ollama model      # recievs SYSTEM_PROMPT, chat_history, user_message
- app.py            # add answer to chat_history, JSON
- user


workflow with RAG
1. app.py
2. validator.py
3. router.py
4. rag_pipeline.py
5. retriever.py
6. vector_store.py (FAISS)
7. formatter.py
8. Ollama
9. rag_pipeline.py
10. app.py
11. Ответ пользователю