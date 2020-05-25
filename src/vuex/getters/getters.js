export default {
    PRODUCTS(state) {//5) короткий способ для получения информации о данных в state
        return state.products;
    },
    CART(state) {
        return state.cart;
    },
    IS_MOBILE(state) {
        return state.isMobile;
    },
    IS_DESKTOP(state) {
        return state.isDesktop;
    }
}