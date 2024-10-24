<template>
  <div>
    <div class="out">
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
    <img src="../../public/careforu.png" alt="careforu" class="inner" />
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
img {
  width: 50%;
  transition: width 0.5s ease; /* Ajout de la transition sur la largeur */
}
</style>
