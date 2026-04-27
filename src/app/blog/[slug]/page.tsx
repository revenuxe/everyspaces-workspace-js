import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/route-pages/BlogPostPage";
import { RouteShell } from "@/components/RouteShell";
import { JsonLd } from "@/components/JsonLd";
import {
  absoluteUrl,
  articleSchema,
  brandSchema,
  breadcrumbSchema,
  buildArticleMetadata,
  faqSchema,
  personSchema,
} from "@/lib/seo";
import {
  getAllBlogSlugs,
  getAuthorProfileUrl,
  getBlogMetadata,
  getBlogPostAbsoluteUrl,
  getBlogPostBySlug,
  getBlogPostCoverImage,
  getBlogPostUrl,
} from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogPostBySlug(slug);

  if (!result?.post) {
    return buildArticleMetadata({
      title: "Article Not Found | EverySpaces Journal",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildArticleMetadata(getBlogMetadata(result.post));
}

export default async function BlogPostRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getBlogPostBySlug(slug);

  if (!result?.post) {
    notFound();
  }

  const post = result.post;
  const postUrl = getBlogPostAbsoluteUrl(post.slug);

  return (
    <>
      <RouteShell pathname={getBlogPostUrl(post.slug)} params={{ slug: post.slug }}>
        <BlogPostPage post={post} relatedPosts={result.relatedPosts} />
      </RouteShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Blog", url: absoluteUrl("/blog") },
            { name: post.title, url: postUrl },
          ]),
          brandSchema(),
          articleSchema({
            headline: post.title,
            description: post.seo.metaDescription || post.excerpt,
            url: postUrl,
            image: getBlogPostCoverImage(post) || undefined,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            authorName: post.author?.name || "EverySpaces Editorial Team",
            authorUrl: getAuthorProfileUrl(post.author),
            keywords: post.seo.keywords,
            section: post.categories[0]?.title,
          }),
          personSchema({
            name: post.author?.name || "EverySpaces Editorial Team",
            url: getAuthorProfileUrl(post.author),
            description: post.author?.bio || "Editorial team at EverySpaces covering office space, coworking, and workspace strategy.",
            image: getBlogPostCoverImage(post) || undefined,
            jobTitle: post.author?.role || "Workspace Research Desk",
          }),
          ...(post.seo.faqs.length ? [faqSchema(post.seo.faqs)] : []),
        ]}
      />
    </>
  );
}
