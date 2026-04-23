from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
from transformers import pipeline

# 📥 Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

# 🔐 Load Gemini API key securely
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("❌ GEMINI_API_KEY not found in .env file!")

genai.configure(api_key=API_KEY)

# 🧠 Load Gemini model (gemini-flash-latest is stable and fast)
model = genai.GenerativeModel("gemini-flash-latest")

# 🔍 Load sentiment analysis pipeline (runs locally)
print("Loading sentiment analysis model...")
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
print("Sentiment model loaded!")

# 🤖 System instruction for the chatbot
instruction = """
🤖 You are "Need A Friend" 🤗 — a caring, elder-brother type AI mental health companion.

🧠 Core Rules:
- Always respond with warmth, empathy, and deep understanding.
- Maintain conversation context naturally.
- Language-aware: Reply in the SAME language as the user (Hindi, English, Hinglish — match the user's language).
- Never be dismissive or minimize feelings.

Answer length:
- General/casual questions: ~3–5 lines
- Emotional/stress issues: ~8–12 lines
- Serious issues (suicide, self-harm, deep depression): 12–20 lines

For serious issues (suicide, self-harm, deep depression):
- Give deep emotional support and reassurance.
- Suggest talking to family, friends, or a professional counsellor.
- Suggest coping exercises (breathing, meditation, journaling, walking).
- Provide proactive strategies to reduce negative thoughts.
- Always be serious, never use humor.
- Encourage the user to continue sharing feelings.

✅ Crisis detection — If message contains keywords like:
"I want to die", "kill myself", "end my life", "can't go on", "suicide", "self-harm"
→ Respond with extreme care and provide helpline numbers:

📞 Helpline Numbers:
🇮🇳 India: iCall – +91 9152987821 | AASRA – +91-9820466726 | Vandrevala Foundation – 1860-2662-345
🇺🇸 USA: 988 (Suicide & Crisis Lifeline)
🇬🇧 UK: Samaritans – 116 123
Always say: "You are not alone. Help is available. Please reach out."

For financial or life stress:
- Respond empathetically.
- Suggest actionable steps (budgeting, routine building, skill development, etc.)

For mild stress or casual messages:
- Keep it short and warm (1–3 lines).

🛠 If asked "Who made you?" or "Who created you?":
→ "I was created by the amazing team at CodeCrafters 🛠💙"
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
            instruction + "\nUser: " + user_message + "\nFriend:"
        )
        answer = response.text.strip()

        # Sentiment analysis (truncate to 512 chars for model limit)
        truncated = user_message[:512]
        sentiment_result = sentiment_pipeline(truncated)[0]
        sentiment = {
            "label": sentiment_result["label"],
            "score": round(sentiment_result["score"], 2)
        }

        return jsonify({
            "answer": answer,
            "sentiment": sentiment
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
