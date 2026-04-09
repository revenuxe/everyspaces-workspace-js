import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import GoalsSection from "@/components/GoalsSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import AreasWeServe from "@/components/AreasWeServe";
import InternalLinksSection from "@/components/InternalLinksSection";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="EverySpaces – Best Coworking & Office Space in Bangalore | Workspace Solutions"
        description="Find affordable coworking spaces, private offices & managed workspaces in Bangalore & Hyderabad. EverySpaces offers expert workspace consulting, office space for rent & flexible desk solutions for startups & enterprises."
        canonical="/"
        keywords="coworking space Bangalore, office space for rent Bangalore, coworking space Hyderabad, managed office Hyderabad, shared office space, flexible workspace Bangalore, commercial office space, workspace solutions, coworking near me, office on rent Bangalore, HITEC City office, Koramangala coworking"
      />
      <Navbar />
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <StatsSection />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <ServicesSection />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <GoalsSection />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <TestimonialSection />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <AreasWeServe />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <InternalLinksSection
          eyebrow="Popular Paths"
          title="Explore Workspace Options by City, Area, and Need"
          description="Move between our highest-intent pages to compare office space, managed workspace, and coworking options across Bangalore and Hyderabad."
          links={[
            {
              href: "/office-space/bangalore",
              title: "Office Space in Bangalore",
              description: "Browse location-focused workspace solutions across Koramangala, Whitefield, HSR Layout, and other Bangalore business hubs.",
            },
            {
              href: "/office-space/hyderabad",
              title: "Office Space in Hyderabad",
              description: "Explore coworking and managed office options in HITEC City, Gachibowli, Madhapur, and nearby Hyderabad locations.",
            },
            {
              href: "/areas-we-serve",
              title: "All Areas We Serve",
              description: "See every city and neighborhood page we cover so you can compare locations side by side.",
            },
            {
              href: "/listings",
              title: "Browse All Listings",
              description: "View live office space and coworking listings with filters for budget, seats, furnishing, and amenities.",
            },
          ]}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <ContactForm />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default Index;
