<template>
  <div class="h-[100vh]">
    <div id="canvas"></div>
    <div
      :style="{ backgroundImage: `url(${currentImage})` }"
      class="image-bg fixed -translate-y-[102%] bg-no-repeat -translate-x-[2%] w-[104%] h-[102vh] bg-cover bg-center"
    ></div>
    <div
      class="pt-32 max-md:pt-24 flex flex-col justify-between h-[100vh] pb-12 gap-10"
    >
      <h2
        ref="heading"
        class="bounded mt-6 overflow-hidden uppercasebounded text-center w-full lg:px-[10%] uppercase max-sm:!text-xl flex flex-wrap gap-x-8 max-sm:gap-x-4 justify-center"
        data-scroll
      >
        <span
          v-for="(word, index) in titleWords"
          :key="index"
          class="inline-block relative overflow-hidden pb-4 max-lg:pb-2 max-sm:pb-0"
        >
          <span class="inline-block" ref="words">{{ word }}</span>
        </span>
      </h2>
      <div id="carousel-container">
        <div id="carousel" class="w-full">
          <router-link
            v-for="(slide, index) in slides"
            :to="slide.link"
            :key="index"
            class="slide h-[22.5vw] w-[40vw] min-h-[250px] min-w-[437.5px] max-lg:h-[31.5vw] max-lg:w-[56vw] max-lg:min-h-[281.25px] max-lg:min-w-[500px] max-md:min-w-[50%]"
            @click="updateSlide(index)"
          >
            <div class="plane">
              <img
                :src="slide.url"
                :alt="`Slide ${index + 1}`"
                crossorigin=""
                data-sampler="planeTexture"
              />
            </div>
          </router-link>
        </div>
      </div>
      <div
        class="bounded text-xl font-bold justify-between flex items-center w-full"
        ref="carouselInfo"
      >
        <div class=""></div>
        <transition name="portfolioTitle" mode="out-in">
          <p class="text-2xl" :key="currentTitle">{{ currentTitle }}</p>
        </transition>

        <p class="">
          <transition name="number-fade" mode="out-in">
            <span :key="currentNumber" class="inline-block">{{
              currentNumber
            }}</span>
          </transition>
          / {{ totalSlides }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import gsap from "gsap";
import { Curtains, Plane } from "curtainsjs";

// Slides du carousel
const slides = ref([
  { url: "./src/assets/img/portfolio/reah.jpg", title: "Reah", link: "/reah" },
  {
    url: "./src/assets/img/portfolio/careforu.jpg",
    title: "CareforU",
    link: "/careforu",
  },
  {
    url: "./src/assets/img/portfolio/joyty.jpg",
    title: "Joyty",
    link: "/joyty",
  },
]);

// Variables globales
let currentScroll = 0; // Scroll actuel
let scrollDelta = 0; // Variation de scroll
let targetScroll = 0; // Position visée
const scrubStrength = 0.03; // Force du scrub (0.1 pour fluide, 0.5 pour réactif)
const totalSlides = slides.value.length;

const currentTitle = ref(slides.value[0].title);
const currentNumber = ref(1);
const currentImage = ref(slides.value[0].url);

let curtains = null;
let simplePlane = null;
let planesDeformations = 0;
const planes = [];

const title = "Notre portfolio de projets créatifs et techniques";
const titleWords = ref(title.split(" "));
const words = ref(null);
const carouselInfo = ref(null);

const initCurtains = () => {
  window.addEventListener(
    "wheel",
    (e) => {
      // normalize wheel event
      let delta = e.deltaY;

      delta = Math.min(Math.max(delta, -60), 60);

      if (Math.abs(delta) > Math.abs(planesDeformations)) {
        planesDeformations = curtains.lerp(planesDeformations, delta, 0.5);
      }
    },
    {
      passive: true,
    }
  );

  // set up our WebGL context and append the canvas to our wrapper
  curtains = new Curtains({
    container: "canvas",
    pixelRatio: Math.min(1.5, window.devicePixelRatio), // limit pixel ratio for performance
  });

  curtains
    .onRender(() => {
      // update our planes deformation
      // increase/decrease the effect
      planesDeformations = curtains.lerp(planesDeformations, 0, 0.075);
    })
    .onError(() => {
      // we will add a class to the document body to display original images
      document.body.classList.add("no-curtains", "planes-loaded");
    })
    .onContextLost(() => {
      // on context lost, try to restore the context
      curtains.restoreContext();
    });

  // we will keep track of all our planes in an array

  // get our planes elements
  let planeElements = document.getElementsByClassName("plane");

  const vs = `
        precision mediump float;
    
        // default mandatory variables
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;
    
        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
    
        uniform mat4 planeTextureMatrix;
    
        // custom variables
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
    
        uniform float uPlaneDeformation;
    
        void main() {
            vec3 vertexPosition = aVertexPosition;
    
            // cool effect on scroll
            vertexPosition.x += -sin(((vertexPosition.y + 1.0) / 2.0) * 3.141592) * (sin(uPlaneDeformation / 90.0));
    
            gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
            // varyings
            vVertexPosition = vertexPosition;
            vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
        }
    `;

  const fs = `
        precision mediump float;
    
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
    
        uniform sampler2D planeTexture;
    
        void main() {
            // just display our texture
            gl_FragColor = texture2D(planeTexture, vTextureCoord);
        }
    `;

  // all planes will have the same parameters
  const params = {
    vertexShader: vs,
    fragmentShader: fs,
    widthSegments: 10,
    heightSegments: 10,
    fov: 45,
    drawCheckMargins: {
      top: 100,
      right: 0,
      bottom: 100,
      left: 0,
    },
    uniforms: {
      planeDeformation: {
        name: "uPlaneDeformation",
        type: "1f",
        value: 0,
      },
    },
  };

  // add our planes and handle them
  for (let i = 0; i < planeElements.length; i++) {
    planes.push(new Plane(curtains, planeElements[i], params));

    handlePlanes(i);
  }

  // handle all the planes
  function handlePlanes(index) {
    const plane = planes[index];

    // check if our plane is defined and use it
    plane
      .onReady(() => {
        // once everything is ready, display everything
        if (index === planes.length - 1) {
          document.body.classList.add("planes-loaded");
        }
      })
      .onRender(() => {
        // update the uniform
        plane.uniforms.planeDeformation.value = planesDeformations;
        //   plane.relativeTranslation.x +=
        //     -(targetScroll - currentScroll) * scrubStrength;
      });
  }
};

onMounted(() => {
  window.addEventListener("beforeunload", () => {
    if (curtains) {
      curtains.dispose();
    }
  });
  const tl = gsap.timeline();
  tl.from(words.value, {
    opacity: 0,
    ease: "power3.out",
    y: 100,
    stagger: 0.1,
    duration: 0.8,
  });

  tl.from(carouselInfo.value, {
    opacity: 0,
    ease: "power3.out",
    y: 20,
    duration: 0.8,
  });

  const carousel = document.getElementById("carousel");
  const slideWidth = document
    .querySelector(".slide")
    .getBoundingClientRect().width; // Largeur d'un slide
  const containerWidth =
    document.getElementById("carousel-container").offsetWidth; // Largeur du conteneur
  const initialOffset = (containerWidth - slideWidth) / 2; // Décalage pour centrer un slide

  // Positionner le carousel pour commencer avec la première slide centrée
  gsap.set("#carousel", {
    x: initialOffset, // Décaler le carrousel
  });

  const updateCarousel = () => {
    // Ajuster la position actuelle vers la position cible
    currentScroll += (targetScroll - currentScroll) * scrubStrength;

    // Déplacer le carousel, en ajoutant l'offset pour garder les slides centrés
    gsap.set(carousel, {
      x: -currentScroll + initialOffset,
    });

    planes.forEach((plane) => {
      plane.relativeTranslation.x = -currentScroll; // Appliquer la même logique
    });

    // Appeler la fonction en boucle
    requestAnimationFrame(updateCarousel);
  };
  window.addEventListener("wheel", handleWheel, { passive: false });

  // Lancer l'animation continue
  updateCarousel();
  initCurtains();
});

// Écouteur de l'événement scroll
const handleWheel = (e) => {
  const slideWidth = document
    .querySelector(".slide")
    .getBoundingClientRect().width; // Largeur d'un slide
  const gap =
    (parseFloat(getComputedStyle(carousel).gap) / 100) * window.innerWidth;
  e.preventDefault();
  scrollDelta = e.deltaY;

  // Amplifier l'effet de scroll pour un scrub plus fort
  targetScroll += scrollDelta * 2; // Facteur d'amplification

  // Calculer la position maximale pour centrer le dernier slide
  const maxScroll = (totalSlides - 1) * (slideWidth + gap);

  // Limiter la position cible
  targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

  const windowCenter = window.innerWidth / 2;
  const images = gsap.utils.toArray(".plane");
  images.forEach((image, index) => {
    const imagePosLeft = image.getBoundingClientRect().left - gap / 2;
    if (imagePosLeft < windowCenter) {
      updateSlide(index);
    }
  });
};

function updateSlide(index) {
  currentTitle.value = slides.value[index].title;
  currentNumber.value = index + 1;
  currentImage.value = slides.value[index].url;
}

onBeforeUnmount(() => {
  window.removeEventListener("wheel", handleWheel); // Remplace `handleScroll` par ta fonction
});


onUnmounted(() => {
  if (curtains) {
    curtains.dispose();
  }
});
</script>


<style scoped>
#carousel-container {
  width: 100%;
  /* height: 100vh; */
  overflow: hidden;
  position: relative;
}

#carousel {
  display: flex;
  height: 100%;
  transform: translateX(0); /* Initial position */
  will-change: transform;
  gap: 15%;
}

.slide {
  position: relative;
  flex-shrink: 0;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  /* opacity: 0.5; */
}
.plane {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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

.portfolioTitle-leave-active,
.portfolioTitle-enter-active {
  transition: opacity 0.3s ease-in-out;
}

/* Appliquer la largeur de 100% pendant la phase de sortie (leave-active) */
.portfolioTitle-leave-to,
.portfolioTitle-enter-from {
  opacity: 0;
}

.number-fade-enter-active,
.number-fade-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.number-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.number-fade-enter-to {
  transform: translateY(0px);
  opacity: 1;
}
.number-fade-leave {
  transform: translateY(0px);
  opacity: 1;
}
.number-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>