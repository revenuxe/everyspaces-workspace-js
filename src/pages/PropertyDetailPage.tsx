import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Calendar, ChevronLeft, ChevronRight, Wifi, Car, Snowflake, Shield, Coffee, Zap, UserCheck, Printer, Users, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";

const amenityIcons: Record<string, React.ElementType> = {
  Wifi, Car, Snowflake, Shield, Coffee, Zap, UserCheck, Printer, Users,
};

interface PropertyDetail {
  id: string;
  name: string;
  slug: string;
  city: string;
  area: string;
  address: string | null;
  price: number | null;
  seating_capacity: number | null;
  short_description: string | null;
  full_description: string | null;
  furnishing_type: string | null;
  phone: string | null;
  whatsapp: string | null;
  whatsapp_message: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  property_type: { name: string } | null;
  amenities: { name: string; icon: string | null }[];
  images: { image_url: string; is_featured: boolean }[];
}

const PropertyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("properties")
        .select(`
          id, name, slug, city, area, address, price, seating_capacity,
          short_description, full_description, furnishing_type, phone, whatsapp,
          whatsapp_message, featured_image, meta_title, meta_description,
          property_types(name),
          property_amenities(amenities(name, icon)),
          property_images(image_url, is_featured, sort_order)
        `)
        .eq("slug", slug)
        .eq("status", "active")
        .maybeSingle();

      if (data) {
        setProperty({
          ...data,
          property_type: (data as any).property_types,
          amenities: ((data as any).property_amenities || []).map((pa: any) => pa.amenities).filter(Boolean),
          images: ((data as any).property_images || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
        });
      }
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center py-32">
          <span className="h-8 w-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Property Not Found</h1>
            <Link to="/listings" className="text-accent underline">Browse all listings</Link>
          </div>
        </div>
      </div>
    );
  }

  const allImages = property.featured_image
    ? [property.featured_image, ...property.images.map((i) => i.image_url).filter((u) => u !== property.featured_image)]
    : property.images.map((i) => i.image_url);

  const phoneNum = property.phone || "+919886285028";
  const waNum = property.whatsapp || "919886285028";
  const waMsg = property.whatsapp_message || `Hi, I'm interested in this workspace: ${property.name}`;

  const formatPrice = (price: number) => {
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
    return `₹${price}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={property.meta_title || `${property.name} — Office Space in ${property.area}, ${property.city} | EverySpaces`}
        description={property.meta_description || property.short_description || `Premium office space for rent: ${property.name} in ${property.area}, ${property.city}.`}
        canonical={`/listings/${property.slug}`}
        keywords={`${property.name}, office space ${property.area}, coworking ${property.city}, ${property.property_type?.name || "office"} ${property.area}`}
      />
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/listings" className="hover:text-foreground">Listings</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{property.name}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
        <div className="relative rounded-2xl overflow-hidden bg-muted">
          {allImages.length > 0 ? (
            <>
              <img
                src={allImages[currentImage]}
                alt={`${property.name} - Image ${currentImage + 1}`}
                className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover"
              />
              {allImages.length > 1 && (
                <>
                  <button onClick={() => setCurrentImage((p) => (p - 1 + allImages.length) % allImages.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-lg">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setCurrentImage((p) => (p + 1) % allImages.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-lg">
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {allImages.map((_, i) => (
                      <button key={i} onClick={() => setCurrentImage(i)} className={`w-2 h-2 rounded-full transition-colors ${i === currentImage ? "bg-primary-foreground" : "bg-primary-foreground/40"}`} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="h-[250px] sm:h-[350px] md:h-[500px] flex items-center justify-center">
              <MapPin size={48} className="text-muted-foreground/30" />
            </div>
          )}
        </div>
      </section>

      {/* Property Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap items-start gap-3 mb-2">
              {property.property_type && (
                <span className="bg-secondary text-foreground text-xs font-medium px-3 py-1 rounded-full">{property.property_type.name}</span>
              )}
              {property.furnishing_type && (
                <span className="bg-muted text-foreground text-xs font-medium px-3 py-1 rounded-full">{property.furnishing_type}</span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2">{property.name}</h1>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-6">
              <MapPin size={14} />
              <span>{property.address || `${property.area}, ${property.city}`}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {property.price && (
                <div className="bg-secondary rounded-xl p-4 text-center min-w-[100px]">
                  <p className="text-xl font-bold text-accent">{formatPrice(property.price)}</p>
                  <p className="text-xs text-muted-foreground">/month</p>
                </div>
              )}
              {property.seating_capacity && (
                <div className="bg-secondary rounded-xl p-4 text-center min-w-[100px]">
                  <p className="text-xl font-bold text-foreground">{property.seating_capacity}</p>
                  <p className="text-xs text-muted-foreground">Seats</p>
                </div>
              )}
            </div>

            {/* Description */}
            {property.full_description && (
              <div className="mb-8">
                <h2 className="text-lg font-serif font-bold mb-3">About This Space</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                  {property.full_description}
                </div>
              </div>
            )}

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-serif font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((a) => {
                    const Icon = amenityIcons[a.icon || ""] || Wifi;
                    return (
                      <div key={a.name} className="flex items-center gap-3 bg-secondary rounded-xl p-3">
                        <Icon size={18} className="text-accent shrink-0" />
                        <span className="text-sm font-medium">{a.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="bg-muted rounded-2xl p-8 text-center">
              <MapPin size={32} className="mx-auto mb-2 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Map view coming soon</p>
              <p className="text-xs text-muted-foreground/60 mt-1">{property.address || `${property.area}, ${property.city}`}</p>
            </div>
          </div>

          {/* Right — CTA Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg mb-4">Interested in This Space?</h3>
              {property.price && (
                <p className="text-2xl font-bold text-accent mb-1">{formatPrice(property.price)}<span className="text-xs font-normal text-muted-foreground">/month</span></p>
              )}
              <p className="text-xs text-muted-foreground mb-6">{property.area}, {property.city}</p>

              <a href={`tel:${phoneNum}`} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-full hover:opacity-90 transition-opacity mb-3 w-full">
                <Phone size={16} /> Call Now
              </a>
              <a href={`https://wa.me/${waNum}?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold text-sm py-3 rounded-full hover:opacity-90 transition-opacity w-full">
                <Calendar size={16} /> Schedule Visit
              </a>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default PropertyDetailPage;
