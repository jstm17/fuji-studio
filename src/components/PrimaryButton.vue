<template>
    <button class="primaryBtn inline-grid overflow-hidden relative" :class="computedClass" @click="handleClick" :disabled="isDisabled" :type="buttonType">
        <span class="z-10">{{ buttonText }}</span>
    </button>
</template>

<script setup>
import { defineProps, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {gsap} from 'gsap'

// Props
const props = defineProps({
    buttonText: {
        type: String,
        default: 'Click me',
    },
    buttonColor: {
        type: String,
        default: 'bg-transparent', // Couleur par défaut du bouton
    },
    borderColor: {
        type: String,
        default: 'border-[#65ADFF]', // Couleur de bordure par défaut
    },
    borderWidth: {
        type: String,
        default: 'border-2', // Épaisseur de la bordure par défaut
    },
    buttonClass: {
        type: String,
        default: '',
    },
    actionType: {
        type: String,
        default: 'default', // Types d'action : 'navigate', 'default', etc.
    },
    actionUrl: {
        type: String,
        default: '', // URL pour la navigation
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    onClick: {
        type: Function,
        default: () => { },
    },
    buttonType: {
        type: String,
        default: 'submit'
    }
});

// Setup
const router = useRouter();

// Méthode de clic
const handleClick = () => {
    if (props.actionType === 'navigate' && props.actionUrl) {
        router.push(props.actionUrl); // Navigation vers l'URL spécifiée
    } else {
        props.onClick(); // Appelle la fonction passée via props
    }
};

onMounted(() => {

    let span = document.querySelector(".primaryBtn span");
      let tl = gsap.timeline({ paused: true });
    
      tl.to(span, { duration: 0.2, yPercent: -150, ease: "power2.in" });
      tl.set(span, { yPercent: 150 });
      tl.to(span, { duration: 0.2, yPercent: 0 });
    
      document.querySelector('.primaryBtn').addEventListener("mouseenter", () => 
      tl.play(0),
      gsap.to('.primaryBtn', {
        background: ''
      })
      );
})


// Computed class pour les styles dynamiques
const computedClass = computed(() => {
    return `
        ${props.buttonColor} 
        ${props.borderColor} 
        ${props.borderWidth}
        ${props.buttonClass} 
        text-[#65ADFF] py-4 px-10 rounded-full h-fit
        ${props.isDisabled ? 'bg-transparent cursor-not-allowed' : ''}
    `;
});
</script>

<style scoped>
.primaryBtn::after {
  content: "";
  position: absolute;
  top: 100%; /* Start below the button */
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #195190; /* Background color on hover */
  transition: top 0.4s ease-in-out,  border 0.4s ease-in-out; /* Animate the bottom property */
  z-index: 0; /* Ensure it appears behind text */
}

.primaryBtn:hover::after {
  top: 0; /* Move the background up to fill */
}

.primaryBtn:hover span {
    color: white;
}

.primaryBtn:hover {
    border: #195190 2px solid;
}

span {
    transition: color 0.4s ease-in-out
}
</style>