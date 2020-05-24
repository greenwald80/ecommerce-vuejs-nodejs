<template>
  <div id="app">
    <p>Welcome to our online-shop!</p>
    <v-main-wrapper />
  </div>
</template>

<script>
import vMainWrapper from "./components/v-main-wrapper";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    vMainWrapper
  },
  computed: {
    ...mapGetters(["IS_MOBILE", "IS_DESKTOP"])
  },
  methods: {
    ...mapActions(["SET_MOBILE", "SET_DESKTOP"])
  },
  mounted() {
    let vm = this;
    window.addEventListener("resize", function() {
      if (window.innerWidth > 767) {
        //this.$store.dispatch("SET_DESKTOP"); //без использования mapActions
        vm.SET_DESKTOP(); //с использованием mapActions
        console.log("Desktop", vm.SET_DESKTOP);
      } else {
        //this.$store.dispatch("SET_MOBILE");
        vm.SET_MOBILE();
        console.log("Mobile", vm.SET_MOBILE);
      }
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
