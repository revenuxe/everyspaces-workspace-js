import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { areasByCity } from "@/data/areas";
import { motion } from "framer-motion";

const cities = [
  { key: "bangalore", label: "Bangalore", state: "Karnataka" },
  { key: "hyderabad", label: "Hyderabad", state: "Telangana" },
];

const AreasWeServePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Areas We Serve – Office Space & Coworking Locations | EverySpaces"
        description="Explore all locations where EverySpaces provides coworking spaces, office space for rent & managed workspaces. Serving Bangalore, Hyderabad & more."
        canonical="/areas-we-serve"
        keywords="coworking space locations, office space for rent, coworking near me, office space Bangalore, coworking Hyderabad, managed office locations"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative">
        <div className="bg-secondary pt-10 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                  <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex)" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Areas We Serve</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.1] sm:leading-tight mb-4">
              <span className="italic font-normal">All</span> Areas We Serve
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
              Find premium coworking spaces, private offices &amp; managed workspaces across India's leading business cities. Browse by location to find office space near you.
            </p>
          </div>
        </div>
      </section>

      {/* City Sections */}
      {cities.map((city) => {
        const areas = areasByCity[city.key] || [];
        return (
          <AnimatedSection key={city.key}>
            <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-12">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <MapPin size={24} className="text-accent" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif">
                    <span className="font-bold">{city.label}</span>, {city.state}
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {areas.map((area) => (
                    <motion.div
                      key={area.slug}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to={`/office-space/${area.citySlug}/${area.slug}`}
                        className="group block bg-card border border-border rounded-2xl p-4 sm:p-5 hover:border-accent hover:shadow-md transition-all h-full"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                          <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold font-sans mb-1">{area.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{area.shortDesc}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>
        );
      })}

      <AnimatedSection>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default AreasWeServePage;
