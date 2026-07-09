# Portfolio Blog + Animation Overhaul

## 1. Replayable Scroll Animations
- Update `FadeInUp` to use `whileInView` + `viewport={{ once: false, margin: "-80px" }}` so animations replay every time a section enters the viewport.
- Audit sections that use `useInView(..., { once: true })` (AboutSection, ProjectsSection, BlogSection, ContactSection, ResumeSection, ExperienceSection, BugHuntSection) and switch to `once: false`.
- Add new reusable variants (`FadeIn`, `BlurIn`, `ScaleIn`, `SlideIn`, `StaggerContainer`) in a single `src/components/animations/` module so blog page can reuse them.
- Keep transforms GPU-friendly (opacity + translate/scale only) to preserve 60 FPS on mobile.

## 2. Premium "Read Article" CTA
- New `src/components/ReadArticleButton.tsx`: skewed pill button, neon-green border, animated SVG arrow that slides + fades on hover, subtle `box-shadow` glow using `--neon-glow`.
- Full keyboard support: `:focus-visible` ring, `aria-label`, works as `<Link>` or `<a>`.
- Respects `prefers-reduced-motion`.
- Reused in `BlogSection` (home) featured cards and `BlogsPage` grid.

## 3. Navigation Update
- Homepage `Navbar` order: Home, Resume, Projects, Experience, Blog, Contact.
  - "Resume", "Projects", "Experience", "Contact" continue to scroll to sections on `/`.
  - "Blog" navigates to `/blog` (route rename from `/blogs`).
- `SubPageHeader` mirrors the same items so all sub-pages share nav; clicking a section item from a sub-page routes to `/#section`.

## 4. Dedicated Blog Route
- Rename route to `/blog` (keep `/blogs` as redirect for safety).
- `BlogsPage` becomes the Blog index with:
  - Hero: title "Field Notes on Quality", intro paragraph, animated GeometricCircles background (inherits `GlobalBackground`).
  - Search bar (title + tag + category search).
  - Category chips: Manual Testing, Test Automation, API Testing, Performance Testing, Mobile Testing, Career, QA Tips (selectable filter).
  - Featured section: the 3 existing articles as large cards.
  - "All Articles" grid below (same three initially, extensible).

## 5. Featured Card Content
- Each article card: generated cover illustration, category chip, reading time, published date, short description, `ReadArticleButton`.
- Cover images generated as lightweight SVG/gradient illustrations (no external network calls) stored in `src/assets/blog/`.

## 6. Individual Blog Pages (In-App)
- New route `/blog/:slug` -> `BlogPostPage`.
- Article data moves to `src/data/blogPosts.ts` with structured content blocks (heading, paragraph, code, callout, image, tip, list). Content authored in-house, based on the referenced external articles but written as Xavier's own take (no verbatim copying).
- `BlogPostPage` layout:
  - Hero banner with title, category, date, author (Xavier Varghese), estimated reading time.
  - Scroll progress bar (top, fixed).
  - Sticky table of contents (desktop) generated from headings; mobile shows collapsible ToC.
  - Rendered content blocks:
    - Syntax-highlighted code (`react-syntax-highlighter` / Prism, one-dark-ish theme mapped to neon).
    - Callout cards + QA Tip cards (green-accent, glassmorphism).
    - Responsive `<img loading="lazy">` with aspect-ratio wrappers to avoid CLS.
  - Footer of article: share buttons (Twitter/X, LinkedIn), copy-link button (with toast), previous/next navigation, related articles (2), Back to Blog.

## 7. Performance
- `React.lazy` + `Suspense` for `BlogsPage` and `BlogPostPage` in `App.tsx`.
- All blog images lazy-loaded with explicit width/height.
- Animations respect `prefers-reduced-motion`.
- Reuse existing `GlobalBackground` (no extra canvas) to keep FPS stable.

## 8. Files

Created
- `src/components/animations/index.tsx` — FadeInUp/BlurIn/ScaleIn/SlideIn/Stagger.
- `src/components/ReadArticleButton.tsx`
- `src/components/blog/BlogHero.tsx`
- `src/components/blog/BlogCard.tsx`
- `src/components/blog/CategoryChips.tsx`
- `src/components/blog/ArticleProgress.tsx`
- `src/components/blog/TableOfContents.tsx`
- `src/components/blog/ArticleRenderer.tsx` (code/callout/tip/image blocks)
- `src/components/blog/ShareBar.tsx`
- `src/data/blogPosts.ts`
- `src/pages/BlogPostPage.tsx`
- `src/assets/blog/*.svg` (3 cover illustrations)

Edited
- `src/App.tsx` — add `/blog` + `/blog/:slug`, lazy-load, redirect `/blogs`.
- `src/components/Navbar.tsx` — new item order, Blog links to `/blog`.
- `src/components/SubPageHeader.tsx` — mirror nav.
- `src/components/BlogSection.tsx` — use new card + ReadArticleButton, link to in-app `/blog/:slug`, "View All Articles" -> `/blog`.
- `src/pages/BlogsPage.tsx` — full redesign as described.
- `src/components/FadeInUp.tsx` — replay-on-viewport.
- Section components using `once: true` — switched to replay.
- `src/index.css` / `tailwind.config.ts` — keyframes for blur-in / arrow slide / progress bar.

## Technical Notes
- Syntax highlighting: `react-syntax-highlighter` (Prism light build) to keep bundle small; imported only inside lazy `BlogPostPage`.
- ToC uses `IntersectionObserver` to highlight the active section.
- Progress bar uses framer-motion `useScroll` + `useTransform` for GPU-accelerated width.
- Reduced-motion: animations collapse to opacity-only transitions.
- No backend needed — content is static TypeScript.

Approve and I'll implement.
