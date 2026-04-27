import { cache } from "react";
import { absoluteUrl, defaultMetadata } from "@/lib/seo";
import {
  type PortableTextBlock,
  type SanityImage,
  getSanityStudioUrl,
  isSanityConfigured,
  sanityFetch,
  sanityImageUrl,
} from "@/lib/sanity";

export interface BlogAuthor {
  name: string;
  slug?: string;
  role?: string;
  bio?: string;
  image?: SanityImage;
}

export interface BlogCategory {
  title: string;
  slug: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: PortableTextBlock[];
  coverImage?: SanityImage;
  publishedAt?: string;
  updatedAt?: string;
  featured?: boolean;
  readingTime: number;
  categoryNames: string[];
  categories: BlogCategory[];
  author?: BlogAuthor;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
    canonicalUrl?: string;
    noIndex?: boolean;
    ogImage?: SanityImage;
    faqs: BlogFaq[];
  };
}

export interface BlogLandingData {
  posts: BlogPost[];
  featuredPost?: BlogPost;
  latestPosts: BlogPost[];
  categories: BlogCategory[];
  studioUrl: string;
  isConfigured: boolean;
}

type RawBlogPost = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  body?: PortableTextBlock[];
  mainImage?: SanityImage;
  publishedAt?: string;
  _updatedAt?: string;
  featured?: boolean;
  estimatedReadingTime?: number;
  categories?: BlogCategory[];
  author?: BlogAuthor;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
    noIndex?: boolean;
    ogImage?: SanityImage;
    faqs?: BlogFaq[];
  };
};

const postProjection = `{
  _id,
  title,
  slug,
  excerpt,
  body,
  "mainImage": mainImage{
    alt,
    caption,
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  },
  publishedAt,
  _updatedAt,
  featured,
  estimatedReadingTime,
  "categories": categories[]->{
    title,
    "slug": slug.current
  },
  "author": author->{
    name,
    "slug": slug.current,
    role,
    bio,
    "image": image{
      alt,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  },
  seo{
    metaTitle,
    metaDescription,
    keywords,
    canonicalUrl,
    noIndex,
    "ogImage": ogImage{
      alt,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    faqs[]{
      question,
      answer
    }
  }
}`;

function estimateReadingTime(excerpt: string, body: PortableTextBlock[]) {
  const blockWords = body
    .flatMap((block) => block.children || [])
    .map((child) => child.text || "")
    .join(" ");

  const totalWords = `${excerpt} ${blockWords}`.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(totalWords / 220));
}

function normalizePost(post: RawBlogPost): BlogPost | null {
  if (!post?.title || !post?.slug?.current) {
    return null;
  }

  const body = Array.isArray(post.body) ? post.body : [];
  const excerpt =
    post.excerpt?.trim() || "EverySpaces editorial insights on office space, coworking, and workplace strategy.";
  const categories = (post.categories || []).filter((category) => category?.title && category?.slug);
  const readingTime = post.estimatedReadingTime || estimateReadingTime(excerpt, body);

  return {
    _id: post._id,
    title: post.title,
    slug: post.slug.current,
    excerpt,
    body,
    coverImage: post.mainImage,
    publishedAt: post.publishedAt,
    updatedAt: post._updatedAt,
    featured: Boolean(post.featured),
    readingTime,
    categoryNames: categories.map((category) => category.title),
    categories,
    author: post.author?.name ? post.author : undefined,
    seo: {
      metaTitle: post.seo?.metaTitle,
      metaDescription: post.seo?.metaDescription,
      keywords: post.seo?.keywords || [],
      canonicalUrl: post.seo?.canonicalUrl,
      noIndex: Boolean(post.seo?.noIndex),
      ogImage: post.seo?.ogImage,
      faqs: (post.seo?.faqs || []).filter((faq) => faq?.question && faq?.answer),
    },
  };
}

