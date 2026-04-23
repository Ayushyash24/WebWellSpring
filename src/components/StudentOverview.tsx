import React from 'react';
import { Users, TrendingUp, Calendar, Clock } from 'lucide-react';

interface AnonymousStudent {
  id: string;
  anonymousId: string;
  currentMood: number;
  weeklyAverage: number;
  monthlyAverage: number;
  lastSession: string;
  nextSession?: string;
  notes: string;
  sessionsCompleted: number;
}

const StudentOverview: React.FC = () => {
  const students: AnonymousStudent[] = [
    {
      id: '1',
      anonymousId: 'STUDENT-A7B2',
      currentMood: 4,
      weeklyAverage: 3.8,
      monthlyAverage: 3.5,
      lastSession: '2025-01-08',
      nextSession: '2025-01-15',
      notes: 'Making good progress with stress management techniques. Responsive to CBT approaches.',
      sessionsCompleted: 3
    },
    {
      id: '2',
      anonymousId: 'STUDENT-C9D4',
      currentMood: 3,
      weeklyAverage: 3.2,
      monthlyAverage: 3.0,
      lastSession: '2025-01-09',
      notes: 'Working through academic pressure. Benefits from mindfulness exercises.',
      sessionsCompleted: 5
    },
    {
      id: '3',
      anonymousId: 'STUDENT-F1E8',
      currentMood: 5,
      weeklyAverage: 4.5,
      monthlyAverage: 4.2,
      lastSession: '2025-01-07',
      nextSession: '2025-01-14',
      notes: 'Excellent progress in building self-confidence. Ready for advanced coping strategies.',
      sessionsCompleted: 8
    }
  ];

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😢', '😕', '😐', '🙂', '😊'];
    return emojis[mood - 1] || '😐';
  };

  const getMoodColor = (mood: number) => {
    if (mood <= 2) return 'text-red-500';
    if (mood === 3) return 'text-yellow-500';
    if (mood === 4) return 'text-green-500';
    return 'text-blue-500';
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center">
          <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800">{students.length}</div>
          <div className="text-gray-600">Active Students</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center">
          <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800">
            {(students.reduce((sum, s) => sum + s.weeklyAverage, 0) / students.length).toFixed(1)}
          </div>
          <div className="text-gray-600">Avg Weekly Mood</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center">
          <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800">
            {students.filter(s => s.nextSession).length}
          </div>
          <div className="text-gray-600">Upcoming Sessions</div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Progress Overview</h2>
        
        <div className="space-y-4">
          {students.map((student) => (
            <div key={student.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">{getMoodEmoji(student.currentMood)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{student.anonymousId}</h3>
                    <p className="text-gray-600 text-sm">{student.sessionsCompleted} sessions completed</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getMoodColor(student.currentMood)}`}>
                    {student.currentMood}/5
                  </div>
                  <div className="text-xs text-gray-500">Current Mood</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-800">{student.weeklyAverage.toFixed(1)}</div>
                  <div className="text-xs text-gray-600">Weekly Avg</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-800">{student.monthlyAverage.toFixed(1)}</div>
                  <div className="text-xs text-gray-600">Monthly Avg</div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed bg-blue-50 p-3 rounded-lg">
                  {student.notes}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Last: {new Date(student.lastSession).toLocaleDateString()}
                </div>
                {student.nextSession && (
                  <div className="flex items-center text-blue-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    Next: {new Date(student.nextSession).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;