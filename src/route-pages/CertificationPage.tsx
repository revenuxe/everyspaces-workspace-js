import Image from "next/image";
import { ArrowUpRight, BadgeCheck, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { Link } from "@/compat/react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo";

const evaluationPoints = [
  "Infrastructure and office setup",
  "Cleanliness and maintenance",
  "Internet speed and technology",
  "Staff support and service",
  "Location and accessibility",
  "Pricing and value",
  "Safety and environment",
  "Amenities and comfort",
  "Booking and onboarding experience",
];

const badges = [
  "Verified Workspace",
  "Best Coworking Space",
  "Top Office Space",
  "Best Amenities",
  "High-Speed Internet Workspace",
  "Most Trusted Workspace",
  "Best Value Workspace",
  "Top Community Workspace",
  "Premium Meeting Ready",
];

const userBenefits = [
  "Find verified and trusted workspaces",
  "Compare office spaces easily",
  "Choose the best coworking spaces",
];

const ownerBenefits = [
  "Build trust with customers",
  "Highlight workspace quality",
  "Stand out from competitors",
];

const processSteps = [
  "Workspace is reviewed",
  "Audit and checks are completed",
  "Score is calculated",
  "Badges are assigned",
];

const certificationFaqs = [
  {
    question: "What is workspace certification?",
    answer:
      "Workspace certification is EverySpaces' review and audit process for coworking spaces and office space listings. It checks quality, facilities, service, and user experience before assigning a score and badges.",
  },
  {
    question: "What makes a verified workspace?",
    answer:
      "A verified workspace has completed the EverySpaces review process and met the standards we use for infrastructure, maintenance, internet, support, access, pricing, safety, and overall experience.",
  },
  {
    question: "Why do workspace badges matter?",
    answer:
      "Badges make workspace reviews easier to understand. They help users compare the best workspaces quickly and help operators show their strengths clearly.",
  },
];

function certificationCollectionPageSchema({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "EverySpaces",
      url: absoluteUrl("/"),
    },
    about: {
      "@type": "Thing",
      name: "Office space, coworking, managed workspace and workplace strategy",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

function certificationFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

const jsonLd = [
  breadcrumbSchema([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Certification", url: absoluteUrl("/certification") },
  ]),
  certificationCollectionPageSchema({
    name: "EverySpaces Workspace Certification",
    description:
      "EverySpaces certification reviews coworking spaces and office space listings with scores, badges, and workspace reviews to identify the best workspaces.",
    url: absoluteUrl("/certification"),
    items: badges.map((badge) => ({
      name: badge,
      url: absoluteUrl("/certification"),
    })),
  }),
  certificationFaqSchema(certificationFaqs),
];

const CertificationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={jsonLd} />
      <Navbar />

      <AnimatedSection>
        <section className="relative">
          <div className="relative overflow-hidden bg-secondary px-4 pt-10 pb-24 sm:px-6 sm:pt-16 sm:pb-32 lg:px-12">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cert-hex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                    <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cert-hex)" />
              </svg>
            </div>
            <div className="relative z-10 mx-auto max-w-7xl">
              <h1 className="max-w-5xl text-4xl font-serif leading-[1.1] sm:text-5xl sm:leading-tight md:text-7xl lg:text-8xl">
                EverySpaces Workspace <span className="italic font-normal">Certification</span>
              </h1>
            </div>
          </div>

          <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 sm:-mt-20 sm:px-6 lg:px-12">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-2xl sm:p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Get your badge</p>
                <h2 className="mt-4 max-w-xl text-3xl font-serif leading-tight sm:text-4xl md:text-5xl">
                  Show users a verified workspace with trust they can see.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
                  EverySpaces reviews quality, service, technology, and user experience to award certification badges
                  that help the best workspaces stand out.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]">
                    Verified Workspace
                  </span>
                  <span className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]">
                    Best Amenities
                  </span>
                  <span className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]">
                    Workspace Reviews
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                <div className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-4 shadow-2xl sm:p-6">
                  <Image
                    src="/certification-badge-best-amenities.webp"
                    alt="EverySpaces best amenities workspace certification badge"
                    priority
                    width={900}
                    height={1200}
                    className="h-auto w-full rounded-[1.5rem] object-contain"
                  />
                  <div className="mt-4 rounded-[1.25rem] bg-muted px-3 py-3 sm:px-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent sm:text-xs">Badge example</p>
                    <p className="mt-2 hidden text-sm font-medium text-foreground sm:block sm:text-base">Best Amenities</p>
                    <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block sm:text-sm">
                      Highlights strong facilities, comfort, and day-to-day workspace experience.
                    </p>
                  </div>
                </div>
                <div className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-4 shadow-2xl sm:p-6">
                  <Image
                    src="/certification-badge-verified-workspace.webp"
                    alt="EverySpaces verified workspace certification badge"
                    priority
                    width={900}
                    height={1200}
                    className="h-auto w-full rounded-[1.5rem] object-contain"
                  />
                  <div className="mt-4 rounded-[1.25rem] bg-muted px-3 py-3 sm:px-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent sm:text-xs">Badge example</p>
                    <p className="mt-2 hidden text-sm font-medium text-foreground sm:block sm:text-base">Verified Workspace</p>
                    <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block sm:text-sm">
                      Builds trust fast by showing that the workspace passed the EverySpaces review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                We review, audit, and rate workspaces to identify the best coworking and office spaces.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                <Link
                  to="/certification/contact-us"
                  className="flex min-h-[60px] items-center justify-between rounded-full bg-primary py-3 pl-7 pr-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:min-h-[64px] sm:min-w-[320px] sm:pl-8 sm:pr-4 sm:text-lg"
                >
                  <span>Get Your Workspace Certified</span>
                  <span className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-foreground/30 sm:h-12 sm:w-12">
                    <ArrowUpRight size={20} />
                  </span>
                </Link>
                <Link
                  to="/certification/contact-us"
                  className="flex min-h-[60px] items-center justify-between rounded-full border-2 border-foreground py-3 pl-7 pr-3 text-base font-semibold text-foreground transition-colors hover:bg-foreground hover:text-primary-foreground sm:min-h-[64px] sm:min-w-[320px] sm:pl-8 sm:pr-4 sm:text-lg"
                >
                  <span>Explore Certified Workspaces</span>
                  <span className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-current/30 sm:h-12 sm:w-12">
                    <ArrowUpRight size={20} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.08}>
        <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Certification overview</p>
              <h2 className="mt-3 text-3xl font-serif sm:text-4xl">Workspace certification, badges, and evaluation</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                EverySpaces keeps certification simple and readable. Users can understand how a verified workspace is
                reviewed, while operators can see how badge performance supports trust and visibility.
              </p>
            </div>
            <div className="mt-10 space-y-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <section className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Section 1</p>
                  <h3 className="mt-3 text-2xl font-serif sm:text-3xl">What is EverySpaces Certification?</h3>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    <p>
                      EverySpaces Certification is a system that checks and rates workspaces based on real factors like
                      quality, facilities, and user experience.
                    </p>
                    <p>
                      We review each workspace and assign scores and badges based on performance.
                    </p>
                  </div>
                </section>

                <section className="rounded-[2rem] border border-border bg-secondary p-6 shadow-sm sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/70">Section 2</p>
                  <h3 className="mt-3 text-2xl font-serif sm:text-3xl">EverySpaces Score</h3>
                  <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                    <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      <p>We give every workspace a clear score out of 100.</p>
                      <p>This helps users compare and choose the best workspace easily.</p>
                    </div>
                    <div className="rounded-3xl bg-card px-6 py-8 text-center shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/70">Example score</p>
                      <p className="mt-3 text-4xl font-serif font-bold text-foreground sm:text-5xl">87/100</p>
                      <p className="mt-2 text-sm text-muted-foreground">Workspace Score</p>
                    </div>
                  </div>
                </section>
              </div>

              <section className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Section 3</p>
                <h3 className="mt-3 text-2xl font-serif sm:text-3xl">How We Evaluate Workspaces</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {evaluationPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3 rounded-2xl bg-muted px-4 py-4 text-sm text-foreground">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Each workspace receives a score based on these checks.
                </p>
              </section>

              <section className="rounded-[2rem] border border-border bg-primary p-6 text-primary-foreground shadow-sm sm:p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Section 4</p>
                <h3 className="mt-3 text-2xl font-serif sm:text-3xl">Certification Badges</h3>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
                  Workspaces earn badges based on their performance and strengths. A workspace can earn multiple badges
                  based on performance.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {badges.map((badge) => (
                    <div key={badge} className="flex items-center gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-4">
                      <BadgeCheck size={18} className="shrink-0 text-accent" />
                      <span className="text-sm font-medium text-primary-foreground">{badge}</span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Section 5</p>
                  <h3 className="mt-3 text-2xl font-serif sm:text-3xl">Why Certification Matters</h3>
                  <div className="mt-6 grid gap-5">
                    <div className="rounded-3xl bg-muted p-5">
                      <h4 className="text-xl font-serif font-bold">For Users</h4>
                      <ul className="mt-4 space-y-3">
                        {userBenefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-accent" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl bg-muted p-5">
                      <h4 className="text-xl font-serif font-bold">For Workspace Owners</h4>
                      <ul className="mt-4 space-y-3">
                        {ownerBenefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Star size={18} className="mt-0.5 shrink-0 text-accent" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Section 6</p>
                  <h3 className="mt-3 text-2xl font-serif sm:text-3xl">Certification Process</h3>
                  <div className="mt-6 space-y-4">
                    {processSteps.map((step, index) => (
                      <div key={step} className="flex items-start gap-4 rounded-3xl bg-muted p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">Step {index + 1}</p>
                          <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.12}>
        <section className="bg-secondary px-4 py-14 sm:px-6 md:py-20 lg:px-12">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/70">Apply for evaluation</p>
            <h2 className="mt-4 text-3xl font-serif sm:text-4xl md:text-5xl">Get Your Workspace Certified</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              If you run a coworking space or office space and want to be reviewed, EverySpaces can assess your
              workspace, calculate your score, and assign badges based on performance.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/certification/contact-us"
                className="inline-flex min-h-[72px] items-center justify-between rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:min-h-[84px] sm:min-w-[240px]"
              >
                <span>Apply for Certification</span>
                <span className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-foreground/30">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
              <Link
                to="/certification/contact-us"
                className="inline-flex min-h-[72px] items-center justify-between rounded-full border-2 border-foreground px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-primary-foreground sm:min-h-[84px] sm:min-w-[240px]"
              >
                <span>Contact Us</span>
                <span className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-current/30">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.14}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default CertificationPage;
