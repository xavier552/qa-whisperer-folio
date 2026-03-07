import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, FileText, CheckCircle } from "lucide-react";

const SuccessAnimation = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={() => setTimeout(onComplete, 1800)}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Circle drawing */}
        <motion.div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--neon))"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </svg>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          >
            <CheckCircle className="text-neon" size={40} />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-lg font-semibold"
        >
          Resume Downloaded!
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-sm text-muted-foreground"
        >
          Thank you for your interest
        </motion.p>
      </div>
    </motion.div>
  );
};

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const resumeHighlights: { label: string; value: string; link?: string }[] = [
    { label: "Years of Experience", value: "1.5+", link: "/experience" },
    { label: "Manual Projects", value: "30+", link: "/tested-apps" },
    { label: "Bugs Identified", value: "777+" },
    { label: "SDLC & STLC", value: "Strong" },
  ];

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    // Trigger actual download here when you have a real resume file
  };

  return (
    <>
      <AnimatePresence>
        {showSuccess && <SuccessAnimation onComplete={() => setShowSuccess(false)} />}
      </AnimatePresence>

      <section id="resume" className="section-padding relative">
        <div className="max-w-4xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">Resume</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Resume</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {resumeHighlights.map((item) => {
              const Wrapper = item.link ? "button" : "div";
              return (
                <Wrapper
                  key={item.label}
                  onClick={item.link ? () => navigate(item.link!) : undefined}
                  className={`bg-card border border-border rounded-lg p-5 text-center hover:border-neon/40 transition-colors ${item.link ? "cursor-pointer" : ""}`}
                >
                  <p className="text-3xl font-bold text-neon mb-1">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </Wrapper>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-lg p-8 text-center"
          >
            <FileText className="text-neon mx-auto mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">Download Full Resume</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Get a detailed overview of my skills, experience, and certifications.
            </p>
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-press inline-flex items-center gap-2 bg-neon text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
            >
              <Download size={16} />
              Download Resume (PDF)
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ResumeSection;
