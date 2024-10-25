  
<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <div id="app">
    <Header />

    <main class="flex-1">
      <router-view v-slot="{ Component, route }">
        <!-- Use a custom transition or fallback to `fade` -->
        <transition :name="route.meta.transition" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>
