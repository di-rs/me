<template>
  <div class="mb-5 stagger-item">
    <h3
      class="text-2xl md:text-xl font-bold text-text-primary mb-2 leading-tight"
    >
      {{ company }}
    </h3>
    <span class="text-text-secondary text-sm">{{ location }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  company: string;
  location: string;
}

defineProps<Props>();
</script>
