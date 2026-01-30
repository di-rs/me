import type { Experience, GroupedExperience } from "@/types/experience";

export type DisplayExperience = Experience | GroupedExperience;

export function isGroupedExperience(
  exp: DisplayExperience,
): exp is GroupedExperience {
  return "roles" in exp && Array.isArray(exp.roles);
}

export function groupExperiencesByCompany(
  experiences: Experience[],
): DisplayExperience[] {
  const experienceMap = new Map<string, Experience[]>();
  experiences.forEach((exp) => {
    if (!experienceMap.has(exp.company)) {
      experienceMap.set(exp.company, []);
    }
    experienceMap.get(exp.company)!.push(exp);
  });

  const result: DisplayExperience[] = [];

  for (const [company, exps] of experienceMap.entries()) {
    // If only one role at this company, return as single experience
    if (exps.length === 1 && exps[0]) {
      result.push(exps[0]);
      continue;
    }

    // Multiple roles - create grouped experience
    // Sort roles by start date (most recent first), then by order if dates are the same
    const sortedRoles = [...exps].sort((a, b) => {
      const dateComparison = b.startDate.localeCompare(a.startDate);
      if (dateComparison === 0) {
        return (a.order || 0) - (b.order || 0);
      }
      return dateComparison;
    });

    const firstExp = exps[0];
    if (!firstExp) continue;

    const grouped: GroupedExperience = {
      ...firstExp,
      id: `${company.toLowerCase().replace(/\s+/g, "-")}-grouped`,
      company,
      roles: sortedRoles,
      aiSummary: firstExp.aiSummary ?? exps[1]?.aiSummary
    };

    result.push(grouped);
  }

  return result;
}
