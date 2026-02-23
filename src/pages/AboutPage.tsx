import { useEffect } from "react";
import { motion } from "framer-motion";
import { Bug, TestTube, Zap, Shield, Smartphone, BarChart3, User } from "lucide-react";
import Navbar from "@/components/Navbar";

const skills = [
  { icon: TestTube, label: "Manual & Exploratory Testing", desc: "Skilled in functional, regression, usability, and exploratory testing. I design comprehensive test cases that cover edge cases and critical user flows, ensuring every feature meets quality standards before release." },
  { icon: Bug, label: "Automation Testing", desc: "Proficient in Selenium WebDriver with Java, TestNG, Maven, and Cucumber (BDD). I implement the Page Object Model (POM) framework for maintainable and scalable test automation suites." },
  { icon: Zap, label: "API & Performance Testing", desc: "Experienced in validating RESTful APIs using Postman with comprehensive request/response verification. Conduct load, stress, and endurance testing using Apache JMeter to measure response times and throughput." },
  { icon: Shield, label: "CI/CD & Version Control", desc: "Familiar with Git, GitHub for version control and collaboration. Experience with CI/CD pipelines and tools like JIRA and Tuskr for defect tracking and test management." },
  { icon: Smartphone, label: "Mobile App Testing", desc: "Hands-on experience testing Android & iOS applications. I perform functional, UI, compatibility, and performance testing across multiple devices and OS versions." },
  { icon: BarChart3, label: "Analytics & Monitoring", desc: "Proficient in analytics platforms including Firebase, MoEngage, WebEngage, CleverTap, PostHog, and Klaviyo. I validate event tracking, user funnels, and data accuracy across platforms." },
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">About Me</p>
          <h1 className="text-3xl md:text-4xl font-bold">Xavier Varghese</h1>
          <p className="text-muted-foreground text-sm mt-1">QA Engineer · Detail-Oriented · Quality Advocate</p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full bg-card border-2 border-neon/30 flex items-center justify-center mb-4 overflow-hidden">
              <User className="text-neon/40" size={64} />
            </div>
            <h2 className="text-lg font-bold">Xavier Varghese</h2>
            <p className="text-sm text-neon font-mono">QA Engineer</p>
            <p className="text-xs text-muted-foreground mt-1">Kochi, Kerala, India</p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              I'm Xavier Varghese — a detail-oriented QA Engineer with 1.5+ years of hands-on experience in manual testing, automation frameworks, API validation, and performance testing. I believe quality is not just a phase — it's a mindset that must be embedded throughout the entire software development lifecycle.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I specialize in mobile application testing across Android & iOS platforms and I'm passionate about shift-left testing practices. My toolkit includes Java, SQL, Selenium WebDriver, Postman, JMeter, and analytics platforms like Firebase, MoEngage, and CleverTap.
            </p>

            <div className="mt-6 p-4 bg-neon/5 border border-neon/20 rounded-lg">
              <p className="text-sm font-semibold text-neon mb-1">🎓 Certified Software Testing Specialist (NACTET)</p>
              <p className="text-xs text-muted-foreground">
                Software Testing Specialist · Credential ID: 54883
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">What I Do</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-neon/50 transition-colors group"
              >
                <skill.icon className="text-neon mb-3 group-hover:drop-shadow-[0_0_8px_hsl(72,100%,50%,0.5)] transition-all" size={28} />
                <h3 className="font-semibold mb-2">{skill.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Tools & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Java", "SQL", "Selenium WebDriver", "Selenium IDE", "TestNG", "Maven", "Cucumber (BDD)",
              "Postman", "Apache JMeter", "Git", "GitHub", "JIRA", "Tuskr",
              "Firebase", "MoEngage", "WebEngage", "CleverTap", "PostHog", "Klaviyo",
              "Android Testing", "iOS Testing",
            ].map((t) => (
              <span key={t} className="text-xs font-mono text-neon bg-neon/10 px-3 py-1.5 rounded-md">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
