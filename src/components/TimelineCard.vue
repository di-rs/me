<template>
  <div
    class="timeline-card relative bg-bg-tertiary border border-border-muted rounded-[20px] p-10 md:p-8 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] origin-center will-change-transform shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-bg-subtle hover:border-border-strong hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group"
    :class="{
      'card-left': isLeft,
      'card-right': !isLeft,
      'card-active bg-bg-subtle border-border-strong/75 shadow-[0_30px_60px_rgba(0,0,0,0.8)]':
        isActive,
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <!-- Card Content -->
    <div class="relative z-[1]">
      <!-- Company Logo (if provided) -->
      <div
        v-if="experience.companyLogo"
        class="w-16 h-16 mb-4 rounded-xl overflow-hidden bg-bg-primary flex items-center justify-center stagger-item"
      >
        <img
          :src="experience.companyLogo"
          :alt="experience.company"
          class="w-full h-full object-contain grayscale-[30%] brightness-90 transition-[filter] duration-300 group-hover:grayscale-0 group-hover:brightness-100"
        />
      </div>

      <!-- Company Name & Location (for merged experiences) -->
      <div
        v-if="hasMultipleRoles && isGroupedExperience(experience)"
        class="mb-5 stagger-item"
      >
        <h3
          class="text-2xl md:text-xl font-bold text-text-primary mb-2 leading-tight"
        >
          {{ experience.company }}
        </h3>
        <span class="text-text-secondary text-sm">{{
          experience.location
        }}</span>
      </div>

      <!-- Single Role Experience -->
      <div v-if="!hasMultipleRoles">
        <!-- Role Title -->
        <h3
          class="text-2xl md:text-xl font-bold text-text-primary mb-2 leading-tight stagger-item"
        >
          {{ !isGroupedExperience(experience) ? experience.role : "" }}
        </h3>

        <!-- Date Range & Employment Type -->
        <div
          class="flex items-center gap-2 text-text-secondary text-sm mb-2 stagger-item"
        >
          <span class="font-semibold tracking-wider uppercase">
            {{
              !isGroupedExperience(experience)
                ? formatDateRange(experience.startDate, experience.endDate)
                : ""
            }}
          </span>
          <span
            v-if="!isGroupedExperience(experience) && experience.employmentType"
            >•</span
          >
          <span
            v-if="!isGroupedExperience(experience) && experience.employmentType"
          >
            {{ experience.employmentType }}
          </span>
        </div>

        <!-- Company & Location -->
        <div class="flex flex-col gap-1 mb-5 stagger-item">
          <span class="text-text-primary text-lg font-semibold">{{
            experience.company
          }}</span>
          <span class="text-text-secondary text-sm">{{
            experience.location
          }}</span>
        </div>

        <!-- Description -->
        <ul class="list-none m-0 mb-6 p-0 stagger-item">
          <li
            v-for="(item, idx) in !isGroupedExperience(experience)
              ? experience.description
              : []"
            :key="idx"
            class="text-text-secondary text-[0.9375rem] leading-relaxed mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-text-subtle"
          >
            {{ item }}
          </li>
        </ul>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-2 mb-4 stagger-item">
          <span
            v-for="tech in !isGroupedExperience(experience)
              ? experience.technologies
              : []"
            :key="tech"
            class="tech-tag px-3 py-1.5 bg-bg-primary border border-border-muted rounded-md text-[0.8125rem] text-text-secondary font-medium transition-all duration-200 hover:bg-bg-hover hover:border-border-strong hover:text-text-primary hover:-translate-y-0.5"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Achievements (if any) -->
        <div
          v-if="!isGroupedExperience(experience) && experience.achievements"
          class="mt-4 pt-4 border-t border-border-muted stagger-item"
        >
          <div class="text-text-primary text-sm font-semibold mb-2">
            Key Achievements:
          </div>
          <ul class="list-none m-0 p-0">
            <li
              v-for="(achievement, idx) in experience.achievements"
              :key="idx"
              class="text-text-secondary text-sm leading-relaxed mb-1 pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-success"
            >
              {{ achievement }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Multiple Roles (Merged Experience) -->
      <div
        v-if="hasMultipleRoles && isGroupedExperience(experience)"
        class="space-y-6"
      >
        <div
          v-for="(role, roleIdx) in experience.roles"
          :key="roleIdx"
          class="stagger-item"
        >
          <!-- Role Header -->
          <div class="mb-4">
            <h4 class="text-xl font-bold text-text-primary mb-1">
              {{ role.role }}
            </h4>
            <div class="flex items-center gap-2 text-text-secondary text-sm">
              <span class="font-semibold tracking-wider uppercase">
                {{ formatDateRange(role.startDate, role.endDate) }}
              </span>
              <span v-if="role.employmentType">•</span>
              <span v-if="role.employmentType">
                {{ role.employmentType }}
              </span>
            </div>
          </div>

          <!-- Role Description -->
          <ul class="list-none m-0 mb-4 p-0">
            <li
              v-for="(item, idx) in role.description"
              :key="idx"
              class="text-text-secondary text-[0.9375rem] leading-relaxed mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-text-subtle"
            >
              {{ item }}
            </li>
          </ul>

          <!-- Role Technologies -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tech in role.technologies"
              :key="tech"
              class="tech-tag px-3 py-1.5 bg-bg-primary border border-border-muted rounded-md text-[0.8125rem] text-text-secondary font-medium transition-all duration-200 hover:bg-bg-hover hover:border-border-strong hover:text-text-primary hover:-translate-y-0.5"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Role Achievements (if any) -->
          <div
            v-if="role.achievements"
            class="mt-3 pt-3 border-t border-border-muted"
          >
            <ul class="list-none m-0 p-0">
              <li
                v-for="(achievement, idx) in role.achievements"
                :key="idx"
                class="text-text-secondary text-sm leading-relaxed mb-1 pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-success"
              >
                {{ achievement }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Project Links (if any) -->
      <div
        v-if="experience.projectUrls"
        class="flex flex-wrap gap-4 mt-4 stagger-item"
      >
        <a
          v-for="project in experience.projectUrls"
          :key="project.url"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-primary text-sm font-medium no-underline transition-colors duration-200 hover:text-text-secondary"
        >
          {{ project.name }} →
        </a>
      </div>
    </div>

    <!-- Duration Badge (absolute position at top right) -->
    <div
      class="absolute top-4 right-4 px-3 py-1.5 bg-text-secondary/[0.08] border border-text-secondary/[0.15] rounded-md text-xs text-text-secondary font-semibold tracking-tight"
    >
      {{ hasMultipleRoles ? formatCompanyDuration() : calculateDuration() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { DisplayExperience } from "@/utils/experience";
import { isGroupedExperience } from "@/utils/experience";

interface Props {
  experience: DisplayExperience;
  index: number;
  isActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
});

const isLeft = computed(() => props.index % 2 === 0);
const hasMultipleRoles = computed(() => isGroupedExperience(props.experience));

const formatDate = (dateStr: string) => {
  const [year, month] = dateStr.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

const formatDateRange = (
  startDate: string,
  endDate: string | null | undefined,
) => {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} - ${end}`;
};

const calculateDurationBetween = (
  startDate: string,
  endDate: string | null | undefined,
) => {
  const [startYear, startMonth] = startDate.split("-").map(Number);

  let endYear, endMonth;
  if (endDate) {
    [endYear, endMonth] = endDate.split("-").map(Number);
  } else {
    // Use current date for "Present"
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  }

  let years = endYear - startYear;
  let months = endMonth - startMonth;

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) {
    parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  }
  if (months > 0) {
    parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  }

  return parts.join(" ") || "1 mo";
};

const calculateDuration = () => {
  if (isGroupedExperience(props.experience)) {
    return formatCompanyDuration();
  }
  return calculateDurationBetween(
    props.experience.startDate,
    props.experience.endDate,
  );
};

const calculateDurationForRole = (
  startDate: string,
  endDate: string | null | undefined,
) => {
  return calculateDurationBetween(startDate, endDate);
};

const formatCompanyDuration = () => {
  if (!isGroupedExperience(props.experience)) {
    return calculateDuration();
  }

  // Find the earliest start date and latest end date across all roles
  const roles = props.experience.roles;
  const startDates = roles.map((r) => r.startDate);
  const endDates = roles.map((r) => r.endDate);

  const earliestStart = startDates.reduce((earliest, current) => {
    return current < earliest ? current : earliest;
  });

  const latestEnd = endDates.reduce((latest: string | null, current) => {
    if (current === null) return null; // If any role is current, company is current
    if (latest === null) return current;
    return current > latest ? current : latest;
  }, endDates[0]);

  return calculateDurationBetween(earliestStart, latestEnd);
};

// Use RAF for smooth tilt animation
let ticking = false;
let lastMouseX = 0;
let lastMouseY = 0;

const handleMouseEnter = (e: MouseEvent) => {
  // Trigger hover animation (handled by CSS)
};

const handleMouseLeave = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement;
  ticking = false;
  // Reset tilt transform smoothly with transition
  card.style.transition = "transform 0.3s ease-out";
  card.style.transform =
    "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)";

  setTimeout(() => {
    card.style.transition = "";
  }, 300);
};

const handleMouseMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  if (!ticking) {
    ticking = true;

    requestAnimationFrame(() => {
      const rotateY = x * 10;
      const rotateX = -y * 10;

      // Direct 3D tilt effect
      card.style.transform = `
        perspective(1000px) 
        rotateY(${rotateY}deg) 
        rotateX(${rotateX}deg) 
        translateY(-4px)
        scale(1.02)
      `;

      ticking = false;
    });
  }
};
</script>

<style scoped>
/* GSAP needs to find .timeline-card class for animations */
.timeline-card {
  /* All visual styles are in Tailwind classes above */
}

/* Tech tags class for GSAP */
.tech-tag {
  /* All visual styles are in Tailwind classes above */
}
</style>
