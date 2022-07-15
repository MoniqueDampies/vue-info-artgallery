<template>
  <Navbar />
  <router-view />
  <Foot />
</template>
<script>
import Navbar from "./components/Navbar.vue";
import Foot from "./components/Foot.vue";
export default {
  components: { Navbar, Foot },
  name: "App",
  mounted() {
    this.$store.dispatch("getArt");
  },
};
</script>
<style>
#app {
  font-family: "Crimson Text", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
* {
  margin: 0;
  padding: 0;
}
</style>
