<template>
  <div class="v-catalog-item">
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
        <p class="v-catalog-item__price">Price: {{product_data.price}} ILS</p>
        <p class="v-catalog-item__name">Category: {{product_data.category}}</p>
      </div>
    </v-popup>

    <img
      class="v-catalog-item__image"
      v-bind:src=" require('@/assets/images/'+product_data.image) "
      alt="img"
    />
    <p class="v-catalog-item__name">{{product_data.name}}</p>
    <p class="v-catalog-item__price">Price: {{product_data.price}} ILS</p>
    <button class="v-catalog-item__show-info" @click="showPopupInfo">Show info</button>
    <button class="v-catalog-item__add_to_cart_btn btn" @click="addToCart">Add to cart</button>
  </div>
</template>

<script>
import vPopup from "../popup/v-popup";

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
  data() {
    return {
      isInfoPopupVisible: false
    };
  },
  computed: {},
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product_data);
      //console.log("Added to cart");
    },
    showPopupInfo() {
      console.log("Info");
      this.isInfoPopupVisible = true;
    },
    closeInfoPopup() {
      this.isInfoPopupVisible = false;
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
  &__add_to_cart_btn {
    cursor: pointer;
  }
}
</style>