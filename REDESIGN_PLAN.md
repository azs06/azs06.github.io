# Website Redesign & SEO Optimization Plan

## Overview
Full redesign of soikat.dev with a **minimal & clean** aesthetic, followed by SEO improvements.

**Goals:**
- New visual identity with lots of whitespace, simple typography, subtle colors
- Left-aligned layouts (currently centered)
- Remove visual clutter (shadows, gradients, decorative effects)
- Add missing JSON-LD structured data for better search visibility

---

## Phase 1: Design System Foundation

### 1.1 Update Tailwind Config
**File:** `tailwind.config.mjs`

New color palette (replace current `#142934` branding):
```
Primary: #111827 (near-black text)
Accent: #6366f1 (soft indigo)
Surface: #fafafa (off-white backgrounds)
Border: #e5e7eb (subtle dividers)
Muted: #6b7280 (secondary text)
```

Add font configuration:
- Keep Atkinson (good for accessibility) or switch to Inter
- Add JetBrains Mono for code blocks

### 1.2 Simplify Global CSS
**File:** `src/styles/global.css`

- Remove decorative `::before` pseudo-elements on headings
- Simplify shadows to subtle `0 1px 2px rgba(0,0,0,0.05)`
- Clean up markdown styles (simpler blockquotes, code blocks)
- Update CSS variables for new color scheme

---

## Phase 2: Component Redesign

### 2.1 Header Component
**File:** `src/components/Header.astro`

Changes:
- Remove `shadow-md` - use subtle `border-b border-gray-100`
- Move social icons (Twitter, GitHub) to footer
- Simplify to: `[Logo] [Nav Links] [Dark Mode Toggle]`
- Add sticky behavior with backdrop blur
- Clean hover states (underline animation instead of color change)

### 2.2 Footer Component
**File:** `src/components/Footer.astro`

Changes:
- Light background (not dark)
- Add social icons (moved from header)
- Simple layout: copyright + social links
- Optional: Add quick navigation links

### 2.3 BlogCard Component
**File:** `src/components/BlogCard.astro`

Changes:
- Remove shadow and hover scale effects
- Make hero image optional or smaller
- Focus on: Date → Title → Description → Tags
- Subtle hover state (background color shift only)
- Minimal tag pills with soft colors

### 2.4 LayoutHeader Component
**File:** `src/components/LayoutHeader.astro`

Changes:
- Remove logo (already in main header)
- Left-align page titles
- Add optional subtitle/description

---

## Phase 3: Page Redesigns

### 3.1 Home Page
**File:** `src/pages/index.astro`

Current: Centered hero, large profile image, tech-highlight spans

New Design:
```
[Name as large hero text - LEFT aligned]
[Role/tagline - muted]

[Two-column layout]
- Left: Bio paragraphs (3-4 sentences)
- Right: Smaller profile image

[Technologies Section]
- Horizontal row of minimal text pills
- Skills: TypeScript, JavaScript, Python, Go, DevOps

[SaaS Products Section]
- Section title: "Products I've Built"
- 2-column minimal card grid
- Each card: Name → One-line description → External link

[Recent Blog Posts Section]
- Section title: "Recent Posts"
- 3 latest posts using BlogCard component
- Fetch via: getCollection("blog").slice(0, 3)
- "View all posts →" link

[CTA buttons - minimal style]
"View Work" | "Contact"
```

Remove:
- Blur effect behind profile image
- `tech-highlight` spans (use regular bold)
- Centered layout

### 3.2 About Page
**File:** `src/pages/about.astro`

New Design:
- Two-column: Bio (left, wider) + Profile (right)
- Simplified timeline (vertical line, minimal entries)
- Skills as simple tag cloud or grouped lists (not grid cards)

### 3.3 Work Page
**File:** `src/pages/work.astro`

New Design:
- Clean experience timeline
- 2-column project grid with minimal cards
- Remove tilt effects and complex hover animations
- Remove iframe modals (link directly to projects)

### 3.4 Blog Index
**File:** `src/pages/blog/index.astro`

New Design:
- Clean search input
- Tag pills inline (not collapsible)
- List view with: Date | Title | Excerpt
- Or: 2-column minimal cards

### 3.5 Blog Post Layout
**File:** `src/layouts/BlogPost.astro`

New Design:
- Article max-width: 65ch for optimal reading
- Simplified header: Title → Meta (date, reading time, tags)
- Optional smaller hero image
- Clean typography with generous spacing

### 3.6 Contact Page
**File:** `src/pages/contact.astro`

Simplify to:
- Two columns: Contact info (left) + Simple form (right)
- Form: Name, Email, Message only
- Move detailed process info to Services page

### 3.7 Services Page
**File:** `src/pages/services.astro`

