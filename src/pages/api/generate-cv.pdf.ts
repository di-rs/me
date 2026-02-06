import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import React from "react";
import { CVDocument } from "../../components/cv/CVDocument";
import type { CVData } from "../../components/cv/CVDocument";
import { groupExperiencesByCompany } from "../../utils/experience";
import {
  sortExperiencesByDate,
  getCurrentRole,
  prepareSummaryContent,
} from "../../utils/cv";
import { cvData } from "../../content/siteData";

export const GET: APIRoute = async () => {
  try {
    // Fetch all data
    const aboutEntries = await getCollection("about");
    const experienceEntries = await getCollection("experiences");
    const educationEntries = await getCollection("education");
    const socialData = await getEntry("social", "social");
    if (!socialData) throw new Error("Social content not found");

    // Parse about content
    const aboutContent = aboutEntries[0]?.body || "";

    // Sort experiences by date (most recent first)
    const sortedExperiences = sortExperiencesByDate(experienceEntries);

    // Transform experiences to include description from body
    const experiencesWithDescription = sortedExperiences.map((exp) => ({
      ...exp.data,
      id: exp.id,
      description: (exp.body || "")
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => line.replace(/^[-*]\s*/, "").trim())
        .filter(Boolean),
    }));

    // Group experiences by company
    const groupedExperiences = groupExperiencesByCompany(
      experiencesWithDescription,
    );

    // Get current role for header
    const currentRole = getCurrentRole(experienceEntries);

    // Prepare summary content
    const summaryPoints = prepareSummaryContent(
      aboutContent,
      cvData.summaryIntro,
    );

    // Sort education by start date descending
    const sortedEducation = educationEntries
      .map((edu) => {
        const entry: {
          institution: string;
          degree: string;
          field?: string;
          location?: string;
          startDate: string;
          endDate: string | null;
        } = {
          institution: edu.data.institution,
          degree: edu.data.degree,
          startDate: edu.data.startDate,
          endDate: edu.data.endDate,
          ...(edu.data.field !== undefined && { field: edu.data.field }),
          ...(edu.data.location !== undefined && {
            location: edu.data.location,
          }),
        };
        return entry;
      })
      .sort((a, b) => {
        return b.startDate.localeCompare(a.startDate);
      });

    // Prepare CV data object
    const cvDataObject: CVData = {
      name: cvData.name,
      currentRole,
      contact: {
        email: socialData.data.email,
        linkedin: socialData.data.linkedin,
        github: socialData.data.github,
        website: "https://profile.dimaportish.com",
      },
      topSkills: cvData.topSkills,
      languages: cvData.languages,
      summaryPoints,
      experiences: groupedExperiences,
      education: sortedEducation,
    };

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      React.createElement(CVDocument, {
        data: cvDataObject,
      }) as React.ReactElement<DocumentProps>,
    );

    // Convert Buffer to ArrayBuffer if needed
    const arrayBuffer = pdfBuffer.buffer.slice(
      pdfBuffer.byteOffset,
      pdfBuffer.byteOffset + pdfBuffer.byteLength,
    ) as ArrayBuffer;

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Dmitriy_Popov_CV.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating CV:", error);
    return new Response(JSON.stringify({ error: "Failed to generate CV" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
