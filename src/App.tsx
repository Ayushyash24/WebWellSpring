import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WellbeingProvider } from './contexts/WellbeingContext';
import LandingPage from './pages/LandingPage';
import StudentAuth from './pages/StudentAuth';
import CounsellorAuth from './pages/CounsellorAuth';
import StudentDashboard from './pages/StudentDashboard';
import CounsellorDashboard from './pages/CounsellorDashboard';
import BooksHub from './pages/BooksHub';
import VideosHub from './pages/VideosHub';
import BroadcastHub from './pages/BroadcastHub';
import CounsellorBooking from './pages/CounsellorBooking';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Help from './pages/Help';
import About from './pages/About';

function App() {
  return (
    <AuthProvider>
      <WellbeingProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/student-auth" element={<StudentAuth />} />
              <Route path="/counsellor-auth" element={<CounsellorAuth />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/counsellor-dashboard" element={<CounsellorDashboard />} />
              <Route path="/books" element={<BooksHub />} />
              <Route path="/videos" element={<VideosHub />} />
              <Route path="/broadcasts" element={<BroadcastHub />} />
              <Route path="/book-counsellor" element={<CounsellorBooking />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </WellbeingProvider>
    </AuthProvider>
  );
}

export default App;
