import React, { useState, useEffect } from 'react';
import { Quote, RefreshCw } from 'lucide-react';

const MotivationalQuotes: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "Growth begins at the end of your comfort zone.",
    "Every small step forward is progress worth celebrating.",
    "Your mind is a powerful ally when you learn to work with it.",
    "Healing is not linear, and that's perfectly okay.",
    "You have survived 100% of your difficult days so far.",
    "Self-care is not selfish; it's essential for your wellbeing.",
    "Today's struggles are tomorrow's strengths.",
    "You are braver than you believe and stronger than you seem.",
    "Progress, not perfection, is the goal of any healing journey.",
    "Your mental health matters, and so do you."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Quote className="w-6 h-6 text-purple-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-800">Daily Inspiration</h2>
        </div>
        <button
          onClick={nextQuote}
          className="p-2 text-purple-600 hover:text-purple-700 hover:bg-white/50 rounded-lg transition-all duration-200"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="relative min-h-[120px] flex items-center">
        <blockquote className="text-lg text-gray-700 leading-relaxed font-medium italic">
          "{quotes[currentQuote]}"
        </blockquote>
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex space-x-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentQuote ? 'bg-purple-600' : 'bg-purple-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuotes;