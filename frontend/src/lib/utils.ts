type ClassValue = string | false | null | undefined | Record<string, boolean>;

export function cn(...inputs: ClassValue[]) {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === "string") return [input];
      return Object.entries(input)
        .filter(([, enabled]) => enabled)
        .map(([key]) => key);
    })
    .join(" ");
}

export function asArray<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

export function getCategoryName(value: unknown): string {
  if (typeof value === "string") return value || "General";
  if (value && typeof value === "object") {
    const record = value as { name?: string | null };
    if (record.name) return record.name;
  }
  return "General";
}

export function getProjectImage(value: { thumbnail?: string | null; image_url?: string | null; cover_image?: string | null } | null | undefined): string {
  return value?.thumbnail ?? value?.image_url ?? value?.cover_image ?? "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(34,211,238,0.15))";
}

export function getProjectSummary(value: { description?: string | null; summary?: string | null } | null | undefined): string {
  return value?.description ?? value?.summary ?? "No description available yet.";
}

export function formatDate(date?: string | null) {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(parsed);
}

export function formatYearRange(start?: string | null, end?: string | null, current?: boolean) {
  if (!start) return current ? "Present" : "—";
  const startDate = new Date(start);
  const startYear = Number.isNaN(startDate.getTime()) ? "—" : String(startDate.getFullYear());
  if (current || !end) return `${startYear} - Present`;
  const endDate = new Date(end);
  const endYear = Number.isNaN(endDate.getTime()) ? "Present" : String(endDate.getFullYear());
  return `${startYear} - ${endYear}`;
}
