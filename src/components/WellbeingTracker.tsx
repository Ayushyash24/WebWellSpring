import React, { useState } from 'react';
import { useWellbeing } from '../contexts/WellbeingContext';
import { Smile, Meh, Frown, TrendingUp, Calendar } from 'lucide-react';

const WellbeingTracker: React.FC = () => {
  const { addMoodEntry, getTodaysMood, getWeeklyAverage, getMonthlyAverage, wellbeingData } = useWellbeing();
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState<string[]>([]);

  const todaysMood = getTodaysMood();
  const weeklyAvg = getWeeklyAverage();
  const monthlyAvg = getMonthlyAverage();

  const moodOptions = [
    { value: 1, emoji: '😢', label: 'Very Low', color: 'text-red-500' },
    { value: 2, emoji: '😕', label: 'Low', color: 'text-orange-500' },
    { value: 3, emoji: '😐', label: 'Okay', color: 'text-yellow-500' },
    { value: 4, emoji: '🙂', label: 'Good', color: 'text-green-500' },
    { value: 5, emoji: '😊', label: 'Excellent', color: 'text-blue-500' },
  ];

  const activityOptions = [
    'Exercise', 'Meditation', 'Reading', 'Social Time', 'Study', 'Sleep', 'Outdoor Activity'
  ];

  const handleActivityToggle = (activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = () => {
    addMoodEntry(selectedMood, notes, activities);
    setNotes('');
    setActivities([]);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 text-blue-500 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-800">Daily Well-being Tracker</h2>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">
            {todaysMood ? moodOptions[todaysMood - 1].emoji : '⏰'}
          </div>
          <div className="text-sm text-gray-600 mt-1">Today</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-2xl font-bold text-green-600">
            {weeklyAvg > 0 ? weeklyAvg.toFixed(1) : '—'}
          </div>
          <div className="text-sm text-gray-600 mt-1">Weekly Avg</div>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">
            {monthlyAvg > 0 ? monthlyAvg.toFixed(1) : '—'}
          </div>
          <div className="text-sm text-gray-600 mt-1">Monthly Avg</div>
        </div>
      </div>

      {!todaysMood ? (
        <div className="space-y-6">
          {/* Mood Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">How are you feeling today?</h3>
            <div className="grid grid-cols-5 gap-3">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedMood === mood.value
                      ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className={`text-sm font-medium ${mood.color}`}>{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">What activities did you do today?</h3>
            <div className="flex flex-wrap gap-2">
              {activityOptions.map((activity) => (
                <button
                  key={activity}
                  onClick={() => handleActivityToggle(activity)}
                  className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                    activities.includes(activity)
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Any additional thoughts?</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share what's on your mind..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Save Today's Entry
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">{moodOptions[todaysMood - 1].emoji}</div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            You've already logged today's mood!
          </h3>
          <p className="text-gray-600 mb-6">
            Come back tomorrow to continue tracking your wellness journey.
          </p>
          
          {/* Recent Entries */}
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Recent Entries</h4>
            <div className="grid gap-3">
              {wellbeingData.moodEntries.slice(0, 7).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{moodOptions[entry.mood - 1].emoji}</span>
                    <div className="text-left">
                      <div className="font-medium text-gray-800">{entry.date}</div>
                      {entry.notes && <div className="text-sm text-gray-600">{entry.notes}</div>}
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${moodOptions[entry.mood - 1].color}`}>
                    {moodOptions[entry.mood - 1].label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellbeingTracker;