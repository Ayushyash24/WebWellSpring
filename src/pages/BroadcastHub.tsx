import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";
import {
  Radio,
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  Search,
  ExternalLink,
} from "lucide-react";

interface Broadcast {
  id: string;
  title: string;
  type: "live" | "recorded" | "upcoming";
  category: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  host: string;
  attendees?: number;
  broadcastUrl: string;
  thumbnailUrl: string;
}

const BroadcastHub: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Workshops",
    "Podcasts",
    "Live Sessions",
    "Events",
    "Announcements",
  ];

  const broadcasts: Broadcast[] = [
    {
      id: "1",
      title: "Stress Management Workshop",
      type: "recorded",
      category: "Workshops",
      description:
        "Learn effective techniques to manage academic stress and maintain mental balance.",
      date: "2025-01-15",
      time: "2:00 PM",
      duration: "20+ hrs",
      host: "NPTEL",
      broadcastUrl: "https://www.youtube.com/watch?v=AdgkljdMPh0",
      thumbnailUrl:
        "https://images.squarespace-cdn.com/content/v1/59e54431268b9603c799fc44/1520637818447-I3JY9K41AA2NCW97XZ0P/Stress+Management+Workshop+Banner.png",
    },
    {
      id: "2",
      title: "Campus Wellness Podcast",
      type: "recorded",
      category: "Podcasts",
      description:
        "Weekly discussions on student mental health, featuring expert guests and real stories.",
      date: "2025-01-10",
      time: "Available now",
      duration: "45 mins",
      host: "WellSpring Team",
      attendees: 1250,
      broadcastUrl: "https://www.youtube.com/playlist?list=PLj2NOoB2id1mXpxqTTsvtFxXav1gGVnQt",
      thumbnailUrl:
        "https://mccollege.edu/wp-content/uploads/2023/10/CAMPUS-CONNECTIONS_Podcast_Banner.jpg",
    },
    {
      id: "3",
      title: "Q&A with Career Counsellors",
      type: "live",
      category: "Live Sessions",
      description:
        "Ask questions about career planning, job search strategies, and professional development.",
      date: "2025-01-12",
      time: "4:00 PM",
      duration: "1.5 hours",
      host: "Career Services Team",
      attendees: 89,
      broadcastUrl: "https://example.com/live1",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "4",
      title: "Mindfulness Monday",
      type: "recorded",
      category: "Events",
      description:
        "Weekly mindfulness session with guided meditation and breathing exercises.",
      date: "2025-01-08",
      time: "Available now",
      duration: "30 mins",
      host: "Mindfulness Center",
      attendees: 567,
      broadcastUrl: "https://www.youtube.com/watch?v=jy-swk49uCg",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "5",
      title: "Practical Solution to deal with loneliness",
      type: "recorded",
      category: "Announcements",
      description:
        "Loneliness is common today; overcome it using self-talk, therapy, community, physical wellness, hobbies, mindfulness, social connections, and patience..",
      date: "2025-01-18",
      time: "12:00 PM",
      duration: "59 mins",
      host: "Ranbeer Allahbadia",
      broadcastUrl: "https://www.youtube.com/watch?v=ypAHnzD04rg",
      thumbnailUrl:
        "https://static.vecteezy.com/system/resources/previews/011/496/083/large_2x/psychologist-appointment-in-cartoon-flat-style-concept-of-mental-health-illustration-of-doctor-counseling-patient-two-women-talking-psychology-consultation-vector.jpg",
    },
    {
      id: "6",
      title: "Study Techniques That Actually Work",
      type: "recorded",
      category: "Workshops",
      description:
        "Evidence-based study methods that will transform your academic performance.",
      date: "2025-01-05",
      time: "Available now",
      duration: "1 hour",
      host: "Shonen Growth",
      attendees: 2340,
      broadcastUrl: "https://www.youtube.com/watch?v=LHYAX_aK1qk",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const filteredBroadcasts = broadcasts.filter((broadcast) => {
    const matchesCategory =
      selectedCategory === "All" || broadcast.category === selectedCategory;
    const matchesSearch =
      broadcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broadcast.host.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (type: string) => {
    switch (type) {
      case "live":
        return "bg-red-500 text-white";
      case "upcoming":
        return "bg-blue-500 text-white";
      case "recorded":
        return "bg-gradient-to-r from-fuchsia-300 to-indigo-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusLabel = (type: string) => {
    switch (type) {
      case "live":
        return "LIVE";
      case "upcoming":
        return "UPCOMING";
      case "recorded":
        return "RECORDED";
      default:
        return type.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-500 opacity-95">
      <StudentNavbar activeSection="broadcasts" setActiveSection={() => {}} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/student-dashboard")}
            className="flex items-center text-gray-600 hover:text-blue-500 mr-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Broadcast Hub
            </h1>
            <p className="text-gray-600 text-lg">
              Live sessions, podcasts, and wellness events
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search broadcasts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Broadcasts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBroadcasts.map((broadcast) => (
            <div
              key={broadcast.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="relative">
                <img
                  src={broadcast.thumbnailUrl}
                  alt={broadcast.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(
                      broadcast.type
                    )}`}
                  >
                    {getStatusLabel(broadcast.type)}
                  </span>
                </div>
                {broadcast.type === "live" && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-300 to-red-500 w-3 h-3 rounded-full animate-pulse"></div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="mb-3">
                    <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                      {broadcast.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {broadcast.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">by {broadcast.host}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {broadcast.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(broadcast.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {broadcast.time} • {broadcast.duration}
                    </div>
                    {broadcast.attendees && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {broadcast.attendees} participants
                      </div>
                    )}
                  </div>
                </div>

                {/* ✅ Watch / Join Button */}
                <a
                  href={broadcast.broadcastUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex justify-center items-center py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg mt-auto ${
                    broadcast.type === "live"
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : broadcast.type === "upcoming"
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  <Radio className="w-4 h-4 mr-2" />
                  {broadcast.type === "live"
                    ? "Join Live"
                    : broadcast.type === "upcoming"
                    ? "Set Reminder"
                    : "Watch Now"}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredBroadcasts.length === 0 && (
          <div className="text-center py-12">
            <Radio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No broadcasts found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BroadcastHub;
