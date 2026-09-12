"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowUpRight, CheckCircle2, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/compat/react-router-dom";
import { serviceDetails, serviceSlugMap } from "@/data/serviceDetails";
import serviceConsulting from "@/assets/service-consulting.png";
import serviceSearch from "@/assets/service-search.png";
import serviceInterior from "@/assets/service-interior.png";
import serviceResearch from "@/assets/service-research.png";
import serviceManagement from "@/assets/service-management.png";
import serviceStrategy from "@/assets/service-strategy.png";

const services = [
  {
    image: serviceConsulting,
    title: "Workspace Consulting",
    desc: "Expert guidance to help you find and optimize the perfect workspace for your team.",
    variant: "blue" as const,
  },
  {
    image: serviceSearch,
    title: "Space Search & Acquisition",
    desc: "Professional assistance with finding, leasing, and acquiring high-value workspace properties efficiently.",
    variant: "default" as const,
  },
  {
    image: serviceInterior,
    title: "Office Interior Design",
    desc: "End-to-end office interior solutions — from concept ideation to final execution — creating inspiring workspaces that boost productivity.",
    variant: "orange" as const,
  },
  {
    image: serviceResearch,
    title: "Market Research & Analysis",
    desc: "In-depth analysis and insights to guide informed decisions in workspace investment opportunities.",
    variant: "default" as const,
  },
  {
    image: serviceManagement,
    title: "Workspace Management Services",
    desc: "Comprehensive workspace management to maximize occupancy, minimize costs, and enhance space value.",
    variant: "lime" as const,
  },
  {
    image: serviceStrategy,
    title: "Custom Workspace Strategies",
    desc: "Tailored strategies designed to meet your specific business goals, preferences, and growth profile.",
    variant: "default" as const,
  },
];

const variantClasses = {
  default: "bg-card border-primary/15",
  lime: "bg-lime text-foreground border-primary/15",
  orange: "bg-accent text-accent-foreground border-accent-foreground/25",
  blue: "bg-primary text-primary-foreground border-primary-foreground/20",
};

