<template>
  <div class="space-y-8">
    <BlurReveal :delay="0.2" :duration="0.75" class="space-y-6">
      <h1 class="text-5xl md:text-6xl font-bold text-text-primary">
        {{ hero.greeting }}
      </h1>
      <p class="text-xl text-text-secondary leading-relaxed">
        {{ hero.description }}
      </p>
    </BlurReveal>

    <div class="flex flex-wrap gap-4">
      <ShimmerButton
        variant="primary"
        href="https://drive.google.com/uc?export=download&id=17-z7Vpdw0bRPproFqa6HorcKx-otFV1e"
        download="Dmitriy_Popov_CV.pdf"
      >
        {{ hero.cta.primary }}
      </ShimmerButton>
      <ShimmerButton variant="secondary" :href="social.linkedin">
        {{ hero.cta.secondary }}
      </ShimmerButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlurReveal from "./BlurReveal.vue";
import ShimmerButton from "./ShimmerButton.vue";
import { hero, social } from "../data/siteData";
</script>
