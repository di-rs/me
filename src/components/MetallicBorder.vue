<template>
  <div
    :class="position === 'bottom' ? 'bottom-0' : 'top-0'"
    class="absolute left-0 right-0 h-[1px] pointer-events-none"
  >
    <div
      class="absolute inset-0 animate-shimmer"
      :style="{
        background: `linear-gradient(90deg,
          transparent 0%,
          rgba(163, 163, 163, 0.1) 20%,
          rgba(212, 212, 212, 0.3) 40%,
          rgba(163, 163, 163, 0.1) 60%,
          transparent 80%
        )`,
        backgroundSize: '200% 100%',
        animationDelay: `${delay}s`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  position?: 'top' | 'bottom';
  delay?: number;
}

withDefaults(defineProps<Props>(), {
  position: 'bottom',
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
