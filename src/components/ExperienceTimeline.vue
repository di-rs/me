<template>
  <div ref="containerRef" class="relative">
    <!-- Subtle Timeline Line -->
    <div
      ref="timelineLineRef"
      class="timeline-line absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 scale-y-0 origin-top z-0 pointer-events-none will-change-transform bg-linear-to-b from-text-secondary/15 via-text-secondary/10 to-text-secondary/5 hidden lg:block"
    />

    <!-- Timeline Items -->
    <div
      v-for="(exp, index) in props.experiences"
      :key="exp.id"
      class="timeline-item relative grid grid-cols-[1fr_auto_1fr] gap-8 mb-16 items-center last:mb-0"
      :class="{ 'item-left': index % 2 === 0, 'item-right': index % 2 !== 0 }"
      :data-index="index"
    >
      <!-- AI Summary (on opposite side) -->
      <div
        class="ai-summary-wrapper relative z-1 flex items-center justify-center opacity-0 hidden lg:flex will-change-transform"
      >
        <AISummary v-if="exp.aiSummary" :summary="exp.aiSummary" />
      </div>

      <!-- Timeline Marker -->
      <div
        class="timeline-marker relative w-6 h-6 z-2 items-center justify-center opacity-0 hidden lg:flex"
      >
        <div
          class="marker-inner w-4 h-4 rounded-full bg-white/20 border-[3px] border-white/70 relative z-2 transition-all duration-300"
        />
        <div
          class="marker-ring absolute w-full h-full rounded-full border-2 border-white/50 opacity-50 z-1"
        />
      </div>

      <!-- Timeline Card -->
      <div class="timeline-card-wrapper relative z-1 min-h-[200px] opacity-0">
        <TimelineCard :experience="exp" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineCard from "./TimelineCard.vue";
import AISummary from "./timeline-card/AISummary.vue";
import type { DisplayExperience } from "@/utils/experience";

interface Props {
  experiences: DisplayExperience[];
}

const props = defineProps<Props>();

gsap.registerPlugin(ScrollTrigger);

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

  // 2. Animate Timeline Markers
  gsap.utils.toArray<HTMLElement>(".timeline-marker").forEach((marker) => {
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

  // 3. Animate AI Summaries (opposite side)
  const summaries = gsap.utils.toArray(".ai-summary-wrapper") as HTMLElement[];

  summaries.forEach((summary: HTMLElement, i: number) => {
    const isLeft = i % 2 === 0;

    // Set initial state
    gsap.set(summary, {
      opacity: 0,
      x: isLeft ? 40 : -40,
      scale: 0.95,
    });

    // Fade in and slide from opposite side
    gsap.to(summary, {
      opacity: 1,
      x: 0,
      scale: 1,
      scrollTrigger: {
        trigger: summary,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      duration: 0.9,
      ease: "power3.out",
      delay: 0.4,
    });
  });

  // 4. Animate Timeline Cards
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
/* Only keeping grid-template-areas which is not easily done in Tailwind */
.item-left {
  grid-template-areas: "card marker summary";
}

.item-right {
  grid-template-areas: "summary marker card";
}

.timeline-marker {
  grid-area: marker;
}

.timeline-card-wrapper {
  grid-area: card;
}

.ai-summary-wrapper {
  grid-area: summary;
}

/* Responsive */
@media (max-width: 1024px) {
  .timeline-item {
    grid-template-columns: 1fr !important;
    grid-template-areas: "card" !important;
    gap: 0 !important;
  }

  .item-left,
  .item-right {
    grid-template-areas: "card" !important;
  }
}

@media (max-width: 640px) {
  .timeline-item {
    margin-bottom: 2.5rem !important;
  }
}
</style>
