<template>
  <TheLoadingCpn :isLoading="showLoading" />
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
                @change="checkAddress($event)"
              />
            </div>
          </div>
        </div>
        <div v-if="state.address_id != '' && state.address_id != '-1'">
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
        <div class="sidebar-event-content mb-4">
          <div class="header text-xl">
            <div
              class="header-content w-full p-4 flex align-items-center justify-content-between"
            >
              <h6>Khuyến Mãi</h6>
              <a @click="openEventModal"
                ><i class="pi pi-tags"></i> Chọn Mã Khuyến Mãi</a
              >
              <my-dialog
                header="Mã Giảm Giá"
                v-model:visible="displayEventModal"
                :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
                :style="{ width: '40vw' }"
                :modal="true"
                :dismissableMask="true"
                :closeOnEscape="true"
              >
                <div class="col-12">
                  <div class="p-inputgroup">
                    <my-inputText placeholder="Nhập mã giảm giá" />
                    <my-button label="Áp Dụng" />
                  </div>
                </div>
                <div class="col-12 mt-2">
                  <h4>Mã giảm giá</h4>
                  <div v-if="eventCode.length > 0">
                    <div v-for="(code, i) in eventCode" :key="i">
                      <div
                        class="event-code flex h-7rem border-1 mt-3"
                        v-for="(code_discount, j) in code.code"
                        :key="j"
                      >
                        <div class="col-3">
                          <div class="image">
                            <img
                              src="https://shopfront-cdn.tekoapis.com/cart/discount.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div class="col-9">
                          <div class="flex flex-column">
                            <div class="event-code-content">
                              <h5>{{ code.event_name }}</h5>
                            </div>
                            <div class="event-code-content">
                              <span class="text-sm">{{
                                code_discount.code_name
                              }}</span>
                            </div>
                            <div
                              class="event-code-content"
                              v-if="code_discount.discount_unit == 1"
                            >
                              <span class="text-sm"
                                >Giảm
                                {{ formatter(code_discount.discount_value) }}
                                trên tổng giá trị đơn hàng.</span
                              >
                            </div>
                            <div class="event-code-content" v-else>
                              <span class="text-sm"
                                >Giảm {{ code_discount.discount_value }}% trên
                                tổng giá trị đơn hàng.</span
                              >
                            </div>
                            <div
                              class="flex justify-content-between text-sm align-items-center"
                            >
                              <span class="text-500">
                                HSD: {{ format_date(code.event_end) }}
                              </span>
                              <my-button
                                label="Áp Dụng"
                                class="p-button-link p-button-sm"
                                @click="handleAddCode(code_discount)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <template #footer>
                  <my-button
                    label="Đóng"
                    @click="closeEventModal"
                    class="p-button-outlined p-button-secondary p-button-sm"
                  />
                </template>
              </my-dialog>
            </div>
          </div>
        </div>
        <ItemCpn :cartList="cartList" />
        <div class="sidebar-cart-content mt-3">
          <div class="header text-xl">
            <div class="header-content w-full p-4">
              <h6 class="font-medium">Thanh toán</h6>
              <div class="flex justify-content-between text-base mt-4">
                <span>Tổng tạm tính</span>
                <span class="font-bold">{{ formatter(totalPrice) }}</span>
              </div>
              <div
                class="flex justify-content-between text-base mt-4"
                v-if="discountValue != 0"
              >
                <span>Giảm Giá</span>
                <span class="font-bold">{{ formatter(discountValue) }}</span>
              </div>
              <div class="flex justify-content-between text-base mt-2">
                <span>Phí vận chuyển</span>
                <span class="font-bold">Miễn phí</span>
              </div>
              <div class="flex justify-content-between text-base mt-2">
                <span>Thành tiền</span>
                <div class="flex flex-column align-items-end total-price-end">
                  <span>{{ formatter(totalOrderPrice) }}</span>
                  <span class="text-sm text-600 font-medium"
                    >(Đã bao gồm VAT)</span
                  >
                </div>
              </div>
              <!-- <div class="flex justify-content-between text-base mt-2" v-else>
                <span>Thành tiền</span>
                <div class="flex flex-column align-items-end total-price-end">
                  <span>{{ formatter(totalPrice) }}</span>
                  <span class="text-sm text-600 font-medium"
                    >(Đã bao gồm VAT)</span
                  >
                </div>
              </div> -->
              <div
                class="flex justify-content-between text-base mt-4"
                v-if="isActive === 1"
              >
                <my-button
                  label="Thanh Toán"
                  class="w-full"
                  type="submit"
                  v-if="state.address_id != '' && state.address_id != '-1'"
                ></my-button>
                <div v-else class="w-full">
                  <h4 class="text-center">Vui lòng chọn địa chỉ thanh toán.</h4>
                </div>
              </div>
              <div
                class="flex justify-content-between text-base mt-4"
                v-if="isActive === 0"
              >
                <PayPalCpn
                  :totalPrice="totalOrderPrice"
                  @complete-paypal="orderPaypal"
                  v-if="state.address_id != '' && state.address_id != '-1'"
                />

                <div v-else class="w-full">
                  <h4 class="text-center">Vui lòng chọn địa chỉ thanh toán.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <div class="flex w-full justify-content-between h-8rem">
          <div class="w-6 p-3 h-full">
            <div
              class="card h-full"
              @click="activeVNPay"
              :class="{ active: isActive === 0 }"
            >
              <div class="p-2 flex">
                <h4>Thanh toán qua PayPal</h4>
                <my-Tag class="mr-2 ml-2" value="Khuyên dùng" rounded></my-Tag>
              </div>
              <!-- <div class="p-2 w-10">
                <span
                  >Thanh toán qua Internet Banking, Visa, Master, JCB,
                  VNPAY-QR</span
                >
              </div> -->
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

  <AddressModalCpn
    :account="account"
    :display-modal="displayModal"
    @close-modal="closeModal"
    v-if="displayModal"
  />
