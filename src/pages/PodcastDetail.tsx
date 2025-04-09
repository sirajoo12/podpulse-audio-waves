
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import EpisodeListItem from '@/components/podcasts/EpisodeListItem';
import { getPodcastById, getCreatorById, getEpisodesByPodcastId } from '@/data/mockData';
import { useAudio } from '@/contexts/AudioContext';

const PodcastDetail = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { playEpisode } = useAudio();
  
  const podcast = getPodcastById(podcastId || '');
  
  if (!podcast) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Podcast not found</h1>
          <Button asChild>
            <Link to="/browse">Browse Podcasts</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const creator = getCreatorById(podcast.creatorId);
  const episodes = getEpisodesByPodcastId(podcast.id);
  
  const handlePlayLatest = () => {
    if (episodes.length > 0) {
      const latestEpisode = episodes[0];
      playEpisode(latestEpisode.id);
    }
  };
  
  return (
    <div className="min-h-screen pt-16 pb-24">
      {/* Podcast header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-podcast-dark/90 to-podcast-darker" />
        <div className="relative pt-8 pb-6 px-4 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            asChild 
            className="text-gray-300 hover:text-white mb-6"
          >
            <Link to="/browse" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-1/3 lg:w-1/4">
              <img 
                src={podcast.coverArt} 
                alt={podcast.title} 
                className="w-full aspect-square object-cover rounded-lg shadow-xl"
              />
            </div>
            
            <div className="md:w-2/3 lg:w-3/4 space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{podcast.title}</h1>
              
              {creator && (
                <div className="flex items-center">
                  <img 
                    src={creator.avatarUrl} 
                    alt={creator.name} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="text-white font-medium">{creator.name}</h3>
                    <p className="text-sm text-gray-400">{creator.bio}</p>
                  </div>
                </div>
              )}
              
              <p className="text-gray-300">{podcast.description}</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {podcast.categories.map(category => (
                  <Badge key={category} className="bg-podcast-green/20 text-podcast-green hover:bg-podcast-green/30">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <div className="pt-4">
                <Button 
                  className="bg-podcast-green hover:bg-podcast-green/90 text-white" 
                  onClick={handlePlayLatest}
                  disabled={episodes.length === 0}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play Latest Episode
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="bg-gray-800" />
      
      {/* Episodes */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>
        
        {episodes.length === 0 ? (
          <div className="text-center py-8 bg-podcast-dark rounded-lg border border-gray-800">
            <p className="text-gray-400">No episodes available yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {episodes.map(episode => (
              <EpisodeListItem key={episode.id} episode={episode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastDetail;
