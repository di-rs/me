import type { CollectionEntry } from "astro:content";

export interface Experience extends Omit<
  CollectionEntry<"experiences">["data"],
  "order"
> {
  id: string;
  description: string[];
}

// For grouped experiences (multiple roles at same company)
export interface GroupedExperience extends Omit<
  CollectionEntry<"experiences">["data"],
  "role" | "startDate" | "endDate" | "technologies" | "order" | "employmentType"
> {
  id: string;
  roles: Experience[];
}
