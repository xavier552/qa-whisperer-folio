import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Glitch effect
  useEffect(() => {
    const chars = "!@#$%^&*()_+{}|:<>?";
    const interval = setInterval(() => {
      const glitched = "404"
        .split("")
        .map((c) => (Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : c))
        .join("");
      setGlitchText(glitched);
      setTimeout(() => setGlitchText("404"), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background/80 text-foreground flex items-center justify-center relative overflow-hidden z-10">
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-neon/30"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, Math.random() * -200, Math.random() * 200],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Big 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-6"
        >
          <h1 className="text-[120px] md:text-[160px] font-bold leading-none text-neon/10 select-none relative">
            <span className="absolute inset-0 flex items-center justify-center text-neon animate-pulse">
              {glitchText}
            </span>
            404
          </h1>
        </motion.div>

        {/* Animated broken search icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg"
          >
            <Search className="text-neon" size={28} />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold mb-3"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-sm mb-8 leading-relaxed"
        >
          Oops! Looks like this page went on a break. Even the best QA engineers can't find bugs on a page that doesn't exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/"
            className="btn-press inline-flex items-center justify-center gap-2 bg-neon text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-press inline-flex items-center justify-center gap-2 border border-border text-muted-foreground px-6 py-3 rounded-lg font-medium hover:border-neon/50 hover:text-neon transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </motion.div>

        {/* Attempted path */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-xs text-muted-foreground font-mono"
        >
          Attempted: <span className="text-neon/70">{location.pathname}</span>
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
