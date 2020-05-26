<template>
  <div class="v-cart">
    <router-link :to="{name:'catalog'}">
      <div class="v-catalog__link_to_cart">Back to Catalog</div>
    </router-link>
    <h1>Cart</h1>
    <p v-if="!cart_data.length">There are no products in cart</p>
    <v-cart-item
      v-for="(item,index) in cart_data"
      v-bind:key="item.article"
      v-bind:cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      @decrement="decrement(index)"
      @increment="increment(index)"
    />
    <div class="v-cart__total">
      <p class="total__name">Total:</p>
      <p>{{cartTotalCost | toFix | formattedPrice}}</p>
    </div>
  </div>
</template>

<script>
import vCartItem from "./v-cart-item";
import { mapActions } from "vuex";
import toFix from "../../filters/toFix";
import formattedPrice from "../../filters/price-format";

export default {
  name: "v-cart",
  components: {
    vCartItem
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  filters: {
    toFix,
    formattedPrice
  },
  data() {
    return {};
  },
  computed: {
    cartTotalCost() {
      let result = [];
      if (this.cart_data.length) {
        for (let item of this.cart_data) {
          result.push(item.price * item.quantity); //получаю каждый элемент корзины, вычисляю стоимость каждого продукта в соответствии с количеством, кладу в массив result
        }
        result = result.reduce(function(sum, el) {
          return sum + el; //суммирую все элементы массива, чтобы получить общую сумму
        });
        return result;
      } else {
        return 0;
      }

      //то же самое, только в короткой форме
      //return this.cart_data.reduce((res, item) => res + item.price * item.quantity, 0)
    }
  },
  methods: {
    ...mapActions([
      "DELETE_FROM_CART",
      "DECREMENT_CART_ITEM",
      "INCREMENT_CART_ITEM"
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index);
    },
    increment(index) {
      this.INCREMENT_CART_ITEM(index);
    }
  }
};
</script>

<style lang="scss">
.v-cart {
  margin-bottom: 100px;
  &__total {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: $padding * 2;
    display: flex;
    justify-content: center;
    background: $green-bg;
    color: $white-clr;
    font-size: 20px;
  }
  .total__name {
    margin-right: $margin * 2;
  }
}
</style>