import { ArrowUpRight } from "lucide-react";
import serviceConsulting from "@/assets/service-consulting.png";
import serviceSearch from "@/assets/service-search.png";
import servicePortfolio from "@/assets/service-portfolio.png";
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
    image: servicePortfolio,
    title: "Portfolio Optimization & Growth",
    desc: "Maximize returns with tailored strategies for portfolio optimization and sustainable growth in workspace real estate.",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 sm:p-7 flex flex-col justify-between min-h-[240px] sm:min-h-[280px] ${variantClasses[service.variant]}`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-6 sm:mb-8 border-2 border-background/60">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-sans mb-2">{service.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed mb-4 sm:mb-5">{service.desc}</p>
                {service.variant === "orange" ? (
                  <button className="text-sm font-medium border border-accent-foreground rounded-full px-5 py-2 hover:bg-accent-foreground hover:text-accent transition-colors">
                    Learn More
                  </button>
                ) : (
                  <button className="text-sm font-medium border border-current rounded-full px-5 py-2 hover:bg-foreground hover:text-primary-foreground transition-colors">
                    Learn More
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
