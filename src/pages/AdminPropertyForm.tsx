import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Upload, X, Loader2, Save, Globe } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const AdminPropertyForm = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const isEdit = propertyId && propertyId !== "new";
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [propertyTypeId, setPropertyTypeId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [sqft, setSqft] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [parkingSlots, setParkingSlots] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [leaseDuration, setLeaseDuration] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [furnishingType, setFurnishingType] = useState("Fully Furnished");
  const [phone, setPhone] = useState("+919886285028");
  const [whatsapp, setWhatsapp] = useState("919886285028");
  const [whatsappMsg, setWhatsappMsg] = useState("Hi, I'm interested in this workspace");
  const [status, setStatus] = useState<"draft" | "active">("draft");
  const [isFeatured, setIsFeatured] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<{ url: string; isFeatured: boolean }[]>([]);
  const [featuredImage, setFeaturedImage] = useState("");

  // Lookups
  const [propertyTypes, setPropertyTypes] = useState<any[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<any[]>([]);
  const [locationsList, setLocationsList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Check auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }
      const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      if (!roleData) { navigate("/admin/login"); return; }

      // Fetch lookups
      const [typesRes, amenRes, locRes] = await Promise.all([
        supabase.from("property_types").select("*").order("name"),
        supabase.from("amenities").select("*").order("name"),
        supabase.from("locations").select("*").order("city").order("area"),
      ]);
      setPropertyTypes(typesRes.data || []);
      setAmenitiesList(amenRes.data || []);
      setLocationsList(locRes.data || []);

      // If editing, fetch property
      if (isEdit) {
        const { data } = await supabase
          .from("properties")
          .select("*, property_amenities(amenity_id), property_images(image_url, is_featured, sort_order)")
          .eq("id", propertyId)
          .maybeSingle();
        if (data) {
          setName(data.name);
          setSlug(data.slug);
          setPropertyTypeId(data.property_type_id || "");
          setLocationId(data.location_id || "");
          setAddress(data.address || "");
          setCity(data.city);
          setArea(data.area);
          setPrice(data.price?.toString() || "");
          setSeatingCapacity(data.seating_capacity?.toString() || "");
          setSqft((data as any).sqft?.toString() || "");
          setCarpetArea((data as any).carpet_area?.toString() || "");
          setFloorNumber((data as any).floor_number || "");
          setTotalFloors((data as any).total_floors?.toString() || "");
          setParkingSlots((data as any).parking_slots?.toString() || "");
          setAvailabilityDate((data as any).availability_date || "");
          setLeaseDuration((data as any).lease_duration_months?.toString() || "");
          setShortDesc(data.short_description || "");
          setFullDesc(data.full_description || "");
          setFurnishingType(data.furnishing_type || "Fully Furnished");
          setPhone(data.phone || "");
          setWhatsapp(data.whatsapp || "");
          setWhatsappMsg(data.whatsapp_message || "");
          setStatus(data.status as "draft" | "active");
          setIsFeatured(data.is_featured);
          setMetaTitle(data.meta_title || "");
          setMetaDesc(data.meta_description || "");
          setFeaturedImage(data.featured_image || "");
          setSelectedAmenities((data as any).property_amenities?.map((pa: any) => pa.amenity_id) || []);
          setImages(((data as any).property_images || []).map((img: any) => ({ url: img.image_url, isFeatured: img.is_featured })));
        }
      }
      setLoading(false);
    };
    init();
  }, [propertyId, navigate, isEdit]);

  const generateSlug = (val: string) => val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) setSlug(generateSlug(val));
  };

  const handleLocationChange = (locId: string) => {
    setLocationId(locId);
    const loc = locationsList.find((l: any) => l.id === locId);
    if (loc) { setCity(loc.city); setArea(loc.area); }
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const newImages: { url: string; isFeatured: boolean }[] = [];
    
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const { error } = await supabase.storage.from("property-images").upload(path, file);
      if (!error) {
        const { data: urlData } = supabase.storage.from("property-images").getPublicUrl(path);
        newImages.push({ url: urlData.publicUrl, isFeatured: false });
      }
    }
    
    setImages((prev) => [...prev, ...newImages]);
    if (!featuredImage && newImages.length > 0) setFeaturedImage(newImages[0].url);
    setUploading(false);
  };

  const removeImage = (url: string) => {
    setImages((prev) => prev.filter((i) => i.url !== url));
    if (featuredImage === url) setFeaturedImage(images.find((i) => i.url !== url)?.url || "");
  };

  const handleSave = async (publishStatus: "draft" | "active") => {
    if (!name || !slug) return;
    setSaving(true);

    const payload: Record<string, any> = {
      name,
      slug,
      property_type_id: propertyTypeId || null,
      location_id: locationId || null,
      address: address || null,
      city,
      area,
      price: price ? parseFloat(price) : null,
      seating_capacity: seatingCapacity ? parseInt(seatingCapacity) : null,
      sqft: sqft ? parseInt(sqft) : null,
      carpet_area: carpetArea ? parseInt(carpetArea) : null,
      floor_number: floorNumber || null,
      total_floors: totalFloors ? parseInt(totalFloors) : null,
      parking_slots: parkingSlots ? parseInt(parkingSlots) : null,
      availability_date: availabilityDate || null,
      lease_duration_months: leaseDuration ? parseInt(leaseDuration) : null,
      short_description: shortDesc || null,
      full_description: fullDesc || null,
      furnishing_type: furnishingType || null,
      phone: phone || null,
      whatsapp: whatsapp || null,
      whatsapp_message: whatsappMsg || null,
      featured_image: featuredImage || null,
      status: publishStatus,
      is_featured: isFeatured,
      meta_title: metaTitle || null,
      meta_description: metaDesc || null,
    };

    let propId = propertyId;

    if (isEdit) {
      await supabase.from("properties").update(payload).eq("id", propertyId!);
    } else {
      const { data } = await supabase.from("properties").insert(payload).select("id").single();
      propId = data?.id;
    }

    if (propId) {
      // Sync amenities
      await supabase.from("property_amenities").delete().eq("property_id", propId);
      if (selectedAmenities.length > 0) {
        await supabase.from("property_amenities").insert(
          selectedAmenities.map((aid) => ({ property_id: propId!, amenity_id: aid }))
        );
      }

      // Sync images
      await supabase.from("property_images").delete().eq("property_id", propId);
      if (images.length > 0) {
        await supabase.from("property_images").insert(
          images.map((img, i) => ({
            property_id: propId!,
            image_url: img.url,
            is_featured: img.url === featuredImage,
            sort_order: i,
          }))
        );
      }
    }

    setSaving(false);
    navigate("/admin/dashboard");
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><span className="h-8 w-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;
  }

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent";
  const labelClass = "block text-xs font-medium text-muted-foreground mb-1.5";

  return (
    <>
      <SEOHead title={isEdit ? "Edit Property | Admin" : "Add Property | Admin"} description="Admin" keywords="admin" noIndex />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shadow-lg">
          <button onClick={() => navigate("/admin/dashboard")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-base font-serif">{isEdit ? "Edit" : "Add"} Property</h1>
          <div className="w-16" />
        </header>

        <div className="max-w-3xl mx-auto p-4 space-y-6 pb-32">
          {/* SECTION 1: Basic Details */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-serif font-bold text-base mb-4">Basic Details</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Property Name *</label>
                <input value={name} onChange={(e) => handleNameChange(e.target.value)} className={inputClass} placeholder="Premium Coworking Hub" />
              </div>
              <div>
                <label className={labelClass}>URL Slug *</label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} placeholder="premium-coworking-hub" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Property Type</label>
                  <select value={propertyTypeId} onChange={(e) => setPropertyTypeId(e.target.value)} className={`${inputClass} appearance-none`}>
                    <option value="">Select type</option>
                    {propertyTypes.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <select value={locationId} onChange={(e) => handleLocationChange(e.target.value)} className={`${inputClass} appearance-none`}>
                    <option value="">Select location</option>
                    {locationsList.map((l: any) => <option key={l.id} value={l.id}>{l.city} - {l.area}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Full Address</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} placeholder="123 Tech Park, 5th Floor..." />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Price (₹/month)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} placeholder="50000" />
                </div>
                <div>
                  <label className={labelClass}>Seating Capacity</label>
                  <input type="number" value={seatingCapacity} onChange={(e) => setSeatingCapacity(e.target.value)} className={inputClass} placeholder="50" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Furnishing Type</label>
                <select value={furnishingType} onChange={(e) => setFurnishingType(e.target.value)} className={`${inputClass} appearance-none`}>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi Furnished">Semi Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: Description */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-serif font-bold text-base mb-4">Description</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Short Description</label>
                <input value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className={inputClass} placeholder="Brief overview of the property..." />
              </div>
              <div>
                <label className={labelClass}>Full Description</label>
                <textarea value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} rows={6} className={`${inputClass} resize-y`} placeholder="Detailed description of the workspace, facilities, neighborhood..." />
              </div>
            </div>
          </div>

          {/* SECTION 3: Amenities */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-serif font-bold text-base mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((a: any) => (
                <button key={a.id} onClick={() => setSelectedAmenities((prev) => prev.includes(a.id) ? prev.filter((id) => id !== a.id) : [...prev, a.id])} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedAmenities.includes(a.id) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-accent"}`}>
                  {a.name}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 4: Media */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-serif font-bold text-base mb-4">Media</h2>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center mb-4">
              <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Upload property images</p>
              <label className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full cursor-pointer hover:opacity-90">
                {uploading ? <Loader2 size={14} className="animate-spin inline mr-1" /> : null}
                Choose Files
                <input type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e.target.files)} className="hidden" />
              </label>
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {images.map((img) => (
                  <div key={img.url} className={`relative rounded-xl overflow-hidden aspect-square group ${featuredImage === img.url ? "ring-2 ring-accent" : ""}`}>
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      <button onClick={() => setFeaturedImage(img.url)} className="text-[9px] bg-primary-foreground text-primary px-2 py-1 rounded-full font-medium">
                        {featuredImage === img.url ? "★ Featured" : "Set Featured"}
                      </button>
                      <button onClick={() => removeImage(img.url)} className="w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                        <X size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 5: Contact & CTA */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-serif font-bold text-base mb-4">Contact & CTA</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+919886285028" />
                </div>
                <div>
                  <label className={labelClass}>WhatsApp Number</label>
                  <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputClass} placeholder="919886285028" />
                </div>
              </div>
              <div>
                <label className={labelClass}>WhatsApp Prefilled Message</label>
                <input value={whatsappMsg} onChange={(e) => setWhatsappMsg(e.target.value)} className={inputClass} placeholder="Hi, I'm interested in this workspace" />
              </div>
            </div>
          </div>

          {/* SECTION 6: SEO & Status */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-serif font-bold text-base mb-4">SEO & Status</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Meta Title</label>
                <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className={inputClass} placeholder="SEO title for this property" />
              </div>
              <div>
                <label className={labelClass}>Meta Description</label>
                <input value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} className={inputClass} placeholder="SEO description for search engines" />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded" />
                  <span className="text-sm">Featured Property</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-30">
          <div className="max-w-3xl mx-auto flex gap-3">
            <button onClick={() => handleSave("draft")} disabled={saving} className="flex-1 py-3 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              <Save size={14} /> Save Draft
            </button>
            <button onClick={() => handleSave("active")} disabled={saving} className="flex-1 py-3 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPropertyForm;
