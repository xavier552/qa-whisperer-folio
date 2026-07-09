import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ReadArticleButtonProps {
  to?: string;
  href?: string;
  label?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Premium skewed CTA with animated arrow, neon-green accent + glow.
 * Renders as <Link> when `to` is provided, <a> for `href`, else <button>.
 */
const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h13" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const Inner = ({ label }: { label: string }) => (
  <span className="relative inline-flex items-center gap-2 -skew-x-6">
    <span className="skew-x-6 font-mono text-xs tracking-[0.15em] uppercase">
      {label}
    </span>
    <span className="skew-x-6 relative inline-flex w-5 overflow-hidden">
      <span className="absolute inset-0 flex items-center transition-transform duration-300 ease-out group-hover:translate-x-6 group-focus-visible:translate-x-6">
        <Arrow />
      </span>
      <span className="absolute inset-0 flex items-center -translate-x-6 transition-transform duration-300 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0">
        <Arrow />
      </span>
    </span>
  </span>
);

const baseCls =
  "group relative inline-flex items-center justify-center px-5 py-2.5 rounded-[6px] " +
  "border border-neon/60 bg-neon/[0.04] text-neon " +
  "transition-all duration-300 ease-out " +
  "hover:bg-neon/10 hover:border-neon hover:shadow-[0_0_24px_hsl(72_100%_50%/0.35)] " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "motion-reduce:transition-none";

const ReadArticleButton = forwardRef<HTMLElement, ReadArticleButtonProps>(
  ({ to, href, label = "Read article", className, onClick }, ref) => {
    if (to) {
      return (
        <Link
          to={to}
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-label={label}
          onClick={onClick}
          className={cn(baseCls, className)}
        >
          <Inner label={label} />
        </Link>
      );
    }
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-label={label}
          className={cn(baseCls, className)}
        >
          <Inner label={label} />
        </a>
      );
    }
    return (
      <button
        type="button"
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        aria-label={label}
        className={cn(baseCls, className)}
      >
        <Inner label={label} />
      </button>
    );
  }
);
ReadArticleButton.displayName = "ReadArticleButton";

export default ReadArticleButton;