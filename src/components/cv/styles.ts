import { StyleSheet } from "@react-pdf/renderer";

export const colors = {
  sidebarBg: "#2c4563", // Darker gray-blue
  sidebarText: "#FFFFFF",
  contentBg: "#FFFFFF",
  contentText: "#000000",
  sectionHeader: "#2C3E50",
  textSecondary: "#666666",
  techStackBg: "#F5F5F5", // Light gray for tech stack background
  borderColor: "#CCCCCC",
};

export const cvStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: colors.contentBg,
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentHeader: {
    marginBottom: 15,
  },
  contentHeaderName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.contentText,
  },
  contentHeaderTitle: {
    fontSize: 14,
    marginBottom: 3,
    color: colors.contentText,
  },
  contentHeaderLocation: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  sidebarBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "30%",
    backgroundColor: colors.sidebarBg,
  },
  container: {
    flexDirection: "row",
    flex: 1,
  },
  sidebarContent: {
    width: "30%",
    color: colors.sidebarText,
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 20,
  },
  sidebar: {
    backgroundColor: "transparent",
    color: colors.sidebarText,
  },
  content: {
    width: "70%",
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: colors.sidebarText,
  },
  sectionTitleContent: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: colors.sectionHeader,
    borderBottom: `1pt solid ${colors.borderColor}`,
    paddingBottom: 5,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: {
    width: 15,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 3,
  },
  companyDuration: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  techStack: {
    marginTop: 10,
    marginBottom: 12,
    padding: 6,
    backgroundColor: colors.techStackBg,
    borderRadius: 3,
  },
  techStackLabel: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 3,
  },
  techStackText: {
    fontSize: 9,
    lineHeight: 1.3,
  },
  link: {
    color: colors.sidebarText,
    textDecoration: "none",
    fontSize: 10,
    marginBottom: 5,
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 4,
  },
  languageItem: {
    fontSize: 10,
    marginBottom: 4,
  },
  languageLevel: {
    fontSize: 9,
    color: "#CCCCCC",
  },
  educationInstitution: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
  educationDegree: {
    fontSize: 10,
    marginBottom: 3,
  },
  educationDate: {
    fontSize: 10,
    color: colors.textSecondary,
  },
});
