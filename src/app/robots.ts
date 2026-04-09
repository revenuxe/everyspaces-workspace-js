import { absoluteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/", crawlDelay: 1 },
      { userAgent: "Bingbot", allow: "/", crawlDelay: 1 },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/thank-you"] },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
