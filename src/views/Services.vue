<template>
  <div
    class="services-container w-full bounded pt-32 flex flex-col gap-16"
    ref="servicesContainer"
    data-scroll-container
  >
    <h1 ref="heading" class="my-6 overflow-hidden uppercase" data-scroll>
      <span
        v-for="(word, index) in titleWords"
        :key="'first-' + index"
        class="inline-block mr-8 relative overflow-hidden pb-4 max-lg:pb-2 max-sm:pb-1"
      >
        <span class="inline-block" ref="words">{{ word }}</span>
      </span>
    </h1>
    <p ref="description" class="w-1/2 text-justify self-end pb-10">
      Concevez un site à votre image, pensé pour vos utilisateurs. En alliant
      design et technologies modernes, nous développons des sites web qui
      allient esthétisme, fonctionnalité, et performance. Que ce soit un site
      vitrine, un e-commerce ou une plateforme sur mesure, nous nous assurons
      que votre site véhicule l’essence de votre marque tout en offrant une
      expérience utilisateur irréprochable.
    </p>
    <div
      class="carousel-container w-full flex items-center my-10"
      ref="carouselContainer"
    >
      <!-- <h1>NOS SERVICES</h1> -->
      <h1 ref="heading2" class="uppercase">
        <span
          v-for="(word, index) in titleWords2"
          :key="index"
          class="inline-block mr-8 relative overflow-hidden pb-4 max-lg:pb-2 max-sm:pb-1"
        >
          <span class="inline-block" ref="words2">{{ word }}</span>
        </span>
      </h1>
      <div
        class="card-carousel flex gap-[50px] pr-[50vw] pl-[calc(50vw-600px)]"
        ref="cardCarousel"
      >
        <div
          class="card w-[350px] bg-[#65ADFF10] test backdrop-blur border border-[#65ADFF20] rounded-2xl p-8"
          v-for="(card, index) in cards"
          :key="index"
        >
          <p class="uppercase mb-2 text-xl font-bold">{{ card.title }}</p>
          <p class="text-justify">{{ card.description }}</p>
        </div>
      </div>
    </div>
    <h1 ref="heading3" class="my-6 overflow-hidden uppercase">
      <span
        v-for="(word, index) in titleWords3"
        :key="index"
        class="inline-block mr-8 relative overflow-hidden pb-4 max-lg:pb-2 max-sm:pb-1"
      >
        <span class="inline-block" ref="words3">{{ word }}</span>
      </span>
    </h1>
    <p ref="description2" class="w-1/2 text-justify pb-10">
      Concevez un site à votre image, pensé pour vos utilisateurs. En alliant
      design et technologies modernes, nous développons des sites web qui
      allient esthétisme, fonctionnalité, et performance. Que ce soit un site
      vitrine, un e-commerce ou une plateforme sur mesure, nous nous assurons
      que votre site véhicule l’essence de votre marque tout en offrant une
      expérience utilisateur irréprochable.
    </p>
    <p ref="description2" class="w-1/2 text-justify pb-10">
      Concevez un site à votre image, pensé pour vos utilisateurs. En alliant
      design et technologies modernes, nous développons des sites web qui
      allient esthétisme, fonctionnalité, et performance. Que ce soit un site
      vitrine, un e-commerce ou une plateforme sur mesure, nous nous assurons
      que votre site véhicule l’essence de votre marque tout en offrant une
      expérience utilisateur irréprochable.
    </p>
  </div>
</template>

<script>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

export default {
  data() {
    return {
      cards: [
        {
          title: "Web Design",
          description:
            "Concevez un design qui attire et engage votre audience. Nous créons des designs sur mesure, pensés pour raconter l’histoire de votre marque et offrir une expérience fluide et agréable. En tant que créatives, nous utilisons une approche esthétique et fonctionnelle, afin que chaque élément soit en harmonie avec vos objectifs.",
        },
        {
          title: "Développement Web sur Mesure",
          description:
            "Transformez vos idées en un site performant et facile à gérer. En s’appuyant sur les technologies les plus récentes, nous développons des sites optimisés et modulables, du site vitrine au e-commerce. Nous garantissons des solutions techniques qui allient performance, sécurité, et évolutivité.",
        },
        {
          title: "Optimisation SEO Naturelle",
          description:
            "Rendez votre site visible là où votre audience vous cherche. Notre expertise en SEO naturel aide votre site à apparaître dans les résultats de recherche, sans négliger l’authenticité de votre contenu. Nous vous accompagnons dans la définition de mots-clés et dans l’optimisation technique.",
        },
        {
          title: "Formation et Accompagnement Digital",
          description:
            "Devenez autonomes dans le digital ! Grâce à nos formations adaptées, développez les compétences pour gérer votre site et optimiser votre SEO. Nous proposons un accompagnement pas-à-pas pour que vous puissiez avancer avec confiance.",
        },
        {
          title: "Audit de Projet Digital",
          description:
            "Pour tirer le meilleur de votre projet, faites le point avec un audit complet. Nous analysons en profondeur votre site pour identifier ses points forts et les axes d’amélioration. Design, SEO, expérience utilisateur, sécurité : chaque élément est vérifié pour garantir un projet efficace et aligné avec vos objectifs.",
        },
      ],
    };
  },
  beforeRouteLeave(to, from, next) {
    // document.querySelector("header").classList.remove("fixed", "w-full");
    // document.querySelector("header").classList.add("relative");
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    next();
  },
};
</script>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

