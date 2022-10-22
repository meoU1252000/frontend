<template>
  <div class="cart-modal" @mouseleave="handleCartLeave">
    <div v-if="cartList.length > 0">
      <div class="cart-content px-3 pt-3">
        <div
          class="flex h-5rem align-items-center mb-4"
          v-for="(item, i) in cartList"
          :key="i"
        >
          <div class="col-3 cart-image justify-content-center flex">
            <img :src="item.img" alt="" class="w-5rem h-5rem" />
          </div>
          <div class="col-9 cart-name">
            <router-link
              :to="{
                name: 'showProductView',
                params: { id: item.productId, kind: item.kind },
              }"
              >{{ item.name }}</router-link
            >
            <span>Số lượng: {{ item.quantity }}</span>
            <h3>{{ formatter(item.price * item.quantity) }}</h3>
          </div>
        </div>
      </div>
      <div class="cart-action p-3">
        <div class="flex justify-content-between px-2">
          <span>Tổng tiền ({{ cartList.length }}) sản phẩm</span>
          <h3>{{ formatter(totalPrice) }}</h3>
        </div>
        <div class="flex">
          <my-button class="mt-2 w-full flex justify-content-center" @click="goToCartPage">
            Xem Giỏ Hàng
          </my-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="h-15rem flex justify-content-center align-items-center">
        <h4>Giỏ hàng chưa có sản phẩm nào</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { getCartList } from "@/function/getCartList";
import { formatter } from "@/function/common";
import { useRouter } from "vue-router";

//
export default defineComponent({
  props: {
    displayCart: { type: Boolean },
    cartList: {type: Object}
  },
  setup(props, { emit }) {
   
    const route = useRouter();
    const handleCartLeave = () => {
      emit("handle-cart-leave");
    };

    const totalPrice = computed(() => {
      let total = 0;
      props.cartList.forEach((product) => {
        total += product.price * product.quantity;
      });
      return total;
    });

    const goToCartPage = () => {
      route.push(`/gio-hang`);
    };

    return {
      getCartList,
      formatter,
      totalPrice,
      handleCartLeave,
      goToCartPage
    };
  },
});
</script>

<style lang="scss">
.cart-modal {
  width: 25rem;
  max-height: 25rem;
  min-height: 15rem;
  background-color: white;
  color: black;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  position: absolute;
  top: 4.5rem;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .cart-content {
    max-height: 18rem;
    overflow-y: scroll;
    overflow-x: hidden;
    .flex {
      .cart-image {
        img {
          border: 1px solid #eeee;
        }
      }
      .cart-name {
        font-size: 0.8rem;
        line-height: 1.5;
        a {
          text-decoration: none;
          color: black;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          &:hover {
            color: rgb(207, 15, 15, 1) !important;
          }
        }
        span {
          color: rgb(130, 134, 158);
        }
        h3 {
          color: rgb(207, 15, 15, 1) !important;
        }
      }
    }
  }
  .cart-action {
    .flex {
      button {
        background-color: rgb(207, 15, 15, 1) !important;
        border-color: rgb(207, 15, 15, 1) !important;

        &:enabled:hover {
          background-color: rgb(145, 10, 10) !important;
          border-color: rgb(207, 15, 15, 1) !important;
        }
        &:focus {
          box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #fb9db4, 0 1px 2px 0 black;
        }
      }
    }
  }
}
</style>
