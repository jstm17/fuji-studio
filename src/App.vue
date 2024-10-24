<template>
  <div id="app">
    <header class="header">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/works">Works</router-link>
    </header>
    <main>

<router-view v-slot="{ Component, route }">
  <!-- Use a custom transition or fallback to `fade` -->
  <transition :name="route.meta.transition" mode="out-in">
    <component :is="Component" :key="$route.path"/>
  </transition>
</router-view>
    </main>
  </div>
</template>

<style>
header {
  position: fixed;
  z-index: 100;
}
</style>
