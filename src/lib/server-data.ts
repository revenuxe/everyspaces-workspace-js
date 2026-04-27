import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function getListingsPageData() {
  try {
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

    const properties = (propertiesRes.data || []).map((property: any) => ({
      ...property,
      property_type: property.property_types,
      amenities: (property.property_amenities || []).map((item: any) => item.amenities).filter(Boolean),
    }));

    return {
      properties,
      propertyTypes: propertyTypesRes.data || [],
      amenities: amenitiesRes.data || [],
    };
  } catch {
    return {
      properties: [],
      propertyTypes: [],
      amenities: [],
    };
  }
}

export async function getPropertyBySlug(slug: string) {
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
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

    if (!data) {
      return null;
    }

    return {
      ...data,
      property_type: (data as any).property_types,
      amenities: ((data as any).property_amenities || []).map((item: any) => item.amenities).filter(Boolean),
      images: ((data as any).property_images || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
    };
  } catch {
    return null;
  }
}

export async function getActivePropertySlugs() {
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.from("properties").select("slug, updated_at").eq("status", "active");
    return data || [];
  } catch {
    return [];
  }
}
