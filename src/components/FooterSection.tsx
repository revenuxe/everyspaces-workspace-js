import { ArrowUpRight, Instagram, Linkedin, MapPin } from "lucide-react";
import { Link } from "@/compat/react-router-dom";
import logo from "@/assets/logo.webp";
import { servicePageLinks } from "@/data/servicePages";

type FooterLink = { label?: string; href?: string; isRoute?: boolean; titleLink?: string };

const footerLinks: Record<string, FooterLink[]> = {
  Navigate: [
    { label: "Home", href: "/", isRoute: true },
    { label: "We help", href: "/we-help", isRoute: true },
    { label: "Listings", href: "/listings", isRoute: true },
    { label: "Areas We Serve", href: "/areas-we-serve", isRoute: true },
    { label: "Blog", href: "/blog", isRoute: true },
    { label: "About Us", href: "/about", isRoute: true },
    { label: "Contact Us", href: "/contact", isRoute: true },
  ],
  Resources: [
    { label: "Office Space for Rent in Bangalore", href: "/blog/office-space-for-rent-in-bangalore", isRoute: true },
    { label: "Best Areas in Bangalore", href: "/blog/best-areas-for-office-space-in-bangalore", isRoute: true },
    { label: "Managed Office vs Coworking", href: "/blog/managed-office-vs-coworking-bangalore", isRoute: true },
    { label: "Certification", href: "/certification", isRoute: true },
    { label: "EverySpaces Journal", href: "/blog", isRoute: true },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy", isRoute: true },
    { label: "Terms & Conditions", href: "/terms-and-conditions", isRoute: true },
  ],
};

const mainAreas = [
  { label: "Koramangala", href: "/office-space/bangalore/koramangala" },
  { label: "HSR Layout", href: "/office-space/bangalore/hsr-layout" },
  { label: "Whitefield", href: "/office-space/bangalore/whitefield" },
  { label: "Indiranagar", href: "/office-space/bangalore/indiranagar" },
  { label: "MG Road", href: "/office-space/bangalore/mg-road" },
  { label: "Electronic City", href: "/office-space/bangalore/electronic-city" },
  { label: "Marathahalli", href: "/office-space/bangalore/marathahalli" },
  { label: "Bellandur", href: "/office-space/bangalore/bellandur" },
  { label: "Hebbal", href: "/office-space/bangalore/hebbal" },
  { label: "JP Nagar", href: "/office-space/bangalore/jp-nagar" },
  { label: "Jayanagar", href: "/office-space/bangalore/jayanagar" },
  { label: "Sarjapur Road", href: "/office-space/bangalore/sarjapur-road" },
];

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
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_1.8fr_2fr] lg:gap-10">
          <div>
            <Link to="/" className="mb-5 inline-flex bg-primary px-3 py-2 rounded-md">
              <img src={logo.src} alt="EverySpaces logo" className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              EverySpaces provides expert workspace consulting, coworking &amp; office space solutions in Bangalore and Bengaluru.
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

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <h4 className="font-bold text-sm mb-3 md:mb-4">Services</h4>
              <ul className="space-y-2">
                {servicePageLinks.slice(0, 6).map((link) => (
                  <li key={link.label}>
                    <Link to={link.href!} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-bold text-sm mb-3 md:mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href!} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm">Areas We Serve</h4>
                <p className="mt-1 text-xs text-muted-foreground">Main Bangalore workspace markets</p>
              </div>
              <MapPin size={20} className="text-accent shrink-0" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
              {mainAreas.map((area) => (
                <Link key={area.href} to={area.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {area.label}
                </Link>
              ))}
            </div>
            <Link
              to="/areas-we-serve"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              View all areas
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-lime-strong py-4 px-4 sm:px-6 text-center">
        <p className="text-xs sm:text-sm text-foreground">© 2026 EverySpaces. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
