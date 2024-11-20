<template>
  <div
    ref="titleContainer"
    class="relative w-full flex justify-between items-center"
  >
    <h1
      ref="title"
      class="text-center w-full absolute uppercase overflow-hidden"
    >
      <span
        v-for="(word, index) in titleWords"
        :key="index"
        class="inline-block relative overflow-hidden"
      >
        <span class="inline-block" ref="words">{{ word }}</span>
      </span>
    </h1>
    <p
      ref="titleBg"
      class="titleBg text-[#65ADFF20] text-[15vw] text-center w-full font-[Kalnia] font-semibold uppercase"
    >
      {{ titleText }}
    </p>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { onMounted, ref } from "vue";

const props = defineProps({
  titleText: {
    type: String,
    default: "Title",
  },
  scroller: {
    type: Object, // Un %C3%A9l%C3%A9ment DOM ou null
    required: true,
  },
  container: {
    type: Object, // Un %C3%A9l%C3%A9ment DOM ou null
    required: true,
  },
});

const titleWords = props.titleText.split(" ");
const words = ref(null);
const title = ref(null);
const titleBg = ref(null);
const titleContainer = ref(null);

onMounted(() => {
  // Animate each word
  gsap.from(words.value, {
    opacity: 0,
    ease: "power3.out",
    y: 100,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: props.container,
      start: `top bottom`,
      end: `150% bottom`,
      scrub: 1,
      scroller: props.scroller,
      // markers: true,
    },
  });

  gsap.from(titleBg.value, {
    opacity: 0,
    ease: "power3.out",
    duration: 1,
    scrollTrigger: {
      trigger: props.container,
      start: "60% bottom",
      end: "150% bottom",
      scrub: 1,
      scroller: props.scroller,
      //   markers: true,
    },
  });
});
</script>
