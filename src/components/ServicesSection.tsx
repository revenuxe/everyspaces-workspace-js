import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const ServicesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearExpandTimer = useCallback(() => {
    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
      expandTimerRef.current = null;
    }
  }, []);

  // When a card becomes visible, highlight it first, then expand after a delay
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // First: show which card we're on (visual highlight)
            setVisibleIndex(i);
            
            // Clear any pending expand
            clearExpandTimer();

            // Collapse previous card immediately
            setExpandedIndex(null);

            // After a short pause, expand this card
            expandTimerRef.current = setTimeout(() => {
              setExpandedIndex(i);
              // Smooth scroll card into better view
              if (card) {
                card.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 600);
          }
        },
        {
          threshold: 0.5,
          rootMargin: "-20% 0px -40% 0px",
        }
      );
      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      clearExpandTimer();
    };
  }, [clearExpandTimer]);

  // Auto-collapse when scrolling away from the entire section
  useEffect(() => {
    if (expandedIndex === null && visibleIndex === null) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom < 100 || rect.top > window.innerHeight - 100) {
        setExpandedIndex(null);
        setVisibleIndex(null);
        clearExpandTimer();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expandedIndex, visibleIndex, clearExpandTimer]);

  const handleToggle = (i: number) => {
    clearExpandTimer();
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  return (
    <section id="service" ref={sectionRef} className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, i) => {
            const slug = serviceSlugMap[service.title];
            const detail = slug ? serviceDetails[slug] : null;
            const isExpanded = expandedIndex === i;

            return (
              <div key={i} ref={(el) => { cardRefs.current[i] = el; }} className="flex flex-col scroll-mt-24">
                {/* Card */}
                <motion.div
                  animate={{
                    scale: visibleIndex === i ? 1.02 : 1,
                    boxShadow: visibleIndex === i
                      ? "0 8px 30px -8px hsl(var(--primary) / 0.2)"
                      : "0 1px 3px 0 rgb(0 0 0 / 0.1)",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`rounded-2xl p-5 sm:p-7 flex flex-col justify-between min-h-[240px] sm:min-h-[280px] ${variantClasses[service.variant]} ${isExpanded ? "rounded-b-none" : ""}`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-6 sm:mb-8 border-2 border-background/60">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-sans mb-2">{service.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed mb-4 sm:mb-5">{service.desc}</p>
                    <button
                      onClick={() => handleToggle(i)}
                      className={`text-sm font-medium border rounded-full px-5 py-2 transition-colors ${
                        service.variant === "orange"
                          ? "border-accent-foreground hover:bg-accent-foreground hover:text-accent"
                          : "border-current hover:bg-foreground hover:text-primary-foreground"
                      }`}
                    >
                      {isExpanded ? "Close" : "Learn More"}
                    </button>
                  </div>
                </motion.div>

                {/* Expandable How We Work */}
                <AnimatePresence>
                  {isExpanded && detail && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="bg-card border border-t-0 border-border rounded-b-2xl shadow-md p-5 sm:p-7">
                        {/* Close button */}
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <span className="text-accent font-semibold text-xs uppercase tracking-wider">Our Process</span>
                            <h4 className="text-xl sm:text-2xl font-serif font-bold mt-1">How We Work</h4>
                          </div>
                          <button
                            onClick={() => setExpandedIndex(null)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        {/* Steps */}
                        <div className="space-y-0 mb-8">
                          {detail.steps.map((step, si) => (
                            <motion.div
                              key={si}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: si * 0.1 }}
                              className="flex gap-3 sm:gap-4"
                            >
                              <div className="flex flex-col items-center">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xs sm:text-sm font-serif shrink-0">
                                  {step.number}
                                </div>
                                {si < detail.steps.length - 1 && (
                                  <div className="w-[2px] flex-1 bg-border my-1.5" />
                                )}
                              </div>
                              <div className="pb-6 sm:pb-8 pt-0.5">
                                <h5 className="text-sm sm:text-base font-bold font-sans mb-1">{step.title}</h5>
                                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Deliverables */}
                        <div>
                          <span className="text-accent font-semibold text-xs uppercase tracking-wider">What You Get</span>
                          <h4 className="text-lg sm:text-xl font-serif font-bold mt-1 mb-4">Key Deliverables</h4>
                          <div className="grid grid-cols-1 gap-2.5">
                            {detail.deliverables.map((item, di) => (
                              <motion.div
                                key={di}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + di * 0.08 }}
                                className="flex items-center gap-3 bg-muted rounded-xl p-3 sm:p-4"
                              >
                                <CheckCircle2 size={18} className="text-accent shrink-0" />
                                <p className="text-foreground text-sm font-medium">{item}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <a
                          href="#contact"
                          className="mt-6 flex items-center justify-between bg-primary text-primary-foreground font-semibold text-sm py-3 pl-5 pr-3 rounded-full hover:opacity-90 transition-opacity"
                        >
                          <span>Book Strategy Call</span>
                          <span className="w-8 h-8 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center ml-3">
                            <ArrowUpRight size={14} />
                          </span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
