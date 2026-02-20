import { useState, useCallback } from "react";
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
import LensCursor from "@/components/LensCursor";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleComplete} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-background text-foreground">
          <LensCursor />
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
