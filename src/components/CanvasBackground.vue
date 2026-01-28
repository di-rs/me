<template>
  <div
    ref="container"
    class="fixed inset-0 w-full h-full pointer-events-none"
    style="z-index: 0"
    aria-hidden="true"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import p5 from "p5";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!container.value) return;

  const sketch = (p: p5) => {
    let particles: Particle[] = [];

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);

      // Create minimal particles
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: p.random(p.width),
          y: p.random(p.height),
          vx: p.random(-0.2, 0.2),
          vy: p.random(-0.2, 0.2),
          size: p.random(0.5, 2.5),
        });
      }
    };

    p.draw = () => {
      p.clear();

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;

        // Draw particle
        p.noStroke();
        p.fill(163, 163, 163, 65);
        p.circle(particle.x, particle.y, particle.size);

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const distance = p.dist(particle.x, particle.y, other.x, other.y);

          if (distance < 150) {
            const alpha = p.map(distance, 0, 150, 40, 0);
            p.stroke(163, 163, 163, alpha);
            p.strokeWeight(0.5);
            p.line(particle.x, particle.y, other.x, other.y);
          }
        });
      });
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  new p5(sketch, container.value);
});
</script>
