<template>
  <div class="p-7 mx-auto w-11 flex justify-content-between">
    <div class="cart-content w-9 mx-auto">
      <div class="cart-header">
        <div class="col-5">
          <h3>Giỏ Hàng</h3>
        </div>
        <div class="col-2 text-right">
          <h5>Đơn Giá</h5>
        </div>
        <div class="col-3 text-center">
          <h5>Số Lượng</h5>
        </div>
        <div class="col-2 text-right pr-4">
          <h5>Thành Tiền</h5>
        </div>
      </div>
      <div v-if="cartList.length > 0">
        <div class="flex h-8rem mb-4" v-for="(item, i) in cartList" :key="i">
          <div class="col-5 cart-image flex pl-4">
            <img :src="item.img" alt="" class="w-7rem h-7rem" />
            <div class="pl-2 flex flex-column">
              <router-link
                :to="{
                  name: 'showProductView',
                  params: { id: item.productId, kind: item.kind },
                }"
                class="ml-2"
                >{{ item.name }}</router-link
              >
              <div class="pl-2">
                <span class="quantity">Còn: {{ item.productStock }} sản phẩm</span>
              </div>
              <div class="pl-2">
                <span>Mã Sản Phẩm: SP-{{ item.productId }}</span>
              </div>             
            </div>
          </div>
          <div class="col-2 text-right">
            <span>{{ formatter(item.price) }}</span>
          </div>

          <div class="col-3">
            <div class="col-12">
              <my-inputNumber
                inputId="horizontal"
                v-model="item.quantity"
                mode="decimal"
                showButtons
                buttonLayout="horizontal"
                style="width: 90%; margin: 0 auto; display: flex"
                decrementButtonClass="p-button-secondary"
                incrementButtonClass="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                inputClass="w-full text-center"
                min="1"
                :max="item.productStock"
                @click="handleUpdateQuantity(item.productId, item.quantity)"
              />
            </div>
            <div class="col-12 text-center">
              <!-- <a @click="removeProductFromCart(item.productId)">Xóa</a> -->
              <my-button
                label="Xóa"
                class="p-button-link"
                @click="handleRemoveProduct(item.productId)"
              />
            </div>
          </div>
          <div class="col-2 text-right pr-4">
            <span>{{ formatter(item.price * item.quantity) }}</span>
          </div>
        </div>
      </div>
      <div v-else class="p-4 flex flex-column justify-content-center">
        <div class="w-full flex justify-content-center mb-2">
          <img
            src="https://i.imgur.com/Drj57qu.png"
            alt=""
            class="h-10rem w-10rem"
          />
        </div>
        <h4 class="text-center">Không có sản phẩm trong giỏ hàng</h4>
      </div>
    </div>
    <div class="sidebar w-3 ml-3">
      <EventCpn />
      <CartSideBar :totalPrice="totalPrice" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { getCartList } from "@/function/getCartList";
import { formatter } from "@/function/common";
import {
  removeProductFromCart,
  setStateCart,
  updateQuantity,
} from "@/function/handleLocalStorage";
import EventCpn from "./EventCpn.vue";
import CartSideBar from "./CartSideBar.vue";

export default defineComponent({
  components: {
    EventCpn,
    CartSideBar,
  },
  setup() {
    const store = useStore();
    const listProduct = computed(() => {
      return store.getters["product/getListProduct"] || [];
    });

    const cartList = computed(() => {
      const cartItem = store.getters["product/getCart"] || [];

      return getCartList(listProduct.value, cartItem);
    });

    const totalPrice = computed(() => {
      let total = 0;
      cartList.value.forEach((product) => {
        total += product.price * product.quantity;
      });
      return total;
    });

    const handleRemoveProduct = (id) => {
      window.Swal.fire({
        title: "Chắc chắn xóa?",
        text: "Sản phẩm sẽ được xóa ra khỏi giỏ hàng",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa!",
      }).then((result) => {
        if (result.isConfirmed) {
          window.Swal.fire(
            "Xóa thành công!",
            "Đã xóa thành công sản phẩm ra giỏ hàng.",
            "success"
          );
          removeProductFromCart(id);
          setStateCart(store);
        }
      });
    };

    const handleUpdateQuantity = (id, quantity) => {
      const cartItem = {
        productId: id,
        quantity: quantity,
      };
      updateQuantity(cartItem);
      setStateCart(store);
    };

    return {
      cartList,
      formatter,
      listProduct,
      handleRemoveProduct,
      totalPrice,
      handleUpdateQuantity,
    };
  },
});
</script>

<style lang="scss" scoped>
.cart-content {
  min-height: 20rem;
  background-color: white;
  .cart-header {
    height: 4rem;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 2px solid #cccccc36;
    margin-bottom: 1rem;
  }
  .flex {
    .col-5 {
      img {
        border: 1px solid #eeee;
      }
      a {
        text-decoration: none;
        font-size: 0.9rem;
        color: black;
        cursor: pointer;
        &:hover {
          color: rgb(207, 15, 15, 1);
        }
      }
      span {
        font-size: 0.9rem;
        color: rgb(130, 134, 158);
      }
      .quantity{
        color: #e6983a;
      }
    }
    .col-2 {
      span {
        font-size: 1rem;
        color: rgb(207, 15, 15, 1);
        font-weight: bold;
      }
    }
    .col-3 {
      .col-12 {
        .p-button-link {
          color: rgb(207, 15, 15, 1);
        }
        .p-inputnumber {
          .p-button {
            padding: 0 !important;
          }
        }
      }
    }
  }
}
</style>
