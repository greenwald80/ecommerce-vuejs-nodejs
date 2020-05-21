export default{
    //синхронные изменения данных в состоянии (state)
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
    DECREMENT: (state, index) => {
        if (state.cart[index].quantity > 1)
            state.cart[index].quantity--;
    }
}