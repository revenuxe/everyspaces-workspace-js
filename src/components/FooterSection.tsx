const footerLinks = {
  "About Us": ["Our Story", "Mission & Vision", "Our Values", "Leadership Team"],
  Career: ["Job Opportunities", "Internship Programs", "Employee Benefits", "Join Our Team"],
  Blog: ["Latest Articles", "Market Trends", "Workspace Tips", "Community Stories"],
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
            <a
              href="#"
              className="inline-block bg-accent text-accent-foreground font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:scale-105 transition-transform text-sm"
            >
              Get Started Now
            </a>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-1">Address</h4>
              <p className="text-sm text-muted-foreground">
                EverySpaces HQ<br />
                123 Business Avenue,<br />
                Tech District,<br />
                San Francisco, CA
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Email</h4>
              <p className="text-sm text-muted-foreground">contact@everyspaces.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-border py-8 md:py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              EverySpaces provides expert workspace services, offering tailored solutions and premium coworking experiences.
            </p>
            <p className="text-xs text-muted-foreground mb-2">Visit us on:</p>
            <div className="flex gap-3">
              {["X", "IG", "TH", "TK"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-full border border-foreground flex items-center justify-center text-xs font-bold hover:bg-foreground hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm mb-3 md:mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-lime-strong py-4 px-4 sm:px-6 text-center">
        <p className="text-xs sm:text-sm text-foreground">© 2024 EverySpaces. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
