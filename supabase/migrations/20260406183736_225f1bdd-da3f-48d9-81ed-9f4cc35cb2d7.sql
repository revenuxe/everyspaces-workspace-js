-- Extend the March schema instead of recreating existing tables and policies.
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'moderator';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS service text, ADD COLUMN IF NOT EXISTS message text;
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
