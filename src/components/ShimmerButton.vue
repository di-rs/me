<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :download="download"
    :target="href && !download ? '_blank' : undefined"
    :rel="href && !download ? 'noopener noreferrer' : undefined"
    class="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium transition-all duration-300 rounded-md overflow-hidden"
    :class="buttonClasses"
  >
    <!-- Animated background gradient -->
    <div
      v-if="variant === 'primary'"
      class="absolute inset-0 bg-linear-to-r from-text-primary via-text-secondary to-text-primary bg-[length:200%_100%] transition-all duration-500 group-hover:bg-[length:100%_100%]"
      style="animation: gradient-shift 3s ease infinite"
    />

    <!-- Glow effect on hover -->
    <div
      v-if="variant === 'primary'"
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[radial-gradient(circle_at_center,var(--color-text-primary)/30,transparent_70%)]"
    />

    <!-- Border shimmer for secondary -->
    <div
      v-if="variant === 'secondary'"
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-text-secondary/15 to-transparent animate-[shimmer-slide_3s_ease-in-out_infinite]"
    />

    <span class="relative z-10 flex items-center gap-2">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary";
  href?: string;
  download?: boolean | string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  download: false,
  href: undefined,
});

const buttonClasses = computed(() => {
  if (props.variant === "primary") {
    return "text-bg-primary shadow-lg shadow-text-primary/20 hover:shadow-xl hover:shadow-text-primary/30 hover:scale-[1.02]";
  }
  return "border border-border-muted text-text-secondary hover:border-text-muted hover:text-text-primary hover:bg-bg-secondary backdrop-blur-sm";
});
</script>

<style scoped>
@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes shimmer-slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
