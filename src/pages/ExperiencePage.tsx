import { useEffect } from "react";
import { Calendar, MapPin, Trophy, Wrench } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import FadeInUp from "@/components/FadeInUp";

const experiences = [
  {
    role: "QA Engineer",
    company: "Appmaker.xyz",
    location: "Kochi, India",
    period: "Sep 2024 — Present",
    type: "Full-time",
    summary:
      "Ensuring quality across Shopify-based mobile applications on Android and iOS platforms through structured manual testing practices, cross-device validation, and close collaboration with the development and support teams.",
    responsibilities: [
      "Perform manual testing of Shopify-based mobile applications on Android and iOS platforms",
      "Test end-to-end user flows including onboarding, navigation, product browsing, checkout, payments, and notifications",
      "Conduct functional, usability, and regression testing to validate new releases and updates",
      "Identify, document, and track defects using traditional tracking methods such as Excel and Google Sheets",
      "Validate UI/UX consistency across themes, widgets, and plugin features",
      "Execute smoke testing, regression testing, and re-testing cycles for each build generated from the Appmaker dashboard",
      "Perform cross-device and cross-version compatibility testing across Android and iOS devices",
      "Work with the support team to reproduce customer issues and validate fixes",
      "Test webview-based eCommerce flows such as product listing, cart, and checkout",
      "Conduct release validation before Play Store / App Store submission",
      "Support developers by re-testing and performing regression testing after CI/CD pipeline updates",
    ],
    achievements: [
      "Contributed to successful releases for multiple client apps with minimal post-release issues",
      "Helped ensure stable mobile experiences across different devices and OS versions",
      "Supported rapid development cycles by quickly validating builds and retesting fixes",
    ],
    tech: [
      "Manual Testing",
      "Android",
      "iOS",
      "Firebase",
      "MoEngage",
      "Excel",
      "Google Sheets",
    ],
  },
];

const ExperiencePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-foreground relative z-10">
      <SubPageHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-20">
        {/* Header */}
        <FadeInUp className="mb-16">
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-3">
            Career Journey
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">My Experience</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            Building quality into every product through meticulous testing and a
            passion for uncovering what others miss.
          </p>
        </FadeInUp>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon/60 via-border to-transparent" />

          {experiences.map((exp, index) => (
            <FadeInUp key={index} delay={0.2 + index * 0.15} className="relative pl-12 md:pl-20 mb-12">
              <div className="absolute left-2 md:left-6 top-2 w-5 h-5 rounded-full bg-background border-2 border-neon shadow-[0_0_12px_hsl(var(--neon)/0.4)] z-10" />

              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-neon/30 transition-all duration-300">
                <div className="p-5 sm:p-6 md:p-8 border-b border-border/50">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-1">{exp.role}</h2>
                      <p className="text-neon font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:text-right shrink-0">
                      <span className="flex items-center gap-1.5 sm:justify-end">
                        <Calendar size={13} className="text-neon/70" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 sm:justify-end">
                        <MapPin size={13} className="text-neon/70" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{exp.summary}</p>
                </div>

                <div className="p-5 sm:p-6 md:p-8 space-y-8">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-4">What I Do</h3>
                    <ul className="space-y-3">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neon shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-4 flex items-center gap-2">
                        <Trophy size={14} className="text-neon" />
                        Key Wins
                      </h3>
                      <ul className="space-y-3">
                        {exp.achievements.map((a, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                            <span className="text-neon shrink-0 mt-0.5">✓</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-4 flex items-center gap-2">
                        <Wrench size={14} className="text-neon" />
                        Tools & Tech
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span key={t} className="text-xs font-mono text-neon bg-neon/10 border border-neon/20 px-2.5 py-1 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
