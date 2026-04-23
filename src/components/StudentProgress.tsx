import React, { useState } from 'react';
import { TrendingUp, FileText, Plus, Save } from 'lucide-react';

interface ProgressNote {
  id: string;
  studentId: string;
  date: string;
  content: string;
  mood: number;
  goals: string[];
}

const StudentProgress: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState('STUDENT-A7B2');
  const [newNote, setNewNote] = useState('');
  const [newGoals, setNewGoals] = useState('');

  const students = [
    'STUDENT-A7B2',
    'STUDENT-C9D4',
    'STUDENT-F1E8',
    'STUDENT-B3K7'
  ];

  const progressNotes: ProgressNote[] = [
    {
      id: '1',
      studentId: 'STUDENT-A7B2',
      date: '2025-01-08',
      content: 'Student showed significant improvement in managing test anxiety. Implemented breathing techniques successfully. Recommended continuing with mindfulness practices.',
      mood: 4,
      goals: ['Practice breathing exercises daily', 'Complete stress management worksheets', 'Schedule follow-up in 1 week']
    },
    {
      id: '2',
      studentId: 'STUDENT-A7B2',
      date: '2025-01-01',
      content: 'Initial assessment completed. Student experiencing high academic stress. Introduced basic stress management concepts and relaxation techniques.',
      mood: 2,
      goals: ['Learn basic breathing techniques', 'Identify stress triggers', 'Establish daily routine']
    },
    {
      id: '3',
      studentId: 'STUDENT-C9D4',
      date: '2025-01-09',
      content: 'Working on time management skills. Student is overwhelmed by coursework. Developed action plan for better organization.',
      mood: 3,
      goals: ['Create study schedule', 'Use Pomodoro technique', 'Set realistic daily goals']
    }
  ];

  const studentNotes = progressNotes.filter(note => note.studentId === selectedStudent);

  const handleSaveNote = () => {
    if (newNote.trim() && newGoals.trim()) {
      // In a real app, this would save to database
      console.log('Saving note for', selectedStudent);
      setNewNote('');
      setNewGoals('');
    }
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😢', '😕', '😐', '🙂', '😊'];
    return emojis[mood - 1] || '😐';
  };

  return (
    <div className="space-y-6">
      {/* Student Selector */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Student</h2>
        <div className="flex flex-wrap gap-3">
          {students.map((student) => (
            <button
              key={student}
              onClick={() => setSelectedStudent(student)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedStudent === student
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {student}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Notes */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <FileText className="w-6 h-6 text-green-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-800">Progress Notes - {selectedStudent}</h2>
        </div>

        <div className="space-y-4 mb-8">
          {studentNotes.map((note) => (
            <div key={note.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getMoodEmoji(note.mood)}</span>
                  <div>
                    <div className="font-medium text-gray-800">Session {note.date}</div>
                    <div className="text-sm text-gray-600">Mood: {note.mood}/5</div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">{note.content}</p>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Goals Set:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {note.goals.map((goal, index) => (
                    <li key={index} className="text-sm text-gray-600">{goal}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Note */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center mb-4">
            <Plus className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">Add Progress Note</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Notes</label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Document the session progress, observations, and recommendations..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goals for Next Session</label>
              <textarea
                value={newGoals}
                onChange={(e) => setNewGoals(e.target.value)}
                placeholder="List goals and action items for the student (one per line)..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            
            <button
              onClick={handleSaveNote}
              disabled={!newNote.trim() || !newGoals.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Progress Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;