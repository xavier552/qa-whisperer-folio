import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, FileText } from "lucide-react";
import useClickSound from "@/hooks/useClickSound";

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const playClick = useClickSound();

  const resumeHighlights = [
    { label: "Years of Experience", value: "1.5+" },
    { label: "Manual Projects", value: "30+" },
    { label: "Bugs Identified", value: "777+" },
    { label: "SDLC & STLC", value: "Strong" },
  ];

  return (
    <section id="resume" className="section-padding relative">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">
            06. Resume
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Resume</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {resumeHighlights.map((item) => (
            <div
              key={item.label}
              className="bg-card border border-border rounded-lg p-5 text-center hover:border-neon/40 transition-colors"
            >
              <p className="text-3xl font-bold text-neon mb-1">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
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
          <a
            href="#"
            onClick={playClick}
            className="inline-flex items-center gap-2 bg-neon text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
          >
            <Download size={16} />
            Download Resume (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
