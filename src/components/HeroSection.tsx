import { motion } from "framer-motion";
import GeometricCircles from "./GeometricCircles";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GeometricCircles />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 italic text-foreground/90"
        >
          "Quality is not an act,
          <br />
          <span className="text-gradient-neon">it's a habit."</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          I break things before users do. Passionate about test automation,
          quality processes, and building reliable software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          {[
            { label: "View Projects", href: "#projects" },
            { label: "Download Resume", href: "#resume" },
            {
              label: "Connect on LinkedIn",
              href: "https://www.linkedin.com/in/xavier-varghese-0b617624a",
              external: true,
            },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target={btn.external ? "_blank" : undefined}
              rel={btn.external ? "noopener noreferrer" : undefined}
              className="btn-press border border-neon text-neon px-7 py-3 rounded-md font-medium hover:bg-neon hover:text-primary-foreground transition-all text-sm tracking-wide"
            >
              {btn.label}
            </a>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
