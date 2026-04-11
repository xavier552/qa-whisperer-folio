import { useState, useEffect } from "react";
import { Github, ExternalLink, TestTube, Bug, Wifi, BarChart3, Database, LayoutGrid, List } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import FadeInUp from "@/components/FadeInUp";
import { motion } from "framer-motion";

const breakProjects = [
  {
    title: "Manual Testing World",
    description:
      "Designed and executed comprehensive test cases. Conducted exploratory testing to uncover edge-case defects. Documented and reported all findings systematically.",
    tech: ["Manual Testing", "Test Cases", "Exploratory Testing", "Defect Reporting"],
    github: "https://github.com/xavier552/Manual_Test_Practice",
    icon: TestTube,
  },
  {
    title: "Automation Testing World",
    description:
      "Automated web interactions using Selenium + TestNG. Implemented Page Object Model (POM) framework. Automated forms, alerts, buttons & iframe navigation.",
    tech: ["Selenium WebDriver", "TestNG", "Maven", "Cucumber (BDD)", "POM", "Java"],
    github: "https://github.com/xavier552/automation_final_project",
    icon: Bug,
  },
];

const thinkProjects = [
  {
    title: "API Testing",
    description:
      "Validated RESTful APIs using Postman with comprehensive request/response verification. Tested GET, POST, PUT, DELETE endpoints with status code validation, schema checks, and environment-based configurations.",
    tech: ["Postman", "REST API", "JSON", "Status Codes", "Collections", "Newman"],
    github: "https://github.com/xavier552/POSTMAN_REST-APIs",
    icon: Wifi,
  },
  {
    title: "Performance Testing (JMeter)",
    description:
      "Conducted load, stress, and endurance testing using Apache JMeter. Created test plans with thread groups, assertions, and listeners to measure response times, throughput, and system bottlenecks.",
    tech: ["Apache JMeter", "Load Testing", "Stress Testing", "Thread Groups", "Assertions"],
    github: "#",
    icon: BarChart3,
  },
  {
    title: "SQL Testing",
    description:
      "Performed database validation using SQL queries. Verified data integrity, CRUD operations, joins, and stored procedures. Ensured backend data consistency with frontend displays.",
    tech: ["SQL", "MySQL", "Data Validation", "CRUD", "Joins", "Stored Procedures"],
    github: "https://github.com/xavier552/Sql_Full_query-",
    icon: Database,
  },
];

interface ProjectCardProps {
  project: typeof breakProjects[0];
  index: number;
  view: "grid" | "list";
}

const ProjectCard = ({ project, index, view }: ProjectCardProps) => {
  const Icon = project.icon;

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05 + index * 0.05 }}
        className="bg-card border border-border rounded-lg p-5 hover:border-neon/40 transition-all group flex items-start gap-5"
      >
        <div className="shrink-0 mt-1"><Icon className="text-neon" size={24} /></div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold mb-1 group-hover:text-neon transition-colors">{project.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs font-mono text-muted-foreground">{t}</span>
            ))}
          </div>
        </div>
        <div className="shrink-0">
          {project.github !== "#" ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon transition-colors">
              <Github size={18} />
            </a>
          ) : (
            <span className="text-muted-foreground"><ExternalLink size={18} /></span>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      className="bg-card border border-border rounded-lg p-6 hover:border-neon/40 transition-all group hover:-translate-y-1 duration-300 flex flex-col"
    >
      <div className="mb-4"><Icon className="text-neon" size={28} /></div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-neon transition-colors">{project.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map((t) => (
          <span key={t} className="text-xs font-mono text-muted-foreground">{t}</span>
        ))}
      </div>
      {project.github !== "#" ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon transition-colors text-sm font-medium group/link w-fit"
        >
          <Github size={16} className="transition-transform group-hover/link:scale-110" />
          <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-neon group-hover/link:after:w-full after:transition-all after:duration-300">
            View on GitHub
          </span>
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium w-fit">
          <ExternalLink size={16} />
          <span>Coming Soon</span>
        </span>
      )}
    </motion.div>
  );
};

const AllProjects = () => {
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background/80 text-foreground relative z-10">
      <SubPageHeader />
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <FadeInUp className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">All Projects</p>
          </div>
          <div className="flex gap-1 border border-border rounded-md p-0.5">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded transition-colors ${view === "grid" ? "bg-neon/10 text-neon" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded transition-colors ${view === "list" ? "bg-neon/10 text-neon" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List size={16} />
            </button>
          </div>
        </FadeInUp>

        {/* Section 1: What I Break / Validated */}
        <FadeInUp delay={0.1} className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What I Break<span className="text-neon">/</span>Validated
          </h2>
          {view === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {breakProjects.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} view="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {breakProjects.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} view="list" />
              ))}
            </div>
          )}
        </FadeInUp>

        {/* Section 2: What I Think / Mastered */}
        <FadeInUp delay={0.2}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What I Think<span className="text-neon">/</span>Mastered
          </h2>
          {view === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thinkProjects.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} view="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {thinkProjects.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} view="list" />
              ))}
            </div>
          )}
        </FadeInUp>
      </div>
    </div>
  );
};

export default AllProjects;
