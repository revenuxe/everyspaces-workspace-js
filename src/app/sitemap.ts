import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog";
import { getActivePropertySlugs } from "@/lib/server-data";
import { absoluteUrl, getStaticPublicPaths } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: MetadataRoute.Sitemap = getStaticPublicPaths().map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
  const propertyPaths = (await getActivePropertySlugs()).map((property: any) => ({
    url: absoluteUrl(`/listings/${property.slug}`),
    lastModified: property.updated_at ? new Date(property.updated_at) : undefined,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const blogPaths = (await getAllBlogSlugs()).map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticPaths, ...propertyPaths, ...blogPaths];
}
