import { motion } from "framer-motion";
import GeometricCircles from "./GeometricCircles";
import { ArrowDown } from "lucide-react";
import useClickSound from "@/hooks/useClickSound";

const HeroSection = () => {
  const playClick = useClickSound();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GeometricCircles />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neon font-mono text-sm mb-4 tracking-widest uppercase"
        >
          QA Engineer | Test Automation Specialist
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4"
        >
          Xavier
          <br />
          <span className="text-gradient-neon">Varghese</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground/90 italic mb-3 max-w-2xl mx-auto"
        >
          "Quality is not an act, it's a habit."
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          I break things before users do. Passionate about test automation, quality processes, and building reliable software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#projects"
            onClick={playClick}
            className="bg-neon text-primary-foreground px-8 py-3 rounded-md font-medium hover:opacity-90 transition-opacity text-sm tracking-wide"
          >
            View Projects
          </a>
          <a
            href="#resume"
            onClick={playClick}
            className="border border-neon text-neon px-8 py-3 rounded-md font-medium hover:bg-neon hover:text-primary-foreground transition-all text-sm tracking-wide"
          >
            Download Resume
          </a>
          <a
            href="https://www.linkedin.com/in/xavier-varghese-0b617624a"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="border border-border text-muted-foreground px-8 py-3 rounded-md font-medium hover:border-neon hover:text-neon transition-all text-sm tracking-wide"
          >
            Connect on LinkedIn
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="text-neon" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
