<template>
  <div class="h-[100vh] w-full third-section bounded pt-32">
      <h1 ref="heading" class="my-6 overflow-hidden">
        <span
          v-for="(word, index) in titleWords"
          :key="'first-' + index"
          ref="words"
          class="inline-block mr-4 relative pb-4 max-lg:pb-2 max-sm:pb-1"
        >
          {{ word }}
        </span>
      </h1>

      <p>Concevez un site à votre image, pensé pour vos utilisateurs. En alliant design et technologies modernes, nous développons des sites web qui allient esthétisme, fonctionnalité, et performance. Que ce soit un site vitrine, un e-commerce ou une plateforme sur mesure, nous nous assurons que votre site véhicule l’essence de votre marque tout en offrant une expérience utilisateur irréprochable.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const title = "De la création sur mesure à l'optimisation, nous façonnons des solutions digitales créatives et performantes.";
const titleWords = ref(title.split(" ")); // Split the title into words

const words = ref(null);

onMounted(() => {
  const tl = gsap.timeline();

  // Animate each word
  tl.from(words.value, {
    opacity: 0,
    // filter: "blur(10px)",
    // y: "-20px",
    ease: "power3.out",
    // ease: "rough",
    y: 20,
    stagger: 0.1,
    duration: 0.8,
  });
});
</script>
