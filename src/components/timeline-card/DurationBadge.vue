<template>
  <div
    class="absolute top-4 right-4 px-3 py-1.5 bg-text-secondary/[0.08] border border-text-secondary/[0.15] rounded-md text-xs text-text-secondary font-semibold tracking-tight"
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
