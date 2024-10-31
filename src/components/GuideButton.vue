<template>
  <svg
    id="guideButton"
    xmlns="http://www.w3.org/2000/svg"
    width="220"
    height="60"
    viewBox="0 0 220 60"
  >
    <rect
      x="0"
      y="0"
      width="60"
      height="60"
      rx="30"
      ry="30"
      fill="#65ADFF"
      style="opacity: 0.4"
    />

    <text transform="translate(100 36)" text-anchor="middle">
      {{ buttonText }}
    </text>
  </svg>
</template>


<script setup>
import gsap from "gsap";
import { onMounted } from "vue";

const props = defineProps({
  buttonText: {
    type: String,
    default: "Click me",
  },
});

onMounted(() => {
  // Animation for button
  const button = document.querySelector("#guideButton");

  gsap.from(button.children[0], {
    x: "100vw",
    duration: 1,
    ease: "elastic.out(1, 1.5)",
    //   delay: 2,
  });
  gsap.from(button.querySelector("text"), {
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.5,
  });

  button.addEventListener("mouseenter", () => {
    gsap.to(button.children[0], {
      duration: 0.5,
      attr: { width: 200, fill: "#0056b3" },
      autoAlpha: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
    gsap.to(button.querySelector("text"), {
      duration: 0.2,
      fill: "#fff",
      ease: "none",
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button.children[0], {
      duration: 0.5,
      attr: { width: 60, fill: "#65ADFF" },
      autoAlpha: 0.4,
      ease: "elastic.out(1, 0.3)",
    });
    gsap.to(button.querySelector("text"), {
      duration: 0.2,
      fill: "#000",
      ease: "none",
    });
  });
});
</script>


<style scoped>
#button {
  font-weight: 600;
  overflow: visible;
  cursor: pointer;
}
</style>