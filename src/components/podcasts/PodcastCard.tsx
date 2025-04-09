
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCreatorById, Podcast } from '@/data/mockData';

interface PodcastCardProps {
  podcast: Podcast;
  className?: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, className = '' }) => {
  const creator = getCreatorById(podcast.creatorId);
  
  return (
    <Card className={`bg-podcast-dark border-gray-800 hover:bg-podcast-gray/30 transition-all group ${className}`}>
      <CardContent className="p-4">
        <Link to={`/podcast/${podcast.id}`} className="block">
          <div className="relative mb-4 aspect-square overflow-hidden rounded-md">
            <img 
              src={podcast.coverArt} 
              alt={podcast.title} 
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="icon" className="bg-podcast-green hover:bg-podcast-green/90 text-white rounded-full">
                <Play className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <h3 className="font-semibold text-white truncate">{podcast.title}</h3>
          {creator && (
            <p className="text-sm text-gray-400 truncate">By {creator.name}</p>
          )}
        </Link>
      </CardContent>
    </Card>
  );
};

export default PodcastCard;
