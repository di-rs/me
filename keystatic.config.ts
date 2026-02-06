import { config, fields, singleton, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
    hero: singleton({
      label: "Hero Section",
      path: "src/content/hero/hero",
      schema: {
        greeting: fields.text({
          label: "Greeting",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        cta1Label: fields.text({
          label: "Primary CTA Label",
          validation: { isRequired: true },
        }),
        cta1Link: fields.text({
          label: "Primary CTA Link",
          validation: { isRequired: true },
        }),
        cta1Download: fields.text({
          label: "Primary CTA Download Filename",
        }),
        cta2Label: fields.text({
          label: "Secondary CTA Label",
          validation: { isRequired: true },
        }),
      },
    }),
    social: singleton({
      label: "Social Links",
      path: "src/content/social/social",
      schema: {
        github: fields.url({
          label: "GitHub URL",
          validation: { isRequired: true },
        }),
        linkedin: fields.url({
          label: "LinkedIn URL",
          validation: { isRequired: true },
        }),
        email: fields.text({
          label: "Email",
          validation: { isRequired: true },
        }),
      },
    }),
    techShowcase: singleton({
      label: "Tech Showcase Section",
      path: "src/content/techShowcase/techShowcase",
      schema: {
        title: fields.text({
          label: "Title",
          validation: { isRequired: true },
        }),
        startYear: fields.integer({
          label: "Start Year",
          validation: { isRequired: true },
        }),
        titleSuffix: fields.text({
          label: "Title Suffix",
          validation: { isRequired: true },
        }),
        subtitle: fields.text({
          label: "Subtitle",
          validation: { isRequired: true },
        }),
        techStacks: fields.array(
          fields.object({
            technologies: fields.array(
              fields.text({
                label: "Technology",
              }),
              {
                label: "Technologies",
                itemLabel: (props) => props.value,
              },
            ),
          }),
          {
            label: "Tech Stack Groups",
            itemLabel: (props) =>
              `Group (${props.fields.technologies.elements.length} techs)`,
          },
        ),
      },
    }),
    portfolioHeader: singleton({
      label: "Portfolio Header",
      path: "src/content/portfolioHeader/portfolioHeader",
      schema: {
        title: fields.text({
          label: "Title",
          validation: { isRequired: true },
        }),
        subtitle: fields.text({
          label: "Subtitle",
          validation: { isRequired: true },
        }),
      },
    }),
    about: singleton({
      label: "About",
      path: "src/content/about/about",
      format: { contentField: "content" },
      schema: {
        title: fields.text({
          label: "Title",
          validation: { isRequired: true },
        }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
  },
  collections: {
    education: collection({
      label: "Education",
      path: "src/content/education/*",
      slugField: "institution",
      schema: {
        institution: fields.slug({
          name: {
            label: "Institution",
            validation: { isRequired: true },
          },
        }),
        degree: fields.text({
          label: "Degree",
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: "Location",
          validation: { isRequired: true },
        }),
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: "End Date",
          validation: { isRequired: true },
        }),
        keystack: fields.array(
          fields.text({
            label: "Technology/Skill",
          }),
          {
            label: "Key Stack",
            itemLabel: (props) => props.value,
          },
        ),
      },
    }),
    experiences: collection({
      label: "Experiences",
      path: "src/content/experiences/*",
      format: { contentField: "content" },
      slugField: "company",
      schema: {
        company: fields.slug({
          name: {
            label: "Company",
            validation: { isRequired: true },
          },
        }),
        role: fields.text({
          label: "Role",
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: "Location",
          validation: { isRequired: true },
        }),
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: "End Date",
        }),
        employmentType: fields.select({
          label: "Employment Type",
          options: [
            { label: "On-site", value: "On-site" },
            { label: "Remote", value: "Remote" },
            { label: "Hybrid", value: "Hybrid" },
          ],
          defaultValue: "Remote",
        }),
        linkedinUrl: fields.url({
          label: "LinkedIn Company URL",
        }),
        companyUrl: fields.url({
          label: "Company Website",
        }),
        companyLogo: fields.text({
          label: "Company Logo Path",
        }),
        aiSummary: fields.text({
          label: "AI Summary",
          multiline: true,
        }),
        technologies: fields.array(
          fields.text({
            label: "Technology",
          }),
          {
            label: "Technologies (Visible)",
            itemLabel: (props) => props.value,
          },
        ),
        technologiesHidden: fields.array(
          fields.text({
            label: "Technology",
          }),
          {
            label: "Technologies (Hidden)",
            itemLabel: (props) => props.value,
          },
        ),
        projectUrls: fields.array(
          fields.object({
            name: fields.text({
              label: "Project Name",
              validation: { isRequired: true },
            }),
            url: fields.url({
              label: "Project URL",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Project URLs",
            itemLabel: (props) => props.fields.name.value || "New Project",
          },
        ),
        achievements: fields.array(
          fields.text({
            label: "Achievement",
          }),
          {
            label: "Achievements",
            itemLabel: (props) => props.value,
          },
        ),
        order: fields.integer({
          label: "Sort Order",
        }),
        content: fields.mdx({
          label: "Description (MDX)",
        }),
      },
    }),
  },
});
