<template>
  <div id="page-wrap">
    <div id="canvas"></div>
    <div class="curtain">
      <img
        src="../assets/img/contact/contact.jpg"
        crossorigin=""
        data-sampler="simplePlaneTexture"
      />
    </div>
  </div>
</template>

<script setup>
import { Curtains, Plane, Vec2 } from "curtainsjs";
import { onMounted, onBeforeUnmount } from 'vue';
import { fragmentShader, vertexShader } from "../shaders/contact-shader.js";

// Variables globales pour l'instance de Curtains et des éléments
let curtains = null;
let simplePlane = null;

const initCurtains = () => {
  const mousePosition = new Vec2();
  const mouseLastPosition = new Vec2();
  const deltas = { max: 0, applied: 0 };

  // Initialisation du contexte WebGL
  curtains = new Curtains({
    container: "canvas",
    watchScroll: false,
    pixelRatio: Math.min(1.5, window.devicePixelRatio),
  });

  curtains
    .onError(() => document.body.classList.add("no-curtains"))
    .onContextLost(() => curtains.restoreContext());

  const planeElements = document.getElementsByClassName("curtain");

  const params = {
    vertexShader,
    fragmentShader,
    widthSegments: 20,
    heightSegments: 20,
    uniforms: {
      resolution: { name: "uResolution", type: "2f", value: [planeElements[0].clientWidth, planeElements[0].clientHeight] },
      time: { name: "uTime", type: "1f", value: 0 },
      mousePosition: { name: "uMousePosition", type: "2f", value: mousePosition },
      mouseMoveStrength: { name: "uMouseMoveStrength", type: "1f", value: 0 },
    },
  };

  simplePlane = new Plane(curtains, planeElements[0], params);

  simplePlane
    .onReady(() => {
      simplePlane.setPerspective(35);
      deltas.max = 2;
      const wrapper = document.getElementById("page-wrap");

      wrapper.addEventListener("mousemove", (e) => handleMovement(e, simplePlane));
      wrapper.addEventListener("touchmove", (e) => handleMovement(e, simplePlane), { passive: true });
    })
    .onRender(() => {
      simplePlane.uniforms.time.value++;
      deltas.applied += (deltas.max - deltas.applied) * 0.02;
      deltas.max += (0 - deltas.max) * 0.01;
      simplePlane.uniforms.mouseMoveStrength.value = deltas.applied;
    })
    .onAfterResize(() => {
      const planeBoundingRect = simplePlane.getBoundingRect();
      simplePlane.uniforms.resolution.value = [planeBoundingRect.width, planeBoundingRect.height];
    })
    .onError(() => document.body.classList.add("no-curtains"));

  // Gérer le mouvement de la souris
  function handleMovement(e, plane) {
    mouseLastPosition.copy(mousePosition);
    const mouse = new Vec2();
    if (e.targetTouches) {
      mouse.set(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    } else {
      mouse.set(e.clientX, e.clientY);
    }
    mousePosition.set(
      curtains.lerp(mousePosition.x, mouse.x, 0.3),
      curtains.lerp(mousePosition.y, mouse.y, 0.3)
    );
    plane.uniforms.mousePosition.value = plane.mouseToPlaneCoords(mousePosition);
    if (mouseLastPosition.x && mouseLastPosition.y) {
      let delta = Math.sqrt(Math.pow(mousePosition.x - mouseLastPosition.x, 2) + Math.pow(mousePosition.y - mouseLastPosition.y, 2)) / 30;
      delta = Math.min(4, delta);
      if (delta >= deltas.max) {
        deltas.max = delta;
      }
    }
  }
};

// Initialisation lors du montage du composant
onMounted(() => {
  initCurtains();
});
</script>

<style scoped>
/* Styles pour le conteneur et le canevas */
#page-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#canvas {
  z-index: -1;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.curtain {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
}
.curtain img {
  display: none;
}
.no-curtains .curtain {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.no-curtains .curtain img {
  display: block;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
</style>
