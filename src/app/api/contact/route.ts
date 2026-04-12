import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const leadSchema = z.object({
  lead_type: z.enum(["consultation", "certification"]).optional().default("consultation"),
  company_name: z.string().trim().max(200).optional().or(z.literal("")),
  full_name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  team_size: z.string().max(20).optional().or(z.literal("")),
  preferred_location: z.string().trim().max(300).optional().or(z.literal("")),
  nature_of_business: z.string().trim().max(300).optional().or(z.literal("")),
  planned_timeline: z.string().max(50).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message || "Invalid input" }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();
    const primaryPayload = {
      lead_type: parsed.data.lead_type,
      company_name: parsed.data.company_name || null,
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      team_size: parsed.data.team_size || null,
      preferred_location: parsed.data.preferred_location || null,
      nature_of_business: parsed.data.nature_of_business || null,
      planned_timeline: parsed.data.planned_timeline || null,
    };
    const { error } = await supabase.from("leads").insert(primaryPayload);

    if (error) {
      const missingNewColumns =
        error.message.includes("lead_type") ||
        error.message.includes("company_name") ||
        error.message.includes("schema cache");

      if (!missingNewColumns) {
        return NextResponse.json({ error: "Please try again." }, { status: 500 });
      }

      const fallbackPayload = {
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        team_size: parsed.data.team_size || null,
        preferred_location: parsed.data.preferred_location || null,
        nature_of_business: parsed.data.nature_of_business || null,
        planned_timeline: parsed.data.planned_timeline || null,
        service: parsed.data.lead_type,
        message:
          parsed.data.lead_type === "certification" && parsed.data.company_name
            ? `Company Name: ${parsed.data.company_name}`
            : null,
      };

      const { error: fallbackError } = await supabase.from("leads").insert(fallbackPayload);

      if (fallbackError) {
        return NextResponse.json({ error: "Please try again." }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Please try again." }, { status: 500 });
  }
}
