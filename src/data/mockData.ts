
export interface Creator {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  coverArt: string;
  creatorId: string;
  categories: string[];
  isFeatured: boolean;
}

export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  audioUrl: string;
  durationInSeconds: number;
  publishedAt: string;
  listens: number;
}

export const mockCreators: Creator[] = [
  {
    id: "1",
    name: "Alex Johnson",
    bio: "Host of Tech Talks and Future Forward",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  },
  {
    id: "2",
    name: "Samantha Rivera",
    bio: "Storyteller and host of Fiction Hour",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  },
  {
    id: "3",
    name: "Michael Chen",
    bio: "Science enthusiast and producer",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  },
];

export const mockPodcasts: Podcast[] = [
  {
    id: "1",
    title: "Tech Talks",
    description: "Weekly discussions about the latest in technology, programming, and digital innovation.",
    coverArt: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    creatorId: "1",
    categories: ["Technology", "Programming"],
    isFeatured: true,
  },
  {
    id: "2",
    title: "Fiction Hour",
    description: "Original short stories and literary discussions for fiction lovers everywhere.",
    coverArt: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    creatorId: "2",
    categories: ["Fiction", "Literature"],
    isFeatured: true,
  },
  {
    id: "3",
    title: "Science Today",
    description: "Exploring scientific discoveries and breakthroughs that shape our world.",
    coverArt: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    creatorId: "3",
    categories: ["Science", "Education"],
    isFeatured: false,
  },
  {
    id: "4",
    title: "Future Forward",
    description: "Interviews with innovators and thought leaders shaping tomorrow's world.",
    coverArt: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    creatorId: "1",
    categories: ["Business", "Technology", "Innovation"],
    isFeatured: true,
  },
  {
    id: "5",
    title: "Daily Dose",
    description: "Your daily 15-minute update on current events and trending topics.",
    coverArt: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    creatorId: "2",
    categories: ["News", "Current Events"],
    isFeatured: false,
  },
  {
    id: "6",
    title: "Mind Matters",
    description: "Exploring psychology, mental health, and human behavior.",
    coverArt: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    creatorId: "3",
    categories: ["Health", "Psychology"],
    isFeatured: false,
  },
];

export const mockEpisodes: Episode[] = [
  {
    id: "1",
    podcastId: "1",
    title: "The Future of AI Development",
    description: "We discuss the latest trends in artificial intelligence and what developers need to know.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
    durationInSeconds: 2580, // 43 minutes
    publishedAt: "2023-06-15T09:00:00Z",
    listens: 4560,
  },
  {
    id: "2",
    podcastId: "1",
    title: "Building Scalable Web Applications",
    description: "Best practices and strategies for creating web apps that can handle growth.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
    durationInSeconds: 3120, // 52 minutes
    publishedAt: "2023-06-08T09:00:00Z",
    listens: 3890,
  },
  {
    id: "3",
    podcastId: "2",
    title: "The Lighthouse - Original Short Story",
    description: "A haunting tale of isolation and mystery set in a remote lighthouse.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3",
    durationInSeconds: 1860, // 31 minutes
    publishedAt: "2023-06-12T14:00:00Z",
    listens: 2750,
  },
  {
    id: "4",
    podcastId: "2",
    title: "Interview with Bestselling Author J.K. Morris",
    description: "J.K. Morris discusses her creative process and upcoming novel.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    durationInSeconds: 3480, // 58 minutes
    publishedAt: "2023-06-05T14:00:00Z",
    listens: 5120,
  },
  {
    id: "5",
    podcastId: "3",
    title: "Exploring Quantum Computing Basics",
    description: "An accessible introduction to the principles of quantum computing.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
    durationInSeconds: 2760, // 46 minutes
    publishedAt: "2023-06-10T11:30:00Z",
    listens: 1890,
  },
  {
    id: "6",
    podcastId: "3",
    title: "Climate Science: Myths and Facts",
    description: "Separating scientific consensus from common misconceptions about climate change.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
    durationInSeconds: 3000, // 50 minutes
    publishedAt: "2023-06-03T11:30:00Z",
    listens: 2340,
  },
  {
    id: "7",
    podcastId: "4",
    title: "Renewable Energy Revolution",
    description: "How innovative companies are transforming the energy sector.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
    durationInSeconds: 2700, // 45 minutes
    publishedAt: "2023-06-14T10:00:00Z",
    listens: 1760,
  },
  {
    id: "8",
    podcastId: "4",
    title: "SpaceX and the Future of Space Travel",
    description: "Examining private space exploration and its impact on the industry.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3",
    durationInSeconds: 3240, // 54 minutes
    publishedAt: "2023-06-07T10:00:00Z",
    listens: 3250,
  },
  {
    id: "9",
    podcastId: "5",
    title: "Monday Briefing: Global Updates",
    description: "This week's top stories from around the world in 15 minutes.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    durationInSeconds: 900, // 15 minutes
    publishedAt: "2023-06-12T07:00:00Z",
    listens: 6740,
  },
  {
    id: "10",
    podcastId: "5",
    title: "Friday Tech Roundup",
    description: "The week's most important technology news and developments.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
    durationInSeconds: 900, // 15 minutes
    publishedAt: "2023-06-09T07:00:00Z",
    listens: 5890,
  },
  {
    id: "11",
    podcastId: "6",
    title: "Understanding Anxiety in the Digital Age",
    description: "How modern technology affects our mental health and coping strategies.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
    durationInSeconds: 2940, // 49 minutes
    publishedAt: "2023-06-11T13:00:00Z",
    listens: 4120,
  },
  {
    id: "12",
    podcastId: "6",
    title: "The Psychology of Decision Making",
    description: "Exploring how we make choices and common cognitive biases.",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
    durationInSeconds: 3300, // 55 minutes
    publishedAt: "2023-06-04T13:00:00Z",
    listens: 3680,
  },
];

// Helper functions
export const getCreatorById = (id: string) => {
  return mockCreators.find(creator => creator.id === id);
};

export const getPodcastById = (id: string) => {
  return mockPodcasts.find(podcast => podcast.id === id);
};

export const getEpisodeById = (id: string) => {
  return mockEpisodes.find(episode => episode.id === id);
};

export const getEpisodesByPodcastId = (podcastId: string) => {
  return mockEpisodes.filter(episode => episode.podcastId === podcastId);
};

export const getFeaturedPodcasts = () => {
  return mockPodcasts.filter(podcast => podcast.isFeatured);
};

export const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
