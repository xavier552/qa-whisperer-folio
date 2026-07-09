import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Search } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import FadeInUp from "@/components/FadeInUp";
import ReadArticleButton from "@/components/ReadArticleButton";
import BlogCover from "@/components/blog/BlogCover";
import { blogPosts, CATEGORIES } from "@/data/blogPosts";

const BlogsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogPosts.filter((p) => {
      const catMatch = category === "All" || p.category === category;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [search, category]);

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-transparent text-foreground relative z-10">
      <SubPageHeader />

      <section className="relative max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-3">
            Blog
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Field Notes on{" "}
            <span className="text-gradient-neon">Quality</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Practical write-ups from the trenches — automation frameworks, API
            testing, shift-left habits, and the QA craft I use every day.
          </p>
        </motion.div>

        <FadeInUp delay={0.15} className="relative mt-8 max-w-xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            placeholder="Search articles, tags, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card/80 backdrop-blur border border-border rounded-lg pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 focus:shadow-[0_0_18px_hsl(72_100%_50%/0.2)] transition-all"
          />
        </FadeInUp>

        <FadeInUp delay={0.2} className="mt-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border transition-all ${
                    active
                      ? "bg-neon text-primary-foreground border-neon shadow-[0_0_18px_hsl(72_100%_50%/0.35)]"
                      : "border-border text-muted-foreground hover:border-neon/50 hover:text-neon"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </FadeInUp>
      </section>

      {/* Featured */}
      {featured && (
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-10">
          <FadeInUp>
            <p className="text-neon font-mono text-xs tracking-widest uppercase mb-4">
              Featured
            </p>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid md:grid-cols-2 gap-6 bg-card border border-border rounded-lg overflow-hidden hover:border-neon/50 hover:shadow-[0_0_40px_hsl(72_100%_50%/0.12)] transition-all"
            >
              <div className="md:rounded-r-none">
                <BlogCover post={featured} />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
                  <span className="font-mono text-neon bg-neon/10 border border-neon/30 px-2 py-0.5 rounded">
                    {featured.category}
                  </span>
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <Calendar size={12} /> {featured.date}
                  </span>
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <Clock size={12} /> {featured.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-neon transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <ReadArticleButton to={`/blog/${featured.slug}`} />
              </div>
            </Link>
          </FadeInUp>
        </section>
      )}

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
        <FadeInUp>
          <p className="text-neon font-mono text-xs tracking-widest uppercase mb-4">
            All articles
          </p>
        </FadeInUp>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground mt-12">
            No articles match your search.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.length > 0
              ? rest.map((post, i) => (
                  <FadeInUp key={post.slug} delay={0.05 + i * 0.08}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:border-neon/40 hover:-translate-y-1 transition-all duration-300"
                    >
                      <BlogCover post={post} />
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={11} /> {post.date}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={11} /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-2 group-hover:text-neon transition-colors leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto">
                          <ReadArticleButton to={`/blog/${post.slug}`} />
                        </div>
                      </div>
                    </Link>
                  </FadeInUp>
                ))
              : filtered.length === 1 && (
                  <p className="text-sm text-muted-foreground">
                    That's the only article in this category so far.
                  </p>
                )}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogsPage;
