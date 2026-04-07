import { useParams, Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Star, Target, TrendingUp, Shield, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { cityContent } from "@/data/cityContent";
import { areasByCity } from "@/data/areas";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-workspace.png?format=webp";
import testimonialBg from "@/assets/testimonial-bg.png?format=webp";
import serviceConsulting from "@/assets/service-consulting.png?format=webp";
import serviceSearch from "@/assets/service-search.png?format=webp";
import serviceInterior from "@/assets/service-interior.png?format=webp";
import serviceResearch from "@/assets/service-research.png?format=webp";
import serviceManagement from "@/assets/service-management.png?format=webp";
import serviceStrategy from "@/assets/service-strategy.png?format=webp";

const cityServices = (city: string) => [
  { image: serviceConsulting, title: "Workspace Consulting", desc: `Expert guidance to find and optimize the perfect workspace for your team in ${city}.`, variant: "default" as const },
  { image: serviceSearch, title: "Space Search & Acquisition", desc: `Professional assistance finding, leasing & acquiring office space in ${city} — fast and hassle-free.`, variant: "default" as const },
  { image: serviceInterior, title: "Office Interior Design", desc: `End-to-end office interior solutions in ${city} — from concept ideation to final execution.`, variant: "orange" as const },
  { image: serviceResearch, title: "Market Research & Analysis", desc: `In-depth ${city} commercial real estate analysis to guide your workspace investment decisions.`, variant: "default" as const },
  { image: serviceManagement, title: "Workspace Management", desc: `Comprehensive workspace management in ${city} to maximize occupancy & minimize costs.`, variant: "lime" as const },
  { image: serviceStrategy, title: "Custom Workspace Strategies", desc: `Tailored workspace strategies for businesses in ${city}, designed for your growth profile.`, variant: "default" as const },
];

const variantClasses = {
  default: "bg-card border border-border shadow-md",
  lime: "bg-lime text-foreground shadow-md",
  orange: "bg-accent text-accent-foreground shadow-md",
};

const cityGoals = (city: string) => [
  { icon: Target, title: `Find Your Ideal Office for Rent in ${city} — In Minutes, Not Weeks`, color: "text-lime" },
  { icon: TrendingUp, title: `Boost Productivity with Premium Coworking Desks & Managed Offices in ${city}`, color: "text-accent" },
  { icon: Shield, title: `Flexible Lease Terms & Future-Proof Workspace Strategies`, color: "text-primary-foreground" },
];

const stats = [
  { number: "92%", label: "Client Retention Rate" },
  { number: "3.5x", label: "Avg. Productivity Boost" },
  { number: "40%", label: "Cost Savings Achieved" },
  { number: "< 59 min", label: "Avg. Response Time" },
];

const CityLandingPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const content = citySlug ? cityContent[citySlug] : undefined;

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">City Not Found</h1>
          <Link to="/" className="text-accent underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const areas = areasByCity[content.citySlug] || [];
  const services = cityServices(content.city);
  const goals = cityGoals(content.city);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `EverySpaces – ${content.city}`,
    description: content.metaDescription,
    url: `https://everyspaces.com/office-space/${content.citySlug}`,
    areaServed: { "@type": "Place", name: `${content.city}, ${content.state}` },
    address: {
      "@type": "PostalAddress",
      addressLocality: content.city,
      addressRegion: content.state,
      addressCountry: "IN",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={content.metaTitle}
        description={content.metaDescription}
        canonical={`/office-space/${content.citySlug}`}
        keywords={`coworking space ${content.city}, office space for rent ${content.city}, managed office ${content.city}, shared office ${content.city}, coworking near me, workspace ${content.city}`}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative">
        <div className="bg-secondary pt-10 sm:pt-16 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hex-city" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                  <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex-city)" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{content.city}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] sm:leading-tight">
              {content.heroHeading.split(" in ")[0]} <span className="italic font-normal">in</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>{content.city}
            </h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-16 sm:-mt-20 relative z-20">
          <div className="rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl">
            <img src={heroImg} alt={`Office space and coworking in ${content.city}`} className="w-full h-[200px] sm:h-[300px] md:h-[500px] object-cover" />
          </div>
          <div className="mt-6 sm:mt-8">
            <a href="#contact-form" className="flex items-center justify-between bg-primary text-primary-foreground font-semibold text-base sm:text-lg py-3 sm:py-4 pl-6 sm:pl-8 pr-3 sm:pr-4 rounded-full hover:opacity-90 transition-opacity">
              <span>Find Office Space in {content.city}</span>
              <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center ml-4">
                <ArrowUpRight size={20} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <AnimatedSection>
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold font-sans mb-3">{content.statsHeading}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{content.statsDesc}</p>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-snug">
                  <span className="font-bold">We Make Workspaces</span> Thrive With Expert Management Strategies.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className={`text-2xl sm:text-3xl md:text-4xl font-bold font-serif ${i >= 2 ? "text-accent" : "text-foreground"}`}>{stat.number}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection>
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-8 md:mb-12 gap-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif max-w-xl">
                <span className="font-bold">Expert</span> {content.servicesHeading}
              </h2>
              <a href="#contact-form" className="hidden md:flex w-12 h-12 rounded-full border-2 border-foreground items-center justify-center hover:bg-foreground hover:text-primary-foreground transition-colors shrink-0">
                <ArrowUpRight size={20} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {services.map((service, i) => (
                <div key={i} className={`rounded-2xl p-5 sm:p-7 flex flex-col justify-between min-h-[240px] sm:min-h-[280px] ${variantClasses[service.variant]}`}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-6 sm:mb-8 border-2 border-background/60">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-sans mb-2">{service.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Goals */}
      <AnimatedSection>
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12 bg-dark-green">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary-foreground mb-8 md:mb-12">
              <span className="italic">Why</span> {content.goalsHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {goals.map((goal, i) => (
                <div key={i} className="bg-dark-green-card rounded-none p-6 sm:p-8 flex flex-col items-start justify-between min-h-[180px] sm:min-h-[200px]">
                  <goal.icon size={36} className={goal.color} />
                  <p className="text-primary-foreground text-left text-base sm:text-lg font-medium mt-auto">{goal.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Why This City */}
      <AnimatedSection>
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-8 text-center">{content.whyTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {content.whyPoints.map((point, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-start gap-3 bg-secondary p-5 rounded-2xl">
                  <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm sm:text-base">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonial */}
      <AnimatedSection>
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-8 md:mb-12">
              <span className="italic font-bold">Customer</span> Experiences Real
              <br />Success Stories in {content.city}
            </h2>
            <div className="relative rounded-none overflow-hidden min-h-[300px] sm:min-h-[400px]">
              <img src={testimonialBg} alt={`Workspace in ${content.city}`} className="w-full h-full object-cover absolute inset-0" />
              <div className="relative z-10 flex items-center justify-center min-h-[300px] sm:min-h-[400px] p-4 sm:p-8">
                <div className="bg-card rounded-none p-6 sm:p-8 max-w-md shadow-xl w-full sm:w-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-accent text-3xl font-serif">"</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground text-sm sm:text-base leading-relaxed mb-6">"{content.testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-sm">{content.testimonial.initials}</div>
                    <div>
                      <p className="font-bold text-sm text-foreground">{content.testimonial.name}</p>
                      <p className="text-muted-foreground text-xs">{content.testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* All Areas in This City */}
      <AnimatedSection>
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif mb-6 text-center">
              Explore Office Spaces in <span className="font-bold">{content.city}</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {areas.map((a) => (
                <Link key={a.slug} to={`/office-space/${a.citySlug}/${a.slug}`} className="group bg-card border border-border rounded-2xl p-4 hover:border-accent hover:shadow-md transition-all">
                  <MapPin size={14} className="text-accent mb-1" />
                  <h3 className="text-sm font-bold">{a.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{a.shortDesc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Form */}
      <AnimatedSection>
        <ContactForm />
      </AnimatedSection>

      <AnimatedSection>
        <FooterSection />
      </AnimatedSection>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
};

export default CityLandingPage;
