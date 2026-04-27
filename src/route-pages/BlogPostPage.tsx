import { Clock3, MoveRight } from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import InternalLinksSection from "@/components/InternalLinksSection";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { Link } from "@/compat/react-router-dom";
import { type BlogPost, getAuthorProfileUrl, getBlogPostCoverImage, getBlogPostUrl } from "@/lib/blog";
import { sanityImageUrl } from "@/lib/sanity";

function formatDate(value?: string) {
  if (!value) {
    return "Recently published";
  }

  return format(new Date(value), "dd MMM yyyy");
}

export default function BlogPostPage({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  const coverImage = getBlogPostCoverImage(post, 1800);
  const authorImage = sanityImageUrl(post.author?.image, { width: 240, height: 240, fit: "crop", auto: "format" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <AnimatedSection>
        <section className="bg-primary px-4 pb-14 pt-16 text-primary-foreground sm:px-6 lg:px-12 lg:pb-20 lg:pt-24">
          <div className="mx-auto max-w-5xl">
            <Link to="/blog" className="text-sm font-semibold uppercase tracking-[0.24em] text-lime transition-colors hover:text-white">
              Journal
            </Link>
            <div className="mt-5 flex flex-wrap gap-2">
              {(post.categoryNames.length ? post.categoryNames : ["Workspace Insights"]).map((category) => (
                <span key={category} className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
                  {category}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-4xl font-serif leading-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-primary-foreground/78 sm:text-lg">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-primary-foreground/76">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                {post.readingTime} min read
              </span>
              <span>Curated by {post.author?.name || "EverySpaces Editorial Team"}</span>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.06}>
        <section className="px-4 pb-8 sm:px-6 lg:px-12">
          <div className="mx-auto -mt-10 max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
            {coverImage ? (
              <img src={coverImage} alt={post.coverImage?.alt || post.title} className="h-[320px] w-full object-cover sm:h-[460px]" />
            ) : (
              <div className="flex h-[320px] items-end bg-[linear-gradient(135deg,#0b5467_0%,#123524_56%,#eff3d4_100%)] p-8 text-primary-foreground sm:h-[460px]">
                <p className="max-w-3xl text-3xl font-serif sm:text-4xl">{post.title}</p>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.08}>
        <section className="px-4 py-6 sm:px-6 lg:px-12 lg:py-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="rounded-[2rem] border border-border bg-card px-6 py-8 shadow-sm sm:px-8 sm:py-10">
              <PortableTextRenderer value={post.body} className="max-w-none" />

              {post.seo.faqs.length ? (
                <div className="mt-10 rounded-[1.75rem] bg-secondary/45 px-5 py-6 sm:px-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary-foreground">FAQs</p>
                  <div className="mt-5 space-y-4">
                    {post.seo.faqs.map((faq) => (
                      <div key={faq.question} className="rounded-[1.25rem] bg-background px-5 py-4">
                        <h3 className="text-lg font-serif text-foreground">{faq.question}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Brand Note</p>
                <h2 className="mt-4 text-2xl font-serif text-foreground">Every article supports the brand story, not just rankings.</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  This journal is designed to strengthen EverySpaces as a trusted advisor for office search, workspace strategy, and leasing decisions across high-intent commercial areas.
                </p>
              </div>

              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Curated By</p>
                <div className="mt-5 flex items-start gap-4">
                  {authorImage ? (
                    <img src={authorImage} alt={post.author?.name || "EverySpaces Editorial Team"} className="h-16 w-16 rounded-2xl object-cover" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-lg font-semibold text-secondary-foreground">
                      {(post.author?.name || "ES").slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-serif text-foreground">{post.author?.name || "EverySpaces Editorial Team"}</h3>
                    <p className="mt-1 text-sm font-medium text-foreground/75">{post.author?.role || "Workspace Research Desk"}</p>
                    {post.author?.bio ? <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.author.bio}</p> : null}
                    <a href={getAuthorProfileUrl(post.author)} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-accent underline-offset-4">
                      Brand profile
                      <MoveRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Commercial Paths</p>
                <div className="mt-5 space-y-3">
                  <Link to="/listings" className="block rounded-[1.25rem] bg-secondary/40 px-4 py-4 text-sm leading-6 text-foreground transition-colors hover:bg-secondary/70">
                    Browse current office listings
                  </Link>
                  <Link to="/areas-we-serve" className="block rounded-[1.25rem] bg-secondary/40 px-4 py-4 text-sm leading-6 text-foreground transition-colors hover:bg-secondary/70">
                    Explore covered cities and areas
                  </Link>
                  <Link to="/contact" className="block rounded-[1.25rem] bg-secondary/40 px-4 py-4 text-sm leading-6 text-foreground transition-colors hover:bg-secondary/70">
                    Request a tailored workspace shortlist
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </AnimatedSection>

      {relatedPosts.length ? (
        <AnimatedSection delay={0.1}>
          <section className="px-4 py-10 sm:px-6 lg:px-12 lg:py-14">
            <div className="mx-auto max-w-6xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Related Reads</p>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} to={getBlogPostUrl(related.slug)} className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                    {getBlogPostCoverImage(related, 900) ? (
                      <img src={getBlogPostCoverImage(related, 900)!} alt={related.coverImage?.alt || related.title} className="h-48 w-full object-cover" />
                    ) : (
                      <div className="h-48 bg-[linear-gradient(135deg,#eff3d4_0%,#d7e8c1_35%,#f79a49_100%)]" />
                    )}
                    <div className="space-y-3 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{related.categoryNames[0] || "Insights"}</p>
                      <h3 className="text-2xl font-serif leading-tight text-foreground">{related.title}</h3>
                      <p className="text-sm leading-7 text-muted-foreground">{related.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={0.12}>
        <InternalLinksSection
          eyebrow="Continue Exploring"
          title="Move from insight to action"
          description="Keep readers engaged with the most natural next steps after consuming a workspace strategy article."
          links={[
            {
              href: "/blog",
              title: "Back to the Journal",
              description: "Discover more branded editorial content across locations, leasing, and workplace strategy.",
            },
            {
              href: "/listings",
              title: "View Available Workspaces",
              description: "Compare live inventory after reading about demand, budgets, and fit.",
            },
            {
              href: "/about",
              title: "Learn About EverySpaces",
              description: "See the people and positioning behind the content you just read.",
            },
            {
              href: "/contact",
              title: "Start a Workspace Brief",
              description: "Talk to EverySpaces if you want help translating research into a shortlist.",
            },
          ]}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.14}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
}
