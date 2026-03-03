import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";

const lastUpdated = "March 1, 2025";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AnimatedSection>
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">Legal</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-4">Privacy Policy</h1>
            <p className="text-primary-foreground/70 text-sm">Last updated: {lastUpdated}</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto prose-sm sm:prose text-foreground">

            <h2 className="text-xl sm:text-2xl font-serif mb-4">1. Introduction</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              EverySpaces ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, use our services, or interact with us in any way. By accessing or using our services, you agree to the terms of this Privacy Policy.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-serif mb-2">2.1 Personal Information You Provide</h3>
            <ul className="list-disc pl-5 text-muted-foreground text-sm leading-relaxed mb-4 space-y-1">
              <li>Full name, email address, and phone number when you submit a contact or inquiry form</li>
              <li>Business name, designation, and workspace requirements shared during consultations</li>
              <li>Any other information you voluntarily provide through our website or communications</li>
            </ul>
            <h3 className="text-lg font-serif mb-2">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-5 text-muted-foreground text-sm leading-relaxed mb-6 space-y-1">
              <li>IP address, browser type, operating system, and device information</li>
              <li>Pages visited, time spent, referral URLs, and click patterns</li>
              <li>Cookies and similar tracking technologies (see Section 6)</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-5 text-muted-foreground text-sm leading-relaxed mb-6 space-y-1">
              <li>Respond to your inquiries and provide workspace consultation services</li>
              <li>Match you with suitable office spaces and workspace solutions</li>
              <li>Send service-related communications, updates, and follow-ups</li>
              <li>Improve our website, services, and user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
              <li>Prevent fraud, abuse, or unauthorized access to our services</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">4. Information Sharing & Disclosure</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">We do <strong>not</strong> sell, trade, or rent your personal information. We may share your data only in the following circumstances:</p>
            <ul className="list-disc pl-5 text-muted-foreground text-sm leading-relaxed mb-6 space-y-1">
              <li><strong>Service Partners:</strong> With workspace providers and property partners solely to fulfill your workspace requirements, with your consent</li>
              <li><strong>Legal Compliance:</strong> When required by law, regulation, court order, or governmental authority</li>
              <li><strong>Business Protection:</strong> To protect the rights, property, or safety of EverySpaces, our users, or the public</li>
              <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website and services, bound by confidentiality agreements</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">5. Data Security</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              We implement industry-standard security measures including SSL encryption, secure servers, access controls, and regular security audits to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of any account credentials.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">6. Cookies & Tracking Technologies</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">Our website uses cookies and similar technologies to:</p>
            <ul className="list-disc pl-5 text-muted-foreground text-sm leading-relaxed mb-4 space-y-1">
              <li>Remember your preferences and provide a personalized experience</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Measure the effectiveness of our communications</li>
            </ul>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              You can control cookies through your browser settings. Disabling cookies may affect the functionality of certain features on our website.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">You have the right to:</p>
            <ul className="list-disc pl-5 text-muted-foreground text-sm leading-relaxed mb-6 space-y-1">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal obligations</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Withdraw Consent:</strong> Withdraw previously given consent for data processing</li>
            </ul>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              To exercise any of these rights, please contact us at <strong>everyspaces.com@gmail.com</strong>.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">8. Data Retention</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Inactive inquiry data is typically deleted within 24 months.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">9. Third-Party Links</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">10. Children's Privacy</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a minor, we will take steps to delete it promptly.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">11. Changes to This Policy</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
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

export default PrivacyPolicy;
