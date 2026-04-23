import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentNavbar from '../components/StudentNavbar';
import { Play, Clock, ArrowLeft, Search, ExternalLink } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  creator: string;
  category: string;
  duration: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: string;
}

const VideosHub: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Meditation', 'Motivation', 'Study Tips', 'Stress Relief', 'Mindfulness', 'Self-Care'];

  const videos: Video[] = [
    {
      id: '1',
      title: 'Morning Meditation for Students',
      creator: 'Mindful Learning',
      category: 'Meditation',
      duration: '16:05',
      description: 'Start your day with focus and clarity through this guided meditation designed specifically for students.',
      videoUrl: 'https://www.youtube.com/watch?v=W19PdslW7iw',
      thumbnailUrl: 'https://i.ytimg.com/vi/Kn5GcSHQURI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBj38LI8S1Ny02xmdx97OpzevQpug',
      views: '5.2M'
    },
    {
      id: '2',
      title: 'One Thing You Must Do to Overcome Anxiety',
      creator: 'Sadhguru',
      category: 'Stress Relief',
      duration: '11:06',
      description: 'Sadhguru talks about how to overcome anxiety disorders without any kind of external support.',
      videoUrl: 'https://www.youtube.com/watch?v=1XCObQjSHIs',
      thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdEoC0szK8N8kToebmvUGoZIQpRjHLMmKUtw&s',
      views: '5.4M'
    },
    {
      id: '3',
      title: 'The Science of Motivation',
      creator: 'Andrew Huberman',
      category: 'Motivation',
      duration: '1:29:02',
      description: 'Discover what drives motivation and how to maintain it during challenging times.',
      videoUrl: 'https://www.youtube.com/watch?v=vA50EK70whE&t=382s',
      thumbnailUrl: 'https://i.ytimg.com/vi/vA50EK70whE/maxresdefault.jpg',
      views: '1.9M'
    },
    {
      id: '4',
      title: 'How to Focus on your Goal',
      creator: 'Sandeep Maheshwari',
      category: 'Study Tips',
      duration: '18:55',
      description: "Think about what's really important to you in life. Make that your priority.",
      videoUrl: 'https://www.youtube.com/watch?v=AmTbx_8SMMw',
      thumbnailUrl: 'https://i.ytimg.com/vi/AmTbx_8SMMw/mqdefault.jpg',
      views: '10M'
    },
    {
      id: '5',
      title: 'Self-Compassion | खुद को माफ़ करो और आगे बढ़ो ',
      creator: 'Wellness Works',
      category: 'Self-Care',
      duration: '21:43',
      description: "Being kind to yourself reduces anxiety, strengthens mindset, and helps you grow through life’s challenges.",
      videoUrl: 'https://www.youtube.com/watch?v=tTbU5HUXfsc',
      thumbnailUrl: 'https://i.ytimg.com/vi/-RWsAn2qOng/mqdefault.jpg',
      views: '40.4K'
    },
    {
      id: '6',
      title: '5-Minute Breathing Exercise',
      creator: 'Saurabh Bothra',
      category: 'Mindfulness',
      duration: '6:32',
      description: 'Quick breathing exercise perfect for between classes or during study breaks.',
      videoUrl: 'https://www.youtube.com/watch?v=8TTABLdGCKI',
      thumbnailUrl: 'https://i.ytimg.com/vi/8TTABLdGCKI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBXvHoyK8zDzAp21ZwYOu3ts92QuA',
      views: '1M'
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.creator.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-500 opacity-95">
      <StudentNavbar activeSection="videos" setActiveSection={() => {}} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/student-dashboard')}
            className="flex items-center text-gray-600 hover:text-blue-600 mr-6 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight" style={{ letterSpacing: '0.5px' }}>Videos Hub</h1>
            <p className="text-gray-600 text-lg font-semi-bold">Motivational and educational content for your wellness journey</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400 font-medium transition-all duration-200"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
              <div className="relative group">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-12 h-12 text-white animate-pulse" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {video.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 tracking-tight">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 font-medium">by {video.creator}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{video.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{video.views} views</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* ✅ Watch Video Button */}
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg mt-auto bg-gradient-to-r from-fuchsia-300 to-indigo-600 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Video
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Play className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No videos found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default VideosHub;
