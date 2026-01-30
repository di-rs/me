/**
 * Handles mouse move events for 3D tilt effect using RAF for smooth animation
 */
export function createTiltHandler() {
  let ticking = false;

  return {
    handleMouseEnter: () => {
      // Trigger hover animation (handled by CSS)
    },

    handleMouseLeave: (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      ticking = false;
      // Reset tilt transform smoothly with transition
      card.style.transition = "transform 0.3s ease-out";
      card.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)";

      setTimeout(() => {
        card.style.transition = "";
      }, 300);
    },

    handleMouseMove: (e: MouseEvent) => {
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
    },
  };
}
