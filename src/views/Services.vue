<template>
  <div
    class="services-container w-full relative"
    ref="servicesContainer"
  >
    <div id="canvas"></div>
    <div id="page-content">
      <div id="content" class="flex flex-col gap-16 bounded pb-16">
        <!-- Section 1 -->
        <div
          class="flex flex-col justify-center gap-[5vw] h-[100vh] pt-36 max-lg:pt-28 pb-12"
        >
          <h2 ref="heading" class="overflow-hidden uppercase max-xs:!text-2xl">
            <span
              v-for="(word, index) in titleWords"
              :key="index"
              class="inline-block mr-8 relative overflow-hidden pb-4 max-lg:pb-2 max-sm:pb-1"
            >
              <span class="inline-block" ref="words">{{ word }}</span>
            </span>
          </h2>
          <p
            ref="description"
            class="w-1/2 max-md:w-full text-justify self-end"
          >
            Concevez un site à votre image, pensé pour vos utilisateurs. En
            alliant design et technologies modernes, nous développons des sites
            web qui allient esthétisme, fonctionnalité, et performance. Que ce
            soit un site vitrine, un e-commerce ou une plateforme sur mesure,
            nous nous assurons que votre site véhicule l’essence de votre marque
            tout en offrant une expérience utilisateur irréprochable.
          </p>
        </div>

        <!-- Section 2 -->
        <div
          class="carousel-container w-full flex flex-col"
          ref="carouselContainer"
        >
          <!-- <h1>NOS SERVICES</h1> -->
          <h1 ref="heading2" class="uppercase w-full text-center">
            <span
              v-for="(word, index) in titleWords2"
              :key="index"
              class="inline-block mr-8 relative overflow-hidden pb-4 max-lg:pb-2 max-sm:pb-1"
            >
              <span class="inline-block" ref="words2">{{ word }}</span>
            </span>
          </h1>
          <!-- Curtainjs -->
          <div
            id="planes"
            class="my-14 w-full max-xl:flex-col max-xl:items-center max-xl:gap-12 gap-[6vw]"
          >
            <div
              v-for="(plane, index) in planesData"
              :key="index"
              class="plane-wrapper relative w-[46%] h-[20vw] max-xl:w-full max-xs:min-h-[600px] max-sm:min-h-[450px] max-md:min-h-[350px] max-lg:min-h-[300px] max-xl:min-h-[250px] flex justify-center items-center"
            >
              <div
                class="flex flex-col px-10 py-8 justify-center items-center h-full w-full bg-[#ffffffb1] backdrop-blur-sm w-[79%] h-[80%]"
              >
                <span class="plane-title text-3xl font-semibold mb-2">{{
                  plane.title
                }}</span>
                <span class="plane-description">{{ plane.description }}</span>
              </div>
              <div class="plane-inner">
                <div class="plane">
                  <img
                    :src="plane.image"
                    crossorigin=""
                    data-sampler="planeTexture"
                    class="rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="h-[50vh]"></div> -->
        </div>

        <!-- Section -->
        <div class="flex flex-col items-center">
          <h1
            ref="heading3"
            class="my-6 overflow-hidden uppercase w-full text-center"
          >
            <span
              v-for="(word, index) in titleWords3"
              :key="index"
              class="inline-block mr-8 relative overflow-hidden pb-4 max-lg:pb-2 max-sm:pb-1"
            >
              <span class="inline-block" ref="words3">{{ word }}</span>
            </span>
          </h1>
          <router-link to="/contact">
            <div ref="" class="my-10">
              <PrimaryButton buttonText="Contactez-nous pour connaitre nos tarifs"></PrimaryButton>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import Curtainjs from "../components/Curtainjs.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import { Curtains, Plane, Vec2, Vec3 } from "curtainsjs";
import { fragmentShader, vertexShader } from "../shaders/services-shader.js";

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
const heading2 = ref(null);
const heading3 = ref(null);

