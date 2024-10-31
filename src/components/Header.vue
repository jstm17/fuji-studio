<template>
  <header
    class="bounded flex h-fit justify-between pt-20 mb-10 relative z-10 max-lg:pt-16 max-md:pt-12 items-center"
  >
    <p class="logo z-10">FUJI STUDIO</p>

    <div id="burger-icon" class="z-10" @click="toggleMenu" :class="{ open: isMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div
      class="burger-menu bg-[#B9D5F8] h-[100vh] w-full absolute left-0 top-0 flex flex-col items-center justify-center -translate-y-full transition duration-500 ease-in-out"
     :class="{ 'open': isMenuOpen }">
      <router-link
        v-for="(link, index) in links"
        :key="index"
        :to="link.path"
        class="nav-link"
        ref="navLinks"
         @click="toggleMenu"
        >{{ link.name }}</router-link
      >
    </div>

    <nav class="flex gap-8 relative">
      <router-link
        v-for="(link, index) in links"
        :key="index"
        :to="link.path"
        class="nav-link"
        ref="navLinks"
        >{{ link.name }}</router-link
      >
      <!-- Cercle animé en dessous des liens -->
      <span ref="circle" class="circle-indicator"></span>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";

const route = useRoute();
const circle = ref(null);
const isMenuOpen = ref(false);
const windowWidth = ref(window.innerWidth);
// Définissez vos liens de navigation
const links = [
  { name: "Le Studio", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Services", path: "/services" },
];

window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  console.log(isMenuOpen.value)
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  setTimeout(() => {
    moveIndicatorToActiveLink();
  }, 1000);
});

watch(route, () => {
  moveIndicatorToActiveLink();
});

// Fonction pour déplacer l'indicateur sous le lien actif
const moveIndicatorToActiveLink = () => {
  const navLinks = document.querySelectorAll("header nav a");
  const currentPath = route.path;
  // Find the active link
  const activeLink = Array.from(navLinks).find(
    (link) => link.getAttribute("href") === currentPath
  );
  console.log(activeLink);

  if (activeLink && circle.value) {
    const { offsetLeft, offsetWidth } = activeLink;
    console.log(offsetLeft);
    console.log(offsetWidth);

    // Animation du cercle vers le lien actif
    gsap.to(circle.value, {
      left: offsetLeft + offsetWidth / 2,
      x: "-50%",
      duration: 0.3,
      ease: "power2.out",
    });
  }
};
</script>

<style scoped>
.nav-link {
  position: relative;
  padding-bottom: 0.5rem;
  text-decoration: none;
  color: inherit;
}

.circle-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 6px;
  width: 6px;
  background-color: #65adff; /* Bleu foncé */
  border-radius: 8px;
  transition: width 0.3s ease, left 0.3s ease;
}

#burger-icon {
  display: none;
  width: 40px;
  height: 30px;
  position: relative;
  cursor: pointer;
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
}

#burger-icon span {
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: black;
  border-radius: 9px;
  left: 0;
  transition: 0.25s ease-in-out;
}

#burger-icon span:nth-child(1) { top: 0px; width: 30px; }
#burger-icon span:nth-child(2),
#burger-icon span:nth-child(3) { top: 13px; }
#burger-icon span:nth-child(4) { top: 26px; }

#burger-icon.open span:nth-child(1),
#burger-icon.open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}

#burger-icon.open span:nth-child(2) {
  transform: rotate(45deg);
}

#burger-icon.open span:nth-child(3) {
  transform: rotate(-45deg);
}

.open {
  transform: translateY(0px);
}

@media (max-width: 767px) {
  #burger-icon {
    display: flex;
  }
  nav {
    display: none;
  }
}
</style>
