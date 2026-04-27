const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_STUDIO_URL = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/studio";
const SANITY_READ_TOKEN = process.env.SANITY_API_READ_TOKEN;
const SANITY_TIMEOUT_MS = 8000;

type SanityPrimitive = string | number | boolean | null;
type SanityParamValue = SanityPrimitive | SanityPrimitive[];

interface SanityImageAsset {
  _id?: string;
  url?: string;
  metadata?: {
    dimensions?: {
      width?: number;
      height?: number;
    };
  };
}

export interface SanityImage {
  asset?: SanityImageAsset;
  alt?: string;
  caption?: string;
}

export interface PortableTextSpan {
  _type: "span";
  _key?: string;
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  children?: PortableTextSpan[];
  listItem?: "bullet" | "number";
  level?: number;
  asset?: SanityImageAsset;
  alt?: string;
  caption?: string;
  code?: string;
  language?: string;
}

export function isSanityConfigured() {
  return Boolean(SANITY_PROJECT_ID && SANITY_DATASET);
}

export function getSanityStudioUrl() {
  return SANITY_STUDIO_URL;
}

function getSanityApiOrigin(useCdn: boolean) {
  if (!isSanityConfigured()) {
    return null;
  }

  const host = useCdn ? "apicdn.sanity.io" : "api.sanity.io";
  return `https://${SANITY_PROJECT_ID}.${host}/v${SANITY_API_VERSION}`;
}

export async function sanityFetch<T>({
  query,
  params,
  tags,
  revalidate = 300,
}: {
  query: string;
  params?: Record<string, SanityParamValue | undefined>;
  tags?: string[];
  revalidate?: number;
}): Promise<T | null> {
  const apiOrigin = getSanityApiOrigin(!SANITY_READ_TOKEN);

  if (!apiOrigin) {
    return null;
  }

  const searchParams = new URLSearchParams({ query });

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(`$${key}`, typeof value === "string" ? value : JSON.stringify(value));
    }
  });

  const response = await fetch(`${apiOrigin}/data/query/${SANITY_DATASET}?${searchParams.toString()}`, {
    headers: SANITY_READ_TOKEN
      ? {
          Authorization: `Bearer ${SANITY_READ_TOKEN}`,
        }
      : undefined,
    next: {
      revalidate,
      tags,
    },
    signal: AbortSignal.timeout(SANITY_TIMEOUT_MS),
  }).catch((error) => {
    if (error instanceof Error && error.name === "TimeoutError") {
      return null;
    }

    throw error;
  });

  if (!response) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Sanity query failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { result?: T };
  return payload.result ?? null;
}

export function sanityImageUrl(
  image?: SanityImage,
  options?: { width?: number; height?: number; fit?: "crop" | "max"; auto?: "format" },
) {
  if (!image?.asset?.url) {
    return null;
  }

  const url = new URL(image.asset.url);

  if (options?.width) {
    url.searchParams.set("w", `${options.width}`);
  }

  if (options?.height) {
    url.searchParams.set("h", `${options.height}`);
  }

  if (options?.fit) {
    url.searchParams.set("fit", options.fit);
  }

  if (options?.auto) {
    url.searchParams.set("auto", options.auto);
  }

  return url.toString();
}
