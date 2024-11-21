<template>
  <div ref="studioContainer">
    <!-- Section 1 -->

    <div class="content">
      <section
        ref="first-section"
        class="h-[100vh] bounded pt-32 pb-16 flex flex-col justify-center items-center first-section z-10"
      >
        <div class="flex flex-col justify-center items-center flex-1">
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
          <p ref="subtitle" class="my-6 overflow-hidden text-center">
            <span
              v-for="(word, index) in subtitleWords"
              :key="index"
              class="inline-block mr-1 relative overflow-hidden"
            >
              <span class="inline-block" ref="wordsSubtitle">{{ word }}</span>
            </span>
          </p>
        </div>
        <div
          class="flex w-full h-fit justify-end max-sm:flex-wrap max-sm:gap-8 items-center relative max-sm:flex-col max-sm:gap-4"
        >
          <!-- <div ref="guide">
            <GuideButton buttonText="Télécharger le guide" />
          </div> -->
          <router-link to="/services">
            <div ref="button">
              <BubbleButton buttonText="Commencer l'aventure" />
            </div>
          </router-link>
        </div>
      </section>

      <!-- Section 2 -->
      <section class="second-section">
        <div id="canvas" ref="photos"></div>

        <div
          class="second-section-bg absolute h-full w-full backdrop-blur border-[#f3f4f7] border-y-2 bg-[#65ADFF10] -z-50"
        ></div>
        <div
          class="bounded py-12 flex justify-between gap-8 max-header:flex-col max-sm:py-0"
        >
          <div class="w-1/2 flex flex-col justify-between max-header:w-full">
            <h2 ref="heading2" class="my-6 overflow-hidden uppercase">
              <span
                v-for="(word, index) in secondTitleWords"
                :key="index"
                class="inline-block mr-4 relative overflow-hidden pb-4 max-lg:pb-2 max-sm:pb-0"
              >
                <span class="inline-block" ref="wordsSecondTitle">{{
                  word
                }}</span>
              </span>
            </h2>
            <p class="text-start pb-32 max-header:pb-0" ref="description">
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
              <!-- <div class="bg-black" ref="photo1"><Curtainjs2 /></div> -->

              <div class="plane-wrapper">
                <div class="plane-inner h-full w-full -translate-y-full">
                  <div class="plane">
                    <img
                      src="../assets/img/studio/fideline.jpg"
                      crossorigin=""
                      data-sampler="planeTexture"
                    />
                  </div>
                </div>
              </div>
              <div class="plane-wrapper -translate-y-[90%]">
                <div class="plane-inner h-full w-full">
                  <div class="plane" ref="photo2">
                    <img
                      src="../assets/img/studio/julie.jpg"
                      crossorigin=""
                      data-sampler="planeTexture"
                    />
                  </div>
                </div>
              </div>
              <!-- <div class="bg-black" ref="photo2">img 2</div> -->
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3 -->
      <section
        class="third-section h-[35vh] flex flex-col jusitfy-center items-center gap-10 bounded"
      >
        <h2
          ref="heading3"
          class="my-6 overflow-hidden uppercase m-auto text-center"
        >
          <span
            v-for="(word, index) in thirdTitleWords"
            :key="index"
            class="inline-block mr-4 relative overflow-hidden pb-4 max-lg:pb-2 max-sm:pb-0"
          >
            <span class="inline-block" ref="wordsThirdTitle">{{ word }}</span>
          </span>
        </h2>

        <div
          ref="loadingContainer"
          class="w-[80%] h-2 bg-[#65ADFF20] rounded-full"
        >
          <div
            ref="loadingBar"
            class="loadingBar h-full w-0 bg-[#65ADFF] rounded-full"
          ></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import PrimaryButton from "../components/PrimaryButton.vue";
