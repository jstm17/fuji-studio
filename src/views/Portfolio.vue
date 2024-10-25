<template>
  <div>
    <div
      :style="{ backgroundImage: `url(${currentImage})` }"
      class="image-bg fixed -translate-y-full bg-no-repeat w-full h-[100vh] bg-cover bg-center"
    ></div>
    <div
      class="w-full flex carousel-container h-[100vh] flex-col justify-center"
    >
      <h1 class="bounded text-center mb-14 w-full">
        Notre portfolio de projets créatifs et techniques.
      </h1>
      <div class="img-carousel flex w-max px-[30vw]">
        <router-link
          v-for="(slide, index) in slides"
          :to="slide.link"
          :key="index"
        >
          <img :src="slide.url" :alt="`Slide ${index + 1}`" />
        </router-link>
      </div>

      <div
        class="bounded fixed bottom-14 text-xl font-bold justify-between flex items-center w-full"
      >
        <transition name="portfolioTitle" mode="out-in">
          <p class="" :key="currentTitle">{{ currentTitle }}</p>
        </transition>
        <transition name="portfolioTitle" mode="out-in">
          <p class="" :key="currentTitle">{{ currentTitle }}</p>
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

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "Portfolio",
  beforeRouteEnter(to, from, next) {
    document.body.classList.add("h-[unset]", "no-scroll");
    next((vm) => {
      document.querySelector("header").classList.add("fixed");
    });
  },
  beforeRouteLeave(to, from, next) {
    document.body.classList.remove("h-[unset]", "no-scroll");
    document.querySelector("header").classList.remove("fixed");
    if (to.name !== "CareForU") {
      document.querySelector(".image-bg").classList.add("hidden");
    }
    next();
  },
  data() {
    return {
      slides: [
        {
          url: "./src/assets/img/careforu.png",
          title: "Title 1",
          link: "/careforu",
        },
        {
          url: "./src/assets/img/careforu.png",
          title: "Title 2",
          link: "/careforu",
        },
        {
          url: "./src/assets/img/careforu.png",
          title: "Title 3",
          link: "/careforu",
        },
        {
          url: "./src/assets/img/careforu.png",
          title: "Title 4",
          link: "/careforu",
        },
        {
          url: "./src/assets/img/careforu.png",
          title: "Title 5",
          link: "/careforu",
        },
        {
          url: "./src/assets/img/careforu.png",
          title: "Title 6",
          link: "/careforu",
        },
        {
          url: "./src/assets/img/careforu.png",
          title: "Title 7",
          link: "/careforu",
        },
        {
          url: "./src/assets/img/careforu.png",
          title: "Title 8",
          link: "/careforu",
        },
      ],
      currentTitle: "Title 1",
      currentNumber: "1",
      currentImage: "./src/assets/img/careforu.png",
      slidewidth: 300,
    };
  },
  computed: {
    totalSlides() {
      return this.slides.length;
    },
  },
  mounted() {
    const savedSlideIndex = sessionStorage.getItem("savedSlideIndex");
    console.log(savedSlideIndex);
    this.initSlider(savedSlideIndex ? parseInt(savedSlideIndex) : 0);
  },
  methods: {
    initSlider(startIndex) {
      const images = gsap.utils.toArray(".img-carousel img");
      const carousel = document.querySelector(".img-carousel");
      const slideWidth = carousel.querySelector("img").offsetWidth;

      const startPosition = -(
        (startIndex + 1) * slideWidth -
        window.innerWidth / 2 +
        slideWidth / 2
      );

      gsap.set(carousel, { x: startPosition });

      // Horizontal scroll of the entire carousel
      ScrollTrigger.create({
        trigger: ".carousel-container",
        pin: true,
        scrub: 2,
        start: "top top",
        end: () => "+=" + (carousel.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Mettre à jour la position de défilement pour le carrousel
          gsap.to(carousel, {
            x: -self.progress * (carousel.scrollWidth - window.innerWidth),
          });
        },
      });

      // Save index
      images.forEach((img, index) => {
        img.addEventListener("click", () => {
          sessionStorage.setItem("savedSlideIndex", index);
          this.updateSlide(index);
        });
      });

      // Update Slide information
      this.updateSlide(startIndex);

      const windowCenter = window.innerWidth / 2;
      window.addEventListener("scroll", () => {
        images.forEach((image, index) => {
          const imagePosLeft = image.getBoundingClientRect().left - 50;
          if (imagePosLeft < windowCenter) {
            this.updateSlide(index);
          }
        });
      });
    },

    // Update Slide information
    updateSlide(index) {
      this.currentTitle = this.slides[index].title;
      this.currentNumber = index + 1;
      this.currentImage = this.slides[index].url; // Update the background image
    },
  },
};
</script>


<style>
.no-scroll::-webkit-scrollbar {
  display: none !important;
}
</style>

<style scoped>
img {
  max-width: unset;
}

.img-carousel {
  gap: 10vw;
}

.img-carousel img {
  width: 40vw;
  /* height: 200px; */
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.5s ease;
  cursor: pointer;
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
