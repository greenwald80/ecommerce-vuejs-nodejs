<template>
  <div class="v-catalog">
    <router-link :to="{name:'cart',params:{cart_data:CART}}">
      <div class="v-catalog__link_to_cart">Cart: {{CART.length}}</div>
    </router-link>
    <h1>Catalog</h1>
    <v-select v-bind:selected="selected" v-bind:options="categories" @select="sortByCategories" />
    <hr />
    <div class="v-catalog__list">
      <v-catalog-item
        v-for="product in filteredProducts"
        :key="product.article"
        v-bind:product_data="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import vCatalogItem from "./v-catalog-item";
import { mapActions, mapGetters } from "vuex";
import vSelect from "../v-select";

export default {
  name: "v-catalog",
  props: {},
  components: {
    vCatalogItem,
    vSelect
  },
  data() {
    return {
      categories: [
        { name: "All", value: "all" },
        { name: "Male", value: "m" },
        { name: "Female", value: "f" }
      ],
      selected: "All",
      sortedProducts: []
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "CART"]),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts;
      } else {
        return this.PRODUCTS;
      }
    }
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART"]),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },
    sortByCategories(category) {
      this.sortedProducts = []; //чистит изначально отсортированный список
      let vm = this;
      this.PRODUCTS.map(function(item) {
        if (item.category === category.name) {
          //сравнивает категорию продуктов из бд с выбранной категорией в селекте
          vm.sortedProducts.push(item);
        }
      });
      this.selected = category.name;//в селекте остается выбранная категория
    }
  },
  mounted() {
    //если не пользоваться mapActions, то то же самое будет выглядеть так:
    // this.$store.dispatch("GET_PRODUCTS_FROM_API").then(response => {
    //   if (response.data) {
    //     console.log("Data arrived: ", response.data);
    //   }

    //то же самое, только с ипользованием mapActions
    //после того, как отрендерился весь html и появились реактивные связки
    this.GET_PRODUCTS_FROM_API().then(response => {
      if (response.data) {
        console.log("Data arrived: ", response.data);
      }
    });
  }
};
</script>

<style lang="scss">
.v-catalog {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  &__link_to_cart {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: $padding * 2;
    border: solid 1px grey;
  }
}
</style>