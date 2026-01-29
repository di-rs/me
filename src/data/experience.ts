export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = "Present"
  description: string[];
  technologies: string[];
  companyLogo?: string;
  companyUrl?: string;
  projectUrls?: { name: string; url: string }[];
  achievements?: string[];
  type: "work" | "education" | "project";
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Tech Innovation Labs",
    role: "Senior Software Engineer",
    location: "San Francisco, CA",
    startDate: "2023-01",
    endDate: null,
    description: [
      "Led a team of 5 engineers in building a scalable microservices architecture",
      "Increased system performance by 40% through optimization and caching strategies",
      "Implemented CI/CD pipeline that reduced deployment time by 60%",
    ],
    technologies: [
      "React",
      "Node.js",
      "AWS",
      "Docker",
      "TypeScript",
      "PostgreSQL",
    ],
    companyUrl: "https://example.com",
    type: "work",
    achievements: [
      "Promoted to Senior Engineer within 18 months",
      "Mentored 3 junior developers",
    ],
  },
  {
    id: "2",
    company: "Digital Solutions Inc",
    role: "Full Stack Developer",
    location: "Remote",
    startDate: "2021-06",
    endDate: "2022-12",
    description: [
      "Built and maintained multiple client-facing web applications",
      "Collaborated with design team to implement pixel-perfect UI components",
      "Integrated third-party APIs and payment systems",
    ],
    technologies: ["Vue.js", "Python", "Django", "MongoDB", "Redis"],
    companyUrl: "https://example.com",
    type: "work",
  },
  {
    id: "3",
    company: "StartupX",
    role: "Frontend Developer",
    location: "New York, NY",
    startDate: "2019-08",
    endDate: "2021-05",
    description: [
      "Developed responsive web applications using modern JavaScript frameworks",
      "Improved page load time by 50% through code splitting and lazy loading",
      "Conducted code reviews and established frontend best practices",
    ],
    technologies: ["React", "Redux", "Webpack", "SASS", "Jest"],
    companyUrl: "https://example.com",
    type: "work",
  },
  {
    id: "4",
    company: "State University",
    role: "Bachelor of Science in Computer Science",
    location: "Boston, MA",
    startDate: "2015-09",
    endDate: "2019-05",
    description: [
      "Graduated with honors (3.8 GPA)",
      "Specialized in Software Engineering and AI",
      "President of Computer Science Club",
    ],
    technologies: ["Java", "C++", "Python", "Machine Learning", "Algorithms"],
    type: "education",
  },
];

export const getWorkExperiences = () =>
  experiences.filter((exp) => exp.type === "work");

export const getEducation = () =>
  experiences.filter((exp) => exp.type === "education");

export const getAllExperiences = () => experiences;
