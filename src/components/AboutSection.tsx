import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bug, TestTube, Zap, Shield, Smartphone, BarChart3 } from "lucide-react";

const skills = [
  { icon: TestTube, label: "Manual & Exploratory", desc: "Functional, Regression, Usability Testing" },
  { icon: Bug, label: "Automation Testing", desc: "Selenium WebDriver, TestNG, Maven, POM" },
  { icon: Zap, label: "API & Performance", desc: "Postman, JMeter" },
  { icon: Shield, label: "CI/CD & Version Control", desc: "Git, GitHub, JIRA, Tuskr" },
  { icon: Smartphone, label: "Mobile Testing", desc: "Android & iOS App Testing" },
  { icon: BarChart3, label: "Analytics Tools", desc: "Firebase, MoEngage, WebEngage, CleverTap, PostHog, Klaviyo" },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm Xavier Varghese — a detail-oriented QA Engineer based in Kochi, Kerala, India with 1.5+ years of hands-on experience in manual testing, automation frameworks, API validation, and performance testing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I specialize in mobile application testing across Android & iOS platforms, and I'm passionate about shift-left testing practices — embedding quality throughout the entire SDLC.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My toolkit includes Java, SQL, Selenium WebDriver, Postman, JMeter, and analytics platforms like Firebase, MoEngage, and CleverTap. I thrive on finding edge cases, writing thorough test cases, and collaborating with dev teams to ship reliable software.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["Java", "SQL", "Selenium", "TestNG", "Postman", "JMeter", "Git", "JIRA"].map((t) => (
                <span key={t} className="text-xs font-mono text-neon bg-neon/10 px-2.5 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
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
