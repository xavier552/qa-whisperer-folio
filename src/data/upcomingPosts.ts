export interface UpcomingPost {
  title: string;
  category: string;
  readTime: string;
  gradient: string;
  emoji: string;
}

export const upcomingPosts: UpcomingPost[] = [
  {
    title: "Building a Scalable Test Automation Framework",
    category: "Test Automation",
    readTime: "8 min read",
    gradient: "from-[#0f2e12] via-[#0a1a0d] to-[#000]",
    emoji: "🧪",
  },
  {
    title: "API Testing Best Practices in 2026",
    category: "API Testing",
    readTime: "6 min read",
    gradient: "from-[#0e2a2e] via-[#0a181a] to-[#000]",
    emoji: "🔌",
  },
  {
    title: "Shift-Left Testing: A Practical Guide",
    category: "QA Tips",
    readTime: "5 min read",
    gradient: "from-[#2a1e0c] via-[#1a1408] to-[#000]",
    emoji: "⬅️",
  },
  {
    title: "Mobile Testing Insights",
    category: "Mobile Testing",
    readTime: "7 min read",
    gradient: "from-[#231045] via-[#120826] to-[#000]",
    emoji: "📱",
  },
  {
    title: "Selenium Automation Tips",
    category: "Test Automation",
    readTime: "6 min read",
    gradient: "from-[#0c2540] via-[#08172a] to-[#000]",
    emoji: "🤖",
  },
  {
    title: "Performance Testing Guide",
    category: "Performance Testing",
    readTime: "9 min read",
    gradient: "from-[#3a0d1f] via-[#210714] to-[#000]",
    emoji: "⚡",
  },
];