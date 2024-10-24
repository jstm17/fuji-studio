<template>
  <div>
    <img :src="currentImage" alt="" class="fixed -translate-y-full fi w-full h-[100vh]" />
    <div class="w-full flex items-center carousel-container h-[100vh]">
      <div class="img-carousel flex gap-[5%] w-max px-[calc(50vw-300px)]">
        <router-link
          v-for="(slide, index) in slides"
          :to="slide.link"
          :key="index"
        >
          <img :src="slide.url" :alt="`Slide ${index + 1}`" />
        </router-link>
      </div>

      <div
        class="bounded fixed bottom-20 text-xl font-bold justify-between flex items-center w-full"
      >
        <transition name="portfolioTitle" mode="out-in">
          <p class="" :key="currentTitle">{{ currentTitle }}</p>
        </transition>
        <transition name="portfolioTitle" mode="out-in">
          <p class="" :key="currentTitle">{{ currentTitle }}</p>
        </transition>

        <transition name="portfolioNumber" mode="out-in">
          <p class="" :key="currentNumber">
            {{ currentNumber }} / {{ totalSlides }}
          </p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "App",
  beforeRouteEnter(to, from, next) {
    document.body.classList.add("h-[unset]", "no-scroll");
    next();
  },
  beforeRouteLeave(to, from, next) {
    document.body.classList.remove("h-[unset]", "no-scroll");
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
    };
  },
  computed: {
    totalSlides() {
      return this.slides.length;
    },
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
          -(
            document.querySelector(".img-carousel").scrollWidth -
            window.innerWidth
          ),
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
      });
    },
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

.img-carousel img {
  width: 600px;
  height: 400px;
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
</style>
