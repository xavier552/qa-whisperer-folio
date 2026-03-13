import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GameHub from "./pages/GameHub";
import AllProjects from "./pages/AllProjects";
import AboutPage from "./pages/AboutPage";
import ExperiencePage from "./pages/ExperiencePage";
import TestedApps from "./pages/TestedApps";
import BlogsPage from "./pages/BlogsPage";
import ClickSpark from "./components/ClickSpark";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ClickSpark sparkColor="#00ff41" sparkSize={10} sparkRadius={20} sparkCount={8} duration={500}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/play" element={<GameHub />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/tested-apps" element={<TestedApps />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ClickSpark>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
