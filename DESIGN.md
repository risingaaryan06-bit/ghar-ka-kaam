# Design Brief: Ghar Ka Kaam

## Purpose & Tone
Modern construction labor marketplace connecting homeowners with skilled workers. Trustworthy, action-oriented, professional with construction-industry boldness.

## Differentiation
Bold construction yellow (#FDB913) as primary action driver paired with orange accents. Dark charcoal text on white surfaces, card-based UI, construction-worker photography and tool imagery throughout.

## Color Palette

| Name | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| Primary Yellow | 0.75 0.16 80 | #FDB913 | Primary CTA buttons, highlights |
| Secondary Orange | 0.58 0.18 40 | #FF6B35 | Secondary actions, skill tags, badges |
| Charcoal | 0.15 0.01 266 | #1F2937 | Text, foreground elements |
| White | 0.98 0 0 | #FAFAFA | Background, cards |
| Muted Grey | 0.92 0.02 268 | #ECECF1 | Card sections, dividers |
| Border | 0.88 0.02 268 | #E5E7EB | Subtle borders |

## Typography
- **Display**: Plus Jakarta Sans (geometric, bold, modern) — headlines, hero text
- **Body**: Satoshi (clean, readable) — content, descriptions, metadata
- **Mono**: JetBrains Mono — code/data display

## Elevation & Depth
Cards use `shadow-md` (standard), elevate to `shadow-lg` on hover. Header has yellow bottom border accent. Layered background: white cards on muted grey section backgrounds.

## Structural Zones

| Zone | Treatment | Example |
|------|-----------|---------|
| Header | Yellow bottom border, white bg, navigation | Logo + nav links + user menu |
| Hero | Full-width construction site image with text overlay | "Find skilled workers near you" |
| Job Grid | White cards on muted grey background | Job cards with skill, location, budget |
| CTA Section | Yellow background with white text | "Post Your Job Now" |
| Footer | Dark bg, contact info (yellow for phone) | Contact details & links |

## Spacing & Rhythm
Mobile-first: `gap-4` between cards on mobile, `gap-6` on tablet+. Cards: `p-5` internal padding. Buttons: `px-5 py-3`, touch-friendly for mobile (min 44px height).

## Component Patterns
- **Cards**: Elevated with border, yellow accent bar on left (for job type indicator)
- **Buttons**: Solid primary (yellow), secondary (orange), or ghost with border
- **Tags**: Orange background with white text for skills/categories
- **Input Fields**: Light grey border, focus ring in primary yellow
- **Hero Images**: Construction site, workers, tools — semi-transparent overlay for text readability

## Motion & Animation
Smooth transitions on all interactive elements (`transition-smooth`: 0.3s cubic-bezier). Card hover: `shadow-md` → `shadow-lg`. Button focus: ring-2 in primary yellow.

## Constraints
- No gradients except construction gradient (yellow → orange) on special sections
- Typography: max 2 font families used in any single view
- Icon color: match text color or use primary yellow for action icons
- No dark mode in MVP (light theme only)

## Signature Detail
Yellow construction accent bar (4px) on the left edge of job cards, matching the work category icon color. Reinforces the construction theme on every job listing.
