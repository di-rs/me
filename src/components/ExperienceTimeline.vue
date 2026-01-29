<template>
  <div class="timeline-wrapper" ref="wrapperRef">
    <!-- Section Header -->
    <div class="timeline-header">
      <h2 class="timeline-title">Experience</h2>
      <p class="timeline-subtitle">My professional journey</p>
    </div>

    <!-- Timeline Container -->
    <div class="timeline-container" ref="containerRef">
      <!-- Subtle Timeline Line -->
      <div class="timeline-line" ref="timelineLineRef"></div>

      <!-- Timeline Items -->
      <div
        v-for="(exp, index) in experiences"
        :key="exp.id"
        class="timeline-item"
        :class="{ 'item-left': index % 2 === 0, 'item-right': index % 2 !== 0 }"
        :data-index="index"
      >
        <!-- Timeline Marker -->
        <div class="timeline-marker" :class="`marker-${exp.type}`">
          <div class="marker-inner"></div>
          <div class="marker-ring"></div>
        </div>

        <!-- Timeline Card -->
        <div class="timeline-card-wrapper">
          <TimelineCard :experience="exp" :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineCard from "./TimelineCard.vue";
import { experiences } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

const wrapperRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const timelineLineRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // Add small delay to ensure DOM is ready
  setTimeout(() => {
    initTimelineAnimations();
    ScrollTrigger.refresh();
  }, 100);

  // Recalculate on resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

const calculateTimelinePath = () => {
  if (!containerRef.value || !svgRef.value || !pathRef.value) return;

  const container = containerRef.value;
  const items = container.querySelectorAll(".timeline-item");

  if (items.length === 0) return;

  // Calculate SVG dimensions based on container
  const svgWidth = containerRef.value.offsetWidth;
  const svgHeight = containerRef.value.offsetHeight;

  // Set SVG dimensions
  svgRef.value.setAttribute("width", svgWidth.toString());
  svgRef.value.setAttribute("height", svgHeight.toString());

  // Create a simple straight vertical line in the center
  const centerX = svgWidth / 2;
  const pathData = `M ${centerX} 0 L ${centerX} ${svgHeight}`;

  pathRef.value.setAttribute("d", pathData);

  // Calculate path length for animation
  const pathLength = pathRef.value.getTotalLength();
  pathRef.value.style.strokeDasharray = pathLength.toString();
  pathRef.value.style.strokeDashoffset = pathLength.toString();
};

const initTimelineAnimations = () => {
  if (!containerRef.value) return;

  // 1. Animate Timeline Line (subtle scroll reveal)
  if (timelineLineRef.value) {
    const lastMarker = containerRef.value.querySelector(
      ".timeline-item:last-child .timeline-marker",
    );

    // Set initial state immediately
    gsap.set(timelineLineRef.value, {
      scaleY: 0,
      transformOrigin: "top center",
    });

    gsap.to(timelineLineRef.value, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.value,
        start: "top center",
        endTrigger: lastMarker,
        end: "center center",
        scrub: 0.5,
      },
    });
  }

  // 2. Animate Header
  gsap.from(".timeline-header", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out",
  });

  // 2. Animate Timeline Markers
  gsap.utils.toArray(".timeline-marker").forEach((marker: any) => {
    // Set initial state
    gsap.set(marker, {
      scale: 0,
      opacity: 0,
    });

    // Marker appear with bounce
    gsap.to(marker, {
      scale: 1,
      opacity: 1,
      scrollTrigger: {
        trigger: marker,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      duration: 0.6,
      ease: "back.out(2)",
    });

    // Continuous pulse animation for marker ring
    const ring = marker.querySelector(".marker-ring");
    if (ring) {
      gsap.to(ring, {
        scale: 1.8,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power1.out",
      });
    }

    // Parallax effect on markers
    gsap.to(marker, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: marker,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  });

  // 3. Animate Timeline Cards
  const wrappers = gsap.utils.toArray(
    ".timeline-card-wrapper",
  ) as HTMLElement[];

  wrappers.forEach((wrapper: HTMLElement, i: number) => {
    const isLeft = i % 2 === 0;

    // Set initial state immediately
    gsap.set(wrapper, {
      opacity: 0,
      x: isLeft ? -80 : 80,
      y: 50,
      scale: 0.95,
    });

    // Main card reveal with slide + fade
    gsap.to(wrapper, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      scrollTrigger: {
        trigger: wrapper,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      duration: 1,
      ease: "power3.out",
    });

    const card = wrapper.querySelector(".timeline-card") as HTMLElement;
    if (card) {
      // "POP" effect when card is in viewport center
      gsap.to(card, {
        scale: 1.03,
        boxShadow: "0 24px 48px rgba(0, 0, 0, 0.6)",
        borderColor: "rgba(255, 255, 255, 0.15)",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 55%",
          end: "bottom 45%",
          toggleActions: "play reverse play reverse",
        },
        duration: 0.3,
        ease: "power2.out",
      });

      // Set initial state for stagger items
      const items = card.querySelectorAll(".stagger-item");
      gsap.set(items, {
        opacity: 0,
        y: 25,
      });

      // Stagger card content animations
      gsap.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        duration: 0.6,
        ease: "power2.out",
      });

      // Set initial state for tech tags
      const tags = card.querySelectorAll(".tech-tag");
      gsap.set(tags, {
        scale: 0.8,
        opacity: 0,
      });

      // Animate tech tags individually
      gsap.to(tags, {
        scale: 1,
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: card,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        duration: 0.4,
        ease: "back.out(1.5)",
      });
    }
  });
};
</script>