import BubbleButton from "../components/BubbleButton.vue";
import GuideButton from "../components/GuideButton.vue";
import Curtainjs2 from "../components/Curtainjs2.vue";
import { useRouter } from "vue-router";
import Curtain from "../components/ContactCurtain.vue";
import LocomotiveScroll from "locomotive-scroll";
import { Curtains, Plane, Vec2, Vec3, PingPongPlane } from "curtainsjs";
import { fragmentShader, vertexShader } from "../shaders/services-shader.js";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Ajoutez cette ligne
const router = useRouter();
const studioContainer = ref(null);
const button = ref(null);
const firstLineText = "Quand le code";
const secondLineText = "rejoint la créativité";
const firstLineLetters = ref([...firstLineText]);
const secondLineLetters = ref([...secondLineText]);
const firstLineText2 = "Deux esprits, ";
const secondLineText2 = "une vision";
const firstLineLetters2 = ref([...firstLineText2]);
const secondLineLetters2 = ref([...secondLineText2]);
const letters = ref(null);

const subtitleText =
  "Nous créons des expériences numériques qui parlent plus fort que les mots";
const subtitleWords = ref(subtitleText.split(" "));
const wordsSubtitle = ref(null);

const heading2 = ref(null);
const secondTitleText = "Deux esprits, une vision";
const secondTitleWords = ref(secondTitleText.split(" "));
const wordsSecondTitle = ref(null);

const credits = ref(null);
const description = ref(null);
const photos = ref(null);
// Smoke effect animation function

const heading3 = ref(null);
const thirdTitleText = "Envie de découvrir nos projets ?";
const thirdTitleWords = ref(thirdTitleText.split(" "));
const wordsThirdTitle = ref(null);

const loadingContainer = ref(null);
const loadingBar = ref(null);
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

