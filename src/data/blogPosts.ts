export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "callout"; variant?: "info" | "tip" | "warn"; title?: string; text: string }
  | { type: "quote"; text: string; cite?: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  author: string;
  cover: { gradient: string; emoji: string };
  content: ContentBlock[];
  references?: { label: string; url: string }[];
}

export const CATEGORIES = [
  "All",
  "Manual Testing",
  "Test Automation",
  "API Testing",
  "Performance Testing",
  "Mobile Testing",
  "Career",
  "QA Tips",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "scalable-test-automation-framework",
    title: "Building a Scalable Test Automation Framework",
    excerpt:
      "How I architect automation frameworks that grow with the product — layered design, the Page Object Model, and the trade-offs I actually make in real projects.",
    category: "Test Automation",
    tags: ["Selenium", "TestNG", "POM", "Cucumber"],
    date: "Jan 12, 2026",
    readTime: "8 min read",
    author: "Xavier Varghese",
    cover: { gradient: "from-[#0f2e12] via-[#0a1a0d] to-[#000]", emoji: "🧪" },
    content: [
      { type: "p", text: "Every automation framework starts clean. Two sprints later it usually feels like a maze of duplicated locators, sleep() calls, and tests that fail on Fridays for reasons nobody remembers. Scalability isn't a fancy tool choice — it's a set of boring decisions taken early." },
      { type: "h2", id: "layers", text: "Think in layers, not files" },
      { type: "p", text: "I split every framework into four layers so responsibilities don't bleed:" },
      { type: "ul", items: [
        "Driver / config layer — WebDriver setup, environment resolution, capabilities.",
        "Page objects — user-facing screens with intent-based methods (login, addToCart).",
        "Business flows — reusable journeys stitched together from page objects.",
        "Tests — thin assertions describing behavior, never the how.",
      ]},
      { type: "callout", variant: "tip", title: "QA Tip", text: "If a test file imports a By.xpath, the layering is already broken. Selectors belong in page objects." },
      { type: "h2", id: "pom", text: "Page Object Model, but pragmatic" },
      { type: "p", text: "The classic POM is great until pages get huge. I split screens into components — a Header, a ProductCard, a Cart — each owning its own selectors. Tests read like sentences." },
      { type: "code", lang: "java", code: `public class LoginPage {\n  private final WebDriver driver;\n  private final By email = By.id("email");\n  private final By password = By.id("password");\n  private final By submit = By.cssSelector("[data-test='login']");\n\n  public LoginPage(WebDriver driver) { this.driver = driver; }\n\n  public HomePage loginAs(String user, String pass) {\n    driver.findElement(email).sendKeys(user);\n    driver.findElement(password).sendKeys(pass);\n    driver.findElement(submit).click();\n    return new HomePage(driver);\n  }\n}` },
      { type: "h2", id: "data", text: "Data-driven, not data-drowned" },
      { type: "p", text: "Cucumber examples and TestNG @DataProvider are fine — until every scenario runs 40 variations. Keep smoke suites lean, push variant coverage into targeted regression jobs, and tag ruthlessly." },
      { type: "h2", id: "ci", text: "Wire it to CI on day one" },
      { type: "p", text: "A framework that runs only on someone's laptop isn't a framework. Headless mode, parallel execution, retry-on-failure for known flaky spots, and HTML reports that a PM can open — that's the bar." },
      { type: "callout", variant: "warn", title: "Watch out", text: "Retries hide flakiness. Log every retry and review them weekly, otherwise your suite quietly rots." },
      { type: "h2", id: "takeaways", text: "Takeaways" },
      { type: "ol", items: [
        "Layer the framework before writing a second test.",
        "Selectors live in page objects, never in tests.",
        "Make CI the source of truth from the first commit.",
        "Tag tests so smoke, regression, and nightly stay honest.",
      ]},
    ],
    references: [
      { label: "How to build a scalable test automation framework (DeviQA)", url: "https://www.linkedin.com/pulse/how-build-scalable-test-automation-framework-from-scratch-deviqa-5ufde/" },
    ],
  },
  {
    slug: "api-testing-best-practices-2026",
    title: "API Testing Best Practices in 2026",
    excerpt: "Contracts, negative paths, and the quiet failures — a modern checklist for API testing that catches bugs before the UI ever gets a chance.",
    category: "API Testing",
    tags: ["Postman", "REST", "Contracts", "Schema"],
    date: "Dec 20, 2025",
    readTime: "6 min read",
    author: "Xavier Varghese",
    cover: { gradient: "from-[#0e2a2e] via-[#0a181a] to-[#000]", emoji: "🔌" },
    content: [
      { type: "p", text: "APIs are where business logic actually lives. If the UI is a costume, the API is the skeleton — and I've caught more critical bugs at the API layer than I ever have clicking through screens." },
      { type: "h2", id: "contracts", text: "Start with the contract" },
      { type: "p", text: "Before writing a single test case, I pin down the schema — request, response, status codes, error shapes. If the spec doesn't exist, that's finding #1." },
      { type: "callout", variant: "info", title: "Definition of Ready", text: "No contract, no automation. A test that assumes the response shape is a bug waiting to happen." },
      { type: "h2", id: "categories", text: "Cover all six categories, not just happy paths" },
      { type: "ul", items: [
        "Functional — does it do the thing?",
        "Validation — bad payloads, missing fields, wrong types.",
        "Authorization — every role hits every endpoint.",
        "Boundary — max length, empty strings, unicode, negative numbers.",
        "Performance — response time under a realistic load.",
        "Security — injection, IDOR, rate limits, token expiry.",
      ]},
      { type: "h2", id: "postman", text: "Postman, but treat it like code" },
      { type: "p", text: "Collections live in Git. Environments never contain secrets. Chained requests use pm.test with schema validation, not just status checks." },
      { type: "code", lang: "javascript", code: `pm.test("response matches schema", () => {\n  const schema = {\n    type: "object",\n    required: ["id", "email", "createdAt"],\n    properties: {\n      id: { type: "string" },\n      email: { type: "string", format: "email" },\n      createdAt: { type: "string" }\n    }\n  };\n  pm.response.to.have.jsonSchema(schema);\n});` },
      { type: "h2", id: "negatives", text: "The quiet failures" },
      { type: "p", text: "The bugs users hit rarely come from 200s. They come from 500s that the frontend silently swallows, or 200s with a wrong shape. Assert the payload, not just the status." },
      { type: "callout", variant: "tip", title: "QA Tip", text: "If a status code is 200 but the body says {\"error\":\"...\"}, that's a contract bug. Flag it." },
    ],
    references: [
      { label: "API Testing Best Practices (AIO Tests)", url: "https://www.aiotests.com/blog/api-testing-best-practices" },
    ],
  },
  {
    slug: "shift-left-testing-guide",
    title: "Shift-Left Testing: A Practical Guide",
    excerpt: "Shift-left isn't a slogan. It's a set of habits that move quality upstream — starting in refinement, not in a QA column at the end of the sprint.",
    category: "QA Tips",
    tags: ["Process", "Agile", "Quality"],
    date: "Nov 8, 2025",
    readTime: "5 min read",
    author: "Xavier Varghese",
    cover: { gradient: "from-[#2a1e0c] via-[#1a1408] to-[#000]", emoji: "⬅️" },
    content: [
      { type: "p", text: "Every team I've joined that struggled with quality had the same anti-pattern: QA showed up when the ticket was already 'done'. Shift-left just means pulling that involvement earlier, and it starts long before the first line of code." },
      { type: "h2", id: "refinement", text: "Start in refinement" },
      { type: "p", text: "The cheapest bug is the one you kill in the story. I bring three questions to every refinement: what's the negative path, what's the edge case, and how will we know it works?" },
      { type: "h2", id: "criteria", text: "Acceptance criteria are test cases" },
      { type: "p", text: "If AC reads like marketing copy, it's not done. AC should be specific enough that a QA and a dev independently write the same test." },
      { type: "callout", variant: "tip", title: "QA Tip", text: "Rewrite AC as Given/When/Then during grooming. If it doesn't fit, the story needs splitting." },
      { type: "h2", id: "pairing", text: "Pair with devs on branches" },
      { type: "p", text: "I review PRs, run the branch locally, and catch UI/UX regressions before merge. Shift-left doesn't replace regression testing, it just makes it smaller." },
      { type: "h2", id: "measuring", text: "Measure what moved" },
      { type: "ul", items: [
        "Defect escape rate — bugs found in production vs. pre-release.",
        "Bug age — how long from introduction to detection.",
        "Rework rate — stories re-opened after 'done'.",
      ]},
      { type: "quote", text: "Quality is not an act, it's a habit.", cite: "Aristotle" },
    ],
    references: [
      { label: "Shift-Left Testing Complete Guide (Ram Sharan)", url: "https://www.linkedin.com/pulse/shift-left-testing-complete-guide-ram-sharan-sgoec/" },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const getAdjacent = (slug: string) => {
  const i = blogPosts.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? blogPosts[i - 1] : null,
    next: i >= 0 && i < blogPosts.length - 1 ? blogPosts[i + 1] : null,
  };
};