-- Add explicit UPDATE policy on leads (admin-only for defense-in-depth)
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Add length constraints on leads table for server-side validation
ALTER TABLE public.leads
  ADD CONSTRAINT leads_full_name_length CHECK (length(full_name) <= 200),
  ADD CONSTRAINT leads_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT leads_phone_length CHECK (phone IS NULL OR length(phone) <= 30),
  ADD CONSTRAINT leads_team_size_length CHECK (team_size IS NULL OR length(team_size) <= 20),
  ADD CONSTRAINT leads_preferred_location_length CHECK (preferred_location IS NULL OR length(preferred_location) <= 300),
  ADD CONSTRAINT leads_nature_of_business_length CHECK (nature_of_business IS NULL OR length(nature_of_business) <= 300),
  ADD CONSTRAINT leads_planned_timeline_length CHECK (planned_timeline IS NULL OR length(planned_timeline) <= 50);