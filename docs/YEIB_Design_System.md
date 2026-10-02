# YEIB Investment Fund — Design System v2.1

> **v2.1 note:** Sections 3, 4, 5 and 6 now describe the website as built. Where the code and an earlier version of this doc differed, the code wins.

## 0. Naming

- Always write **YEIB Investment Fund** in full for page titles, first mentions, legal text and emails. **YEIB** alone is fine after that.
- YEIB is a **fund, never a bank**. Never call it a bank in copy, metadata, alt text or emails; this is a regulatory requirement (CBN), not a style choice.
- Don't write "N-YEIB", "Nigeria YEIB Investment Funds", "YEIB Fund", or the plural "Investment Funds".
- Page titles follow `<Page name> | YEIB Investment Fund`.

## 1. Visual Theme & Atmosphere

YEIB's website radiates institutional authority blended with modern approachability. The entire page sits on a pale, mint-tinted background (`#F2FBF6`) that separates it from standard white finance sites. This deliberate choice creates a fresh, forward-looking feel, suited for a fund targeting youth and women-led MSMEs. The deep evergreen text (`#003124`) against this mint cream creates a high contrast ratio (13.59) that guarantees sharp readability while feeling natural and grounded.

The typography pairing is the system's secret weapon. Asul provides institutional weight and authority for display text, featuring elegant serifs and a confident presence. Chivo handles everything else: body copy, metadata and tags.

**Key Characteristics:**
- Fresh Mint Cream background (`#F2FBF6`) — a deliberate base that feels optimistic and clean.
- Typographic tension between authoritative Asul and hardworking Chivo.
- Deep, grounded Evergreen (`#003124`) anchoring the visual weight.
- Strategic flashes of Mint Leaf (`#00BE93`) for action and Tiger Orange (`#F88404`) for urgency.
- Clean, banded outcome blocks that prioritize proof over promises.

## 2. Color Palette & Roles

### Primary
- **Evergreen** (`#003124`): Primary foundation, core text, dark button backgrounds.
- **Mint Leaf** (`#00BE93`): Primary action, interactive elements, verified checkmarks.
- **Mint Cream** (`#F2FBF6`): Page background, light card surfaces. 

### Accent & Support
- **Tiger Orange** (`#F88404`): Campaign accent. Used strictly for urgency: deadlines, application windows, and event CTAs.
- **Pale Oak** (`#E1C9B3`): Supporting surface, subtle rules, and secondary labels.

### Color Discipline
**Every field has one job. No colour does two.**
- **Dark Fields**: Evergreen background carries Mint Leaf for figures and role lines, Pale Oak for rules/labels, and Mint Cream for body type.
- **Light Fields**: Mint Cream and white take Evergreen as the primary and only ink. Mint Leaf and Tiger Orange appear here as fields, marks, and fills, never as type.
- **Exception, as built**: Section eyebrows on light fields use Tiger Orange text (short, bold, small caps-style labels only).
- **Tiger Orange Rules**: A field rather than an ink. Takes Evergreen type (or white in immaterial contexts). Never used for core institutional messaging.

## 3. Typography Rules

### Font Families
- **Primary Display (Asul)**: 700 weight. For headings and high-impact statements.
- **Primary Body (Chivo)**: 400, 500 weights. For standard reading and lead paragraphs.
- **Utility (Chivo)**: 600–700 weight. For eyebrows, tags, and small utility text. (General Sans was dropped; the `--font-general-sans` token now points to Chivo.)

### Hierarchy

| Role | Font | Size | Weight | Tracking/Spacing |
|------|------|------|--------|------------------|
| Display / H1 | Asul | 56px (3.5rem) | 700 | normal |
| Section / H2 | Asul | 40px (2.5rem) | 700 | normal |
| Sub-heading / H3| Asul | 28px (1.75rem)| 700 | normal |
| Card Title / H4 | Asul | 22px (1.37rem)| 700 | normal |
| Lead Body | Chivo | 19px (1.18rem)| 400 | normal |
| Standard Body | Chivo | 16px (1.00rem)| 400 | normal |
| Small Text | Chivo | 14px (0.87rem)| 500 | normal |
| Eyebrow/Tags | Chivo | 12–14px (`text-xs`/`text-sm`)| 600–700 | wide (`tracking-widest`) |

### Principles
- **Asul carries authority. Chivo does the work.** The serif brings the institutional trust; the sans-serif brings the modern operational efficiency.
- **No bold body text**: Use Medium (500) for emphasis in body copy, reserving heavy weights for Asul headings.
- **Eyebrows**: On the site, section eyebrows are Tiger Orange Chivo, `text-xs font-bold tracking-widest`, e.g. `text-[var(--color-tiger-orange)] text-xs font-bold tracking-widest`.

## 4. Component Stylings

Shared primitives live in `components/ui/`. Use them before writing new markup.

### Buttons (`Button`)
All buttons are **pills** (`rounded-full`) with a hover lift (`hover:-translate-y-1 hover:shadow-lg`), press feedback (`active:scale-95`) and a Tiger Orange focus ring.

