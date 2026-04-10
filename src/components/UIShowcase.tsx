import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShoppingCart, Search, Home, Send, CreditCard, CheckCircle, MessageCircle, Bell, Headphones, BookOpen, ChevronRight, Plus, Minus, Star, Heart, X, Play, Pause } from "lucide-react";

interface ShowcaseCard {
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

/* ── Animated Card Contents ── */

const BrowsingHome = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setScrollY(p => (p + 1) % 120), 50);
    return () => clearInterval(id);
  }, []);
  const products = [
    { name: "Summer Dress", price: "$49.99", color: "bg-primary/20" },
    { name: "Denim Jacket", price: "$89.00", color: "bg-accent/20" },
    { name: "Sneakers", price: "$120.00", color: "bg-primary/30" },
    { name: "Watch", price: "$199.00", color: "bg-accent/30" },
  ];
  return (
    <div className="p-3 space-y-2 overflow-hidden h-full relative">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold text-foreground">Featured</span>
        <span className="text-[8px] text-primary">See all →</span>
      </div>
      <motion.div
        className="space-y-2"
        animate={{ y: [-0, -scrollY * 0.5] }}
        transition={{ duration: 0.5, ease: "linear" }}
      >
        {[...products, ...products].map((p, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2 border border-border"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center`}>
              <Star size={10} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-[9px] font-medium text-foreground">{p.name}</div>
              <div className="text-[8px] text-primary font-bold">{p.price}</div>
            </div>
            <Heart size={10} className="text-muted-foreground" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const AddToCart = () => {
  const [added, setAdded] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setAdded(true);
      setCount(p => p + 1);
      setTimeout(() => setAdded(false), 1200);
    }, 2500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="p-3 flex flex-col items-center justify-center h-full gap-3">
      <div className="w-16 h-16 rounded-xl bg-secondary/50 border border-border flex items-center justify-center relative">
        <ShoppingCart size={20} className="text-primary" />
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-[8px] font-bold text-primary-foreground flex items-center justify-center"
          >
            {count % 5 || 1}
          </motion.span>
        )}
      </div>
      <div className="text-[10px] font-medium text-foreground">Classic T-Shirt</div>
      <div className="text-[11px] font-bold text-primary">$29.99</div>
      <motion.div
        className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-semibold transition-colors ${added ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-foreground"}`}
        animate={added ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {added ? <CheckCircle size={10} /> : <Plus size={10} />}
        {added ? "Added!" : "Add to Cart"}
      </motion.div>
    </div>
  );
};

const OnboardingFlow = () => {
  const [step, setStep] = useState(0);
  const screens = [
    { title: "Welcome", desc: "Discover trending products", bg: "bg-primary/10" },
    { title: "Browse", desc: "Explore curated collections", bg: "bg-accent/10" },
    { title: "Shop", desc: "Fast & secure checkout", bg: "bg-primary/20" },
  ];
  useEffect(() => {
    const id = setInterval(() => setStep(p => (p + 1) % 3), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="p-3 flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className={`w-full rounded-xl ${screens[step].bg} p-4 text-center`}
        >
          <div className="text-[12px] font-bold text-foreground">{screens[step].title}</div>
          <div className="text-[9px] text-muted-foreground mt-1">{screens[step].desc}</div>
        </motion.div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-1">
          {screens.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>
        <div className="flex items-center gap-1 text-[9px] text-primary font-medium">
          Next <ChevronRight size={10} />
        </div>
      </div>
    </div>
  );
};

const SearchingFlow = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const fullQuery = "Red Shoes";
  useEffect(() => {
    let i = 0;
    const typeId = setInterval(() => {
      if (i <= fullQuery.length) {
        setQuery(fullQuery.slice(0, i));
        i++;
      } else {
        setShowResults(true);
        setTimeout(() => {
          setQuery("");
          setShowResults(false);
          i = 0;
        }, 2000);
      }
    }, 150);
    return () => clearInterval(typeId);
  }, []);
  return (
    <div className="p-3 space-y-2 h-full">
      <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 border border-border">
        <Search size={12} className="text-muted-foreground" />
        <span className="text-[10px] text-foreground font-mono">{query}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span></span>
      </div>
      {showResults && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
          {["Red Running Shoes", "Red Heels", "Red Sneakers"].map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2 border border-border"
            >
              <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                <Star size={8} className="text-primary" />
              </div>
              <span className="text-[9px] text-foreground">{r}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const CartBuilding = () => {
  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    let count = 0;
    const id = setInterval(() => {
      if (count < 3) {
        setItems(p => [...p, count]);
        count++;
      } else {
        setTimeout(() => { setItems([]); count = 0; }, 1500);
      }
    }, 800);
    return () => clearInterval(id);
  }, []);
  const prices = [12.99, 24.50, 8.99];
  const total = items.reduce((s, i) => s + (prices[i] || 0), 0);
  return (
    <div className="p-3 space-y-2 h-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold text-foreground">Cart</span>
        <span className="text-[9px] text-primary">{items.length} items</span>
      </div>
      <div className="space-y-1.5 min-h-[100px]">
        {items.map((item, i) => (
          <motion.div
            key={`${item}-${i}`}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2 border border-border"
          >
            <div className="w-7 h-7 rounded bg-primary/20" />
            <div className="flex-1">
              <div className="text-[9px] text-foreground">Item {item + 1}</div>
              <div className="text-[8px] text-primary font-bold">${prices[item]}</div>
            </div>
            <Minus size={8} className="text-muted-foreground" />
          </motion.div>
        ))}
      </div>
      {items.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-border pt-2 flex justify-between">
          <span className="text-[9px] text-muted-foreground">Total</span>
          <span className="text-[10px] font-bold text-primary">${total.toFixed(2)}</span>
        </motion.div>
      )}
    </div>
  );
};

const TransactionComplete = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 3), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="p-3 flex flex-col items-center justify-center h-full gap-2">
      {phase === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <CreditCard size={20} className="text-primary mx-auto mb-2" />
          <div className="text-[10px] text-foreground">Processing...</div>
          <motion.div className="w-20 h-1 bg-secondary rounded-full mt-2 overflow-hidden">
            <motion.div className="h-full bg-primary rounded-full" animate={{ width: ["0%", "100%"] }} transition={{ duration: 1.8 }} />
          </motion.div>
        </motion.div>
      )}
      {phase === 1 && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
            <CheckCircle size={28} className="text-primary mx-auto mb-2" />
          </motion.div>
          <div className="text-[11px] font-bold text-foreground">Payment Successful!</div>
          <div className="text-[9px] text-muted-foreground mt-1">Order #4829</div>
        </motion.div>
      )}
      {phase === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-[10px] text-foreground mb-2">🎉 Thank you!</div>
          <div className="bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-[9px] font-semibold">Track Order</div>
        </motion.div>
      )}
    </div>
  );
};

