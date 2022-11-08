<template>
  <div class="p-7 mx-auto w-11 flex justify-content-between">
    <div class="user-content flex w-9 flex mx-auto">
      <div class="content-header p-2 w-full">
        <div class="card">
          <my-TabView ref="tabview1">
            <my-TabPanel header="Chờ xử lý">
              <div v-for="(order, i) in orders1" :key="i" class="mb-4">
                <my-Fieldset
                  :legend="'Mã Đơn ' + order.id"
                  :toggleable="true"
                  :collapsed="false"
                >
                  <div class="order-address mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-map-marker"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Địa chỉ nhận hàng</h3>
                        <span class="block">{{
                          order.address.receiver_name
                        }}</span>
                        <span class="block">{{
                          order.address.receiver_phone
                        }}</span>
                        <span class="block">{{
                          order.address.receiver_address
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(order_detail, j) in order.order_details"
                    :key="j"
                    class="flex order-content mb-2"
                  >
                    <div class="col-1 order-image justify-content-center flex">
                      <img
                        :src="order_detail.product.main_image_src"
                        alt=""
                        class="w-5rem h-5rem"
                      />
                    </div>
                    <div class="col-11 order-name">
                      <router-link
                        :to="{
                          name: 'showProductView',
                          params: {
                            id: order_detail.product.id,
                            kind: order_detail.product.kind,
                          },
                        }"
                        >{{ order_detail.product.product_name }}</router-link
                      >
                      <div class="text-right line-height-4 p-2">
                        <span>Số lượng: {{ order_detail.product_number }}</span>
                        <h3>
                          {{
                            formatter(
                              order_detail.product_price *
                                order_detail.product_number
                            )
                          }}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div class="order-total p-4 mb-4">
                    <div class="flex justify-content-between">
                      <span>Thành tiền</span>
                      <span class="total-price">{{
                        formatter(order.total_price)
                      }}</span>
                    </div>
                  </div>
                  <div class="order-payment mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-dollar"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Phương thức thanh toán</h3>
                        <span class="block"> Thanh toán khi nhận hàng </span>
                      </div>
                    </div>
                  </div>
                  <div class="order-delivery mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-box"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Thông tin vận chuyển</h3>
                        <div class="block">
                          <div class="flex">
                            <span>Thời gian đặt hàng</span>
                          </div>
                          <div class="flex">
                            <span>Thời gian nhận hàng (dự kiến)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="order-button">
                    <div class="flex justify-content-end">
                      <div class="col-6 flex justify-content-end">
                        <my-button
                          class="flex p-button-outlined p-button-secondary justify-content-center w-6"
                          label="Hủy Đơn"
                          @click="handleCancelOrder(order.id)"
                        />
                      </div>
                    </div>
                  </div>
                </my-Fieldset>
              </div>
            </my-TabPanel>
            <my-TabPanel header="Chờ giao hàng">
              <div v-for="(order, i) in orders2" :key="i" class="mb-4">
                <my-Fieldset
                  :legend="'Mã Đơn ' + order.id"
                  :toggleable="true"
                  :collapsed="false"
                >
                  <div class="order-address mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-map-marker"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Địa chỉ nhận hàng</h3>
                        <span class="block">{{
                          order.address.receiver_name
                        }}</span>
                        <span class="block">{{
                          order.address.receiver_phone
                        }}</span>
                        <span class="block">{{
                          order.address.receiver_address
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(order_detail, j) in order.order_details"
                    :key="j"
                    class="flex order-content mb-2"
                  >
                    <div class="col-1 order-image justify-content-center flex">
                      <img
                        :src="order_detail.product.main_image_src"
                        alt=""
                        class="w-5rem h-5rem"
                      />
                    </div>
                    <div class="col-11 order-name">
                      <router-link
                        :to="{
                          name: 'showProductView',
                          params: {
                            id: order_detail.product.id,
                            kind: order_detail.product.kind,
                          },
                        }"
                        >{{ order_detail.product.product_name }}</router-link
                      >
                      <div class="text-right line-height-4 p-2">
                        <span>Số lượng: {{ order_detail.product_number }}</span>
                        <h3>
                          {{
                            formatter(
                              order_detail.product_price *
                                order_detail.product_number
                            )
                          }}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div class="order-total p-4 mb-4">
                    <div class="flex justify-content-between">
                      <span>Thành tiền</span>
                      <span class="total-price">{{
                        formatter(order.total_price)
                      }}</span>
                    </div>
                  </div>
                  <div class="order-payment mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-dollar"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Phương thức thanh toán</h3>
                        <span class="block"> Thanh toán khi nhận hàng </span>
                      </div>
                    </div>
                  </div>
                  <div class="order-delivery mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-box"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Thông tin vận chuyển</h3>
                        <div class="block">
                          <div class="flex">
                            <span>Thời gian đặt hàng</span>
                          </div>
                          <div class="flex">
                            <span>Thời gian nhận hàng (dự kiến)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </my-Fieldset>
              </div>
            </my-TabPanel>
            <my-TabPanel header="Đang giao">
              <div v-for="(order, i) in orders3" :key="i" class="mb-4">
                <my-Fieldset
                  :legend="'Mã Đơn ' + order.id"
                  :toggleable="true"
                  :collapsed="false"
                >
                  <div class="order-address mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-map-marker"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Địa chỉ nhận hàng</h3>
                        <span class="block">{{
                          order.address.receiver_name
                        }}</span>
                        <span class="block">{{
                          order.address.receiver_phone
                        }}</span>
                        <span class="block">{{
                          order.address.receiver_address
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(order_detail, j) in order.order_details"
                    :key="j"
                    class="flex order-content mb-2"
                  >
                    <div class="col-1 order-image justify-content-center flex">
                      <img
                        :src="order_detail.product.main_image_src"
                        alt=""
                        class="w-5rem h-5rem"
                      />
                    </div>
                    <div class="col-11 order-name">
                      <router-link
                        :to="{
                          name: 'showProductView',
                          params: {
                            id: order_detail.product.id,
                            kind: order_detail.product.kind,
                          },
                        }"
                        >{{ order_detail.product.product_name }}</router-link
                      >
                      <div class="text-right line-height-4 p-2">
                        <span>Số lượng: {{ order_detail.product_number }}</span>
                        <h3>
                          {{
                            formatter(
                              order_detail.product_price *
                                order_detail.product_number
                            )
                          }}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div class="order-total p-4 mb-4">
                    <div class="flex justify-content-between">
                      <span>Thành tiền</span>
                      <span class="total-price">{{
                        formatter(order.total_price)
                      }}</span>
                    </div>
                  </div>
                  <div class="order-payment mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-dollar"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Phương thức thanh toán</h3>
                        <span class="block"> Thanh toán khi nhận hàng </span>
                      </div>
                    </div>
                  </div>
                  <div class="order-delivery mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-box"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Thông tin vận chuyển</h3>
                        <div class="block">
                          <div class="flex">
                            <span>Thời gian đặt hàng</span>
                          </div>
                          <div class="flex">
                            <span>Thời gian nhận hàng (dự kiến)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </my-Fieldset>
              </div>
            </my-TabPanel>
            <my-TabPanel header="Đã giao">
              <div v-for="(order, i) in orders4" :key="i" class="mb-4">
                <my-Fieldset
                  :legend="'Mã Đơn ' + order.id"
                  :toggleable="true"
                  :collapsed="false"
                >
                  <div class="order-address mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-map-marker"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Địa chỉ nhận hàng</h3>
                        <span class="block">{{
                          order.address.receiver_name
                        }}</span>
                        <span class="block">{{
                          order.address.receiver_phone
                        }}</span>
                        <span class="block">{{
                          order.address.receiver_address
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(order_detail, j) in order.order_details"
                    :key="j"
                    class="flex order-content mb-2"
                  >
                    <div class="col-1 order-image justify-content-center flex">
                      <img
                        :src="order_detail.product.main_image_src"
                        alt=""
                        class="w-5rem h-5rem"
                      />
                    </div>
                    <div class="col-11 order-name">
                      <router-link
                        :to="{
                          name: 'showProductView',
                          params: {
                            id: order_detail.product.id,
                            kind: order_detail.product.kind,
                          },
                        }"
                        >{{ order_detail.product.product_name }}</router-link
                      >
                      <div class="text-right line-height-4 p-2">
                        <span>Số lượng: {{ order_detail.product_number }}</span>
                        <h3>
                          {{
                            formatter(
                              order_detail.product_price *
                                order_detail.product_number
                            )
                          }}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div class="order-total p-4 mb-4">
                    <div class="flex justify-content-between">
                      <span>Thành tiền</span>
                      <span class="total-price">{{
                        formatter(order.total_price)
                      }}</span>
                    </div>
                  </div>
                  <div class="order-payment mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-dollar"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Phương thức thanh toán</h3>
                        <span class="block"> Thanh toán khi nhận hàng </span>
                      </div>
                    </div>
                  </div>
                  <div class="order-delivery mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-box"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Thông tin vận chuyển</h3>
                        <div class="block">
                          <div class="flex">
                            <span>Thời gian đặt hàng</span>
                          </div>
                          <div class="flex">
                            <span>Thời gian nhận hàng (dự kiến)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </my-Fieldset>
              </div>
            </my-TabPanel>
            <my-TabPanel header="Đã hủy">
              <div v-for="(order, i) in orders5" :key="i" class="mb-4">
                <my-Fieldset
                  :legend="'Mã Đơn ' + order.id"
                  :toggleable="true"
                  :collapsed="false"
                >
                  <div class="order-address mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-map-marker"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Địa chỉ nhận hàng</h3>
                        <span class="block">{{
                          order.address.receiver_name
                        }}</span>
                        <span class="block">{{
                          order.address.receiver_phone
                        }}</span>
                        <span class="block">{{
                          order.address.receiver_address
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(order_detail, j) in order.order_details"
                    :key="j"
                    class="flex order-content mb-2"
                  >
                    <div class="col-1 order-image justify-content-center flex">
                      <img
                        :src="order_detail.product.main_image_src"
                        alt=""
                        class="w-5rem h-5rem"
                      />
                    </div>
                    <div class="col-11 order-name">
                      <router-link
                        :to="{
                          name: 'showProductView',
                          params: {
                            id: order_detail.product.id,
                            kind: order_detail.product.kind,
                          },
                        }"
                        >{{ order_detail.product.product_name }}</router-link
                      >
                      <div class="text-right line-height-4 p-2">
                        <span>Số lượng: {{ order_detail.product_number }}</span>
                        <h3>
                          {{
                            formatter(
                              order_detail.product_price *
                                order_detail.product_number
                            )
                          }}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div class="order-total p-4 mb-4">
                    <div class="flex justify-content-between">
                      <span>Thành tiền</span>
                      <span class="total-price">{{
                        formatter(order.total_price)
                      }}</span>
                    </div>
                  </div>
                  <div class="order-payment mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-dollar"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Phương thức thanh toán</h3>
                        <span class="block"> Thanh toán khi nhận hàng </span>
                      </div>
                    </div>
                  </div>
                  <div class="order-delivery mb-4">
                    <div class="flex align-items-baseline p-4">
                      <i class="pi pi-box"></i>
                      <div class="ml-2 line-height-3">
                        <h3>Thông tin vận chuyển</h3>
                        <div class="block">
                          <div class="flex">
                            <span>Thời gian đặt hàng</span>
                          </div>
                          <div class="flex">
                            <span>Thời gian nhận hàng (dự kiến)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </my-Fieldset>
              </div>
            </my-TabPanel>
          </my-TabView>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { formatter } from "@/function/common";
export default defineComponent({
  setup() {
    const store = useStore();
    onMounted(async () => {
      window.scrollTo(0, 0);
    });
    const account = computed(() => {
      return store.getters["auth/getUserInfo"] || [];
    });
    const stateOrder = computed(() => {
      return store.getters["auth/getUserOrder"] || [];
    });
    const orders = computed(() => {
      return stateOrder.value || [];
    });
    const orders1 = computed(() => {
      return (
        orders.value.filter((orders) => {
          if (orders.order_status == "Chưa Xử Lý") {
            return orders;
          }
        }) || []
      );
    });
    const orders2 = computed(() => {
      return (
        orders.value.filter((orders) => {
          if (orders.order_status == "Chờ Giao Hàng") {
            return orders;
          }
        }) || []
      );
    });
    const orders3 = computed(() => {
      return (
        orders.value.filter((orders) => {
          if (orders.order_status == "Đang Giao") {
            return orders;
          }
        }) || []
      );
    });
    const orders4 = computed(() => {
      return (
        orders.value.filter((orders) => {
          if (orders.order_status == "Đã Giao") {
            return orders;
          }
        }) || []
      );
    });
    const orders5 = computed(() => {
      return (
        orders.value.filter((orders) => {
          if (orders.order_status == "Đã Hủy") {
            return orders;
          }
        }) || []
      );
    });

    const handleCancelOrder = (data) => {
      const orderCancel = {
        id: data,
        token: account.value.token,
      };
      console.log(orderCancel);
      window.Swal.fire({
        title: "Chắc chắn hủy?",
        text: "Sau khi hủy, bạn sẽ không thể khôi phục lại đơn hàng. Tiếp tục ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await store.dispatch("auth/cancelOrder", orderCancel);
          await store.dispatch("auth/getListOrder", orderCancel.token);
          window.Swal.fire(
            "Hủy thành công!",
            "Đã hủy thành công đơn hàng.",
            "success"
          );
        }
      });
    };
    return {
      account,
      orders,
      orders1,
      orders2,
      orders3,
      orders4,
      orders5,
      formatter,
      stateOrder,
      handleCancelOrder,
    };
  },
});
</script>
<style lang="scss" scoped>
.user-content {
  min-height: 20rem;
  background-color: white;
  .button-primary {
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

  .order-address {
    border: 1px solid #eeee;
  }
  .order-payment {
    border: 1px solid #eeee;
  }

  .order-delivery {
    border: 1px solid #eeee;
  }
  .order-content {
    border-top: 1px solid #eeee;
  }
  .order-image {
    img {
      border: 1px solid #eeee;
    }
  }
  .order-name {
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
  .order-total {
    border-top: 1px solid #eeee;
    .total-price {
      font-weight: bold;
    }
  }
}
@media only screen and (max-width: 1920px) {
  .user-content {
    .content-header {
      .card {
        :deep(.p-datatable) {
          font-size: 0.8rem;
          .p-datatable-wrapper {
            table {
              tbody {
                tr {
                  .text-center {
                    text-align: left !important;
                    button {
                      i {
                        width: 2rem !important;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
