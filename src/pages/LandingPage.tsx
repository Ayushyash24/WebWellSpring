import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  BookOpen,
  Sparkles,
  Shield,
  Video,
  Mic,
  Lock,
  UserCheck,
  Target,
  Calendar,
  PenTool,
} from "lucide-react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const heroImage =
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1170&auto=format&fit=crop";

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-[#a3d5d3] via-[#fff6f0] to-[#f9fdfb]">

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <Heart className="w-16 h-16 text-pink-400 fill-pink-300 drop-shadow-lg" />
          <p className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl">
            "Time will heal everything, and you are tougher than you think."
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="z-10 text-center mt-8"
        >
          <h1
            className="text-6xl md:text-7xl font-extrabold text-gray-800"
            style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1 }}
          >
            WellSpring
          </h1>
          <p
            className="mt-6 text-xl md:text-2xl italic text-gray-700 max-w-2xl mx-auto"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            "Peace begins with a smile, and every smile makes you stronger."
          </p>

          <div className="mt-10 flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => navigate("/student-auth")}
              className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-10 py-3 rounded-full text-lg shadow-lg transform transition hover:scale-105"
            >
              Student Portal
            </button>
            <button
              onClick={() => navigate("/counsellor-auth")}
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-10 py-3 rounded-full text-lg shadow-lg transform transition hover:scale-105"
            >
              Counsellor Portal
            </button>
          </div>
        </motion.div>
      </section>

      {/* Reflection Section */}
      <section
        className="relative w-full min-h-screen bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            A Moment of Reflection
          </h2>
          <p className="text-lg md:text-xl text-white/90">
            Breathe, notice, and take one small step. Healing is a process — we walk with you.
          </p>
        </motion.div>
      </section>

      {/* Curated Resources Section */}
      <section className="py-24 bg-gradient-to-br from-[#fffaf6] via-[#f6f8ff] to-[#f2fff6]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="text-4xl font-semibold text-gray-800 mb-10"
          >
            Curated Resources
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen className="w-10 h-10 text-emerald-500 mx-auto mb-4" />, title: "Books", desc: "Hand-picked reads to inspire growth and healing." },
              { icon: <Video className="w-10 h-10 text-sky-500 mx-auto mb-4" />, title: "TED Talks", desc: "Talks from experts to fuel positivity and resilience." },
              { icon: <Sparkles className="w-10 h-10 text-pink-400 mx-auto mb-4" />, title: "Daily Tips", desc: "Small steps and nudges to stay motivated every day." },
              { icon: <Mic className="w-10 h-10 text-purple-600 mx-auto mb-4" />, title: "Podcasts", desc: "Listen to inspiring voices that guide and motivate you." },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, delay: i * 0.2 }}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 text-center"
              >
                {c.icon}
                <h3 className="font-semibold mb-2">{c.title}</h3>
                <p className="text-gray-600 text-sm">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-[#f0f4f7] via-[#fff6f6] to-[#f9fdfb]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-serif">
              Why Choose WellSpring
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing a safe, secure, and supportive environment for your mental health journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="w-8 h-8 text-blue-600" />, title: "Privacy First", desc: "Your privacy is paramount.", bgColor: "bg-blue-100" },
              { icon: <Lock className="w-8 h-8 text-green-600" />, title: "Secure Conversations", desc: "Encrypted end-to-end.", bgColor: "bg-green-100" },
              { icon: <UserCheck className="w-8 h-8 text-purple-600" />, title: "Expert Support", desc: "Licensed professionals ready to help.", bgColor: "bg-purple-100" },
              { icon: <Sparkles className="w-8 h-8 text-orange-600" />, title: "Holistic Approach", desc: "Therapy + community + tools.", bgColor: "bg-orange-100" },
              { icon: <Lock className="w-8 h-8 text-red-600" />, title: "End-to-End Encryption", desc: "Military-grade secure.", bgColor: "bg-red-100" },
              { icon: <Target className="w-8 h-8 text-teal-600" />, title: "Our Mission", desc: "Accessible mental health support.", bgColor: "bg-teal-100" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transform transition"
              >
                <div className={`w-16 h-16 mb-6 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-gradient-to-br from-[#f0f4f7] via-[#f2f9f2] to-[#f9fdfb]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-serif">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with others on similar journeys, participate in healing activities, and grow together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Users className="w-12 h-12 text-indigo-600" />, title: "Peer Support Groups", desc: "Share and connect with peers.", gradient: "from-blue-100 to-indigo-100" },
              { icon: <Calendar className="w-12 h-12 text-emerald-600" />, title: "Events & Workshops", desc: "Participate in wellness events.", gradient: "from-green-100 to-emerald-100" },
              { icon: <PenTool className="w-12 h-12 text-rose-600" />, title: "Guided Journals", desc: "Structured journaling prompts.", gradient: "from-pink-100 to-rose-100" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transform transition text-center"
              >
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-br from-[#f0f4f7] via-[#fff6f6] to-[#f9fdfb]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <Heart className="w-8 h-8 text-pink-500" />
            <h3 className="text-3xl font-bold font-serif text-gray-800">WellSpring</h3>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {[
              { label: "About", path: "/about" },
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Help", path: "/help" },
            ].map((link, i) => (
              <button
                key={i}
                onClick={() => navigate(link.path)}
                className="text-gray-600 hover:text-gray-800 transition font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            WellSpring is committed to providing accessible mental health resources. If you're in crisis, please contact emergency services or a crisis helpline immediately.
          </p>
          <p className="text-gray-400 text-xs mt-2">© 2024 WellSpring. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
