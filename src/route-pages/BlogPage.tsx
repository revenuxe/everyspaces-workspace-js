import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import InternalLinksSection from "@/components/InternalLinksSection";
import { Link } from "@/compat/react-router-dom";
import { type BlogLandingData, getBlogPostCoverImage, getBlogPostUrl } from "@/lib/blog";

function formatDate(value?: string) {
  if (!value) {
    return "Fresh insights";
  }

  return format(new Date(value), "dd MMM yyyy");
}

export default function BlogPage({ data }: { data: BlogLandingData }) {
  const { featuredPost, latestPosts, categories, isConfigured, studioUrl } = data;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <AnimatedSection>
        <section className="overflow-hidden bg-primary px-4 py-16 text-primary-foreground sm:px-6 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
                <Sparkles size={14} />
                EverySpaces Journal
              </p>
              <h1 className="max-w-4xl text-4xl font-serif leading-tight sm:text-5xl lg:text-6xl">
                Workspace intelligence, curated through the EverySpaces brand lens.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/78 sm:text-lg">
                This blog is built for search growth and brand authority: city guides, leasing playbooks, coworking comparisons, workplace strategy pieces, and conversion-ready editorial content managed from Sanity.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]">
                  Talk to Our Team
                  <ArrowRight size={16} />
                </Link>
                <a href={studioUrl} className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10">
                  Open Sanity Studio
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-primary-foreground/18 bg-primary-foreground/8 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-lime">Editorial Focus</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {["Managed offices", "Coworking guides", "Location playbooks", "Lease strategy", "Workspace trends", "Enterprise relocation"].map((item) => (
                  <div key={item} className="rounded-2xl border border-primary-foreground/12 bg-primary-foreground/5 px-4 py-4 text-sm text-primary-foreground/80">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {!isConfigured || !featuredPost ? (
        <AnimatedSection delay={0.08}>
          <section className="px-4 py-14 sm:px-6 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-5xl rounded-[2rem] border border-dashed border-border bg-card px-8 py-12 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Sanity Waiting Room</p>
              <h2 className="mt-4 text-3xl font-serif text-foreground">The blog shell is live and ready for content.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                Add your Sanity project values in `.env`, publish at least one `post` document, and this page will automatically populate with featured articles, topic clusters, and article detail pages.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={studioUrl} className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                  Go to Studio
                </a>
                <Link to="/contact" className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground">
                  Need SEO Content Strategy?
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>
      ) : (
        <>
          <AnimatedSection delay={0.08}>
            <section className="px-4 py-14 sm:px-6 lg:px-12 lg:py-20">
              <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <Link to={getBlogPostUrl(featuredPost.slug)} className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition-shadow hover:shadow-xl">
                  {getBlogPostCoverImage(featuredPost, 1600) ? (
                    <img
                      src={getBlogPostCoverImage(featuredPost, 1600)!}
                      alt={featuredPost.coverImage?.alt || featuredPost.title}
                      className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[420px]"
                    />
                  ) : (
                    <div className="flex h-[320px] w-full items-end bg-[linear-gradient(135deg,#0b5467_0%,#123524_58%,#eff3d4_100%)] p-8 text-primary-foreground sm:h-[420px]">
                      <h2 className="max-w-2xl text-3xl font-serif leading-tight sm:text-4xl">{featuredPost.title}</h2>
                    </div>
                  )}
                  <div className="space-y-4 p-6 sm:p-8">
                    <div className="flex flex-wrap gap-2">
                      {(featuredPost.categoryNames.length ? featuredPost.categoryNames : ["Featured"]).slice(0, 3).map((category) => (
                        <span key={category} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground">
                          {category}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-3xl font-serif leading-tight text-foreground">{featuredPost.title}</h2>
                    <p className="text-base leading-8 text-muted-foreground">{featuredPost.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={15} />
                        {featuredPost.readingTime} min read
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Brand Curation</p>
                  <h2 className="mt-4 text-3xl font-serif leading-tight text-foreground">Why this blog works for both search and trust.</h2>
                  <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>Each article is positioned to support topical authority around office space, coworking, location demand, leasing decisions, and commercial real estate intent.</p>
                    <p>The design keeps the EverySpaces brand visible without overpowering the content, so it feels premium and editorial rather than templated.</p>
                    <p>Sanity gives your team a cleaner CRM-style publishing workflow with structured SEO fields, modular content blocks, author bylines, FAQs, and reusable taxonomies.</p>
                  </div>
                  <div className="mt-8 rounded-[1.5rem] bg-secondary/55 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-foreground">Active Topics</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {categories.slice(0, 10).map((category) => (
                        <span key={category.slug} className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground">
                          {category.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <section className="px-4 pb-12 sm:px-6 lg:px-12 lg:pb-16">
              <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Latest Stories</p>
                    <h2 className="mt-3 text-3xl font-serif text-foreground">Curated blog content built to rank and convert.</h2>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {latestPosts.map((post) => (
                    <Link key={post.slug} to={getBlogPostUrl(post.slug)} className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                      {getBlogPostCoverImage(post, 1200) ? (
                        <img
                          src={getBlogPostCoverImage(post, 1200)!}
                          alt={post.coverImage?.alt || post.title}
                          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="h-56 bg-[linear-gradient(135deg,#eff3d4_0%,#d7e8c1_35%,#f79a49_100%)]" />
                      )}
                      <div className="space-y-4 p-6">
                        <div className="flex flex-wrap gap-2">
                          {(post.categoryNames.length ? post.categoryNames : ["Insights"]).slice(0, 2).map((category) => (
                            <span key={category} className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary-foreground">
                              {category}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-2xl font-serif leading-tight text-foreground">{post.title}</h3>
                        <p className="text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{formatDate(post.publishedAt)}</span>
                          <span>{post.readingTime} min</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>
        </>
      )}

      <AnimatedSection delay={0.12}>
        <InternalLinksSection
          eyebrow="Next Steps"
          title="Turn content discovery into workspace conversations"
          description="These paths keep readers moving from informational intent into commercial research and direct contact."
          links={[
            {
              href: "/listings",
              title: "Browse Live Listings",
              description: "Move from educational content into active office inventory across Bangalore and Hyderabad.",
            },
            {
              href: "/areas-we-serve",
              title: "Explore Service Areas",
              description: "See the neighborhoods and cities where EverySpaces can help teams shortlist faster.",
            },
            {
              href: "/about",
              title: "Meet the Brand",
              description: "Learn how EverySpaces approaches consulting, curation, and workspace strategy.",
            },
            {
              href: "/contact",
              title: "Start a Search",
              description: "Talk to the team if you want help converting research into a real workspace shortlist.",
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
