<template>
  <div class="flex flex-wrap gap-2 mb-4 stagger-item">
    <span
      v-for="tech in technologies"
      :key="tech"
      class="tech-tag px-3 py-1.5 bg-bg-primary border border-border-muted rounded-md text-[0.8125rem] text-text-secondary font-medium transition-all duration-200 hover:bg-bg-hover hover:border-border-strong hover:text-text-primary hover:-translate-y-0.5"
    >
      {{ tech }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  technologies: string[];
}

defineProps<Props>();
</script>

<style scoped>
/* Tech tags class for GSAP */
.tech-tag {
  /* All visual styles are in Tailwind classes above */
}
</style>
