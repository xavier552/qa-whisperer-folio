import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useClickSound from "@/hooks/useClickSound";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBugAnim, setShowBugAnim] = useState(false);
  const playClick = useClickSound();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    if (showBugAnim) return;
    setShowBugAnim(true);
    setTimeout(() => {
      setShowBugAnim(false);
      const el = document.getElementById("home");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }, [playClick, showBugAnim]);

  return (
    <>
      {/* Bug animation overlay */}
      <AnimatePresence>
        {showBugAnim && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ y: "100vh", opacity: 0, scale: 1 }}
              animate={{ y: "-100vh", opacity: [0, 1, 1, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-5xl"
            >
              🐞
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
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

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={playClick}
                className="text-sm text-muted-foreground hover:text-neon transition-colors duration-200 tracking-wide uppercase"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => { setIsOpen(!isOpen); playClick(); }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => { setIsOpen(false); playClick(); }}
                    className="text-sm text-muted-foreground hover:text-neon transition-colors uppercase tracking-wide"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
