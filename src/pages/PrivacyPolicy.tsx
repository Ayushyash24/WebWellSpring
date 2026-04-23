import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
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
            <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-4xl font-light text-gray-800 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600">
              Your privacy and security are our top priorities
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-green-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Anonymous Protection</h2>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WellSpring is designed with privacy at its core. When students book counselling sessions, 
                  their real identity is completely protected through our anonymous booking system.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Counsellors never see student names, emails, or personal identifiers</li>
                  <li>Students are assigned anonymous IDs for all interactions</li>
                  <li>Only wellness progress and session notes are shared with counsellors</li>
                  <li>Personal information remains completely confidential</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-blue-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Data Collection</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect only the minimum information necessary to provide our services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Account information (email, encrypted password)</li>
                <li>Wellness tracking data (mood entries, journal reflections)</li>
                <li>Anonymous session booking and progress information</li>
                <li>Usage analytics to improve our platform (anonymized)</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-purple-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Information</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your information is used exclusively to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Provide personalized wellness tracking and insights</li>
                <li>Facilitate anonymous counsellor connections</li>
                <li>Improve our platform and services</li>
                <li>Send important platform updates (with your consent)</li>
              </ul>
            </section>

            <section>
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Your Rights</h3>
                <p className="text-blue-700 leading-relaxed mb-3">
                  You have complete control over your data:
                </p>
                <ul className="list-disc list-inside space-y-1 text-blue-600">
                  <li>Request access to all your data</li>
                  <li>Request deletion of your account and all associated data</li>
                  <li>Update or correct your information at any time</li>
                  <li>Opt out of non-essential communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Us</h3>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy or your data, 
                please contact us at privacy@wellspring.edu
              </p>
            </section>

            <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200">
              Last updated: January 12, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;