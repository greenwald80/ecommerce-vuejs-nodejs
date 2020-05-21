<template>
  <div class="v-catalog-item">
    <img
      class="v-catalog-item__image"
      v-bind:src=" require('@/assets/images/'+product_data.image) "
      alt="img"
    />
    <p class="v-catalog-item__name">{{product_data.name}}</p>
    <p class="v-catalog-item__price">Price: {{product_data.price}} ILS</p>
    <button class="v-catalog-item__add_to_cart_btn btn" @click="addToCart">Add to cart</button>
  </div>
</template>

<script>
export default {
  name: "v-catalog-item",
  props: {
    product_data: {
      type: Object,
      default() {
        //  return blank object
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product_data);
      //console.log("Added to cart");
    }
  }  
};
</script>

<style lang="scss">
.v-catalog-item {
  flex-basis: 25%;
  box-shadow: 0 0 8px 0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;
  &__image {
    width: 100px;
  }
  &__add_to_cart_btn{
    cursor: pointer;
  }
}
</style>