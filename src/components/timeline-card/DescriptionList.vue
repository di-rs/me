<template>
  <ul class="list-none m-0 p-0 stagger-item" :class="compact ? 'mb-4' : 'mb-6'">
    <li
      v-for="(item, idx) in items"
      :key="idx"
      class="text-secondary-foreground/80 text-sm sm:text-xs leading-relaxed mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  items: string[];
  compact?: boolean;
}

withDefaults(defineProps<Props>(), {
  compact: false,
});
</script>
