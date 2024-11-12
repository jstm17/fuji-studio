<template>
  <div class="">
    <h1>Test Juju 3</h1>
    <!-- div that will hold our WebGL canvas -->
    <div id="page-wrap">
      <div id="canvas"></div>
      <!-- div used to create our plane -->
      <div class="flex-wrapper multi-textures">
        <span>Click me !</span>
        <!-- notice here we are using the data-sampler attribute to name our displacement sampler uniform -->
        <img
          src="../assets/img/careforu.png"
          crossorigin=""
          data-sampler="displacement"
        />
        <img src="../assets/img/careforu.png" crossorigin="" />
        <img src="../assets/img/careforu.png" crossorigin="" />
        <img src="../assets/img/careforu.png" crossorigin="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Curtains, Plane } from "curtainsjs";
import gsap from "gsap";

window.addEventListener("load", () => {
  // set up our WebGL context and append the canvas to our wrapper
  const curtains = new Curtains({
    container: "canvas",
    watchScroll: false, // no need to listen for the scroll in this example
    pixelRatio: Math.min(1.5, window.devicePixelRatio), // limit pixel ratio for performance
  });

  // get our plane element
  const planeElements = document.getElementsByClassName("multi-textures");
  console.log(planeElements[0]);

  // here we will handle which texture is visible and the timer to transition between images
  const slideshowState = {
    activeTextureIndex: 1,
    nextTextureIndex: 2, // does not care for now
    maxTextures: planeElements[0].querySelectorAll("img").length - 1, // -1 because displacement image does not count

    isChanging: false,
    transitionTimer: 0,
  };

  // handling errors
  curtains
    .onError(() => {
      // we will add a class to the document body to display original images
      document.body.classList.add("no-curtains", "image-1");

      // handle simple slides management here
      planeElements[0].addEventListener("click", () => {
        if (slideshowState.activeTextureIndex < slideshowState.maxTextures) {
          slideshowState.nextTextureIndex =
            slideshowState.activeTextureIndex + 1;
        } else {
          slideshowState.nextTextureIndex = 1;
        }

        document.body.classList.remove(
          "image-1",
          "image-2",
          "image-3",
          "image-4"
        );
        document.body.classList.add("image-" + slideshowState.nextTextureIndex);

        slideshowState.activeTextureIndex = slideshowState.nextTextureIndex;
      });
    })
    .onContextLost(() => {
      // on context lost, try to restore the context
      curtains.restoreContext();
    });

  // disable drawing for now
  curtains.disableDrawing();

  const vs = `
        precision mediump float;

        // default mandatory variables
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;

        // varyings : notice we've got 3 texture coords varyings
        // one for the displacement texture
        // one for our visible texture
        // and one for the upcoming texture
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
        varying vec2 vActiveTextureCoord;
        varying vec2 vNextTextureCoord;

        // textures matrices
        uniform mat4 activeTexMatrix;
        uniform mat4 nextTexMatrix;

        // custom uniforms
        uniform float uTransitionTimer;


        void main() {
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

            // varyings
            vTextureCoord = aTextureCoord;
            vActiveTextureCoord = (activeTexMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
            vNextTextureCoord = (nextTexMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;

            vVertexPosition = aVertexPosition;
        }
    `;

  const fs = `
        precision mediump float;

        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
        varying vec2 vActiveTextureCoord;
        varying vec2 vNextTextureCoord;

        // custom uniforms
        uniform float uTransitionTimer;

        // our textures samplers
        // notice how it matches the sampler attributes of the textures we created dynamically
        uniform sampler2D activeTex;
        uniform sampler2D nextTex;
        uniform sampler2D displacement;

        void main() {
            // our displacement texture
            vec4 displacementTexture = texture2D(displacement, vTextureCoord);

            // slides transitions based on displacement and transition timer
            vec2 firstDisplacementCoords = vActiveTextureCoord + displacementTexture.r * ((cos((uTransitionTimer + 90.0) / (90.0 / 3.141592)) + 1.0) / 1.25);
            vec4 firstDistortedColor = texture2D(activeTex, vec2(vActiveTextureCoord.x, firstDisplacementCoords.y));

            // same as above but we substract the effect
            vec2 secondDisplacementCoords = vNextTextureCoord - displacementTexture.r * ((cos(uTransitionTimer / (90.0 / 3.141592)) + 1.0) / 1.25);
            vec4 secondDistortedColor = texture2D(nextTex, vec2(vNextTextureCoord.x, secondDisplacementCoords.y));

            // mix both texture
            vec4 finalColor = mix(firstDistortedColor, secondDistortedColor, 1.0 - ((cos(uTransitionTimer / (90.0 / 3.141592)) + 1.0) / 2.0));

            // handling premultiplied alpha
            finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);

            gl_FragColor = finalColor;
        }
    `;

  // some basic parameters
  const params = {
    vertexShader: vs,
    fragmentShader: fs,
    uniforms: {
      transitionTimer: {
        name: "uTransitionTimer",
        type: "1f",
        value: 0,
      },
    },
  };

  const multiTexturesPlane = new Plane(curtains, planeElements[0], params);

  multiTexturesPlane
    .onLoading((texture) => {
      // improve texture rendering on small screens with LINEAR_MIPMAP_NEAREST minFilter
      texture.setMinFilter(curtains.gl.LINEAR_MIPMAP_NEAREST);
    })
    .onReady(() => {
      // the idea here is to create two additionnal textures
      // the first one will contain our visible image
      // the second one will contain our entering (next) image
      // that way we will deal with only activeTex and nextTex samplers in the fragment shader
      // and we could easily add more images in the slideshow...

      // first we set our very first image as the active texture
      const activeTex = multiTexturesPlane.createTexture({
        sampler: "activeTex",
        fromTexture:
          multiTexturesPlane.textures[slideshowState.activeTextureIndex],
      });
      // next we set the second image as next texture but this is not mandatory
      // as we will reset the next texture on slide change
      const nextTex = multiTexturesPlane.createTexture({
        sampler: "nextTex",
        fromTexture:
          multiTexturesPlane.textures[slideshowState.nextTextureIndex],
      });
      console.log("first");

      planeElements[0].addEventListener("click", () => {
        console.log("first");
        if (!slideshowState.isChanging) {
          // enable drawing for now
          curtains.enableDrawing();

          slideshowState.isChanging = true;

          // check what will be next image
          if (slideshowState.activeTextureIndex < slideshowState.maxTextures) {
            slideshowState.nextTextureIndex =
              slideshowState.activeTextureIndex + 1;
          } else {
            slideshowState.nextTextureIndex = 1;
          }
          // apply it to our next texture
          nextTex.setSource(
            multiTexturesPlane.images[slideshowState.nextTextureIndex]
          );

          setTimeout(() => {
            // disable drawing now that the transition is over
            curtains.disableDrawing();

            slideshowState.isChanging = false;
            slideshowState.activeTextureIndex = slideshowState.nextTextureIndex;
            // our next texture becomes our active texture
            activeTex.setSource(
              multiTexturesPlane.images[slideshowState.activeTextureIndex]
            );
            // reset timer
            slideshowState.transitionTimer = 0;
          }, 1700); // add a bit of margin to the timer
        }
      });
    })
    .onRender(() => {
      // increase or decrease our timer based on the active texture value
      if (slideshowState.isChanging) {
        // use damping to smoothen transition
        slideshowState.transitionTimer +=
          (90 - slideshowState.transitionTimer) * 0.04;

        // force end of animation as damping is slower the closer we get from the end value
        if (
          slideshowState.transitionTimer >= 88.5 &&
          slideshowState.transitionTimer !== 90
        ) {
          slideshowState.transitionTimer = 90;
        }
      }

      // update our transition timer uniform
      multiTexturesPlane.uniforms.transitionTimer.value =
        slideshowState.transitionTimer;
    });
});
</script>
<style scoped>
#page-wrap {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/*** canvas ***/

#canvas {
  height: 100vh;
  width: 100vw;

  z-index: 10;
}

.multi-textures {
  position: absolute;
  top: 5%;
  right: 5%;
  bottom: 5%;
  left: 5%;
  z-index: 15;

  cursor: pointer;
  font-size: 3em;
  color: white;

  justify-content: center;
  align-items: center;
  align-content: center;
}

.multi-textures img {
  /* display: none; */
  width: 100px;
  height: 100px;
  object-fit: cover;
}

/*** handling errors ***/

.no-curtains .multi-textures {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-curtains .multi-textures span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3D(-50%, -50%, 0);
}

.no-curtains.image-1 .multi-textures img:nth-child(3) {
  display: block;
}

.no-curtains.image-2 .multi-textures img:nth-child(4) {
  display: block;
}

.no-curtains.image-3 .multi-textures img:nth-child(5) {
  display: block;
}

.no-curtains.image-4 .multi-textures img:nth-child(6) {
  display: block;
}
</style>