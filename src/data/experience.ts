export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = "Present"
  description: string[];
  technologies: string[];
  companyLogo?: string | undefined;
  companyUrl?: string | undefined;
  projectUrls?: { name: string; url: string }[] | undefined;
  achievements?: string[] | undefined;
}
