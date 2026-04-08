import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, FileText, CheckCircle } from "lucide-react";
import CountUp from "./CountUp";

const SuccessAnimation = ({ onComplete }: { onComplete: () => void }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onAnimationComplete={() => setTimeout(onComplete, 1800)}
  >
    <div className="flex flex-col items-center gap-4">
      <motion.div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--neon))" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} />
        </svg>
        <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 300 }}>
          <CheckCircle className="text-neon" size={40} />
        </motion.div>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-lg font-semibold">Resume Downloaded!</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-sm text-muted-foreground">Thank you for your interest</motion.p>
    </div>
  </motion.div>
);

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const resumeHighlights: { label: string; value: number; suffix: string; link?: string }[] = [
    { label: "Years Experience", value: 1.7, suffix: "+", link: "/experience" },
    { label: "Projects", value: 30, suffix: "+", link: "/tested-apps" },
    { label: "Website & Mobile Automation Knowledge", value: 0, suffix: "⚙️" },
    { label: "Bugs Found", value: 555, suffix: "+" },
  ];

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    const link = document.createElement("a");
    link.href = "/XAVIER_ATS_CV.pdf";
    link.download = "XAVIER_ATS_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <AnimatePresence>
        {showSuccess && <SuccessAnimation onComplete={() => setShowSuccess(false)} />}
      </AnimatePresence>

      <section id="resume" className="section-padding relative">
        <div className="max-w-4xl mx-auto" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
            <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">Resume</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Resume</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {resumeHighlights.map((item) => {
              const Wrapper = item.link ? "button" : "div";
              return (
                <Wrapper
                  key={item.label}
                  onClick={item.link ? () => navigate(item.link!) : undefined}
                  className={`bg-card border border-border rounded-lg p-5 text-center hover:border-neon/40 transition-colors ${item.link ? "cursor-pointer" : ""}`}
                >
                  <p className="text-3xl font-bold mb-1">
                    {item.value !== 0 ? (
                      <CountUp end={item.value} suffix={item.suffix} />
                    ) : (
                      <span className="text-foreground">{item.suffix}</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </Wrapper>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="bg-card border border-border rounded-lg p-8 text-center">
            <FileText className="text-neon mx-auto mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">Download Full Resume</h3>
            <p className="text-sm text-muted-foreground mb-6">Get a detailed overview of my skills, experience, and certifications.</p>
            <div className="flex items-center justify-center gap-3">
              <motion.button onClick={handleDownload} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="btn-press inline-flex items-center gap-2 bg-neon text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
              >
                <Download size={16} /> Download Resume (PDF)
              </motion.button>
              <motion.button onClick={() => setShowPreview(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="btn-press inline-flex items-center gap-2 border border-neon/50 text-neon px-4 py-3 rounded-md font-medium hover:bg-neon/10 transition-colors text-sm"
              >
                <Eye size={16} /> Preview
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ResumeSection;
