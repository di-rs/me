<script setup lang="ts">
import { ref } from "vue";
import AnimatedText from "./ui/AnimatedText.vue";

defineProps<{
  technologies: string[];
  delay?: number;
}>();

const isHovered = ref(false);
</script>

<template>
  <div
    class="tech-card"
    :class="{ hovered: isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="card-glow" />
    <div class="card-border" />
    <div class="card-content">
      <AnimatedText :texts="technologies" :interval="2500" />
    </div>
  </div>
</template>

<style scoped>
.tech-card {
  position: relative;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: var(--color-bg-secondary);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.tech-card.hovered {
  transform: translateY(-4px);
}

.card-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(163, 163, 163, 0.1) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 16px;
}

.tech-card.hovered .card-glow {
  opacity: 1;
}

.card-border {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 32px;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
}

/* Shimmer effect on hover */
.tech-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transition: left 0.5s ease;
}

.tech-card.hovered::before {
  left: 100%;
}

@media (max-width: 768px) {
  .tech-card {
    max-width: 100%;
    height: 160px;
  }

  .card-content {
    font-size: 1.375rem;
    padding: 28px;
  }
}
</style>
