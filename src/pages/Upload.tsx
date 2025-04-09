
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { mockPodcasts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Upload = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [podcastId, setPodcastId] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Filter podcasts to show only those belonging to the current user (simplified for demo)
  const creatorPodcasts = mockPodcasts;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !podcastId || !audioFile) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Upload successful",
      description: "Your episode has been uploaded successfully",
    });
    
    setIsUploading(false);
    
    // Navigate to the podcast page after successful upload
    navigate(`/podcast/${podcastId}`);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-24 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md bg-podcast-dark border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Authentication Required</CardTitle>
            <CardDescription>You need to log in to upload podcasts</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-podcast-green hover:bg-podcast-green/90 text-white"
            >
              Go Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Upload a New Episode</h1>
      <p className="text-gray-400 mb-8">Share your latest episode with your listeners</p>
      
      <Card className="bg-podcast-dark border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Episode Details</CardTitle>
          <CardDescription>Fill in the information about your new episode</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="podcast" className="text-white">Podcast</Label>
              <Select value={podcastId} onValueChange={setPodcastId}>
                <SelectTrigger id="podcast" className="bg-podcast-gray/20 border-gray-700 text-white">
                  <SelectValue placeholder="Select a podcast" />
                </SelectTrigger>
                <SelectContent className="bg-podcast-dark border-gray-700">
                  {creatorPodcasts.map(podcast => (
                    <SelectItem key={podcast.id} value={podcast.id} className="text-white hover:bg-podcast-gray/20">
                      {podcast.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Episode Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title of your episode"
                className="bg-podcast-gray/20 border-gray-700 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Episode Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your episode"
                rows={4}
                className="bg-podcast-gray/20 border-gray-700 text-white resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="audio" className="text-white">Audio File</Label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-podcast-gray/10">
                {audioFile ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <span className="text-podcast-green font-medium">{audioFile.name}</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-gray-700"
                      onClick={() => setAudioFile(null)}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="audio-input" className="cursor-pointer block">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <UploadCloud className="h-10 w-10 text-gray-400" />
                      <p className="text-white">
                        Drag and drop your audio file or click to browse
                      </p>
                      <p className="text-gray-400 text-sm">
                        Supports MP3, WAV, M4A (max 100MB)
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-700"
                      >
                        Select File
                      </Button>
                    </div>
                    <input
                      id="audio-input"
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setAudioFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
            
            <Alert variant="default" className="bg-podcast-green/10 border-podcast-green/20 text-podcast-green">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Make sure you have the rights to distribute this content. Uploading copyrighted material without permission is prohibited.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-podcast-green hover:bg-podcast-green/90 text-white"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Episode"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
