import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import InternalLinksSection from "@/components/InternalLinksSection";
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
        <InternalLinksSection
          eyebrow="Helpful Links"
          title="Research Locations Before You Speak With Us"
          description="These pages make it easier to compare office space options, shortlist cities, and prepare for a faster consultation."
          links={[
            {
              href: "/listings",
              title: "View Office Listings",
              description: "Browse available workspaces by budget, capacity, amenities, and office type.",
            },
            {
              href: "/areas-we-serve",
              title: "Compare All Locations",
              description: "Review every city and micro-market page covered by EverySpaces.",
            },
            {
              href: "/office-space/bangalore",
              title: "Bangalore Office Space",
              description: "Explore managed offices, coworking desks, and private office options across Bangalore.",
            },
            {
              href: "/office-space/hyderabad",
              title: "Hyderabad Office Space",
              description: "Check location-focused workspace options across Hyderabad's leading commercial zones.",
            },
          ]}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default Contact;
