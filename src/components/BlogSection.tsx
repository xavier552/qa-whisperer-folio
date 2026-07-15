import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Construction } from "lucide-react";
import ComingSoonCard from "@/components/blog/ComingSoonCard";
import { upcomingPosts } from "@/data/upcomingPosts";

const preview = upcomingPosts.slice(0, 3);

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

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
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-bold">Knowledge Hub</h2>
            <Link
              to="/blog"
              className="text-sm font-mono text-neon hover:opacity-80 transition-opacity inline-flex items-center gap-2 group"
            >
              Explore blog
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-neon bg-neon/10 border border-neon/40 px-2.5 py-1 rounded">
              <Construction size={12} /> Coming Soon
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground bg-muted/30 border border-border px-2.5 py-1 rounded">
              Work in Progress
            </span>
            <p className="text-sm text-muted-foreground max-w-xl">
              I'm currently preparing high-quality QA and Test Automation
              articles. New technical content will be published soon.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {preview.map((post, i) => (
            <ComingSoonCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
