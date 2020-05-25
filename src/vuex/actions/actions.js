export default {
    ADD_TO_CART({ commit }, product) {
        commit('SET_CART', product);
    },
    DELETE_FROM_CART({ commit }, index) {
        commit('REMOVE_FROM_CART', index);
    },
    DECREMENT_CART_ITEM({ commit }, index) {
        commit('DECREMENT', index);
    },
    INCREMENT_CART_ITEM({ commit }, index) {
        commit('INCREMENT', index);
    },
    SET_MOBILE({ commit }) {
        commit('SWITCH_MOBILE');
    },
    SET_DESKTOP({ commit }) {
        commit('SWITCH_DESKTOP');
    }
}