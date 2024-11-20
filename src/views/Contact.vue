<template>
  <div class="contact-container pb-20 pt-32 bounded max-lg:pt-24 max-md:pt-16">
    <h2 ref="heading" class="my-6 overflow-hidden uppercase">
      <span
        v-for="(word, index) in titleWords"
        :key="index"
        class="inline-block mr-4 relative overflow-hidden pb-4 max-lg:pb-2 max-sm:pb-0"
      >
        <span class="inline-block" ref="words">{{ word }}</span>
      </span>
    </h2>
    <div
      class="grid grid-cols-2 gap-[10vw] max-md:flex-col items-center max-md:!flex"
    >
      <form
        @submit.prevent="submitForm"
        class="contact-form max-md:w-full flex flex-col items-center"
        ref="formContainer"
      >
        <div class="form-group flex flex-col gap-1 mb-4 w-full">
          <label for="name">Nom</label>
          <input
            type="text"
            id="name"
            name="user_name"
            v-model="form.name"
            required
          />
        </div>
        <div class="form-group flex flex-col gap-1 mb-4 w-full">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="user_email"
            v-model="form.email"
            required
          />
        </div>
        <div class="form-group flex flex-col gap-1 mb-4 w-full">
          <label for="object">Objet</label>
          <input
            type="object"
            id="object"
            name="object"
            v-model="form.object"
            required
          />
        </div>
        <div class="form-group flex flex-col gap-1 mb-8 w-full">
          <label for="message">Message</label>
          <textarea
            id="message"
            name="message"
            v-model="form.message"
            required
          ></textarea>
        </div>
        <PrimaryButton
          buttonText="Envoyer votre vision"
          :disabled="isSending"
        ></PrimaryButton>
      </form>
      <div class="flex flex-col gap-6 max-md:w-full h-full" ref="contactInfos">
        <div
          class="flex justify-between w-full gap-x-6 gap-y-2 flex-wrap max-sm:flex-col max-sm:gap-y-4"
        >
          <a
            href="mailto:info@fujistudio.com"
            class="flex gap-2 items-center social-media"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="#65ADFF"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>
            <span class="email-text leading-3" ref="emailText"
              >info@fujistudio.com</span
            >
          </a>
          <a href="#" class="flex gap-2 items-center social-media">
            <img
              src="../assets/img/ic-instagram.svg"
              alt="Instagram"
              class="h-6 w-6"
            />
            <span class="link-text leading-3 inline-block relative"
              >@FuJi-studio</span
            >
          </a>
          <a href="#" class="flex gap-2 items-center social-media">
            <img
              src="../assets/img/ic-linkedin.svg"
              alt="LinkedIn"
              class="h-6 w-6"
            />
            <span class="link-text leading-3 inline-block relative"
              >FuJi-studio</span
            >
          </a>
        </div>
        <ContactCurtain />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import PrimaryButton from "../components/PrimaryButton.vue";
import ContactCurtain from "../components/ContactCurtain.vue";
import LocomotiveScroll from "locomotive-scroll";
import emailjs from "@emailjs/browser";

const title = "Prêt à donner vie à votre projet ?";
const titleWords = ref(title.split(" ")); // Split the title into words
const formContainer = ref(null);
const contactInfos = ref(null);
const words = ref(null);
const texts = ref([]);
const isSending = ref(false); // État de l'envoi

onMounted(() => {
  const scroll = new LocomotiveScroll({
    el: document.querySelector(".contact-container"),
    smooth: true,
    smartphone: { smooth: true },
    tablet: { smooth: true },
    inertia: 0.5,
    passive: true,
  });

  const socialMedias = document.querySelectorAll(".social-media");
  console.log(socialMedias);
  const tl = gsap.timeline();

  socialMedias.forEach((socialMedia) => {
    socialMedia.addEventListener("mouseenter", function () {
      gsap.to(
        socialMedia.querySelector("span"),
        {
          y: -10,
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            gsap.fromTo(
              socialMedia.querySelector("span"),
              {
                y: 10,
                opacity: 0,
                duration: 0.2,
                ease: "power2.out",
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
              }
            );
          },
        } // Fin: en haut, visible
      );

      gsap.to(socialMedia.querySelector("img, svg"), {
        duration: 0.2,
        ease: "power2.out",
        transform: "scale(1.1)",
        onComplete: () => {
          gsap.to(socialMedia.querySelector("img, svg"), {
            duration: 0.2,
            ease: "power2.out",
            transform: "scale(1)",
          });
        },
      });
    });
  });

  // Animation des lettres
  tl.from(words.value, {
    opacity: 0,
    ease: "power3.out",
    y: 100,
    stagger: 0.1,
    duration: 0.8,
  });

  //   // Animation du formulaire et des informations de contact
  gsap.utils.toArray(formContainer.value.children).forEach((child) => {
    tl.from(
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

  gsap.utils
    .toArray(contactInfos.value.children)
    .slice(0, -1)
    .forEach((child) => {
      tl.from(
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

  tl.from(
    contactInfos.value.lastChild,
    {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.3"
  );
});

// Initialisation du formulaire
const form = ref({
  name: "",
  object: "",
  email: "",
  message: "",
});

// Fonction de soumission
const submitForm = () => {
  console.log("first");
  if (isSending.value) return; // Empêche les envois multiples
  isSending.value = true;

  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userID = import.meta.env.VITE_EMAILJS_USER_ID;
  emailjs
    .sendForm(serviceID, templateID, formContainer.value, {
      publicKey: userID,
    })
    .then(
      () => {
        alert(
          "Merci pour votre message, nous vous répondrons dès de possible !"
        );
        form.value = { name: "", object: "", email: "", message: "" }; // Réinitialisation du formulaire
        isSending.value = false;
      },
      (error) => {
        alert("Erreur lors de l'envoi : " + error.text);
        isSending.value = false;
      }
    );
};
</script>


<style scoped>
button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>