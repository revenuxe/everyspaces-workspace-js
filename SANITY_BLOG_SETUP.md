# Sanity Blog Setup Plan

## Goal
Use Sanity as the editorial CRM for the EverySpaces blog while keeping the frontend in Next.js App Router with strong SEO, structured data, and branded article experiences.

## What is already implemented
- A Sanity-powered blog data layer that reads project settings from environment variables.
- A branded `/blog` landing page and dynamic `/blog/[slug]` article pages.
- Article metadata, canonical support, Open Graph, Twitter card support, breadcrumbs, brand schema, person schema, article schema, and FAQ schema.
- Sitemap support for blog routes and a footer blog link.
- Graceful empty-state behavior when Sanity env values or posts are missing.

## Environment variables
Add these to your local `.env`:

```env
NEXT_PUBLIC_SITE_URL=https://www.everyspaces.com
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-project.sanity.studio
SANITY_API_READ_TOKEN=optional_read_token
```

## Recommended Sanity content model
Create these document types in Sanity Studio:

1. `post`
Fields:
`title`, `slug`, `excerpt`, `body`, `mainImage`, `publishedAt`, `featured`, `estimatedReadingTime`, `categories`, `author`, `seo`

2. `author`
Fields:
`name`, `slug`, `role`, `bio`, `image`

3. `category`
Fields:
`title`, `slug`

4. `seo`
Fields:
`metaTitle`, `metaDescription`, `keywords`, `canonicalUrl`, `noIndex`, `ogImage`, `faqs`

5. `faqItem`
Fields:
`question`, `answer`

## Recommended editorial workflow
1. Draft articles in Sanity with a tight excerpt and a well-structured body.
2. Fill the SEO object on every post.
3. Assign one primary category and one author.
4. Mark one post as `featured` for the blog landing page.
5. Use FAQ blocks on posts targeting comparison or “how to” keywords.

## SEO checklist for every blog post
1. Unique title focused on a real search intent.
2. Meta description written for click-through, not keyword stuffing.
3. Clean slug with the target phrase.
4. Cover image with alt text.
5. One H1 and strong H2/H3 hierarchy in body content.
6. Internal links to listings, city pages, and contact paths.
7. FAQs where helpful.
8. Category taxonomy kept clean and reusable.

## Studio next step
The frontend is ready, but a full local Sanity Studio still needs the Sanity packages installed and schema/config files added. If you want, the next pass can scaffold:

- `sanity.config.ts`
- `sanity.cli.ts`
- `sanity/schemaTypes/*`
- A local `/studio` route or separate Sanity workspace

## Suggested content clusters
- Bangalore office space guides
- Hyderabad coworking comparisons
- Managed office vs coworking explainers
- Office leasing process guides
- Workspace cost benchmarks
- Area-by-area neighborhood pages that support commercial conversion
