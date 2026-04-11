import { useEffect } from "react";
import { Bug, TestTube, Zap, Shield, Smartphone, BarChart3, User, ArrowRight, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import SubPageHeader from "@/components/SubPageHeader";
import FadeInUp from "@/components/FadeInUp";

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
    <div className="min-h-screen bg-background/80 text-foreground relative z-10">
      <SubPageHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <FadeInUp>
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">About Me</p>
          <h1 className="text-3xl md:text-4xl font-bold">Xavier Varghese</h1>
          <p className="text-muted-foreground text-sm mt-1">QA Engineer · Detail-Oriented · Quality Advocate</p>
        </FadeInUp>

        {/* Profile Section */}
        <FadeInUp delay={0.1} className="grid md:grid-cols-3 gap-8 mb-16 mt-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full bg-card border-2 border-neon/30 flex items-center justify-center mb-4 overflow-hidden">
              <User className="text-neon/40" size={64} />
            </div>
            <h2 className="text-lg font-bold">Xavier Varghese</h2>
            <p className="text-sm text-neon font-mono">QA Engineer</p>
            <p className="text-xs text-muted-foreground mt-1">Kochi, India</p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              I am a Software Quality Engineer with 1.5+ years of hands-on experience in manual testing, currently working with mobile applications built using Appmaker.xyz.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I specialize in mobile application testing across Android and iOS platforms, ensuring stable releases through structured testing practices including functional, regression, and usability testing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Although my professional experience has been focused on manual testing, I also have knowledge of test automation concepts and tools. I am passionate about shift-left testing practices, collaborating closely with development teams to identify issues early and maintain product quality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My toolkit includes Java, SQL, Selenium WebDriver, Postman, JMeter, along with analytics platforms such as Firebase, MoEngage, and CleverTap.
            </p>

            <div className="p-4 bg-neon/5 border border-neon/20 rounded-lg">
              <p className="text-sm font-semibold text-neon mb-1">🎓 Certified Software Testing Specialist (NACTET)</p>
              <p className="text-xs text-muted-foreground">
                Software Testing Specialist · Credential ID: 54883
              </p>
            </div>

            <Link
              to="/experience"
              className="inline-flex items-center gap-3 mt-2 px-5 py-3 rounded-lg border border-neon/30 bg-neon/5 hover:bg-neon/10 hover:border-neon/50 transition-all group"
            >
              <Briefcase className="text-neon" size={18} />
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-neon transition-colors">My Experience</p>
                <p className="text-xs text-muted-foreground">View my professional journey</p>
              </div>
              <ArrowRight size={16} className="text-neon ml-auto group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeInUp>

        {/* Skills Section */}
        <FadeInUp delay={0.2} className="mb-16">
          <h2 className="text-2xl font-bold mb-2">What I Do</h2>
          <p className="text-sm text-muted-foreground mb-8">Hover over a skill to learn more</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.label}
                className="bg-card border border-border rounded-lg p-6 hover:border-neon/50 hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden"
              >
                <skill.icon className="text-neon mb-3 group-hover:drop-shadow-[0_0_8px_hsl(72,100%,50%,0.5)] transition-all" size={28} />
                <h3 className="font-semibold mb-2">{skill.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 sm:block hidden">
                  {skill.desc}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed sm:hidden">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Tools & Technologies */}
        <FadeInUp delay={0.3}>
          <h2 className="text-2xl font-bold mb-6">Core Knowledge</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-3">
                {["Java", "SQL"].map((t) => (
                  <span key={t} className="text-xs font-mono text-neon bg-neon/10 px-3 py-1.5 rounded-md">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-3">Testing Tools</h3>
              <div className="flex flex-wrap gap-3">
                {["Selenium WebDriver", "TestNG", "Maven", "Cucumber (BDD)", "Postman", "JMeter", "JIRA", "Tuskr", "Git", "GitHub"].map((t) => (
                  <span key={t} className="text-xs font-mono text-neon bg-neon/10 px-3 py-1.5 rounded-md">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-3">Testing Skills</h3>
              <div className="flex flex-wrap gap-3">
                {["Manual Testing", "Functional Testing", "Regression Testing", "Smoke Testing", "Usability Testing", "Exploratory Testing", "Mobile App Testing (Android & iOS)", "API Testing", "Performance Testing", "Cross-Device Testing", "Release Validation"].map((t) => (
                  <span key={t} className="text-xs font-mono text-neon bg-neon/10 px-3 py-1.5 rounded-md">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-3">Analytics & Engagement Tools</h3>
              <div className="flex flex-wrap gap-3">
                {["Firebase", "MoEngage", "WebEngage", "CleverTap", "Klaviyo", "PostHog"].map((t) => (
                  <span key={t} className="text-xs font-mono text-neon bg-neon/10 px-3 py-1.5 rounded-md">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default AboutPage;
