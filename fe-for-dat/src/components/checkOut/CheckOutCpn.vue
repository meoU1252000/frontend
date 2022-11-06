<template>
  <form @submit.prevent="handleSubmit(!v$.$invalid)">
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
            <div class="col-12 p-inputtext-sm">
              <my-dropdown
                v-model="state.address_id"
                :options="listAddress"
                optionLabel="receiver_address"
                optionValue="id"
                placeholder="Chọn địa chỉ nhận hàng"
                :class="{
                  'p-invalid': v$.address_id.$invalid && submitted,
                }"
              />
            </div>
          </div>
        </div>
        <div v-if="state.address_id != ''">
          <div class="mt-4">
            <div class="grid p-fluid px-4">
              <div class="col-12 md:col-6 p-inputtext-sm">
                <div class="mb-3">
                  <h4>Họ tên người nhận hàng</h4>
                </div>

                <my-inputText
                  placeholder="Họ và tên"
                  v-model="dataSelectedAddress[0].receiver_name"
                  disabled
                />
              </div>
              <div class="col-12 md:col-6 p-inputtext-sm">
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
              <div class="col-12 p-inputtext-sm">
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
              <div class="col-12 p-inputtext-sm">
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
              <div class="col-12 p-inputtext-sm">
                <h4>Ghi Chú Đơn Hàng</h4>
              </div>
              <div class="col-12">
                <my-Textarea
                  v-model="order_note"
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
    <div class="px-7 pb-7 mx-auto w-9 flex justify-content-start">
      <div class="user-content w-9 mx-auto">
        <div class="content-header p-2 w-full">
          <div class="pl-4">
            <h3>Phương Thức Thanh Toán</h3>
          </div>
        </div>
        <div class="pt-2 w-full px-4">
          <h4>Thông tin thanh toán của bạn sẽ luôn được bảo mật</h4>
        </div>
        <div class="flex w-full justify-content-between h-11rem">
          <div class="w-6 p-3 h-full">
            <div
              class="card h-full"
              @click="activeVNPay"
              :class="{ active: isActive === 0 }"
            >
              <div class="p-2 flex">
                <h4>Thanh toán qua VNPAY</h4>
                <my-Tag class="mr-2 ml-2" value="Khuyên dùng" rounded></my-Tag>
              </div>
              <div class="p-2 w-10">
                <span
                  >Thanh toán qua Internet Banking, Visa, Master, JCB,
                  VNPAY-QR</span
                >
              </div>
              <div class="conner" v-if="isActive === 0"></div>
              <div class="check" v-if="isActive === 0">
                <i class="pi pi-check"></i>
              </div>
            </div>
          </div>
          <div class="w-6 p-3 h-full">
            <div
              class="card h-full"
              :class="{ active: isActive === 1 }"
              @click="activeCod"
            >
              <div class="p-2 flex">
                <h4>Thanh toán khi nhận hàng</h4>
              </div>
              <div class="conner" v-if="isActive === 1"></div>
              <div class="check" v-if="isActive === 1">
                <i class="pi pi-check"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar w-5 ml-3"></div>
    </div>
  </form>
</template>
<script>
import { defineComponent, ref, computed, reactive } from "vue";
import ItemCpn from "@/components/checkOut/ItemCpn.vue";
import CheckOutSideBarCpn from "./CheckOutSideBarCpn.vue";
import { getCartList } from "@/function/getCartList";
import { removeItemLocal, setStateCart } from "@/function/handleLocalStorage";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
export default defineComponent({
  components: { ItemCpn, CheckOutSideBarCpn },

  setup() {
    const store = useStore();
    const route = useRouter();
    const isActive = ref(0);
    const selectedAddress = ref();
    const state = reactive({
      address_id: "",
    });
    const order_note = ref();

    const rules = {
      address_id: {
        required: helpers.withMessage("Vui lòng chọn địa chỉ", required),
      },
    };

    const submitted = ref(false);

    const v$ = useVuelidate(rules, state);
    const listAddress = computed(() => {
      return store.getters["auth/getUserAddress"] || [];
    });
    const account = computed(() => {
      return store.getters["auth/getUserInfo"] || [];
    });

    const dataSelectedAddress = computed(() => {
      const data = listAddress.value.filter((address) => {
        if (address.id == state.address_id) {
          return address;
        }
      });
      if (data.length > 0) {
        return data;
      }
      return [];
    });

    const handleSubmit = async (isFormValid) => {
      submitted.value = true;
      if (isFormValid) {
        const order = {
          address_id: state.address_id,
          total_price: totalPrice.value,
          cart_list: cartList.value,
          token: account.value.token,
          note: order_note.value,
        };
        const check = await store.dispatch("auth/createOrder", order);
        if (check) {
          window.Swal.fire({
            icon: "success",
            title: "Thành Công",
            text: "Thanh toán thành công",
          });
          removeItemLocal("cart");
          setStateCart(store);
          route.push(`/don-hang`);
        } else {
          window.Swal.fire({
            icon: "error",
            title: "Thất Bại",
            text: "Lỗi thanh toán. Vui lòng thử lại sau",
          });
        }
      } else {
        window.Swal.fire({
          icon: "error",
          title: "Thất Bại",
          text: "Vui lòng chọn địa chỉ giao hàng hoặc đăng nhập để thanh toán",
        });
      }
    };

    const activeVNPay = () => {
      isActive.value = 0;
    };

    const activeCod = () => {
      isActive.value = 1;
    };

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
      isActive,
      activeVNPay,
      activeCod,
      v$,
      state,
      submitted,
      rules,
      handleSubmit,
      order_note,
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
  .flex {
    .card {
      border-radius: 4px;
      display: inline-block;
      user-select: none;
      border: 1px solid rgb(224, 224, 224);
      background-color: rgb(255, 255, 255);
      padding: 0.5rem 1.25rem;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      width: 100%;
      .p-tag {
        background-color: rgb(207, 15, 15, 1) !important;
      }
      .conner {
        position: absolute;
        top: -1px;
        right: -1px;
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 0px 36px 36px 0px;
        border-color: transparent rgb(207, 15, 15, 1) transparent transparent;
      }
      .check {
        display: flex;
        position: absolute;
        top: 2px;
        right: 2px;
        z-index: 0;
        i {
          color: white;
          font-size: 0.85rem;
        }
      }
    }
    .active {
      border-radius: 4px;
      display: inline-block;
      user-select: none;
      border: 1px solid rgb(207, 15, 15, 1) !important;
      background-color: rgb(255, 255, 255);
      padding: 0.5rem 1.25rem;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      width: 100%;
    }
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
@media only screen and (max-width: 1920px) {
  .w-6{
    .card {
      font-size:0.8rem !important;
      .p-tag {
        text-align: center;
        padding:0.15rem 0.15rem !important;
      }
    }
  }
:deep(.p-inputtext-sm .p-inputtext){
  font-size: 0.75rem !important;
}
}
</style>

