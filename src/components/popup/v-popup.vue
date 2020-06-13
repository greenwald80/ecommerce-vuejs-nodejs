<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <span>{{popupTitle}}</span>
        <span>
          <i class="material-icons" @click="closePopup" style="cursor:pointer">close</i>
        </span>
      </div>
      <div class="v-popup__content">
        <slot></slot>
      </div>
      <div class="v-popup__footer">
        <button class="close_modal" @click="closePopup">Close</button>
        <button class="submit_btn" @click="rightButtonAction">{{rightButtonTitle}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup",
  components: {},
  props: {
    rightButtonTitle: {
      //универсальный метод для кнопки, текст формируется v-catalog-item => <v-popup v-if="isInfoPopupVisible" @closePopup="closeInfoPopup" rightButtonTitle="Add to cart">
      type: String,
      default: "Button Text"
    },
    popupTitle: {
      type: String,
      default: "Popup Name"
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
    rightButtonAction(){
        this.$emit('rightButtonAction');
    }
  },
  mounted() {
    //нужно закрыть попап при выходе с модального открывшегося окна
    let vm = this;
    document.addEventListener('click',function(item){
        if(item.target===vm.$refs['popup_wrapper']){
            vm.closePopup();
        }
    })
  }
};
</script>

<style lang="scss">
.popup_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(64, 64, 64, 0.5);
}
.v-popup {
  padding: 16px;
  position: fixed;
  top: 50px;
  box-shadow: 0 0 17px 0;
  width: 400px;
  background: #ffffff;
  z-index: 10;
  left: 30%;
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .submit_btn {
    padding: 8px;
    color: white;
    background: green;
    cursor: pointer;
  }
  .close_modal {
    padding: 8px;
    color: white;
    background: red;
    cursor: pointer;
  }
}
</style>