const planesData = ref([
  {
    image: new URL("../assets/img/services/web-design.webp", import.meta.url).href,
    title: "Web Design",
    description:
      "Concevez un design qui attire et engage votre audience. Nous créons des designs sur mesure, pensés pour raconter l’histoire de votre marque et offrir une expérience fluide et agréable. En tant que créatives, nous utilisons une approche esthétique et fonctionnelle, afin que chaque élément soit en harmonie avec vos objectifs.",
  },
  {
    image: new URL("../assets/img/services/developpement-web.webp", import.meta.url).href,
    title: "Développement Web sur Mesure",
    description:
      "Transformez vos idées en un site performant et facile à gérer. En s’appuyant sur les technologies les plus récentes, nous développons des sites optimisés et modulables, du site vitrine au e-commerce. Nous garantissons des solutions techniques qui allient performance, sécurité, et évolutivité.",
  },
  {
    image: new URL("../assets/img/services/seo.webp", import.meta.url).href,
    title: "Optimisation SEO Naturelle",
    description:
      "Rendez votre site visible là où votre audience vous cherche. Notre expertise en SEO naturel aide votre site à apparaître dans les résultats de recherche, sans négliger l’authenticité de votre contenu. Nous vous accompagnons dans la définition de mots-clés et dans l’optimisation technique.",
  },
  {
    image: new URL("../assets/img/services/formations.webp", import.meta.url).href,
    title: "Formation et Accompagnement Digital",
    description:
      "Devenez autonomes dans le digital ! Grâce à nos formations adaptées, développez les compétences pour gérer votre site et optimiser votre SEO. Nous proposons un accompagnement pas-à-pas pour que vous puissiez avancer avec confiance.",
  },
  {
    image: new URL("../assets/img/services/audit.webp", import.meta.url).href,
    title: "Audit de Projet Digital",
    description:
      "Pour tirer le meilleur de votre projet, faites le point avec un audit complet. Nous analysons en profondeur votre site pour identifier ses points forts et les axes d’amélioration. Design, SEO, expérience utilisateur, sécurité : chaque élément est vérifié pour garantir un projet efficace et aligné avec vos objectifs.",
  },
]);

