# llm/flaskfront.py

# recieved request http from https://sergei-luna.vercel.app/
# send request to backand llm/flaskback.py

from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

import logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

app = Flask(__name__)
CORS(app, origins=["https://sergei-luna.vercel.app"])

LLM_BACKEND_URL = "http://127.0.0.1:5001/llm"   # flaskback.py

@app.post("/api/chat")
def chat():
    logging.info('llm/flaskfront chat() was invoked')
    data = request.get_json()

    # forward to backend
    try:
        llm_response = requests.post(LLM_BACKEND_URL, json=data, timeout=60)
        llm_response.raise_for_status()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(llm_response.json())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