const ChattingFlow = () => {
  const [msgs, setMsgs] = useState<{ text: string; isUser: boolean }[]>([]);
  const allMsgs = [
    { text: "Hi! Need help?", isUser: false },
    { text: "Yes, order status?", isUser: true },
    { text: "Order #4829 shipped! 📦", isUser: false },
    { text: "Thanks! 🙌", isUser: true },
  ];
  useEffect(() => {
    let i = 0;
    let resetting = false;
    const id = setInterval(() => {
      if (resetting) return;
      if (i < allMsgs.length) {
        const msg = allMsgs[i];
        i++;
        setMsgs(p => [...p, msg]);
      } else {
        resetting = true;
        setTimeout(() => { setMsgs([]); i = 0; resetting = false; }, 2000);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="p-3 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
        <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center">
          <MessageCircle size={8} className="text-primary" />
        </div>
        <span className="text-[10px] font-semibold text-foreground">Support</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary ml-auto" />
      </div>
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`rounded-xl px-2.5 py-1.5 max-w-[80%] text-[9px] ${m.isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground border border-border"}`}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SubscribingFlow = () => {
  const [toggled, setToggled] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setToggled(true);
      setTimeout(() => setConfirmed(true), 800);
      setTimeout(() => { setToggled(false); setConfirmed(false); }, 3000);
    }, 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="p-3 flex flex-col items-center justify-center h-full gap-3">
      <Bell size={18} className="text-primary" />
      <div className="text-[10px] font-semibold text-foreground">Push Notifications</div>
      <div className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${toggled ? "bg-primary" : "bg-border"}`}>
        <motion.div className="w-4 h-4 rounded-full bg-card shadow" animate={{ x: toggled ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
      </div>
      {confirmed && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[9px] text-primary font-medium flex items-center gap-1">
          <CheckCircle size={10} /> Subscribed!
        </motion.div>
      )}
    </div>
  );
};

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPlaying(true);
      setProgress(p => {
        if (p >= 100) { setPlaying(false); return 0; }
        return p + 2;
      });
    }, 200);
    return () => clearInterval(id);
  }, []);
  const bars = Array.from({ length: 20 }, (_, i) => Math.sin(i * 0.5 + progress * 0.1) * 0.5 + 0.5);
  return (
    <div className="p-3 flex flex-col items-center justify-center h-full gap-3">
      <div className="text-[10px] font-semibold text-foreground">Now Playing</div>
      <div className="text-[8px] text-muted-foreground">Lo-fi Beats • 3:24</div>
      <div className="flex items-end gap-[2px] h-8">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-primary"
            animate={{ height: playing ? `${h * 24 + 4}px` : "4px" }}
            transition={{ duration: 0.15 }}
          />
        ))}
      </div>
      <div className="w-full bg-secondary rounded-full h-1 overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[8px] text-muted-foreground">◀◀</span>
        {playing ? <Pause size={14} className="text-primary" /> : <Play size={14} className="text-primary" />}
        <span className="text-[8px] text-muted-foreground">▶▶</span>
      </div>
    </div>
  );
};

const TutorialFlow = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Step 1", desc: "Create your account", pct: 33 },
    { title: "Step 2", desc: "Set your preferences", pct: 66 },
    { title: "Step 3", desc: "Start shopping!", pct: 100 },
  ];
  useEffect(() => {
    const id = setInterval(() => setStep(p => (p + 1) % 3), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="p-3 flex flex-col h-full gap-3">
      <div className="flex items-center gap-2">
        <BookOpen size={12} className="text-primary" />
        <span className="text-[10px] font-semibold text-foreground">Getting Started</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${steps[step].pct}%` }} transition={{ duration: 0.5 }} />
      </div>
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-secondary/50 rounded-xl border border-border p-3 flex flex-col justify-center"
      >
        <div className="text-[11px] font-bold text-primary">{steps[step].title}</div>
        <div className="text-[9px] text-muted-foreground mt-1">{steps[step].desc}</div>
      </motion.div>
      <div className="flex gap-1 justify-center">
        {steps.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === step ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>
    </div>
  );
};

/* ── Cards ── */

const cards: ShowcaseCard[] = [
  { title: "Browsing Home", icon: Home, content: <BrowsingHome /> },
  { title: "Add to Cart", icon: ShoppingCart, content: <AddToCart /> },
  { title: "Onboarding", icon: ChevronRight, content: <OnboardingFlow /> },
  { title: "Searching", icon: Search, content: <SearchingFlow /> },
  { title: "Cart Building", icon: ShoppingCart, content: <CartBuilding /> },
  { title: "Transaction Complete", icon: CreditCard, content: <TransactionComplete /> },
  { title: "Chatting", icon: MessageCircle, content: <ChattingFlow /> },
  { title: "Subscribing", icon: Bell, content: <SubscribingFlow /> },
  { title: "Listening to Audio", icon: Headphones, content: <AudioPlayer /> },
  { title: "Browsing Tutorial", icon: BookOpen, content: <TutorialFlow /> },
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
          animate={{ x: isPaused ? undefined : [-0, -totalWidth] }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
        >
          {duplicatedCards.map((card, i) => (
            <motion.div
              key={`${card.title}-${i}`}
              className="shrink-0 rounded-3xl bg-card border border-border overflow-hidden flex flex-col group cursor-pointer"
              style={{ width: CARD_WIDTH, height: 320 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(72 100% 50% / 0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <card.icon size={14} className="text-primary" />
                <span className="text-[11px] font-semibold text-foreground tracking-wide">{card.title}</span>
              </div>
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
