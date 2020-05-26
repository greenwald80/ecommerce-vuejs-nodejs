<template>
  <div class="v-main-wrapper">
    <v-header />
    <keep-alive>
      <!-- keep-alive: чтобы сохранить состояние компонентов при изменении урл  -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vHeader from "./layouts/v-header";

export default {
  name: "v-main-wrapper",
  components: {
    vHeader
  },
  props: {},
  data() {
    return {
    };
  },
  computed: {},
  methods: {},
  watch: {}
};
</script>

<style>
.v-main-wrapper {
  margin: 0 auto;
}
</style>


