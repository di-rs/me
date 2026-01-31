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
    linkedinUrl: z.string().optional(),
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
    order: z.number().optional(),
    aiSummary: z.string(),
  }),
});

const about = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const education = defineCollection({
  type: "content",
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    location: z.string().optional(),
    startDate: z.string(), // YYYY-MM format
    endDate: z.string().nullable(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { experiences, about, education };
