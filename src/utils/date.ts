import { format, intervalToDuration, addMonths } from "date-fns";

/**
 * Formats a date string in YYYY-MM or YYYY-MM-DD format to a readable format (e.g., "Jan 2023")
 */
export function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  const year = parts[0];
  const month = parts[1];
  // Parse to a Date object (using day 1 of the month)
  const date = new Date(parseInt(year ?? "0"), parseInt(month ?? "1") - 1, 1);
  return format(date, "MMM yyyy");
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
 * Accepts YYYY-MM or YYYY-MM-DD format
 */
export function calculateDurationBetween(
  startDate: string,
  endDate: string | null | undefined,
): string {
  const startParts = startDate.split("-").map(Number);
  const startYear = startParts[0] ?? 0;
  const startMonth = startParts[1] ?? 1;
  const start = new Date(startYear, startMonth - 1, 1);

  let end: Date;
  if (endDate) {
    const endParts = endDate.split("-").map(Number);
    const endYear = endParts[0] ?? 0;
    const endMonth = endParts[1] ?? 1;
    end = new Date(endYear, endMonth - 1, 1);
  } else {
    // Use current date for "Present"
    const now = new Date();
    end = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  // Add 1 month to end date to include both start and end months
  const adjustedEnd = addMonths(end, 1);

  const duration = intervalToDuration({ start, end: adjustedEnd });

  const parts = [];
  if (duration.years && duration.years > 0) {
    parts.push(`${duration.years} yr${duration.years > 1 ? "s" : ""}`);
  }
  if (duration.months && duration.months > 0) {
    parts.push(`${duration.months} mo${duration.months > 1 ? "s" : ""}`);
  }

  return parts.join(" ") || "1 mo";
}
