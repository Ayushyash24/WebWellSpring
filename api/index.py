from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

# API Configuration
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-flash-latest")

# 🤖 System instruction (Prompt updated to handle sentiment)
instruction = """
You are "Need A Friend" 🤗 — a caring, elder-brother type AI mental health companion.
Match user's language (Hindi/English/Hinglish).

CRITICAL: You must always respond in JSON format with two keys:
1. "answer": Your empathetic response (5-10 lines).
2. "sentiment": One word describing user's emotion (POSITIVE, NEGATIVE, or NEUTRAL).

Example format:
{
  "answer": "I hear you, and it's okay to feel this way...",
  "sentiment": "NEGATIVE"
}
"""

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"error": "No message received"}), 400

    try:
        # Generate response from Gemini
        response = model.generate_content(
            instruction + "\nUser: " + user_message
        )
        
        # Parse JSON from Gemini response
        try:
            # Remove any markdown code block formatting if Gemini adds it
            raw_text = response.text.strip().replace("```json", "").replace("```", "")
            res_data = json.loads(raw_text)
            answer = res_data.get("answer", "I'm here for you.")
            sentiment_label = res_data.get("sentiment", "NEUTRAL")
        except:
            # Fallback if JSON parsing fails
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
        return jsonify({"error": str(e)}), 500

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "WellSpring backend is running 🟢"})

app = app
