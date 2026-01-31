import type { CollectionEntry } from "astro:content";

export type Education = CollectionEntry<"education">["data"] & {
  id: string;
};
