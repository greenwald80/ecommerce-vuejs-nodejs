<template>
  <div class="v-product-page">
    <h1>Product page</h1>
    <img
      v-if="product.image"
      class="v-catalog-item__image"
      v-bind:src=" require('@/assets/images/'+product.image) "
      alt="img"
    />
    <p>Name: {{product.name}}</p>
    <p>Article: {{product.article}}</p>
    <p>Price: {{product.price | toFix | formattedPrice}}</p>
    <button class="v-catalog-item__add_to_cart_btn btn" @click="addToCart">Add to cart</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import toFix from "../../filters/toFix";
import formattedPrice from "../../filters/price-format";

export default {
  name: "v-product-page",
  props: {},
  data() {
    return {
      title: "Product page"
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS"]),
    product() {
      let result = {}; //объявляю конечный результат
      let vm = this; //объявляю контекст
      this.PRODUCTS.map(function(item) {
        if (item.article === vm.$route.query.product) {
          result = item;
        }
      });

      return result;
    }
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART"]),
    addToCart() {
      this.ADD_TO_CART(this.product);
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API();
  },
  filters: {
    formattedPrice,
    toFix
  }
};
</script>

<style>
</style>



