# llm/flaskback.py

# reciev request from flaskfront.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama   # LLM library

import logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

app = Flask(__name__)
CORS(app)

@app.post("/llm")
def llm():
    logging.info('llm/flaskback.py llm() was invoked')
    data = request.get_json()
    user_message = data.get("message", "")

    # LLM call
    response = ollama.chat(
        model="phi3:3.8b",
        messages=[{"role": "user", "content": user_message}]
    )

    return jsonify({"reply": response["message"]["content"]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
