
import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDuration, formatDate, Episode } from '@/data/mockData';
import { useAudio } from '@/contexts/AudioContext';

interface EpisodeListItemProps {
  episode: Episode;
}

const EpisodeListItem: React.FC<EpisodeListItemProps> = ({ episode }) => {
  const { currentEpisode, isPlaying, playEpisode, togglePlayPause } = useAudio();
  
  const isCurrentEpisode = currentEpisode?.id === episode.id;
  
  const handlePlayClick = () => {
    if (isCurrentEpisode) {
      togglePlayPause();
    } else {
      playEpisode(episode.id);
    }
  };
  
  return (
    <div className={`flex items-center space-x-4 p-3 rounded-md ${isCurrentEpisode ? 'bg-podcast-gray/20' : 'hover:bg-podcast-gray/10'}`}>
      <Button
        size="icon"
        variant="ghost"
        className={`rounded-full ${isCurrentEpisode ? 'text-podcast-green hover:text-podcast-green/90' : 'text-white hover:text-podcast-green'}`}
        onClick={handlePlayClick}
      >
        {isCurrentEpisode && isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>
      
      <div className="min-w-0 flex-1">
        <h4 className={`font-medium truncate ${isCurrentEpisode ? 'text-podcast-green' : 'text-white'}`}>
          {episode.title}
        </h4>
        <p className="text-sm text-gray-400 truncate">{episode.description}</p>
      </div>
      
      <div className="text-right hidden sm:block">
        <div className="text-sm text-gray-400">{formatDate(episode.publishedAt)}</div>
        <div className="text-xs text-gray-500">{formatDuration(episode.durationInSeconds)}</div>
      </div>
    </div>
  );
};

export default EpisodeListItem;
