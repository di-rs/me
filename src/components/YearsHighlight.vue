<script setup lang="ts">
import { ref, onMounted } from "vue";
import TextHighlight from "./TextHighlight.vue";

const props = defineProps<{
  startYear: number;
}>();

const yearsText = ref("");

onMounted(() => {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - props.startYear + 1;
  yearsText.value = `${yearsOfExperience} years`;
});
</script>

<template>
  <TextHighlight :text="yearsText" />
</template>
