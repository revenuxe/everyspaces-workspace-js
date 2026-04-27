import { Linkedin, Instagram } from "lucide-react";
import { Link } from "@/compat/react-router-dom";
import logo from "@/assets/logo.webp";
import { servicePageLinks } from "@/data/servicePages";

type FooterLink = { label?: string; href?: string; isRoute?: boolean; titleLink?: string };

const footerLinks: Record<string, FooterLink[]> = {
  "Quick Links": [
    { label: "Home", href: "/", isRoute: true },
    { label: "Blog", href: "/blog", isRoute: true },
    { label: "Certification", href: "/certification", isRoute: true },
    { label: "Listings", href: "/listings", isRoute: true },
    { label: "Areas We Serve", href: "/areas-we-serve", isRoute: true },
    { label: "About Us", href: "/about", isRoute: true },
    { label: "Contact Us", href: "#contact-form", isRoute: false },
  ],
  Services: servicePageLinks,
  "Bangalore": [
    { label: "Koramangala", href: "/office-space/bangalore/koramangala", isRoute: true },
    { label: "HSR Layout", href: "/office-space/bangalore/hsr-layout", isRoute: true },
    { label: "Whitefield", href: "/office-space/bangalore/whitefield", isRoute: true },
    { label: "Indiranagar", href: "/office-space/bangalore/indiranagar", isRoute: true },
    { titleLink: "/office-space/bangalore" },
  ],
  "Hyderabad": [
    { label: "HITEC City", href: "/office-space/hyderabad/hitec-city", isRoute: true },
    { label: "Gachibowli", href: "/office-space/hyderabad/gachibowli", isRoute: true },
    { label: "Madhapur", href: "/office-space/hyderabad/madhapur", isRoute: true },
    { label: "Kondapur", href: "/office-space/hyderabad/kondapur", isRoute: true },
    { titleLink: "/office-space/hyderabad" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy", isRoute: true },
    { label: "Terms & Conditions", href: "/terms-and-conditions", isRoute: true },
  ],
};

const FooterSection = () => {
  return (
    <footer id="contact" className="bg-secondary">
      {/* CTA area */}
      <div className="py-10 md:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-12">
          <div className="max-w-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-snug mb-6 md:mb-8">
              <span className="italic">Find</span> your perfect workspace today. Contact us for expert guidance!
            </h2>
            <Link
              to="/contact"
              className="inline-block bg-accent text-accent-foreground font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:scale-105 transition-transform text-sm"
            >
              Get Started Now
            </Link>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-1">Address</h4>
              <p className="text-sm text-muted-foreground">
                EverySpaces HQ<br />
                HBR Layout,<br />
                Bangalore, India
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Phone</h4>
              <p className="text-sm text-muted-foreground">+91 98862 85028</p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Email</h4>
              <p className="text-sm text-muted-foreground">everyspaces.com@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-border py-8 md:py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 md:gap-8">
          <div className="col-span-2">
            <Link to="/" className="mb-5 inline-flex bg-primary px-3 py-2 rounded-md">
              <img src={logo.src} alt="EverySpaces logo" className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              EverySpaces provides expert workspace consulting, coworking &amp; office space solutions in Bangalore and Hyderabad.
            </p>
            <p className="text-xs text-muted-foreground mb-2">Visit us on:</p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/company/everyspaces" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground hover:text-primary-foreground transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="https://www.instagram.com/every.spaces/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground hover:text-primary-foreground transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => {
            const titleLinkItem = links.find((l) => l.titleLink);
            const displayLinks = links.filter((l) => l.label);
            return (
              <div key={title}>
                <h4 className="font-bold text-sm mb-3 md:mb-4">
                  {titleLinkItem ? (
                    <Link to={titleLinkItem.titleLink!} className="hover:text-accent transition-colors">
                      {title}
                    </Link>
                  ) : (
                    title
                  )}
                </h4>
                <ul className="space-y-2">
                  {displayLinks.map((link) => (
                    <li key={link.label}>
                      {link.isRoute ? (
                        <Link to={link.href!} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-lime-strong py-4 px-4 sm:px-6 text-center">
        <p className="text-xs sm:text-sm text-foreground">© 2025 EverySpaces. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
