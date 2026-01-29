/**
 * Formats a date string in YYYY-MM format to a readable format (e.g., "Jan 2023")
 */
export function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = parseInt(month ?? "1") - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

/**
 * Formats a date range from start to end (or "Present" if end is null)
 */
export function formatDateRange(
  startDate: string,
  endDate: string | null | undefined,
): string {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} - ${end}`;
}

/**
 * Calculates the duration between two dates and returns a human-readable string
 * Duration includes both start and end months (e.g., Oct 2025 to Jan 2026 = 4 months)
 */
export function calculateDurationBetween(
  startDate: string,
  endDate: string | null | undefined,
): string {
  const startParts = startDate.split("-").map(Number);
  const startYear = startParts[0] ?? 0;
  const startMonth = startParts[1] ?? 1;

  let endYear: number, endMonth: number;
  if (endDate) {
    const endParts = endDate.split("-").map(Number);
    endYear = endParts[0] ?? 0;
    endMonth = endParts[1] ?? 1;
  } else {
    // Use current date for "Present"
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  }

  let years = endYear - startYear;
  let months = endMonth - startMonth;

  if (months < 0) {
    years--;
    months += 12;
  }

  // Add 1 to include both start and end months
  // (e.g., Oct to Jan = Jan - Oct = 3, but counting both = 4 months)
  months += 1;

  // Round up to next year if months >= 12
  if (months >= 12) {
    years++;
    months -= 12;
  }

  const parts = [];
  if (years > 0) {
    parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  }
  if (months > 0) {
    parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  }

  return parts.join(" ") || "1 mo";
}
