import { useState } from "react";
import { ArrowUpRight, CheckCircle2, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { serviceDetails, serviceSlugMap } from "@/data/serviceDetails";
import serviceConsulting from "@/assets/service-consulting.png?format=webp";
import serviceSearch from "@/assets/service-search.png?format=webp";
import serviceInterior from "@/assets/service-interior.png?format=webp";
import serviceResearch from "@/assets/service-research.png?format=webp";
import serviceManagement from "@/assets/service-management.png?format=webp";
import serviceStrategy from "@/assets/service-strategy.png?format=webp";

const services = [
  {
    image: serviceConsulting,
    title: "Workspace Consulting",
    desc: "Expert guidance to help you find and optimize the perfect workspace for your team.",
    variant: "default" as const,
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
  default: "bg-card border border-border shadow-md",
  lime: "bg-lime text-foreground shadow-md",
  orange: "bg-accent text-accent-foreground shadow-md",
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
    className={`rounded-2xl p-5 sm:p-7 flex flex-col justify-between min-h-[240px] sm:min-h-[280px] cursor-pointer group ${variantClasses[service.variant]} ${isExpanded ? "ring-2 ring-accent" : ""}`}
    onClick={onToggle}
  >
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-6 sm:mb-8 border-2 border-background/60">
      <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
    </div>
    <div>
      <h3 className="text-lg sm:text-xl font-bold font-sans mb-2">{service.title}</h3>
      <p className="text-sm opacity-70 leading-relaxed mb-4 sm:mb-5">{service.desc}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`flex items-center gap-1.5 text-sm font-medium border rounded-full px-5 py-2 transition-colors ${
          service.variant === "orange"
            ? "border-accent-foreground hover:bg-accent-foreground hover:text-accent"
            : "border-current hover:bg-foreground hover:text-primary-foreground"
        }`}
      >
        <Plus size={16} className={`transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`} />
        {isExpanded ? "Close" : "Expand"}
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
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-accent font-semibold text-xs uppercase tracking-wider">Our Process</span>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mt-0.5">{service.title}</h4>
            </div>
          </div>
          <button
            onClick={onClose}
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 pt-6 md:pt-8 border-t border-border">
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

          <a
            href="#contact"
            className="flex items-center justify-between bg-primary text-primary-foreground font-semibold text-sm py-3 pl-5 pr-3 rounded-full hover:opacity-90 transition-opacity md:w-fit md:gap-4 shrink-0"
          >
            <span>Book Strategy Call</span>
            <span className="w-8 h-8 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center ml-3">
              <ArrowUpRight size={14} />
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setExpandedIndex((prev) => (prev === i ? null : i));
  };

  // Group cards into rows of 3 (desktop), inserting expanded panel after the row containing the active card
  const rows: number[][] = [];
  for (let i = 0; i < services.length; i += 3) {
    rows.push(services.slice(i, i + 3).map((_, j) => i + j));
  }

  return (
    <section id="service" className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-8 md:mb-12 gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif max-w-xl">
            <span className="font-bold">Expert</span> Workspace Solutions for Maximum Productivity
          </h2>
          <a
            href="#contact"
            className="hidden md:flex w-12 h-12 rounded-full border-2 border-foreground items-center justify-center hover:bg-foreground hover:text-primary-foreground transition-colors shrink-0"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        <div className="space-y-4 md:space-y-5">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
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
                  <div className="mt-4 md:mt-5">
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
      </div>
    </section>
  );
};

export default ServicesSection;
