import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import ResumeSection from "@/components/ResumeSection";
import BugHuntSection from "@/components/BugHuntSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import LiveClock from "@/components/LiveClock";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  // Handle hash scrolling when navigating back from sub-pages
  useEffect(() => {
    if (!loading) {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          el?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleComplete} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-background/80 text-foreground relative z-10 overflow-x-hidden">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <BlogSection />
          <ContactSection />
          <ResumeSection />
          <BugHuntSection />
          <Footer />
          <LiveClock />
        </div>
      )}
    </>
  );
};

export default Index;
