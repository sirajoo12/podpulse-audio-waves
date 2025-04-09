
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatDuration } from '@/data/mockData';
import { Link } from 'react-router-dom';

const AudioPlayer = () => {
  const { 
    isPlaying, 
    currentEpisode, 
    currentPodcast,
    currentTime, 
    duration, 
    progress,
    volume,
    togglePlayPause, 
    seekTo,
    skip,
    setVolume
  } = useAudio();
  
  // Don't render the player if there's no episode
  if (!currentEpisode || !currentPodcast) return null;
  
  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    seekTo(newTime);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-podcast-dark border-t border-gray-800 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center">
          {/* Episode info */}
          <div className="flex items-center space-x-3 mb-3 sm:mb-0 sm:w-1/4">
            <Link to={`/podcast/${currentPodcast.id}`}>
              <img 
                src={currentPodcast.coverArt} 
                alt={currentPodcast.title} 
                className="h-12 w-12 rounded object-cover"
              />
            </Link>
            <div className="truncate">
              <Link to={`/podcast/${currentPodcast.id}/episode/${currentEpisode.id}`} className="text-sm font-medium text-white hover:text-podcast-green truncate block">
                {currentEpisode.title}
              </Link>
              <Link to={`/podcast/${currentPodcast.id}`} className="text-xs text-gray-400 hover:text-gray-300 truncate block">
                {currentPodcast.title}
              </Link>
            </div>
          </div>
          
          {/* Player controls */}
          <div className="flex flex-col space-y-2 w-full sm:w-1/2">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hidden sm:flex"
                onClick={() => skip(-10)}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-podcast-green"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hidden sm:flex"
                onClick={() => skip(10)}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400 w-12 text-right">
                {formatDuration(Math.floor(currentTime))}
              </span>
              
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                className="flex-1"
                onValueChange={handleProgressChange}
              />
              
              <span className="text-xs text-gray-400 w-12">
                {formatDuration(Math.floor(duration))}
              </span>
            </div>
          </div>
          
          {/* Volume control */}
          <div className="hidden sm:flex items-center space-x-2 sm:w-1/4 justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
            >
              {volume > 0 ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
