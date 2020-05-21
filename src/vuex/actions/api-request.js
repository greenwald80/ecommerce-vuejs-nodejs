import axios from 'axios';

export default{
      //асинхронные методы, действия, могут выполнять условновно одновременно (загрузка, изменение, добавление, удаление)
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
    }
}