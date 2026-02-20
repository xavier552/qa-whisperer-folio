import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, FolderOpen } from "lucide-react";

const projects = [
  {
    title: "Manual Testing – Nithya Group Website",
    description:
      "Designed and executed comprehensive test cases. Conducted exploratory testing to uncover edge-case defects. Documented and reported all findings systematically.",
    tech: ["Manual Testing", "Test Cases", "Exploratory Testing", "Defect Reporting"],
    github: "https://github.com/xavier552/Manual_Test_Practice",
    githubLabel: "View Manual Testing Project",
  },
  {
    title: "Automation Testing – demoqa.com",
    description:
      "Automated web interactions using Selenium + TestNG. Implemented Page Object Model (POM) framework. Automated forms, alerts, buttons & iframe navigation.",
    tech: ["Selenium WebDriver", "TestNG", "Maven", "Cucumber (BDD)", "POM", "Java"],
    github: "https://github.com/xavier552/automation_final_project",
    githubLabel: "View Automation Project",
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
            Projects
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
              className="bg-card border border-border rounded-lg p-6 hover:border-neon/40 transition-all group hover:-translate-y-1 duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <FolderOpen className="text-neon" size={28} />
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-neon transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              {/* GitHub icon link */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon transition-colors text-sm font-medium group/link w-fit"
              >
                <Github
                  size={16}
                  className="transition-transform group-hover/link:scale-110"
                />
                <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-neon group-hover/link:after:w-full after:transition-all after:duration-300">
                  {project.githubLabel}
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
