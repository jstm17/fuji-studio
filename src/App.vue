  
<template>
  <div id="app">
    <!-- <Loading /> -->
    <Header />

    <main class="flex-1">
      <router-view v-slot="{ Component, route }" v-if="!isLoading">
        <!-- Use a custom transition or fallback to `fade` -->
        <Cursor />
        <transition :name="route.meta.transition" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import Loading from "./components/Loading.vue";
import Header from "./components/Header.vue";
import Cursor from "./components/Cursor.vue";

// Reactive properties
const isLoading = ref(false);
// const isLoading = ref(true);
const windowWidth = ref(window.innerWidth);
const route = useRoute();

// const setCursorEffects = () => {
//   // Track mouse movement
//   document.addEventListener("mousemove", (e) => {
//     cursor.value.style.left = `${e.pageX}px`;
//     cursor.value.style.top = `${e.pageY}px`;
//   });

//   // Add click effects
//   document.addEventListener("mousedown", () => {
//     gsap.to(cursor.value, { scale: 0.7, backgroundColor: "#0056b3", duration: 0.2 });
//   });
//   document.addEventListener("mouseup", () => {
//     gsap.to(cursor.value, { scale: 1, backgroundColor: "#65ADFF80", duration: 0.2 });
//   });
// };

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
  // // Trigger loading animation (e.g., 4 seconds)
  // setTimeout(() => {
  //   isLoading.value = false;
  // }, 3000);

  // // Enable page reload on resize
  // reloadOnResize();
});
</script>