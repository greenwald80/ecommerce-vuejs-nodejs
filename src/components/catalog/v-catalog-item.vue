<template>
  <div class="v-catalog-item" @click="productClick">
    <v-popup
      v-if="isInfoPopupVisible"
      @closePopup="closeInfoPopup"
      rightButtonTitle="Add to cart"
      :popupTitle="product_data.name"
      @rightButtonAction="addToCart"
    >
      <img
        class="v-catalog-item__image"
        v-bind:src=" require('@/assets/images/'+product_data.image) "
        alt="img" 
      />
      <div>
        <p class="v-catalog-item__name">Name: {{product_data.name}}</p>
        <p class="v-catalog-item__price">Price: {{product_data.price| toFix | formattedPrice}}</p>
        <p class="v-catalog-item__name">Category: {{product_data.category}}</p>
      </div>
    </v-popup>

    <img
      class="v-catalog-item__image"
      v-bind:src=" require('@/assets/images/'+product_data.image) "
      alt="img"
    />
    <p class="v-catalog-item__name">{{product_data.name}}</p>
    <p class="v-catalog-item__price">Price: {{product_data.price | toFix | formattedPrice}}</p>
    <button class="v-catalog-item__show-info" @click="showPopupInfo">Show info</button>
    <br>
    <br>
    <button class="v-catalog-item__add_to_cart_btn btn" @click="addToCart">Add to cart</button>
  </div>
</template>

<script>
import vPopup from "../popup/v-popup";
import toFix from "../../filters/toFix";
import formattedPrice from "../../filters/price-format"

export default {
  name: "v-catalog-item",
  components: {
    vPopup
  },
  props: {
    product_data: {
      type: Object,
      default() {
        //  return blank object
        return {};
      }
    }
  },
  filters: {
    toFix,
    formattedPrice
  },
  data() {
    return {
      isInfoPopupVisible: false
    };
  },
  computed: {},
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product_data);
    },
    showPopupInfo() {
      this.isInfoPopupVisible = true;
    },
    closeInfoPopup() {
      this.isInfoPopupVisible = false;
    },
    productClick(){
      this.$emit('productClick',this.product_data.article);
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
  &__show-info{
    cursor: pointer;
  }
}
</style>