function sortCategories(posts: BlogPost[]) {
  const categoryMap = new Map<string, BlogCategory>();

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      if (!categoryMap.has(category.slug)) {
        categoryMap.set(category.slug, category);
      }
    });
  });

  return Array.from(categoryMap.values()).sort((left, right) => left.title.localeCompare(right.title));
}

export function getBlogPostUrl(slug: string) {
  return `/blog/${slug}`;
}

export function getBlogPostAbsoluteUrl(slug: string) {
  return absoluteUrl(getBlogPostUrl(slug));
}

export function getBlogPostCoverImage(post?: BlogPost, width = 1600) {
  return sanityImageUrl(post?.seo.ogImage || post?.coverImage, { width, auto: "format", fit: "max" });
}

const getAllPosts = cache(async () => {
  if (!isSanityConfigured()) {
    return [] as BlogPost[];
  }

  const query = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(featured desc, coalesce(publishedAt, _createdAt) desc) ${postProjection}`;
  const result = await sanityFetch<RawBlogPost[]>({ query, tags: ["blog", "sanity"], revalidate: 300 });

  return (result || []).map(normalizePost).filter(Boolean) as BlogPost[];
});

export const getBlogLandingData = cache(async (): Promise<BlogLandingData> => {
  const posts = await getAllPosts();
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const latestPosts = featuredPost ? posts.filter((post) => post.slug !== featuredPost.slug) : posts;

  return {
    posts,
    featuredPost,
    latestPosts,
    categories: sortCategories(posts),
    studioUrl: getSanityStudioUrl(),
    isConfigured: isSanityConfigured(),
  };
});

export const getBlogPostBySlug = cache(async (slug: string) => {
  if (!isSanityConfigured()) {
    return null;
  }

  const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] ${postProjection}`;
  const result = await sanityFetch<RawBlogPost>({
    query,
    params: { slug },
    tags: [`blog:${slug}`, "blog"],
    revalidate: 300,
  });
  const post = result ? normalizePost(result) : null;

  if (!post) {
    return null;
  }

  const categorySlugs = post.categories.map((category) => category.slug);
  const relatedQuery = `*[_type == "post" && slug.current != $slug && defined(slug.current) && !(_id in path("drafts.**")) && count((categories[]->slug.current)[@ in $categorySlugs]) > 0] | order(coalesce(publishedAt, _createdAt) desc)[0...3] ${postProjection}`;
  const relatedResult = await sanityFetch<RawBlogPost[]>({
    query: relatedQuery,
    params: { slug, categorySlugs },
    tags: [`blog:${slug}`, "blog"],
    revalidate: 300,
  });

  return {
    post,
    relatedPosts: (relatedResult || []).map(normalizePost).filter(Boolean) as BlogPost[],
  };
});

export const getAllBlogSlugs = cache(async () => {
  if (!isSanityConfigured()) {
    return [] as string[];
  }

  const query = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current`;
  const result = await sanityFetch<string[]>({ query, tags: ["blog", "sanity"], revalidate: 300 });
  return (result || []).filter(Boolean);
});

export function getBlogMetadata(post: BlogPost) {
  const canonicalPath = getBlogPostUrl(post.slug);
  const ogImage = getBlogPostCoverImage(post) || defaultMetadata.ogImage;

  return {
    title: post.seo.metaTitle || `${post.title} | EverySpaces Journal`,
    description: post.seo.metaDescription || post.excerpt,
    path: post.seo.canonicalUrl || canonicalPath,
    keywords: post.seo.keywords.length ? post.seo.keywords.join(", ") : undefined,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: post.author?.name ? [post.author.name] : ["EverySpaces Editorial Team"],
    section: post.categories[0]?.title || "Workspace Insights",
    tags: post.categoryNames,
    image: ogImage,
    noIndex: post.seo.noIndex,
  };
}

export function getAuthorProfileUrl(author?: BlogAuthor) {
  if (!author?.slug) {
    return absoluteUrl("/about");
  }

  return absoluteUrl(`/about#${author.slug}`);
}
