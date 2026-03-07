import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "QA Engineer",
    company: "Appmaker.xyz",
    period: "Sep 2024 — Present",
    description:
      "Perform manual testing of Shopify-based mobile applications on Android and iOS. Test end-to-end user flows, conduct functional, usability, and regression testing. Validate UI/UX consistency across themes, widgets, and plugin features.",
    tech: ["Manual Testing", "Android", "iOS", "Firebase", "MoEngage"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">
            02. Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Where I've Worked
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.2 }}
                className="relative pl-14"
              >
                <div className="absolute left-2.5 top-1 w-4 h-4 rounded-full bg-neon neon-glow" />

                <div className="bg-card border border-border rounded-lg p-6 hover:border-neon/30 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <Briefcase className="text-neon" size={16} />
                    <h3 className="font-semibold text-lg">{exp.role}</h3>
                    <span className="text-neon text-sm">@ {exp.company}</span>
                  </div>
                  <p className="text-muted-foreground text-xs font-mono mb-3">{exp.period}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-xs font-mono text-neon bg-neon/10 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
