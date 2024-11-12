<template>
  <div ref="studioContainer">
    <div
      class="bounded flex-1 flex h-full flex-col text-center pb-20 pt-32 fixed home-container w-full max-lg:pt-28 max-lg:pb-16 max-md:pb-12"
    >
      <div
        ref=" first-section"
        class="flex-1 flex flex-col justify-center first-section"
      >
        <h1 class="text-center pb-8 max-md:text-sm uppercase">
          <span
            v-for="(letter, index) in firstLineLetters"
            :key="'first-' + index"
            ref="letters"
            class="pb-6 letter"
          >
            <span v-if="letter === ' '">&nbsp;</span>
            <span v-else>{{ letter }}</span>
          </span>
          <br />
          <span
            v-for="(letter, index) in secondLineLetters"
            :key="'second-' + index"
            ref="letters"
            class="pb-6 letter"
          >
            <span v-if="letter === ' '">&nbsp;</span>
            <span v-else>{{ letter }}</span>
          </span>
        </h1>
        <!-- <p ref="subtitle" class="text-center text-md">
          Nous créons des expériences numériques qui parlent plus fort que les
          mots
        </p> -->
        <p ref="subtitle" class="my-6 overflow-hidden">
          <span
            v-for="(word, index) in subtitleWords"
            :key="index"
            class="inline-block mr-1 relative overflow-hidden"
          >
            <span class="inline-block" ref="words">{{ word }}</span>
          </span>
        </p>
      </div>
      <div
        class="flex-1 flex justify-between second-section hidden py-12 gap-8 max-header:flex-col max-sm:py-0"
      >
        <div class="w-1/2 flex flex-col justify-between max-header:w-full">
          <h1
            class="text-start lg:!text-6xl md:!text-5xl max-sm:!text-3xl uppercase"
            ref="secondSectionTitle"
          >
            <span
              v-for="(letter, index) in firstLineLetters2"
              :key="'first-' + index"
              ref="letters2"
              class="pb-6 letter"
            >
              <span v-if="letter === ' '">&nbsp;</span>
              <span v-else>{{ letter }}</span>
            </span>
            <br v-if="windowWidth > 909" />
            <span
              v-for="(letter, index) in secondLineLetters2"
              :key="'second-' + index"
              ref="letters2"
              class="pb-6 letter"
            >
              <span v-if="letter === ' '">&nbsp;</span>
              <span v-else>{{ letter }}</span>
            </span>
          </h1>
          <p class="text-start" ref="description">
            Chez FiJu, nous croyons en la création de solutions numériques qui
            non seulement fonctionnent parfaitement, mais qui séduisent les
            utilisateurs. Notre mission est de créer des sites et applications
            web qui sont à la fois techniquement robustes et visuellement
            attrayantes.
          </p>
        </div>
        <div
          class="flex flex-col w-1/2 max-header:w-full max-header:flex-row gap-8 flex-1 max-sm:!flex-col"
        >
          <p
            class="text-end my-6 max-header:w-2/5 max-sm:!w-full max-sm:m-0"
            ref="credits"
          >
            <!-- Ajout du ref ici -->
            Nous sommes Fideline et Julie, <br />
            le duo derrière Fuji
          </p>
          <div class="w-full grid grid-cols-2 h-full gap-8 max-sm:h-56">
            <div class="bg-black" ref="photo1">img 1</div>
            <div class="bg-black" ref="photo2">img 2</div>
          </div>
        </div>
      </div>
      <div
        class="flex h-fit justify-between max-sm:flex-wrap max-sm:gap-8 items-center relative max-sm:flex-col max-sm:gap-4"
      >
        <div ref="guide">
          <GuideButton buttonText="Télécharger le guide" />
        </div>
        <router-link to="/services">
          <div ref="button">
            <BubbleButton buttonText="Commencer l'aventure" />
          </div>
        </router-link>
      </div>

      <h1
        class="opacity-0 scale-0 blur-md fixed m-auto inset-y-0 inset-x-0 h-fit bounded"
        ref="serviceTitle"
      >
        Envie de commencer l'aventure ?
      </h1>
    </div>
  </div>
</template>
<script>
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Ajoutez cette ligne

