import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Settings,
  LogOut 
} from 'lucide-react';

interface CounsellorNavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const CounsellorNavbar: React.FC<CounsellorNavbarProps> = ({ activeSection, setActiveSection }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navigationItems = [
    { id: 'overview', label: 'Student Overview', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-500 mr-3" />
            <span className="text-xl font-light text-gray-800">WellSpring Counsellor</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-green-100 text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-green-500 hover:bg-gray-50'
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
      </div>
    </nav>
  );
};

export default CounsellorNavbar;