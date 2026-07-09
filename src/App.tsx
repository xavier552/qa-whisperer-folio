import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GameHub from "./pages/GameHub";
import AllProjects from "./pages/AllProjects";
import AboutPage from "./pages/AboutPage";
import ExperiencePage from "./pages/ExperiencePage";
import TestedApps from "./pages/TestedApps";
import ClickSpark from "./components/ClickSpark";
import GlobalBackground from "./components/GlobalBackground";

const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ClickSpark sparkColor="#00ff41" sparkSize={10} sparkRadius={20} sparkCount={8} duration={500}>
        <Toaster />
        <Sonner />
        <GlobalBackground />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/play" element={<GameHub />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/tested-apps" element={<TestedApps />} />
              <Route path="/blog" element={<BlogsPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/blogs" element={<Navigate to="/blog" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ClickSpark>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
