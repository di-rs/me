<template>
  <div class="flex flex-wrap gap-2 stagger-item">
    <span
      v-for="tech in technologies"
      :key="tech"
      class="tech-tag px-2 py-1 sm:px-3 sm:py-1.5 bg-primary-foreground border border-muted-foreground/20 rounded-md text-[0.7rem] sm:text-[0.8125rem] text-muted-foreground/60 font-medium transition-all duration-200 hover:bg-accent/15 hover:border-border-strong hover:text-primary hover:-translate-y-0.5"
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
