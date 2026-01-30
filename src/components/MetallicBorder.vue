<template>
  <div
    :class="position === 'bottom' ? 'bottom-0' : 'top-0'"
    class="absolute left-0 right-0 h-px pointer-events-none"
  >
    <div
      class="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-gray-300/30 to-transparent bg-size-[200%_100%]"
      :style="{
        animationDelay: `${delay}s`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  position?: "top" | "bottom";
  delay?: number;
}

withDefaults(defineProps<Props>(), {
  position: "bottom",
  delay: 0,
});
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.animate-shimmer {
  animation: shimmer 20s ease-in-out infinite;
}
</style>
