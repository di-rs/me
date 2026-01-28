<template>
  <div
    class="relative w-full h-full min-h-[80vh] flex items-center justify-center"
  >
    <div ref="container" class="w-full h-full min-h-[80vh]"></div>
    <div
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <h1
        class="text-[140px] md:text-[280px] font-bold text-text-secondary opacity-30 select-none"
      >
        404
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import * as THREE from "three";

const container = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let sphere: THREE.Mesh;
let wireframeSphere: THREE.LineSegments;
let particles: THREE.Points;
let gridHelper: THREE.GridHelper;
let animationId: number;

onMounted(() => {
  if (!container.value) return;

  const width = container.value.clientWidth;
  const height = Math.max(
    container.value.clientHeight,
    window.innerHeight * 0.8,
  );

  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 8;
  camera.position.y = 3;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  container.value.appendChild(renderer.domElement);

  // Main sphere matching background color #0a0a0a
  const sphereGeometry = new THREE.SphereGeometry(12, 32, 32);
  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x0a0a0a,
    emissive: 0x000000,
    shininess: 10,
    transparent: false,
    opacity: 1,
  });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.y = -8; // Move way down so it extends below footer
  scene.add(sphere);

  // Wireframe grid on sphere
  const wireframeGeometry = new THREE.SphereGeometry(12.1, 28, 28);
  const wireframeMaterial = new THREE.LineBasicMaterial({
    color: 0x505055,
    transparent: true,
    opacity: 0.4,
  });
  const wireframe = new THREE.WireframeGeometry(wireframeGeometry);
  wireframeSphere = new THREE.LineSegments(wireframe, wireframeMaterial);
  wireframeSphere.position.y = -8; // Match sphere position
  scene.add(wireframeSphere);

  // Particles around the sphere
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    // Random positions around the sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 14 + Math.random() * 5;

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 8;
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );

  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x909098,
    size: 0.1,
    transparent: true,
    opacity: 0.5,
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Grid floor - massive and much lower
  gridHelper = new THREE.GridHelper(40, 50, 0x505058, 0x303038);
  gridHelper.position.y = -20;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.2;
  scene.add(gridHelper);

  // Lighting - very dark
  const ambientLight = new THREE.AmbientLight(0x404048, 0.3);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x606068, 0.6, 100);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const backLight = new THREE.PointLight(0x404048, 0.3, 100);
  backLight.position.set(-5, 2, -5);
  scene.add(backLight);

  // Animation loop
  let time = 0;
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    time += 0.005;

    // Rotate sphere and wireframe very slowly
    sphere.rotation.y += 0.0008;
    sphere.rotation.x += 0.0003;
    wireframeSphere.rotation.y += 0.0008;
    wireframeSphere.rotation.x += 0.0003;

    // Rotate particles slowly
    particles.rotation.y += 0.0005;

    // Gentle camera movement
    camera.position.x = Math.sin(time * 0.3) * 0.3;
    camera.position.y = 3 + Math.cos(time * 0.2) * 0.15;
    camera.lookAt(0, -3, 0);

    renderer.render(scene, camera);
  };

  animate();

  // Handle resize
  const handleResize = () => {
    if (!container.value) return;
    const width = container.value.clientWidth;
    const height = Math.max(
      container.value.clientHeight,
      window.innerHeight * 0.8,
    );

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    renderer.dispose();
  }
  window.removeEventListener("resize", () => {});
});
</script>
