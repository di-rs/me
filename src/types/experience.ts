import type { CollectionEntry } from "astro:content";

export type Experience = CollectionEntry<"experiences">["data"] & {
  id: string;
  description: string[];
  aiSummary: string;
};

// For grouped experiences (multiple roles at same company)
export interface GroupedExperience extends Omit<
  CollectionEntry<"experiences">["data"],
  "role" | "startDate" | "endDate" | "technologies" | "order" | "employmentType"
> {
  id: string;
  roles: Experience[];
  aiSummary: string;
}
