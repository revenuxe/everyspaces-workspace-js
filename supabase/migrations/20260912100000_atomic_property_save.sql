-- One transaction keeps the listing and its relationships consistent on failure.
CREATE OR REPLACE FUNCTION public.save_property(_id uuid, _property jsonb, _amenities uuid[], _images jsonb)
RETURNS uuid LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE saved public.properties; target_id uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Administrator access required' USING ERRCODE='42501'; END IF;
  IF _property IS NULL OR jsonb_typeof(_property) <> 'object' OR _images IS NULL OR jsonb_typeof(_images) <> 'array' THEN RAISE EXCEPTION 'Invalid property payload'; END IF;
  IF _id IS NOT NULL THEN
    SELECT * INTO saved FROM public.properties WHERE id=_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Property not found'; END IF;
  END IF;
  saved := jsonb_populate_record(saved, _property - ARRAY['id','created_at','updated_at']);
  IF trim(coalesce(saved.name,''))='' OR trim(coalesce(saved.city,''))='' OR trim(coalesce(saved.area,''))='' OR coalesce(saved.slug,'') !~ '^[a-z0-9]+(-[a-z0-9]+)*$' THEN RAISE EXCEPTION 'Name, city, area, and a valid URL slug are required'; END IF;
  saved.status := coalesce(saved.status, 'draft'); saved.is_featured := coalesce(saved.is_featured, false);
  IF _id IS NULL THEN
    INSERT INTO public.properties (name,slug,property_type_id,location_id,address,city,area,price,seating_capacity,sqft,carpet_area,floor_number,total_floors,parking_slots,availability_date,lease_duration_months,short_description,full_description,furnishing_type,phone,whatsapp,whatsapp_message,featured_image,status,is_featured,meta_title,meta_description) VALUES (saved.name,saved.slug,saved.property_type_id,saved.location_id,saved.address,saved.city,saved.area,saved.price,saved.seating_capacity,saved.sqft,saved.carpet_area,saved.floor_number,saved.total_floors,saved.parking_slots,saved.availability_date,saved.lease_duration_months,saved.short_description,saved.full_description,saved.furnishing_type,saved.phone,saved.whatsapp,saved.whatsapp_message,saved.featured_image,saved.status,saved.is_featured,saved.meta_title,saved.meta_description) RETURNING id INTO target_id;
  ELSE
    UPDATE public.properties SET name=saved.name,slug=saved.slug,property_type_id=saved.property_type_id,location_id=saved.location_id,address=saved.address,city=saved.city,area=saved.area,price=saved.price,seating_capacity=saved.seating_capacity,sqft=saved.sqft,carpet_area=saved.carpet_area,floor_number=saved.floor_number,total_floors=saved.total_floors,parking_slots=saved.parking_slots,availability_date=saved.availability_date,lease_duration_months=saved.lease_duration_months,short_description=saved.short_description,full_description=saved.full_description,furnishing_type=saved.furnishing_type,phone=saved.phone,whatsapp=saved.whatsapp,whatsapp_message=saved.whatsapp_message,featured_image=saved.featured_image,status=saved.status,is_featured=saved.is_featured,meta_title=saved.meta_title,meta_description=saved.meta_description WHERE id=_id RETURNING id INTO target_id;
  END IF;
  DELETE FROM public.property_amenities WHERE property_id=target_id;
  INSERT INTO public.property_amenities (property_id,amenity_id) SELECT target_id, a FROM (SELECT DISTINCT unnest(coalesce(_amenities, '{}'::uuid[])) a) t;
  DELETE FROM public.property_images WHERE property_id=target_id;
  INSERT INTO public.property_images (property_id,image_url,is_featured,sort_order)
    SELECT target_id, item->>'url', (item->>'url')=coalesce(saved.featured_image,''), (position-1)::integer FROM jsonb_array_elements(_images) WITH ORDINALITY AS images(item,position);
  RETURN target_id;
END $$;
REVOKE ALL ON FUNCTION public.save_property(uuid,jsonb,uuid[],jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_property(uuid,jsonb,uuid[],jsonb) TO authenticated;
ALTER TABLE public.properties ADD CONSTRAINT properties_nonnegative_dimensions CHECK (
 (price IS NULL OR price >= 0) AND (seating_capacity IS NULL OR seating_capacity >= 0) AND
 (sqft IS NULL OR sqft >= 0) AND (carpet_area IS NULL OR carpet_area >= 0) AND
 (total_floors IS NULL OR total_floors >= 0) AND (parking_slots IS NULL OR parking_slots >= 0) AND
 (lease_duration_months IS NULL OR lease_duration_months >= 0));
UPDATE storage.buckets SET file_size_limit=10485760, allowed_mime_types=ARRAY['image/jpeg','image/png','image/webp','image/avif'] WHERE id='property-images';