gsap.registerPlugin(ScrollTrigger);
export default {
  beforeRouteEnter(to, from, next) {
    // document.querySelector("header").classList.add("fixed", "w-full");
    document.querySelector("#app").classList.add("h-[400vh]");
    // document.querySelector("header").classList.remove("relative");
    document.body.classList.add("h-[unset]", "no-scroll");
    // gsap.set(".first-section", { display: "flex" });
    // gsap.set(".second-section", { display: "none" });
    // gsap.set(".third-section", { y: "100vh" });
    // ScrollTrigger.refresh(); // Rafraîchit tous les triggers pour repartir de zéro
    next((vm) => {});
  },
  beforeRouteLeave(to, from, next) {
    // document.querySelector("header").classList.remove("fixed", "w-full");
    // document.querySelector("header").classList.add("relative");
    document.body.classList.remove("h-[unset]", "no-scroll");
    document.querySelector("#app").classList.remove("h-[400vh]");
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    next();
  },
};
</script>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import gsap from "gsap";
import PrimaryButton from "../components/PrimaryButton.vue";
import BubbleButton from "../components/BubbleButton.vue";
import GuideButton from "../components/GuideButton.vue";
import { useRouter } from "vue-router";
const button = ref(null);
const firstLineText = "Quand le code";
const secondLineText = "rejoint la créativité";
const firstLineLetters = ref([...firstLineText]);
const secondLineLetters = ref([...secondLineText]);
const firstLineText2 = "Deux esprits, ";
const secondLineText2 = "une vision";
const firstLineLetters2 = ref([...firstLineText2]);
const secondLineLetters2 = ref([...secondLineText2]);
const secondSectionTitle = ref(null);
const subtitleText =
  "Nous créons des expériences numériques qui parlent plus fort que les mots";
const subtitleWords = ref(subtitleText.split(" ")); // Split the title into words
const credits = ref(null);
const description = ref(null);
const subtitle = ref(null);
const letters = ref(null);
const letters2 = ref(null);
const photo1 = ref(null);
const photo2 = ref(null);
const router = useRouter();
const guideSection = ref(null);
const guide = ref(null);
const serviceTitle = ref(null);
const studioContainer = ref(null);
const firstSection = ref(null);
const windowWidth = ref(window.innerWidth);
const words = ref(null);
// Smoke effect animation function
const smokeEffect = (event) => {
  const letter = event.target;

  // Apply smoke effect on hover
  gsap.to(letter, {
    duration: 0.5,
    opacity: 0,
    filter: "blur(4px)",
    y: -20,
    ease: "power3.out",
    onComplete: () => {
      // Wait for 2 seconds before restoring the letter
      gsap.fromTo(
        letter,
        {
          opacity: 0,
          filter: "blur(4px)",
          y: 20,
        },
        {
          duration: 0.5,
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          ease: "power3.inOut",
          // delay: 0.5,
        }
      );
    },
  });
};

window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

