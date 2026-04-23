import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import StudentNavbar from '../components/StudentNavbar';
import WellbeingTracker from '../components/WellbeingTracker';
import MotivationalQuotes from '../components/MotivationalQuotes';
import ChatbotAssistant from '../components/ChatbotAssistant';
import DailyReflection from '../components/DailyReflection';
import QuickActions from '../components/QuickActions';
import { motion } from 'framer-motion';

const DailyWellbeingEmojis: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const moods = [
    { emoji: '😢', label: 'Very Low', color: 'text-red-500' },
    { emoji: '😟', label: 'Low', color: 'text-orange-500' },
    { emoji: '😐', label: 'Okay', color: 'text-yellow-500' },
    { emoji: '😊', label: 'Good', color: 'text-green-500' },
    { emoji: '🤩', label: 'Excellent', color: 'text-blue-500' },
  ];
  return (
    <div className="p-6 bg-white rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">How are you feeling today?</h2>
      <div className="grid grid-cols-5 gap-4">
        {moods.map((mood, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedMood(mood.label)}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer bg-gray-50 hover:shadow-lg ${
              selectedMood === mood.label ? 'bg-pink-100 ring-2 ring-pink-400 shadow-2xl' : ''
            }`}
          >
            <span className="text-4xl">{mood.emoji}</span>
            <p className={`mt-2 font-semibold text-sm ${mood.color}`}>{mood.label}</p>
          </motion.div>
        ))}
      </div>
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 font-semibold rounded-xl text-center"
        >
          ✅ You selected <span className="font-bold">{selectedMood}</span> mood today!
        </motion.div>
      )}
    </div>
  );
};

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Agar kisi aur page se navigate karke aaye hain with section state, toh use set karo
  useEffect(() => {
    const state = location.state as { section?: string } | null;
    if (state?.section) {
      setActiveSection(state.section);
    }
  }, [location.state]);

  if (!user || user.role !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Access denied. Please log in as a student.</p>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-12">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent mb-4">
                Welcome to Your Wellness Journey
              </h1>
              <p className="text-gray-700 text-lg italic">
                How are you feeling today? Let's track your progress together.
              </p>
            </motion.div>
            <div className="grid lg:grid-cols-3 gap-10">
              <motion.div className="lg:col-span-2 space-y-10" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <WellbeingTracker />
                <DailyWellbeingEmojis />
                <DailyReflection />
              </motion.div>
              <motion.div className="space-y-10" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <MotivationalQuotes />
                <QuickActions />
              </motion.div>
            </div>
          </div>
        );
      case 'chat':
        return <ChatbotAssistant />;
      case 'inspiration':
        return (
          <div className="space-y-8">
            <MotivationalQuotes />
            <QuickActions />
          </div>
        );
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-500 overflow-x-hidden">
      <StudentNavbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="max-w-7xl mx-auto px-6 py-12">{renderSection()}</main>
    </div>
  );
};

export default StudentDashboard;
