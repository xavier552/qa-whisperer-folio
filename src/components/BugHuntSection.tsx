import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bug, Crosshair } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useClickSound from "@/hooks/useClickSound";

const BugHuntSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const playClick = useClickSound();

  return (
    <section id="bughunt" className="section-padding relative">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">
            07. Bug Hunt Arena
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            🐞 QA Bug Hunt
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-3">
            In software testing, we eliminate bugs before they reach production.
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 font-semibold text-foreground/80">
            In this arena, you eliminate them yourself.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-8 md:p-12 max-w-lg mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Crosshair className="text-neon" size={32} />
            <Bug className="text-neon animate-pulse" size={32} />
          </div>

          <div className="space-y-3 text-sm text-muted-foreground mb-8 text-left">
            <p>🔫 <span className="text-foreground">Move:</span> Arrow keys / WASD / Touch controls</p>
            <p>💥 <span className="text-foreground">Shoot:</span> Spacebar / Tap</p>
            <p>🐛 <span className="text-foreground">Goal:</span> Destroy bugs before they escape</p>
            <p>❤️ <span className="text-foreground">Lives:</span> 3 lives, increasing difficulty</p>
          </div>

          <button
            onClick={() => {
              playClick();
              navigate("/bug-hunt");
            }}
            className="bg-neon text-primary-foreground px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm tracking-wide inline-flex items-center gap-2"
          >
            <Crosshair size={16} />
            Start Bug Hunt
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BugHuntSection;
