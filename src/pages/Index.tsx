import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import GoalsSection from "@/components/GoalsSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="EverySpaces – Best Coworking & Office Space in Bangalore | Workspace Solutions"
        description="Find affordable coworking spaces, private offices & managed workspaces in Bangalore. EverySpaces offers expert workspace consulting, office space for rent & flexible desk solutions for startups & enterprises."
        canonical="/"
        keywords="coworking space Bangalore, office space for rent Bangalore, managed office Bangalore, shared office space, flexible workspace Bangalore, commercial office space, workspace solutions, coworking near me, office on rent Bangalore, HBR Layout office"
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
        <ContactForm />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default Index;
