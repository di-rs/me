import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { cvStyles } from "./styles";
import type { DisplayExperience } from "@/utils/experience";
import { isGroupedExperience } from "@/utils/experience";
import {
  formatDateRangeWithDuration,
  calculateCompanyDuration,
  formatTechStack,
  getVisibleTechnologies,
} from "@/utils/cv";

interface CVExperienceProps {
  experiences: DisplayExperience[];
}

export const CVExperience: React.FC<CVExperienceProps> = ({ experiences }) => {
  return (
    <View>
      <Text style={cvStyles.sectionTitleContent}>Experience</Text>

      {experiences.map((exp, index) => {
        if (isGroupedExperience(exp)) {
          // Multiple roles at same company
          const totalDuration = calculateCompanyDuration(exp.roles);

          return (
            <View key={index}>
              <Text style={cvStyles.companyName}>{exp.company}</Text>
              {totalDuration && (
                <Text style={cvStyles.companyDuration}>{totalDuration}</Text>
              )}

              {exp.roles.map((role, roleIndex) => {
                const visibleTech = getVisibleTechnologies(
                  role.technologies,
                  role.technologiesHidden,
                );
                const techStackText = formatTechStack(visibleTech);

                return (
                  <View key={roleIndex} style={{ marginBottom: 15 }}>
                    <Text style={cvStyles.roleTitle}>{role.role}</Text>
                    <Text style={cvStyles.dateRange}>
                      {formatDateRangeWithDuration(
                        role.startDate,
                        role.endDate,
                      )}
                    </Text>
                    <Text style={cvStyles.dateRange}>{role.location}</Text>

                    {/* Responsibilities */}
                    <View style={{ marginTop: 6 }}>
                      {role.description.map((desc, descIndex) => (
                        <View
                          key={descIndex}
                          style={cvStyles.bulletPoint}
                          wrap={false}
                        >
                          <Text style={cvStyles.bullet}>•</Text>
                          <Text style={cvStyles.bulletText}>{desc}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Tech Stack */}
                    {visibleTech.length > 0 && (
                      <View style={cvStyles.techStack}>
                        <Text style={cvStyles.techStackLabel}>Tech Stack:</Text>
                        <Text style={cvStyles.techStackText}>
                          {techStackText}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          );
        } else {
          // Single role at company
          const visibleTech = getVisibleTechnologies(
            exp.technologies,
            exp.technologiesHidden,
          );
          const techStackText = formatTechStack(visibleTech);

          return (
            <View key={index} style={{ marginBottom: 18 }}>
              <Text style={cvStyles.companyName}>{exp.company}</Text>
              <Text style={cvStyles.roleTitle}>{exp.role}</Text>
              <Text style={cvStyles.dateRange}>
                {formatDateRangeWithDuration(exp.startDate, exp.endDate)}
              </Text>
              <Text style={cvStyles.dateRange}>{exp.location}</Text>

              {/* Responsibilities */}
              <View style={{ marginTop: 6 }}>
                {exp.description.map((desc, descIndex) => (
                  <View
                    key={descIndex}
                    style={cvStyles.bulletPoint}
                    wrap={false}
                  >
                    <Text style={cvStyles.bullet}>•</Text>
                    <Text style={cvStyles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>

              {/* Tech Stack */}
              {visibleTech.length > 0 && (
                <View style={cvStyles.techStack}>
                  <Text style={cvStyles.techStackLabel}>Tech Stack:</Text>
                  <Text style={cvStyles.techStackText}>{techStackText}</Text>
                </View>
              )}
            </View>
          );
        }
      })}
    </View>
  );
};
