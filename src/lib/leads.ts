export const leadTypeLabels = {
  consultation: "Consultation",
  certification: "Certification",
} as const;

export type LeadType = keyof typeof leadTypeLabels;
