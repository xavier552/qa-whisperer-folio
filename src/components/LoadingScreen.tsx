import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show loading on first visit per session
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          sessionStorage.setItem("hasLoaded", "true");
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{ backgroundColor: "hsl(120, 30%, 6%)" }}
      >
        {/* Animated rings */}
        <div className="relative w-32 h-32 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                border: `1px solid hsl(72, 100%, 50%, ${0.3 - i * 0.08})`,
              }}
              animate={{ rotate: 360, scale: [1, 1.1 + i * 0.05, 1] }}
              transition={{
                rotate: { duration: 3 + i, repeat: Infinity, ease: "linear" },
                scale: { duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="hsl(72, 100%, 50%)" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
            </svg>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-mono tracking-widest uppercase mb-6"
          style={{ color: "hsl(72, 100%, 50%)" }}
        >
          Xavier Varghese
        </motion.p>

        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "hsl(72, 100%, 50%)" }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-xs mt-3 font-mono" style={{ color: "hsl(0, 0%, 40%)" }}>
          {Math.min(Math.round(progress), 100)}%
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
