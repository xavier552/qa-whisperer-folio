import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Bug, TestTube, Zap, Shield, Smartphone, BarChart3, Search, Home, FileText, Send, Download, Gamepad2 } from "lucide-react";

interface ShowcaseCard {
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

const MiniButton = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
  <div className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground bg-card"}`}>
    {children}
  </div>
);

const cards: ShowcaseCard[] = [
  {
    title: "Browsing Home",
    icon: Home,
    content: (
      <div className="space-y-3 p-3">
        <div className="h-2 w-20 rounded bg-primary/30" />
        <div className="text-[11px] font-bold text-foreground">Quality is not an act,<br /><span className="text-primary">it's a habit.</span></div>
        <div className="flex gap-1.5 mt-2">
          <MiniButton active>Projects</MiniButton>
          <MiniButton>Blog</MiniButton>
          <MiniButton>Contact</MiniButton>
        </div>
        <div className="h-1 w-full rounded bg-border mt-2" />
        <div className="h-1 w-3/4 rounded bg-border" />
      </div>
    ),
  },
  {
    title: "Testing Skills",
    icon: TestTube,
    content: (
      <div className="grid grid-cols-2 gap-2 p-3">
        {[
          { icon: TestTube, label: "Manual" },
          { icon: Bug, label: "Automation" },
          { icon: Zap, label: "API" },
          { icon: Shield, label: "CI/CD" },
          { icon: Smartphone, label: "Mobile" },
          { icon: BarChart3, label: "Analytics" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 bg-secondary/50 rounded-lg p-2 border border-border">
            <s.icon size={12} className="text-primary shrink-0" />
            <span className="text-[9px] text-foreground font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Searching Projects",
    icon: Search,
    content: (
      <div className="p-3 space-y-3">
        <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 border border-border">
          <Search size={12} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Search apps...</span>
        </div>
        {["Shopify App", "E-commerce", "FinTech"].map((t) => (
          <div key={t} className="flex items-center gap-2 py-1.5">
            <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
              <FileText size={10} className="text-primary" />
            </div>
            <span className="text-[10px] text-foreground">{t}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Sending Message",
    icon: Send,
    content: (
      <div className="p-3 space-y-2">
        <div className="h-7 rounded-lg bg-secondary border border-border flex items-center px-2">
          <span className="text-[9px] text-muted-foreground">Your Full Name</span>
        </div>
        <div className="h-7 rounded-lg bg-secondary border border-border flex items-center px-2">
          <span className="text-[9px] text-muted-foreground">you@example.com</span>
        </div>
        <div className="h-14 rounded-lg bg-secondary border border-border p-2">
          <span className="text-[9px] text-muted-foreground">Your message...</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-lg py-1.5 mt-1">
          <Send size={10} />
          <span className="text-[10px] font-semibold">Send</span>
        </div>
      </div>
    ),
  },
  {
    title: "Downloading Resume",
    icon: Download,
    content: (
      <div className="p-3 space-y-3 flex flex-col items-center justify-center h-full">
        <div className="w-16 h-20 bg-secondary border border-border rounded-lg flex flex-col items-center justify-center gap-1">
          <FileText size={18} className="text-primary" />
          <span className="text-[8px] text-muted-foreground">CV.pdf</span>
        </div>
        <div className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-full px-4 py-1.5">
          <Download size={10} />
          <span className="text-[10px] font-semibold">Download</span>
        </div>
      </div>
    ),
  },
  {
    title: "Exploring Games",
    icon: Gamepad2,
    content: (
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Gamepad2 size={14} className="text-primary" />
          <span className="text-[11px] font-bold text-foreground">QA Game Hub</span>
        </div>
        {["Bug Hunt", "Find Difference", "ISTQB Quiz"].map((g) => (
          <div key={g} className="flex items-center justify-between bg-secondary/50 border border-border rounded-lg px-3 py-2">
            <span className="text-[10px] text-foreground">{g}</span>
            <span className="text-[8px] text-primary font-mono">Play →</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Viewing Experience",
    icon: BarChart3,
    content: (
      <div className="p-3 space-y-2">
        <div className="text-center mb-2">
          <span className="text-2xl font-bold text-primary">1.7+</span>
          <p className="text-[9px] text-muted-foreground">Years Experience</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { val: "30+", label: "Projects" },
            { val: "555+", label: "Bugs" },
          ].map((s) => (
            <div key={s.label} className="text-center bg-secondary/50 rounded-lg py-2 border border-border">
              <span className="text-sm font-bold text-primary">{s.val}</span>
              <p className="text-[8px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Starting Checkout",
    icon: Smartphone,
    content: (
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold text-foreground">Cart</span>
          <span className="text-[9px] text-primary">3 items</span>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2 border border-border">
            <div className="w-8 h-8 rounded bg-muted" />
            <div className="flex-1">
              <div className="h-1.5 w-16 bg-border rounded" />
              <div className="h-1.5 w-10 bg-border rounded mt-1" />
            </div>
          </div>
        ))}
        <div className="bg-primary text-primary-foreground rounded-lg py-1.5 text-center text-[10px] font-semibold mt-1">
          Checkout →
        </div>
      </div>
    ),
  },
];

const CARD_WIDTH = 220;
const GAP = 24;

const UIShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedCards = [...cards, ...cards];
  const totalWidth = cards.length * (CARD_WIDTH + GAP);

  return (
    <div className="w-full py-6 md:py-10 overflow-hidden">
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ height: 340 }}
      >
        <motion.div
          className="flex absolute left-0 top-0"
          style={{ gap: GAP }}
          animate={{ x: [-0, -totalWidth] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
          {...(isPaused ? { style: { gap: GAP, animationPlayState: "paused" } } : {})}
        >
          {duplicatedCards.map((card, i) => (
            <motion.div
              key={`${card.title}-${i}`}
              className="shrink-0 rounded-3xl bg-card border border-border overflow-hidden flex flex-col group cursor-pointer"
              style={{ width: CARD_WIDTH, height: 320 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(72 100% 50% / 0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Title */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <card.icon size={14} className="text-primary" />
                <span className="text-[11px] font-semibold text-foreground tracking-wide">{card.title}</span>
              </div>
              {/* Content */}
              <div className="flex-1 overflow-hidden">
                {card.content}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UIShowcase;
