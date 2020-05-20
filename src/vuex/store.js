import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
//json-server --watch db.json => запустить эту команду в терминале, 
//чтобы все данные из db.json стали доступны по API: http://localhost:3000/products 

let store = new Vuex.Store({//1) создаю хранилище
    state: {//состояние данных, хранятся переменные, массивы, объекты
        products: [],//1) записал новый пустой массив в state
        cart: []
    },
    mutations: {//синхронные изменения данных в состоянии (state)
        SET_PRODUCTS_TO_STATE: (state, products) => {//4) мутация ответственна за то, чтобы продукты из actions появились в state
            state.products = products;//обращаюсь к пустому массиву state.products и заполняю его с помощью products
        },
        SET_CART: (state, product) => {
            if (state.cart.length) {
                let isProductExists = false;
                state.cart.map(function (item) {
                    if (item.article === product.article) {
                        isProductExists = true;
                        item.quantity++;
                    }
                })
                if (!isProductExists) {
                    state.cart.push(product);
                }
            } else {
                state.cart.push(product);
            }

        },
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1);
        },
        INCREMENT: (state, index) => {
            state.cart[index].quantity++;
        },
        DECREMENT:(state,index)=>{
            if(state.cart[index].quantity>1)
            state.cart[index].quantity--;
        }

    },
    actions: {//асинхронные методы, действия, могут выполнять условновно одновременно (загрузка, изменение, добавление, удаление)
        GET_PRODUCTS_FROM_API({ commit }) {//2) получаю все продукты из API
            //json-server --watch db.json => запустить эту команду в терминале
            return axios('http://localhost:3000/products', {
                method: 'GET'
            })//так как axios это промис, то после него обязательно then
                .then((products) => {//3) кладу полученные продукты в products                    
                    commit('SET_PRODUCTS_TO_STATE', products.data);
                    return products;
                })
                .catch((error) => {
                    //если по какой-то причине не получили данные из http://localhost:3000/products
                    console.log(error);
                    return error;
                })
        },
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
    },
    getters: {//5) короткий способ для получения информации о данных в state
        PRODUCTS(state) {
            return state.products;
        },
        CART(state) {
            return state.cart;
        }
    }
});

export default store;