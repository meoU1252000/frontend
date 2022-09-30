<template>
  <router-link to="/" class="product no-underline">
    <div class="image">
      <img
        src="https://lh3.googleusercontent.com/_SApryKFms-BYshoOG9JRUG14-JLrnShoUSZ7_4_JqcYW5YaL2eRJ0cw4AXNjOmHDi1q-f-dVFH3BwyiCMxg-7-mAsKPGA-LcA=rw-w230"
        alt=""
      />
    </div>
    <div class="wrap">
      <div class="name">
        <span>Laptop Acer Nitro 5 AN515-55-70AX asdmkam afmakfmk</span>
      </div>
      <div class="quantity">Còn 2 sản phẩm</div>
      <div class="footer">
        <div class="price">
          <span>2.000.000đ</span>
          <span class="price-second">2.200.000đ</span>
        </div>
        <div class="icon">
          <img src="@/assets/images/icon-orthers/delivery-truck.png" alt="" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.product {
  width: 20%;
  height: 22rem;
  color: var(--black-color);
  border: 1px solid #ccc;

  .image img {
    width: 100%;
    object-fit: contain;
  }

  .wrap {
    margin: 0 1rem;

    .name {
      span {
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }

    .quantity {
      font-size: 0.75rem;
      font-weight: 400;
      color: #e6983a;

      margin: 0.2rem 0;
    }

    .footer {
      display: flex;
      align-items: center;

      .icon {
        flex: 1;
        display: flex;
        justify-content: flex-end;

        img {
          width: 2rem;
          height: 2rem;
          object-fit: contain;
        }
      }
    }
    .price {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #1435c3;
      font-weight: 700;

      .price-second {
        font-size: 0.85rem;
        text-decoration: line-through;
        color: #82869e;
        font-weight: 500;
      }
    }
  }
}
</style>
