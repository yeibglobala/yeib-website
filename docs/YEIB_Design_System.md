# YEIB Investment Fund — Design System v2.0

## 1. Visual Theme & Atmosphere

YEIB's website radiates institutional authority blended with modern approachability. The entire page sits on a pale, mint-tinted background (`#F2FBF6`) that separates it from standard white finance sites. This deliberate choice creates a fresh, forward-looking feel, suited for a fund targeting youth and women-led MSMEs. The deep evergreen text (`#003124`) against this mint cream creates a high contrast ratio (13.59) that guarantees sharp readability while feeling natural and grounded.

The typography pairing is the system's secret weapon. Asul provides institutional weight and authority for display text, featuring elegant serifs and a confident presence. Chivo handles the body copy with crisp, modern sans-serif clarity, while General Sans adds a punchy, technical feel to metadata and tags. 

**Key Characteristics:**
- Fresh Mint Cream background (`#F2FBF6`) — a deliberate base that feels optimistic and clean.
- Typographic tension between authoritative Asul and hardworking Chivo/General Sans.
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
- **Tiger Orange Rules**: A field rather than an ink. Takes Evergreen type (or white in immaterial contexts). Never used for core institutional messaging.

## 3. Typography Rules

### Font Families
- **Primary Display (Asul)**: 700 weight. For headings and high-impact statements.
- **Primary Body (Chivo)**: 400, 500 weights. For standard reading and lead paragraphs.
- **Utility (General Sans)**: 600 weight. For eyebrows, tags, and small utility text.

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
| Eyebrow/Tags | General Sans | 12px (0.75rem)| 600 | +14% tracking |

### Principles
- **Asul carries authority. General Sans does the work.** The serif brings the institutional trust; the sans-serifs bring the modern operational efficiency.
- **No bold body text**: Use Medium (500) for emphasis in body copy, reserving heavy weights for Asul headings.
- **Eyebrow spacing**: Always apply wide tracking (+14%) to uppercase General Sans eyebrows for premium editorial feel.

## 4. Component Stylings

### Buttons
**Primary Dark**
- Background: `#003124` (Evergreen)
- Text: `#F2FBF6` (Mint Cream)
- Radius: Standard (e.g., 6px or 8px)
- Use: Main Call to Action ("Apply for funding")

**Ghost / Outline**
- Background: Transparent
- Text: `#003124` (Evergreen)
- Border: `1px solid #003124`
- Use: Secondary actions ("Read our approach")

**Text Link**
- Text: `#00BE93` (Mint Leaf)
- Decoration: Arrow suffix ("See the evidence →")

### Tags & Pills
- **Standard Tag**: Mint Cream fill, Evergreen text.
- **Alert Tag**: Tiger Orange fill/text.
- **Success Tag**: Mint Leaf fill/text.

### Cards & Containers
- Background: Mint Cream (`#F2FBF6`) or White.
- Text: Evergreen.
- Distinctive Component: The **Stat Block**. A dark Evergreen banded card used to display verified outcome metrics, with Mint Leaf dots for verification status.

## 5. Layout Principles

### Spacing System
- Base unit: 8px.
- Use generous padding (80px–120px) between major sections to allow the Mint Cream background to breathe.
- Tight internal spacing (16px–24px) within stat cards to group related metrics closely.

### Grid & Container
- Max content width: 1200px.
- Centered containers.
- Feature sections often use 2-3 column grids for stats and pillars.

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, solid fill | Standard page surface, text |
| Bordered (Level 1) | Subtle border (Pale Oak) | Dividers, subtle cards |
| Stat Block (Level 2)| Evergreen background | High-contrast visual anchor |

**Shadow Philosophy**: YEIB relies on high color contrast (Evergreen vs Mint Cream) rather than drop shadows to create hierarchy. Cards are defined by solid color blocks and borders rather than floating shadows, projecting institutional solidity.

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
- Don't use heavy drop shadows; rely on color blocking for depth.

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
- "Create a stat card on an Evergreen (#003124) background. The main number should be Asul 56px in white. The label should be Chivo 16px in Mint Cream. Include a verified eyebrow in General Sans 12px with wide tracking, using Mint Leaf."
- "Design a hero section with a Mint Cream (#F2FBF6) background. Headline in Asul 700 (#003124). Add a primary CTA button with Evergreen background and Mint Cream text."
- "Build an alert banner using Tiger Orange (#F88404) as the background field, with Evergreen text. Use Chivo Medium 14px for the text."