</template>
<script>
import { defineComponent, ref, computed, reactive } from "vue";
import ItemCpn from "@/components/checkOut/ItemCpn.vue";
// import CheckOutSideBarCpn from "./CheckOutSideBarCpn.vue";
import AddressModalCpn from "@/components/checkOut/AddressModalCpn.vue";

import { getCartList } from "@/function/getCartList";
import { removeItemLocal, setStateCart } from "@/function/handleLocalStorage";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { formatter } from "@/function/common";
import { format_date } from "@/function/common";
import PayPalCpn from "./PayPal.vue";
import TheLoadingCpn from "@/components/TheLoadingCpn.vue";
// import EventCpn from "@/components/cart/EventCpn.vue";

export default defineComponent({
  components: { ItemCpn, PayPalCpn, AddressModalCpn, TheLoadingCpn },

  setup() {
    const store = useStore();
    const route = useRouter();
    const isActive = ref(0);
    const selectedAddress = ref();
    const displayModal = ref(false);
    const codeDiscount = ref();
    const discountValue = ref(0);
    const openModal = () => {
      displayModal.value = true;
    };
    const showLoading = ref(false);
    const closeModal = () => {
      displayModal.value = false;
    };
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
      const result = store.getters["auth/getUserAddress"] || [];
      return result.concat([
        {
          id: -1,
          receiver_address: "Thêm Địa Chỉ Mới",
        },
      ]);
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

    const checkAddress = (evt) => {
      if (evt.value !== -1) return;
      // open modal
      openModal();
    };
    const account = computed(() => {
      return store.getters["auth/getUserInfo"] || [];
    });

    const eventCode = computed(() => {
      return store.getters["eventCode/getListEvent"] || [];
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

    const handleAddCode = async (code) => {
      codeDiscount.value = code.id;

      if (code.discount_unit == 1) {
        discountValue.value = code.discount_value;
      } else {
        discountValue.value = (totalPrice.value * code.discount_value)/100;
      }
      totalOrderPrice.value = totalPrice.value - discountValue.value;
      closeEventModal();
      window.Swal.fire({
        icon: "success",
        title: "Thành Công",
        text: "Áp dụng mã giảm giá thành công",
      });
      // console.log(codeDiscount.value);
    };
    const totalOrderPrice = ref(totalPrice.value - discountValue.value);

    const createOrder = async (order) => {
      showLoading.value = true;
      const check = await store.dispatch("auth/createOrder", order);
      if (check) {
        console.log(showLoading.value);
        removeItemLocal("cart");
        setStateCart(store);
        await Promise.all([
          store.dispatch("auth/getListOrder", account.value.token),
          store.dispatch("product/getListProducts"),
          store.dispatch("category/getListCategories"),
          store.dispatch("brand/getListBrands"),
        ]);
        showLoading.value = false;
        window.Swal.fire({
          icon: "success",
          title: "Thành Công",
          text: "Thanh toán thành công",
        }).then(function () {
          route.push(`/don-hang`);
        });
      } else {
        showLoading.value = false;
        window.Swal.fire({
          icon: "error",
          title: "Thất Bại",
          text: "Lỗi thanh toán. Vui lòng thử lại sau",
        });
      }
    };

    const orderPaypal = async () => {
      const order = {
        address_id: state.address_id,
        code_id: codeDiscount.value,
        total_price: totalOrderPrice.value,
        cart_list: cartList.value,
        token: account.value.token,
        note: order_note.value,
        payment: isActive.value,
      };
      createOrder(order);
    };

    const handleSubmit = async (isFormValid) => {
      submitted.value = true;
      if (isFormValid) {
        const order = {
          address_id: state.address_id,
          code_id: codeDiscount.value,
          total_price: totalOrderPrice.value,
          cart_list: cartList.value,
          token: account.value.token,
          note: order_note.value,
          payment: isActive.value,
        };
        createOrder(order);
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

    const displayEventModal = ref(false);
    const openEventModal = () => {
      displayEventModal.value = true;
    };
    const closeEventModal = () => {
      displayEventModal.value = false;
    };
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
      formatter,
      orderPaypal,
      createOrder,
      checkAddress,
      displayModal,
      openModal,
      closeModal,
      displayEventModal,
      openEventModal,
      closeEventModal,
      eventCode,
      format_date,
      handleAddCode,
      totalOrderPrice,
      discountValue,
      showLoading,
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
  .p-button {
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
.sidebar-cart-content {
  min-height: 20rem;
  background-color: white;
  .header {
    .header-content {
      color: black;
      h6 {
        font-size: 1rem;
      }
    }
    .total-price-end {
      color: rgb(207, 15, 15, 1) !important;
      font-weight: bold;
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
  .p-button {
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
.sidebar-event-content {
  min-height: 4rem;
  background-color: white;
  .header {
    .header-content {
      h6 {
        font-size: 1rem;
        font-weight: 500;
      }
      a {
        text-decoration: none;
        color: rgb(207, 15, 15, 1);
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
}
.event-code {
  border-color: #ccc;
  border-radius: 8px;
  .col-3 {
    .image {
      border-style: none;
      border-radius: 0.25rem;
      border-width: 1px;
      border-color: unset;
      opacity: 1;
      background-color: rgb(232, 235, 249);
      width: 70%;
      min-width: 76px;
      height: 76px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
    }
  }
  .event-code-content {
    height: 1.3rem;
  }
}
@media only screen and (max-width: 1920px) {
  .w-6 {
    .card {
      font-size: 0.8rem !important;
      .p-tag {
        text-align: center;
        padding: 0.15rem 0.15rem !important;
      }
    }
  }
  :deep(.p-inputtext-sm .p-inputtext) {
    font-size: 0.75rem !important;
  }
  .sidebar-event-content {
    .header {
      .header-content {
        h6 {
          font-size: 0.8rem;
        }
        a {
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
