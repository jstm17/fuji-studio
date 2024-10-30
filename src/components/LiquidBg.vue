<script setup>
import { onMounted, ref } from 'vue'
import WebGLFluid from 'webgl-fluid'

const canvas = ref()

onMounted(() => {
    WebGLFluid(canvas.value, {
        IMMEDIATE: false,
        TRIGGER: 'hover',
        COLORFUL: true,
        COLOR_UPDATE_SPEED: 500,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: true,
        SUNRAYS: false,
    })
})
</script>

<template>
    <canvas class="absolute z-20 opacity-20" ref="canvas" />
</template>

<style>
canvas {
    width: 100vw;
    height: 100vh;
}
</style>