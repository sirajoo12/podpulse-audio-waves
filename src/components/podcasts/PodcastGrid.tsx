
import React from 'react';
import PodcastCard from './PodcastCard';
import { Podcast } from '@/data/mockData';

interface PodcastGridProps {
  podcasts: Podcast[];
  title?: string;
}

const PodcastGrid: React.FC<PodcastGridProps> = ({ podcasts, title }) => {
  if (podcasts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No podcasts found</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default PodcastGrid;
