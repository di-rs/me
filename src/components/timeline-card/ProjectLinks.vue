<template>
  <div
    v-if="projects && projects.length > 0"
    class="flex flex-wrap gap-4 mt-4 stagger-item"
  >
    <a
      v-for="project in projects"
      :key="project.url"
      :href="project.url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-text-primary text-sm font-medium no-underline transition-colors duration-200 hover:text-text-secondary"
    >
      {{ project.name }} →
    </a>
  </div>
</template>

<script setup lang="ts">
interface ProjectUrl {
  name: string;
  url: string;
}

interface Props {
  projects?: ProjectUrl[];
}

defineProps<Props>();
</script>
