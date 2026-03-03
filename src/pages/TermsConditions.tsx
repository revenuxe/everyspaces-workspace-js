import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";

const lastUpdated = "March 1, 2025";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AnimatedSection>
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">Legal</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-4">Terms & Conditions</h1>
            <p className="text-primary-foreground/70 text-sm">Last updated: {lastUpdated}</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto prose-sm sm:prose text-foreground">

            <h2 className="text-xl sm:text-2xl font-serif mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              By accessing or using the EverySpaces website and services ("Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Services. These Terms constitute a legally binding agreement between you and EverySpaces.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">2. Description of Services</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">EverySpaces provides workspace consulting, search, and management services including but not limited to:</p>
            <ul className="list-disc pl-5 text-muted-foreground text-sm leading-relaxed mb-6 space-y-1">
              <li>Commercial office space search and recommendations</li>
              <li>Coworking space identification and booking assistance</li>
              <li>Workspace strategy consulting and interior design guidance</li>
              <li>Lease negotiation support and workspace portfolio management</li>
              <li>Remote work setup advisory services</li>
            </ul>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              We act as a consulting and advisory service. Final decisions on workspace agreements, leases, or purchases are solely your responsibility.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">By using our Services, you agree to:</p>
            <ul className="list-disc pl-5 text-muted-foreground text-sm leading-relaxed mb-6 space-y-1">
              <li>Provide accurate, current, and complete information when submitting inquiries or forms</li>
              <li>Use our Services only for lawful purposes and in compliance with applicable laws</li>
              <li>Not misrepresent your identity, business, or workspace requirements</li>
              <li>Not attempt to interfere with, disrupt, or gain unauthorized access to our website or systems</li>
              <li>Not reproduce, distribute, or commercially exploit any content from our website without prior written consent</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">4. Intellectual Property</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              All content on the EverySpaces website — including text, graphics, logos, images, designs, layouts, and software — is the property of EverySpaces and is protected by Indian and international intellectual property laws. You may not copy, modify, distribute, sell, or create derivative works from any content without our express written permission.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">5. Service Disclaimer</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              EverySpaces provides workspace recommendations and advisory services on a best-effort basis. We do <strong>not</strong> guarantee the availability, pricing, condition, or suitability of any workspace or property. All workspace listings, market data, and property information are provided "as is" and may change without notice. We recommend independent verification of all property details before making any commitments.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              To the fullest extent permitted by law, EverySpaces, its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services, including but not limited to loss of profits, business interruption, data loss, or damages resulting from reliance on workspace recommendations. Our total liability for any claim shall not exceed the fees paid by you for the specific service giving rise to the claim.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">7. Third-Party Services & Links</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Our Services may involve interactions with third-party workspace providers, property owners, or service vendors. EverySpaces is not a party to any agreement you enter into with third parties and is not responsible for their actions, services, or policies. Any links to third-party websites are provided for convenience only and do not constitute endorsement.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">8. Payment & Fees</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Certain services may involve fees, which will be communicated to you in advance. All fees are non-refundable unless otherwise stated in writing. EverySpaces reserves the right to modify pricing with reasonable notice. Payment terms and methods will be agreed upon before any paid engagement begins.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">9. Confidentiality</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of our engagement. This includes business strategies, financial details, workspace requirements, and any other information marked or reasonably understood as confidential. This obligation survives termination of the engagement.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">10. Indemnification</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              You agree to indemnify, defend, and hold harmless EverySpaces and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, or expenses (including legal fees) arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">11. Termination</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              EverySpaces reserves the right to suspend or terminate your access to the Services at any time, with or without cause, and without prior notice. Upon termination, all provisions of these Terms that should reasonably survive — including intellectual property, limitation of liability, indemnification, and governing law — shall remain in effect.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">12. Governing Law & Dispute Resolution</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of the Services shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India. Both parties agree to attempt resolution through good-faith negotiation before pursuing legal action.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">13. Force Majeure</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              EverySpaces shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, pandemics, government actions, cyber attacks, or infrastructure failures.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">14. Modifications to Terms</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              We reserve the right to update or modify these Terms at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Services after any changes constitutes acceptance of the revised Terms. We recommend reviewing these Terms periodically.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">15. Severability</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">16. Contact Us</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              For questions or concerns about these Terms, please reach out:
            </p>
            <div className="bg-secondary rounded-xl p-5 text-sm text-muted-foreground space-y-1">
              <p><strong className="text-foreground">EverySpaces</strong></p>
              <p>HBR Layout, Bangalore, India</p>
              <p>Email: everyspaces.com@gmail.com</p>
              <p>Phone: +91 98862 85028</p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default TermsConditions;
