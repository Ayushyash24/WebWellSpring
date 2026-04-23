import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  notes: string;
  activities: string[];
}

interface WellbeingData {
  moodEntries: MoodEntry[];
  journalEntries: { id: string; date: string; content: string; }[];
  goals: { id: string; title: string; completed: boolean; }[];
}

interface WellbeingContextType {
  wellbeingData: WellbeingData;
  addMoodEntry: (mood: number, notes: string, activities: string[]) => void;
  addJournalEntry: (content: string) => void;
  addGoal: (title: string) => void;
  toggleGoal: (id: string) => void;
  getTodaysMood: () => number | null;
  getWeeklyAverage: () => number;
  getMonthlyAverage: () => number;
}

const WellbeingContext = createContext<WellbeingContextType | undefined>(undefined);

export const useWellbeing = () => {
  const context = useContext(WellbeingContext);
  if (context === undefined) {
    throw new Error('useWellbeing must be used within a WellbeingProvider');
  }
  return context;
};

export const WellbeingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wellbeingData, setWellbeingData] = useState<WellbeingData>({
    moodEntries: [],
    journalEntries: [],
    goals: []
  });

  const addMoodEntry = (mood: number, notes: string, activities: string[]) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: today,
      mood,
      notes,
      activities
    };

    setWellbeingData(prev => ({
      ...prev,
      moodEntries: [newEntry, ...prev.moodEntries.filter(entry => entry.date !== today)]
    }));
  };

  const addJournalEntry = (content: string) => {
    const newEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      content
    };

    setWellbeingData(prev => ({
      ...prev,
      journalEntries: [newEntry, ...prev.journalEntries]
    }));
  };

  const addGoal = (title: string) => {
    const newGoal = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false
    };

    setWellbeingData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const toggleGoal = (id: string) => {
    setWellbeingData(prev => ({
      ...prev,
      goals: prev.goals.map(goal => 
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    }));
  };

  const getTodaysMood = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = wellbeingData.moodEntries.find(entry => entry.date === today);
    return todayEntry ? todayEntry.mood : null;
  };

  const getWeeklyAverage = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weekEntries = wellbeingData.moodEntries.filter(entry => 
      new Date(entry.date) >= oneWeekAgo
    );
    
    if (weekEntries.length === 0) return 0;
    return weekEntries.reduce((sum, entry) => sum + entry.mood, 0) / weekEntries.length;
  };

  const getMonthlyAverage = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const monthEntries = wellbeingData.moodEntries.filter(entry => 
      new Date(entry.date) >= oneMonthAgo
    );
    
    if (monthEntries.length === 0) return 0;
    return monthEntries.reduce((sum, entry) => sum + entry.mood, 0) / monthEntries.length;
  };

  const value = {
    wellbeingData,
    addMoodEntry,
    addJournalEntry,
    addGoal,
    toggleGoal,
    getTodaysMood,
    getWeeklyAverage,
    getMonthlyAverage
  };

  return <WellbeingContext.Provider value={value}>{children}</WellbeingContext.Provider>;
};