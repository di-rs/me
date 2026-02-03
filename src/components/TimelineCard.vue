<template>
  <div
    class="timeline-card relative bg-secondary backdrop-blur-sm border border-border-muted rounded-[20px] p-5 sm:p-6 md:p-8 lg:p-10 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-3d origin-center will-change-transform shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-accent/75 hover:border-border-strong hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group"
    :class="{
      'card-left': isLeft,
      'card-right': !isLeft,
      'card-active bg-accent/90 border-border-strong/75 shadow-[0_30px_60px_rgba(0,0,0,0.8)]':
        isActive,
    }"
    @mouseenter="tiltHandlers.handleMouseEnter"
    @mouseleave="tiltHandlers.handleMouseLeave"
    @mousemove="tiltHandlers.handleMouseMove"
  >
    <div class="relative z-1">
      <CompanyLogo
        v-if="experience.companyLogo"
        :src="experience.companyLogo"
        :alt="experience.company"
      />

      <SingleRoleExperience
        v-if="!hasMultipleRoles && !isGroupedExperience(experience)"
        :experience="experience"
      />

      <MultiRoleExperience
        v-if="hasMultipleRoles && isGroupedExperience(experience)"
        :experience="experience"
      />

      <ProjectLinks
        v-if="experience.projectUrls"
        :projects="experience.projectUrls"
      />
    </div>

    <DurationBadge :duration="getDuration()" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { DisplayExperience } from "@/utils/experience";
import { isGroupedExperience } from "@/utils/experience";
import { calculateDurationBetween } from "@/utils/date";
import { createTiltHandler } from "@/utils/animation";
import CompanyLogo from "./timeline-card/CompanyLogo.vue";
import SingleRoleExperience from "./timeline-card/SingleRoleExperience.vue";
import MultiRoleExperience from "./timeline-card/MultiRoleExperience.vue";
import ProjectLinks from "./timeline-card/ProjectLinks.vue";
import DurationBadge from "./timeline-card/DurationBadge.vue";

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

// Create tilt animation handlers
const tiltHandlers = createTiltHandler();

const getDuration = (): string => {
  if (isGroupedExperience(props.experience)) {
    return calculateCompanyDuration();
  }
  return calculateDurationBetween(
    props.experience.startDate,
    props.experience.endDate,
  );
};

/**
 * Calculate total duration for a company with multiple roles
 */
const calculateCompanyDuration = (): string => {
  if (!isGroupedExperience(props.experience)) {
    return getDuration();
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
  }, endDates[0]!);

  return calculateDurationBetween(earliestStart, latestEnd);
};
</script>

<style scoped>
/* GSAP needs to find .timeline-card class for animations */
.timeline-card {
  /* All visual styles are in Tailwind classes above */
}
</style>
