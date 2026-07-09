import { Linkedin, Twitter, Link2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ShareBar = ({ title }: { title: string }) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  const share = (base: string) => window.open(base, "_blank", "noopener,noreferrer");

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mr-1">
        Share
      </span>
      <button
        onClick={() =>
          share(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)
        }
        aria-label="Share on Twitter"
        className="p-2 rounded-md border border-border hover:border-neon/60 hover:text-neon transition-colors"
      >
        <Twitter size={14} />
      </button>
      <button
        onClick={() =>
          share(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        }
        aria-label="Share on LinkedIn"
        className="p-2 rounded-md border border-border hover:border-neon/60 hover:text-neon transition-colors"
      >
        <Linkedin size={14} />
      </button>
      <button
        onClick={copy}
        aria-label="Copy link"
        className="p-2 rounded-md border border-border hover:border-neon/60 hover:text-neon transition-colors"
      >
        {copied ? <Check size={14} className="text-neon" /> : <Link2 size={14} />}
      </button>
    </div>
  );
};

export default ShareBar;