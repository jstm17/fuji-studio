<template>
  <div id="container" ref="containerRef">
    <div id="content" ref="contentRef">
      <CurtainWork>
        <img
          src="../assets/img/portfolio/careforu.png"
          crossorigin=""
          data-sampler="simplePlaneTexture"
          class="hidden"
        />
      </CurtainWork>

      <div class="bounded pb-32">
        <div
          ref="titleContainer"
          class="relative w-full flex justify-between items-center max-md:mt-10"
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
        <div class="py-8 flex flex-col jusitfy-center items-center w-full">
          <div ref="workInfos" class="work-infos lg:w-1/2 flex flex-col gap-10">
            <div>
              <p class="font-bold uppercase mb-2">Description</p>
              <p class="text-justify">
                CareforU est une plateforme web dédiée à la sensibilisation et à
                la centralisation d'informations sur la santé sexuelle. Face à
                la persistance des tabous et des préjugés dans notre société,
                notre équipe a créé cet espace pour aider à briser les barrières
                et les stigmates associés à ce sujet sensible. <br />
                Notre plateforme vise à fournir des informations fiables et
                factuelles sur la santé sexuelle, tout en offrant un
                environnement sûr et anonyme pour poser des questions et
                discuter de ses préoccupations.
              </p>
            </div>
            <div class="">
              <p class="font-bold uppercase mb-2">Date</p>
              <p>Septembre 2022 - Juillet 2023</p>
            </div>
            <div class="">
              <p class="font-bold uppercase mb-2">Outils</p>
              <p>Vue.js, Vite, Tailwind, JavaScript, Figma, Leaflet</p>
            </div>

            <a
              href="https://g-equality.com/"
              target="_blank"
              class="my-10 self-center"
            >
              <PrimaryButton buttonText="Visiter le site"></PrimaryButton>
            </a>
          </div>
        </div>

        <div ref="imgContainer" class="my-10 flex flex-col gap-10">
          <img src="../assets/img/portfolio/careforu/home.png" alt="" />
        </div>
        <router-link
          to="/portfolio"
          class="mt-20 block flex justify-center w-full"
        >
          <div ref="backLink">
            <PrimaryButton buttonText="Retour au portfolio"></PrimaryButton>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CareforU",
};
</script>

<script setup>
import CurtainWork from "../components/CurtainWork.vue";
import WorkTitle from "../components/WorkTitle.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import { ref, onMounted, onUnmounted, capitalize } from "vue";
import { gsap } from "gsap";
import { useRoute } from "vue-router";

import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();

const contentRef = ref(null);
const containerRef = ref(null);

const routePath = route.path.split("/");
const titleText = routePath[1];
const titleWords = titleText.split(" ");
const words = ref(null);
const title = ref(null);
const titleBg = ref(null);
const titleContainer = ref(null);
const workInfos = ref(null);
const backLink = ref(null);

onMounted(() => {
  //    Initialiser Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.getElementById("content"),
    smooth: true,
    smartphone: { smooth: true },
    tablet: { smooth: true },
    inertia: 0.5,
    passive: true,
  });

  // Synchroniser Locomotive Scroll avec GSAP ScrollTrigger
  ScrollTrigger.scrollerProxy(document.getElementById("content"), {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.getElementById("content").style.transform
      ? "transform"
      : "fixed",
  });

  scroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", () => scroll.update());

  gsap.from(words.value, {
    opacity: 0,
    ease: "power3.out",
    y: 100,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: containerRef.value,
      start: `${
        title.value.getBoundingClientRect().bottom -
        title.value.offsetHeight / 2
      }px bottom`,
      end: `${workInfos.value.getBoundingClientRect().top}px bottom`,
      scrub: 1,
      scroller: contentRef.value,
      //   markers: true,
    },
  });

  gsap.from(titleBg.value, {
    opacity: 0,
    ease: "power3.out",
    duration: 1,
    scrollTrigger: {
      trigger: containerRef.value,
      start: `${title.value.getBoundingClientRect().bottom}px bottom`,
      end: `${workInfos.value.getBoundingClientRect().top}px bottom`,
      scrub: 1,
      scroller: contentRef.value,
      //   markers: true,
    },
  });

  gsap.from(gsap.utils.toArray(workInfos.value.children), {
    opacity: 0,
    x: -20,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.3, // Intervalle entre chaque animation d'enfant
    scrollTrigger: {
      trigger: containerRef.value,
      start: `${workInfos.value.getBoundingClientRect().top + 200}px bottom`,
      end: `${workInfos.value.getBoundingClientRect().bottom + 200}px bottom`,
      scrub: 1,
      scroller: contentRef.value,
      //   markers: true,
    },
  });

  gsap.from(backLink.value, {
    opacity: 0,
    ease: "power3.out",
    duration: 1,
    scrollTrigger: {
      trigger: containerRef.value,
      start: `${backLink.value.getBoundingClientRect().bottom}px bottom`,
      end: `bottom bottom`,
      scrub: 1,
      scroller: contentRef.value,
      // markers: true,
    },
  });
});
</script>
<style scoped>
</style>