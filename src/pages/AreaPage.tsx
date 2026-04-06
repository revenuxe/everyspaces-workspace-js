import { useParams, Link } from "react-router-dom";
import { MapPin, ArrowUpRight, CheckCircle2, Building2, Users, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { getAreaBySlug, areasByCity } from "@/data/areas";
import { motion } from "framer-motion";

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

  const otherAreas = (areasByCity[area.citySlug] || []).filter((a) => a.slug !== area.slug).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `EverySpaces – ${area.name}, ${area.city}`,
    description: area.metaDescription,
    url: `https://everyspaces.com/office-space/${area.citySlug}/${area.slug}`,
    areaServed: {
      "@type": "Place",
      name: `${area.name}, ${area.city}`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: area.city,
      addressRegion: area.city === "Bangalore" ? "Karnataka" : "Telangana",
      addressCountry: "IN",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={area.metaTitle}
        description={area.metaDescription}
        canonical={`/office-space/${area.citySlug}/${area.slug}`}
        keywords={`coworking space ${area.name}, office space ${area.name} ${area.city}, managed office ${area.name}, shared office ${area.name}, coworking near ${area.name}, workspace ${area.name} ${area.city}`}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-12 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span>{area.city}</span>
            <span>/</span>
            <span className="text-foreground font-medium">{area.name}</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
              {area.heroHeading}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
              {area.heroSubheading}
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform text-sm"
            >
              Find Office in {area.name}
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <AnimatedSection>
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Building2, label: `Office Spaces in ${area.name}`, value: "50+" },
              { icon: Users, label: "Happy Teams Placed", value: "200+" },
              { icon: Clock, label: "Avg. Search Time", value: "< 3 days" },
              { icon: Star, label: "Client Satisfaction", value: "4.9/5" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <stat.icon size={24} className="text-accent mb-2 mx-auto md:mx-0" />
                <p className="text-2xl sm:text-3xl font-bold font-serif">{stat.value}</p>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Why This Area */}
      <AnimatedSection>
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12 bg-dark-green">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary-foreground mb-8 md:mb-12 text-center">
              {area.whyTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {area.whyPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3 bg-dark-green-card p-5 rounded-none"
                >
                  <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-primary-foreground text-sm sm:text-base">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Popular For */}
      <AnimatedSection>
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-serif mb-6">
              <span className="font-bold">{area.name}</span> is Popular For
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {area.popularFor.map((tag) => (
                <span key={tag} className="bg-secondary text-foreground px-4 py-2 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Other Areas in Same City */}
      {otherAreas.length > 0 && (
        <AnimatedSection>
          <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-secondary">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif mb-6 text-center">
                Explore More Areas in <span className="font-bold">{area.city}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
                {otherAreas.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/office-space/${a.citySlug}/${a.slug}`}
                    className="group bg-card border border-border rounded-2xl p-4 hover:border-accent hover:shadow-md transition-all"
                  >
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

      {/* Contact Form */}
      <AnimatedSection>
        <ContactForm />
      </AnimatedSection>

      <AnimatedSection>
        <FooterSection />
      </AnimatedSection>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default AreaPage;
