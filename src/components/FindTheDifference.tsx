import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Eye, RotateCcw, Play } from "lucide-react";

type QElement = {
  id: string;
  type: "h" | "p" | "btn" | "badge" | "input" | "hr" | "dot";
  text: string;
  cls: string;
};

type Mod = { id: string; text?: string; cls?: string; hide?: boolean; hint: string };

type DiffQuestion = {
  title: string;
  els: QElement[];
  mods: Mod[];
};

const ALL_QUESTIONS: DiffQuestion[] = [
  // Login Screens
  {
    title: "Login Form",
    els: [
      { id: "t", type: "h", text: "Sign In", cls: "text-foreground" },
      { id: "e", type: "input", text: "user@email.com", cls: "" },
      { id: "p", type: "input", text: "••••••••", cls: "" },
      { id: "b", type: "btn", text: "Login", cls: "bg-neon text-primary-foreground" },
      { id: "f", type: "p", text: "Forgot Password?", cls: "text-center text-neon" },
    ],
    mods: [
      { id: "t", text: "Sign in", hint: "Title capitalization changed" },
      { id: "b", cls: "bg-destructive text-destructive-foreground", hint: "Button color changed" },
      { id: "f", hide: true, hint: "Forgot password link removed" },
    ],
  },
  {
    title: "Registration Form",
    els: [
      { id: "t", type: "h", text: "Create Account", cls: "text-foreground" },
      { id: "n", type: "input", text: "Full Name", cls: "" },
      { id: "e", type: "input", text: "Email Address", cls: "" },
      { id: "b", type: "btn", text: "Register", cls: "bg-neon text-primary-foreground" },
      { id: "terms", type: "p", text: "I agree to the Terms of Service", cls: "text-muted-foreground" },
    ],
    mods: [
      { id: "t", text: "Create Acount", hint: "Typo in heading (Account → Acount)" },
      { id: "b", text: "Sign Up", hint: "Button text changed" },
      { id: "terms", text: "I agree to the Terms of Services", hint: "Plural changed (Service → Services)" },
    ],
  },
  {
    title: "Password Reset",
    els: [
      { id: "t", type: "h", text: "Reset Password", cls: "text-foreground" },
      { id: "desc", type: "p", text: "Enter your email to receive a reset link", cls: "text-muted-foreground" },
      { id: "e", type: "input", text: "your@email.com", cls: "" },
      { id: "b", type: "btn", text: "Send Reset Link", cls: "bg-neon text-primary-foreground" },
      { id: "back", type: "p", text: "← Back to Login", cls: "text-center text-neon" },
    ],
    mods: [
      { id: "desc", text: "Enter your email to receive a reset code", hint: "Text changed (link → code)" },
      { id: "b", text: "Send Reset", hint: "Button text shortened" },
      { id: "back", hide: true, hint: "Back link removed" },
    ],
  },
  // Dashboard Widgets
  {
    title: "Analytics Card",
    els: [
      { id: "label", type: "p", text: "Total Users", cls: "text-muted-foreground" },
      { id: "num", type: "h", text: "12,847", cls: "text-xl text-foreground" },
      { id: "trend", type: "badge", text: "↑ 12%", cls: "bg-neon/20 text-neon" },
      { id: "sub", type: "p", text: "vs last month", cls: "text-muted-foreground" },
      { id: "act", type: "btn", text: "View Details", cls: "border border-border text-foreground" },
    ],
    mods: [
      { id: "num", text: "12,487", hint: "Number changed (847 → 487)" },
      { id: "trend", cls: "bg-destructive/20 text-destructive", text: "↓ 12%", hint: "Trend direction reversed" },
      { id: "act", text: "View More", hint: "Button text changed" },
    ],
  },
  {
    title: "Revenue Widget",
    els: [
      { id: "label", type: "p", text: "Monthly Revenue", cls: "text-muted-foreground" },
      { id: "num", type: "h", text: "$45,230", cls: "text-xl text-neon" },
      { id: "bar", type: "dot", text: "", cls: "w-full h-2 rounded-full bg-neon/30" },
      { id: "sub", type: "p", text: "Target: $50,000", cls: "text-muted-foreground" },
      { id: "badge", type: "badge", text: "On Track", cls: "bg-neon/20 text-neon" },
    ],
    mods: [
      { id: "num", text: "$45,320", hint: "Revenue amount changed (230 → 320)" },
      { id: "bar", cls: "w-full h-2 rounded-full bg-destructive/30", hint: "Progress bar color changed" },
      { id: "badge", text: "Behind", cls: "bg-destructive/20 text-destructive", hint: "Status changed to Behind" },
    ],
  },
  // Notification Cards
  {
    title: "Success Alert",
    els: [
      { id: "icon", type: "dot", text: "", cls: "w-3 h-3 rounded-full bg-neon" },
      { id: "t", type: "h", text: "Payment Successful", cls: "text-foreground" },
      { id: "msg", type: "p", text: "Your payment of $29.99 has been processed.", cls: "text-muted-foreground" },
      { id: "btn", type: "btn", text: "View Receipt", cls: "border border-border text-foreground" },
      { id: "dismiss", type: "p", text: "Dismiss", cls: "text-center text-muted-foreground" },
    ],
    mods: [
      { id: "icon", cls: "w-3 h-3 rounded-full bg-yellow-500", hint: "Icon color changed (green → yellow)" },
      { id: "msg", text: "Your payment of $29.00 has been processed.", hint: "Amount changed ($29.99 → $29.00)" },
      { id: "dismiss", hide: true, hint: "Dismiss link removed" },
    ],
  },
  {
    title: "Error Alert",
    els: [
      { id: "icon", type: "dot", text: "", cls: "w-3 h-3 rounded-full bg-destructive" },
      { id: "t", type: "h", text: "Upload Failed", cls: "text-destructive" },
      { id: "msg", type: "p", text: "File size exceeds the 10MB limit.", cls: "text-muted-foreground" },
      { id: "retry", type: "btn", text: "Try Again", cls: "bg-destructive text-destructive-foreground" },
      { id: "cancel", type: "p", text: "Cancel Upload", cls: "text-center text-muted-foreground" },
    ],
    mods: [
      { id: "t", text: "Upload Faild", hint: "Typo in heading (Failed → Faild)" },
      { id: "msg", text: "File size exceeds the 5MB limit.", hint: "Size limit changed (10MB → 5MB)" },
      { id: "retry", text: "Retry", hint: "Button text shortened" },
    ],
  },
  // Profile Cards
  {
    title: "User Profile",
    els: [
      { id: "avatar", type: "dot", text: "", cls: "w-10 h-10 rounded-full bg-neon/20" },
      { id: "name", type: "h", text: "Jane Cooper", cls: "text-foreground" },
      { id: "role", type: "badge", text: "Admin", cls: "bg-neon/20 text-neon" },
      { id: "bio", type: "p", text: "Full-stack developer with 5 years experience", cls: "text-muted-foreground" },
      { id: "follow", type: "btn", text: "Follow", cls: "bg-neon text-primary-foreground" },
    ],
    mods: [
      { id: "name", text: "Jane Copper", hint: "Name misspelled (Cooper → Copper)" },
      { id: "role", text: "Editor", hint: "Role changed (Admin → Editor)" },
      { id: "bio", text: "Full-stack developer with 3 years experience", hint: "Years changed (5 → 3)" },
    ],
  },
  {
    title: "Team Member Card",
    els: [
      { id: "avatar", type: "dot", text: "", cls: "w-10 h-10 rounded-full bg-accent/20" },
      { id: "name", type: "h", text: "Alex Morgan", cls: "text-foreground" },
      { id: "dept", type: "p", text: "Engineering Department", cls: "text-muted-foreground" },
      { id: "status", type: "badge", text: "Active", cls: "bg-neon/20 text-neon" },
      { id: "msg", type: "btn", text: "Send Message", cls: "border border-border text-foreground" },
    ],
    mods: [
      { id: "dept", text: "Engineering Dept.", hint: "Department abbreviated" },
      { id: "status", text: "Away", cls: "bg-yellow-500/20 text-yellow-500", hint: "Status changed (Active → Away)" },
      { id: "msg", text: "Send Email", hint: "Button text changed (Message → Email)" },
    ],
  },
  // Navigation Elements
  {
    title: "Navigation Bar",
    els: [
      { id: "logo", type: "h", text: "AppName", cls: "text-neon" },
      { id: "nav1", type: "p", text: "Dashboard", cls: "text-foreground" },
      { id: "nav2", type: "p", text: "Analytics", cls: "text-muted-foreground" },
      { id: "nav3", type: "p", text: "Settings", cls: "text-muted-foreground" },
      { id: "cta", type: "btn", text: "Upgrade", cls: "bg-neon text-primary-foreground" },
    ],
    mods: [
      { id: "logo", text: "AppNme", hint: "Logo text has typo (AppName → AppNme)" },
      { id: "nav2", text: "Analytic", hint: "Nav item text changed (Analytics → Analytic)" },
      { id: "cta", cls: "bg-foreground text-background", hint: "CTA button color changed" },
    ],
  },
  {
    title: "Sidebar Menu",
    els: [
      { id: "t", type: "h", text: "Menu", cls: "text-muted-foreground" },
      { id: "m1", type: "p", text: "🏠  Home", cls: "text-neon" },
      { id: "m2", type: "p", text: "📊  Reports", cls: "text-foreground" },
      { id: "m3", type: "p", text: "⚙️  Settings", cls: "text-foreground" },
      { id: "m4", type: "p", text: "🚪  Logout", cls: "text-destructive" },
    ],
    mods: [
      { id: "m1", text: "🏠  Hone", hint: "Typo in Home (Home → Hone)" },
      { id: "m3", hide: true, hint: "Settings menu item removed" },
      { id: "m4", cls: "text-muted-foreground", hint: "Logout color changed (red → gray)" },
    ],
  },
  // Product Cards
  {
    title: "Product Card",
    els: [
      { id: "img", type: "dot", text: "", cls: "w-full h-12 rounded bg-muted" },
      { id: "name", type: "h", text: "Wireless Headphones", cls: "text-foreground" },
      { id: "price", type: "h", text: "$79.99", cls: "text-neon" },
      { id: "rating", type: "p", text: "★★★★☆ (128 reviews)", cls: "text-yellow-500" },
      { id: "cart", type: "btn", text: "Add to Cart", cls: "bg-neon text-primary-foreground" },
    ],
    mods: [
      { id: "price", text: "$79.00", hint: "Price changed ($79.99 → $79.00)" },
      { id: "rating", text: "★★★☆☆ (128 reviews)", hint: "Rating decreased (4 → 3 stars)" },
      { id: "cart", text: "Add to Bag", hint: "Button text changed (Cart → Bag)" },
    ],
  },
  {
    title: "Order Summary",
    els: [
      { id: "t", type: "h", text: "Order #4829", cls: "text-foreground" },
      { id: "status", type: "badge", text: "Shipped", cls: "bg-neon/20 text-neon" },
      { id: "items", type: "p", text: "3 items · $149.97", cls: "text-muted-foreground" },
      { id: "date", type: "p", text: "Estimated: March 15", cls: "text-muted-foreground" },
      { id: "track", type: "btn", text: "Track Order", cls: "border border-border text-foreground" },
    ],
    mods: [
      { id: "t", text: "Order #4892", hint: "Order number changed (4829 → 4892)" },
      { id: "status", text: "Processing", cls: "bg-yellow-500/20 text-yellow-500", hint: "Status changed (Shipped → Processing)" },
      { id: "date", text: "Estimated: March 18", hint: "Date changed (15 → 18)" },
    ],
  },
  // Settings Panels
  {
    title: "Settings Panel",
    els: [
      { id: "t", type: "h", text: "Notifications", cls: "text-foreground" },
      { id: "desc", type: "p", text: "Manage your notification preferences", cls: "text-muted-foreground" },
      { id: "email", type: "p", text: "✅ Email Notifications", cls: "text-foreground" },
      { id: "push", type: "p", text: "✅ Push Notifications", cls: "text-foreground" },
      { id: "save", type: "btn", text: "Save Changes", cls: "bg-neon text-primary-foreground" },
    ],
    mods: [
      { id: "t", text: "Notification", hint: "Heading missing 's' (Notifications → Notification)" },
      { id: "push", text: "❌ Push Notifications", hint: "Push notifications toggled off" },
      { id: "save", text: "Save", hint: "Button text shortened" },
    ],
  },
  {
    title: "Account Settings",
    els: [
      { id: "t", type: "h", text: "Account", cls: "text-foreground" },
      { id: "email", type: "input", text: "user@company.com", cls: "" },
      { id: "plan", type: "badge", text: "Pro Plan", cls: "bg-neon/20 text-neon" },
      { id: "storage", type: "p", text: "Storage: 45/100 GB", cls: "text-muted-foreground" },
      { id: "upgrade", type: "btn", text: "Manage Plan", cls: "border border-border text-foreground" },
    ],
    mods: [
      { id: "email", text: "user@company.org", hint: "Email domain changed (.com → .org)" },
      { id: "plan", text: "Free Plan", cls: "bg-muted text-muted-foreground", hint: "Plan changed (Pro → Free)" },
      { id: "storage", text: "Storage: 45/50 GB", hint: "Total storage changed (100 → 50 GB)" },
    ],
  },
  // Table/List Items
  {
    title: "Task List",
    els: [
      { id: "t", type: "h", text: "Sprint Tasks", cls: "text-foreground" },
      { id: "t1", type: "p", text: "✅ Fix login bug", cls: "text-foreground" },
      { id: "t2", type: "p", text: "⬜ Update API docs", cls: "text-foreground" },
      { id: "t3", type: "p", text: "⬜ Write unit tests", cls: "text-foreground" },
      { id: "count", type: "badge", text: "1/3 Done", cls: "bg-neon/20 text-neon" },
    ],
    mods: [
      { id: "t1", text: "⬜ Fix login bug", hint: "Task unchecked (was completed)" },
      { id: "t3", text: "⬜ Write integration tests", hint: "Task renamed (unit → integration)" },
      { id: "count", text: "0/3 Done", hint: "Count changed (1/3 → 0/3)" },
    ],
  },
  {
    title: "Bug Report",
    els: [
      { id: "id", type: "p", text: "BUG-1024", cls: "font-mono text-muted-foreground" },
      { id: "t", type: "h", text: "Login timeout on slow networks", cls: "text-foreground" },
      { id: "sev", type: "badge", text: "Critical", cls: "bg-destructive/20 text-destructive" },
      { id: "assign", type: "p", text: "Assigned to: Sarah K.", cls: "text-muted-foreground" },
      { id: "status", type: "badge", text: "In Progress", cls: "bg-yellow-500/20 text-yellow-500" },
    ],
    mods: [
      { id: "id", text: "BUG-1042", hint: "Bug ID changed (1024 → 1042)" },
      { id: "sev", text: "Major", cls: "bg-orange-500/20 text-orange-500", hint: "Severity changed (Critical → Major)" },
      { id: "assign", text: "Assigned to: Sarah L.", hint: "Assignee initial changed (K → L)" },
    ],
  },
  // Form Elements
  {
    title: "Contact Form",
    els: [
      { id: "t", type: "h", text: "Contact Us", cls: "text-foreground" },
      { id: "name", type: "input", text: "Your Name", cls: "" },
      { id: "email", type: "input", text: "Your Email", cls: "" },
      { id: "subject", type: "input", text: "Subject", cls: "" },
      { id: "send", type: "btn", text: "Send Message", cls: "bg-neon text-primary-foreground" },
    ],
    mods: [
      { id: "t", text: "Contact", hint: "Heading shortened (Contact Us → Contact)" },
      { id: "subject", hide: true, hint: "Subject field removed" },
      { id: "send", text: "Submit", hint: "Button text changed (Send Message → Submit)" },
    ],
  },
  {
    title: "Search Bar",
    els: [
      { id: "label", type: "p", text: "Search", cls: "text-muted-foreground" },
      { id: "input", type: "input", text: "Search products...", cls: "" },
      { id: "filter", type: "badge", text: "All Categories", cls: "bg-muted text-muted-foreground" },
      { id: "btn", type: "btn", text: "Search", cls: "bg-neon text-primary-foreground" },
      { id: "recent", type: "p", text: "Recent: shoes, jackets", cls: "text-muted-foreground" },
    ],
    mods: [
      { id: "input", text: "Search items...", hint: "Placeholder changed (products → items)" },
      { id: "filter", text: "Electronics", hint: "Category filter changed" },
      { id: "recent", hide: true, hint: "Recent searches removed" },
    ],
  },
  // Status/Info Cards
  {
    title: "Server Status",
    els: [
      { id: "t", type: "h", text: "System Status", cls: "text-foreground" },
      { id: "api", type: "p", text: "🟢 API Server", cls: "text-foreground" },
      { id: "db", type: "p", text: "🟢 Database", cls: "text-foreground" },
      { id: "cdn", type: "p", text: "🟢 CDN", cls: "text-foreground" },
      { id: "uptime", type: "badge", text: "99.9% Uptime", cls: "bg-neon/20 text-neon" },
    ],
    mods: [
      { id: "db", text: "🟡 Database", hint: "Database status changed (green → yellow)" },
      { id: "cdn", text: "🔴 CDN", hint: "CDN status changed (green → red)" },
      { id: "uptime", text: "98.5% Uptime", hint: "Uptime percentage changed" },
    ],
  },
  {
    title: "Deployment Log",
    els: [
      { id: "t", type: "h", text: "Deploy v2.4.1", cls: "text-foreground" },
      { id: "env", type: "badge", text: "Production", cls: "bg-neon/20 text-neon" },
      { id: "time", type: "p", text: "Deployed at 14:30 UTC", cls: "text-muted-foreground" },
      { id: "by", type: "p", text: "By: deploy-bot", cls: "text-muted-foreground" },
      { id: "status", type: "badge", text: "Success", cls: "bg-neon/20 text-neon" },
    ],
    mods: [
      { id: "t", text: "Deploy v2.4.0", hint: "Version changed (v2.4.1 → v2.4.0)" },
      { id: "env", text: "Staging", cls: "bg-yellow-500/20 text-yellow-500", hint: "Environment changed (Production → Staging)" },
      { id: "time", text: "Deployed at 14:35 UTC", hint: "Time changed (14:30 → 14:35)" },
    ],
  },
  // More variants
  {
    title: "Pricing Card",
    els: [
      { id: "plan", type: "h", text: "Professional", cls: "text-foreground" },
      { id: "price", type: "h", text: "$29/month", cls: "text-xl text-neon" },
      { id: "f1", type: "p", text: "✅ Unlimited projects", cls: "text-foreground" },
      { id: "f2", type: "p", text: "✅ Priority support", cls: "text-foreground" },
      { id: "cta", type: "btn", text: "Get Started", cls: "bg-neon text-primary-foreground" },
    ],
    mods: [
      { id: "price", text: "$39/month", hint: "Price increased ($29 → $39)" },
      { id: "f2", text: "✅ Standard support", hint: "Support level changed (Priority → Standard)" },
      { id: "cta", text: "Subscribe", hint: "Button text changed" },
    ],
  },
  {
    title: "Chat Message",
    els: [
      { id: "sender", type: "h", text: "Support Agent", cls: "text-foreground" },
      { id: "time", type: "p", text: "2 min ago", cls: "text-muted-foreground" },
      { id: "msg", type: "p", text: "Your ticket has been resolved. Please confirm.", cls: "text-foreground" },
      { id: "reply", type: "btn", text: "Reply", cls: "border border-border text-foreground" },
      { id: "close", type: "btn", text: "Close Ticket", cls: "bg-neon text-primary-foreground" },
    ],
    mods: [
      { id: "time", text: "5 min ago", hint: "Time changed (2 → 5 min ago)" },
      { id: "msg", text: "Your ticket has been escalated. Please confirm.", hint: "Status changed (resolved → escalated)" },
      { id: "close", text: "Close Chat", hint: "Button text changed (Ticket → Chat)" },
    ],
  },
  {
    title: "Cookie Banner",
    els: [
      { id: "t", type: "h", text: "Cookie Consent", cls: "text-foreground" },
      { id: "msg", type: "p", text: "We use cookies to improve your experience.", cls: "text-muted-foreground" },
      { id: "accept", type: "btn", text: "Accept All", cls: "bg-neon text-primary-foreground" },
      { id: "decline", type: "btn", text: "Decline", cls: "border border-border text-foreground" },
      { id: "link", type: "p", text: "Privacy Policy", cls: "text-center text-neon" },
    ],
    mods: [
      { id: "msg", text: "We use cookies to track your activity.", hint: "Wording changed (improve experience → track activity)" },
      { id: "decline", hide: true, hint: "Decline button removed" },
      { id: "link", text: "Cookie Policy", hint: "Link text changed (Privacy → Cookie)" },
    ],
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const renderElement = (
  el: QElement,
  mod: Mod | undefined,
  isRight: boolean,
  isFound: boolean,
  onClick: () => void
) => {
  if (mod?.hide && isRight) return null;

  const text = isRight && mod?.text ? mod.text : el.text;
  const cls = isRight && mod?.cls ? mod.cls : el.cls;
  const isDiff = isRight && !!mod && !isFound;
  const foundStyle = isFound ? "ring-2 ring-neon rounded" : "";
  const clickable = isDiff ? "cursor-pointer hover:opacity-80" : "";

  const baseClick = isDiff ? onClick : undefined;

  switch (el.type) {
    case "h":
      return (
        <div key={el.id} onClick={baseClick} className={`font-bold text-sm ${cls} ${foundStyle} ${clickable}`}>
          {text}
        </div>
      );
    case "p":
      return (
        <div key={el.id} onClick={baseClick} className={`text-xs ${cls} ${foundStyle} ${clickable}`}>
          {text}
        </div>
      );
    case "btn":
      return (
        <div key={el.id} onClick={baseClick} className={`text-xs py-1.5 px-3 rounded text-center font-medium ${cls} ${foundStyle} ${clickable}`}>
          {text}
        </div>
      );
    case "badge":
      return (
        <span key={el.id} onClick={baseClick} className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${cls} ${foundStyle} ${clickable}`}>
          {text}
        </span>
      );
    case "input":
      return (
        <div key={el.id} onClick={baseClick} className={`text-xs py-1.5 px-3 rounded border border-border bg-background text-muted-foreground ${cls} ${foundStyle} ${clickable}`}>
          {text}
        </div>
      );
    case "hr":
      return <hr key={el.id} className="border-border" />;
    case "dot":
      return (
        <div key={el.id} onClick={baseClick} className={`${cls} ${foundStyle} ${clickable}`} />
      );
    default:
      return null;
  }
};

const QUESTIONS_PER_GAME = 5;

const FindTheDifference = () => {
  const [started, setStarted] = useState(false);
  const [questions] = useState(() => shuffle(ALL_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  const [currentQ, setCurrentQ] = useState(0);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [totalFound, setTotalFound] = useState(0);
  const [totalPossible, setTotalPossible] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [wrongClick, setWrongClick] = useState(false);

  const q = questions[currentQ];
  const allFound = q ? found.size === q.mods.length : false;

  const handleFind = useCallback((id: string) => {
    setFound((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setWrongClick(false);
  }, []);

  const handleWrongClick = useCallback(() => {
    setWrongClick(true);
    setTimeout(() => setWrongClick(false), 600);
  }, []);

  const handleNext = useCallback(() => {
    setTotalFound((prev) => prev + found.size);
    setTotalPossible((prev) => prev + (q?.mods.length || 0));
    if (currentQ < QUESTIONS_PER_GAME - 1) {
      setCurrentQ((c) => c + 1);
      setFound(new Set());
    } else {
      setTotalFound((prev) => prev);
      setCompleted(true);
    }
  }, [currentQ, found.size, q]);

  const restart = useCallback(() => {
    setStarted(false);
    setCurrentQ(0);
    setFound(new Set());
    setTotalFound(0);
    setTotalPossible(0);
    setCompleted(false);
  }, []);

  const finalTotalFound = totalFound + (completed ? 0 : found.size);
  const finalTotalPossible = totalPossible + (completed ? 0 : (q?.mods.length || 0));

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-8 text-center max-w-xl mx-auto"
      >
        <Eye className="mx-auto text-neon mb-4" size={40} />
        <h3 className="text-2xl font-bold mb-2">Find the Difference</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Spot the differences between two UI screens. Each round has 3 differences to find. Test your eye for detail — just like a real QA engineer.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="btn-press inline-flex items-center gap-2 bg-neon text-primary-foreground px-8 py-3 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
        >
          <Play size={16} />
          Start Game
        </button>
      </motion.div>
    );
  }

  if (completed) {
    const total = totalFound;
    const possible = totalPossible;
    const pct = possible > 0 ? Math.round((total / possible) * 100) : 0;
    const getMessage = () => {
      if (pct >= 90) return { emoji: "🏆", text: "Good eye. Regression passed." };
      if (pct >= 50) return { emoji: "🔍", text: "Detail matters in production." };
      return { emoji: "🐛", text: "Missed a critical UI bug." };
    };
    const msg = getMessage();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-8 text-center max-w-xl mx-auto"
      >
        <p className="text-5xl mb-4">{msg.emoji}</p>
        <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
        <p className="text-neon text-xl font-bold mb-1">
          {total}/{possible} Differences Found
        </p>
        <p className="text-sm text-muted-foreground italic mb-6">"{msg.text}"</p>
        <button
          onClick={restart}
          className="btn-press inline-flex items-center gap-2 bg-neon text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
        >
          <RotateCcw size={14} />
          Play Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-muted-foreground">
          Round {currentQ + 1}/{QUESTIONS_PER_GAME}
        </span>
        <span className="text-xs font-mono text-neon">
          {found.size}/{q.mods.length} found
        </span>
      </div>

      <div className="w-full h-1 bg-border rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-neon transition-all duration-300 rounded-full"
          style={{ width: `${((currentQ + 1) / QUESTIONS_PER_GAME) * 100}%` }}
        />
      </div>

      <h3 className="text-sm font-semibold mb-4 text-center">{q.title} — Spot 3 differences in the right panel</h3>

      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
        {/* Left Panel - Original */}
        <div className="relative">
          <p className="text-[10px] font-mono text-muted-foreground mb-2 text-center">ORIGINAL</p>
          <div className="bg-card border border-border rounded-lg p-3 space-y-2 min-h-[160px]">
            {q.els.map((el) => renderElement(el, undefined, false, false, () => {}))}
          </div>
        </div>

        {/* Right Panel - Modified */}
        <div className="relative">
          <p className="text-[10px] font-mono text-muted-foreground mb-2 text-center">MODIFIED</p>
          <div
            className={`bg-card border rounded-lg p-3 space-y-2 min-h-[160px] transition-colors ${
              wrongClick ? "border-destructive" : "border-border"
            }`}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleWrongClick();
            }}
          >
            {q.els.map((el) => {
              const mod = q.mods.find((m) => m.id === el.id);
              const isF = found.has(el.id);
              return renderElement(el, mod, true, isF, () => {
                if (mod && !isF) handleFind(el.id);
                else if (!mod) handleWrongClick();
              });
            })}
          </div>
        </div>
      </div>

      {/* Hints for found differences */}
      <div className="space-y-1 mb-4">
        {q.mods.map((mod) => (
          <div key={mod.id} className="flex items-center gap-2 text-xs">
            {found.has(mod.id) ? (
              <CheckCircle size={12} className="text-neon shrink-0" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-border shrink-0" />
            )}
            <span className={found.has(mod.id) ? "text-foreground" : "text-muted-foreground/40"}>
              {found.has(mod.id) ? mod.hint : "???"}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {allFound && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleNext}
            className="btn-press w-full bg-neon text-primary-foreground py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
          >
            {currentQ < QUESTIONS_PER_GAME - 1 ? "Next Round" : "See Results"}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FindTheDifference;
