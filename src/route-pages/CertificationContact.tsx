import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import CertificationLeadForm from "@/components/CertificationLeadForm";

const CertificationContact = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Book Workspace Certification | EverySpaces"
        description="Book an EverySpaces workspace certification review and submit your office or coworking space details for evaluation."
        canonical="/certification/contact-us"
        keywords="workspace certification booking, certification contact, verified workspace evaluation, coworking space certification"
      />
      <Navbar />
      <AnimatedSection>
        <CertificationLeadForm />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default CertificationContact;
