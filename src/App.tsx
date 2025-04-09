
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import PodcastDetail from "./pages/PodcastDetail";
import Upload from "./pages/Upload";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/layout/Navbar";
import AudioPlayer from "./components/player/AudioPlayer";

// Contexts
import { AudioProvider } from "./contexts/AudioContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <AuthProvider>
          <AudioProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen bg-podcast-darker">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <AudioPlayer />
              </div>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </AudioProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
