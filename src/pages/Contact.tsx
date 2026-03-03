import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact EverySpaces – Get a Free Office Space Consultation in Bangalore"
        description="Reach out to EverySpaces for expert workspace consulting in Bangalore. Get a free consultation for coworking spaces, private offices & commercial real estate. Quick response guaranteed."
        canonical="/contact"
        keywords="contact EverySpaces, office space consultation Bangalore, workspace advisor Bangalore, coworking inquiry, commercial real estate agent Bangalore, office broker Bangalore"
      />
      <Navbar />
      <AnimatedSection>
        <ContactForm />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default Contact;