<style scoped>
.timeline-wrapper {
  position: relative;
  width: 100%;
  padding: 0;
  background: #0a0a0a;
  min-height: 100vh;
}

/* Header */
.timeline-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem 2rem 0;
}

.timeline-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text-primary, #e5e5e5);
  margin-bottom: 0.25rem;
  letter-spacing: -0.02em;
}

.timeline-subtitle {
  font-size: 0.9375rem;
  color: var(--color-text-secondary, #a3a3a3);
  font-weight: 400;
}

/* Timeline Container */
.timeline-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh; /* Ensure container has height */
}

/* Subtle Timeline Line */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgba(163, 163, 163, 0.15) 0%,
    rgba(163, 163, 163, 0.1) 50%,
    rgba(163, 163, 163, 0.05) 100%
  );
  transform: translateX(-50%) scaleY(0);
  transform-origin: top center;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
}

/* Timeline Item */
.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  align-items: center;
}

.item-left {
  grid-template-areas: "card marker empty";
}

.item-right {
  grid-template-areas: "empty marker card";
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* Timeline Marker */
.timeline-marker {
  grid-area: marker;
  position: relative;
  width: 24px;
  height: 24px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  /* Initial hidden state - GSAP will reveal */
}

.marker-inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-bg-primary, #0a0a0a);
  border: 3px solid var(--color-text-secondary, #a3a3a3);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.marker-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--color-text-secondary, #a3a3a3);
  opacity: 0.5;
  z-index: 1;
}

/* All markers use same whitish color */
.timeline-marker .marker-inner {
  border-color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.2);
}

.timeline-marker .marker-ring {
  border-color: rgba(255, 255, 255, 0.5);
}

/* Card Wrapper */
.timeline-card-wrapper {
  grid-area: card;
  position: relative;
  z-index: 1;
  min-height: 200px;
  opacity: 0;
  /* Initial hidden state - GSAP will reveal */
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-header {
    margin-bottom: 3rem;
  }

  .timeline-title {
    font-size: 2rem;
  }

  .timeline-subtitle {
    font-size: 1rem;
  }

  .timeline-item {
    grid-template-columns: auto 1fr;
    grid-template-areas: "marker card";
    gap: 1.5rem;
  }

  .item-left,
  .item-right {
    grid-template-areas: "marker card";
  }

  .timeline-marker {
    align-self: start;
    margin-top: 2rem;
  }

  .timeline-svg {
    left: 12px;
  }

  .timeline-path {
    stroke-width: 2;
  }
}

@media (max-width: 480px) {
  .timeline-container {
    padding: 1rem 0.5rem;
  }

  .timeline-item {
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
}
</style>
