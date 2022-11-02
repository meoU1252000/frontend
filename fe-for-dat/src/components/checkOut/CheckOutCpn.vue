<template>
  <div class="p-7 mx-auto w-9 flex justify-content-between">
    <div class="user-content w-9 mx-auto">
      <div class="content-header p-2 w-full">
        <div class="pl-4">
          <h3>Thanh Toán</h3>
        </div>
      </div>
      <div class="pt-2 w-full text-center">
        <h2>Thông tin giao hàng</h2>
      </div>
      <div class="mt-5">
        <div class="grid p-fluid px-4">
          <div class="col-12">
            <my-dropdown
              v-model="selectedAddress"
              :options="listAddress"
              optionLabel="receiver_address"
              optionValue="id"
              placeholder="Chọn địa chỉ nhận hàng"
            />
          </div>
        </div>
      </div>
      <div v-if="selectedAddress != null">
        <div class="mt-4">
          <div class="grid p-fluid px-4">
            <div class="col-12 md:col-6">
              <div class="mb-3">
                <h4>Họ tên người nhận hàng</h4>
              </div>

              <my-inputText
                placeholder="Họ và tên"
                v-model="dataSelectedAddress[0].receiver_name"
                disabled
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="mb-3">
                <h4>Số điện thoại liên hệ</h4>
              </div>

              <my-inputText
                placeholder="Số điện thoại"
                v-model="dataSelectedAddress[0].receiver_phone"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="grid p-fluid px-4">
            <div class="col-12">
              <h4>Địa chỉ nhận hàng</h4>
            </div>
            <div class="col-12">
              <my-inputText
                placeholder="Địa chỉ"
                v-model="dataSelectedAddress[0].receiver_address"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="grid p-fluid px-4">
            <div class="col-12">
              <h4>Địa chỉ Email</h4>
            </div>
            <div class="col-12">
              <my-inputText
                placeholder="Địa chỉ Email"
                v-model="account.userEmail"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="grid p-fluid px-4">
            <div class="col-12">
              <h4>Ghi Chú Đơn Hàng</h4>
            </div>
            <div class="col-12">
              <my-Textarea
                v-model="value2"
                :autoResize="true"
                rows="5"
                cols="30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar w-5 ml-3">
      <ItemCpn :cartList="cartList" />
      <CheckOutSideBarCpn :totalPrice="totalPrice" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import ItemCpn from "@/components/checkOut/ItemCpn.vue";
import CheckOutSideBarCpn from "./CheckOutSideBarCpn.vue";
import { getCartList } from "@/function/getCartList";
import { useStore } from "vuex";
export default defineComponent({
  components: { ItemCpn, CheckOutSideBarCpn },

  setup() {
    const store = useStore();
    const selectedAddress = ref();
    const listAddress = computed(() => {
      return store.getters["auth/getUserAddress"] || [];
    });
    const account = computed(() => {
      return store.getters["auth/getUserInfo"] || [];
    });

    const dataSelectedAddress = computed(() => {
      const data = listAddress.value.filter((address) => {
        if (address.id == selectedAddress.value) {
          return address;
        }
      });
      if (data.length > 0) {
        return data;
      }
      return [];
    });

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
    return {
      selectedAddress,
      listProduct,
      cartList,
      dataSelectedAddress,
      listAddress,
      account,
      totalPrice,
    };
  },
});
</script>
<style lang="scss" scoped>
.user-content {
  min-height: 20rem;
  background-color: white;
  .content-header {
    height: 4rem;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 2px solid #cccccc36;
    margin-bottom: 1rem;
  }
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
</style>
