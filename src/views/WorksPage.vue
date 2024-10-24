<template>
  <div class="container">
   <img :src="currentImage" alt="" class="fi" />
    <div class="carousel-container">
      <div class="img-carousel">
        <router-link
          v-for="(slide, index) in slides"
          :to="slide.link"
          :key="index"
        >
          <img
            :src="slide.url"
            :alt="`Slide ${index + 1}`"
          />
        </router-link>
      </div>
      <transition name="worksTitle" mode="out-in">
        <p class="title" :key="currentTitle">{{ currentTitle }}</p>
      </transition>
    </div>
  </div>
</template>
<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "App",
  data() {
    return {
      slides: [
        {
          url: "../careforu.png",
          title: "Title 1",
          link: "/careforu",
        },
        {
          url: "https://placehold.co/600x400",
          title: "Title 2",
          link: "/careforu",
        },
        {
          url: "https://placehold.co/600x400",
          title: "Title 3",
          link: "/careforu",
        },
        {
          url: "https://placehold.co/600x400",
          title: "Title 4",
          link: "/careforu",
        },
        {
          url: "https://placehold.co/600x400",
          title: "Title 5",
          link: "/careforu",
        },
        {
          url: "https://placehold.co/600x400",
          title: "Title 6",
          link: "/careforu",
        },
        {
          url: "https://placehold.co/600x400",
          title: "Title 7",
          link: "/careforu",
        },
        {
          url: "https://placehold.co/600x400",
          title: "Title 8",
          link: "/careforu",
        },
      ],
      currentTitle: "Title 1", // Initially set to the first title
      currentImage: "../careforu.png", // Initially set to the first image
    };
  },
  mounted() {
    this.initSlider();
  },
  methods: {
    initSlider() {
      const images = gsap.utils.toArray(".img-carousel img");

      // Horizontal scroll of the entire carousel
      gsap.to(".img-carousel", {
        x: () =>
          -(document.querySelector(".img-carousel").scrollWidth -
            window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: ".carousel-container",
          pin: true,
          scrub: 2,
          start: "top top",
          end: () =>
            "+=" +
            (document.querySelector(".img-carousel").scrollWidth -
              window.innerWidth),
          invalidateOnRefresh: true,
        },
      });

      const windowCenter = window.innerWidth / 2;
      window.addEventListener("scroll", () => {
        images.forEach((image, index) => {
          const imagePosLeft = image.getBoundingClientRect().left - 50;
          if (imagePosLeft < windowCenter) {
            this.updateSlide(index);
          }
        });
        // document.querySelector('.fi').style.top = window.screenTop
        console.log(window.screenY)
      });
    },
    updateSlide(index) {
      this.currentTitle = this.slides[index].title;
      this.currentImage = this.slides[index].url; // Update the background image
    },
  },
};
</script>


<style>
.carousel-container {
  width: 100%;
  height: 100vh; /* Hauteur complète de l'écran */
  display: flex;
  align-items: center; /* Centrer verticalement le carrousel */
  
}

.img-carousel {
  display: flex;
  gap: 100px;
  width: max-content; /* Laisser le conteneur s'étendre à la largeur des images */
  padding-left: calc(50vw - 300px);; /* Ajustez cette valeur pour l'espace souhaité à gauche */
  padding-right: calc(50vw - 300px);;
}

img {
  width: 600px;
  height: 400px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.5s ease;
}

.title {
  position: fixed;
  bottom: 100px;
  text-align: center;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
}

.fi {
  position: fixed;
  transform: translateY(-100vh);
  width: 100%;
  height: 100vh;
}

.worksTitle-leave-active, .worksTitle-enter-active {
    transition: opacity 0.5s ease-in-out;
  }
  
  /* Appliquer la largeur de 100% pendant la phase de sortie (leave-active) */
  .worksTitle-leave-to, .worksTitle-enter-from  {
      opacity: 0;
  }
</style>
