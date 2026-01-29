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
  employmentType?: string | undefined; // e.g., "Full-time", "Contract", "Remote", "Hybrid"
}

// For grouped experiences (multiple roles at same company)
export interface GroupedExperience {
  id: string;
  company: string;
  location: string;
  companyLogo?: string | undefined;
  companyUrl?: string | undefined;
  projectUrls?: { name: string; url: string }[] | undefined;
  roles: {
    role: string;
    startDate: string;
    endDate: string | null;
    description: string[];
    technologies: string[];
    achievements?: string[] | undefined;
    employmentType?: string | undefined;
  }[];
}
