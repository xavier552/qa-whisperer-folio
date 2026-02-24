import { useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, Store } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";

const itExperiences = [
  {
    role: "Associate QA / App Testing Specialist",
    company: "Appmaker.xyz",
    period: "October 2024 — Present",
    type: "Full-time",
    responsibilities: [
      "Conduct functional, regression, performance & usability testing across Android & iOS platforms",
      "Validate mobile applications for cross-device compatibility and UI consistency",
      "Identify, document and track defects using JIRA and Tuskr",
      "Collaborate with developers to ensure release quality and timely bug fixes",
      "Analyze engagement metrics using Firebase, MoEngage, WebEngage, CleverTap, PostHog & Klaviyo",
      "Perform API testing using Postman for backend validation",
      "Execute load and stress testing with Apache JMeter",
    ],
    achievements: [
      "Identified 777+ bugs across multiple product releases",
      "Reduced regression cycle time through systematic test case optimization",
      "Built automated test suites using Selenium WebDriver with Java",
    ],
    tech: ["Selenium", "Postman", "JMeter", "JIRA", "Firebase", "MoEngage", "Tuskr", "TestNG"],
  },
];

const nonItExperiences = [
  {
    role: "Retail Sales Associate",
    company: "Various Retail Outlets",
    period: "2021 — 2023",
    type: "Full-time",
    responsibilities: [
      "Managed customer interactions and provided product recommendations",
      "Handled inventory management and stock tracking",
      "Processed transactions and maintained sales records",
      "Collaborated with team members to meet sales targets",
    ],
    achievements: [
      "Developed strong communication and problem-solving skills",
      "Built attention to detail through inventory management",
    ],
    tech: [],
  },
];

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: (typeof itExperiences)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + index * 0.15 }}
    className="relative"
  >
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 hover:border-neon/40 transition-all duration-300 group">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold group-hover:text-neon transition-colors">
            {exp.role}
          </h3>
          <p className="text-neon text-sm font-medium mt-1">@ {exp.company}</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
          <span className="block text-xs text-neon/70 mt-0.5">{exp.type}</span>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="text-sm font-semibold text-foreground/80 mb-2">Responsibilities</h4>
        <ul className="space-y-1.5">
          {exp.responsibilities.map((r, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-neon mt-1.5 shrink-0 w-1 h-1 rounded-full bg-neon" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {exp.achievements.length > 0 && (
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-foreground/80 mb-2">Key Achievements</h4>
          <ul className="space-y-1.5">
            {exp.achievements.map((a, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-neon shrink-0">✓</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      {exp.tech.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span key={t} className="text-xs font-mono text-neon bg-neon/10 px-2.5 py-1 rounded-md">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const ExperiencePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHeader />
      <div className="max-w-5xl mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">
            Career Journey
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">My Experience</h1>
        </motion.div>

        {/* IT Experience */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
              <Code className="text-neon" size={20} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">💻 IT Experience</h2>
              <p className="text-xs text-muted-foreground">Software Quality Assurance</p>
            </div>
          </div>

          <div className="space-y-6">
            {itExperiences.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Non-IT Experience */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
              <Store className="text-neon" size={20} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">📌 Non-IT Experience</h2>
              <p className="text-xs text-muted-foreground">Prior Professional Background</p>
            </div>
          </div>

          <div className="space-y-6">
            {nonItExperiences.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperiencePage;
