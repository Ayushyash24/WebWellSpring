import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Shield, Target, ArrowLeft } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-blue-500 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
          <div className="text-center mb-12">
            <Heart className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-4xl font-light text-gray-800 mb-4">About WellSpring</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Empowering students to thrive through compassionate support and innovative wellness tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-start">
                <Target className="w-8 h-8 text-blue-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To create a safe, supportive environment where every student can access the tools and guidance they need for mental wellness and personal growth.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Shield className="w-8 h-8 text-green-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy First</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your privacy is paramount. Students can access counselling services completely anonymously, ensuring a judgment-free space for growth.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <Users className="w-8 h-8 text-purple-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Support</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our network of qualified counsellors specializes in student-specific challenges, from academic stress to personal development.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Heart className="w-8 h-8 text-red-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Holistic Approach</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Beyond counselling, we provide comprehensive wellness resources including mood tracking, educational content, and community support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Community</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Whether you're a student seeking support or a counsellor ready to make a difference, 
              WellSpring provides the platform to connect, grow, and thrive together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/student-auth')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Join as Student
              </button>
              <button
                onClick={() => navigate('/counsellor-auth')}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Join as Counsellor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;