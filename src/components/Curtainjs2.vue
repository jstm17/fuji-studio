<template>
<div >


        <p class="absolute">coucou</p>
      <section class="h-[100vh]">

        <Curtainjs/>
      </section>
</div>
</template>

<script setup>
import gsap from "gsap";
import { onMounted, ref } from "vue";
import LocomotiveScroll from "locomotive-scroll";
import Curtainjs from "../components/Curtainjs.vue";


import { Curtains, Plane, Vec2, Vec3 } from "curtainsjs";
import { fragmentShader, vertexShader } from "../shaders/services-shader.js";

onMounted(() => {
});
</script>
<style scoped>
@media screen {

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
}
</style>