<template>
  <div>
    <!-- Role Title -->
    <RoleHeader
      :role="experience.role"
      :date-range="formatDateRange(experience.startDate, experience.endDate)"
      :employment-type="experience.employmentType"
    />

    <!-- Company & Location -->
    <div class="flex flex-col gap-1 mb-5 stagger-item">
      <span class="text-text-primary text-lg font-semibold">{{
        experience.company
      }}</span>
      <span class="text-text-secondary text-sm">{{ experience.location }}</span>
    </div>

    <!-- Description -->
    <DescriptionList :items="experience.description" />

    <!-- Technologies -->
    <TechnologyTags :technologies="experience.technologies" />
  </div>
</template>

<script setup lang="ts">
import type { Experience } from "@/data/experience";
import { formatDateRange } from "@/utils/date";
import RoleHeader from "./RoleHeader.vue";
import DescriptionList from "./DescriptionList.vue";
import TechnologyTags from "./TechnologyTags.vue";

interface Props {
  experience: Experience;
}

defineProps<Props>();
</script>
