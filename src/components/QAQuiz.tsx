import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Play, RotateCcw } from "lucide-react";
import istqbQuestions from "@/data/istqbQuestions";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUESTIONS_PER_QUIZ = 10;

const QAQuiz = () => {
  const [started, setStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(() =>
    shuffle(istqbQuestions).slice(0, QUESTIONS_PER_QUIZ)
  );
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
    if (currentQ < QUESTIONS_PER_QUIZ - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setQuizQuestions(shuffle(istqbQuestions).slice(0, QUESTIONS_PER_QUIZ));
    setCurrentQ(0);
    setSelected(null);
    setCorrectCount(0);
    setShowResult(false);
    setAnswered(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-8 text-center"
      >
        <div className="text-4xl mb-4">🧠</div>
        <h3 className="text-2xl font-bold mb-2">ISTQB Quiz Challenge</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Get 10 surprise ISTQB-style questions pulled from our secret QA bank.
        </p>
        <p className="text-xs text-muted-foreground/70 italic mb-6">
          Every attempt is a fresh mission — because real testers never test the same scenario twice!
        </p>
        <button
          onClick={() => setStarted(true)}
          className="btn-press inline-flex items-center gap-2 bg-neon text-primary-foreground px-8 py-3 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
        >
          <Play size={16} />
          Start Quiz
        </button>
      </motion.div>
    );
  }

  if (showResult) {
    const percentage = Math.round((correctCount / QUESTIONS_PER_QUIZ) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-8 text-center"
      >
        <p className="text-5xl mb-4">
          {percentage >= 70 ? "🏆" : percentage >= 40 ? "📝" : "📚"}
        </p>
        <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
        <p className="text-neon text-xl font-bold mb-1">
          {correctCount}/{QUESTIONS_PER_QUIZ} Correct
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
          className="btn-press inline-flex items-center gap-2 bg-neon text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
        >
          <RotateCcw size={14} />
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
          Question {currentQ + 1}/{QUESTIONS_PER_QUIZ}
        </span>
        <span className="text-xs font-mono text-neon">Score: {correctCount}</span>
      </div>

      <div className="w-full h-1 bg-border rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-neon transition-all duration-300 rounded-full"
          style={{ width: `${((currentQ + 1) / QUESTIONS_PER_QUIZ) * 100}%` }}
        />
      </div>

      <h3 className="text-lg font-semibold mb-6">{q.question}</h3>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, idx) => {
          let classes =
            "w-full text-left px-4 py-3 rounded-md border text-sm transition-all ";
          if (!answered) {
            classes += "border-border hover:border-neon/50 hover:bg-neon/5 cursor-pointer";
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
                {answered && idx === q.correct && (
                  <CheckCircle size={16} className="ml-auto text-green-400 shrink-0" />
                )}
                {answered && idx === selected && idx !== q.correct && (
                  <XCircle size={16} className="ml-auto text-red-400 shrink-0" />
                )}
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
          {currentQ < QUESTIONS_PER_QUIZ - 1 ? "Next Question" : "See Results"}
        </motion.button>
      )}
    </div>
  );
};

export default QAQuiz;
