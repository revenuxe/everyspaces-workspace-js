import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { areasByCity } from "@/data/areas";

const cities = [
  { key: "bangalore", label: "Bangalore" },
  { key: "hyderabad", label: "Hyderabad" },
];

const AreasWeServe = () => {
  const [activeCity, setActiveCity] = useState("bangalore");
  const areas = areasByCity[activeCity] || [];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4">
            <span className="font-bold italic">Areas</span> We Serve
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            From Bangalore's tech corridors to Hyderabad's IT hubs — we help you find the perfect office space in India's top business destinations.
          </p>
        </div>

        {/* City Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {cities.map((city) => (
            <button
              key={city.key}
              onClick={() => setActiveCity(city.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCity === city.key
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              <MapPin size={14} className="inline mr-1.5 -mt-0.5" />
              {city.label}
            </button>
          ))}
        </div>

        {/* Area Cards Grid */}
        <motion.div
          key={activeCity}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
        >
          {areas.map((area) => (
            <Link
              key={area.slug}
              to={`/office-space/${area.citySlug}/${area.slug}`}
              className="group bg-card border border-border rounded-2xl p-4 sm:p-5 hover:border-accent hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                <ChevronRight size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-sm sm:text-base font-bold font-sans mb-1">{area.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{area.shortDesc}</p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AreasWeServe;
