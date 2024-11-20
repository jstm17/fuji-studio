<template>
<div >


        <p class="absolute">coucou</p>
        <div id="canvas" ref="photo1"></div>
        <div class="plane-wrapper">
                <div class="plane-inner h-full w-full">
                  <div class="plane">
                    <img
                      src="../assets/img/portfolio/reah.png"
                      crossorigin=""
                      data-sampler="planeTexture"
                    />
                  </div>
                </div>
              </div>
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
const planes = [];
  let scrollEffect = 0;

  // get our planes elements
  const planeElements = document.getElementsByClassName("plane");

  // handle smooth scroll and update planes positions
  const useNativeScroll = scroll.isMobile;

  // set up our WebGL context and append the canvas to our wrapper
  const curtains = new Curtains({
    alpha: true,
    container: "canvas",
    watchScroll: useNativeScroll, // watch scroll on mobile not on desktop since we're using locomotive scroll
    pixelRatio: Math.min(1.5, window.devicePixelRatio), // limit pixel ratio for performance
  });

  curtains
    .onRender(() => {
      if (useNativeScroll) {
        // update our planes deformation
        // increase/decrease the effect
        // scrollEffect = curtains.lerp(scrollEffect, 0, 0.05);
      }
    })
    .onScroll(() => {
      // get scroll deltas to apply the effect on scroll
      const delta = curtains.getScrollDeltas();

      // invert value for the effect
      delta.y = -delta.y;

      // threshold
      if (delta.y > 60) {
        delta.y = 60;
      } else if (delta.y < -60) {
        delta.y = -60;
      }

      if (useNativeScroll && Math.abs(delta.y) > Math.abs(scrollEffect)) {
        scrollEffect = curtains.lerp(scrollEffect, delta.y, 0.5);
      } else {
        scrollEffect = curtains.lerp(scrollEffect, delta.y * 1.5, 0.5);
      }

      // manually update planes positions
      for (let i = 0; i < planes.length; i++) {
        // apply additional translation, scale and rotation
        applyPlanesParallax(i);
        // update the plane deformation uniform as well
        planes[i].uniforms.scrollEffect.value = scrollEffect;
      }
    })
    .onError(() => {
      // we will add a class to the document body to display original images
      document.body.classList.add("no-curtains", "planes-loaded");
    })
    .onContextLost(() => {
      // on context lost, try to restore the context
      curtains.restoreContext();
    });

  function updateScroll(xOffset, yOffset) {
    // update our scroll manager values
    curtains.updateScrollValues(xOffset, yOffset);
  }

  // custom scroll event
  if (!useNativeScroll) {
    // we'll render only while lerping the scroll
    curtains.disableDrawing();
    // scroll.on("scroll", (obj) => {
    //   updateScroll(obj.scroll.x, obj.scroll.y);

    //   // render scene
    //   curtains.needRender();
    // });
  }

  const params = {
    vertexShader,
    fragmentShader,
    widthSegments: 10,
    heightSegments: 10,
    uniforms: {
      scrollEffect: {
        name: "uScrollEffect",
        type: "1f",
        value: 0,
      },
      opacity: {
        // Uniforme d'opacité
        name: "uOpacity",
        type: "1f",
        value: 0.5, // Valeur par défaut (complètement opaque)
      },
    },
    blendfunc: {
      src: curtains.gl.SRC_ALPHA,
      dst: curtains.gl.ONE_MINUS_SRC_ALPHA, // This ensures proper alpha blending
    },
  };

  // add our planes and handle them
  for (let i = 0; i < planeElements.length; i++) {
    const plane = new Plane(curtains, planeElements[i], params);

    planes.push(plane);
    handlePlanes(i);
  }

  // handle all the planes
  function handlePlanes(index) {
    const plane = planes[index];

    // check if our plane is defined and use it
    plane
      .onReady(() => {
        // apply parallax on load
        applyPlanesParallax(index);

        // once everything is ready, display everything
        if (index === planes.length - 1) {
          document.body.classList.add("planes-loaded");
        }
      })
      .onAfterResize(() => {
        // apply new parallax values after resize
        applyPlanesParallax(index);
      })
      .onRender(() => {
        // new way: we just have to change the rotation and scale properties directly!
        plane.uniforms.opacity.value = 1;

        // apply the rotation
        plane.rotation.z = Math.abs(scrollEffect) / -300;

        // scale plane and its texture
        plane.scale.y = 1 + Math.abs(scrollEffect) / 750;
        plane.textures[0].scale.y = 1 + Math.abs(scrollEffect) / 50;
      });
  }

  function applyPlanesParallax(index) {
    // calculate the parallax effect
    // get our window size
    const sceneBoundingRect = curtains.getBoundingRect();
    // get our plane center coordinate
    const planeBoundingRect = planes[index].getBoundingRect();
    const planeOffsetTop = planeBoundingRect.top + planeBoundingRect.height / 2;
    // get a float value based on window height (0 means the plane is centered)
    const parallaxEffect =
      (planeOffsetTop - sceneBoundingRect.height / 2) /
      sceneBoundingRect.height;
    // apply the parallax effect
    planes[index].relativeTranslation.y =
      -(parallaxEffect * sceneBoundingRect.height) / 200;
    /*
          // old way using setRelativeTranslation
          planes[index].setRelativeTranslation(new Vec3(0, parallaxEffect * (sceneBoundingRect.height / 4)));
           */
  }
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