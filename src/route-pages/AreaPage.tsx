"use client";

import { useParams, Link } from "@/compat/react-router-dom";
import { MapPin, ArrowUpRight, CheckCircle2, Star, Target, TrendingUp, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import InternalLinksSection from "@/components/InternalLinksSection";
import SEOHead from "@/components/SEOHead";
import ExpandableServicesSection, { getLocationServices } from "@/components/ExpandableServicesSection";
import { getAreaBySlug, areasByCity } from "@/data/areas";
import { absoluteUrl } from "@/lib/seo";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-workspace.png";
import testimonialBg from "@/assets/testimonial-bg.png";

const areaGoals = (areaName: string) => [
  { icon: Target, title: `Find Your Ideal Office for Rent in ${areaName} — In Minutes, Not Weeks`, color: "text-lime" },
  { icon: TrendingUp, title: `Boost Productivity with Premium Coworking Desks & Managed Offices`, color: "text-accent" },
  { icon: Shield, title: `Flexible Lease Terms & Future-Proof Workspace Strategies in ${areaName}`, color: "text-primary-foreground" },
];

const AreaPage = () => {
  const { citySlug, areaSlug } = useParams<{ citySlug: string; areaSlug: string }>();
  const area = citySlug && areaSlug ? getAreaBySlug(citySlug, areaSlug) : undefined;

  if (!area) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Area Not Found</h1>
          <Link to="/" className="text-accent underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const otherAreas = (areasByCity[area.citySlug] || []).filter((a) => a.slug !== area.slug).slice(0, 8);
  const services = getLocationServices(`${area.name}, ${area.city}`);
  const goals = areaGoals(area.name);

  const stats = [
    { number: "92%", label: "Client Retention Rate" },
    { number: "3.5x", label: "Avg. Productivity Boost" },
    { number: "40%", label: "Cost Savings Achieved" },
    { number: "< 59 min", label: "Avg. Response Time" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `EverySpaces – ${area.name}, ${area.city}`,
    description: area.metaDescription,
    url: absoluteUrl(`/office-space/${area.citySlug}/${area.slug}`),
    areaServed: { "@type": "Place", name: `${area.name}, ${area.city}` },
    address: { "@type": "PostalAddress", addressLocality: area.city, addressRegion: area.city === "Bangalore" ? "Karnataka" : "Telangana", addressCountry: "IN" },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={area.metaTitle} description={area.metaDescription} canonical={`/office-space/${area.citySlug}/${area.slug}`} keywords={`coworking space ${area.name}, office space ${area.name} ${area.city}, managed office ${area.name}, shared office ${area.name}, coworking near ${area.name}, workspace ${area.name}`} />
      <Navbar />

      {/* Hero */}
      <section className="relative">
        <div className="bg-secondary pt-10 sm:pt-16 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)"><path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#hex)" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link><span>/</span>
              <Link to={`/office-space/${area.citySlug}`} className="hover:text-foreground transition-colors">{area.city}</Link><span>/</span>
              <span className="text-foreground font-medium">{area.name}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] sm:leading-tight">
              {area.heroHeading.split(" in ")[0]} <span className="italic font-normal">in</span>
              <br className="hidden sm:block" /><span className="sm:hidden"> </span>{area.name}
            </h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-16 sm:-mt-20 relative z-20">
          <div className="rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl">
            <img src={heroImg.src} alt={`Office space and coworking in ${area.name}, ${area.city}`} className="w-full h-[200px] sm:h-[300px] md:h-[500px] object-cover" />
          </div>
          <div className="mt-6 sm:mt-8">
            <a href="#contact-form" className="flex items-center justify-between bg-primary text-primary-foreground font-semibold text-base sm:text-lg py-3 sm:py-4 pl-6 sm:pl-8 pr-3 sm:pr-4 rounded-full hover:opacity-90 transition-opacity">
              <span>Find Office Space in {area.name}</span>
              <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center ml-4"><ArrowUpRight size={20} /></span>
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
                <h3 className="text-lg sm:text-xl font-semibold font-sans mb-3">{area.statsHeading}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{area.heroSubheading}</p>
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

      {/* Services with Expand */}
      <AnimatedSection>
        <ExpandableServicesSection heading={area.servicesHeading} services={services} />
      </AnimatedSection>

      {/* Goals */}
      <AnimatedSection>
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12 bg-dark-green">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary-foreground mb-8 md:mb-12">
              <span className="italic">Why</span> {area.goalsHeading}
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

      {/* Why This Area */}
      <AnimatedSection>
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-8 text-center">{area.whyTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {area.whyPoints.map((point, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-start gap-3 bg-secondary p-5 rounded-2xl">
                  <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm sm:text-base">{point}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <h3 className="text-lg font-semibold mb-3">{area.name} is Popular For</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {area.popularFor.map((tag) => (
                  <span key={tag} className="bg-secondary text-foreground px-4 py-2 rounded-full text-sm font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonial */}
      <AnimatedSection>
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-8 md:mb-12">
              <span className="italic font-bold">Customer</span> Experiences Real<br />Success Stories in {area.name}
            </h2>
            <div className="relative rounded-none overflow-hidden min-h-[300px] sm:min-h-[400px]">
              <img src={testimonialBg.src} alt={`Workspace in ${area.name}`} className="w-full h-full object-cover absolute inset-0" />
              <div className="relative z-10 flex items-center justify-center min-h-[300px] sm:min-h-[400px] p-4 sm:p-8">
                <div className="bg-card rounded-none p-6 sm:p-8 max-w-md shadow-xl w-full sm:w-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-accent text-3xl font-serif">"</span>
                    <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}</div>
                  </div>
                  <p className="text-foreground text-sm sm:text-base leading-relaxed mb-6">"{area.testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-sm">{area.testimonial.initials}</div>
                    <div>
                      <p className="font-bold text-sm text-foreground">{area.testimonial.name}</p>
                      <p className="text-muted-foreground text-xs">{area.testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Other Areas */}
      {otherAreas.length > 0 && (
        <AnimatedSection>
          <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-secondary">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif mb-6 text-center">Explore More Office Spaces in <span className="font-bold">{area.city}</span></h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
                {otherAreas.map((a) => (
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
      )}

      <AnimatedSection>
        <InternalLinksSection
          eyebrow="Nearby Options"
          title={`Compare ${area.name} With Other Workspace Pages`}
          description={`Use these related internal links to compare ${area.name} with nearby markets, city-level guidance, and current office listings.`}
          links={[
            {
              href: `/office-space/${area.citySlug}`,
              title: `${area.city} Office Space Guide`,
              description: `Go broader and compare ${area.name} with the strongest office and coworking markets across ${area.city}.`,
            },
            ...otherAreas.slice(0, 2).map((nearbyArea) => ({
              href: `/office-space/${nearbyArea.citySlug}/${nearbyArea.slug}`,
              title: `Workspace in ${nearbyArea.name}`,
              description: `Compare office space, commute patterns, and business demand in ${nearbyArea.name}.`,
            })),
            {
              href: "/listings",
              title: "Browse Available Listings",
              description: "Shift from area research into live workspace inventory filtered by seats, budget, and amenities.",
            },
          ]}
        />
      </AnimatedSection>

      <AnimatedSection><ContactForm /></AnimatedSection>
      <AnimatedSection><FooterSection /></AnimatedSection>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
};

export default AreaPage;