New Design:
- Clean hero statement
- 2x2 services grid with subtle cards
- Horizontal process timeline
- Simple CTA

---

## Phase 4: SEO Improvements

### 4.1 Create StructuredData Component
**New File:** `src/components/StructuredData.astro`

Add JSON-LD schemas for:
- **WebSite** schema (all pages)
- **Article** schema (blog posts)
- **Person** schema (about page)
- **BreadcrumbList** schema (navigation)

### 4.2 Update BaseHead
**File:** `src/components/BaseHead.astro`

- Import and use StructuredData component
- Add WebSite schema to all pages
- Pass page-specific schema data

### 4.3 Create Breadcrumb Component
**New File:** `src/components/Breadcrumb.astro`

- Visual breadcrumb navigation
- JSON-LD BreadcrumbList schema
- Use on: Blog posts, Work, Services, About

### 4.4 Blog Post SEO
**File:** `src/layouts/BlogPost.astro`

- Add Article schema with headline, datePublished, author, image
- Add breadcrumbs

### 4.5 Image Optimization

- Ensure all images have descriptive alt text
- Add width/height attributes to prevent layout shift
- Consider converting large JPEGs to WebP

---

## Data Structures

### Technologies & Products
**File:** `src/consts.ts`

```typescript
export const TECHNOLOGIES = [
  'TypeScript', 'JavaScript', 'Python', 'Go', 'DevOps'
];

export const SAAS_PRODUCTS = [
  {
    name: 'DokanePOS',
    description: 'A complete sales ERP solution for retail businesses',
    url: 'https://dokanepos.com'
  },
  {
    name: 'freeinvoice.info',
    description: 'Create and send professional invoices in seconds',
    url: 'https://freeinvoice.info'
  },
  {
    name: 'minimalhishab.com',
    description: 'Browser-based minimal accounting for freelancers',
    url: 'https://minimalhishab.com'
  },
  {
    name: 'aibcspreparation.com',
    description: 'AI-powered BCS exam preparation platform',
    url: 'https://aibcspreparation.com'
  },
  {
    name: 'DigitalNova',
    description: 'All-in-one digital marketing and SEO toolkit',
    url: '#'
  }
];
```

---

## Implementation Order

### Step 1: Design Foundation
1. `tailwind.config.mjs` - New colors, fonts, spacing
2. `src/styles/global.css` - Simplified styles, CSS variables

### Step 2: Core Components
3. `src/consts.ts` - Add TECHNOLOGIES and SAAS_PRODUCTS data
4. `src/components/Header.astro` - Minimal header
5. `src/components/Footer.astro` - Updated with social icons
6. `src/layouts/MainLayout.astro` - Updated spacing

### Step 3: Home & About
7. `src/pages/index.astro` - Left-aligned minimal hero + Technologies + SaaS Products + Recent Posts
8. `src/pages/about.astro` - Two-column layout

### Step 4: Blog
9. `src/components/BlogCard.astro` - Minimal cards
10. `src/pages/blog/index.astro` - Clean listing
11. `src/layouts/BlogPost.astro` - Clean reading experience

### Step 5: Work & Services
12. `src/pages/work.astro` - Simplified portfolio
13. `src/pages/services.astro` - Clean services
14. `src/pages/contact.astro` - Simplified contact

### Step 6: SEO
15. Create `src/components/StructuredData.astro`
16. Create `src/components/Breadcrumb.astro`
17. Update `src/components/BaseHead.astro` with schemas
18. Add schemas to blog posts and pages

---

## Key Files to Modify

| File | Changes |
|------|---------|
| `src/consts.ts` | Add TECHNOLOGIES and SAAS_PRODUCTS arrays |
| `tailwind.config.mjs` | New color palette, fonts |
| `src/styles/global.css` | Simplified styles |
| `src/components/Header.astro` | Remove shadows, move social icons |
| `src/components/Footer.astro` | Add social icons |
| `src/components/BlogCard.astro` | Minimal design |
| `src/components/BaseHead.astro` | Add structured data |
| `src/layouts/MainLayout.astro` | Updated spacing |
| `src/layouts/BlogPost.astro` | Clean layout + Article schema |
| `src/pages/index.astro` | Left-aligned hero + Technologies + SaaS Products + Recent Posts |
| `src/pages/about.astro` | Two-column layout |
| `src/pages/work.astro` | Simplified portfolio |
| `src/pages/blog/index.astro` | Clean blog listing |
| `src/pages/contact.astro` | Simplified form |
| `src/pages/services.astro` | Clean services |

## New Files to Create

- `src/components/StructuredData.astro` - JSON-LD schemas
- `src/components/Breadcrumb.astro` - Navigation breadcrumbs
