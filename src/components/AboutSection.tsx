import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bug, TestTube, Zap, Shield } from "lucide-react";

const skills = [
  { icon: TestTube, label: "Test Automation", desc: "Selenium, Cypress, Playwright" },
  { icon: Bug, label: "Bug Hunting", desc: "Manual & Exploratory Testing" },
  { icon: Zap, label: "CI/CD", desc: "Jenkins, GitHub Actions, GitLab CI" },
  { icon: Shield, label: "API Testing", desc: "Postman, REST Assured, k6" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">
            01. About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm a QA Engineer with a passion for ensuring software quality at every level. 
              From writing comprehensive test plans to building robust automation frameworks, 
              I believe in catching bugs before they reach production.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My expertise spans across manual testing, test automation, API testing, 
              performance testing, and CI/CD integration. I enjoy collaborating with 
              development teams to embed quality throughout the software development lifecycle.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not breaking software, you'll find me writing about QA best practices, 
              exploring new testing tools, or contributing to the testing community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-card border border-border rounded-lg p-5 hover:border-neon/50 transition-colors group"
              >
                <skill.icon className="text-neon mb-3 group-hover:drop-shadow-[0_0_8px_hsl(72,100%,50%,0.5)] transition-all" size={24} />
                <h3 className="font-semibold text-sm mb-1">{skill.label}</h3>
                <p className="text-xs text-muted-foreground">{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
