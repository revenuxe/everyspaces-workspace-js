"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/compat/react-router-dom";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Users,
  Phone,
  Calendar,
  X,
  Wifi,
  Car,
  Snowflake,
  Shield,
  Coffee,
  Zap,
  UserCheck,
  Printer,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import InternalLinksSection from "@/components/InternalLinksSection";
import { supabase } from "@/integrations/supabase/client";

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

interface ListingsPageProps {
  initialProperties?: Property[];
  initialPropertyTypes?: { id: string; name: string }[];
  initialAmenitiesList?: { id: string; name: string }[];
}

const amenityIcons: Record<string, React.ElementType> = {
  Wifi,
  Car,
  Snowflake,
  Shield,
  Coffee,
  Zap,
  UserCheck,
  Printer,
  Users,
};

const ListingsPage = ({
  initialProperties = [],
  initialPropertyTypes = [],
  initialAmenitiesList = [],
}: ListingsPageProps) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [loading, setLoading] = useState(initialProperties.length === 0);
  const [propertyTypes, setPropertyTypes] = useState<{ id: string; name: string }[]>(initialPropertyTypes);
  const [amenitiesList, setAmenitiesList] = useState<{ id: string; name: string }[]>(initialAmenitiesList);
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
    if (initialProperties.length > 0) {
      return;
    }

    const fetchData = async () => {
      const [propRes, typesRes, amenRes] = await Promise.all([
        supabase
          .from("properties")
          .select(`
            id, name, slug, city, area, address, price, seating_capacity, sqft,
            short_description, furnishing_type, featured_image, is_featured,
            property_types(name),
            property_amenities(amenities(name, icon))
          `)
          .eq("status", "active")
          .order("is_featured", { ascending: false })
          .order("created_at", { ascending: false }),
        supabase.from("property_types").select("id, name").order("name"),
        supabase.from("amenities").select("id, name").order("name"),
      ]);

      const mapped = (propRes.data || []).map((property: any) => ({
        ...property,
        property_type: property.property_types,
        amenities: (property.property_amenities || []).map((item: any) => item.amenities).filter(Boolean),
      }));

      setProperties(mapped);
      setPropertyTypes(typesRes.data || []);
      setAmenitiesList(amenRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, [initialProperties.length]);

  const activeFilterCount = [
    filterTypes.length > 0,
    filterAmenities.length > 0,
    filterFurnishing !== "",
    filterPriceRange[0] > 0 || filterPriceRange[1] < 500000,
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      if (searchLocation && !`${property.city} ${property.area}`.toLowerCase().includes(searchLocation.toLowerCase())) return false;
      if (searchType && property.property_type?.name !== searchType) return false;
      if (searchBudget) {
        const budget = parseInt(searchBudget, 10);
        if (property.price && property.price > budget) return false;
      }
      if (searchCapacity) {
        const capacity = parseInt(searchCapacity, 10);
        if (property.seating_capacity && property.seating_capacity < capacity) return false;
      }
      if (property.price && (property.price < filterPriceRange[0] || property.price > filterPriceRange[1])) return false;
      if (filterTypes.length > 0 && (!property.property_type || !filterTypes.includes(property.property_type.name))) return false;
      if (filterFurnishing && property.furnishing_type !== filterFurnishing) return false;
      if (filterAmenities.length > 0) {
        const propertyAmenityNames = property.amenities.map((amenity) => amenity.name);
        if (!filterAmenities.every((amenity) => propertyAmenityNames.includes(amenity))) return false;
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
    if (price >= 100000) return `INR ${(price / 100000).toFixed(1)}L`;
    if (price >= 1000) return `INR ${(price / 1000).toFixed(0)}K`;
    return `INR ${price}`;
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

          <div className="bg-card border border-border rounded-2xl p-3 sm:p-4 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} placeholder="Search location..." className="w-full pl-9 pr-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="relative">
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="w-full px-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent appearance-none">
                  <option value="">All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type.id} value={type.name}>{type.name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
              <div>
                <input type="number" placeholder="Max Budget (INR)" value={searchBudget} onChange={(e) => setSearchBudget(e.target.value)} className="w-full px-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <input type="number" placeholder="Min Seats" value={searchCapacity} onChange={(e) => setSearchCapacity(e.target.value)} className="w-full px-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="flex gap-2">
                <button type="button" className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <Search size={16} /> Search
                </button>
                <button type="button" onClick={() => setShowFilters(!showFilters)} className={`w-12 rounded-xl border flex items-center justify-center transition-colors relative ${showFilters ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background hover:bg-muted"}`}>
                  <SlidersHorizontal size={16} />
                  {activeFilterCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">{activeFilterCount}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showFilters && (
          <motion.section initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-border bg-card/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-sm">Filters</h3>
                  {activeFilterCount > 0 && <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">{activeFilterCount} active</span>}
                </div>
                <button type="button" onClick={clearAllFilters} className="text-xs text-destructive hover:underline font-medium">Clear All</button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-3 block uppercase tracking-wide">Price Range (INR/month)</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-[10px] text-muted-foreground mb-1 block">Min</label>
                      <input type="number" value={filterPriceRange[0]} onChange={(e) => setFilterPriceRange([parseInt(e.target.value, 10) || 0, filterPriceRange[1]])} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="0" />
                    </div>
                    <span className="text-muted-foreground text-xs mt-5">-</span>
                    <div className="flex-1">
                      <label className="text-[10px] text-muted-foreground mb-1 block">Max</label>
                      <input type="number" value={filterPriceRange[1]} onChange={(e) => setFilterPriceRange([filterPriceRange[0], parseInt(e.target.value, 10) || 500000])} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="500000" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-3 block uppercase tracking-wide">Property Type</label>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                      <button type="button" key={type.id} onClick={() => setFilterTypes((prev) => prev.includes(type.name) ? prev.filter((name) => name !== type.name) : [...prev, type.name])} className={`text-xs px-4 py-2 rounded-full border-2 transition-all font-medium ${filterTypes.includes(type.name) ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-border hover:border-primary/40 bg-background"}`}>
                        {type.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-3 block uppercase tracking-wide">Furnishing</label>
                  <div className="flex flex-wrap gap-2">
                    {["Fully Furnished", "Semi Furnished", "Unfurnished"].map((furnishing) => (
                      <button type="button" key={furnishing} onClick={() => setFilterFurnishing(filterFurnishing === furnishing ? "" : furnishing)} className={`text-xs px-4 py-2 rounded-full border-2 transition-all font-medium ${filterFurnishing === furnishing ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-border hover:border-primary/40 bg-background"}`}>
                        {furnishing}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-3 block uppercase tracking-wide">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesList.map((amenity) => (
                      <button type="button" key={amenity.id} onClick={() => setFilterAmenities((prev) => prev.includes(amenity.name) ? prev.filter((name) => name !== amenity.name) : [...prev, amenity.name])} className={`text-xs px-4 py-2 rounded-full border-2 transition-all font-medium ${filterAmenities.includes(amenity.name) ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-border hover:border-primary/40 bg-background"}`}>
                        {amenity.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {activeFilterCount > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4">
          <div className="flex flex-wrap gap-2">
            {filterTypes.map((type) => (
              <button type="button" key={type} onClick={() => setFilterTypes((prev) => prev.filter((name) => name !== type))} className="text-[11px] bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1.5 font-medium hover:bg-primary/20 transition-colors">
                {type} <X size={10} />
              </button>
            ))}
            {filterAmenities.map((amenity) => (
              <button type="button" key={amenity} onClick={() => setFilterAmenities((prev) => prev.filter((name) => name !== amenity))} className="text-[11px] bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1.5 font-medium hover:bg-accent/20 transition-colors">
                {amenity} <X size={10} />
              </button>
            ))}
            {filterFurnishing && (
              <button type="button" onClick={() => setFilterFurnishing("")} className="text-[11px] bg-secondary text-foreground px-3 py-1 rounded-full flex items-center gap-1.5 font-medium hover:bg-secondary/80 transition-colors">
                {filterFurnishing} <X size={10} />
              </button>
            )}
          </div>
        </div>
      )}

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
              {activeFilterCount > 0 && <button type="button" onClick={clearAllFilters} className="text-sm text-accent hover:underline font-medium">Clear all filters</button>}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((property, index) => (
                <motion.div key={property.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      {property.featured_image ? (
                        <img src={property.featured_image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <MapPin size={32} className="text-muted-foreground/30" />
                        </div>
                      )}
                      {property.is_featured && <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">Featured</span>}
                      {property.property_type && <span className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-[10px] font-medium px-2.5 py-1 rounded-full">{property.property_type.name}</span>}
                    </div>

                    <div className="p-4 sm:p-5">
                      <h3 className="font-bold text-base font-sans mb-1 truncate">{property.name}</h3>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                        <MapPin size={12} />
                        <span>{property.area}, {property.city}</span>
                      </div>

                      {property.price && <p className="text-lg font-bold text-accent mb-2">{formatPrice(property.price)}<span className="text-xs font-normal text-muted-foreground">/month</span></p>}

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {property.furnishing_type && <span className="text-[10px] bg-secondary text-foreground px-2 py-0.5 rounded-full">{property.furnishing_type}</span>}
                        {property.seating_capacity && <span className="text-[10px] bg-secondary text-foreground px-2 py-0.5 rounded-full">{property.seating_capacity} Seats</span>}
                        {property.sqft && <span className="text-[10px] bg-secondary text-foreground px-2 py-0.5 rounded-full">{property.sqft.toLocaleString()} sq ft</span>}
                      </div>

                      {property.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {property.amenities.slice(0, 4).map((amenity) => {
                            const Icon = amenityIcons[amenity.icon || ""] || Wifi;
                            return (
                              <span key={amenity.name} className="text-[10px] text-muted-foreground flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full">
                                <Icon size={10} /> {amenity.name}
                              </span>
                            );
                          })}
                          {property.amenities.length > 4 && <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">+{property.amenities.length - 4}</span>}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Link to={`/listings/${property.slug}`} className="flex-1 bg-primary text-primary-foreground text-xs font-semibold py-2.5 rounded-full text-center hover:opacity-90 transition-opacity">
                          View Details
                        </Link>
                        <a href="tel:+919886285028" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0">
                          <Phone size={14} />
                        </a>
                        <a href={`https://wa.me/919886285028?text=${encodeURIComponent(`Hi, I'm interested in: ${property.name}`)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0">
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
        <InternalLinksSection
          eyebrow="Refine Your Search"
          title="Jump From Listings to Location-Specific Pages"
          description="These internal links help visitors compare market-level pages with the filtered inventory they see here."
          links={[
            {
              href: "/office-space/bangalore",
              title: "Bangalore Office Space Guide",
              description: "Review Bangalore neighborhoods, workspace demand, and office search guidance before shortlisting listings.",
            },
            {
              href: "/office-space/hyderabad",
              title: "Hyderabad Office Space Guide",
              description: "Compare Hyderabad business districts, coworking demand, and managed office options.",
            },
            {
              href: "/areas-we-serve",
              title: "All Areas We Serve",
              description: "Browse every local landing page to discover more micro-markets beyond the current results.",
            },
            {
              href: "/contact",
              title: "Need a Shortlist?",
              description: "Talk to EverySpaces for a curated workspace shortlist based on your business requirements.",
            },
          ]}
        />
      </AnimatedSection>

      <AnimatedSection>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default ListingsPage;
