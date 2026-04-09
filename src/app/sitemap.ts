import type { MetadataRoute } from "next";
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

  return [...staticPaths, ...propertyPaths];
}
