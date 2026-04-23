from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
import json

# 📥 Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

# 🔐 Load Gemini API key securely
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("❌ GEMINI_API_KEY not found in .env file!")

genai.configure(api_key=API_KEY)

# 🧠 Load Gemini model
model = genai.GenerativeModel("gemini-flash-latest")

# 🤖 System instruction
instruction = """
You are "Need A Friend" 🤗 — a caring, elder-brother type AI mental health companion.
Match user's language (Hindi/English/Hinglish).

CRITICAL: You must always respond in JSON format with two keys:
1. "answer": Your empathetic response (5-10 lines).
2. "sentiment": One word describing user's emotion (POSITIVE, NEGATIVE, or NEUTRAL).
"""

@app.route("/api/chat", methods=["POST"])
def chat():
    print("Received request at /api/chat")
    data = request.json
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"error": "No message received"}), 400

    try:
        # Generate response from Gemini
        response = model.generate_content(
            instruction + "\nUser: " + user_message
        )
        
        try:
            raw_text = response.text.strip().replace("```json", "").replace("```", "")
            res_data = json.loads(raw_text)
            answer = res_data.get("answer", "I'm here for you.")
            sentiment_label = res_data.get("sentiment", "NEUTRAL")
        except:
            answer = response.text.strip()
            sentiment_label = "NEUTRAL"

        return jsonify({
            "answer": answer,
            "sentiment": {
                "label": sentiment_label,
                "score": 1.0
            }
        })

    except Exception as e:
        print("Error in /api/chat:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "WellSpring backend is running 🟢"})

if __name__ == "__main__":
    print("Starting WellSpring backend on http://localhost:5000")
    app.run(debug=True, port=5000)
