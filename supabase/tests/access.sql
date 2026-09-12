BEGIN;
INSERT INTO auth.users (id, email) VALUES ('00000000-0000-4000-8000-000000000091', 'migration-check@example.invalid');
INSERT INTO public.user_roles (user_id, role) VALUES ('00000000-0000-4000-8000-000000000091','admin');
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000091',true);
INSERT INTO public.properties (id,name,slug,city,area,status) VALUES
('00000000-0000-4000-8000-000000000092','Migration check draft','migration-check-draft','Bangalore','HBR Layout','draft'),
('00000000-0000-4000-8000-000000000093','Migration check active','migration-check-active','Bangalore','HBR Layout','active');
INSERT INTO public.property_images (property_id,image_url) VALUES ('00000000-0000-4000-8000-000000000092','https://example.invalid/test.webp');
UPDATE public.properties SET price=1000 WHERE id='00000000-0000-4000-8000-000000000092';
DO $$ BEGIN IF (SELECT count(*) FROM public.properties WHERE slug LIKE 'migration-check-%') <> 2 THEN RAISE EXCEPTION 'Admin listing access failed'; END IF; END $$;
SET LOCAL ROLE anon;
SELECT set_config('request.jwt.claim.sub','',true);
INSERT INTO public.leads (full_name,email,lead_type,company_name) VALUES ('Migration check','migration-check@example.invalid','certification','Migration check');
DO $$ BEGIN
IF (SELECT count(*) FROM public.properties WHERE slug LIKE 'migration-check-%') <> 1 THEN RAISE EXCEPTION 'Public draft isolation failed'; END IF;
IF EXISTS (SELECT 1 FROM public.property_images WHERE property_id='00000000-0000-4000-8000-000000000092') THEN RAISE EXCEPTION 'Draft image relation leaked'; END IF;
IF EXISTS (SELECT 1 FROM public.leads WHERE email='migration-check@example.invalid') THEN RAISE EXCEPTION 'Lead privacy failed'; END IF;
BEGIN
INSERT INTO public.properties (name,slug,city,area) VALUES ('Unauthorized','migration-check-unauthorized','Bangalore','HBR Layout');
RAISE EXCEPTION 'Anonymous listing creation allowed';
EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000091',true);
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM public.leads WHERE email='migration-check@example.invalid') THEN RAISE EXCEPTION 'Admin lead access failed'; END IF; END $$;
DELETE FROM public.properties WHERE slug LIKE 'migration-check-%';
ROLLBACK;
SELECT 'PASS: admin listing CRUD, public active visibility, draft relation privacy, public lead submission, admin lead access, anonymous write denial; all fixtures rolled back' AS result;
