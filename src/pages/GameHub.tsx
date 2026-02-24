import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Brain, Eye, Sparkles } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import QAQuiz from "@/components/QAQuiz";
import FindTheDifference from "@/components/FindTheDifference";

const VenomButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
      active
        ? "bg-neon text-primary-foreground shadow-[0_0_30px_hsl(var(--neon)/0.5),0_0_60px_hsl(var(--neon)/0.2)]"
        : "border border-border text-muted-foreground hover:border-neon/60 hover:text-neon hover:shadow-[0_0_20px_hsl(var(--neon)/0.2)]"
    }`}
  >
    {active && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    )}
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </motion.button>
);

const GameHub = () => {
  const [activeTab, setActiveTab] = useState<"quiz" | "diff">("quiz");
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" ref={containerRef} style={{ cursor: "none" }}>
      <SubPageHeader />

      {/* Custom cursor */}
      {isHovering && (
        <motion.div
          className="pointer-events-none fixed z-[100] mix-blend-difference"
          animate={{ x: cursorPos.x - 16, y: cursorPos.y - 16 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-neon shadow-[0_0_15px_hsl(var(--neon)/0.6)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-neon" />
          </div>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto px-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Sparkles className="text-neon" size={28} />
            </motion.div>
          </div>
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">
            QA Playground
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Test Your QA Skills
          </h1>
          <p className="text-sm text-muted-foreground">
            Challenge yourself with an ISTQB quiz or find UI differences like a real QA engineer.
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mb-8">
          <VenomButton active={activeTab === "quiz"} onClick={() => setActiveTab("quiz")}>
            <Brain size={16} />
            QA Quiz
          </VenomButton>
          <VenomButton active={activeTab === "diff"} onClick={() => setActiveTab("diff")}>
            <Eye size={16} />
            Find the Difference
          </VenomButton>
        </div>

        {activeTab === "quiz" ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl mx-auto"
          >
            <QAQuiz />
          </motion.div>
        ) : (
          <motion.div
            key="diff"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FindTheDifference />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameHub;
