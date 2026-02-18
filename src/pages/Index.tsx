import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import ResumeSection from "@/components/ResumeSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import LiveClock from "@/components/LiveClock";

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
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <BlogSection />
          <ContactSection />
          <ResumeSection />
          <Footer />
          <LiveClock />
        </div>
      )}
    </>
  );
};

export default Index;
