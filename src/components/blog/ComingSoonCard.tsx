import { Calendar, Clock, Lock, Construction } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { UpcomingPost } from "@/data/upcomingPosts";

const ComingSoonCard = ({ post, index = 0 }: { post: UpcomingPost; index?: number }) => {
  const handleClick = () => {
    toast("Article Coming Soon", {
      description:
        "I'm currently preparing this technical article. Check back soon for new QA insights and tutorials.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col h-full rounded-lg overflow-hidden border border-border bg-card/60 backdrop-blur-md hover:border-neon/40 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Blurred cover */}
      <div
        className={`relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br ${post.gradient}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(hsl(var(--neon))_1px,transparent_1px)] [background-size:14px_14px]" />
        <div className="absolute inset-0 flex items-center justify-center blur-[6px] opacity-70">
          <span className="text-6xl md:text-7xl">{post.emoji}</span>
        </div>
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]" />
        <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest uppercase text-neon bg-background/60 border border-neon/40 backdrop-blur px-2 py-1 rounded">
          {post.category}
        </div>
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase text-neon bg-neon/10 border border-neon/40 backdrop-blur px-2 py-1 rounded">
          <Construction size={11} /> Coming Soon
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
          <span className="inline-flex items-center gap-1">
            <Calendar size={11} /> TBA
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={11} /> {post.readTime}
          </span>
        </div>
        <h3 className="font-semibold mb-2 leading-tight">
          {post.title}{" "}
          <span className="text-neon/70 font-mono text-xs">(Coming Soon)</span>
        </h3>

        {/* Skeleton lines */}
        <div className="space-y-2 mb-5" aria-hidden="true">
          <div className="h-2 rounded bg-muted/60 animate-pulse" />
          <div className="h-2 rounded bg-muted/60 animate-pulse w-11/12" />
          <div className="h-2 rounded bg-muted/60 animate-pulse w-9/12" />
        </div>

        <div className="mt-auto">
          <button
            type="button"
            onClick={handleClick}
            aria-disabled="true"
            className="group/btn relative inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border/70 bg-muted/30 text-muted-foreground text-xs font-mono uppercase tracking-widest cursor-not-allowed hover:border-neon/40 hover:text-neon/80 transition-colors"
          >
            <Lock size={12} />
            Read article
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ComingSoonCard;