<template>
  <div class="v-catalog">
    <v-notification :messages="messages" :timeout="3000"/>
    <router-link :to="{name:'cart',params:{cart_data:CART}}">
      <div class="v-catalog__link_to_cart">Cart: {{CART.length}}</div>
    </router-link>
    <h1>Catalog</h1>
    <div class="filters">
      <!-- <v-select
        v-bind:selected="selected"
        v-bind:options="categories"
        @select="sortByCategories"
        v-bind:isExpanded="IS_DESKTOP"
      />-->
      <v-select
        v-bind:selected="selected"
        v-bind:options="categories"
        @select="sortByCategories"
        v-bind:isExpanded="false"
      />
      <div class="range-slider">
        <input
          type="range"
          min="1000"
          max="7000"
          step="100"
          v-model.number="minPrice"
          @change="setRangeSlider"
        />
        <input
          type="range"
          min="1000"
          max="7000"
          step="100"
          v-model.number="maxPrice"
          @change="setRangeSlider"
        />
      </div>
      <div class="range-values">
        <p>Min: {{minPrice}}</p>
        <p>Max: {{maxPrice}}</p>
      </div>
    </div>
    <div class="v-catalog__list">
      <!-- <v-catalog-item
        v-for="product in filteredProducts"
        :key="product.article"
        v-bind:product_data="product"
        @addToCart="addToCart"
        @productClick="productClick"
      />-->
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
import vNotification from "../notifications/v-notification";

export default {
  name: "v-catalog",
  props: {},
  components: {
    vCatalogItem,
    vSelect,
    vNotification
  },
  data() {
    return {
      categories: [
        { name: "All", value: "all" },
        { name: "Male", value: "m" },
        { name: "Female", value: "f" }
      ],
      selected: "All",
      sortedProducts: [],
      minPrice: 1000,
      maxPrice: 7000,
      title: "Catalog",
      messages: []
    };
  },
  computed: {
    ...mapGetters([
      "PRODUCTS",
      "CART",
      "IS_MOBILE",
      "IS_DESKTOP",
      "SEARCH_VALUE"
    ]),
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
      this.ADD_TO_CART(data).then(() => {
        let timeStamp = Date.now().toLocaleString();
        this.messages.unshift({ name: "Product added to cart", id: timeStamp, icon:'check_circle' }); //unshift то же самое, что push, только порядок добавления в массив наоборот
      });
    },
    sortByCategories(category) {
      // this.sortedProducts = []; //чистит изначально отсортированный список
      // this.PRODUCTS.map(item => {
      //   //более короткий и более правильный способ
      //   if (item.category === category.name) {
      //     this.sortedProducts.push(item);
      //   }
      // });
      // this.selected = category.name; //в селекте остается выбранная категория
      let vm = this;
      this.sortedProducts = [...this.PRODUCTS];
      this.sortedProducts = this.sortedProducts.filter(function(item) {
        return item.price >= vm.minPrice && item.price <= vm.maxPrice;
      });
      if (category) {
        this.sortedProducts = this.sortedProducts.filter(function(e) {
          vm.selected = category.name; //vm.selected = получаю то, что выбрано в селекте
          return e.category === category.name;
        });
      }
    },
    setRangeSlider() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp;
      }
      this.sortByCategories();
    },
    sortProductsBySearchValue(value) {
      this.sortedProducts = [...this.PRODUCTS];
      if (value) {
        this.sortedProducts = this.sortedProducts.filter(function(item) {
          return item.name.toLowerCase().includes(value.toLowerCase());
        });
      } else {
        this.sortedProducts = this.PRODUCTS;
      }
    },
    productClick(article) {
      this.$router.push({ name: "product", query: { product: article } });
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
        this.sortByCategories();
        this.sortProductsBySearchValue(this.SEARCH_VALUE);
      }
    });
  },
  watch: {
    SEARCH_VALUE() {
      //следит за SEARCH_VALUE и если меняется значение, то вызывает функцию sortProductsBySearchValue
      this.sortProductsBySearchValue(this.SEARCH_VALUE);
    }
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
    top: 120px;
    right: 10px;
    padding: $padding * 2;
    border: solid 1px grey;
  }
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.range-slider {
  width: 200px;
  margin: auto 16px;
  text-align: center;
  position: relative;
}
.range-slider svg,
.range-slider input[type="range"] {
  position: absolute;
  left: 0;
  bottom: 0;
}
input[type="range"]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  top: 2px;
  margin-top: -7px;
}
</style>