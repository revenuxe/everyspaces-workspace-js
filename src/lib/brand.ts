/** Normalize legacy display copy without changing stored IDs, URLs, or contact details. */
export function rebrandText(value: string): string {
  return value.replace(
    /(https?:\/\/[^\s<>"']+|[\w.+-]+@[\w.-]+\.[a-z]+|\b[\w-]+\.(?:com|in|co|org|net)\b)|\bevery\s?spaces\b/gi,
    (match, destination: string | undefined) => destination ? match : "Numunix",
  );
}

export function rebrandProperty<T extends object>(property: T): T {
  const result = { ...property };
  for (const key of ["name", "short_description", "full_description", "meta_title", "meta_description", "whatsapp_message"] as const) {
    if (key in result) {
      const fields = result as Record<string, unknown>;
      if (typeof fields[key] === "string") fields[key] = rebrandText(fields[key]);
    }
  }
  return result;
}
