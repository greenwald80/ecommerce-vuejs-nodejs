<template>
  <div class="v-main-page">
    <h1>Online Shop</h1>
    <router-link :to="{name:'catalog'}">to Catalog</router-link>
  </div>
</template>

<script>
export default {
  name: "v-main-page",
  props: {},
  data() {
    return {
      title: "Main Page"
    };
  },
  computed: {},
  methods: {},
  watch: {}
};
</script>

<style>
.v-main-page {
}
</style>



