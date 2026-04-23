import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentNavbar from '../components/StudentNavbar';
import { Calendar, Clock, Star, ArrowLeft, CheckCircle } from 'lucide-react';

interface Counsellor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  description: string;
  availability: string[];
  imageUrl: string;
}

const CounsellorBooking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCounsellor, setSelectedCounsellor] = useState<Counsellor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isBooked, setIsBooked] = useState(false);

const counsellors = [
  {
    id: '1',
    name: 'Dr. Shyam Bhatt',
    specialty: 'Stress & Anxiety',
    rating: 4.9,
    experience: '25+ years',
    description: 'Stress, anxiety, and holistic mental health.',
    availability: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
    imageUrl: 'https://www.shyambhat.com/wp-content/uploads/2018/10/ShyamBhat1-4.jpg'
  },
  {
    id: '2',
    name: 'Dr. Samir Parikh',
    specialty: 'Career Guidance',
    rating: 4.8,
    experience: '20+ years',
    description: 'Stress, workplace, and personal counseling.',
    availability: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
    imageUrl: 'https://www.fortishealthcare.com/drupal-data/doctors/dr-samir-parikh-1387.png'
  },
  {
    id: '3',
    name: 'Dr. Alok Pandey',
    specialty: 'Anxiety & Relationships',
    rating: 4.7,
    experience: '15+ years',
    description: 'Anxiety, depression, and relationship counseling.',
    availability: ['9:30 AM', '12:00 PM', '2:30 PM', '4:30 PM'],
    imageUrl: 'https://lagracecenter.com/wp-content/uploads/2023/03/dr-alok-pandey.jpg'
  },
  {
    id: '4',
    name: 'Dr. Rachna Bhargava',
    specialty: 'Academic & Career',
    rating: 4.6,
    experience: '12+ years',
    description: 'Academic stress, career guidance, and anxiety.',
    availability: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
    imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQGbHo6QL0_vWw/profile-displayphoto-shrink_200_200/B56ZOrFxFTGkAc-/0/1733742236676?e=2147483647&v=beta&t=wZOhm5Cvobj7ByKUqClFK3QHOvAbxMja2u4dolgzoXM'
  },
  {
    id: '5',
    name: 'Dr. Manish Kumar',
    specialty: 'CBT & Mindfulness',
    rating: 4.8,
    experience: '10+ years',
    description: 'Cognitive behavioral therapy, mindfulness, anxiety management.',
    availability: ['9:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'],
    imageUrl: 'https://anvayahealthcare.com/wp-content/uploads/elementor/thumbs/manish-kumar-clinical-psychologist-rarxtgkntou51twhqxojl07izmcfvaucuyd4f3ojns.webp'
  },
  {
    id: '6',
    name: 'Dr. Achal Bhagat',
    specialty: 'Mood Disorders',
    rating: 4.7,
    experience: '30+ years',
    description: 'Mood disorders, PTSD, and autism spectrum disorders.',
    availability: ['9:00 AM', '12:00 PM', '3:00 PM', '5:00 PM'],
    imageUrl: 'https://images.apollo247.in/pd-cms/cms/2025-09/fa311ee5-1ebf-4291-a69b-59db07e5bff3.jpg'
  },
  {
    id: '7',
    name: 'Dr. Prerna Kohli',
    specialty: 'Depression & Relationships',
    rating: 4.6,
    experience: '15+ years',
    description: 'Depression, anxiety, and relationship counseling.',
    availability: ['10:00 AM', '12:30 PM', '2:30 PM', '4:30 PM'],
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Rmu_8cB2NVk1rYDNgN-G8soZc2sSnHLddQ&s'
  },
  {
    id: '8',
    name: 'Mansi Poddar',
    specialty: 'Trauma & Grief',
    rating: 4.9,
    experience: '10+ years',
    description: 'Trauma, grief, and emotional well-being.',
    availability: ['9:30 AM', '11:30 AM', '2:00 PM', '4:00 PM'],
    imageUrl: 'https://res.cloudinary.com/mansi-cdn/image/upload/f_auto/q_auto/CDN/img/Banner%20Phone%203.png'
  },
  {
    id: '9',
    name: 'Dr. Nitin Seth',
    specialty: 'Corporate & Workplace',
    rating: 4.7,
    experience: '18+ years',
    description: 'Workplace stress, corporate counseling, emotional intelligence.',
    availability: ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM'],
    imageUrl: 'https://www.myhospitalnow.com/doctors/storage/users/Dr.-Nitin-Seth-768x1151-362931280_1753505960.jpg'
  },
  {
    id: '10',
    name: 'Dr. Seema Hingorrany',
    specialty: 'Anxiety & CBT',
    rating: 4.6,
    experience: '12+ years',
    description: 'Anxiety, depression, cognitive behavioral therapy.',
    availability: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
    imageUrl: 'https://www.womensworldbanking.org/wp-content/uploads/2023/04/Copy-of-Seema-Image.jpg'
  }
];



  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      navigate('/student-dashboard');
    }, 2000);
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-500 opacity-95 font-[Poppins]">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your anonymous session has been scheduled successfully.</p>
          <div className="bg-white/80 p-6 rounded-2xl shadow-lg max-w-md mx-auto">
            <h3 className="font-semibold text-gray-800 mb-2">Session Details:</h3>
            <p className="text-gray-600">Counsellor: {selectedCounsellor?.name}</p>
            <p className="text-gray-600">Time: {selectedSlot}</p>
            <p className="text-gray-600">Your ID: Anonymous Student #{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-500 opacity-95 ">
      <StudentNavbar activeSection="booking" setActiveSection={() => {}} />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center mb-10">
          <button
            onClick={() => navigate('/student-dashboard')}
            className="flex items-center text-gray-600 hover:text-blue-500 mr-6 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-wide">Book a Counsellor</h1>
            <p className="text-gray-600 text-lg font-semi-bold">Choose a counsellor for anonymous, confidential support</p>
          </div>
        </div>

        {!selectedCounsellor ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {counsellors.map((counsellor) => (
              <div key={counsellor.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <img
                      src={counsellor.imageUrl}
                      alt="Counsellor"
                      className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-blue-100"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{counsellor.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{counsellor.specialty}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{counsellor.rating} • {counsellor.experience}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{counsellor.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {counsellor.availability.length} slots available
                    </div>
                    <button
                      onClick={() => setSelectedCounsellor(counsellor)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <img
                  src={selectedCounsellor.imageUrl}
                  alt="Counsellor"
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-2 border-blue-100"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedCounsellor.name}</h2>
                <p className="text-blue-600 font-medium">{selectedCounsellor.specialty}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select a Time Slot</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCounsellor.availability.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-gray-700 font-medium ${
                        selectedSlot === slot
                          ? 'border-blue-500 bg-blue-100 text-blue-700'
                          : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <Clock className="w-4 h-4 inline mr-2" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl mb-6 border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800 mb-2">Privacy Notice</h4>
                <p className="text-blue-700 text-sm">
                  Your identity will remain completely anonymous. The counsellor will only see your wellness progress and session notes, never your personal information.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedCounsellor(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  Back to List
                </button>
                <button
                  onClick={handleBooking}
                  disabled={!selectedSlot}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CounsellorBooking;
