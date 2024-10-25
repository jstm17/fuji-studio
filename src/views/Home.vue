<template>
    <div class="bounded flex-1 flex flex-col text-center pb-20">
        <div class="flex-1  flex flex-col justify-center" >
            <h1 class=" text-center pb-8">Quand le code <br>rejoint la créativité</h1>
            <p class="text-center text-md">Nous créons des expériences numériques qui parlent plus fort que les mots</p>
        </div>
        <div class="flex h-fit justify-between max-sm:flex-wrap max-sm:gap-8 items-center">
            <div class=" cursor-pointer bg-[url('https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=3001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] w-72 max-sm:w-full bg-cover rounded-full min-h-24">
            </div>
            <PrimaryButton 
            class=" max-sm:w-full"
                buttonText="Commencer l’aventure" 
                :onClick="handleCancel"
            />
        </div>
    </div>
</template>

<script setup>
import PrimaryButton from '../components/PrimaryButton.vue';

</script>
