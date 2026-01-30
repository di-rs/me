<template>
  <div
    v-if="src"
    class="w-16 h-16 mb-4 rounded-xl overflow-hidden bg-bg-primary flex items-center justify-center stagger-item"
  >
    <img
      :src="src"
      :alt="alt"
      class="w-full h-full object-contain grayscale-30 brightness-90 transition-[filter] duration-300 group-hover:grayscale-0 group-hover:brightness-100"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string;
  alt: string;
}

defineProps<Props>();
</script>
