<template>
  <div
    ref="container"
    class="fixed inset-0 w-full h-full pointer-events-none"
    style="z-index: 0"
    aria-hidden="true"
  />
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

// Helper to get color from CSS variable
const getColorFromVar = (varName: string): [number, number, number] => {
  const hex = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();

  // Convert hex to RGB
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [163, 163, 163]; // fallback to text-secondary
};

onMounted(() => {
  if (!container.value) return;

  const sketch = (p: p5) => {
    let particles: Particle[] = [];
    let particleColor: [number, number, number];
    let lineColor: [number, number, number];

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);

      // Get colors from CSS variables
      particleColor = getColorFromVar("--color-text-secondary");
      lineColor = getColorFromVar("--color-text-secondary");

      // Create minimal particles
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: p.random(p.width),
          y: p.random(p.height),
          vx: p.random(-0.2, 0.2),
          vy: p.random(-0.2, 0.2),
          size: p.random(0.8, 2.5),
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

        // Draw particle using CSS variable color
        p.noStroke();
        p.fill(particleColor[0], particleColor[1], particleColor[2], 80);
        p.circle(particle.x, particle.y, particle.size);

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const distance = p.dist(particle.x, particle.y, other.x, other.y);

          if (distance < 170) {
            const alpha = p.map(distance, 0, 170, 55, 0);
            p.stroke(lineColor[0], lineColor[1], lineColor[2], alpha);
            p.strokeWeight(0.6);
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