const title =
  "De la création sur mesure à l'optimisation, nous façonnons des solutions digitales créatives et performantes.";
const titleWords = ref(title.split(" ")); // Split the title into words
const title2 = "Nos services";
const titleWords2 = ref(title2.split(" ")); // Split the title into words
const title3 = "Nos tarifs";
const titleWords3 = ref(title3.split(" ")); // Split the title into words
const words = ref(null);
const words2 = ref(null);
const words3 = ref(null);
const description = ref(null);
const carouselContainer = ref(null);
const servicesContainer = ref(null);
const cardCarousel = ref(null);
const heading3 = ref(null);

let carouselAnimation;
onMounted(() => {
  //    Initialiser Locomotive Scroll
//   const scroll = new LocomotiveScroll({
//     el: servicesContainer.value,
//     smooth: true,
//     smartphone: { smooth: true },
//     tablet: { smooth: true },
//   });

  // Synchroniser Locomotive Scroll avec GSAP ScrollTrigger
//   ScrollTrigger.scrollerProxy(servicesContainer.value, {
//     scrollTop(value) {
//       return arguments.length
//         ? scroll.scrollTo(value, 0, 0)
//         : scroll.scroll.instance.scroll.y;
//     },
//     getBoundingClientRect() {
//       return {
//         top: 0,
//         left: 0,
//         width: window.innerWidth,
//         height: window.innerHeight,
//       };
//     },
//     pinType: servicesContainer.value.style.transform ? "transform" : "fixed",
//   });

//   scroll.on("scroll", ScrollTrigger.update);
//   ScrollTrigger.addEventListener("refresh", () => scroll.update());

  const tl = gsap.timeline();

  // Animate each word
  tl.from(words.value, {
    opacity: 0,
    // filter: "blur(10px)",
    // y: "-20px",
    ease: "power3.out",
    // ease: "rough",
    y: 100,
    stagger: 0.1,
    duration: 0.8,
  });

  gsap.from(description.value, {
    opacity: 0,
    ease: "power3.out",
    y: 50,
    scrollTrigger: {
      trigger: ".services-container",
      start: "top top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
      end: "bottom center", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
      scrub: 2,
    //   scroller: servicesContainer.value,
    },
  });

  gsap.from(words2.value, {
    opacity: 0,
    ease: "power3.out",
    y: 100,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".services-container",
      start: `${
        carouselContainer.value.getBoundingClientRect().bottom -
        carouselContainer.value.offsetHeight / 2
      }px bottom`,
      end: `${carouselContainer.value.getBoundingClientRect().top}px center`, // Termine quand le bas du paragraphe atteint le haut de la fenêtre
      scrub: 2,
    //   scroller: servicesContainer.value,
      //   markers: true,
    },
  });

  // Animation pour les cartes
  const cards = Array.from(cardCarousel.value.children);
  cards.forEach((card, index) => {
    gsap.from(card, {
      ease: "power3.out",
      y: `${15 + index * 10}vh`,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".services-container",
        start: `${
          carouselContainer.value.getBoundingClientRect().top
        }px bottom`,
        end: "bottom top",
        scrub: 2,
        // scroller: servicesContainer.value,
        pinSpacing: false
        //   markers: true,
      },
    });
  });
  //   gsap.to(cardCarousel.value, {
  //     x: () => -(cardCarousel.value.scrollWidth - window.innerWidth),
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: carouselContainer.value, // Utilisation de la référence pour le trigger
  //       pin: true,
  //       scrub: 2,
  //       start: `${
  //         carouselContainer.value.getBoundingClientRect().top -
  //         100 +
  //         carouselContainer.value.offsetHeight / 2
  //       }px center`,
  //       end: () => `+=${carouselContainer.value.scrollWidth - window.innerWidth}`,
  //       invalidateOnRefresh: true,
  //       markers: true
  //     },
  //   });

  gsap.to(cardCarousel.value, {
    x: () => -(cardCarousel.value.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: ".services-container",
      pin: true,
      scrub: 2,
    //   scroller: servicesContainer.value,
      invalidateOnRefresh: true,
      immediateRender: false,
      start: `${
        carouselContainer.value.getBoundingClientRect().top -
        100 +
        carouselContainer.value.offsetHeight / 2
      }px center`,
      end: () =>
        "+=" + (carouselContainer.value.scrollWidth - window.innerWidth),
      //   markers: true,
    },
  });

  // Animation pour words3, après les cartes
  gsap.from(words3.value, {
    opacity: 0,
    ease: "power3.out",
    y: 100,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".services-container",
      //   start: "center center", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
      start: `${heading3.value.getBoundingClientRect().bottom}px bottom`,
      end: `${heading3.value.getBoundingClientRect().top}px center`, // Termine quand le bas du paragraphe atteint le haut de la fenêtre
      scrub: 2,
        // scroller: servicesContainer.value,
      // markers: true,
    },
  });
  // Activer ScrollTrigger
//   ScrollTrigger.refresh();
});
onUnmounted(() => {
  // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  // gsap.killTweensOf("*");
});
</script>
