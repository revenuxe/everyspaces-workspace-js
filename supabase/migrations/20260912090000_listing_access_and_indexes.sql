-- Draft listing relations must follow the parent listing visibility.
DROP POLICY IF EXISTS "Anyone can view property images" ON public.property_images;
CREATE POLICY "Visible property images" ON public.property_images FOR SELECT TO anon, authenticated
USING (EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND (p.status = 'active' OR public.has_role(auth.uid(), 'admin'))));
DROP POLICY IF EXISTS "Anyone can view property amenities" ON public.property_amenities;
CREATE POLICY "Visible property amenities" ON public.property_amenities FOR SELECT TO anon, authenticated
USING (EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND (p.status = 'active' OR public.has_role(auth.uid(), 'admin'))));
CREATE INDEX IF NOT EXISTS properties_status_city_idx ON public.properties (status, city);
CREATE INDEX IF NOT EXISTS properties_location_id_idx ON public.properties (location_id);
CREATE INDEX IF NOT EXISTS properties_type_id_idx ON public.properties (property_type_id);
CREATE INDEX IF NOT EXISTS property_images_property_id_idx ON public.property_images (property_id);
CREATE INDEX IF NOT EXISTS property_amenities_amenity_id_idx ON public.property_amenities (amenity_id);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
