import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Appointment {
  id: string;
  studentId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'initial' | 'follow-up' | 'crisis';
  notes?: string;
}

const AppointmentSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      studentId: 'STUDENT-A7B2',
      date: '2025-01-12',
      time: '9:00 AM',
      status: 'scheduled',
      type: 'follow-up',
      notes: 'Review stress management progress'
    },
    {
      id: '2',
      studentId: 'STUDENT-C9D4',
      date: '2025-01-12',
      time: '11:00 AM',
      status: 'scheduled',
      type: 'initial'
    },
    {
      id: '3',
      studentId: 'STUDENT-F1E8',
      date: '2025-01-12',
      time: '2:00 PM',
      status: 'completed',
      type: 'follow-up',
      notes: 'Excellent progress, confidence building'
    },
    {
      id: '4',
      studentId: 'STUDENT-B3K7',
      date: '2025-01-13',
      time: '10:00 AM',
      status: 'scheduled',
      type: 'crisis',
      notes: 'Urgent - academic burnout concerns'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crisis': return 'bg-red-100 text-red-800';
      case 'initial': return 'bg-blue-100 text-blue-800';
      case 'follow-up': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todaysAppointments = appointments.filter(apt => apt.date === selectedDate);
  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) > new Date(selectedDate) && apt.status === 'scheduled'
  );

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Today's Schedule</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {todaysAppointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No appointments today</h3>
            <p className="text-gray-500">Enjoy your free time or catch up on notes</p>
          </div>
        ) : (
          <div className="space-y-4">
            {todaysAppointments.map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {getStatusIcon(appointment.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-800">{appointment.studentId}</span>
                        <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getTypeColor(appointment.type)}`}>
                          {appointment.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-2">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{appointment.time}</span>
                      </div>
                      
                      {appointment.notes && (
                        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {appointment.status === 'scheduled' && (
                      <>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-200">
                          Start
                        </button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors duration-200">
                          Reschedule
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Upcoming Appointments</h2>
        
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No upcoming appointments scheduled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-800">{appointment.studentId}</span>
                    <div className="text-sm text-gray-600">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {appointment.type === 'crisis' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(appointment.type)}`}>
                    {appointment.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentSchedule;