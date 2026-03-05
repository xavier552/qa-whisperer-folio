import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      onComplete();
      return;
    }

    // Show quote content after brief delay
    setTimeout(() => setShowContent(true), 200);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          sessionStorage.setItem("hasLoaded", "true");
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.random() * 12 + 4;
      });
    }, 140);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: "hsl(0, 0%, 3%)" }}
      >
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(72 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(72 100% 50% / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-neon/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-neon/20" />

        {/* Main content */}
        <div className="relative z-10 max-w-2xl text-center">
          {showContent && (
            <>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.6 }}
                className="h-px bg-neon mx-auto mb-10"
              />

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6"
              >
                <p
                  className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight italic"
                  style={{ color: "hsl(60, 100%, 97%)" }}
                >
                  "Quality is not an act,
                  <br />
                  <span style={{ color: "hsl(72, 100%, 50%)" }}>it's a habit."</span>
                </p>
              </motion.blockquote>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-12"
                style={{ color: "hsl(0, 0%, 50%)" }}
              >
                I break things before users do. Passionate about test automation,
                quality processes, and building reliable software.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mb-8"
              >
                <p
                  className="text-xs font-mono tracking-[0.3em] uppercase"
                  style={{ color: "hsl(72, 100%, 50%)" }}
                >
                  Xavier Varghese
                </p>
              </motion.div>
            </>
          )}

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-48 mx-auto"
          >
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "hsl(72, 100%, 50%)" }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p
              className="text-[10px] mt-2 font-mono tracking-widest"
              style={{ color: "hsl(0, 0%, 35%)" }}
            >
              {Math.min(Math.round(progress), 100)}%
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
