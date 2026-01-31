<template>
  <div class="mb-5 stagger-item">
    <h3
      class="text-xl sm:text-2xl md:text-xl font-bold text-text-primary mb-2 leading-tight"
    >
      <a
        v-if="linkedinUrl"
        :href="linkedinUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:opacity-70 transition-opacity"
      >
        {{ company }}
      </a>
      <span v-else>{{ company }}</span>
    </h3>
    <span class="text-text-secondary text-xs sm:text-sm">{{ location }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  company: string;
  location: string;
  linkedinUrl?: string | undefined;
}

defineProps<Props>();
</script>
