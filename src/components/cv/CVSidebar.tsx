import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import { cvStyles } from "./styles";

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

interface CVSidebarProps {
  contact: ContactInfo;
  topSkills: string[];
  languages: Language[];
}

export const CVSidebar: React.FC<CVSidebarProps> = ({
  contact,
  topSkills,
  languages,
}) => {
  return (
    <View style={cvStyles.sidebar}>
      {/* Contact Section */}
      <View>
        <Text style={cvStyles.sectionTitle}>Contact</Text>
        <Text style={cvStyles.link}>
          {contact.email.replace("mailto:", "")}
        </Text>
        <Link src={contact.linkedin} style={cvStyles.link}>
          LinkedIn
        </Link>
        <Link src={contact.github} style={cvStyles.link}>
          GitHub
        </Link>
        <Link src={contact.website} style={cvStyles.link}>
          Website
        </Link>
      </View>

      {/* Top Skills Section */}
      <View>
        <Text style={cvStyles.sectionTitle}>Top Skills</Text>
        {topSkills.map((skill, index) => (
          <Text key={index} style={cvStyles.skillItem}>
            {skill}
          </Text>
        ))}
      </View>

      {/* Languages Section */}
      <View>
        <Text style={cvStyles.sectionTitle}>Languages</Text>
        {languages.map((lang, index) => (
          <View key={index} style={{ marginBottom: 4 }}>
            <Text style={cvStyles.languageItem}>{lang.name}</Text>
            <Text style={cvStyles.languageLevel}>({lang.level})</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
