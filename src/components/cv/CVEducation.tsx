import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { cvStyles } from "./styles";
import { formatDateRange } from "@/utils/date";

interface EducationEntry {
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate: string | null;
}

interface CVEducationProps {
  education: EducationEntry[];
}

export const CVEducation: React.FC<CVEducationProps> = ({ education }) => {
  return (
    <View>
      <Text style={cvStyles.sectionTitleContent}>Education</Text>

      {education.map((edu, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={cvStyles.educationInstitution}>{edu.institution}</Text>
          <Text style={cvStyles.educationDegree}>
            {edu.degree}
            {edu.field && ` · ${edu.field}`}
          </Text>
          <Text style={cvStyles.educationDate}>
            {formatDateRange(edu.startDate, edu.endDate)}
          </Text>
        </View>
      ))}
    </View>
  );
};
