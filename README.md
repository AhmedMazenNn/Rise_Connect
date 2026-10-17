# Rise and Connect

React/Vite marketing site for Rise and Connect, with Sanity-powered content management for services, site settings, and image/video testimonials.

## Run the website

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET=production` in `.env`.

## Run Sanity Studio

```bash
cd sanity
npm install
cp .env.example .env
npm run dev
```

Set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` in `sanity/.env`.

Testimonials support written text, image uploads, uploaded video files, and external video URLs. Publish a testimonial and leave `Visible on website` enabled for it to appear on the site.

## Project structure

- `src/` — React website
- `src/sanity/schemaTypes/` — shared Sanity schemas
- `src/content/defaultContent.ts` — local fallback content
- `sanity/` — Sanity Studio configuration
- `docs/sanity-setup.md` — Sanity and Slack integration notes

## Branches

- `main` — stable/default branch
- `dev` — active development branch
