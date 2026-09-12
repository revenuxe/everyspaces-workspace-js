
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS team_size TEXT,
  ADD COLUMN IF NOT EXISTS preferred_location TEXT CHECK (char_length(preferred_location) <= 300),
  ADD COLUMN IF NOT EXISTS nature_of_business TEXT CHECK (char_length(nature_of_business) <= 300),
  ADD COLUMN IF NOT EXISTS planned_timeline TEXT;
