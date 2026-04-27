import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactForm from "@/components/ContactForm";
import InternalLinksSection from "@/components/InternalLinksSection";
import { Link } from "@/compat/react-router-dom";
import { serviceDetails } from "@/data/serviceDetails";
import { servicePages, type ServicePageContent } from "@/data/servicePages";

interface ServiceDetailPageProps {
  service: ServicePageContent;
}

const ServiceDetailPage = ({ service }: ServiceDetailPageProps) => {
  const process = serviceDetails[service.slug];
  const relatedServices = servicePages
    .filter((item) => item.slug !== service.slug)
    .slice(0, 4)
    .map((item) => ({
      href: `/services/${item.slug}`,
      title: item.title,
      description: item.description,
    }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative">
        <div className="relative overflow-hidden bg-secondary px-4 pb-24 pt-10 sm:px-6 sm:pb-32 sm:pt-16 lg:px-12">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`service-hex-${service.slug}`} width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                  <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#service-hex-${service.slug})`} />
            </svg>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/70">{service.eyebrow}</p>
            <h1 className="max-w-5xl text-4xl font-serif leading-[1.1] sm:text-5xl md:text-7xl lg:text-8xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/75 sm:text-lg md:text-xl">
              {service.heroLead}
            </p>
          </div>
        </div>

        <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 sm:-mt-20 sm:px-6 lg:px-12">
          <div className="overflow-hidden rounded-lg shadow-2xl sm:rounded-2xl">
            <Image
              src={service.image}
              alt={`${service.title} workspace service`}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              className="h-[220px] w-full object-cover sm:h-[340px] md:h-[500px]"
            />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {service.description}
            </p>
            <Link
              to="/contact"
              className="flex items-center justify-between rounded-full bg-primary py-3 pl-6 pr-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:py-4 sm:pl-8 sm:pr-4 md:min-w-[280px]"
            >
              <span>Book Strategy Call</span>
              <span className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-foreground/30 sm:h-12 sm:w-12">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Who it helps</p>
            <h2 className="text-2xl font-serif sm:text-3xl md:text-4xl">
              Built for teams that need confident workspace decisions.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Each engagement is shaped around your current business stage, not a generic checklist. We focus on the
              practical details that decide whether a workspace will support your team after move-in.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.bestFor.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-muted p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />
                <p className="text-sm font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary px-4 py-12 sm:px-6 md:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl md:mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">How we work</p>
            <h2 className="text-2xl font-serif sm:text-3xl md:text-4xl">
              A clear process from first conversation to useful next steps.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {process.steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-border bg-card p-5 shadow-md">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent font-serif font-bold text-accent-foreground">
                  {step.number}
                </div>
                <h3 className="mb-2 text-base font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">What you get</p>
            <h2 className="text-2xl font-serif sm:text-3xl">Practical deliverables, not vague advice.</h2>
            <div className="mt-6 grid gap-3">
              {process.deliverables.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />
                  <p className="text-sm font-medium leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {service.sections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-border bg-card p-6 shadow-md">
                <h3 className="mb-2 text-lg font-bold">{section.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 md:pb-20 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-2xl bg-lime p-6 sm:p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-serif sm:text-3xl md:text-4xl">{service.ctaTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/75 sm:text-base">
                {service.ctaDescription}
              </p>
            </div>
            <Link
              to="/contact"
              className="flex items-center justify-between rounded-full bg-primary py-3 pl-6 pr-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:min-w-[260px]"
            >
              <span>Start With EverySpaces</span>
              <span className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-foreground/30">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <InternalLinksSection
        eyebrow="Other Services"
        title="Explore More Workspace Support"
        description="EverySpaces can combine multiple service tracks when your search, design, research, or operations needs overlap."
        links={relatedServices}
      />

      <ContactForm />
      <FooterSection />
    </div>
  );
};

export default ServiceDetailPage;
