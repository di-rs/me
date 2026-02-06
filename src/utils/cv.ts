import type { Experience } from "@/types/experience";
import type { CollectionEntry } from "astro:content";
import { formatDateRange, calculateDurationBetween } from "./date";

/**
 * Formats technologies for inline display in CV
 * Example: "React + TypeScript, Bun, Zustand, React Query"
 */
export function formatTechStack(technologies: string[]): string {
  return technologies.join(", ");
}

/**
 * Converts markdown about content to plain text bullet points
 * Strips markdown and returns array of strings
 */
export function parseAboutContent(markdown: string): string[] {
  const lines = markdown.split("\n").filter((line) => line.trim());
  return lines
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

/**
 * Gets current role info for CV header
 */
export function getCurrentRole(experiences: CollectionEntry<"experiences">[]): {
  role: string;
  company: string;
  location: string;
} {
  const current = experiences.find((exp) => exp.data.endDate === null);
  return current
    ? {
        role: current.data.role,
        company: current.data.company,
        location: current.data.location,
      }
    : {
        role: "Senior Software Engineer",
        company: "DataSnipper",
        location: "Amsterdam, North Holland, Netherlands",
      };
}

/**
 * Prepares summary content with intro line + about bullets
 */
export function prepareSummaryContent(
  aboutContent: string,
  introLine: string,
): string[] {
  const aboutBullets = parseAboutContent(aboutContent);
  return [introLine, ...aboutBullets];
}

/**
 * Formats date range with duration for experience entries
 * Example: "October 2025 - Present (4 months)"
 */
export function formatDateRangeWithDuration(
  startDate: string,
  endDate: string | null | undefined,
): string {
  const dateRange = formatDateRange(startDate, endDate);
  const duration = calculateDurationBetween(startDate, endDate);
  return `${dateRange} (${duration})`;
}

/**
 * Calculates total duration for a company with multiple roles
 */
export function calculateCompanyDuration(roles: Experience[]): string {
  if (roles.length === 0) return "";

  // Sort by start date to find earliest and latest
  const sortedRoles = [...roles].sort((a, b) =>
    a.startDate.localeCompare(b.startDate),
  );

  const firstRole = sortedRoles[0];
  const lastRole = sortedRoles[sortedRoles.length - 1];

  if (!firstRole || !lastRole) return "";

  const earliestStart = firstRole.startDate;
  const latestEnd = lastRole.endDate;

  return calculateDurationBetween(earliestStart, latestEnd);
}