let carouselAnimation;
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

  // we will keep track of all our planes in an array
  const planes = [];
  let scrollEffect = 0;

  // get our planes elements
  const planeElements = document.getElementsByClassName("plane");

  // handle smooth scroll and update planes positions
  const useNativeScroll = scroll.isMobile;

  // set up our WebGL context and append the canvas to our wrapper
  const curtains = new Curtains({
    alpha: true,
    container: "canvas",
    watchScroll: useNativeScroll, // watch scroll on mobile not on desktop since we're using locomotive scroll
    pixelRatio: Math.min(1.5, window.devicePixelRatio), // limit pixel ratio for performance
  });

  curtains
    .onRender(() => {
      if (useNativeScroll) {
        // update our planes deformation
        // increase/decrease the effect
        scrollEffect = curtains.lerp(scrollEffect, 0, 0.05);
      }
    })
    .onScroll(() => {
      // get scroll deltas to apply the effect on scroll
      const delta = curtains.getScrollDeltas();

      // invert value for the effect
      delta.y = -delta.y;

      // threshold
      if (delta.y > 60) {
        delta.y = 60;
      } else if (delta.y < -60) {
        delta.y = -60;
      }

      if (useNativeScroll && Math.abs(delta.y) > Math.abs(scrollEffect)) {
        scrollEffect = curtains.lerp(scrollEffect, delta.y, 0.5);
      } else {
        scrollEffect = curtains.lerp(scrollEffect, delta.y * 1.5, 0.5);
      }

      // manually update planes positions
      for (let i = 0; i < planes.length; i++) {
        // apply additional translation, scale and rotation
        applyPlanesParallax(i);

        // update the plane deformation uniform as well
        planes[i].uniforms.scrollEffect.value = scrollEffect;
      }
    })
    .onError(() => {
      // we will add a class to the document body to display original images
      document.body.classList.add("no-curtains", "planes-loaded");
    })
    .onContextLost(() => {
      // on context lost, try to restore the context
      curtains.restoreContext();
    });

  function updateScroll(xOffset, yOffset) {
    // update our scroll manager values
    curtains.updateScrollValues(xOffset, yOffset);
  }

  // custom scroll event
  if (!useNativeScroll) {
    // we'll render only while lerping the scroll
    curtains.disableDrawing();
    scroll.on("scroll", (obj) => {
      updateScroll(obj.scroll.x, obj.scroll.y);

      // render scene
      curtains.needRender();
    });
  }

  const params = {
    vertexShader,
    fragmentShader,
    widthSegments: 10,
    heightSegments: 10,
    uniforms: {
      scrollEffect: {
        name: "uScrollEffect",
        type: "1f",
        value: 0,
      },
      opacity: {
        // Uniforme d'opacité
        name: "uOpacity",
        type: "1f",
        value: 0.5, // Valeur par défaut (complètement opaque)
      },
    },
    blendfunc: {
      src: curtains.gl.SRC_ALPHA,
      dst: curtains.gl.ONE_MINUS_SRC_ALPHA, // This ensures proper alpha blending
    },
  };

  // add our planes and handle them
  for (let i = 0; i < planeElements.length; i++) {
    const plane = new Plane(curtains, planeElements[i], params);

    planes.push(plane);
    handlePlanes(i);
  }

  // handle all the planes
  function handlePlanes(index) {
    const plane = planes[index];

    // check if our plane is defined and use it
    plane
      .onReady(() => {
        // apply parallax on load
        applyPlanesParallax(index);

        // once everything is ready, display everything
        if (index === planes.length - 1) {
          document.body.classList.add("planes-loaded");
        }
      })
      .onAfterResize(() => {
        // apply new parallax values after resize
        applyPlanesParallax(index);
      })
      .onRender(() => {
        // new way: we just have to change the rotation and scale properties directly!
        plane.uniforms.opacity.value = 1;

        // apply the rotation
        plane.rotation.z = Math.abs(scrollEffect) / 750;

        // scale plane and its texture
        plane.scale.y = 1 + Math.abs(scrollEffect) / 300;
        plane.textures[0].scale.y = 1 + Math.abs(scrollEffect) / 150;

        /*
            // old way: using setRotation and setScale
            plane.setRotation(new Vec3(0, 0, scrollEffect / 750));
            plane.setScale(new Vec2(1, 1 + Math.abs(scrollEffect) / 300));
            plane.textures[0].setScale(new Vec2(1, 1 + Math.abs(scrollEffect) / 150));
            */
      });
  }

  function applyPlanesParallax(index) {
      // calculate the parallax effect
      // get our window size
      const sceneBoundingRect = curtains.getBoundingRect();
      // get our plane center coordinate
      const planeBoundingRect = planes[index].getBoundingRect();
      const planeOffsetTop = planeBoundingRect.top + planeBoundingRect.height / 2;
      // get a float value based on window height (0 means the plane is centered)
      const parallaxEffect =
        (planeOffsetTop - sceneBoundingRect.height / 2) /
        sceneBoundingRect.height;
      // apply the parallax effect
      planes[index].relativeTranslation.y =
        (parallaxEffect * sceneBoundingRect.height) / 20;
      /*
          // old way using setRelativeTranslation
          planes[index].setRelativeTranslation(new Vec3(0, parallaxEffect * (sceneBoundingRect.height / 4)));
           */
  }

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

  tl.from(
    description.value,
    {
      opacity: 0,
      ease: "power3.out",
      y: 50,
      duration: 1,
      // scrollTrigger: {
      //   trigger: ".services-container",
      //   start: "top top", // Commence quand le haut du paragraphe atteint 90% de la fenêtre
      //   end: "bottom center", // Termine quand le bas du paragraphe atteint le haut de la fenêtre
      //   scrub: 2,
      //   scroller: document.getElementById("content"),
      // },
    },
    "-=0.3"
  );

  gsap.from(words2.value, {
    opacity: 0,
    ease: "power3.out",
    y: 100,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".services-container",
      start: `${
        heading2.value.getBoundingClientRect().bottom -
        heading2.value.offsetHeight / 2
      }px bottom`,
      end: `${carouselContainer.value.getBoundingClientRect().top}px center`, // Termine quand le bas du paragraphe atteint le haut de la fenêtre
      scrub: 2,
      scroller: document.getElementById("content"),
      // markers: true,
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
      scroller: document.getElementById("content"),
      // markers: true,
    },
  });
  // Activer ScrollTrigger
  //   ScrollTrigger.refresh();
});
onUnmounted(() => {
  // if (scroll) {
  //   scroll.destroy(); // Détruisez l'instance de Locomotive Scroll
  //   scroll = null;
  // }
  // ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Nettoyez ScrollTrigger
});
</script>


<style scoped>
.flex-wrapper {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flexbox;
  display: -moz-flex;
  display: -o-flex;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

/*** canvas ***/

/* our canvas will be a bit taller than our window to avoid "glitched" top and bottom edges */
#canvas {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  opacity: 0;
  transition: opacity 0.5s ease-in;
  /* background: #ffffffb8; */
  z-index: -1;
}

.planes-loaded #canvas {
  opacity: 1;
}
/*** content ***/

#page-content {
  position: relative;
  z-index: 1;
}

#planes {
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s ease-in;
  display: flex;
  flex-wrap: wrap;
  /* column-gap: 6vw; */
  /* padding: 6vw; */
  justify-content: center;
}

.planes-loaded #planes {
  opacity: 1;
}

.plane {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.plane img {
  display: none;
}

/*** handling errors ***/

.no-curtains .plane-title {
  z-index: 1;
}

.no-curtains .plane {
  display: flex;
  overflow: hidden;
}

.no-curtains .plane img {
  display: block;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
</style>