import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters/getters';
import mutations from './mutations/mutations';
import commonActions from './actions/actions';//чтобы отделить обычные экшены от апи
import apiRequests from './actions/api-request';//целенаправленно отделил экшенс апи 

let actions = {...commonActions,...apiRequests};//соединяю вместе, чтобы обращаться в коде как к однуму экшенс

Vue.use(Vuex);
//json-server --watch db.json => запустить эту команду в терминале, 
//чтобы все данные из db.json стали доступны по API: http://localhost:3000/products 

let store = new Vuex.Store({//1) создаю хранилище
    state: {//состояние данных, хранятся переменные, массивы, объекты
        products: [],//1) записал новый пустой массив в state
        cart: [],
        isMobile:false,
        isDesktop:true
    },
    mutations,
    actions,
    getters
});

export default store;