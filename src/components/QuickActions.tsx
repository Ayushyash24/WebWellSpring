import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, Play, Radio, MessageCircle } from 'lucide-react';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Book Counsellor',
      description: 'Schedule anonymous session',
      icon: Calendar,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => navigate('/book-counsellor')
    },
    {
      title: 'Browse Books',
      description: 'Self-help & wellness',
      icon: BookOpen,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => navigate('/books')
    },
    {
      title: 'Watch Videos',
      description: 'Motivational content',
      icon: Play,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => navigate('/videos')
    },
    {
      title: 'Live Broadcasts',
      description: 'Events & workshops',
      icon: Radio,
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => navigate('/broadcasts')
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <MessageCircle className="w-6 h-6 text-blue-500 mr-3" />
        <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className={`${action.color} text-white p-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group`}
            >
              <Icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-sm font-medium mb-1">{action.title}</div>
              <div className="text-xs opacity-90">{action.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;