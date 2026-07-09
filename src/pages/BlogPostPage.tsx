import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { getPost, getAdjacent, blogPosts } from "@/data/blogPosts";
import SubPageHeader from "@/components/SubPageHeader";
import ArticleRenderer from "@/components/blog/ArticleRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import ArticleProgress from "@/components/blog/ArticleProgress";
import ShareBar from "@/components/blog/ShareBar";
import BlogCover from "@/components/blog/BlogCover";
import ReadArticleButton from "@/components/ReadArticleButton";

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-transparent text-foreground relative z-10">
        <SubPageHeader />
        <div className="max-w-4xl mx-auto px-6 pt-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Article not found</h1>
          <button
            onClick={() => navigate("/blog")}
            className="text-neon hover:underline"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const { prev, next } = getAdjacent(post.slug);
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-transparent text-foreground relative z-10">
      <SubPageHeader />
      <ArticleProgress />

      <article className="max-w-6xl mx-auto px-4 md:px-6 pt-20 pb-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-neon transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-mono text-neon bg-neon/10 border border-neon/30 px-2.5 py-1 rounded">
              {post.category}
            </span>
            {post.tags.map((t) => (
              <span key={t} className="text-[11px] font-mono text-muted-foreground">
                #{t}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-6">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground border-y border-border py-4">
            <span className="inline-flex items-center gap-2">
              <User size={14} className="text-neon" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar size={14} className="text-neon" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={14} className="text-neon" />
              {post.readTime}
            </span>
            <div className="ml-auto">
              <ShareBar title={post.title} />
            </div>
          </div>
        </motion.div>

        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 rounded-lg overflow-hidden border border-border"
        >
          <BlogCover post={post} />
        </motion.div>

        {/* Body + ToC */}
        <div className="grid lg:grid-cols-[1fr_240px] gap-10">
          <div className="min-w-0">
            <ArticleRenderer blocks={post.content} />

            {post.references && post.references.length > 0 && (
              <div className="mt-12 pt-6 border-t border-border">
                <p className="text-xs font-mono uppercase tracking-widest text-neon mb-3">
                  Further reading
                </p>
                <ul className="space-y-1">
                  {post.references.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-neon underline underline-offset-4 decoration-neon/30 hover:decoration-neon transition-colors"
                      >
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prev / Next */}
            <div className="grid sm:grid-cols-2 gap-4 mt-12">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="group bg-card border border-border rounded-lg p-4 hover:border-neon/50 transition-colors"
                >
                  <span className="flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    <ChevronLeft size={12} /> Previous
                  </span>
                  <span className="font-semibold text-sm group-hover:text-neon transition-colors">
                    {prev.title}
                  </span>
                </Link>
              ) : <div className="hidden sm:block" />}
              {next ? (
                <Link
                  to={`/blog/${next.slug}`}
                  className="group bg-card border border-border rounded-lg p-4 hover:border-neon/50 transition-colors sm:text-right"
                >
                  <span className="flex items-center sm:justify-end gap-1 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    Next <ChevronRight size={12} />
                  </span>
                  <span className="font-semibold text-sm group-hover:text-neon transition-colors">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-14">
                <p className="text-neon font-mono text-xs tracking-widest uppercase mb-4">
                  Related articles
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/blog/${r.slug}`}
                      className="group bg-card border border-border rounded-lg p-4 hover:border-neon/50 transition-colors"
                    >
                      <p className="text-[11px] font-mono text-neon mb-1">{r.category}</p>
                      <p className="font-semibold group-hover:text-neon transition-colors leading-tight">
                        {r.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <ReadArticleButton to="/blog" label="Back to Blog" />
            </div>
          </div>

          {/* Sticky ToC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents blocks={post.content} />
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;