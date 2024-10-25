<template>
    <button :class="computedClass" @click="handleClick" :disabled="isDisabled">
        {{ buttonText }}
    </button>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';

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
        default: 'border-blue-600', // Couleur de bordure par défaut
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

// Computed class pour les styles dynamiques
const computedClass = computed(() => {
    return `
        ${props.buttonColor} 
        ${props.borderColor} 
        ${props.borderWidth}
        ${props.buttonClass} 
        text-blue-600 py-4 px-10 rounded-full h-fit
        ${props.isDisabled ? 'bg-transparent cursor-not-allowed' : 'hover:bg-opacity-80'}
    `;
});
</script>