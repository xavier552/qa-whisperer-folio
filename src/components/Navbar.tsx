import { useState, useEffect, useCallback } from "react";
import { Menu, X, Home, User, FolderOpen, Mail, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import useClickSound from "@/hooks/useClickSound";

const navItems = [
  { label: "Home", href: "home", icon: Home },
  { label: "About", href: "about", icon: User },
  { label: "Projects", href: "projects", icon: FolderOpen },
  { label: "Contact", href: "contact", icon: Mail },
  { label: "Resume", href: "resume", icon: FileText },
];

const QA_CHECKS = [
  { label: "Page loads correctly", key: "page" },
  { label: "No red errors", key: "console" },
  { label: "No failed calls", key: "network" },
  { label: "Session persists", key: "auth" },
  { label: "No duplicate calls", key: "api" },
  { label: "Correct reset or restore", key: "forms" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showRefresh, setShowRefresh] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const playClick = useClickSound();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection (home page only)
  useEffect(() => {
    if (!isHome) return;
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
  }, [isHome]);

  const handleNavClick = useCallback(
    (href: string, e?: React.MouseEvent) => {
      e?.preventDefault();
      setIsOpen(false);
      if (isHome) {
        const el = document.getElementById(href);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/#" + href);
      }
    },
    [isHome, navigate]
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      playClick();

      if (!isHome) {
        const lastSection = sessionStorage.getItem("lastSection") || "home";
        navigate("/#" + lastSection);
        return;
      }

      if (showRefresh) return;
      setShowRefresh(true);
      setCheckedItems([]);

      QA_CHECKS.forEach((check, i) => {
        setTimeout(() => {
          setCheckedItems((prev) => [...prev, check.key]);
        }, 200 + i * 180);
      });

      setTimeout(() => {
        setShowRefresh(false);
        const el = document.getElementById("home");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 1600);
    },
    [playClick, showRefresh, isHome, navigate]
  );

  return (
    <>
      {/* Refresh overlay */}
      <AnimatePresence>
        {showRefresh && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ backdropFilter: "blur(12px)", backgroundColor: "hsl(0 0% 4% / 0.85)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -5 }}
              transition={{ duration: 0.35 }}
              className="bg-card border border-border rounded-lg p-8 w-full max-w-sm mx-4 shadow-2xl"
            >
              <div className="w-full h-px bg-border mb-6 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-neon"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              </div>

              <p className="text-xs font-mono text-neon tracking-widest uppercase mb-5 text-center">
                Refreshing Session...
              </p>

              <div className="space-y-2.5">
                {QA_CHECKS.map((check) => (
                  <div key={check.key} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <AnimatePresence mode="wait">
                        {checkedItems.includes(check.key) ? (
                          <motion.span
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-neon text-sm"
                          >
                            ✔
                          </motion.span>
                        ) : (
                          <motion.div key="dot" className="w-1.5 h-1.5 rounded-full bg-border" />
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-muted-foreground">
                        [{check.key.charAt(0).toUpperCase() + check.key.slice(1)}]
                      </span>
                      <span className={checkedItems.includes(check.key) ? "text-foreground" : "text-muted-foreground/50"}>
                        {check.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-border mt-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
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
              const isActive = isHome && activeSection === item.href;
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
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground active:scale-90 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
                  const isActive = isHome && activeSection === item.href;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm tracking-wide transition-colors text-left ${
                        isActive
                          ? "text-neon bg-neon/10"
                          : "text-muted-foreground hover:text-neon hover:bg-neon/5"
                      }`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </button>
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
