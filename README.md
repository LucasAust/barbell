# 🐓 Gamecock Barbell Club

**University of South Carolina's Competitive Powerlifting Club**

A brutalist, award-quality one-page website built with Next.js 14, Sanity CMS, and Framer Motion. Deployed free on Vercel.

---

## Features

- **Parallax hero** — fixed-background gamecock lifting effect with Framer Motion scroll transforms
- **Framer Motion** — staggered scroll reveals on every section
- **Sanity Studio** — embedded CMS at `/studio`; edit everything without code
- **Auto-archived events** — events older than 30 days automatically move to the archive  
- **Responsive CSS Grid** — fluid, brutalist layouts from 320px → 1440px
- **Fluid typography** — `clamp()` driven type scale across all viewpoints
- **Skeleton loaders** — pulsing placeholders during data fetch
- **ISR** — page rebuilds every 60s after content changes
- **Accessibility** — skip link, ARIA roles, focus rings, semantic HTML
- **USC design tokens** — Garnet `#73000A`, cream `#F0EBE1`, CSS variables throughout

---

## Stack & Cost

| Service | Plan | Cost |
|---|---|---|
| **Vercel** | Hobby (free) | $0 |
| **Sanity** | Free tier (3 users, 0.5M API req/mo) | $0 |
| **Total** | — | **$0/month** |

---

## Setup (5 minutes)

### 1. Create a Sanity project

```bash
npx sanity@latest init --env
```

Follow the prompts — **Create a new project**, name it `gamecock-barbell`, dataset `production`. This writes `.env.local` automatically.

Or manually create a project at [sanity.io/manage](https://sanity.io/manage) and fill in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Run locally

```bash
npm install
npm run dev
```

- **Website** → http://localhost:3000  
- **Sanity Studio (CMS)** → http://localhost:3000/studio

### 3. Seed initial content

1. Open `/studio` and log in
2. Click **Site Settings** → fill in tagline, about text, meeting info, dues, contacts
3. Add **Events**, **News & Updates**, **Officers**
4. Optionally add **PR Board** records
5. Toggle **"Show PR Board section"** in Site Settings to hide/show the PR table

### 4. Deploy to Vercel

Connect your repo at [vercel.com/new](https://vercel.com/new), then add these environment variables in the Vercel dashboard:

```
NEXT_PUBLIC_SANITY_PROJECT_ID  →  your project id
NEXT_PUBLIC_SANITY_DATASET     →  production
```

### 5. Allow your Vercel domain in Sanity CORS

[sanity.io/manage](https://sanity.io/manage) → your project → **API → CORS Origins** → add `https://your-site.vercel.app` with **Allow credentials** checked.

---

## Day-to-day editing

Visit `https://your-site.vercel.app/studio` to manage all content. The site revalidates every 60 seconds automatically.

| What to change | Where |
|---|---|
| Hero tagline | Site Settings → Tagline |
| About text + stats | Site Settings → About / Stats |
| Upcoming events | Events → New Event |
| News/Announcements | News & Updates → New |
| Officers | Officers → New Officer |
| PR records | PR Board → New PR Record |
| Toggle PR Board | Site Settings → Show PR Board |

**Events auto-archive 30 days after their date** — no manual work needed. They collapse into a "Past Events" section on the site.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                    # Home (Server Component — fetches all Sanity data)
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Design tokens + global CSS
│   └── studio/[[...tool]]/         # Embedded Sanity Studio
├── components/
│   ├── Navigation.tsx              # Sticky nav with scroll state & mobile menu
│   ├── Hero.tsx                    # Parallax hero section
│   ├── About.tsx                   # About + stats grid
│   ├── Events.tsx                  # Upcoming + archived events
│   ├── News.tsx                    # News & update cards
│   ├── Officers.tsx                # Officer grid with photos
│   ├── PRBoard.tsx                 # PR board table (optional)
│   ├── Join.tsx                    # Join section
│   ├── Footer.tsx                  # Site footer
│   ├── MotionUtils.tsx             # Framer Motion helpers (FadeIn, Stagger)
│   └── Skeletons.tsx               # Skeleton loader components
└── sanity/
    ├── schemas/                    # Content schemas
    ├── lib/client.ts               # Sanity client
    ├── lib/queries.ts              # GROQ queries
    └── types.ts                    # TypeScript types
```

---

*Built with Next.js 14, Sanity, Framer Motion, and Tailwind CSS.*

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
