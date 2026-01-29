<template>
  <div
    class="timeline-card group"
    :class="{
      'card-left': isLeft,
      'card-right': !isLeft,
      'card-active': isActive,
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <!-- Card Content -->
    <div class="card-content">
      <!-- Company Logo (if provided) -->
      <div v-if="experience.companyLogo" class="company-logo stagger-item">
        <img :src="experience.companyLogo" :alt="experience.company" />
      </div>

      <!-- Date Range -->
      <div class="date-range stagger-item">
        <span class="date-text">{{ formatDateRange() }}</span>
      </div>

      <!-- Role & Company -->
      <h3 class="role-title stagger-item">
        {{ experience.role }}
      </h3>
      <div class="company-info stagger-item">
        <span class="company-name">{{ experience.company }}</span>
        <span class="location">{{ experience.location }}</span>
      </div>

      <!-- Description -->
      <ul class="description stagger-item">
        <li v-for="(item, idx) in experience.description" :key="idx">
          {{ item }}
        </li>
      </ul>

      <!-- Technologies -->
      <div class="technologies stagger-item">
        <span
          v-for="tech in experience.technologies"
          :key="tech"
          class="tech-tag"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Achievements (if any) -->
      <div v-if="experience.achievements" class="achievements stagger-item">
        <div class="achievement-label">Key Achievements:</div>
        <ul>
          <li v-for="(achievement, idx) in experience.achievements" :key="idx">
            {{ achievement }}
          </li>
        </ul>
      </div>

      <!-- Project Links (if any) -->
      <div v-if="experience.projectUrls" class="project-links stagger-item">
        <a
          v-for="project in experience.projectUrls"
          :key="project.url"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link"
        >
          {{ project.name }} →
        </a>
      </div>
    </div>

    <!-- Duration Badge (replacing type badge) -->
    <div class="duration-badge-absolute">
      {{ calculateDuration() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Experience } from "@/data/experience";

interface Props {
  experience: Experience;
  index: number;
  isActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
});

const isLeft = computed(() => props.index % 2 === 0);

const formatDateRange = () => {
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const start = formatDate(props.experience.startDate);
  const end = props.experience.endDate
    ? formatDate(props.experience.endDate)
    : "Present";

  return `${start} - ${end}`;
};

const calculateDuration = () => {
  const [startYear, startMonth] = props.experience.startDate
    .split("-")
    .map(Number);

  let endYear, endMonth;
  if (props.experience.endDate) {
    [endYear, endMonth] = props.experience.endDate.split("-").map(Number);
  } else {
    // Use current date for "Present"
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  }

  let years = endYear - startYear;
  let months = endMonth - startMonth;

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) {
    parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  }
  if (months > 0) {
    parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  }

  return parts.join(" ") || "1 mo";
};

// Use RAF for smooth tilt animation
let ticking = false;
let lastMouseX = 0;
let lastMouseY = 0;

const handleMouseEnter = (e: MouseEvent) => {
  // Trigger hover animation (handled by CSS)
};

const handleMouseLeave = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement;
  ticking = false;
  // Reset tilt transform smoothly with transition
  card.style.transition = "transform 0.3s ease-out";
  card.style.transform =
    "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)";

  setTimeout(() => {
    card.style.transition = "";
  }, 300);
};

const handleMouseMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  if (!ticking) {
    ticking = true;

    requestAnimationFrame(() => {
      const rotateY = x * 10;
      const rotateX = -y * 10;

      // Direct 3D tilt effect
      card.style.transform = `
        perspective(1000px) 
        rotateY(${rotateY}deg) 
        rotateX(${rotateX}deg) 
        translateY(-4px)
        scale(1.02)
      `;

      ticking = false;
    });
  }
};
</script>

<style scoped>
.timeline-card {
  position: relative;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
  transform-origin: center center;
  will-change: transform;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.timeline-card:hover {
  background: #222;
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
}

.timeline-card.card-active {
  background: #222;
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
}

.card-content {
  position: relative;
  z-index: 1;
}

/* Company Logo */
.company-logo {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(30%) brightness(0.9);
  transition: filter 0.3s ease;
}

.timeline-card:hover .company-logo img {
  filter: grayscale(0%) brightness(1);
}

/* Date Range */
.date-range {
  margin-bottom: 0.75rem;
}

.date-text {
  color: var(--color-text-secondary, #a3a3a3);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.date-text {
  color: #a3a3a3;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Role Title */
.role-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e5e5e5;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

/* Company Info */
.company-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
}

.company-name {
  color: #e5e5e5;
  font-size: 1.125rem;
  font-weight: 600;
}

.location {
  color: #a3a3a3;
  font-size: 0.875rem;
}

/* Description */
.description {
  list-style: none;
  margin: 0 0 1.5rem 0;
  padding: 0;
}

.description li {
  color: #a3a3a3;
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  padding-left: 1.25rem;
  position: relative;
}

.description li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #666666;
}

/* Technologies */
.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  padding: 0.375rem 0.75rem;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 0.8125rem;
  color: #a3a3a3;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background: #2a2a2a;
  border-color: rgba(255, 255, 255, 0.2);
  color: #e5e5e5;
  transform: translateY(-2px);
}

/* Achievements */
.achievements {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.achievement-label {
  color: #e5e5e5;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.achievements ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.achievements li {
  color: #a3a3a3;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.25rem;
  padding-left: 1rem;
  position: relative;
}

.achievements li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4ade80;
}

/* Project Links */
.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.project-link {
  color: #e5e5e5;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.project-link:hover {
  color: #a3a3a3;
}

/* Duration Badge (absolute position at top right) */
.duration-badge-absolute {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.375rem 0.75rem;
  background: rgba(163, 163, 163, 0.08);
  border: 1px solid rgba(163, 163, 163, 0.15);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--color-text-secondary, #a3a3a3);
  font-weight: 600;
  letter-spacing: 0.03em;
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-card {
    padding: 1.5rem;
  }

  .role-title {
    font-size: 1.25rem;
  }

  .company-name {
    font-size: 1rem;
  }
}
</style>
