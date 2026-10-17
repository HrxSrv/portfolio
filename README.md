# Harshit Srivastava — Portfolio

Personal site built with Next.js (App Router), Tailwind CSS v4 and the Geist font family. The design follows Vercel Geist with Apple HIG spacing and type, in light and dark themes.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Edit content

Everything on the site comes from `content/site.ts`:

- `site`: name, headline, intro, links, and an optional `resume` path (put the PDF in `public/` and set `resume: "/resume.pdf"`)
- `projects`: cards on the homepage and the case-study pages at `/projects/<slug>`
- `experience`, `hackathons`, `achievements`, `education`, `skills`
- `posts`: blog entries (links to Medium, dev.to, Zenn, etc.). The blog shows an empty state until you add one.

Also set `site.url` to your real domain for correct metadata.

## Structure

```
app/
  layout.tsx            fonts, theme provider, nav, footer
  page.tsx              home: hero, work, experience, hackathons, education, blog, contact
  about/page.tsx
  blog/page.tsx
  projects/[slug]/      case studies (statically generated)
components/             nav (with mobile menu), theme toggle, project grid and cover, UI pieces
content/site.ts         all copy and data
```

## Deploy

Push to GitHub and import the repo on Vercel; no configuration is needed.
