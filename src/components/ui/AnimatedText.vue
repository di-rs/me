<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  texts: string[];
  interval?: number;
}>();

const currentIndex = ref(0);
const isAnimating = ref(false);
let intervalId: number | null = null;

const animateNext = () => {
  if (isAnimating.value) return;

  isAnimating.value = true;

  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % props.texts.length;

    setTimeout(() => {
      isAnimating.value = false;
    }, 600);
  }, 300);
};

onMounted(() => {
  intervalId = window.setInterval(animateNext, props.interval || 3000);
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="animated-text-container">
    <transition name="text-transition" mode="out-in">
      <span :key="currentIndex" class="animated-text">
        {{ texts[currentIndex] }}
      </span>
    </transition>
  </div>
</template>

<style scoped>
.animated-text-container {
  display: inline-block;
  position: relative;
  min-width: 200px;
  text-align: left;
}

.animated-text {
  display: inline-block;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary), #a3a3a3);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-transition-enter-active,
.text-transition-leave-active {
  transition: all 0.3s ease;
}

.text-transition-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  filter: blur(4px);
}

.text-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  filter: blur(4px);
}

.text-transition-enter-to,
.text-transition-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}
</style>
