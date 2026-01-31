import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { cvStyles } from "./styles";

interface CVSummaryProps {
  summaryPoints: string[];
}

export const CVSummary: React.FC<CVSummaryProps> = ({ summaryPoints }) => {
  return (
    <View>
      <Text style={cvStyles.sectionTitleContent}>Summary</Text>
      {summaryPoints.map((point, index) => (
        <View key={index} style={cvStyles.bulletPoint} wrap={false}>
          <Text style={cvStyles.bullet}>•</Text>
          <Text style={cvStyles.bulletText}>{point}</Text>
        </View>
      ))}
    </View>
  );
};
