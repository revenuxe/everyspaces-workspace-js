ALTER TABLE public.leads
  ADD COLUMN company_name TEXT CHECK (char_length(company_name) <= 200),
  ADD COLUMN lead_type TEXT NOT NULL DEFAULT 'consultation' CHECK (lead_type IN ('consultation', 'certification'));
