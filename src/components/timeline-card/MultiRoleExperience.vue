<template>
  <div>
    <!-- Company Name & Location -->
    <CompanyHeader
      :company="experience.company"
      :location="experience.location"
      :linkedin-url="experience.linkedinUrl"
    />

    <!-- Multiple Roles -->
    <div class="space-y-6">
      <div
        v-for="(role, roleIdx) in experience.roles"
        :key="roleIdx"
        class="stagger-item"
      >
        <!-- Role Header -->
        <div class="mb-4">
          <h4 class="text-lg sm:text-xl font-bold text-text-primary mb-1">
            {{ role.role }}
          </h4>
          <div
            class="flex items-center gap-2 text-text-secondary text-xs sm:text-sm"
          >
            <span class="font-semibold tracking-wider uppercase">
              {{ formatDateRange(role.startDate, role.endDate) }}
            </span>
            <template v-if="role.employmentType">
              <span>•</span>
              <span>{{ role.employmentType }}</span>
            </template>
          </div>
        </div>

        <!-- Role Description -->
        <DescriptionList :items="role.description" :compact="true" />

        <!-- Role Technologies -->
        <TechnologyTags :technologies="role.technologies" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GroupedExperience } from "@/types/experience";
import { formatDateRange } from "@/utils/date";
import CompanyHeader from "./CompanyHeader.vue";
import DescriptionList from "./DescriptionList.vue";
import TechnologyTags from "./TechnologyTags.vue";

interface Props {
  experience: GroupedExperience;
}

defineProps<Props>();
</script>
