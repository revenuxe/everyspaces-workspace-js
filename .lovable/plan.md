## Phase 1: Database Schema
Create Supabase tables:
- **properties** — name, slug, description, short_description, price, seating_capacity, address, city, area, phone, whatsapp, whatsapp_message, featured_image, status (draft/active), meta_title, meta_description, featured toggle
- **property_types** — name, slug
- **amenities** — name, icon
- **property_images** — property_id, image_url, is_featured, sort_order
- **property_amenities** — property_id, amenity_id (junction)
- **property_type mapping** — property_type_id on properties table
- Storage bucket for property images
- RLS: Public read for active properties, admin CRUD

## Phase 2: City Landing Pages
- `/office-space/bangalore` — Full homepage-style layout with Bangalore-specific content (Hero, Stats, Services, Goals, Testimonials, Contact Form)
- `/office-space/hyderabad` — Same layout with Hyderabad-specific content
- City-specific SEO data in a data file

## Phase 3: Listings Page (`/listings`)
- Search bar: Location, Property Type, Budget, Seating Capacity
- Filter section: Price range slider, Property Type multi-select, Seating capacity, Furnishing, Amenities
- Listing grid with property cards (image, name, location, price, highlights, amenity tags)
- CTA buttons: View Details, Call Now, Schedule Visit

## Phase 4: Property Detail Page (`/listings/:slug`)
- Image carousel/gallery
- Property info (name, location, price, description, amenities with icons, seating capacity)
- CTA: Call Now + Schedule Visit (WhatsApp with prefilled message)

## Phase 5: Admin CMS
- **Property Listings** — Table view with search, filters, status toggle, edit/delete
- **Add/Edit Property** — Multi-section form (Basic Details, Description, Amenities, Media upload, Contact/CTA, Status)
- **Property Types** — CRUD management
- **Amenities** — CRUD management with optional icons
- **Locations** — CRUD management (cities/areas)

## Tech Notes
- All data from Supabase, dynamically rendered
- Responsive design (mobile + desktop)
- Premium, clean UI matching existing design system
- SEO-ready with slugs and meta fields
