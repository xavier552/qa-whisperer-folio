import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Wrench } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";

const experiences = [
  {
    role: "Associate QA / App Testing Specialist",
    company: "Appmaker.xyz",
    location: "Remote",
    period: "October 2024 — Present",
    type: "Full-time",
    summary:
      "Leading quality assurance across mobile platforms, ensuring every release meets the highest standards through rigorous testing methodologies and data-driven insights.",
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
    tech: [
      "Selenium",
      "Postman",
      "JMeter",
      "JIRA",
      "Firebase",
      "MoEngage",
      "Tuskr",
      "TestNG",
    ],
  },
];

const ExperiencePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHeader />
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-3">
            Career Journey
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">My Experience</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            Building quality into every product through meticulous testing and a
            passion for uncovering what others miss.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon/60 via-border to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
              className="relative pl-12 md:pl-20 mb-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 md:left-6 top-2 w-5 h-5 rounded-full bg-background border-2 border-neon shadow-[0_0_12px_hsl(var(--neon)/0.4)] z-10" />

              {/* Card */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-neon/30 transition-all duration-300">
                {/* Card header */}
                <div className="p-6 md:p-8 border-b border-border/50">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-1">
                        {exp.role}
                      </h2>
                      <p className="text-neon font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:text-right shrink-0">
                      <span className="flex items-center gap-1.5 sm:justify-end">
                        <Calendar size={13} className="text-neon/70" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 sm:justify-end">
                        <MapPin size={13} className="text-neon/70" />
                        {exp.location} · {exp.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                    {exp.summary}
                  </p>
                </div>

                {/* Responsibilities & Achievements */}
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-4">
                      What I Do
                    </h3>
                    <ul className="space-y-3">
                      {exp.responsibilities.map((r, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          className="text-sm text-muted-foreground flex items-start gap-2.5"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neon shrink-0" />
                          {r}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-4 flex items-center gap-2">
                      <Trophy size={14} className="text-neon" />
                      Key Wins
                    </h3>
                    <ul className="space-y-3 mb-8">
                      {exp.achievements.map((a, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className="text-sm text-muted-foreground flex items-start gap-2.5"
                        >
                          <span className="text-neon shrink-0 mt-0.5">✓</span>
                          {a}
                        </motion.li>
                      ))}
                    </ul>

                    <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-4 flex items-center gap-2">
                      <Wrench size={14} className="text-neon" />
                      Tools & Tech
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t, i) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.04 }}
                          className="text-xs font-mono text-neon bg-neon/10 border border-neon/20 px-2.5 py-1 rounded-full"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
