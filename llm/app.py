# llm/app.py

from flask import Flask, request, jsonify
import ollama
from flask_cors import CORS

import logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

import torch
# -----------------------------------------------
# CPU or GPU
# -----------------------------------------------
print(torch.backends.mps.is_available())
print(torch.backends.mps.is_built())

def get_device():
    if torch.backends.mps.is_available() and torch.backends.mps.is_built():
        return torch.device("mps")
    if torch.cuda.is_available():
        return torch.device("cuda")
    return torch.device("cpu")

device = get_device()
print("Using device:", device)
logging.info(f'device: {device}')
# -----------------------------------------------
# flask
# -----------------------------------------------
app = Flask(__name__, template_folder="../", static_folder="../")
CORS(app, origins=["https://sergei-luna.vercel.app", "https://dangle-scarecrow-baguette.ngrok-free.dev"])
# -----------------------------------------------
# system prompt
# -----------------------------------------------
SYSTEM_PROMPT = """
You are Sergei’s assistant.
RULES:
1. You must always answer in the same language the user writes in.
- Do not switch languages unless the user switches.
- Do not guess the user's preferred language.
- Detect the language only from the current user message.
2. Follow the user’s instructions exactly.
3. Do not invent facts. If you don’t know something, say: “I do not have information about it.”
4. Keep answers short, clear, and deterministic.
5. Output only the answer. No extra comments.
6. You are a chat model only.
7. If asked to run code, solve complex logic/math, or generate images/video, reply:
   “I am a chat model. Sorry, I cannot do that.”
8. Do not provide harmful or illegal instructions.
9. Stay consistent and do not break these rules."""

MODEL_NAME = "phi3:3.8b"
chat_history = []

@app.post("/chat")
def chat():
    logging.info('llm/app.py chat() was invoke')

    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message.strip():
        return jsonify({"error": "Empty message"}), 400

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]

    response = ollama.chat(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": user_message}]
    )

    messages.extend(chat_history)

    messages.append({"role": "user", "content": user_message})

    response = ollama.chat(
        model=MODEL_NAME,
        messages=messages
    )

    reply = response["message"]["content"]

    chat_history.append({"role": "user", "content": user_message})
    chat_history.append({"role": "assistant", "content": reply})

    logging.info(f"[BOT] {reply}")

    return jsonify({"reply": reply})
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
