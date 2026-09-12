import { cache } from "react";
import { rebrandProperty } from "@/lib/brand";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const isBangaloreCity = (city: string | null | undefined) => {
  const normalized = (city || "").trim().toLowerCase();
  return normalized === "bangalore" || normalized === "bengaluru";
};

export async function getListingsPageData() {
    const supabase = createSupabaseServerClient();
    const [propertiesRes, propertyTypesRes, amenitiesRes] = await Promise.all([
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

    if (propertiesRes.error || propertyTypesRes.error || amenitiesRes.error) throw new Error("Workspace listings are temporarily unavailable.");
    const properties = (propertiesRes.data || [])
      .filter((property: any) => isBangaloreCity(property.city))
      .map((property: any) => ({
        ...rebrandProperty(property),
        property_type: property.property_types,
        amenities: (property.property_amenities || []).map((item: any) => item.amenities).filter(Boolean),
      }));

    return {
      properties,
      propertyTypes: propertyTypesRes.data || [],
      amenities: amenitiesRes.data || [],
    };
}

export const getPropertyBySlug = cache(async (slug: string) => {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("properties")
      .select(`
        id, name, slug, city, area, address, price, seating_capacity,
        sqft, carpet_area, floor_number, total_floors, parking_slots,
        availability_date, lease_duration_months,
        short_description, full_description, furnishing_type, phone, whatsapp,
        whatsapp_message, featured_image, meta_title, meta_description,
        property_types(name),
        property_amenities(amenities(name, icon)),
        property_images(image_url, is_featured, sort_order)
      `)
      .eq("slug", slug)
      .eq("status", "active")
      .maybeSingle();

    if (error) throw new Error("Workspace details are temporarily unavailable.");
    if (!data || !isBangaloreCity(data.city)) {
      return null;
    }

    return {
      ...rebrandProperty(data),
      property_type: (data as any).property_types,
      amenities: ((data as any).property_amenities || []).map((item: any) => item.amenities).filter(Boolean),
      images: ((data as any).property_images || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
    };
});

export async function getActivePropertySlugs() {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from("properties").select("slug, updated_at, city").eq("status", "active");
    if (error) throw new Error("Workspace sitemap is temporarily unavailable.");
    return (data || []).filter((property) => isBangaloreCity(property.city));
}
