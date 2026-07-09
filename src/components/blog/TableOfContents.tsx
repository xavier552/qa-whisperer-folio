import { useEffect, useState } from "react";
import { ContentBlock } from "@/data/blogPosts";

interface Props {
  blocks: ContentBlock[];
}

const TableOfContents = ({ blocks }: Props) => {
  const headings = blocks.filter(
    (b): b is Extract<ContentBlock, { type: "h2" | "h3" }> => b.type === "h2" || b.type === "h3"
  );
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-neon font-mono text-xs tracking-widest uppercase mb-3">On this page</p>
      <ul className="space-y-2 border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block pl-4 -ml-px border-l transition-colors ${
                active === h.id
                  ? "border-neon text-neon"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              } ${h.type === "h3" ? "pl-8 text-xs" : ""}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;