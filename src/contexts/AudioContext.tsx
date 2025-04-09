
import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { getEpisodeById, getPodcastById, Episode, Podcast } from '../data/mockData';

interface AudioContextType {
  isPlaying: boolean;
  currentEpisode: Episode | null;
  currentPodcast: Podcast | null;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  playEpisode: (episodeId: string) => void;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
  skip: (seconds: number) => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    };
    
    const audio = audioRef.current;
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);
  
  // Update audio src when episode changes
  useEffect(() => {
    if (currentEpisode && audioRef.current) {
      audioRef.current.src = currentEpisode.audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error('Error playing audio:', err));
      }
    }
  }, [currentEpisode]);
  
  // Update play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  const playEpisode = (episodeId: string) => {
    const episode = getEpisodeById(episodeId);
    if (episode) {
      const podcast = getPodcastById(episode.podcastId);
      setCurrentEpisode(episode);
      setCurrentPodcast(podcast || null);
      setIsPlaying(true);
    }
  };
  
  const togglePlayPause = () => {
    if (currentEpisode) {
      setIsPlaying(!isPlaying);
    }
  };
  
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const skip = (seconds: number) => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime + seconds;
      seekTo(Math.max(0, Math.min(newTime, duration)));
    }
  };
  
  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };
  
  const value = {
    isPlaying,
    currentEpisode,
    currentPodcast,
    currentTime,
    duration,
    progress,
    volume,
    playEpisode,
    togglePlayPause,
    seekTo,
    skip,
    setVolume
  };
  
  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
