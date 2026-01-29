<template>
  <div>
    <h3
      class="text-xl sm:text-2xl md:text-xl font-bold text-text-primary mb-2 leading-tight stagger-item"
    >
      {{ role }}
    </h3>

    <div
      class="flex items-center gap-2 text-text-secondary text-xs sm:text-sm mb-2 stagger-item"
    >
      <span class="font-semibold tracking-wider uppercase">
        {{ dateRange }}
      </span>
      <template v-if="employmentType">
        <span>•</span>
        <span>{{ employmentType }}</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  role: string;
  dateRange: string;
  employmentType?: string;
}

defineProps<Props>();
</script>
