BEGIN;

INSERT INTO auth.users (id, email)
VALUES ('00000000-0000-4000-8000-000000000151', 'launch-audit@example.invalid');

INSERT INTO public.user_roles (user_id, role)
VALUES ('00000000-0000-4000-8000-000000000151', 'admin');

SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000151', true);

SELECT public.save_property(
  NULL,
  '{"name":"Launch audit listing","slug":"launch-audit-listing","city":"Bangalore","area":"Whitefield","status":"active","price":45000,"seating_capacity":12}'::jsonb,
  ARRAY[]::uuid[],
  '[{"url":"https://example.invalid/launch-audit.webp"}]'::jsonb
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.properties WHERE slug = 'launch-audit-listing' AND status = 'active') THEN
    RAISE EXCEPTION 'Atomic property save failed';
  END IF;
END $$;

SET LOCAL ROLE anon;
SELECT set_config('request.jwt.claim.sub', '', true);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.properties WHERE slug = 'launch-audit-listing') THEN
    RAISE EXCEPTION 'Published listing is not visible to visitors';
  END IF;
  IF NOT EXISTS (
    SELECT 1
    FROM public.property_images
    WHERE property_id = (SELECT id FROM public.properties WHERE slug = 'launch-audit-listing')
  ) THEN
    RAISE EXCEPTION 'Published listing image is not visible to visitors';
  END IF;
END $$;

ROLLBACK;

SELECT 'PASS: atomic property save, published listing visibility, image visibility, and rollback cleanup' AS result;
