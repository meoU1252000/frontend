<template>
  <div class="sidebar-content">
    <div class="header text-xl">
      <div class="header-content px-2 w-full justify-content-between flex">
        <h5 class="pl-4">Thông Tin Đơn Hàng</h5>
        <div class="pr-4">
          <router-link to="/gio-hang">Chỉnh sửa</router-link>
        </div>
      </div>
    </div>
    <div class="body-content">
      <div class="flex h-7rem mb-4" v-for="(item, i) in cartList" :key="i">
        <div class="col-3 cart-image justify-content-center flex">
          <img :src="item.img" alt="" class="w-7rem h-7rem" />
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { formatter } from "@/function/common";

export default defineComponent({
  props: {
    cartList: { type: Array },
  },

  setup() {
    return { formatter };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-content {
  min-height: 20rem;
  background-color: white;
  .header {
    .header-content {
      height: 4rem;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      border-bottom: 2px solid #cccccc36;
      margin-bottom: 1rem;
      a {
        text-decoration: none;
        color: rgb(207, 15, 15, 1) !important;
        font-size: 1rem;
        &:hover {
          color: rgb(145, 10, 10) !important;
        }
      }
    }
  }
  .body-content {
    display: flex;
    flex-direction: column;
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
}
</style>
