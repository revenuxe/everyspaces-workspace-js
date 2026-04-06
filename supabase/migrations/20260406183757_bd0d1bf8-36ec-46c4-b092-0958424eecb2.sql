
ALTER TABLE public.leads
  ADD COLUMN team_size TEXT,
  ADD COLUMN preferred_location TEXT CHECK (char_length(preferred_location) <= 300),
  ADD COLUMN nature_of_business TEXT CHECK (char_length(nature_of_business) <= 300),
  ADD COLUMN planned_timeline TEXT;
