import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, TestTube, Bug, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    title: "Manual Testing World",
    description:
      "Designed and executed comprehensive test cases. Conducted exploratory testing to uncover edge-case defects.",
    tech: ["Manual Testing", "Test Cases", "Exploratory Testing"],
    github: "https://github.com/xavier552/Manual_Test_Practice",
    icon: TestTube,
  },
  {
    title: "Automation Testing World",
    description:
      "Automated web interactions using Selenium + TestNG. Implemented POM framework with Cucumber BDD.",
    tech: ["Selenium WebDriver", "TestNG", "Maven", "POM"],
    github: "https://github.com/xavier552/automation_final_project",
    icon: Bug,
  },
];

// Wave text: animates each letter with a small vertical wave. Pauses on hover.
const WaveText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [paused, setPaused] = useState(false);
  return (
    <span
      className={`inline-flex ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            animation: paused ? "none" : `wave-text 2.8s ease-in-out ${i * 0.08}s infinite`,
            whiteSpace: "pre",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

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
            How I Think & What I Break
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-neon/40 transition-all group hover:-translate-y-1 duration-300 flex flex-col"
              >
                <div className="mb-4">
                  <Icon className="text-neon" size={24} />
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

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon transition-colors text-sm font-medium group/link w-fit"
                >
                  <Github size={16} className="transition-transform group-hover/link:scale-110" />
                  <WaveText text="View More" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/projects")}
            className="btn-press inline-flex items-center gap-2 border border-neon text-neon px-6 py-3 rounded-md font-medium hover:bg-neon hover:text-primary-foreground transition-all text-sm"
          >
            <WaveText text="View All Projects" />
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
