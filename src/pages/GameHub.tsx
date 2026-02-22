import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import QAQuiz from "@/components/QAQuiz";
import FindTheDifference from "@/components/FindTheDifference";

const GameHub = () => {
  const [activeTab, setActiveTab] = useState<"quiz" | "diff">("quiz");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
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

        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("quiz")}
            className={`btn-press flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all border ${
              activeTab === "quiz"
                ? "border-neon bg-neon/10 text-neon"
                : "border-border text-muted-foreground hover:border-neon/40"
            }`}
          >
            <Brain size={16} />
            QA Quiz
          </button>
          <button
            onClick={() => setActiveTab("diff")}
            className={`btn-press flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all border ${
              activeTab === "diff"
                ? "border-neon bg-neon/10 text-neon"
                : "border-border text-muted-foreground hover:border-neon/40"
            }`}
          >
            <Eye size={16} />
            Find the Difference
          </button>
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
