
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ListMusic } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PodcastGrid from '@/components/podcasts/PodcastGrid';
import EpisodeListItem from '@/components/podcasts/EpisodeListItem';
import { useAuth } from '@/contexts/AuthContext';
import { mockPodcasts, mockEpisodes } from '@/data/mockData';

const Library = () => {
  const { isAuthenticated } = useAuth();
  
  // Mock user's saved podcasts and recently played episodes
  // In a real app, these would come from the user's data in the database
  const savedPodcasts = mockPodcasts.slice(0, 4);
  const recentEpisodes = mockEpisodes.slice(0, 5);
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-24 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <ListMusic className="h-16 w-16 text-podcast-green mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Your Library</h1>
          <p className="text-gray-400 mb-6">
            Login to access your saved podcasts and recently played episodes
          </p>
          <Link 
            to="/"
            className="inline-block bg-podcast-green hover:bg-podcast-green/90 text-white px-4 py-2 rounded-md"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Your Library</h1>
      
      <Tabs defaultValue="podcasts" className="space-y-8">
        <TabsList className="bg-podcast-dark border border-gray-800">
          <TabsTrigger 
            value="podcasts" 
            className="data-[state=active]:bg-podcast-green data-[state=active]:text-white"
          >
            Saved Podcasts
          </TabsTrigger>
          <TabsTrigger 
            value="recent" 
            className="data-[state=active]:bg-podcast-green data-[state=active]:text-white"
          >
            Recently Played
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="podcasts" className="space-y-8 min-h-[400px]">
          {savedPodcasts.length > 0 ? (
            <PodcastGrid podcasts={savedPodcasts} />
          ) : (
            <div className="text-center py-16 bg-podcast-dark rounded-lg border border-gray-800">
              <ListMusic className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No saved podcasts yet</h2>
              <p className="text-gray-400 mb-6">
                Start following your favorite podcasts and they'll appear here
              </p>
              <Link 
                to="/browse"
                className="inline-block bg-podcast-green hover:bg-podcast-green/90 text-white px-4 py-2 rounded-md"
              >
                Discover Podcasts
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4 min-h-[400px]">
          {recentEpisodes.length > 0 ? (
            <div className="space-y-2 bg-podcast-dark rounded-lg border border-gray-800 p-4">
              {recentEpisodes.map(episode => (
                <EpisodeListItem key={episode.id} episode={episode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-podcast-dark rounded-lg border border-gray-800">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No recent activity</h2>
              <p className="text-gray-400 mb-6">
                Episodes you listen to will appear here
              </p>
              <Link 
                to="/browse"
                className="inline-block bg-podcast-green hover:bg-podcast-green/90 text-white px-4 py-2 rounded-md"
              >
                Start Listening
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;
