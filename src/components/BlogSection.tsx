import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "Building a Scalable Test Automation Framework",
    excerpt: "Learn how to architect a test automation framework that grows with your application and team.",
    date: "Jan 2026",
    readTime: "8 min read",
    tag: "Automation",
  },
  {
    title: "API Testing Best Practices in 2026",
    excerpt: "A comprehensive guide to modern API testing strategies, tools, and patterns.",
    date: "Dec 2025",
    readTime: "6 min read",
    tag: "API Testing",
  },
  {
    title: "Shift-Left Testing: A Practical Guide",
    excerpt: "How to implement shift-left testing in your team and catch bugs earlier in the SDLC.",
    date: "Nov 2025",
    readTime: "5 min read",
    tag: "Process",
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">
            Blog
          </p>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Latest Articles
            </h2>
            <a
              href="/blogs"
              className="text-muted-foreground hover:text-neon transition-colors p-2 rounded-lg hover:bg-neon/10"
              aria-label="View all blog articles"
            >
              <ArrowRight size={24} />
            </a>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-neon/40 transition-all group hover:-translate-y-1 duration-300 cursor-pointer"
            >
              <div className="h-1 bg-neon/20 group-hover:bg-neon transition-colors" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-neon bg-neon/10 px-2 py-1 rounded">
                    {post.tag}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                </div>

                <h3 className="font-semibold mb-2 group-hover:text-neon transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  <span className="text-[10px] font-mono text-neon/60 bg-neon/5 px-2 py-0.5 rounded">Not published yet</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
