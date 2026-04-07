
-- Create property status enum
CREATE TYPE public.property_status AS ENUM ('draft', 'active');

-- Create property_types table
CREATE TABLE public.property_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.property_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view property types" ON public.property_types FOR SELECT USING (true);
CREATE POLICY "Admins can manage property types" ON public.property_types FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create amenities table
CREATE TABLE public.amenities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view amenities" ON public.amenities FOR SELECT USING (true);
CREATE POLICY "Admins can manage amenities" ON public.amenities FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create locations table
CREATE TABLE public.locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(city, area)
);
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view locations" ON public.locations FOR SELECT USING (true);
CREATE POLICY "Admins can manage locations" ON public.locations FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  property_type_id UUID REFERENCES public.property_types(id) ON DELETE SET NULL,
  location_id UUID REFERENCES public.locations(id) ON DELETE SET NULL,
  address TEXT,
  city TEXT NOT NULL DEFAULT '',
  area TEXT NOT NULL DEFAULT '',
  price NUMERIC,
  seating_capacity INTEGER,
  short_description TEXT,
  full_description TEXT,
  furnishing_type TEXT DEFAULT 'Fully Furnished',
  phone TEXT,
  whatsapp TEXT,
  whatsapp_message TEXT DEFAULT 'Hi, I''m interested in this workspace',
  featured_image TEXT,
  status property_status NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active properties" ON public.properties FOR SELECT USING (status = 'active' OR (has_role(auth.uid(), 'admin'::app_role)));
CREATE POLICY "Admins can insert properties" ON public.properties FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update properties" ON public.properties FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete properties" ON public.properties FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Create property_images table
CREATE TABLE public.property_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view property images" ON public.property_images FOR SELECT USING (true);
CREATE POLICY "Admins can manage property images" ON public.property_images FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create property_amenities junction table
CREATE TABLE public.property_amenities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  amenity_id UUID NOT NULL REFERENCES public.amenities(id) ON DELETE CASCADE,
  UNIQUE(property_id, amenity_id)
);
ALTER TABLE public.property_amenities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view property amenities" ON public.property_amenities FOR SELECT USING (true);
CREATE POLICY "Admins can manage property amenities" ON public.property_amenities FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger for properties
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

CREATE POLICY "Anyone can view property images storage" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "Admins can upload property images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'property-images' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update property images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'property-images' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete property images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'property-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Seed default property types
INSERT INTO public.property_types (name, slug) VALUES
  ('Coworking Space', 'coworking-space'),
  ('Private Office', 'private-office'),
  ('Managed Office', 'managed-office'),
  ('Commercial Space', 'commercial-space'),
  ('Full Floor', 'full-floor');

-- Seed default amenities
INSERT INTO public.amenities (name, icon) VALUES
  ('WiFi', 'Wifi'),
  ('Parking', 'Car'),
  ('Meeting Rooms', 'Users'),
  ('AC', 'Snowflake'),
  ('Security', 'Shield'),
  ('Cafeteria', 'Coffee'),
  ('Power Backup', 'Zap'),
  ('Reception', 'UserCheck'),
  ('Printer', 'Printer'),
  ('Lounge Area', 'Sofa');

-- Seed default locations
INSERT INTO public.locations (city, area, slug) VALUES
  ('Bangalore', 'Koramangala', 'bangalore-koramangala'),
  ('Bangalore', 'Whitefield', 'bangalore-whitefield'),
  ('Bangalore', 'HSR Layout', 'bangalore-hsr-layout'),
  ('Bangalore', 'Indiranagar', 'bangalore-indiranagar'),
  ('Bangalore', 'MG Road', 'bangalore-mg-road'),
  ('Bangalore', 'Electronic City', 'bangalore-electronic-city'),
  ('Bangalore', 'Marathahalli', 'bangalore-marathahalli'),
  ('Bangalore', 'JP Nagar', 'bangalore-jp-nagar'),
  ('Bangalore', 'Bannerghatta Road', 'bangalore-bannerghatta-road'),
  ('Bangalore', 'Jayanagar', 'bangalore-jayanagar'),
  ('Hyderabad', 'HITEC City', 'hyderabad-hitec-city'),
  ('Hyderabad', 'Gachibowli', 'hyderabad-gachibowli'),
  ('Hyderabad', 'Madhapur', 'hyderabad-madhapur'),
  ('Hyderabad', 'Banjara Hills', 'hyderabad-banjara-hills'),
  ('Hyderabad', 'Jubilee Hills', 'hyderabad-jubilee-hills'),
  ('Hyderabad', 'Kondapur', 'hyderabad-kondapur'),
  ('Hyderabad', 'Ameerpet', 'hyderabad-ameerpet'),
  ('Hyderabad', 'Kukatpally', 'hyderabad-kukatpally');