const ServiceCard = ({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: (typeof services)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    layout
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={`relative rounded-2xl border p-6 sm:p-8 flex flex-col h-full min-h-[320px] group shadow-[0_4px_8px_-4px_hsl(var(--primary)/0.15),0_12px_28px_-12px_hsl(var(--primary)/0.25)] transition-[box-shadow,border-color] duration-200 hover:shadow-[0_8px_16px_-6px_hsl(var(--primary)/0.2),0_20px_40px_-14px_hsl(var(--primary)/0.3)] hover:border-accent focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 motion-safe:hover:-translate-y-1 ${variantClasses[service.variant]} ${isExpanded ? "ring-2 ring-accent" : ""}`}
  >
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-6 sm:mb-8 border-2 border-background/60">
      <img src={service.image.src} alt={service.title} className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-1 flex-col">
      <h3 className="text-lg sm:text-xl font-bold font-sans mb-3 md:min-h-[56px]">{service.title}</h3>
      <p className="text-sm opacity-80 leading-7 mb-6 flex-1">{service.desc}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Close" : "Explore"} ${service.title}`}
        className={`after:absolute after:inset-0 after:rounded-2xl after:content-[''] cursor-pointer focus-visible:outline-none self-start flex items-center gap-1.5 text-sm font-medium border rounded-full px-5 py-2 transition-colors ${
          service.variant === "orange"
            ? "border-accent-foreground hover:bg-accent-foreground hover:text-accent"
            : service.variant === "blue"
              ? "border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              : "border-current hover:bg-foreground hover:text-primary-foreground"
        }`}
      >
        <Plus size={16} className={`transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`} />
        {isExpanded ? "Close details" : "Explore service"}
      </button>
    </div>
  </motion.div>
);

const ExpandedPanel = ({
  service,
  onClose,
}: {
  service: (typeof services)[0];
  onClose: () => void;
}) => {
  const slug = serviceSlugMap[service.title];
  const detail = slug ? serviceDetails[slug] : null;
  if (!detail) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden col-span-full"
    >
      <div className="bg-card border border-border rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 md:mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-accent/30 shrink-0">
              <img src={service.image.src} alt={service.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-accent font-semibold text-xs uppercase tracking-wider">Our Process</span>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mt-0.5">{service.title}</h4>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close service details"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Steps - Horizontal on desktop */}
        <div className="mb-8 md:mb-10">
          <h5 className="text-sm font-semibold text-accent uppercase tracking-wider mb-6">How We Work</h5>
          <div className="flex flex-col md:flex-row gap-0 md:gap-0">
            {detail.steps.map((step, si) => (
              <motion.div
                key={si}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + si * 0.1 }}
                className="flex md:flex-col md:flex-1 gap-3 md:gap-0"
              >
                {/* Step number row with connector */}
                <div className="flex flex-col md:flex-row items-center md:w-full">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm font-serif shrink-0 z-10">
                    {step.number}
                  </div>
                  {si < detail.steps.length - 1 && (
                    <>
                      <div className="w-[2px] h-6 bg-border md:hidden" />
                      <div className="hidden md:block h-[2px] flex-1 bg-border" />
                    </>
                  )}
                </div>
                {/* Step content */}
                <div className="pb-6 md:pb-0 md:pt-4 md:pr-6">
                  <h5 className="text-sm sm:text-base font-bold font-sans mb-1.5">{step.title}</h5>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-[240px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deliverables + CTA row */}
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 md:gap-8 pt-6 md:pt-8 border-t border-border">
          <div className="flex-1">
            <span className="text-accent font-semibold text-xs uppercase tracking-wider">What You Get</span>
            <h4 className="text-lg sm:text-xl font-serif font-bold mt-1 mb-4">Key Deliverables</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {detail.deliverables.map((item, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + di * 0.08 }}
                  className="flex items-center gap-3 bg-muted rounded-xl p-3 sm:p-4"
                >
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                  <p className="text-foreground text-sm font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <Link
            to="/contact"
            className="flex items-center justify-between bg-primary text-primary-foreground font-semibold text-sm py-3 pl-5 pr-3 rounded-full hover:opacity-90 transition-opacity md:w-fit md:gap-4 shrink-0"
          >
            <span>Book Strategy Call</span>
            <span className="w-8 h-8 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center ml-3">
              <ArrowUpRight size={14} />
            </span>
          </Link>
          <Link
            to={`/services/${slug}`}
            className="flex items-center justify-between border border-foreground text-foreground font-semibold text-sm py-3 pl-5 pr-3 rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors md:w-fit md:gap-4 shrink-0"
          >
            <span>View Detailed Page</span>
            <span className="w-8 h-8 rounded-full border-2 border-current/30 flex items-center justify-center ml-3">
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const handleToggle = (i: number) => {
    setExpandedIndex((prev) => (prev === i ? null : i));
  };

  // Group cards into rows of 3 for desktop
  const rows: number[][] = [];
  for (let i = 0; i < services.length; i += 3) {
    rows.push(services.slice(i, i + 3).map((_, j) => i + j));
  }

  return (
    <section id="service" className="border-t border-border py-16 md:py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14 grid gap-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our services</p>
            <h2 className="text-3xl md:text-4xl font-serif leading-tight text-balance">Expert office space solutions for growing teams</h2>
          </div>
          <div className="lg:pt-8">
            <p className="text-base leading-7 text-muted-foreground">From your first shortlist to your next move, get support with workspace consulting, leasing, interiors, and office management across Bangalore and Bengaluru.</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link to="/areas-we-serve" className="inline-flex items-center gap-2 underline underline-offset-4">Explore locations <ArrowUpRight size={16} /></Link>
              <Link to="/listings" className="inline-flex items-center gap-2 underline underline-offset-4">Browse workspaces <ArrowUpRight size={16} /></Link>
            </div>
          </div>
        </div>

        {isMobile ? (
          /* Mobile: each card followed by its own expand panel */
          <div className="space-y-4">
            {services.map((service, i) => (
              <div key={i}>
                <ServiceCard
                  service={service}
                  index={i}
                  isExpanded={expandedIndex === i}
                  onToggle={() => handleToggle(i)}
                />
                <AnimatePresence mode="wait" initial={false}>
                  {expandedIndex === i && (
                    <div className="mt-4">
                      <ExpandedPanel
                        service={services[i]}
                        onClose={() => setExpandedIndex(null)}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: cards in rows of 3, panel after the row */
          <div className="space-y-6">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx}>
                <div className="grid grid-cols-3 gap-6">
                  {row.map((i) => (
                    <ServiceCard
                      key={i}
                      service={services[i]}
                      index={i}
                      isExpanded={expandedIndex === i}
                      onToggle={() => handleToggle(i)}
                    />
                  ))}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  {expandedIndex !== null && row.includes(expandedIndex) && (
                    <div className="mt-5">
                      <ExpandedPanel
                        service={services[expandedIndex]}
                        onClose={() => setExpandedIndex(null)}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;


