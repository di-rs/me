<template>
  <BlurReveal :delay="0.2" :duration="0.75" class="space-y-6">
    <h1 class="text-5xl md:text-6xl font-bold text-text-primary">
      Hi, I'm Dima 👋
    </h1>
    <p class="text-xl text-text-secondary leading-relaxed">
      I'm a software engineer with a passion to imperfection and productivity.
    </p>
  </BlurReveal>
</template>

<script setup lang="ts">
import BlurReveal from "./BlurReveal.vue";
</script>
