import { useState, useEffect, useCallback } from "react";
import { Menu, X, Home, User, FolderOpen, Mail, FileText, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import useClickSound from "@/hooks/useClickSound";

const navItems = [
  { label: "Home", href: "home", icon: Home },
  { label: "About", href: "about", icon: User },
  { label: "Projects", href: "projects", icon: FolderOpen },
  { label: "Contact", href: "contact", icon: Mail },
  { label: "Resume", href: "resume", icon: FileText },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const playClick = useClickSound();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
    el?.scrollIntoView({ behavior: "smooth" });
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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <button onClick={handleLogoClick} className="text-left group">
          <span className="text-sm font-bold text-neon tracking-tight block leading-tight group-hover:opacity-80 transition-opacity">
            Xavier Varghese
          </span>
          <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase block leading-tight">
            QA_Engineer
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            const isResume = item.label === "Resume";
            return (
              <button
                key={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={`text-sm transition-colors duration-200 tracking-wide uppercase relative pb-0.5 ${
                  isActive
                    ? "text-neon"
                    : isResume
                    ? "text-neon font-semibold"
                    : "text-muted-foreground hover:text-neon"
                }`}
              >
                {isResume ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex items-center gap-1"
                  >
                    <FileText size={14} />
                    {item.label}
                  </motion.span>
                ) : (
                  item.label
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-neon"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-border hover:border-neon/40 text-muted-foreground hover:text-neon transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-border text-muted-foreground hover:text-neon transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <button
            className="text-foreground active:scale-90 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                const isResume = item.label === "Resume";
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm tracking-wide transition-colors text-left ${
                      isActive
                        ? "text-neon bg-neon/10"
                        : isResume
                        ? "text-neon bg-neon/5 font-semibold"
                        : "text-muted-foreground hover:text-neon hover:bg-neon/5"
                    }`}
                  >
                    <Icon size={16} />
                    {isResume ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="flex items-center gap-1"
                      >
                        {item.label}
                      </motion.span>
                    ) : (
                      item.label
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
