<script lang="ts">
  import { onMount } from 'svelte';
  import p5 from 'p5';

  let container: HTMLDivElement;

  interface Particle {
    pos: p5.Vector;
    vel: p5.Vector;
    size: number;
  }

  onMount(() => {
    const sketch = (p: p5) => {
      let particles: Particle[] = [];

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        // Create minimal particles
        for (let i = 0; i < 30; i++) {
          particles.push({
            pos: p.createVector(p.random(p.width), p.random(p.height)),
            vel: p.createVector(p.random(-0.2, 0.2), p.random(-0.2, 0.2)),
            size: p.random(0.5, 2.5)
          });
        }
      };

      p.draw = () => {
        p.clear();

        particles.forEach((particle, i) => {
          // Update position
          particle.pos.add(particle.vel);

          // Bounce off edges
          if (particle.pos.x < 0 || particle.pos.x > p.width) particle.vel.x *= -1;
          if (particle.pos.y < 0 || particle.pos.y > p.height) particle.vel.y *= -1;

          // Draw particle
          p.noStroke();
          p.fill(163, 163, 163, 38);
          p.circle(particle.pos.x, particle.pos.y, particle.size);

          // Draw connections
          particles.slice(i + 1).forEach(other => {
            const distance = p.dist(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);

            if (distance < 150) {
              const alpha = p.map(distance, 0, 150, 20, 0);
              p.stroke(163, 163, 163, alpha);
              p.strokeWeight(0.5);
              p.line(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
            }
          });
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    const p5Instance = new p5(sketch, container);

    return () => {
      p5Instance.remove();
    };
  });
</script>

<div
  bind:this={container}
  class="fixed inset-0 w-full h-full pointer-events-none"
  style="z-index: 0;"
  aria-hidden="true"
></div>
