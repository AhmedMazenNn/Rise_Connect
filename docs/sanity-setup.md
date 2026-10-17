# Sanity setup

The site reads one `siteSettings` document, one `homepageContent` document, plus any published `service` and `testimonial` documents from the `production` dataset.

## Connect the project

1. Create a Sanity project and dataset.
2. Copy the project ID into `src/sanity/sanity.config.ts` and `.env` as `VITE_SANITY_PROJECT_ID`.
3. Set `VITE_SANITY_DATASET=production`.
4. Add the deployed website origin under API → CORS origins in Sanity.
5. Run a Sanity Studio and use the schema files in `src/sanity/schemaTypes`.

## Testimonials

Create a testimonial and select Text, Image, or Video. Image testimonials accept a hosted image asset. Video testimonials accept either an uploaded video file or a YouTube/Vimeo/direct video URL, with an optional thumbnail. Use `Featured` and `Display order` to control presentation. Only published documents with `Visible on website` enabled are queried.

## Slack form

Add the future Cloudflare Worker URL to `Slack Cloudflare Worker endpoint` in Site settings. The browser sends JSON to that endpoint; the Worker should validate the request and forward it to Slack using a secret webhook. The legacy incoming webhook field is retained for local testing only.

## Client contact data

The default business contact data is already seeded in `src/content/defaultContent.ts` and can be overridden from Site settings:

- 30 N Gould St Ste R
- Sheridan, WY 82801
- +13073028248
