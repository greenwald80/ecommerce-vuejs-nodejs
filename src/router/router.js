import Vue from 'vue';
import Router from 'vue-router';

//компоненты, которым добавляем урлы
import vCatalog from '../components/catalog/v-catalog';
import vCart from '../components/cart/v-cart';
import vMainPage from '../components/main-page/v-main-page';
import vProductPage from '../components/catalog/v-product-page';

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'mainPage',
            component: vMainPage
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: vCatalog
        },
        {
            path: '/cart',
            name: 'cart',
            component: vCart,
            props: true//чтобы передавать данные при переходе на другой url
        },
        {
            path:'/product',
            name:'product',
            component:vProductPage
        }
    ]
})

export default router;