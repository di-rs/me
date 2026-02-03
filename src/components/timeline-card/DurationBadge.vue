<template>
  <div
    class="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-1.5 bg-accent border border-text-secondary/15 rounded-md text-[0.65rem] sm:text-xs text-accent-foreground font-semibold tracking-tight"
  >
    {{ duration }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  duration: string;
}

defineProps<Props>();
</script>
