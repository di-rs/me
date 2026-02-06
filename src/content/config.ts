import { defineCollection, z } from "astro:content";

const about = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const hero = defineCollection({
  type: "data",
  schema: z.object({
    greeting: z.string(),
    description: z.string(),
    cta1Label: z.string(),
    cta1Link: z.string(),
    cta1Download: z.string().optional(),
    cta2Label: z.string(),
  }),
});

const social = defineCollection({
  type: "data",
  schema: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    email: z.string(),
  }),
});

const techShowcase = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    startYear: z.number(),
    titleSuffix: z.string(),
    subtitle: z.string(),
    techStacks: z.array(
      z.object({
        technologies: z.array(z.string()),
      }),
    ),
  }),
});

const portfolioHeader = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
});

const education = defineCollection({
  type: "data",
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    location: z.string().optional(),
    startDate: z.coerce.string(),
    endDate: z.coerce.string().nullable(),
    description: z.string().optional(),
    keystack: z.array(z.string()).optional(),
  }),
});

const experiences = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    startDate: z.coerce.string(),
    endDate: z.coerce
      .string()
      .nullable()
      .transform((v) => (v === "undefined" ? undefined : v)),
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
    aiSummary: z.string().optional(),
  }),
});

const siteMetadata = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
  }),
});

const cvMetadata = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    summaryIntro: z.string(),
    topSkills: z.array(z.string()),
    languages: z.array(
      z.object({
        name: z.string(),
        level: z.string(),
      }),
    ),
  }),
});

export const collections = {
  experiences,
  about,
  education,
  hero,
  social,
  techShowcase,
  portfolioHeader,
  siteMetadata,
  cvMetadata,
};
