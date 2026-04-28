# Portfolio Next

This workspace is a fresh rebuild of the portfolio using Next.js, Tailwind CSS, Framer Motion, and a Supabase-ready content structure.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## What’s Included

- Single-page portfolio layout with anchored sections
- Light and dark mode toggle with persistent preference
- Data-driven content schema in `src/data/portfolio.ts`
- Deep-linkable modal panels for projects and education items
- Framer Motion transitions for section and card reveals

## Content Workflow

The initial content is local and structured so it can later be replaced with Supabase-backed records without changing the page layout. The Supabase client package is installed and ready for the next content-layer step.

## Deployment

The app builds as a standard Next.js project and can be deployed to Vercel or a self-hosted environment after Supabase variables are configured.
