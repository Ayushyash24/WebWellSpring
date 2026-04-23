import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, ArrowLeft, ChevronDown, ChevronRight, MessageCircle, Mail } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'students' | 'counsellors' | 'general';
}

const Help: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<'students' | 'counsellors' | 'general'>('general');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How does anonymous booking work?',
      answer: 'When you book a counsellor, you\'re assigned a random anonymous ID. Counsellors only see your wellness progress and session notes, never your real name or personal information.',
      category: 'students'
    },
    {
      id: '2',
      question: 'Is my wellness data secure?',
      answer: 'Yes, all your data is encrypted and stored securely. Only you can access your mood tracking and journal entries. Counsellors only see anonymized progress summaries.',
      category: 'students'
    },
    {
      id: '3',
      question: 'How do I track my mood daily?',
      answer: 'Visit your dashboard and use the Daily Well-being Tracker. Rate your mood from 1-5, add notes about your day, and select activities you did. This data helps track your progress over time.',
      category: 'students'
    },
    {
      id: '4',
      question: 'Can I cancel a counselling session?',
      answer: 'Yes, you can cancel sessions up to 24 hours in advance. Go to your dashboard and manage your appointments from there.',
      category: 'students'
    },
    {
      id: '5',
      question: 'How do I see student progress?',
      answer: 'In your counsellor dashboard, go to "Progress Tracking" to see anonymous student wellness data, mood trends, and session history.',
      category: 'counsellors'
    },
    {
      id: '6',
      question: 'How do I manage my availability?',
      answer: 'Use the Schedule section in your dashboard to set your available time slots and manage bookings.',
      category: 'counsellors'
    },
    {
      id: '7',
      question: 'What if a student needs crisis support?',
      answer: 'Our platform flags urgent bookings. You\'ll see crisis appointments highlighted in red. For immediate emergencies, direct students to campus emergency services.',
      category: 'counsellors'
    },
    {
      id: '8',
      question: 'Is WellSpring free to use?',
      answer: 'Yes, WellSpring is completely free for all students and counsellors. Our goal is to make mental health support accessible to everyone.',
      category: 'general'
    },
    {
      id: '9',
      question: 'What browsers are supported?',
      answer: 'WellSpring works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.',
      category: 'general'
    },
    {
      id: '10',
      question: 'How do I reset my password?',
      answer: 'On the login page, click "Forgot Password" and follow the instructions sent to your email.',
      category: 'general'
    }
  ];

  const filteredFAQs = faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

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
            <HelpCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-4xl font-light text-gray-800 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions and get support
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-xl p-1 flex">
              {[
                { key: 'general', label: 'General' },
                { key: 'students', label: 'For Students' },
                { key: 'counsellors', label: 'For Counsellors' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key as any)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === tab.key
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4 mb-12">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you with any questions or concerns
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@wellspring.edu"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </a>
              
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;