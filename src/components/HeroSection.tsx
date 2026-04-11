import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 italic text-foreground/90"
        >
          "Quality is not an act,
          <br />
          <span className="text-gradient-neon">it's a habit."</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
        >
          I break things before users do. Passionate about test automation,
          quality processes, and building reliable software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap px-2"
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
              onClick={(e) => {
                if (!btn.external) {
                  e.preventDefault();
                  const el = document.querySelector(btn.href);
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="btn-press border border-neon text-neon px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-medium hover:bg-neon hover:text-primary-foreground transition-all text-xs sm:text-sm tracking-wide"
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
