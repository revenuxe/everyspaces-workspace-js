# Numunix

Workspace consulting website built with Next.js App Router.

## Brand and deployment

- Production website: https://www.numunix.com
- Contact email: numunix@gmail.com
- Set NEXT_PUBLIC_SITE_URL=https://www.numunix.com in the hosting environment as well as local development. This controls canonical URLs, social metadata, structured data, robots.txt, and the sitemap.
- Social links are omitted until the official profiles are supplied.
- The keepalive workflow defaults to the production health endpoint. Set the optional NUMUNIX_KEEPALIVE_URL repository secret to override it.
- Legacy blog and logo paths permanently redirect to their current equivalents. Redirecting traffic from the previous domain also requires keeping that domain connected in the hosting provider.
- Legacy branding in database listing display fields is normalized on read; database records, property slugs, and image URLs are not rewritten.
