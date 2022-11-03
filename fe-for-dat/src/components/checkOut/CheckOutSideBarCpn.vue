<template>
  <div class="sidebar-content mt-3">
    <div class="header text-xl">
      <div class="header-content w-full p-4">
        <h6 class="font-medium">Thanh toán</h6>
        <div class="flex justify-content-between text-base mt-4">
          <span>Tổng tạm tính</span>
          <span class="font-bold">{{ formatter(totalPrice) }}</span>
        </div>
        <div class="flex justify-content-between text-base mt-2">
          <span>Phí vận chuyển</span>
          <span class="font-bold">Miễn phí</span>
        </div>
        <div class="flex justify-content-between text-base mt-2">
          <span>Thành tiền</span>
          <div class="flex flex-column align-items-end total-price-end">
            <span>{{ formatter(totalPrice) }}</span>
            <span class="text-sm text-600 font-medium">(Đã bao gồm VAT)</span>
          </div>
        </div>
        <div class="flex justify-content-between text-base mt-4">
          <my-button
            label="Thanh Toán"
            class="w-full"
            type="submit"
          ></my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { formatter } from "@/function/common";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    totalPrice: { type: Number },
  },
  setup() {
    const route = useRouter();

    const goToCheckOutPage = () => {
      route.push(`/thanh-toan`);
    };
    return {
      formatter,
      goToCheckOutPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-content {
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
</style>
