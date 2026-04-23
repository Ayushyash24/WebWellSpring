import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Bot, User, Mic, MicOff } from 'lucide-react';

// TypeScript global declaration for SpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  mood?: string;
}

// 🔍 Simple mood detector
function detectMood(text: string): string {
  const t = text.toLowerCase();
  if (
    t.includes('suicide') || t.includes('kill myself') ||
    t.includes('end my life') || t.includes('want to die') ||
    t.includes('can\'t go on') || t.includes('worthless')
  ) return 'crisis';
  if (t.includes('depress') || t.includes('hopeless') || t.includes('self-harm')) return 'severe';
  if (t.includes('sad') || t.includes('lonely') || t.includes('anxious') || t.includes('stressed') || t.includes('worried')) return 'low';
  if (t.includes('happy') || t.includes('great') || t.includes('excited') || t.includes('good')) return 'positive';
  return 'neutral';
}

function getMoodEmoji(mood: string): string {
  switch (mood) {
    case 'crisis': return '🆘';
    case 'severe': return '💙';
    case 'low': return '🤗';
    case 'positive': return '😊';
    default: return '💬';
  }
}

const SYSTEM_INSTRUCTION = `You are "Need A Friend" 🤗 — a caring, empathetic AI mental health companion like an elder brother/sister.

Core Rules:
- Always respond with warmth, empathy, and deep understanding
- Reply in the SAME language as the user (Hindi, English, Hinglish — match exactly)
- Never be dismissive or minimize feelings
- Maintain conversation context naturally

Response length:
- Casual/general: 3–5 lines
- Stress/emotional: 8–12 lines  
- Crisis (suicide/self-harm/deep depression): 15–20 lines with helpline numbers

For serious issues: Give deep emotional support, suggest professional help, coping exercises (breathing, meditation, journaling), and motivational resources.

Crisis helplines to mention when needed:
🇮🇳 India: iCall – +91 9152987821 | AASRA – +91-9820466726
🇺🇸 USA: 988 (Suicide & Crisis Lifeline)
🇬🇧 UK: Samaritans – 116 123

If asked "Who made you?": Say "I was created by the amazing team at CodeCrafters 🛠💙"`;

const BACKEND_URL = 'http://127.0.0.1:5000/api/chat';

// Call Local Backend
async function callChatbot(userText: string): Promise<string> {
  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userText }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.answer || "I'm here for you. Could you tell me more?";
}

const ChatbotAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm \"Need A Friend\" 🤗\n\nI'm here to support you on your wellness journey. You can talk to me in Hindi, English, or Hinglish — whatever feels comfortable. How are you feeling today?",
      timestamp: new Date(),
      mood: 'neutral',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: string; parts: { text: string }[] }[]>([]);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    const mood = detectMood(userText);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userText,
      timestamp: new Date(),
      mood,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Crisis: instant local response + Gemini response
    if (mood === 'crisis') {
      const crisisMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: '🆘 I hear you, and I want you to know — you are NOT alone.\n\nPlease reach out immediately:\n🇮🇳 iCall: +91 9152987821\n🇮🇳 AASRA: +91-9820466726\n🇺🇸 USA: 988\n🇬🇧 UK: 116 123\n\nYour life has immense value. Please keep talking to me — I\'m here with you. 💙',
        timestamp: new Date(),
        mood: 'crisis',
      };
      setMessages((prev) => [...prev, crisisMsg]);
    }

    try {
      const botText = await callChatbot(userText);

      const botMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: botText,
        timestamp: new Date(),
        mood,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Chatbot error:', error.message);
      const errorMessage: Message = {
        id: (Date.now() + 3).toString(),
        type: 'bot',
        content: '⚠️ Sorry, I had trouble connecting. Please check your internet and try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert('Voice input is not supported in your browser. Try Chrome!');
      return;
    }
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-green-200 rounded-2xl shadow-2xl h-[600px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-lg leading-none">Need A Friend 🤗</h2>
            <p className="text-xs text-white/80 mt-0.5">Always here for you · Hindi / English / Hinglish</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
          <span className="text-xs text-white/80">Online</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-end gap-2 max-w-[80%] ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  message.type === 'user'
                    ? 'bg-blue-500'
                    : message.mood === 'crisis'
                    ? 'bg-red-500'
                    : 'bg-green-500'
                }`}
              >
                {message.type === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-sm'
                    : message.mood === 'crisis'
                    ? 'bg-red-50 border border-red-200 text-gray-800 rounded-bl-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm'
                }`}
              >
                {message.content}
                {message.mood && message.type === 'user' && (
                  <span className="ml-2 opacity-70 text-xs">
                    {getMoodEmoji(message.mood)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                <div className="flex space-x-1 items-center h-4">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="px-4 py-3 bg-white/80 border-t border-gray-200 flex items-center gap-2">
        <button
          onClick={toggleListening}
          title={listening ? 'Stop listening' : 'Voice input'}
          className={`flex-shrink-0 p-2.5 rounded-xl text-white transition-all duration-200 ${
            listening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={listening ? '🎤 Listening...' : 'Type in Hindi, English, or Hinglish...'}
          disabled={isTyping}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-sm transition-all disabled:bg-gray-50"
        />

        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || isTyping}
          className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotAssistant;
