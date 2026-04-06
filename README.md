# Prabhu Barik — Personal Portfolio

Personal portfolio site. Built with Vite + React + TypeScript + Tailwind CSS v3.

**Live at:** _add your hosted URL here_

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| Smooth scroll | Lenis v1 |
| Icons | Lucide React |
| Fonts | Space Grotesk (headings) · Inter (body) · DM Sans (loader) |

---

## Project Structure

```
src/
├── components/
│   ├── Loader.tsx          # Particle assembly intro animation
│   ├── CustomCursor.tsx    # Custom cursor (dot + spring ring)
│   ├── Navbar.tsx
│   ├── Hero.tsx            # Hero section
│   ├── HeroVisual.tsx      # Floating bento cards (right side of hero)
│   ├── About.tsx           # Who I am + timeline
│   ├── Projects.tsx        # Expandable project cards
│   ├── Thinking.tsx        # Mental models (tabbed)
│   ├── Experiments.tsx     # Active experiments grid
│   ├── LifeSystem.tsx      # Daily schedule + principles
│   ├── CTA.tsx             # Contact section
│   ├── Footer.tsx
│   ├── ScrambleText.tsx    # Smooth word-reveal on scroll
│   ├── MagneticButton.tsx  # Cursor-magnetic button wrapper
│   ├── AnimatedCounter.tsx # Count-up on viewport entry
│   └── SectionDivider.tsx
├── App.tsx                 # Root — Lenis init, Loader gate
├── main.tsx                # Entry — scroll reset, hash strip
└── index.css               # Tailwind + design tokens, glass, orbs, keyframes
```

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build -> dist/
npm run preview   # preview production build locally
```

---

## Key Decisions (read before touching things)

**Tailwind v3, not v4** — v4 broke glass morphism and layout. Do not upgrade.

**Overflow isolation for glass cards** — orbs must always be inside their own `overflow: hidden` wrapper div, never the same element as a glass card. `overflow: hidden` kills `backdrop-filter` on descendants.

**CSS keyframes for card floats** — Hero bento cards use `.float-a` through `.float-e` CSS classes (GPU compositor). Do not replace with Framer Motion `repeat: Infinity` — it runs on the JS thread and causes jank.

**Lenis** — initialised in `App.tsx` after loader exits. Destroyed on unmount.

**Scroll reset** — `main.tsx` strips the URL hash and calls `scrollTo(0,0)` before React mounts so reloads always start at top.

**Loader particle sampling** — each letter rendered individually on a cleared canvas (`DM Sans 400, 190px`, 2200×320). Full canvas scanned at 1px step, alpha threshold 55. This correctly captures side bearings and diagonal strokes on A and U.

**Custom cursor** — dot: RAF loop + direct `motionValue.set()` (zero lag). Ring: `useSpring({ stiffness:500, damping:35, mass:0.4 })`. Never apply spring to the dot.

---

## Content Updates

| What | File |
|---|---|
| Email address | `src/components/CTA.tsx` — two `href="mailto:..."` |
| Hero stats | `src/components/Hero.tsx` → `stats` array |
| Bento cards (right hero) | `src/components/HeroVisual.tsx` |
| About text + timeline | `src/components/About.tsx` |
| Projects | `src/components/Projects.tsx` |
| Experiments | `src/components/Experiments.tsx` |
| Daily schedule + principles | `src/components/LifeSystem.tsx` |
| Currently reading | `src/components/HeroVisual.tsx` → last card |
