from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
from transformers import pipeline

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

# API Configuration
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-flash-latest")

# Lazy load sentiment analysis to stay within Vercel limits if possible
# Note: This might still exceed Vercel size limits.
sentiment_pipeline = None

def get_sentiment_pipeline():
    global sentiment_pipeline
    if sentiment_pipeline is None:
        sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
    return sentiment_pipeline

instruction = """
🤖 You are "Need A Friend" 🤗 — a caring, elder-brother type AI mental health companion.
Answer length: ~5-10 lines. Match user's language.
If asked "Who made you?": "I was created by the amazing team at CodeCrafters 🛠💙"
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
            instruction + "\nUser: " + user_message + "\nFriend:"
        )
        answer = response.text.strip()

        # Sentiment analysis
        pipe = get_sentiment_pipeline()
        sentiment_result = pipe(user_message[:512])[0]
        sentiment = {
            "label": sentiment_result["label"],
            "score": round(sentiment_result["score"], 2)
        }

        return jsonify({
            "answer": answer,
            "sentiment": sentiment
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "WellSpring backend is running 🟢"})

# For Vercel, we need to export the app
app = app
