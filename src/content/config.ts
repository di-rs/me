import { defineCollection, z } from "astro:content";

const experiences = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable(),
    technologies: z.array(z.string()),
    technologiesHidden: z.array(z.string()).optional(),
    companyLogo: z.string().optional(),
    companyUrl: z.string().optional(),
    projectUrls: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
    achievements: z.array(z.string()).optional(),
    employmentType: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { experiences };