**Primary**: Evergreen background, Mint Cream text. Main call to action ("Apply for funding").

**Secondary (outline)**: transparent, `border-2` Evergreen, Evergreen text, fills Evergreen on hover.

**Link**: Mint Leaf text, underline on hover, often with an arrow suffix ("See the evidence →").

Sizes: `sm` (h-9), `default` (h-12), `lg` (h-14).

### Tags & Pills (`Tag`)
Pills (`rounded-full`). Variants: `youth` (Mint Cream fill, Evergreen text), `solid` (Evergreen fill, white text), `soft` (pale mint fill, green text), `series` (Tiger Orange uppercase text, no fill), `verified` (Mint Leaf text).

### Cards (`Card`)
- Mint Cream or white background, thin Pale Oak border, Evergreen text.
- Corners: `rounded-2xl` is the default for cards and panels on the site; `rounded-xl` for smaller cards and inputs; `rounded-3xl` for large feature panels and images. `Card` itself is `rounded-lg`.
- Soft shadow (`shadow-sm`), lifting on hover (`hover:-translate-y-1 hover:shadow-md`).

### Stat Block (`CardStatBlock`)
- A **white** card with a faint Pale Oak border, `rounded-lg`, `shadow-sm` and a hover lift.
- Large Asul figure animated with `CountUp`, a short label, and an optional `VerifiedBadge` source line under a Pale Oak rule.
- Stat blocks sit on light sections. Dark **Evergreen** is used for full-width section bands (hero, CTA, footer and feature bands), not for individual stat cards.

## 5. Layout Principles

### Spacing System
- Base unit: 8px (Tailwind spacing scale).
- Major sections use `py-24` as standard and `py-32` for emphasis (`py-16` for tighter bands).
- Tight internal spacing (16px–24px) within cards to group related content.

### Grid & Container
- Content containers are `max-w-6xl` (1152px) as standard; `max-w-7xl` (1280px) for wide sections. Centered with `mx-auto` and horizontal padding.
- Feature sections often use 2–3 column grids for stats and pillars.

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, solid fill | Page surface, text, Evergreen section bands |
| Resting (Level 1) | Pale Oak border + `shadow-sm` | Cards, stat blocks, form panels |
| Raised (Level 2) | `shadow-md`/`shadow-lg`, often with a hover lift | Hovered cards and buttons |
| Floating (Level 3) | `shadow-xl`/`shadow-2xl` or a soft custom Evergreen-tinted shadow, e.g. `shadow-[0_20px_50px_-15px_rgba(0,49,36,0.06)]` | Hero images, large feature panels, modals |

**Shadow Philosophy**: Contrast between Evergreen and Mint Cream does most of the work. Shadows are soft and low-opacity, tinted Evergreen where custom, and are used to add lift on hover. Avoid hard, dark shadows.

## 7. Do's and Don'ts

### Do
- Use Mint Cream (`#F2FBF6`) as the base foundation — it provides the fresh, optimistic tone.
- Reserve Asul strictly for headings and large display numbers.
- Use Tiger Orange exclusively for urgent, time-sensitive actions (deadlines).
- Maintain extreme contrast: Always use Evergreen text on Mint Cream backgrounds.

### Don't
- Don't use Tiger Orange for core institutional messaging or large background fills.
- Don't mix Asul and Chivo within the same paragraph.
- Don't use Mint Leaf for body text (fails contrast ratios).
- Don't use hard or dark drop shadows; keep them soft and low-opacity (see Section 6).

## 8. Responsive Behavior

### Breakpoints
- **Mobile (<768px)**: Single column. Headings scale down smoothly (e.g., H1 to 40px/text-4xl, H2 to 32px/text-3xl). Navigation collapses to a hamburger menu.
- **Tablet (768px - 1024px)**: 2-column grids for features and stat blocks.
- **Desktop (>1024px)**: Full multi-column layout, maximum container width. Hero sections scale to full height (100dvh).

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary Dark: Evergreen (`#003124`)
- Primary Light: Mint Cream (`#F2FBF6`)
- Action/Success: Mint Leaf (`#00BE93`)
- Accent/Urgency: Tiger Orange (`#F88404`)
- Support: Pale Oak (`#E1C9B3`)

### Example Component Prompts
- "Create a stat card using `CardStatBlock`: white card, Pale Oak border, rounded-lg, shadow-sm with hover lift. Large Asul figure in Evergreen with CountUp, a short Chivo label, and a VerifiedBadge source line."
- "Design a hero section with a Mint Cream (#F2FBF6) background. Tiger Orange Chivo eyebrow (text-xs, bold, tracking-widest). Headline in Asul 700 (#003124). Add a primary pill `Button` (Evergreen background, Mint Cream text)."
- "Build an alert banner using Tiger Orange (#F88404) as the background field, with Evergreen text. Use Chivo Medium 14px for the text."
