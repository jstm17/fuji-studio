<template>
  <div>
    <div
      :style="{ backgroundImage: `url(./src/assets/img/${path}.png)` }"
      class="w-full h-[100vh] bg-cover bg-center"
    ></div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum
      atque consectetur eveniet odit pariatur quam omnis. Cumque alias quae
      provident eveniet, molestiae ullam, architecto velit quidem aperiam beatae
      magnam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed sunt
      adipisci aperiam ad magni quaerat. Autem cupiditate optio nihil odit ex
      voluptatibus voluptatum omnis earum ab, ipsa dolores, saepe aperiam.m
      ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum atque
      consectetur eveniet odit pariatur quam omnis. Cumque alias quae provident
      eveniet, molestiae ullam, architecto velit quidem aperiam beatae magnam.
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed sunt
      adipisci aperiam ad magni quaerat. Autem cupiditate optio nihim ipsum
      dolor sit amet consectetur adipisicing elit. Aperiam nostrum atque
      consectetur eveniet odit pariatur quam omnis. Cumque alias quae provident
      eveniet, molestiae ullam, architecto velit quidem aperiam beatae magnam.
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed sunt
      adipisci aperiam ad magni quaerat. Autem cupiditate optio nihim ipsum
      dolor sit amet consectetur adipisicing elit. Aperiam nostrum atque
      consectetur eveniet odit pariatur quam omnis. Cumque alias quae provident
      eveniet, molestiae ullam, architecto velit quidem aperiam beatae magnam.
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed sunt
      adipisci aperiam ad magni quaerat. Autem cupiditate optio nihim ipsum
      dolor sit amet consectetur adipisicing elit. Aperiam nostrum atque
      consectetur eveniet odit pariatur quam omnis. Cumque alias quae provident
      eveniet, molestiae ullam, architecto velit quidem aperiam beatae magnam.
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed sunt
      adipisci aperiam ad magni quaerat. Autem cupiditate optio nihim ipsum
      dolor sit amet consectetur adipisicing elit. Aperiam nostrum atque
      consectetur eveniet odit pariatur quam omnis. Cumque alias quae provident
      eveniet, molestiae ullam, architecto velit quidem aperiam beatae magnam.
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed sunt
      adipisci aperiam ad magni quaerat. Autem cupiditate optio nihi
    </div>
  </div>
</template>

<script>
export default {
  name: "CareForU",
  beforeRouteEnter(to, from, next) {
    document.querySelector("header").classList.add("fixed");
    next();
  },
  beforeRouteLeave(to, from, next) {
    next((vm) => {
      document.querySelector("header").classList.remove("fixed");
    });
    document.querySelector("header").classList.remove("fixed");
  },
  data() {
    return {
      path: "",
    };
  },
  mounted() {
    this.path = window.location.pathname.split("/")[1]; // Récupère la partie après le premier '/'
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100vh;
  transition: width 0.5s ease;
}
</style>
