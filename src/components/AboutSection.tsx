import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bug, TestTube, Zap, Shield, Smartphone, BarChart3, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UIShowcase from "./UIShowcase";

const skills = [
  { icon: TestTube, label: "Manual & Exploratory", desc: "Functional, Regression, Usability Testing" },
  { icon: Bug, label: "Automation Testing", desc: "Selenium WebDriver, TestNG, Maven, Cucumber (BDD), POM" },
  { icon: Zap, label: "API & Performance", desc: "Postman, JMeter" },
  { icon: Shield, label: "CI/CD & Version Control", desc: "Git, GitHub, JIRA, Tuskr" },
  { icon: Smartphone, label: "Mobile Testing", desc: "Android & iOS App Testing" },
  { icon: BarChart3, label: "Analytics Tools", desc: "Firebase, MoEngage, WebEngage, CleverTap, PostHog, Klaviyo" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <UIShowcase />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-2 md:mt-4"
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Xavier Varghese</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              A detail-oriented QA Engineer based in Kochi, Kerala, India with 1.5+ years of hands-on experience in manual testing, automation, API validation, and performance testing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I specialize in mobile application testing across Android & iOS platforms, and I'm passionate about shift-left testing practices — embedding quality throughout the entire SDLC.
            </p>
            <button
              onClick={() => navigate("/about")}
              className="btn-press inline-flex items-center gap-2 text-neon text-sm font-medium hover:opacity-80 transition-opacity mt-2"
            >
              Get to know me
              <ArrowRight size={14} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {skills.map((skill, i) => (
              <motion.button
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                onClick={() => navigate("/about")}
                className="bg-card border border-border rounded-lg p-4 hover:border-neon/50 transition-colors group text-left"
              >
                <skill.icon className="text-neon mb-3 group-hover:drop-shadow-[0_0_8px_hsl(72,100%,50%,0.5)] transition-all" size={22} />
                <h3 className="font-semibold text-sm mb-1">{skill.label}</h3>
                <p className="text-xs text-muted-foreground">{skill.desc}</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
