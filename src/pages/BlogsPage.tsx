import { useState, useEffect } from "react";
import { Calendar, ArrowRight, Search } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import FadeInUp from "@/components/FadeInUp";

const allPosts = [
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

const BlogsPage = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = allPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHeader />
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <FadeInUp className="mb-10">
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">Blog</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h1>
          <p className="text-muted-foreground max-w-2xl">
            Insights, guides, and best practices from the world of software testing and quality assurance.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.1} className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors"
          />
        </FadeInUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <FadeInUp key={post.title} delay={0.15 + i * 0.1}>
              <article className="bg-card border border-border rounded-lg overflow-hidden hover:border-neon/40 transition-all group hover:-translate-y-1 duration-300 cursor-pointer h-full">
                <div className="h-1 bg-neon/20 group-hover:bg-neon transition-colors" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono text-neon bg-neon/10 px-2 py-1 rounded">{post.tag}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-neon transition-colors leading-tight">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    <ArrowRight className="text-neon opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                  </div>
                </div>
              </article>
            </FadeInUp>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-12">No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
