import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import CounsellorNavbar from '../components/CounsellorNavbar';
import StudentOverview from '../components/StudentOverview';
import AppointmentSchedule from '../components/AppointmentSchedule';
import StudentProgress from '../components/StudentProgress';
import { useState } from 'react';

const CounsellorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  if (!user || user.role !== 'counsellor') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Access denied. Please log in as a counsellor.</p>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <StudentOverview />;
      case 'schedule': return <AppointmentSchedule />;
      case 'progress': return <StudentProgress />;
      default: return <div>Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <CounsellorNavbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-2">Counsellor Dashboard</h1>
          <p className="text-gray-600 text-lg">Supporting students on their wellness journey</p>
        </div>
        {renderSection()}
      </main>
    </div>
  );
};

export default CounsellorDashboard;