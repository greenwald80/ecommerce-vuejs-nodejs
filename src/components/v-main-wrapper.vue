<template>
  <div class="v-main-wrapper">
    <p>{{title}}</p>
    <keep-alive>
      <!-- keep-alive: чтобы сохранить состояние компонентов при изменении урл  -->
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>

export default {
  name: "v-main-wrapper",
  props: {},
  data() {
    return {
      title: "Main wrapper"
    };
  },
  computed: {},
  methods: {},
  watch: {}
};
</script>

<style>
.v-main-wrapper {
  max-width: 900px;
  margin: 0 auto;
}
</style>


