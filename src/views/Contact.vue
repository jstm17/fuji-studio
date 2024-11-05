<template>
  <div class="contact-container pb-20 pt-32 bounded">
      <h1 ref="heading" class="my-6">
        <span
          v-for="(word, index) in titleWords"
          :key="'first-' + index"
          ref="words"
          class="inline-block mr-4 relative pb-4 max-lg:pb-2 max-sm:pb-1"
        >
          {{ word }}
        </span>
      </h1>

    <p ref="subtitle" class="mb-4">Parlez-nous de votre projet</p>

    <div
      class="grid grid-cols-2 gap-[10vw] max-md:flex-col items-center max-md:!flex"
    >
      <form
        @submit.prevent="submitForm"
        class="contact-form max-md:w-full flex flex-col items-center"
        ref="formContainer"
      >
        <div class="form-group flex flex-col gap-1 mb-4 w-full">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div class="form-group flex flex-col gap-1 mb-4 w-full">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="form-group flex flex-col gap-1 mb-8 w-full">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <PrimaryButton buttonText="Envoyer votre vision"></PrimaryButton>
      </form>
      <div class="flex flex-col gap-6 max-md:w-full h-full" ref="contactInfos">
        <div class="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#65ADFF"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
            />
          </svg>
          <p>info@fujistudio.com</p>
        </div>
        <p>Résaux sociaux</p>
        <div class="w-full h-full bg-black max-md:hidden"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import PrimaryButton from "../components/PrimaryButton.vue";

const title = "Prêt à donner vie à votre projet ?";
const titleWords = ref(title.split(" ")); // Split the title into words
const subtitle = ref(null);
const formContainer = ref(null);
const contactInfos = ref(null);
const words = ref(null);

onMounted(() => {
  const tl = gsap.timeline();

  // Animation des lettres
  tl.from(words.value, {
    opacity: 0,
    ease: "power3.out",
    y: 20,
    stagger: 0.1,
    duration: 0.8,
  });

  // Animation du sous-titre
  tl.from(
    subtitle.value,
    {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.5"
  );

  // Animation du formulaire et des informations de contact
  gsap.utils.toArray(formContainer.value.children).forEach((child) => {
    gsap.from(
      child,
      {
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: "power2.out",
        //   stagger: 4, // Intervalle entre chaque animation d'enfant
      },
      "-=0.3"
    );
  });

  gsap.utils.toArray(contactInfos.value.children).forEach((child) => {
    gsap.from(
      child,
      {
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: "power2.out",
        //   stagger: 4, // Intervalle entre chaque animation d'enfant
      },
      "-=0.3"
    );
  });
});

const form = ref({
  name: "",
  email: "",
  message: "",
});

const submitForm = () => {
  console.log("Form submitted", form.value);
  form.value = { name: "", email: "", message: "" };
};
</script>

<style scoped>
</style>