onMounted(() => {
  // guide.value.addEventListener("mouseenter", function () {
  //   console.log("Hovered over guide element");

  //   gsap.set(guideSection.value, { display: "flex" });

  //   gsap.to(guideSection.value, {
  //     opacity: 1,
  //     duration: 0.5,
  //     ease: "power2.out",
  //   });
  // });
  // Animation au scroll

  gsap.fromTo(
    letters.value,
    {
      opacity: 1,
      y: 0,
      filter: "none",
    },
    {
      opacity: 0,
      filter: "blur(10px)",
      y: -20,
      ease: "power3.out",
      stagger: 0.05,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".home-container",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        //   onLeave: () => {
        // letters.value.forEach((letter) => {
        //       gsap.set(letter, { opacity: 0 });
        // });
        // },
      },
    }
  );

  // Animation séparée pour le sous-titre
  gsap.to(words.value, {
    opacity: 0,
    y: -20,
    ease: "power2.out",
    delay: 2,
    duration: 0.8,
    scrollTrigger: {
      trigger: words.value,
      start: `center top`, // Ajustez le point de déclenchement si nécessaire
      end: `center top`, // Ajustez le point de déclenchement si nécessaire
      scrub: 1,
      // markers: true,
      onLeave: () => {
        // Redirection vers la page "About" une fois l'animation du sous-titre terminée
        router.push({ name: "About" });
      },
      onLeave: () => {
        // Masquer `first-section` et afficher `second-section`
        gsap.delayedCall(0.2, () => {
          gsap.set(".first-section", { display: "none" });
          gsap.set(".second-section", { display: "flex" });
        });
      },
      onLeaveBack: () => {
        gsap.set(".first-section", { display: "flex" });
        gsap.set(".second-section", { display: "none" });
      },
    },
  });

  // Animation background
  // gsap.to("body", {
  //   backgroundImage:
  //     "repeating-radial-gradient( circle at 0 0, transparent 0, #65ADFF43 15px ), repeating-linear-gradient( #f3f4f755, #f3f4f7 )",
  //   duration: 0.8,
  //   scrollTrigger: {
  //     trigger: ".home-container", // Élément déclencheur de l'animation
  //     start: "top top", // Commence lorsque l'élément atteint le haut de la fenêtre
  //     end: "bottom 10%", // Termine à la fin de l'élément
  //     scrub: 1, // Synchronise l'animation avec le défilement
  //   },
  // });

  // Animation for title
  gsap.from(letters.value, {
    filter: "blur(10px)",
    opacity: 0,
    y: -80,
    duration: 0.5,
    ease: "expo.out",
    stagger: { each: 0.03, from: "random" },
    onComplete: () => {
      // Une fois l'animation terminée, activer l'effet de smoke
      letters.value.forEach((letter) => {
        letter.addEventListener("mouseenter", smokeEffect);
      });
    },
  });

  // Animation for subtitle
  gsap.from(words.value, {
    delay: 1,
    opacity: 0,
    ease: "power3.out",
    y: 50,
    stagger: 0.1,
    duration: 0.8,
  });

  // Animation deuxième section
  gsap.from(letters2.value, {
    opacity: 0,
    filter: "blur(10px)",
    y: -20,
    ease: "power3.out",
    stagger: 0.05,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".home-container",
      start: "70% top",
      end: "bottom -30%",
      scrub: 1,
      // markers: true
    },
  });

  gsap.from(credits.value, {
    opacity: 0,
    y: "100vh", // Commence en bas
    scrollTrigger: {
      trigger: ".home-container",
      start: "70% top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
      end: "bottom -30%", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
      scrub: 1, // Fait suivre l'animation au défilement
      // markers: true, // Pour déboguer, retirez-le en production
    },
  });

  // // // Animation for description
  gsap.from(description.value, {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".home-container",
      start: "bottom top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
      end: "bottom top", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
      scrub: 1, // Fait suivre l'animation au défilement
      // markers: true, // Pour déboguer, retirez-le en production
    },
  });

  gsap.from(photo1.value, {
    // opacity: 0,
    y: "101vh",
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".home-container",
      start: "80% top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
      end: "bottom -30%", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
      scrub: 1, // Fait suivre l'animation au défilement
      // markers: true, // Pour déboguer, retirez-le en production
      // markers: true,
    },
  });

  gsap.from(photo2.value, {
    opacity: 0,
    y: "90vh",
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".home-container",
      start: "85% top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
      end: "bottom -50%", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
      scrub: 1, // Fait suivre l'animation au défilement
      // markers: true, // Pour déboguer, retirez-le en production
      onLeave: () => {
        gsap.set(".second-section", { display: "flex" });

        gsap.to(credits.value, {
          opacity: 0,
          x: "50vw",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-container",
            start: "18% top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
            end: "bottom top", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
            scrub: 1,
          },
        });

        gsap.to(photo1.value, {
          opacity: 0,
          x: "50vw",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-container",
            start: "10% top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
            end: "bottom top", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
            scrub: 1,
          },
        });

        gsap.to(photo2.value, {
          opacity: 0,
          x: "50vw",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-container",
            start: "8% top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
            end: "bottom top", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
            scrub: 1,
          },
        });

        gsap.to(button.value, {
          opacity: 0,
          x: "50vw",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-container",
            start: "top top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
            end: "bottom top", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
            scrub: 1,
          },
        });

        gsap.to(secondSectionTitle.value, {
          opacity: 0,
          x: "-50vw",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-container",
            start: "18% top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
            end: "bottom top", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
            scrub: 1,
          },
        });

        gsap.to(description.value, {
          opacity: 0,
          x: "-50vw",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-container",
            start: "8% top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
            end: "bottom top", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
            scrub: 1,
            // markers: true,
          },
        });

        gsap.to(guide.value, {
          opacity: 0,
          x: "-50vw",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-container",
            start: "top top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
            end: "bottom top", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
            scrub: 1,
          },
        });

        gsap.to(serviceTitle.value, {
          opacity: 1,
          scale: 1,
          filter: "none",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-container",
            start: "top top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
            end: "bottom top", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
            // markers: true,
            scrub: 1,
            onLeave: () => {
              router.push({ name: "Services" });
              // gsap.delayedCall(0.5, () => {
              //   gsap.set(studioContainer, { display: "none" });
              // });
            },
          },
        });
      },
    },
  });
  onUnmounted(() => {
    // gsap.killTweensOf("*");
  });
});
</script>


<style scoped>
.letter {
  display: inline-block;
}
</style>

<style>
/* #app {
  height: 210vh;
} */
</style>