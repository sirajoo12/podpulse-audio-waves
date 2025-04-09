
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PodcastGrid from '@/components/podcasts/PodcastGrid';
import { getFeaturedPodcasts, mockPodcasts } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const featuredPodcasts = getFeaturedPodcasts();
  const recentPodcasts = [...mockPodcasts].sort(() => Math.random() - 0.5).slice(0, 5);
  
  return (
    <div className="min-h-screen pt-20 pb-24">
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-podcast-dark to-podcast-darker py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover and Stream Amazing Podcasts
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            PodPulse brings you the best podcasts from independent creators. Listen, discover, and connect with your favorite shows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild
              className="bg-podcast-green hover:bg-podcast-green/90 text-white px-8 py-6"
              size="lg"
            >
              <Link to="/browse">Browse Shows</Link>
            </Button>
            
            {!isAuthenticated && (
              <Button 
                variant="outline" 
                className="border-gray-700 text-white hover:bg-gray-800 px-8 py-6"
                size="lg"
              >
                Start Creating
              </Button>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured podcasts */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Podcasts</h2>
          <Button 
            variant="link" 
            asChild
            className="text-podcast-green hover:text-podcast-green/90"
          >
            <Link to="/browse" className="flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <PodcastGrid podcasts={featuredPodcasts} />
      </section>
      
      {/* Recent podcasts */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recently Added</h2>
          <Button 
            variant="link" 
            asChild
            className="text-podcast-green hover:text-podcast-green/90"
          >
            <Link to="/browse" className="flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <PodcastGrid podcasts={recentPodcasts} />
      </section>
      
      {/* CTA section */}
      <section className="bg-podcast-dark border border-gray-800 rounded-lg max-w-5xl mx-auto my-12 p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Share Your Voice?
        </h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join PodPulse as a creator and start uploading your podcast episodes today. Reach new listeners and grow your audience.
        </p>
        <Button 
          asChild
          className="bg-podcast-green hover:bg-podcast-green/90 text-white"
          size="lg"
        >
          <Link to={isAuthenticated ? "/upload" : "/"}>
            {isAuthenticated ? "Upload Your Podcast" : "Get Started"}
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
