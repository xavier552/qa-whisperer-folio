import { BlogPost } from "@/data/blogPosts";

/** Lightweight gradient + emoji cover — zero external requests, zero CLS. */
const BlogCover = ({ post, className = "" }: { post: BlogPost; className?: string }) => (
  <div
    className={`relative w-full aspect-[16/9] overflow-hidden rounded-t-lg bg-gradient-to-br ${post.cover.gradient} ${className}`}
    aria-hidden="true"
  >
    <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(hsl(var(--neon))_1px,transparent_1px)] [background-size:14px_14px]" />
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-6xl md:text-7xl drop-shadow-[0_0_30px_hsl(72_100%_50%/0.35)]">
        {post.cover.emoji}
      </span>
    </div>
    <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest uppercase text-neon/90 bg-background/40 backdrop-blur px-2 py-1 rounded">
      {post.category}
    </div>
  </div>
);

export default BlogCover;