import { ContentBlock } from "@/data/blogPosts";
import { Info, Lightbulb, AlertTriangle, Quote } from "lucide-react";

const CalloutIcon = ({ variant }: { variant?: string }) => {
  if (variant === "warn") return <AlertTriangle size={18} className="text-neon" />;
  if (variant === "tip") return <Lightbulb size={18} className="text-neon" />;
  return <Info size={18} className="text-neon" />;
};

const CodeBlock = ({ lang, code }: { lang: string; code: string }) => (
  <div className="my-6 rounded-lg border border-border bg-black/60 overflow-hidden">
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/60">
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {lang}
      </span>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(code)}
        className="text-[11px] font-mono text-neon/70 hover:text-neon transition-colors"
      >
        copy
      </button>
    </div>
    <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
      <code className="font-mono text-foreground/90 whitespace-pre">{code}</code>
    </pre>
  </div>
);

const ArticleRenderer = ({ blocks }: { blocks: ContentBlock[] }) => (
  <div className="max-w-none">
    {blocks.map((b, i) => {
      switch (b.type) {
        case "p":
          return (
            <p key={i} className="text-muted-foreground leading-[1.85] my-5 text-[15px] md:text-base">
              {b.text}
            </p>
          );
        case "h2":
          return (
            <h2
              key={i}
              id={b.id}
              className="scroll-mt-24 text-2xl md:text-3xl font-bold mt-12 mb-4 text-foreground"
            >
              {b.text}
            </h2>
          );
        case "h3":
          return (
            <h3
              key={i}
              id={b.id}
              className="scroll-mt-24 text-xl font-semibold mt-8 mb-3 text-foreground"
            >
              {b.text}
            </h3>
          );
        case "ul":
          return (
            <ul key={i} className="my-5 space-y-2">
              {b.items.map((it, j) => (
                <li key={j} className="pl-6 relative text-muted-foreground leading-relaxed">
                  <span className="absolute left-0 top-2.5 w-2 h-2 rounded-sm bg-neon/70" />
                  {it}
                </li>
              ))}
            </ul>
          );
        case "ol":
          return (
            <ol key={i} className="my-5 space-y-2 list-decimal pl-6 marker:text-neon marker:font-mono">
              {b.items.map((it, j) => (
                <li key={j} className="text-muted-foreground leading-relaxed pl-2">
                  {it}
                </li>
              ))}
            </ol>
          );
        case "code":
          return <CodeBlock key={i} lang={b.lang} code={b.code} />;
        case "callout":
          return (
            <div
              key={i}
              className="my-6 rounded-lg border border-neon/30 bg-neon/[0.04] backdrop-blur p-4 md:p-5 flex gap-3"
            >
              <div className="pt-0.5">
                <CalloutIcon variant={b.variant} />
              </div>
              <div>
                {b.title && (
                  <p className="font-mono text-xs uppercase tracking-widest text-neon mb-1">
                    {b.title}
                  </p>
                )}
                <p className="text-sm text-foreground/90 leading-relaxed">{b.text}</p>
              </div>
            </div>
          );
        case "quote":
          return (
            <blockquote
              key={i}
              className="my-8 border-l-2 border-neon pl-5 py-1 italic text-lg text-foreground/90 relative"
            >
              <Quote size={16} className="absolute -left-[9px] top-0 text-neon bg-background" />
              "{b.text}"
              {b.cite && (
                <footer className="mt-2 not-italic text-xs font-mono text-muted-foreground">
                  — {b.cite}
                </footer>
              )}
            </blockquote>
          );
      }
    })}
  </div>
);

export default ArticleRenderer;