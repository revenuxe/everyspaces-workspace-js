import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, MapPin, Users, Phone, Calendar, X, Wifi, Car, Snowflake, Shield, Coffee, Zap, UserCheck, Printer, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

interface Property {
  id: string;
  name: string;
  slug: string;
  city: string;
  area: string;
  address: string | null;
  price: number | null;
  seating_capacity: number | null;
  sqft: number | null;
  short_description: string | null;
  furnishing_type: string | null;
  featured_image: string | null;
  is_featured: boolean;
  property_type: { name: string } | null;
  amenities: { name: string; icon: string | null }[];
}

const amenityIcons: Record<string, React.ElementType> = {
  Wifi, Car, Snowflake, Shield, Coffee, Zap, UserCheck, Printer, Users,
};

const ListingsPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [propertyTypes, setPropertyTypes] = useState<{ id: string; name: string }[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<{ id: string; name: string }[]>([]);

  // Search & Filter state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchBudget, setSearchBudget] = useState("");
  const [searchCapacity, setSearchCapacity] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([0, 500000]);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterAmenities, setFilterAmenities] = useState<string[]>([]);
  const [filterFurnishing, setFilterFurnishing] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [propRes, typesRes, amenRes] = await Promise.all([
        supabase.from("properties").select(`
          id, name, slug, city, area, address, price, seating_capacity, sqft,
          short_description, furnishing_type, featured_image, is_featured,
          property_types(name),
          property_amenities(amenities(name, icon))
        `).eq("status", "active").order("is_featured", { ascending: false }).order("created_at", { ascending: false }),
        supabase.from("property_types").select("id, name").order("name"),
        supabase.from("amenities").select("id, name").order("name"),
      ]);

      const mapped = (propRes.data || []).map((p: any) => ({
        ...p,
        property_type: p.property_types,
        amenities: (p.property_amenities || []).map((pa: any) => pa.amenities).filter(Boolean),
      }));
      setProperties(mapped);
      setPropertyTypes(typesRes.data || []);
      setAmenitiesList(amenRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const activeFilterCount = [
    filterTypes.length > 0,
    filterAmenities.length > 0,
    filterFurnishing !== "",
    filterPriceRange[0] > 0 || filterPriceRange[1] < 500000,
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (searchLocation && !`${p.city} ${p.area}`.toLowerCase().includes(searchLocation.toLowerCase())) return false;
      if (searchType && p.property_type?.name !== searchType) return false;
      if (searchBudget) {
        const budget = parseInt(searchBudget);
        if (p.price && p.price > budget) return false;
      }
      if (searchCapacity) {
        const cap = parseInt(searchCapacity);
        if (p.seating_capacity && p.seating_capacity < cap) return false;
      }
      if (p.price && (p.price < filterPriceRange[0] || p.price > filterPriceRange[1])) return false;
      if (filterTypes.length > 0 && (!p.property_type || !filterTypes.includes(p.property_type.name))) return false;
      if (filterFurnishing && p.furnishing_type !== filterFurnishing) return false;
      if (filterAmenities.length > 0) {
        const propAmenNames = p.amenities.map((a) => a.name);
        if (!filterAmenities.every((fa) => propAmenNames.includes(fa))) return false;
      }
      return true;
    });
  }, [properties, searchLocation, searchType, searchBudget, searchCapacity, filterPriceRange, filterTypes, filterAmenities, filterFurnishing]);

  const clearAllFilters = () => {
    setFilterTypes([]);
    setFilterAmenities([]);
    setFilterFurnishing("");
    setFilterPriceRange([0, 500000]);
    setSearchLocation("");
    setSearchType("");
    setSearchBudget("");
    setSearchCapacity("");
  };

  const formatPrice = (price: number) => {
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
    return `₹${price}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Office Space & Coworking Listings | EverySpaces"
        description="Browse premium office spaces, coworking desks & managed workspaces for rent in Bangalore & Hyderabad. Filter by location, budget, capacity & amenities."
        canonical="/listings"
        keywords="office space listings, coworking space for rent, office space Bangalore, coworking Hyderabad, managed office listings"
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-10 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hex-list" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-list)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-4">
            <span className="italic font-normal">Find</span> Your Perfect Workspace
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mb-8">
            Browse curated office spaces, coworking desks & managed workspaces across Bangalore & Hyderabad.
          </p>

          {/* Search Bar */}
          <div className="bg-card border border-border rounded-2xl p-3 sm:p-4 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {/* Location - text search */}
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Search location..."
                  className="w-full pl-9 pr-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="relative">
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="w-full px-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent appearance-none">
                  <option value="">All Types</option>
                  {propertyTypes.map((t) => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
              <div>
                <input type="number" placeholder="Max Budget (₹)" value={searchBudget} onChange={(e) => setSearchBudget(e.target.value)} className="w-full px-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <input type="number" placeholder="Min Seats" value={searchCapacity} onChange={(e) => setSearchCapacity(e.target.value)} className="w-full px-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <Search size={16} /> Search
                </button>
                <button onClick={() => setShowFilters(!showFilters)} className={`w-12 rounded-xl border flex items-center justify-center transition-colors relative ${showFilters ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background hover:bg-muted"}`}>
                  <SlidersHorizontal size={16} />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">{activeFilterCount}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.section initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-border bg-card/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-sm">Filters</h3>
                  {activeFilterCount > 0 && (
                    <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">{activeFilterCount} active</span>
                  )}
                </div>
                <button onClick={clearAllFilters} className="text-xs text-destructive hover:underline font-medium">Clear All</button>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-3 block uppercase tracking-wide">Price Range (₹/month)</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-[10px] text-muted-foreground mb-1 block">Min</label>
                      <input type="number" value={filterPriceRange[0]} onChange={(e) => setFilterPriceRange([parseInt(e.target.value) || 0, filterPriceRange[1]])} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="₹0" />
                    </div>
                    <span className="text-muted-foreground text-xs mt-5">—</span>
                    <div className="flex-1">
                      <label className="text-[10px] text-muted-foreground mb-1 block">Max</label>
                      <input type="number" value={filterPriceRange[1]} onChange={(e) => setFilterPriceRange([filterPriceRange[0], parseInt(e.target.value) || 500000])} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="₹5,00,000" />
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-3 block uppercase tracking-wide">Property Type</label>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((t) => (
                      <button key={t.id} onClick={() => setFilterTypes((prev) => prev.includes(t.name) ? prev.filter((n) => n !== t.name) : [...prev, t.name])} className={`text-xs px-4 py-2 rounded-full border-2 transition-all font-medium ${filterTypes.includes(t.name) ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-border hover:border-primary/40 bg-background"}`}>
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Furnishing */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-3 block uppercase tracking-wide">Furnishing</label>
                  <div className="flex flex-wrap gap-2">
                    {["Fully Furnished", "Semi Furnished", "Unfurnished"].map((f) => (
                      <button key={f} onClick={() => setFilterFurnishing(filterFurnishing === f ? "" : f)} className={`text-xs px-4 py-2 rounded-full border-2 transition-all font-medium ${filterFurnishing === f ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-border hover:border-primary/40 bg-background"}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-3 block uppercase tracking-wide">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesList.map((a) => (
                      <button key={a.id} onClick={() => setFilterAmenities((prev) => prev.includes(a.name) ? prev.filter((n) => n !== a.name) : [...prev, a.name])} className={`text-xs px-4 py-2 rounded-full border-2 transition-all font-medium ${filterAmenities.includes(a.name) ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-border hover:border-primary/40 bg-background"}`}>
                        {a.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4">
          <div className="flex flex-wrap gap-2">
            {filterTypes.map((t) => (
              <button key={t} onClick={() => setFilterTypes((prev) => prev.filter((n) => n !== t))} className="text-[11px] bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1.5 font-medium hover:bg-primary/20 transition-colors">
                {t} <X size={10} />
              </button>
            ))}
            {filterAmenities.map((a) => (
              <button key={a} onClick={() => setFilterAmenities((prev) => prev.filter((n) => n !== a))} className="text-[11px] bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1.5 font-medium hover:bg-accent/20 transition-colors">
                {a} <X size={10} />
              </button>
            ))}
            {filterFurnishing && (
              <button onClick={() => setFilterFurnishing("")} className="text-[11px] bg-secondary text-foreground px-3 py-1 rounded-full flex items-center gap-1.5 font-medium hover:bg-secondary/80 transition-colors">
                {filterFurnishing} <X size={10} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Listings Grid */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} workspace{filtered.length !== 1 ? "s" : ""} found</p>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="h-8 w-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-lg font-serif mb-2">No properties found</h3>
              <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search criteria.</p>
              {activeFilterCount > 0 && (
                <button onClick={clearAllFilters} className="text-sm text-accent hover:underline font-medium">Clear all filters</button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((prop, i) => (
                <motion.div key={prop.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                    {/* Image */}
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      {prop.featured_image ? (
                        <img src={prop.featured_image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <MapPin size={32} className="text-muted-foreground/30" />
                        </div>
                      )}
                      {prop.is_featured && (
                        <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">Featured</span>
                      )}
                      {prop.property_type && (
                        <span className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-[10px] font-medium px-2.5 py-1 rounded-full">{prop.property_type.name}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="font-bold text-base font-sans mb-1 truncate">{prop.name}</h3>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                        <MapPin size={12} />
                        <span>{prop.area}, {prop.city}</span>
                      </div>
                      
                      {prop.price && (
                        <p className="text-lg font-bold text-accent mb-2">{formatPrice(prop.price)}<span className="text-xs font-normal text-muted-foreground">/month</span></p>
                      )}

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {prop.furnishing_type && (
                          <span className="text-[10px] bg-secondary text-foreground px-2 py-0.5 rounded-full">{prop.furnishing_type}</span>
                        )}
                        {prop.seating_capacity && (
                          <span className="text-[10px] bg-secondary text-foreground px-2 py-0.5 rounded-full">{prop.seating_capacity} Seats</span>
                        )}
                      </div>

                      {/* Amenity tags */}
                      {prop.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {prop.amenities.slice(0, 4).map((a) => {
                            const Icon = amenityIcons[a.icon || ""] || Wifi;
                            return (
                              <span key={a.name} className="text-[10px] text-muted-foreground flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full">
                                <Icon size={10} /> {a.name}
                              </span>
                            );
                          })}
                          {prop.amenities.length > 4 && (
                            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">+{prop.amenities.length - 4}</span>
                          )}
                        </div>
                      )}

                      {/* CTAs */}
                      <div className="flex gap-2">
                        <Link to={`/listings/${prop.slug}`} className="flex-1 bg-primary text-primary-foreground text-xs font-semibold py-2.5 rounded-full text-center hover:opacity-90 transition-opacity">
                          View Details
                        </Link>
                        <a href="tel:+919886285028" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0">
                          <Phone size={14} />
                        </a>
                        <a href={`https://wa.me/919886285028?text=${encodeURIComponent(`Hi, I'm interested in: ${prop.name}`)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0">
                          <Calendar size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatedSection>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default ListingsPage;
