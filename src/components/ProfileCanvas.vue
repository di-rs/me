<template>
  <div class="relative w-[300px] h-[300px] mx-auto">
    <div
      ref="container"
      class="w-full h-full transition-transform duration-300 ease-out hover:scale-110 cursor-pointer relative z-10"
      @click="triggerWave"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import p5 from "p5";

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
}

interface WaveRing {
  radius: number;
  alpha: number;
}

const container = ref<HTMLDivElement | null>(null);
let waveP5Instance: p5 | null = null;

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
    : [163, 163, 163]; // fallback
};

const triggerWave = () => {
  if (!container.value) return;

  // Get the center position of the canvas relative to the viewport
  const rect = container.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const waveDiv = document.createElement("div");
  waveDiv.style.position = "fixed";
  waveDiv.style.top = "0";
  waveDiv.style.left = "0";
  waveDiv.style.width = "100vw";
  waveDiv.style.height = "100vh";
  waveDiv.style.pointerEvents = "none";
  waveDiv.style.zIndex = "5";
  document.body.appendChild(waveDiv);

  const sketch = (p: p5) => {
    let waveRings: WaveRing[] = [];
    let isComplete = false;
    let waveColor: [number, number, number];

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      waveColor = getColorFromVar("--color-text-secondary");

      // Create initial wave ring
      waveRings.push({
        radius: 160,
        alpha: 100,
      });
    };

    p.draw = () => {
      p.clear();

      // Update and draw wave rings
      for (let i = waveRings.length - 1; i >= 0; i--) {
        const ring = waveRings[i];
        ring.radius += 12;
        ring.alpha -= 1.2;

        if (ring.alpha <= 0) {
          waveRings.splice(i, 1);
          if (waveRings.length === 0) {
            isComplete = true;
          }
        } else {
          p.noFill();
          p.stroke(waveColor[0], waveColor[1], waveColor[2], ring.alpha);
          p.strokeWeight(2);
          p.circle(centerX, centerY, ring.radius);
        }
      }

      // Clean up when animation is complete
      if (isComplete) {
        p.remove();
        document.body.removeChild(waveDiv);
      }
    };
  };

  new p5(sketch, waveDiv);
};

onMounted(() => {
  if (!container.value) return;

  const sketch = (p: p5) => {
    let particles: Particle[] = [];
    const centerRadius = 80;
    const canvasSize = 300;
    let centerColor: [number, number, number];
    let particleColor: [number, number, number];
    let lineColor: [number, number, number];

    p.setup = () => {
      p.createCanvas(canvasSize, canvasSize);

      // Get colors from CSS variables
      centerColor = getColorFromVar("--color-text-primary");
      particleColor = getColorFromVar("--color-text-secondary");
      lineColor = getColorFromVar("--color-text-secondary");

      // Create particles orbiting around center
      for (let i = 0; i < 40; i++) {
        particles.push({
          angle: p.random(p.TWO_PI),
          radius: p.random(100, 140),
          speed: p.random(0.002, 0.008),
          size: p.random(1, 3),
        });
      }
    };

    p.draw = () => {
      p.clear();

      // Draw center circle using CSS variable color
      p.noStroke();
      p.fill(centerColor[0], centerColor[1], centerColor[2], 200);
      p.circle(canvasSize / 2, canvasSize / 2, centerRadius * 2);

      // Draw subtle ring around center
      p.noFill();
      p.stroke(particleColor[0], particleColor[1], particleColor[2], 50);
      p.strokeWeight(1);
      p.circle(canvasSize / 2, canvasSize / 2, centerRadius * 2 + 10);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.angle += particle.speed;

        const x = canvasSize / 2 + Math.cos(particle.angle) * particle.radius;
        const y = canvasSize / 2 + Math.sin(particle.angle) * particle.radius;

        // Draw particle
        p.noStroke();
        p.fill(particleColor[0], particleColor[1], particleColor[2], 80);
        p.circle(x, y, particle.size);

        // Draw line to center
        p.stroke(lineColor[0], lineColor[1], lineColor[2], 20);
        p.strokeWeight(0.5);
        p.line(canvasSize / 2, canvasSize / 2, x, y);
      });
    };
  };

  new p5(sketch, container.value);
});
</script>
