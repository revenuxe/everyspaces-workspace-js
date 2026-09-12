import { Link } from "@/compat/react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { allAreas } from "@/data/areas";

const AreasWeServe = () => (
  <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="mb-10 md:mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Find your location</p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Workspace in the right neighborhood</h2>
          <p className="text-base leading-7 text-muted-foreground">Explore office space and coworking across Bangalore's business hubs, close to your team and your customers.</p>
        </div>
        <Link to="/areas-we-serve" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold underline underline-offset-4">View all areas <ArrowUpRight size={18} /></Link>
      </div>
      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allAreas.slice(0, 8).map((area) => (
          <Link key={area.slug} to={`/office-space/${area.citySlug}/${area.slug}`} className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-accent transition-colors">
            <MapPin size={20} className="shrink-0 text-accent" />
            <div className="min-w-0 flex-1">
              <h3 className="font-sans font-semibold text-sm sm:text-base">{area.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{area.city}</p>
            </div>
            <ArrowUpRight size={16} className="shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  </section>
);
export default AreasWeServe;
