# llm/app.py

from flask import Flask, request, jsonify
import ollama
from flask_cors import CORS
import logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

app = Flask(__name__, template_folder="../", static_folder="../")
CORS(app, origins=["https://sergei-luna.vercel.app"])

MODEL_NAME = "phi3:3.8b"

@app.post("/chat")
def chat():
    logging.info('llm/app.py chat() was invoke')
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message.strip():
        return jsonify({"error": "Empty message"}), 400

    response = ollama.chat(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": user_message}]
    )

    reply = response["message"]["content"]
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
