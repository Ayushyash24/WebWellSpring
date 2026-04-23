import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart, BarChart3, MessageCircle, Calendar, BookOpen, Play, Radio, LogOut } from 'lucide-react';

interface StudentNavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const StudentNavbar: React.FC<StudentNavbarProps> = ({ activeSection, setActiveSection }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Smart handler: agar student-dashboard pe nahi hain toh pehle wahan navigate karo
  const handleSectionChange = (section: string) => {
    if (location.pathname === '/student-dashboard') {
      setActiveSection(section);
    } else {
      navigate('/student-dashboard', { state: { section } });
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, onClick: () => handleSectionChange('dashboard') },
    { id: 'chat', label: 'Need a friend?', icon: MessageCircle, onClick: () => handleSectionChange('chat') },
    { id: 'booking', label: 'Book Counsellor', icon: Calendar, onClick: () => navigate('/book-counsellor') },
    { id: 'books', label: 'Books Hub', icon: BookOpen, onClick: () => navigate('/books') },
    { id: 'videos', label: 'Videos', icon: Play, onClick: () => navigate('/videos') },
    { id: 'broadcasts', label: 'Broadcasts', icon: Radio, onClick: () => navigate('/broadcasts') },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-blue-500 mr-3" />
            <span className="text-xl font-light text-gray-800">WellSpring</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeSection === item.id ||
                (item.id === 'booking' && window.location.pathname === '/book-counsellor') ||
                (item.id === 'books' && window.location.pathname === '/books') ||
                (item.id === 'videos' && window.location.pathname === '/videos') ||
                (item.id === 'broadcasts' && window.location.pathname === '/broadcasts');

              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-red-500 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-3 gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;