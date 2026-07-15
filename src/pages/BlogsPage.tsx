import { useEffect } from "react";
import { motion } from "framer-motion";
import { Construction, Bell, Sparkles } from "lucide-react";
import { toast } from "sonner";
import SubPageHeader from "@/components/SubPageHeader";
import FadeInUp from "@/components/FadeInUp";
import ComingSoonCard from "@/components/blog/ComingSoonCard";
import { upcomingPosts } from "@/data/upcomingPosts";

const BlogsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStayTuned = () => {
    toast("You're on the list", {
      description:
        "New QA and automation articles are on the way. Check back soon.",
    });
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground relative z-10">
      <SubPageHeader />

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-neon bg-neon/10 border border-neon/40 px-2.5 py-1 rounded">
              <Construction size={12} /> Coming Soon
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground bg-muted/30 border border-border px-2.5 py-1 rounded">
              Work in Progress
            </span>
          </div>
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-3">
            Blog
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Knowledge <span className="text-gradient-neon">Hub</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            I'm currently preparing high-quality QA and Test Automation
            articles. New technical content will be published soon.
          </p>
        </motion.div>

        {/* Progress + CTA */}
        <FadeInUp delay={0.15} className="mt-8 max-w-xl">
          <div className="rounded-lg border border-border bg-card/60 backdrop-blur-md p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                Content is being prepared
              </span>
              <span className="text-xs font-mono text-neon">45%</span>
            </div>
            <div className="relative h-1.5 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-neon rounded-full shadow-[0_0_18px_hsl(72_100%_50%/0.6)]"
                initial={{ width: "0%" }}
                animate={{ width: "45%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-neon/40 to-transparent"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <button
              onClick={handleStayTuned}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neon/50 bg-neon/[0.06] text-neon text-xs font-mono uppercase tracking-widest hover:bg-neon/10 hover:shadow-[0_0_22px_hsl(72_100%_50%/0.3)] transition-all"
            >
              <Bell size={13} /> Stay Tuned
            </button>
          </div>
        </FadeInUp>
      </section>

      {/* Placeholder cards */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
        <FadeInUp>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={14} className="text-neon" />
            <p className="text-neon font-mono text-xs tracking-widest uppercase">
              Upcoming articles
            </p>
          </div>
        </FadeInUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingPosts.map((post, i) => (
            <ComingSoonCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
