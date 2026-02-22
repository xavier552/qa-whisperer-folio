import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bug, Brain, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BugHunt from "./BugHunt";

const quizQuestions = [
  {
    question: "What is the primary purpose of regression testing?",
    options: [
      "To test new features only",
      "To ensure existing functionality still works after changes",
      "To test performance under load",
      "To validate UI design",
    ],
    correct: 1,
  },
  {
    question: "Which testing technique uses equivalence partitioning?",
    options: [
      "White-box testing",
      "Black-box testing",
      "Integration testing",
      "Unit testing",
    ],
    correct: 1,
  },
  {
    question: "What does STLC stand for?",
    options: [
      "Software Testing Life Cycle",
      "System Testing Logic Control",
      "Standard Test Level Check",
      "Software Test Logic Criteria",
    ],
    correct: 0,
  },
  {
    question: "Which is NOT a severity level for bugs?",
    options: ["Critical", "Major", "Cosmetic", "Developmental"],
    correct: 3,
  },
  {
    question: "What is a test case?",
    options: [
      "A bug report",
      "A set of conditions to verify a feature works correctly",
      "A deployment checklist",
      "A code review comment",
    ],
    correct: 1,
  },
  {
    question: "What is boundary value analysis?",
    options: [
      "Testing at the edges of input ranges",
      "Testing the middle of input ranges",
      "Testing random values",
      "Testing only valid inputs",
    ],
    correct: 0,
  },
  {
    question: "Which tool is commonly used for API testing?",
    options: ["Photoshop", "Postman", "Excel", "Notepad"],
    correct: 1,
  },
  {
    question: "What is the purpose of smoke testing?",
    options: [
      "To test every feature in detail",
      "To verify the basic functionality works before deeper testing",
      "To test performance",
      "To test security vulnerabilities",
    ],
    correct: 1,
  },
  {
    question: "In Selenium, what is Page Object Model (POM)?",
    options: [
      "A database model",
      "A design pattern that creates an object for each web page",
      "A testing framework",
      "A browser extension",
    ],
    correct: 1,
  },
  {
    question: "What does CI/CD stand for?",
    options: [
      "Code Integration / Code Delivery",
      "Continuous Integration / Continuous Deployment",
      "Complete Integration / Complete Delivery",
      "Central Integration / Central Deployment",
    ],
    correct: 1,
  },
];

const QAQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === quizQuestions[currentQ].correct) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setCorrectCount(0);
    setShowResult(false);
    setAnswered(false);
  };

  if (showResult) {
    const percentage = Math.round((correctCount / quizQuestions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-8 text-center"
      >
        <p className="text-5xl mb-4">{percentage >= 70 ? "🏆" : percentage >= 40 ? "📝" : "📚"}</p>
        <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
        <p className="text-neon text-xl font-bold mb-1">
          {correctCount}/{quizQuestions.length} Correct
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          {percentage >= 70
            ? "Excellent QA knowledge!"
            : percentage >= 40
            ? "Good effort, keep learning!"
            : "Time to brush up on QA fundamentals."}
        </p>
        <button
          onClick={restart}
          className="btn-press bg-neon text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  const q = quizQuestions[currentQ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-mono text-muted-foreground">
          Question {currentQ + 1}/{quizQuestions.length}
        </span>
        <span className="text-xs font-mono text-neon">
          Score: {correctCount}
        </span>
      </div>

      <div className="w-full h-1 bg-border rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-neon transition-all duration-300 rounded-full"
          style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
        />
      </div>

      <h3 className="text-lg font-semibold mb-6">{q.question}</h3>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, idx) => {
          let classes =
            "w-full text-left px-4 py-3 rounded-md border text-sm transition-all ";
          if (!answered) {
            classes +=
              "border-border hover:border-neon/50 hover:bg-neon/5 cursor-pointer";
          } else if (idx === q.correct) {
            classes += "border-neon bg-neon/10 text-neon";
          } else if (idx === selected && idx !== q.correct) {
            classes += "border-red-500 bg-red-500/10 text-red-400";
          } else {
            classes += "border-border opacity-50";
          }

          return (
            <button key={idx} onClick={() => handleAnswer(idx)} className={classes}>
              <span className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
                {answered && idx === q.correct && <CheckCircle size={16} className="ml-auto text-green-400 shrink-0" />}
                {answered && idx === selected && idx !== q.correct && <XCircle size={16} className="ml-auto text-red-400 shrink-0" />}
              </span>
            </button>
          );
        })}
      </div>

      {answered && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleNext}
          className="btn-press w-full bg-neon text-primary-foreground py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
        >
          {currentQ < quizQuestions.length - 1 ? "Next Question" : "See Results"}
        </motion.button>
      )}
    </div>
  );
};

const GameHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"quiz" | "bughunt">("quiz");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-neon transition-colors flex items-center gap-1 text-sm"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
        </div>

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
            Challenge yourself with a QA knowledge quiz or hunt bugs in the arcade game.
          </p>
        </motion.div>

        {/* Tab switcher */}
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
            onClick={() => setActiveTab("bughunt")}
            className={`btn-press flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all border ${
              activeTab === "bughunt"
                ? "border-neon bg-neon/10 text-neon"
                : "border-border text-muted-foreground hover:border-neon/40"
            }`}
          >
            <Bug size={16} />
            Bug Hunt
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
            key="bughunt"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BugHunt embedded />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameHub;
