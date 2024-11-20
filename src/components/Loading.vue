<!-- Loading.vue -->
<template>
  <div ref="loadingOverlay" class="absolute h-full w-full z-50">
    <div
      ref="loadingOverlayBg"
      class="bg-[#edeef3] w-full h-full absolute z-[-20]"
    ></div>
    <div
      v-for="n in 10"
      :key="n"
      :style="{
        width: `${n}0vw`,
        backgroundColor: '#edeef3',
        height: `${n}0vh`,
        zIndex: `-${n}`,
      }"
      :class="`h-full circle absolute circle${n}`"
    ></div>
    <div
      class="flex justify-center items-center w-full h-full animated-background"
    >
      <img src="../assets/img/FuJi.svg" alt="" class="fade-in-image w-[20vw]" />
      <p class="studio">
        <span
          v-for="(letter, index) in letters"
          :key="index"
          class="letter relative inline-block"
        >
          {{ letter }}
        </span>
      </p>
    </div>
  </div>
</template>


<script>
import { gsap } from "gsap";
export default {
  data() {
    return {
      letters: ["S", "T", "U", "D", "I", "O"],
    };
  },
  mounted() {
    // Animation GSAP pour chaque lettre
    gsap.fromTo(
      ".letter",
      { opacity: 0, y: -50, x: -20, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.5,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.1,
        delay: 1.5,
      }
    );

    // Disparition du composant après 5 secondes
    setTimeout(() => {
      gsap.to(this.$refs.loadingOverlay, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          this.$refs.loadingOverlay.style.display = "none"; // Cache le composant après l'animation
        },
      });
    }, 2500);
  },
};
</script>

<style scoped>
@keyframes moveBackground {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

.circle {
  box-shadow: #f3f4f755 15px 15px 100px inset, #f3f4f7 15px 15px 100px;
  border-bottom-right-radius: 1000px;
  background: transparent;
  animation: moveBackground 1s ease-in-out forwards;
}

.fade-in-image {
  opacity: 0;
  animation: fadeIn 0.5s forwards 1s;
}

.studio {
  text-shadow: white 0px 0px 0.5vw;
  font-size:2.5vw;
  letter-spacing: 3.5vw;
  position: absolute;
  margin-top: 7vw;
  margin-left: 2vw;
  /* animation: fadeIn 0.5s forwards 3s reverse; */
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
