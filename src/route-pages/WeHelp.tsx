import Image from "next/image";
import { ArrowUpRight, Building2, CheckCircle2, MapPinned, Search, Sparkles, Users } from "lucide-react";
import { Link } from "@/compat/react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import InternalLinksSection from "@/components/InternalLinksSection";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import heroImg from "@/assets/hero-workspace.png";

const workspaceTypes = [
  {
    icon: Users,
    title: "Coworking spaces for startups",
    description:
      "Discover coworking spaces in Bengaluru with flexible seats, private cabins, meeting rooms, high-speed internet, and communities that help early teams move quickly.",
  },
  {
    icon: Building2,
    title: "Managed offices for scaling businesses",
    description:
      "Compare managed offices that combine privacy, branded floors, operational support, IT readiness, housekeeping, security, and predictable monthly workspace costs.",
  },
  {
    icon: Sparkles,
    title: "Plug-and-play offices ready for move-in",
    description:
      "Shortlist plug-and-play offices with furniture, connectivity, reception, meeting rooms, pantry access, and the infrastructure needed to start work faster.",
  },
  {
    icon: MapPinned,
    title: "Independent commercial office properties",
    description:
      "Evaluate independent commercial office properties, full floors, standalone buildings, and commercial office space for rent across Bengaluru business districts.",
  },
];

const processSteps = [
  "Understand your team size, budget, preferred Bengaluru location, lease timeline, and workplace priorities.",
  "Curate coworking spaces, managed offices, plug-and-play offices, and independent commercial office properties that match the brief.",
  "Arrange site visits, compare commercial terms, and help startups and businesses negotiate with confidence.",
];

const keywords = [
  "coworking spaces in Bengaluru",
  "managed offices in Bengaluru",
  "plug-and-play offices in Bengaluru",
  "independent commercial office properties",
  "office space for rent in Bangalore",
  "commercial office space Bengaluru",
  "startup office space Bangalore",
  "business office space Bengaluru",
  "flexible workspace Bangalore",
  "ready to move office space",
  "private office space Bangalore",
  "workspace consultant Bengaluru",
];

const WeHelp = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="We Help Startups and Businesses Find Office Spaces in Bengaluru | EverySpaces"
        description="EverySpaces helps startups and businesses find coworking spaces, managed offices, plug-and-play offices, and independent commercial office properties across Bengaluru with expert shortlisting and leasing support."
        canonical="/we-help"
        keywords={keywords.join(", ")}
      />
      <Navbar />

      <AnimatedSection>
        <section className="relative">
          <div className="relative overflow-hidden bg-secondary px-4 pb-24 pt-10 sm:px-6 sm:pb-32 sm:pt-16 lg:px-12">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="we-help-hex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                    <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#we-help-hex)" />
              </svg>
            </div>
            <div className="relative z-10 mx-auto max-w-7xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-accent">We help</p>
              <h1 className="max-w-6xl font-serif text-3xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                EverySpaces helps startups and businesses find coworking spaces, managed offices, plug-and-play offices, and independent commercial office properties across Bengaluru.
              </h1>
            </div>
          </div>

          <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 sm:-mt-20 sm:px-6 lg:px-12">
            <div className="overflow-hidden rounded-lg shadow-2xl sm:rounded-2xl">
              <Image
                src={heroImg}
                alt="Modern Bengaluru office workspace for startups and businesses"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                className="h-[220px] w-full object-cover sm:h-[320px] md:h-[500px]"
              />
            </div>
            <div className="mt-6 sm:mt-8">
              <Link
                to="/contact"
                className="flex items-center justify-between rounded-full bg-primary py-3 pl-6 pr-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:py-4 sm:pl-8 sm:pr-4 sm:text-lg"
              >
                <span>Find My Office Space</span>
                <span className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-foreground/30 sm:h-12 sm:w-12">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Workspace search</p>
              <h2 className="font-serif text-2xl leading-snug sm:text-3xl md:text-4xl">
                One search partner for Bengaluru office space, from first desk to full-floor headquarters.
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                EverySpaces helps startups and businesses find coworking spaces, managed offices, plug-and-play offices,
                and independent commercial office properties across Bengaluru without wasting time on scattered listings.
                We turn office space search into a clear shortlist built around budget, location, team size, amenities,
                branding needs, and move-in timelines.
              </p>
              <p>
                Whether you need flexible coworking spaces in Koramangala, managed offices in Whitefield, plug-and-play
                offices near Outer Ring Road, or independent commercial office properties for a long-term business base,
                our team helps compare the right options and negotiate practical terms.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="bg-secondary px-4 py-12 sm:px-6 md:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">What we find</p>
              <h2 className="mb-3 font-serif text-2xl sm:text-3xl md:text-4xl">Workspace options matched to how your business works.</h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                From affordable office space for rent in Bangalore to premium commercial office space in Bengaluru, we
                help you compare formats that fit your operating model.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workspaceTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Icon size={19} />
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-snug">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">How we help</p>
              <h2 className="font-serif text-2xl leading-snug sm:text-3xl md:text-4xl">
                Better shortlists, cleaner comparisons, and faster office decisions.
              </h2>
            </div>
            <div className="grid gap-4">
              {processSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="bg-primary px-4 py-12 text-primary-foreground sm:px-6 md:py-16 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-3xl">
              <h2 className="mb-3 font-serif text-2xl sm:text-3xl md:text-4xl">Searching for office space in Bengaluru?</h2>
              <p className="text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
                Tell us your preferred area, seat count, budget, and timeline. EverySpaces will help you compare
                coworking spaces, managed offices, plug-and-play offices, and independent commercial office properties
                that are actually relevant to your team.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              Talk to EverySpaces
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center gap-3">
              <Search size={20} className="text-accent" />
              <h2 className="font-serif text-2xl sm:text-3xl">Popular office space keywords we cover</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <span key={keyword} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <InternalLinksSection
          eyebrow="Explore workspace pages"
          title="Compare office space options across Bengaluru"
          description="Use these pages to move from a broad Bengaluru office search into specific locations, listings, and workspace formats."
          links={[
            {
              href: "/office-space/bangalore",
              title: "Office Space in Bangalore",
              description: "Find coworking spaces, managed offices, and commercial office space for rent across Bangalore and Bengaluru.",
            },
            {
              href: "/listings",
              title: "Browse Office Listings",
              description: "Review live workspace listings with filters for budget, seats, furnishing, amenities, and location.",
            },
            {
              href: "/services/space-search-acquisition",
              title: "Space Search and Acquisition",
              description: "Learn how EverySpaces helps growing businesses secure ready-to-run private workspaces.",
            },
            {
              href: "/contact",
              title: "Get Workspace Help",
              description: "Share your office requirement and get a curated shortlist from the EverySpaces team.",
            },
          ]}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="px-4 pb-10 sm:px-6 sm:pb-14 lg:px-12 lg:pb-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <CheckCircle2 size={22} />
            </div>
            <h2 className="mb-4 font-serif text-2xl sm:text-3xl md:text-4xl">EverySpaces helps you choose with clarity.</h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              For startups and businesses, the best office space is not just a location. It is the right mix of commute,
              culture, cost, flexibility, privacy, amenities, and lease confidence. EverySpaces helps you find that mix
              across coworking spaces, managed offices, plug-and-play offices, and independent commercial office
              properties across Bengaluru.
            </p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContactForm />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default WeHelp;
