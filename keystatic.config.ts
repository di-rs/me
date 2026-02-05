import { config, fields, singleton, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
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
      },
    }),
  },
});
