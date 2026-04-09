ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS sqft integer,
  ADD COLUMN IF NOT EXISTS carpet_area integer,
  ADD COLUMN IF NOT EXISTS floor_number text,
  ADD COLUMN IF NOT EXISTS total_floors integer,
  ADD COLUMN IF NOT EXISTS parking_slots integer,
  ADD COLUMN IF NOT EXISTS availability_date date,
  ADD COLUMN IF NOT EXISTS lease_duration_months integer;