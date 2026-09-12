import type { Metadata } from "next";
import BlogPage from "@/route-pages/BlogPage";
import { RouteShell } from "@/components/RouteShell";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata, collectionPageSchema } from "@/lib/seo";
import { getBlogLandingData, getBlogPostAbsoluteUrl } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "Numunix Journal | Workspace Strategy, Coworking Guides & Office Market Insights",
  description:
    "Read branded editorial content from Numunix covering coworking, managed offices, leasing strategy, city guides, workplace trends, and commercial real estate insights.",
  path: "/blog",
  keywords:
    "Numunix blog, office space blog, coworking guides, managed office insights, workspace strategy, leasing advice, Bangalore office market, Bengaluru coworking",
});

export default async function BlogRoute() {
  const data = await getBlogLandingData();

  return (
    <>
      <RouteShell pathname="/blog">
        <BlogPage data={data} />
      </RouteShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", url: absoluteUrl("/") }, { name: "Blog", url: absoluteUrl("/blog") }]),
          collectionPageSchema({
            name: "Numunix Journal",
            description: "Editorial content and blog articles from Numunix about office space, coworking, and workplace strategy.",
            url: absoluteUrl("/blog"),
            items: data.posts.slice(0, 12).map((post) => ({
              name: post.title,
              url: getBlogPostAbsoluteUrl(post.slug),
            })),
          }),
        ]}
      />
    </>
  );
}
