
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PodcastGrid from '@/components/podcasts/PodcastGrid';
import { mockPodcasts } from '@/data/mockData';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract unique categories from all podcasts
  const allCategories = Array.from(
    new Set(mockPodcasts.flatMap(podcast => podcast.categories))
  ).sort();
  
  // Filter podcasts based on search query and selected category
  const filteredPodcasts = mockPodcasts.filter(podcast => {
    const matchesSearch = searchQuery === '' || 
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      podcast.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Browse Podcasts</h1>
      
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-podcast-dark border-gray-700 text-white focus:border-podcast-green focus:ring-podcast-green"
          />
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className={selectedCategory === null 
              ? "bg-podcast-green hover:bg-podcast-green/90" 
              : "border-gray-700 hover:bg-gray-700"
            }
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          
          {allCategories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category 
                ? "bg-podcast-green hover:bg-podcast-green/90" 
                : "border-gray-700 hover:bg-gray-700"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Results */}
      <PodcastGrid 
        podcasts={filteredPodcasts} 
        title={`${filteredPodcasts.length} Podcast${filteredPodcasts.length !== 1 ? 's' : ''} Found`} 
      />
    </div>
  );
};

export default Browse;
