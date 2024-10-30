<template>
    <div class="curtain-container absolute " ref="curtainContainer"></div>
  </template>
  
  <script>
 import { Curtains, Plane } from "curtainsjs";

  
  export default {
    name: 'CurtainEffect',
    mounted() {
      this.initCurtain();
    },
    methods: {
      initCurtain() {
        const curtain = new Curtain({
          container: this.$refs.curtainContainer,
          image: '',
          bgColor: 'transparent',
          onScroll: (scroll) => {
            // Vous pouvez ajouter des effets personnalisés ici si nécessaire
          },
          onMouseMove: (event) => {
            const { clientX, clientY } = event;
            // Calculer le positionnement en fonction de la souris
            this.updateBackground(clientX, clientY);
          }
        });
        
        curtain.start();
      },
      updateBackground(x, y) {
        const backgroundStyle = `repeating-radial-gradient(circle at ${x}px ${y}px, transparent 0, #edeef3 15px), repeating-linear-gradient(#f3f4f755, #f3f4f7)`;
        this.$refs.curtainContainer.style.backgroundImage = backgroundStyle;
      }
    }
  };
  </script>
  
  <style scoped>
  .curtain-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background-image: repeating-radial-gradient(circle at 0 0, transparent 0, #edeef3 15px),
                      repeating-linear-gradient(#f3f4f755, #f3f4f7);
    transition: background-image 0.1s;
  }
  </style>
  