import Vue from 'vue';
import Router from 'vue-router';

//компоненты, которым добавляем урлы
import vCatalog from '../components/v-catalog';
import vCart from '../components/v-cart';

Vue.use(Router);

let router = new Router({
    routes:[
        {
            path:'/',
            name:'catalog',
            component:vCatalog
        },
        {
            path:'/cart',
            name:'cart',
            component:vCart,
            props:true//чтобы передавать данные при переходе на другой url
        }
    ]
})

export default router;