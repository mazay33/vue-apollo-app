<template>
  <div class="apollo">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">ERROR</div>
    <div class="products">
      <div class="product" v-for="product in products" :key="product.id">
        <img
          :src="
            'http://kapot.ru.host1834313.serv54.hostland.pro/api/assets/images/photos/' +
            product.product_photos[0]?.photo_url
          "
          alt=""
        />
        <p>{{ product.name }}</p>
        <p>{{ product.price }}</p>
        <button
          @click="
            addToCart({ user_id: 19, product_id: product.id, quantity: 1 })
          "
        >
          Добавить в корзину
        </button>
      </div>
    </div>
    <div class="cart">
      <div class="cart__item" v-for="cart in cart" :key="cart.id">
        {{ cart.product.name }}
        <img
          :src="
            'http://kapot.ru.host1834313.serv54.hostland.pro/api/assets/images/photos/' +
            cart.product.product_photos[0]?.photo_url
          "
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  setup() {
    const GET_PRODUCTS = gql`
      query GetProducts {
        products {
          id
          name
          article
          price
          available
          category_name
          product_photos {
            id
            product_id
            photo_url
            is_main
          }
        }
      }
    `;

    const GET_CART = gql`
      query GetCart {
        user(id: 19) {
          id
          login
          password
          cart {
            id
            user_id
            product {
              id
              name
              product_photos {
                photo_url
              }
              article
            }
            quantity
          }
          role {
            id
            role_name
          }
          reg_date
        }
      }
    `;

    //тут нужно как то написать запрос мутации
    const ADD_TO_CART = gql` 
      mutation AddToCart {
        cart
      }
    `;

    const { result: GetProducts, loading, error } = useQuery(GET_PRODUCTS); //запрос на продукты
    const products = computed(() => GetProducts.value?.products ?? []); // здесть просто вытаскиваем данные
    
    const { result: GetCart } = useQuery(GET_CART);
    const cart = computed(() => GetCart.value.user.cart ?? []);

    const {mutation: addToCart} = useMutation(ADD_TO_CART) //здесь вызывается мутация
    // вызывается по клику на кнопку в template, там вроде тоже нужно что-то прописать
    

    return { loading, error, products, cart, addToCart };
  },
};
</script>

<style lang="scss">
.products {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: center;
  .product {
    margin: 0 5px 0;
    width: 30%;
  }
}
.cart {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: center;
  &__item {
    margin: 0 5px 0;
    width: 30%;
  }
}
img {
  max-width: 300px;
}
</style>
