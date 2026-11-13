# MUN26 Project Rules

## Scope
- Current task is the RNS MUN 2026 homepage only.
- Do not build or redesign inner pages unless explicitly requested.
- Preserve existing routes and exact navigation labels/order:
  Home, Registration, Venue, Contact, Team, Equity Policy.

## Design
- Follow design.md as the source of truth (not yet supplied in the repo — TODO).
- Use Modern Diplomatic Editorialism: warm paper, diplomatic blue, navy, ivory and restrained gold.
- Prefer editorial layouts and whitespace over generic card grids.
- Glass is a restrained material, not the entire design identity.
- Preserve official logos and institutional identity.

## Content integrity
- Never invent event facts, counts, deadlines, prices, venue details, sponsors, contacts or affiliations.
- Use only verified content.
- Mark unknown details as TODO and ask for confirmation.

## Engineering
- Inspect the existing stack before changing it.
- Reuse existing dependencies and components.
- Do not add dependencies without explaining why.
- Keep content data-driven and components reusable.
- Do not replace existing infrastructure without approval.

## Motion
- Motion must have a purpose.
- Prefer transform and opacity.
- Use GSAP ScrollTrigger only for complex scroll choreography.
- Never hijack scrolling.
- Respect prefers-reduced-motion.
- Do not animate every element.

## Workflow
- Build one approved phase at a time.
- Before editing, list intended files and changes.
- After editing, run the app and checks.
- Use Playwright MCP for browser verification when available.
- Report what changed, what was tested and what remains.
- Stop for approval before moving to the next phase.
