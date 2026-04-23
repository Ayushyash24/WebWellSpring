import React, { useState } from 'react';
import { useWellbeing } from '../contexts/WellbeingContext';
import { PenTool, Calendar } from 'lucide-react';

const DailyReflection: React.FC = () => {
  const { wellbeingData, addJournalEntry } = useWellbeing();
  const [content, setContent] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      addJournalEntry(content);
      setContent('');
    }
  };

  const recentEntries = wellbeingData.journalEntries.slice(0, showAll ? 10 : 3);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <PenTool className="w-6 h-6 text-green-500 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-800">Daily Reflection</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            What are you grateful for today?
          </h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about your thoughts, feelings, or experiences..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows={4}
          />
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="mt-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            Save Reflection
          </button>
        </div>

        {recentEntries.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Recent Reflections</h3>
              {wellbeingData.journalEntries.length > 3 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-green-500 hover:text-green-600 text-sm font-medium"
                >
                  {showAll ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{entry.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyReflection;