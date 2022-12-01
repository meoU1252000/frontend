<template>
  <TheLoadingCpn :isLoading="showLoading" />
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
                    <div class="col-2 order-image justify-content-center flex">
                      <img
                        :src="order_detail.product.main_image_src"
                        alt=""
                        class="w-5rem h-5rem"
                      />
                    </div>
                    <div class="col-10 order-name">
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
                        <span class="block" v-if="order.payment == 1">
                          Thanh toán khi nhận hàng
                        </span>
                        <span class="block" v-if="order.payment == 0">
                          Đã thanh toán bằng Paypal
                        </span>
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
                            <span
                              >Thời gian đặt hàng :
                              {{ format_date(order.created_at) }}</span
                            >
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
                    <div class="col-2 order-image justify-content-center flex">
                      <img
                        :src="order_detail.product.main_image_src"
                        alt=""
                        class="w-5rem h-5rem"
                      />
                    </div>
                    <div class="col-10 order-name">
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
                        <span class="block" v-if="order.payment == 1">
                          Thanh toán khi nhận hàng
                        </span>
                        <span class="block" v-if="order.payment == 0">
                          Đã thanh toán bằng Paypal
                        </span>
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
                            <span
                              >Thời gian đặt hàng:
                              {{ format_date(order.created_at) }}</span
                            >
                          </div>
                          <div class="flex">
                            <span
                              >Thời gian nhận hàng (dự kiến):
                              {{
                                format_date(addDays(order.created_at, 5))
                              }}</span
                            >
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
                    <div class="col-2 order-image justify-content-center flex">
                      <img
                        :src="order_detail.product.main_image_src"
                        alt=""
                        class="w-5rem h-5rem"
                      />
                    </div>
                    <div class="col-10 order-name">
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
                        <span class="block" v-if="order.payment == 1">
                          Thanh toán khi nhận hàng
                        </span>
                        <span class="block" v-if="order.payment == 0">
                          Đã thanh toán bằng Paypal
                        </span>
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
                            <span
                              >Thời gian đặt hàng:
                              {{ format_date(order.created_at) }}</span
                            >
                          </div>
                          <div class="flex">
                            <span
                              >Thời gian nhận hàng (dự kiến):
                              {{
                                format_date(addDays(order.created_at, 5))
                              }}</span
                            >
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
                    <div class="col-2 order-image justify-content-center flex">
                      <img
                        :src="order_detail.product.main_image_src"
                        alt=""
                        class="w-5rem h-5rem"
                      />
                    </div>
                    <div class="col-10 order-name">
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
                        <span class="block" v-if="order.payment == 1">
                          Thanh toán khi nhận hàng
                        </span>
                        <span class="block" v-if="order.payment == 0">
                          Đã thanh toán bằng Paypal
                        </span>
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
                            <span
                              >Thời gian đặt hàng:
                              {{ format_date(order.created_at) }}</span
                            >
                          </div>
                          <div class="flex">
                            <span
                              >Thời gian nhận hàng:
                              {{ format_date(order.receive_date) }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="order-button">
                    <div class="flex justify-content-end">
                      <div class="col-6 flex justify-content-end">
                        <my-button
                          class="flex button-primary justify-content-center w-6"
                          label="Đánh Giá Đơn Hàng"
                          @click="goToRatingPage(order.id)"
                        />
                      </div>
                    </div>
                  </div> -->
                  <div class="order-rating mb-4">
                    <div class="flex align-items-baseline p-4 w-full">
                      <i class="pi pi-heart-fill"></i>
                      <div class="ml-2 line-height-3 w-full">
                        <h3>Đánh giá sản phẩm</h3>
                      </div>
                    </div>

                    <div
                      v-for="(order_detail, j) in order.order_details"
                      :key="j"
                      class="mb-2 w-full order-comment"
                    >
                      <div class="flex justify-content-center w-full px-2">
                        <div
                          class="flex mb-2 w-full justify-content-between align-items-center"
                        >
                          <div
                            class="ml-4 py-4 order-image justify-content-center flex"
                          >
                            <img
                              :src="order_detail.product.main_image_src"
                              alt=""
                              class="w-5rem h-5rem"
                            />
                            <div class="ml-2 flex flex-column order-name">
                              <router-link
                                :to="{
                                  name: 'showProductView',
                                  params: {
                                    id: order_detail.product.id,
                                    kind: order_detail.product.kind,
                                  },
                                }"
                                >{{
                                  order_detail.product.product_name
                                }}</router-link
                              >

                              <span
                                >Số lượng:
                                {{ order_detail.product_number }}</span
                              >
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
                          <div class="mr-4" v-if="order_detail.star_rating">
                            <star-rating
                              v-model:rating="
                                order_detail.star_rating.star_rating_number
                              "
                              :show-rating="false"
                              read-only="true"
                              star-size="30"
                            ></star-rating>
                          </div>

                          <div class="mr-4" v-else>
                            <star-rating
                              v-model:rating="rating[j]"
                              :show-rating="false"
                              star-size="30"
                            ></star-rating>
                          </div>
                        </div>
                      </div>
                      <div class="mb-4" v-if="order_detail.star_rating">
                        <div class="flex align-items-baseline px-4">
                          <div class="ml-2 line-height-3 w-full">
                            <h3>Đã Phản hồi</h3>
                            <div class="block mt-3 w-full mb-3">
                              <my-Textarea
                                v-model="
                                  order_detail.star_rating.rating_comment
                                "
                                :autoResize="true"
                                :readonly="true"
                                rows="5"
                                cols="30"
                                class="w-full"
                                placeholder="Tối đa 255 ký tự ...."
                              />
                            </div>
                            <my-button
                              class="flex button-primary justify-content-end w-2 ratingButton"
                              label="Đánh Giá"
                              disabled="true"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mb-4" v-else>
                        <div class="flex align-items-baseline px-4">
                          <div class="ml-2 line-height-3 w-full">
                            <h3>Phản hồi</h3>
                            <div class="block mt-3 w-full mb-3">
                              <my-Textarea
                                v-model="content[j]"
                                :autoResize="true"
                                rows="5"
                                cols="30"
                                class="w-full"
                                placeholder="Tối đa 255 ký tự ...."
                              />
                            </div>
                            <my-button
                              class="flex button-primary justify-content-end w-2 ratingButton"
                              label="Đánh Giá"
                              @click="
                                rateProduct(order_detail, content[j], rating[j])
                              "
                            />
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
                    <div class="col-2 order-image justify-content-center flex">
                      <img
                        :src="order_detail.product.main_image_src"
                        alt=""
                        class="w-5rem h-5rem"
                      />
                    </div>
                    <div class="col-10 order-name">
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
                        <span class="block" v-if="order.payment == 1">
                          Thanh toán khi nhận hàng
                        </span>
                        <span class="block" v-if="order.payment == 0">
                          Đã thanh toán bằng Paypal
                        </span>
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
                            <span
                              >Thời gian đặt hàng:
                              {{ format_date(order.created_at) }}</span
                            >
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
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { formatter } from "@/function/common";
import { useRouter } from "vue-router";
import { format_date, addDays } from "@/function/common";
import TheLoadingCpn from "@/components/TheLoadingCpn.vue";

export default defineComponent({
  components: { TheLoadingCpn },
  setup() {
    const store = useStore();
    const route = useRouter();
    const maxStars = ref(5);
    const rating = ref([]);
    const content = ref([]);
    const hasCounter = true;
    const stars = ref(0);
    const grade = ref(0);
    const showLoading = ref(false);

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
    const goToRatingPage = (id) => {
      route.push(`/danh-gia/${id}`);
    };
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

    const rate = (star) => {
      if (typeof star === "number" && star <= maxStars.value && star >= 0)
        stars.value = stars.value === star ? star - 1 : star;
    };

    const rateProduct = async (
      order_detail,
      comment_content,
      rating_number
    ) => {
      const data = {
        product_id: order_detail.product.id,
        order_id: order_detail.order_id,
        star_rating_number: rating_number,
        rating_comment: comment_content,
        token: account.value.token,
      };
      showLoading.value = true;
      const check = await store.dispatch("auth/rating", data);
      if (check) {
        await store.dispatch("auth/getListOrder", account.value.token);
        showLoading.value = false;
        window.Swal.fire({
          icon: "success",
          title: "Thành Công",
          text: "Đánh giá sản phẩm thành công",
        });
      }else{
        showLoading.value = false;
        window.Swal.fire({
          icon: "error",
          title: "Thất Bại",
          text: "Lỗi! Vui lòng thử lại sau",
        });
      }
    };

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
          showLoading.value = true;
          await Promise.all([
            store.dispatch("auth/cancelOrder", orderCancel),
            store.dispatch("auth/getListOrder", orderCancel.token),
            store.dispatch("product/getListProducts"),
            store.dispatch("category/getListCategories"),
            store.dispatch("brand/getListBrands"),
          ]);
          showLoading.value = false;

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
      goToRatingPage,
      maxStars,
      hasCounter,
      format_date,
      stars,
      grade,
      rate,
      rateProduct,
      rating,
      addDays,
      content,
      showLoading,
    };
  },
});
</script>
<style lang="scss" scoped>
.user-content {
  min-height: 20rem;
  background-color: white;
  .ratingButton {
    float: right;
  }
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
  .order-comment {
    border: 1px solid #eeee;
  }
  .order-content {
    border-top: 1px solid #eeee;
  }

  .order-rating-content {
    content: "";
    border-top: 1px solid #eeee;
  }
  .order-rating {
    border: 1px solid #eeee;
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
      width: 75%;
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
  $active-color: #f3d23e;

  .rating {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 22px;
    color: #a7a8a8;
  }
  .list {
    margin: 0 0 5px 0;
    padding: 0;
    list-style-type: none;
    &:hover {
      .star {
        color: $active-color;
      }
    }
  }
  .star {
    display: inline-block;
    cursor: pointer;
    &:hover {
      & ~ .star {
        &:not(.active) {
          color: inherit;
        }
      }
    }
  }
  .active {
    color: $active-color;
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