let scroll;
let curtains;
onMounted(() => {
  scroll = new LocomotiveScroll({
    el: document.querySelector(".content"),
    smooth: true,
    smartphone: { smooth: true },
    tablet: { smooth: true },
    inertia: 0.5,
    passive: true,
  });

  // Synchroniser Locomotive Scroll avec GSAP ScrollTrigger
  ScrollTrigger.scrollerProxy(".content", {
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
    pinType: document.querySelector(".content").style.transform
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
  curtains = new Curtains({
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
        // scrollEffect = curtains.lerp(scrollEffect, 0, 0.05);
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
        plane.rotation.z = Math.abs(scrollEffect) / -300;

        // scale plane and its texture
        plane.scale.y = 1 + Math.abs(scrollEffect) / 750;
        plane.textures[0].scale.y = 1 + Math.abs(scrollEffect) / 50;
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
      -(parallaxEffect * sceneBoundingRect.height) / 200;
    /*
          // old way using setRelativeTranslation
          planes[index].setRelativeTranslation(new Vec3(0, parallaxEffect * (sceneBoundingRect.height / 4)));
           */
  }

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
  gsap.from(wordsSubtitle.value, {
    delay: 1,
    opacity: 0,
    ease: "power3.out",
    y: 50,
    stagger: 0.1,
    duration: 0.8,
  });
  // Animation deuxième section

  gsap.to(".second-section", {
    y: -100,
    ease: "power3.out",
    duration: 0.8,
    scrollTrigger: {
      trigger: ".content",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      scroller: ".content",
      // markers: true
    },
  });

  gsap.to(".second-section-bg", {
    ease: "power3.out",
    y: -50,
    duration: 0.8,
    skewY: 5,
    scrollTrigger: {
      trigger: ".content",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      scroller: ".content",
      // markers: true
    },
  });

  const tl = gsap.timeline();

  tl.from(wordsSecondTitle.value, {
    opacity: 0,
    ease: "power3.out",
    y: 100,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".content",
      start: `${
        heading2.value.getBoundingClientRect().bottom -
        heading2.value.offsetHeight / 2
      }px bottom`,
      end: `${
        document.querySelector(".second-section").getBoundingClientRect().bottom
      }px bottom`,
      scrub: 1,
      scroller: ".content",
      // markers: true,
    },
  });

  tl.from(credits.value, {
    y: 300, // Commence en bas
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".content",
      start: `${heading2.value.getBoundingClientRect().bottom}px bottom`,
      end: `${
        document.querySelector(".second-section").getBoundingClientRect().bottom
      }px bottom`,
      scrub: 1, // Fait suivre l'animation au défilement
      // markers: true, // Pour déboguer, retirez-le en production
      scroller: ".content",
    },
  });

  // // // Animation for description
  tl.from(description.value, {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".content",
      start: `${description.value.getBoundingClientRect().top}px bottom`,
      end: `${
        document.querySelector(".second-section").getBoundingClientRect().bottom
      }px bottom`,
      scrub: 1, // Fait suivre l'animation au défilement
      scroller: ".content",
      // markers: true, // Pour déboguer, retirez-le en production
    },
  });

  gsap.from(wordsThirdTitle.value, {
    opacity: 0,
    ease: "power3.out",
    y: 100,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".content",
      start: `${heading3.value.getBoundingClientRect().bottom}px bottom`,
      end: `${heading3.value.getBoundingClientRect().bottom + 100}px bottom`,
      scrub: 1,
      scroller: ".content",
      // markers: true,
    },
  });

  gsap.fromTo(
    ".third-section",
    {
      y: -400,
    },
    {
      y: 0,
      ease: "power3.out",
      duration: 0.8,
      scrollTrigger: {
        trigger: ".content",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        scroller: ".content",
        // markers: true
      },
    }
  );

  let isLoading = false;
  let lastScrollY = 0;

  scroll.on("scroll", ({ scroll }) => {
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    // console.log(docHeight);
    const currentScroll = scroll.y; // Position actuelle du scroll
    const maxScroll = currentScroll + windowHeight; // Limite du scroll vertical
    // console.log(docHeight);
    // console.log(maxScroll);

    const isScrollingDown = currentScroll > lastScrollY;
    lastScrollY = currentScroll;

    if (isScrollingDown && !isLoading && maxScroll >= docHeight - 100) {
      // Ajustez la marge si nécessaire
      isLoading = true;

      if (loadingBar.value) {
        loadingBar.value.style.width = "100%";
      }

      // Redirection après 5 secondes
      loadingBar.value.addEventListener("transitionend", () => {
        // Si la largeur atteint 100%, redirige vers la nouvelle page
        if (loadingBar.value && loadingBar.value.style.width === "100%") {
          router.push({ name: "Portfolio" });
        }
      });
    } else if (!isScrollingDown) {
      isLoading = false;

      if (loadingBar.value) {
        loadingBar.value.style.width = "0%";
      }
    }
  });
});

onUnmounted(() => {
  if (scroll) {
    scroll.destroy(); // Détruisez l'instance de Locomotive Scroll
  }
  // ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Nettoyez ScrollTrigger
  if (curtains) {
    curtains.dispose();
  }
});
</script>


<style scoped>
.letter {
  display: inline-block;
}

#canvas {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;

  z-index: -1;

  opacity: 0;

  transition: opacity 0.5s ease-in;
}

.plane img {
  display: none;
}
.plane {
  width: 100%;
  height: 100%;
  /* position: absolute; */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.planes-loaded #canvas {
  opacity: 1;
}

.planes-loaded #planes {
  opacity: 1;
}

.no-curtains .plane img {
  display: block;
  width: 100%;
  height: auto;
}

#canvas2 {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  z-index: 10;
}

#flowmap {
  width: 100%;
  height: 100vh;
}

#flowmap img {
  display: none;
}

/*** handling errors ***/

.no-curtains #flowmap {
  display: flex;
  overflow: hidden;
}

.no-curtains #flowmap img {
  display: block;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

.loadingBar {
  transition: width 3s linear;
}
</style>
