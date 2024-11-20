  
<template>
    <div id="cursor" ref="cursor"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
const cursor = ref(null);
const route = useRoute();

const setupCursorHoverEffect = () => {
  const onMouseEnter = () => {
    gsap.to(cursor.value, { scale: 0.7, backgroundColor: "#195190", duration: 0.2 });
  };
  const onMouseLeave = () => {
    gsap.to(cursor.value, { scale: 1, backgroundColor: "#65ADFF80", duration: 0.2 });
  };

console.log(document.querySelectorAll("a, button, .clickable, input, textarea"))
  // Cleanup previous event listeners to prevent duplicates
  document.querySelectorAll("a, button, .clickable, input, textarea").forEach(element => {
    element.removeEventListener("mouseenter", onMouseEnter);
    element.removeEventListener("mouseleave", onMouseLeave);
  });

  // Add event listeners to new clickable elements in the page
  document.querySelectorAll("a, button, .clickable, input, textarea").forEach(element => {
    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mouseleave", onMouseLeave);
  });
};


// watch(route, () => {
//   setupCursorHoverEffect();
// // console.log(route)
// });


onMounted(() => {
//   setupCursorHoverEffect();
  gsap.set("#cursor", { xPercent: -50, yPercent: -50 });

  let xTo = gsap.quickTo("#cursor", "x", { duration: 0.6, ease: "power3" });
  let yTo = gsap.quickTo("#cursor", "y", { duration: 0.6, ease: "power3" });

  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Add click effects
  document.addEventListener("mousedown", () => {
    gsap.to(cursor.value, { scale: 0.5, backgroundColor: "#195190", duration: 0.2 });
  });
  document.addEventListener("mouseup", () => {
    gsap.to(cursor.value, { scale: 1, backgroundColor: "#65ADFF80", duration: 0.2 });
  });

})
onUnmounted(() => {
//   window.removeEventListener("mousemove", onMouseMove);
});
</script>

<style scoped>
#cursor {
  width: 20px;
  height: 20px;
  position: fixed;
  /* top: 0;
  left: 0; */
  z-index: 100;
  border-radius: 100px;
  background: #65ADFF80;
  pointer-events: none;
}
</style>
