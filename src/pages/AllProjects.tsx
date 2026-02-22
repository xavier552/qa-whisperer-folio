import { motion } from "framer-motion";
import { Github, ExternalLink, TestTube, Bug, Wifi, BarChart3, Database } from "lucide-react";
import Navbar from "@/components/Navbar";

const allProjects = [
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
  {
    title: "API Testing",
    description:
      "Validated RESTful APIs using Postman with comprehensive request/response verification. Tested GET, POST, PUT, DELETE endpoints with status code validation, schema checks, and environment-based configurations.",
    tech: ["Postman", "REST API", "JSON", "Status Codes", "Collections", "Newman"],
    github: "#",
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
    github: "#",
    icon: Database,
  },
];

const AllProjects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">
            All Projects
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">
            How I Think & What I Break
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-neon/40 transition-all group hover:-translate-y-1 duration-300 flex flex-col"
              >
                <div className="mb-4">
                  <Icon className="text-neon" size={28} />
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
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
