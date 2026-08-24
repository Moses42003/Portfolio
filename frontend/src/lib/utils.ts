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

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}

export function formatYearRange(start: string, end?: string, current?: boolean) {
  const startYear = new Date(start).getFullYear();
  return `${startYear} - ${current ? "Present" : end ? new Date(end).getFullYear() : "Present"}`;
}
