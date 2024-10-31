  
<template>
  <div id="app">
    <Loading />
    <Header />
    <div id="cursor"></div>

    <main class="flex-1">
      <router-view v-slot="{ Component, route }" v-if="!isLoading">
        <!-- Use a custom transition or fallback to `fade` -->
        <transition :name="route.meta.transition" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import Loading from "./components/Loading.vue";
import Header from "./components/Header.vue";

// Reactive properties
const isLoading = ref(true);
const cursor = ref(null);
const windowWidth = ref(window.innerWidth);
const route = useRoute();

const setCursorEffects = () => {
  // Track mouse movement
  document.addEventListener("mousemove", (e) => {
    cursor.value.style.left = `${e.pageX}px`;
    cursor.value.style.top = `${e.pageY}px`;
  });

  // Add click effects
  document.addEventListener("mousedown", () => {
    gsap.to(cursor.value, { scale: 0.7, backgroundColor: "#0056b3", duration: 0.2 });
  });
  document.addEventListener("mouseup", () => {
    gsap.to(cursor.value, { scale: 1, backgroundColor: "#65ADFF80", duration: 0.2 });
  });
};

const reloadOnResize = () => {
  let resizeTimeout;
  const onResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      window.location.reload();
    }, 200); // Debounce to avoid multiple reloads during resize
  };
  window.addEventListener("resize", onResize);

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
};

onMounted(() => {
  cursor.value = document.getElementById("cursor");

  // Apply cursor effects
  setCursorEffects();

  // Trigger loading animation (e.g., 4 seconds)
  setTimeout(() => {
    isLoading.value = false;
  }, 4000);

  // Custom height for /studio route
  if (route.path === "/studio") {
    document.getElementById("app").style.height = "210vh";
  }

  // Enable page reload on resize
  reloadOnResize();
});
</script>

<style scoped>
#cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(101, 173, 255, 0.5); /* Light blue */
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: background-color 0.2s, transform 0.2s;
}
</style>
