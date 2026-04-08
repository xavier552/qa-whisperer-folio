import { useState, useEffect, useCallback } from "react";
import { Menu, X, Home, User, FolderOpen, Mail, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useClickSound from "@/hooks/useClickSound";

const navItems = [
  { label: "Home", href: "home", icon: Home },
  { label: "About", href: "about", icon: User },
  { label: "Projects", href: "projects", icon: FolderOpen },
  { label: "Contact", href: "contact", icon: Mail },
  { label: "Resume", href: "resume", icon: FileText },
];

const ResumePreviewModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={onClose} />
    <motion.div
      initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      exit={{ scale: 0.85, opacity: 0, rotateY: 15 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative z-10 bg-card border border-border rounded-2xl w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden shadow-2xl"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <FileText className="text-neon" size={18} />
          <span className="text-sm font-semibold">Resume Preview</span>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
          <X size={14} />
        </button>
      </div>
      <div className="flex-1 bg-background">
        <iframe src="/XAVIER_ATS_CV.pdf" className="w-full h-full border-0" title="Resume Preview" />
      </div>
    </motion.div>
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showPreview, setShowPreview] = useState(false);
  const playClick = useClickSound();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((item) => item.href);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            sessionStorage.setItem("lastSection", entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((href: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsOpen(false);
    const el = document.getElementById(href);
    if (el) {
      const offset = 80; // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      playClick();
      const el = document.getElementById("home");
      el?.scrollIntoView({ behavior: "smooth" });
    },
    [playClick]
  );

  return (
    <>
      <AnimatePresence>
        {showPreview && <ResumePreviewModal onClose={() => setShowPreview(false)} />}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <button onClick={handleLogoClick} className="text-left group">
            <span className="text-sm font-bold text-neon tracking-tight block leading-tight group-hover:opacity-80 transition-opacity">Xavier Varghese</span>
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase block leading-tight">QA_Engineer</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              const isResume = item.label === "Resume";
              return (
                <div key={item.href} className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleNavClick(item.href, e)}
                    className={`text-sm transition-colors duration-200 tracking-wide uppercase relative pb-0.5 ${
                      isActive ? "text-neon" : isResume ? "text-neon font-semibold" : "text-muted-foreground hover:text-neon"
                    }`}
                  >
                    {isResume ? (
                      <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="flex items-center gap-1">
                        <FileText size={14} /> {item.label}
                      </motion.span>
                    ) : item.label}
                    {isActive && (
                      <motion.div layoutId="activeIndicator" className="absolute -bottom-1 left-0 right-0 h-px bg-neon" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                    )}
                  </button>
                  {isResume && (
                    <button onClick={() => setShowPreview(true)} className="text-muted-foreground hover:text-neon transition-colors p-0.5" title="Preview Resume">
                      <Eye size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button className="md:hidden text-foreground active:scale-90 transition-transform" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
              <div className="px-6 py-4 flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;
                  const isResume = item.label === "Resume";
                  const Icon = item.icon;
                  return (
                    <div key={item.href} className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleNavClick(item.href, e)}
                        className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-md text-sm tracking-wide transition-colors text-left ${
                          isActive ? "text-neon bg-neon/10" : isResume ? "text-neon bg-neon/5 font-semibold" : "text-muted-foreground hover:text-neon hover:bg-neon/5"
                        }`}
                      >
                        <Icon size={16} />
                        {isResume ? (
                          <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>{item.label}</motion.span>
                        ) : item.label}
                      </button>
                      {isResume && (
                        <button onClick={() => { setIsOpen(false); setShowPreview(true); }} className="text-muted-foreground hover:text-neon transition-colors p-2" title="Preview Resume">
                          <Eye size={16} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
