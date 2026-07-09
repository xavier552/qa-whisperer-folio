import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import ReadArticleButton from "@/components/ReadArticleButton";
import BlogCover from "@/components/blog/BlogCover";

const posts = blogPosts.slice(0, 3);

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
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-bold">Latest Articles</h2>
            <Link
              to="/blog"
              className="text-sm font-mono text-neon hover:opacity-80 transition-opacity inline-flex items-center gap-2 group"
            >
              View all articles
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="group flex flex-col bg-card border border-border rounded-lg overflow-hidden hover:border-neon/40 hover:-translate-y-1 transition-all duration-300"
            >
              <Link to={`/blog/${post.slug}`} aria-label={post.title}>
                <BlogCover post={post} />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={11} /> {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-semibold mb-2 group-hover:text-neon transition-colors leading-tight">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <ReadArticleButton to={`/blog/${post.slug}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <ReadArticleButton to="/blog" label="View all articles" />
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
