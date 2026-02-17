import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, FolderOpen } from "lucide-react";

const projects = [
  {
    title: "E2E Test Framework",
    description: "A comprehensive end-to-end testing framework built with Cypress and TypeScript. Supports parallel execution, custom reporting, and CI/CD integration.",
    tech: ["Cypress", "TypeScript", "Docker", "GitHub Actions"],
    github: "#",
    live: "#",
  },
  {
    title: "API Test Suite",
    description: "Automated API testing suite for RESTful microservices. Includes data-driven testing, schema validation, and performance benchmarks.",
    tech: ["REST Assured", "Java", "TestNG", "Allure"],
    github: "#",
    live: "#",
  },
  {
    title: "Performance Test Dashboard",
    description: "Real-time performance monitoring dashboard that visualizes k6 load test results. Helps teams identify bottlenecks quickly.",
    tech: ["k6", "Grafana", "InfluxDB", "React"],
    github: "#",
    live: "#",
  },
  {
    title: "Mobile Test Automation",
    description: "Cross-platform mobile testing framework using Appium for both Android and iOS. Supports BDD with Cucumber.",
    tech: ["Appium", "Cucumber", "Java", "BrowserStack"],
    github: "#",
    live: "#",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">
            03. Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Things I've Built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-neon/40 transition-all group hover:-translate-y-1 duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <FolderOpen className="text-neon" size={28} />
                <div className="flex items-center gap-3">
                  <a href={project.github} className="text-muted-foreground hover:text-neon transition-colors">
                    <Github size={18} />
                  </a>
                  <a href={project.live} className="text-muted-foreground hover:text-neon transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-neon transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
