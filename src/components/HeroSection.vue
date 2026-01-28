<template>
  <div class="space-y-8">
    <BlurReveal :delay="0.2" :duration="0.75" class="space-y-6">
      <h1 class="text-5xl md:text-6xl font-bold text-text-primary">
        Hi, I'm Dima 👋
      </h1>
      <p class="text-xl text-text-secondary leading-relaxed">
        Web and AI proficient Software Engineer with a passion to imperfection
        and productivity.
      </p>
    </BlurReveal>

    <div class="flex flex-wrap gap-4">
      <ShimmerButton
        variant="primary"
        href="https://drive.google.com/uc?export=download&id=17-z7Vpdw0bRPproFqa6HorcKx-otFV1e"
        download="Dmitriy_Popov_CV.pdf"
      >
        Download CV
      </ShimmerButton>
      <ShimmerButton
        variant="secondary"
        href="https://www.linkedin.com/in/popov-dmitriy"
      >
        Let's Connect
      </ShimmerButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlurReveal from "./BlurReveal.vue";
import ShimmerButton from "./ShimmerButton.vue";
</script>
