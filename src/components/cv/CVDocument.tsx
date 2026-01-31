import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { cvStyles } from "./styles";
import { CVSidebar } from "./CVSidebar";
import { CVSummary } from "./CVSummary";
import { CVExperience } from "./CVExperience";
import { CVEducation } from "./CVEducation";
import type { DisplayExperience } from "@/utils/experience";

interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  website: string;
}

interface Language {
  name: string;
  level: string;
}

interface EducationEntry {
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate: string | null;
}

export interface CVData {
  name: string;
  currentRole: {
    role: string;
    company: string;
    location: string;
  };
  contact: ContactInfo;
  topSkills: string[];
  languages: Language[];
  summaryPoints: string[];
  experiences: DisplayExperience[];
  education: EducationEntry[];
}

interface CVDocumentProps {
  data: CVData;
}

export const CVDocument: React.FC<CVDocumentProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={cvStyles.page}>
        {/* Sidebar background - fixed position */}
        <View style={cvStyles.sidebarBackground} fixed />

        {/* Two-column layout */}
        <View style={cvStyles.container}>
          {/* Sidebar content */}
          <View style={cvStyles.sidebarContent}>
            <CVSidebar
              contact={data.contact}
              topSkills={data.topSkills}
              languages={data.languages}
            />
          </View>

          {/* Content */}
          <View style={cvStyles.content}>
            {/* Header at top of content */}
            <View style={cvStyles.contentHeader}>
              <Text style={cvStyles.contentHeaderName}>{data.name}</Text>
              <Text style={cvStyles.contentHeaderTitle}>
                {data.currentRole.role} at {data.currentRole.company}
              </Text>
              <Text style={cvStyles.contentHeaderLocation}>
                {data.currentRole.location}
              </Text>
            </View>

            <CVSummary summaryPoints={data.summaryPoints} />
            <CVExperience experiences={data.experiences} />
            <CVEducation education={data.education} />
          </View>
        </View>
      </Page>
    </Document>
  );
};
