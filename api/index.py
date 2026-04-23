from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
import json
import re

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# API Configuration
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-flash-latest")

# Robust JSON extraction
def extract_json(text):
    try:
        # Try finding JSON block
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return json.loads(match.group())
        return json.loads(text)
    except:
        return None

instruction = """
You are "Need A Friend" 🤗 — a caring, elder-brother type AI mental health companion.
Match user's language (Hindi/English/Hinglish).

RESPONSE FORMAT:
You MUST respond with a valid JSON object.
{
  "answer": "your_empathetic_response",
  "sentiment": "POSITIVE/NEGATIVE/NEUTRAL"
}
"""

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"error": "No message received"}), 400

    if not API_KEY:
        return jsonify({"error": "Backend API Key missing. Please set GEMINI_API_KEY in Vercel environment variables."}), 500

    try:
        response = model.generate_content(instruction + "\nUser: " + user_message)
        
        # Try to extract JSON
        res_data = extract_json(response.text)
        
        if res_data and "answer" in res_data:
            answer = res_data["answer"]
            sentiment_label = res_data.get("sentiment", "NEUTRAL")
        else:
            # Fallback for plain text
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

# Export app
app = app
